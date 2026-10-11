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

describe("un devis par navigateur", () => {
  it("la 2e demande après un succès est refusée", async () => {
    const r = await q.reserve(store, "a".repeat(32), "ip1");
    expect(r.ok).toBe(true);
    if (r.ok) await r.complete();
    const again = await q.reserve(store, "a".repeat(32), "ip1");
    expect(again).toMatchObject({ ok: false, code: "deja-utilise", status: 403 });
  });

  it("un autre navigateur, même connexion : accepté (connexion partagée), jusqu'à la limite", async () => {
    const ok: boolean[] = [];
    for (const cid of ids(5)) {
      const r = await q.reserve(store, cid, "ip-partagee");
      ok.push(r.ok);
      if (r.ok) await r.complete();
    }
    expect(ok).toEqual([true, true, true, false, false]); // perIp = 3
  });

  it("vider les cookies ne redonne pas d'essai sur la même connexion une fois la limite atteinte", async () => {
    for (const cid of ids(3)) { const r = await q.reserve(store, cid, "ipX"); if (r.ok) await r.complete(); }
    const r = await q.reserve(store, "f".repeat(32), "ipX");
    expect(r).toMatchObject({ ok: false, code: "connexion" });
  });

  it("une autre connexion n'est pas pénalisée", async () => {
    for (const cid of ids(3)) { const r = await q.reserve(store, cid, "ipA"); if (r.ok) await r.complete(); }
    expect((await q.reserve(store, "9".repeat(32), "ipB")).ok).toBe(true);
  });
});

describe("requêtes simultanées", () => {
  it("10 envois en parallèle avec le même cookie : un seul passe", async () => {
    const rs = await Promise.all(Array.from({ length: 10 }, () => q.reserve(store, "b".repeat(32), "ip1")));
    expect(rs.filter((r) => r.ok)).toHaveLength(1);
    expect(rs.filter((r) => !r.ok && r.code === "en-cours")).toHaveLength(9);
  });

  it("10 envois en parallèle avec 10 faux cookies depuis la même IP : pas plus que la limite", async () => {
    const rs = await Promise.all(ids(10).map((cid) => q.reserve(store, cid, "ipFlood")));
    expect(rs.filter((r) => r.ok)).toHaveLength(3);
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

  it("mais les tentatives ne sont jamais rendues : 3 échecs et c'est fini", async () => {
    for (let i = 0; i < 3; i++) {
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
