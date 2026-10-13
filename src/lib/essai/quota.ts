/**
 * Quota de l'essai : `perCookie` devis par navigateur, `perIp` par connexion.
 *
 * Principe : RESERVER avant de payer. Chaque garde est une operation atomique
 * (SET NX ou INCR) dont on lit le resultat, jamais « lire puis ecrire ». Dix
 * requetes simultanees voient donc dix valeurs differentes et au plus
 * `perIp` passent.
 *
 * Ordre (le plus bon marche et le plus precis d'abord) :
 *  1. verrou du navigateur      — un seul envoi en cours par visiteur
 *  2. devis deja tous utilises   — message « deja utilise »
 *  3. tentatives du navigateur  — borne les boucles d'erreurs, jamais remboursees
 *  4. tentatives de la connexion
 *  5. place sur la connexion    — remboursee si l'essai echoue
 *  6. plafond global du jour    — coupe-circuit de cout
 */
import { ESSAI } from "./config";
import type { Store } from "./store";

export type DenyCode =
  | "deja-utilise"
  | "en-cours"
  | "trop-de-tentatives"
  | "connexion"
  | "sature";

export const DENY_MESSAGES: Record<DenyCode, { status: number; message: string }> = {
  "deja-utilise": {
    status: 403,
    message: `Vous avez utilisé vos ${ESSAI.perCookie} devis gratuits. Pour aller plus loin, demandez votre devis Cirrion.`,
  },
  "en-cours": {
    status: 409,
    message: "Un envoi est déjà en cours. Patientez quelques secondes.",
  },
  "trop-de-tentatives": {
    status: 429,
    message: "Trop d'essais sans résultat pour aujourd'hui. Réessayez plus tard, ou demandez votre devis Cirrion.",
  },
  connexion: {
    status: 403,
    message: "Les devis gratuits de cette connexion sont épuisés (réseau d'entreprise ou téléphone partagé). Demandez votre devis Cirrion pour continuer.",
  },
  sature: {
    status: 503,
    message: "L'essai gratuit est très demandé aujourd'hui. Revenez demain, ou demandez votre devis Cirrion.",
  },
};

export type Reservation =
  | { ok: true; complete(): Promise<number>; fail(): Promise<void> }
  | { ok: false; code: DenyCode; status: number; message: string };

const day = (now: number) => new Date(now).toISOString().slice(0, 10);
const deny = (code: DenyCode): Reservation => ({ ok: false, code, ...DENY_MESSAGES[code] });

const k = {
  /** Compteur de devis prepares avec succes par ce navigateur. */
  visitor: (cid: string) => `essai:n:${cid}`,
  /** Verrou : un seul envoi a la fois par navigateur. */
  lock: (cid: string) => `essai:lock:${cid}`,
  attempts: (cid: string) => `essai:att:${cid}`,
  ip: (iph: string) => `essai:ip:${iph}`,
  ipAttempts: (iph: string, now: number) => `essai:ipatt:${iph}:${day(now)}`,
  global: (now: number) => `essai:day:${day(now)}`,
  burst: (iph: string, now: number) => `essai:rl:${iph}:${Math.floor(now / 60_000)}`,
};

/** Devis gratuits qu'il reste a ce navigateur (lecture seule). */
export async function remaining(store: Store, cid: string | null): Promise<number> {
  const used = cid ? Number((await store.get(k.visitor(cid))) ?? 0) : 0;
  return Math.max(0, ESSAI.perCookie - used);
}

/** Lecture seule, pour afficher ou masquer l'enregistreur. N'ecrit rien. */
export async function peek(
  store: Store,
  cid: string | null,
  iph: string,
): Promise<"disponible" | "deja-utilise" | "connexion"> {
  if ((await remaining(store, cid)) <= 0) return "deja-utilise";
  const n = Number((await store.get(k.ip(iph))) ?? 0);
  return n >= ESSAI.perIp ? "connexion" : "disponible";
}

/** Anti-rafale, a appeler en tout premier (avant meme de lire le corps). */
export async function burstAllowed(store: Store, iph: string, now = Date.now()): Promise<boolean> {
  return (await store.incr(k.burst(iph, now), 90)) <= ESSAI.burstPerMinute;
}

export async function reserve(store: Store, cid: string, iph: string, now = Date.now()): Promise<Reservation> {
  const vKey = k.visitor(cid);
  const lKey = k.lock(cid);

  // 1. Verrou : un seul envoi a la fois pour ce navigateur.
  if (!(await store.setNx(lKey, "pending", ESSAI.lockSeconds))) {
    return deny((await remaining(store, cid)) <= 0 ? "deja-utilise" : "en-cours");
  }
  const unlock = () => store.del(lKey);

  // 2. Devis gratuits deja tous utilises par ce navigateur.
  if ((await remaining(store, cid)) <= 0) {
    await unlock();
    return deny("deja-utilise");
  }

  try {
    // 3. Tentatives du navigateur (non remboursables).
    if ((await store.incr(k.attempts(cid), 30 * 24 * 3600)) > ESSAI.attemptsPerCookie) {
      await unlock();
      return deny("trop-de-tentatives");
    }
    // 4. Tentatives de la connexion, par jour (non remboursables).
    if ((await store.incr(k.ipAttempts(iph, now), 2 * 24 * 3600)) > ESSAI.attemptsPerIpPerDay) {
      await unlock();
      return deny("trop-de-tentatives");
    }
    // 5. Une place sur la connexion : reservation atomique, remboursee si echec.
    const ipKey = k.ip(iph);
    if ((await store.incr(ipKey, ESSAI.perIpWindowSeconds)) > ESSAI.perIp) {
      await store.decr(ipKey);
      await unlock();
      return deny("connexion");
    }
    // 6. Plafond global du jour.
    const gKey = k.global(now);
    if ((await store.incr(gKey, 2 * 24 * 3600)) > ESSAI.dailyCap) {
      await store.decr(gKey);
      await store.decr(ipKey);
      await unlock();
      return deny("sature");
    }

    let settled = false;
    return {
      ok: true,
      // Succes : un devis de plus est compte pour ce navigateur (la place sur la connexion reste prise).
      async complete() {
        if (settled) return 0;
        settled = true;
        const used = await store.incr(vKey, ESSAI.cookieMaxAgeSeconds);
        await unlock();
        return Math.max(0, ESSAI.perCookie - used);
      },
      // Echec (rien d'exploitable) : on rend la place, mais pas les tentatives.
      async fail() {
        if (settled) return;
        settled = true;
        await store.decr(ipKey);
        await store.decr(gKey);
        await unlock();
      },
    };
  } catch (err) {
    // Panne du stockage en cours de route : on libere le verrou si possible.
    await unlock().catch(() => {});
    throw err;
  }
}

/** Telechargements de PDF autorises pour un jeton. */
export async function pdfAllowed(store: Store, jti: string): Promise<boolean> {
  return (await store.incr(`essai:pdf:${jti}`, 2 * 3600)) <= ESSAI.pdfPerToken;
}
