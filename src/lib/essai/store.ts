/**
 * Stockage partage du quota.
 *
 * Sur Vercel chaque requete peut tomber sur une instance differente : un
 * compteur en memoire ne limiterait rien. On passe donc par Redis (Upstash ou
 * Vercel KV) via son API REST — de simples appels fetch, aucune dependance.
 *
 * Fail-closed : en production, sans Redis configure, l'essai est indisponible.
 * Le magasin en memoire n'existe que pour les tests et le developpement local.
 */

export interface Store {
  get(key: string): Promise<string | null>;
  /** Pose la valeur seulement si la cle n'existe pas. true si posee. */
  setNx(key: string, value: string, ttlSeconds: number): Promise<boolean>;
  set(key: string, value: string, ttlSeconds: number): Promise<void>;
  /** Incremente de facon atomique ; le TTL est pose a la creation de la cle. */
  incr(key: string, ttlSeconds: number): Promise<number>;
  decr(key: string): Promise<number>;
  del(key: string): Promise<void>;
}

export class StoreUnavailableError extends Error {
  constructor(message = "Stockage du quota indisponible") {
    super(message);
    this.name = "StoreUnavailableError";
  }
}

/* ----- Redis REST (Upstash / Vercel KV) ----- */

type RestResult = { result?: unknown; error?: string };

export function createRestStore(url: string, token: string, fetchImpl: typeof fetch = fetch): Store {
  const base = url.replace(/\/+$/, "");

  async function call(commands: (string | number)[][]): Promise<unknown[]> {
    let res: Response;
    try {
      res = await fetchImpl(`${base}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(commands),
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
    } catch {
      throw new StoreUnavailableError();
    }
    if (!res.ok) throw new StoreUnavailableError(`Redis HTTP ${res.status}`);
    const rows = (await res.json()) as RestResult[];
    return rows.map((r) => {
      if (r.error) throw new StoreUnavailableError(`Redis: ${r.error}`);
      return r.result;
    });
  }

  return {
    async get(key) {
      const [v] = await call([["GET", key]]);
      return typeof v === "string" ? v : null;
    },
    async setNx(key, value, ttl) {
      const [v] = await call([["SET", key, value, "NX", "EX", ttl]]);
      return v === "OK";
    },
    async set(key, value, ttl) {
      await call([["SET", key, value, "EX", ttl]]);
    },
    async incr(key, ttl) {
      const [n] = await call([["INCR", key], ["EXPIRE", key, ttl, "NX"]]);
      return Number(n);
    },
    async decr(key) {
      const [n] = await call([["DECR", key]]);
      return Number(n);
    },
    async del(key) {
      await call([["DEL", key]]);
    },
  };
}

/* ----- Memoire : tests et developpement local uniquement ----- */

export function createMemoryStore(now: () => number = Date.now): Store & { size(): number } {
  const data = new Map<string, { value: string; expires: number }>();
  const live = (key: string) => {
    const e = data.get(key);
    if (!e) return undefined;
    if (e.expires <= now()) { data.delete(key); return undefined; }
    return e;
  };
  return {
    async get(key) { return live(key)?.value ?? null; },
    async setNx(key, value, ttl) {
      if (live(key)) return false;
      data.set(key, { value, expires: now() + ttl * 1000 });
      return true;
    },
    async set(key, value, ttl) { data.set(key, { value, expires: now() + ttl * 1000 }); },
    async incr(key, ttl) {
      const e = live(key);
      if (!e) { data.set(key, { value: "1", expires: now() + ttl * 1000 }); return 1; }
      e.value = String(Number(e.value) + 1);
      return Number(e.value);
    },
    async decr(key) {
      const e = live(key);
      if (!e) { data.set(key, { value: "-1", expires: now() + 1000 }); return -1; }
      e.value = String(Number(e.value) - 1);
      return Number(e.value);
    },
    async del(key) { data.delete(key); },
    size() { return data.size; },
  };
}

/* ----- Selection ----- */

let cached: Store | null = null;

export function setStoreForTests(store: Store | null) {
  cached = store;
}

export function getStore(): Store {
  if (cached) return cached;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) {
    cached = createRestStore(url, token);
    return cached;
  }
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd && (process.env.NODE_ENV === "test" || process.env.ESSAI_STORE === "memory")) {
    cached = createMemoryStore();
    return cached;
  }
  throw new StoreUnavailableError("Redis non configure (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN)");
}
