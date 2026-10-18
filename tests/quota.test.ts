import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMemoryStore, type Store } from "@/lib/essai/store";

type Quota = typeof import("@/lib/essai/quota");
let q: Quota;
let store: Store;

beforeEach(async () => {
  vi.resetModules();
  q = await import("@/lib/essai/quota");
  store = createMemoryStore();
});
afterEach(() => vi.unstubAllEnvs());

const ids = (n: number) => Array.from({ length: n }, (_, i) => `c${i}`.padEnd(32, "0"));

describe("deux devis par navigateur", () => {
  it("2 devis acceptés, le 3e refusé ; le compteur de devis restants descend", async () => {
    const cid = "a".repeat(32);
    const left: number[] = [];
    for (let i = 0; i < 2; i++) {
      const r = await q.reserve(store, cid, "ip1");
      expect(r.ok).toBe(true);
      if (r.ok) left.push(await r.complete());
    }
    expect(left).toEqual([1, 0]);
    expect(await q.remaining(store, cid)).toBe(0);
    expect(await q.peek(store, cid, "ip1")).toBe("deja-utilise");
    expect(await q.reserve(store, cid, "ip1")).toMatchObject({ ok: false, code: "deja-utilise", status: 403 });
  });

  it("un devis déjà généré ne bloque plus le suivant (le verrou est libéré)", async () => {
    const cid = "a".repeat(32);
    const r = await q.reserve(store, cid, "ip1");
    if (r.ok) await r.complete();
    expect((await q.reserve(store, cid, "ip1")).ok).toBe(true);
  });

  it("un autre navigateur, même connexion : accepté (connexion partagée), jusqu'à la limite de 6", async () => {
    const ok: boolean[] = [];
    for (const cid of ids(8)) {
      const r = await q.reserve(store, cid, "ip-partagee");
      ok.push(r.ok);
      if (r.ok) await r.complete();
    }
    expect(ok.filter(Boolean)).toHaveLength(6);
    expect(ok.slice(6)).toEqual([false, false]);
  });

  it("vider les cookies ne redonne pas de devis sur la même connexion une fois la limite atteinte", async () => {
    for (const cid of ids(6)) { const r = await q.reserve(store, cid, "ipX"); if (r.ok) await r.complete(); }
    expect(await q.reserve(store, "f".repeat(32), "ipX")).toMatchObject({ ok: false, code: "connexion" });
    expect(await q.peek(store, null, "ipX")).toBe("connexion");
  });

  it("une autre connexion n'est pas pénalisée", async () => {
    for (const cid of ids(6)) { const r = await q.reserve(store, cid, "ipA"); if (r.ok) await r.complete(); }
    expect((await q.reserve(store, "9".repeat(32), "ipB")).ok).toBe(true);
  });
});

describe("requêtes simultanées", () => {
  it("10 envois en parallèle avec le même cookie : un seul passe", async () => {
    const rs = await Promise.all(Array.from({ length: 10 }, () => q.reserve(store, "b".repeat(32), "ip1")));
    expect(rs.filter((r) => r.ok)).toHaveLength(1);
    expect(rs.filter((r) => !r.ok && r.code === "en-cours")).toHaveLength(9);
  });

  it("à 1 devis fait, 10 envois en parallèle : un seul passe, le total ne dépasse jamais 2", async () => {
    const cid = "b".repeat(32);
    for (let i = 0; i < 1; i++) { const r = await q.reserve(store, cid, "ip1"); if (r.ok) await r.complete(); }
    const rs = await Promise.all(Array.from({ length: 10 }, () => q.reserve(store, cid, "ip1")));
    const won = rs.filter((r) => r.ok);
    expect(won).toHaveLength(1);
    if (won[0].ok) await won[0].complete();
    expect(await q.remaining(store, cid)).toBe(0);
    expect(await q.reserve(store, cid, "ip1")).toMatchObject({ ok: false, code: "deja-utilise" });
  });

  it("30 envois en parallèle avec 30 faux cookies depuis la même IP : pas plus que la limite de 6", async () => {
    const rs = await Promise.all(ids(30).map((cid) => q.reserve(store, cid, "ipFlood")));
    expect(rs.filter((r) => r.ok)).toHaveLength(6);
  });

  it("le verrou ne bloque pas un envoi sans rapport", async () => {
    await q.reserve(store, "c".repeat(32), "ip1");
    expect((await q.reserve(store, "d".repeat(32), "ip2")).ok).toBe(true);
  });
});

describe("échecs et tentatives", () => {
  it("un échec rend la place, et l'utilisateur peut réessayer", async () => {
    const r1 = await q.reserve(store, "e".repeat(32), "ip1");
    if (r1.ok) await r1.fail();
    expect((await q.reserve(store, "e".repeat(32), "ip1")).ok).toBe(true);
  });

  it("mais les tentatives ne sont jamais rendues : 6 échecs et c'est fini", async () => {
    for (let i = 0; i < 6; i++) {
      const r = await q.reserve(store, "g".repeat(32), "ip1");
      expect(r.ok).toBe(true);
      if (r.ok) await r.fail();
    }
    expect(await q.reserve(store, "g".repeat(32), "ip1")).toMatchObject({ ok: false, code: "trop-de-tentatives" });
  });

  it("un verrou orphelin (fonction tuée) expire tout seul", async () => {
    let t = 1_000_000;
    const timed = createMemoryStore(() => t);
    await q.reserve(timed, "h".repeat(32), "ip1"); // ni complete() ni fail()
    expect(await q.reserve(timed, "h".repeat(32), "ip1")).toMatchObject({ code: "en-cours" });
    t += 121_000;
    expect((await q.reserve(timed, "h".repeat(32), "ip1")).ok).toBe(true);
  });

  it("un échec ne consomme pas l'essai", async () => {
    const r = await q.reserve(store, "i".repeat(32), "ip1");
    if (r.ok) await r.fail();
    expect(await q.peek(store, "i".repeat(32), "ip1")).toBe("disponible");
  });
});

describe("plafond global du jour", () => {
  it("coupe au-delà du plafond et rend la place réservée", async () => {
    vi.stubEnv("ESSAI_DAILY_CAP", "2");
    vi.resetModules();
    const qq = await import("@/lib/essai/quota");
    const s = createMemoryStore();
    const results = [];
    for (let i = 0; i < 4; i++) { const r = await qq.reserve(s, `${i}`.repeat(32), `ip${i}`); results.push(r); if (r.ok) await r.complete(); }
    expect(results.map((r) => r.ok)).toEqual([true, true, false, false]);
    expect(results[2]).toMatchObject({ code: "sature", status: 503 });
    // La place réservée sur la connexion de la 3e demande (refusée) a bien été rendue.
    expect(await s.get("essai:ip:ip2")).toBe("0");
  });
});

describe("anti-rafale", () => {
  it("bloque au-delà de la limite par minute, par connexion", async () => {
    const now = 5_000_000;
    const res = [];
    for (let i = 0; i < 10; i++) res.push(await q.burstAllowed(store, "ipR", now));
    expect(res.filter(Boolean)).toHaveLength(8);
    expect(await q.burstAllowed(store, "autre", now)).toBe(true);
    expect(await q.burstAllowed(store, "ipR", now + 61_000)).toBe(true);
  });
});

describe("téléchargements PDF", () => {
  it("limités par jeton", async () => {
    const r = [];
    for (let i = 0; i < 10; i++) r.push(await q.pdfAllowed(store, "jti1"));
    expect(r.filter(Boolean)).toHaveLength(8);
  });
});
