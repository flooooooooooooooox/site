/**
 * Parcours complet : on appelle les VRAIS route handlers.
 * Seul Mistral est remplace par un faux serveur HTTP local — ce qui permet de
 * COMPTER les appels payants. Ce test ne prouve donc rien sur la qualite de la
 * vraie transcription : voir docs/ESSAI_DEVIS_VOCAL.md.
 */
import { createServer, type IncomingMessage, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { PDFDocument } from "pdf-lib";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { ipHash, newVisitorId, normalizeIp, readCookie, signVisitor, verifyVisitor } from "@/lib/essai/identity";
import { createMemoryStore, setStoreForTests, type Store } from "@/lib/essai/store";
import { audioRequest, wav } from "./helpers";

type Mode = { transcript: string; extract: object | string; sttStatus: number; chatStatus: number; delayMs: number };
const GOOD_TRANSCRIPT = "devis pour Madame Durand, remplacement du tableau électrique, six heures de main d'oeuvre à cinquante-cinq euros, un tableau à quatre cent cinquante euros";
const GOOD_EXTRACT = {
  client: "Madame Durand", email: null, telephone: null, adresse: null, adresse_chantier: null,
  objet: "Remplacement du tableau électrique", duree_jours: null, conditions: null, tva: null,
  lignes: [{ designation: "Main d'œuvre", quantite: 6, prix: 55 }, { designation: "Tableau électrique", quantite: null, prix: 450 }],
};

let server: Server;
let calls = { stt: 0, chat: 0 };
let mode: Mode;
const reset = () => {
  calls = { stt: 0, chat: 0 };
  mode = { transcript: GOOD_TRANSCRIPT, extract: GOOD_EXTRACT, sttStatus: 200, chatStatus: 200, delayMs: 0 };
};

const body = (req: IncomingMessage) => new Promise<void>((r) => { req.on("data", () => {}); req.on("end", () => r()); });

beforeAll(async () => {
  server = createServer(async (req, res) => {
    await body(req);
    await new Promise((r) => setTimeout(r, mode.delayMs));
    res.setHeader("content-type", "application/json");
    if (req.url?.includes("/audio/transcriptions")) {
      calls.stt++;
      res.statusCode = mode.sttStatus;
      res.end(JSON.stringify(mode.sttStatus === 200
        ? { model: "voxtral-small-latest", text: mode.transcript, language: "fr", segments: [], usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 } }
        : { message: "boom" }));
    } else if (req.url?.includes("/chat/completions")) {
      calls.chat++;
      res.statusCode = mode.chatStatus;
      res.end(JSON.stringify(mode.chatStatus === 200
        ? { id: "x", object: "chat.completion", created: 1, model: "mistral-small-latest",
            choices: [{ index: 0, finish_reason: "stop", message: { role: "assistant", content: typeof mode.extract === "string" ? mode.extract : JSON.stringify(mode.extract) } }],
            usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 } }
        : { message: "boom" }));
    } else { res.statusCode = 404; res.end("{}"); }
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  vi.stubEnv("MISTRAL_API_KEY", "cle-de-test");
  vi.stubEnv("MISTRAL_SERVER_URL", `http://127.0.0.1:${(server.address() as AddressInfo).port}`);
});
afterAll(async () => { vi.unstubAllEnvs(); await new Promise((r) => server.close(r)); });
let store: Store;
beforeEach(() => { reset(); store = createMemoryStore(); setStoreForTests(store); });

const URL_PREP = "http://localhost:3000/api/essai/preparer";
const URL_PDF = "http://localhost:3000/api/essai/pdf";
const route = async () => (await import("@/app/api/essai/preparer/route")).POST;
const pdfRoute = async () => (await import("@/app/api/essai/pdf/route")).POST;
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0];
const fresh = () => `cirrion_essai=${encodeURIComponent(signVisitor(newVisitorId()))}`;

describe("parcours nominal", () => {
  it("vocal -> devis préparé -> corrections -> PDF", async () => {
    const POST = await route();
    const res = await POST(audioRequest(URL_PREP, wav(12)));
    expect(res.status).toBe(200);
    const j = await res.json();
    expect(j.ok).toBe(true);
    expect(j.engine).toBe("mistral");
    expect(j.devis.client).toBe("Madame Durand");
    expect(j.devis.lignes).toHaveLength(2);
    expect(j.devis.lignes[1].quantite).toBe(1); // « 1 » quand aucune quantité n'est dite
    expect(j.transcript).toContain("tableau");
    // La TVA n'a pas été dite : elle n'est PAS inventée, et on la demande.
    expect(j.devis.tva).toBe("");
    expect(j.missing).toEqual(["tva"]);
    expect(calls).toEqual({ stt: 1, chat: 1 });
    expect(res.headers.get("set-cookie")).toMatch(/cirrion_essai=.*HttpOnly.*SameSite=Lax/);
    expect(res.headers.get("cache-control")).toBe("no-store");

    // Le PDF refuse tant que la TVA manque.
    const cookie = cookieOf(res);
    const PDF = await pdfRoute();
    const pdfReq = (devis: object) => new Request(URL_PDF, { method: "POST", headers: { cookie, host: "localhost:3000", "content-type": "application/json" }, body: JSON.stringify({ token: j.token, devis }) });
    const refused = await PDF(pdfReq(j.devis));
    expect(refused.status).toBe(422);
    expect((await refused.json()).error).toMatch(/TVA/);

    // Le visiteur corrige : il choisit la TVA et change un prix.
    const corrected = { ...j.devis, tva: "10", lignes: [j.devis.lignes[0], { ...j.devis.lignes[1], prix: 480 }] };
    const ok = await PDF(pdfReq(corrected));
    expect(ok.status).toBe(200);
    expect(ok.headers.get("content-type")).toBe("application/pdf");
    expect(ok.headers.get("content-disposition")).toMatch(/attachment; filename="devis-essai-Madame-Durand-\d{4}-\d{2}-\d{2}\.pdf"/);
    const doc = await PDFDocument.load(new Uint8Array(await ok.arrayBuffer()));
    expect(doc.getPageCount()).toBe(1);
    // Aucun appel payant supplémentaire pour le PDF.
    expect(calls).toEqual({ stt: 1, chat: 1 });
  });
});

describe("limite d'utilisation", () => {
  it("2e essai avec le même cookie : refusé, sans AUCUN appel payant", async () => {
    const POST = await route();
    const first = await POST(audioRequest(URL_PREP, wav(10)));
    const cookie = cookieOf(first);
    expect(first.status).toBe(200);
    const before = { ...calls };
    const second = await POST(audioRequest(URL_PREP, wav(10), { cookie }));
    expect(second.status).toBe(403);
    expect((await second.json()).code).toBe("deja-utilise");
    expect(calls).toEqual(before);
  });

  it("cookie effacé, même connexion : accepté puis bloqué à la limite de la connexion", async () => {
    const POST = await route();
    const statuses: number[] = [];
    for (let i = 0; i < 5; i++) statuses.push((await POST(audioRequest(URL_PREP, wav(10), { ip: "198.51.100.20" }))).status);
    expect(statuses).toEqual([200, 200, 200, 403, 403]);
    expect(calls.stt).toBe(3);
  });

  it("8 envois simultanés avec le même cookie : un seul appel payant", async () => {
    mode.delayMs = 150;
    const POST = await route();
    const cookie = fresh();
    const rs = await Promise.all(Array.from({ length: 8 }, () => POST(audioRequest(URL_PREP, wav(10), { cookie }))));
    const codes = await Promise.all(rs.map(async (r) => (r.status === 200 ? "ok" : (await r.json()).code)));
    expect(codes.filter((c) => c === "ok")).toHaveLength(1);
    expect(codes.filter((c) => c === "en-cours")).toHaveLength(7);
    expect(calls).toEqual({ stt: 1, chat: 1 });
  });

  it("20 envois simultanés avec 20 faux cookies depuis une même IP : au plus 3 appels payants", async () => {
    mode.delayMs = 100;
    const POST = await route();
    const rs = await Promise.all(Array.from({ length: 20 }, () => POST(audioRequest(URL_PREP, wav(10), { cookie: fresh(), ip: "198.51.100.30" }))));
    expect(rs.filter((r) => r.status === 200).length).toBeLessThanOrEqual(3);
    expect(calls.stt).toBeLessThanOrEqual(3);
  });

  it("cookie falsifié : traité comme un nouveau visiteur, jamais comme un visiteur connu", async () => {
    const POST = await route();
    const res = await POST(audioRequest(URL_PREP, wav(10), { cookie: "cirrion_essai=" + "a".repeat(32) + "." + "b".repeat(32), ip: "198.51.100.40" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("set-cookie")).toContain("cirrion_essai=");
  });
});

describe("contrôles avant les appels payants", () => {
  it.each([
    ["audio trop long", () => wav(200), 422, "trop-long"],
    ["audio trop court", () => wav(0.5), 422, "trop-court"],
    ["fichier qui n'est pas un audio", () => new TextEncoder().encode("MZ".repeat(5000)), 422, "format"],
    ["audio vide", () => new Uint8Array(0), 422, "vide"],
  ])("%s : refusé sans appel payant", async (_n, make, status, code) => {
    const POST = await route();
    const res = await POST(audioRequest(URL_PREP, make()));
    expect(res.status).toBe(status);
    expect((await res.json()).code).toBe(code);
    expect(calls).toEqual({ stt: 0, chat: 0 });
  });

  it("ne consomme pas l'essai : on peut ensuite envoyer un bon audio", async () => {
    const POST = await route();
    const cookie = fresh();
    await POST(audioRequest(URL_PREP, wav(200), { cookie }));
    expect((await POST(audioRequest(URL_PREP, wav(10), { cookie }))).status).toBe(200);
  });

  it("taille annoncée excessive : refusée avant lecture", async () => {
    const POST = await route();
    const req = audioRequest(URL_PREP, wav(5));
    const big = new Request(URL_PREP, { method: "POST", body: await req.arrayBuffer(), headers: { "content-type": req.headers.get("content-type")!, "content-length": "9000000", host: "localhost:3000" } });
    const res = await POST(big);
    expect(res.status).toBe(413);
    expect(calls).toEqual({ stt: 0, chat: 0 });
  });

  it("requête venant d'un autre site : refusée", async () => {
    const POST = await route();
    const res = await POST(audioRequest(URL_PREP, wav(10), { origin: "https://autre-site.example" }));
    expect(res.status).toBe(403);
    expect(calls).toEqual({ stt: 0, chat: 0 });
  });

  it("sans clé Mistral : essai fermé, pas de génération factice", async () => {
    vi.stubEnv("MISTRAL_API_KEY", "");
    const POST = await route();
    const res = await POST(audioRequest(URL_PREP, wav(10)));
    expect(res.status).toBe(503);
    expect(calls).toEqual({ stt: 0, chat: 0 });
    vi.stubEnv("MISTRAL_API_KEY", "cle-de-test");
  });
});

describe("erreurs de transcription et informations manquantes", () => {
  it("transcription vide : message simple, et l'essai n'est pas consommé", async () => {
    mode.transcript = "";
    const POST = await route();
    const cookie = fresh();
    const res = await POST(audioRequest(URL_PREP, wav(10), { cookie }));
    expect(res.status).toBe(422);
    expect((await res.json()).code).toBe("inaudible");
    mode.transcript = GOOD_TRANSCRIPT;
    expect((await POST(audioRequest(URL_PREP, wav(10), { cookie }))).status).toBe(200);
  });

  it("panne de la transcription : 502 propre, place rendue", async () => {
    mode.sttStatus = 500;
    const POST = await route();
    const cookie = fresh();
    const res = await POST(audioRequest(URL_PREP, wav(10), { cookie }));
    expect(res.status).toBe(502);
    expect((await res.json()).error).not.toMatch(/boom|Mistral|undefined/i);
    mode.sttStatus = 200;
    expect((await POST(audioRequest(URL_PREP, wav(10), { cookie }))).status).toBe(200);
  });

  it("l'analyse Mistral tombe : repli sur le parseur à règles, sans inventer TVA ni prix", async () => {
    mode.chatStatus = 500;
    mode.transcript = "devis pour Dupont, adresse 12 rue de la Paix à Caen, ligne pose de prises 800 euros, ligne main d'oeuvre 150 euros";
    const POST = await route();
    const res = await POST(audioRequest(URL_PREP, wav(10)));
    const j = await res.json();
    expect(res.status).toBe(200);
    expect(j.engine).toBe("regles");
    expect(j.devis.client).toBe("Dupont");
    expect(j.devis.lignes.map((l: { prix: number }) => l.prix)).toEqual([800, 150]);
    expect(j.devis.tva).toBe("");
  });

  it("réponse de l'IA illisible : repli sur les règles aussi", async () => {
    mode.extract = "ceci n'est pas du JSON";
    const POST = await route();
    expect((await (await POST(audioRequest(URL_PREP, wav(10)))).json()).engine).toBe("regles");
  });

  it("l'IA propose un taux de TVA farfelu : ignoré, jamais arrondi vers un taux voisin", async () => {
    mode.extract = { ...GOOD_EXTRACT, tva: "7" };
    const POST = await route();
    expect((await (await POST(audioRequest(URL_PREP, wav(10)))).json()).devis.tva).toBe("");
  });

  it("TVA dite : reprise telle quelle", async () => {
    mode.extract = { ...GOOD_EXTRACT, tva: "10" };
    const POST = await route();
    const j = await (await POST(audioRequest(URL_PREP, wav(10)))).json();
    expect(j.devis.tva).toBe("10");
    expect(j.missing).toEqual([]);
  });

  it("prix absent : signalé, pas inventé", async () => {
    mode.extract = { ...GOOD_EXTRACT, lignes: [{ designation: "Peinture du salon", quantite: null, prix: null }] };
    const POST = await route();
    const j = await (await POST(audioRequest(URL_PREP, wav(10)))).json();
    expect(j.devis.lignes[0].prix).toBeNull();
    expect(j.missing).toContain("prix");
  });

  it("rien de compréhensible dans le message : on explique quoi dire, essai non consommé", async () => {
    mode.transcript = "bonjour euh voilà je voulais dire quelque chose mais finalement non";
    mode.extract = { client: null, lignes: [], objet: null, tva: null };
    const POST = await route();
    const cookie = fresh();
    const res = await POST(audioRequest(URL_PREP, wav(10), { cookie }));
    expect(res.status).toBe(422);
    expect((await res.json()).code).toBe("incomprehensible");
    // L'essai n'est pas consommé : le magasin réel dit « disponible » pour ce visiteur et cette connexion.
    const cid = verifyVisitor(readCookie(new Headers({ cookie })));
    expect(cid).not.toBeNull();
    const { peek } = await import("@/lib/essai/quota");
    expect(await peek(store, cid, ipHash(normalizeIp("203.0.113.7")))).toBe("disponible");
  });
});

describe("PDF : accès", () => {
  const prep = async (cookie?: string) => {
    const POST = await route();
    const res = await POST(audioRequest(URL_PREP, wav(10), { cookie }));
    return { j: await res.json(), cookie: cookieOf(res) || cookie! };
  };
  const call = async (cookie: string | undefined, token: unknown, devis: object) =>
    (await pdfRoute())(new Request(URL_PDF, { method: "POST", headers: { host: "localhost:3000", "content-type": "application/json", ...(cookie ? { cookie } : {}) }, body: JSON.stringify({ token, devis }) }));
  const complete = { tva: "20", lignes: [{ designation: "Pose", quantite: 1, prix: 100 }] };

  it("sans jeton valide : refusé", async () => {
    const { cookie } = await prep();
    expect((await call(cookie, "n'importe quoi", complete)).status).toBe(403);
    expect((await call(cookie, undefined, complete)).status).toBe(403);
  });
  it("jeton d'un autre visiteur : refusé", async () => {
    const a = await prep();
    expect((await call(fresh(), a.j.token, complete)).status).toBe(403);
  });
  it("sans cookie : refusé", async () => {
    const a = await prep();
    expect((await call(undefined, a.j.token, complete)).status).toBe(403);
  });
  it("limité en nombre de téléchargements", async () => {
    const a = await prep();
    const out: number[] = [];
    for (let i = 0; i < 10; i++) out.push((await call(a.cookie, a.j.token, complete)).status);
    expect(out.filter((s) => s === 200)).toHaveLength(8);
    expect(out.at(-1)).toBe(429);
  });
  it("devis incomplet : demande la précision manquante", async () => {
    const a = await prep();
    const r = await call(a.cookie, a.j.token, { lignes: [{ designation: "Pose", prix: 100 }] });
    expect(r.status).toBe(422);
    expect((await r.json()).error).toMatch(/TVA/);
  });
  it("corps trop gros : refusé", async () => {
    const a = await prep();
    expect((await call(a.cookie, a.j.token, { objet: "x".repeat(70_000) })).status).toBe(413);
  });
});

describe("dictée du navigateur (texte déjà transcrit)", () => {
  const dictee = (transcript: unknown, init: { cookie?: string; origin?: string; ip?: string } = {}) =>
    new Request(URL_PREP, {
      method: "POST",
      headers: { host: "localhost:3000", "content-type": "application/json", "x-real-ip": init.ip ?? "203.0.113.7", ...(init.cookie ? { cookie: init.cookie } : {}), ...(init.origin ? { origin: init.origin } : {}) },
      body: JSON.stringify({ transcript }),
    });

  it("texte -> devis : aucune transcription payante, seule l'extraction est appelée", async () => {
    const POST = await route();
    const res = await POST(dictee(GOOD_TRANSCRIPT));
    expect(res.status).toBe(200);
    const j = await res.json();
    expect(j.devis.client).toBe("Madame Durand");
    expect(j.devis.tva).toBe("");
    expect(j.missing).toEqual(["tva"]);
    expect(calls).toEqual({ stt: 0, chat: 1 });
  });

  it("sans clé Mistral : le parseur à règles prend le relais, aucun appel payant, rien d'inventé", async () => {
    vi.stubEnv("MISTRAL_API_KEY", "");
    try {
      const POST = await route();
      const res = await POST(dictee("devis pour Monsieur Martin, pose de 5 prises à 20 euros"));
      expect(res.status).toBe(200);
      const j = await res.json();
      expect(j.engine).toBe("regles");
      expect(j.devis.client).toBe("Monsieur Martin");
      expect(j.devis.lignes).toEqual([{ designation: "Pose de prises", quantite: 5, prix: 20 }]);
      expect(j.devis.tva).toBe("");
      expect(calls).toEqual({ stt: 0, chat: 0 });
    } finally { vi.stubEnv("MISTRAL_API_KEY", "cle-de-test"); }
  });

  it("même quota que l'audio : un 2e essai est refusé, sans appel payant", async () => {
    const POST = await route();
    const first = await POST(dictee(GOOD_TRANSCRIPT));
    const cookie = cookieOf(first);
    const before = { ...calls };
    const second = await POST(dictee(GOOD_TRANSCRIPT, { cookie }));
    expect(second.status).toBe(403);
    expect(calls).toEqual(before);
    // et l'audio est refusé aussi : un seul essai, quel que soit le moteur
    const third = await POST(audioRequest(URL_PREP, wav(10), { cookie }));
    expect(third.status).toBe(403);
    expect(calls).toEqual(before);
  });

  it("8 dictées simultanées avec le même cookie : un seul appel payant", async () => {
    const POST = await route();
    const cookie = fresh();
    const res = await Promise.all(Array.from({ length: 8 }, () => POST(dictee(GOOD_TRANSCRIPT, { cookie }))));
    expect(res.filter((r) => r.status === 200)).toHaveLength(1);
    expect(calls.chat).toBe(1);
  });

  it("texte trop long, trop court, absent ou venant d'un autre site : refusé avant tout appel, essai conservé", async () => {
    const POST = await route();
    const cookie = fresh();
    expect((await POST(dictee("a ".repeat(2000), { cookie }))).status).toBe(413);
    expect((await POST(dictee("euh", { cookie }))).status).toBe(422);
    expect((await POST(dictee(42, { cookie }))).status).toBe(400);
    expect((await POST(dictee(GOOD_TRANSCRIPT, { cookie, origin: "https://evil.example" }))).status).toBe(403);
    expect(calls).toEqual({ stt: 0, chat: 0 });
    expect((await POST(dictee(GOOD_TRANSCRIPT, { cookie }))).status).toBe(200);
  });

  it("rien de compréhensible dans la dictée : message clair, place rendue, on peut réessayer", async () => {
    mode.extract = { client: null, lignes: [], objet: null, tva: null };
    const POST = await route();
    const cookie = fresh();
    const res = await POST(dictee("bonjour euh voilà je voulais dire quelque chose mais finalement non", { cookie }));
    expect(res.status).toBe(422);
    expect((await res.json()).code).toBe("incomprehensible");
    mode.extract = GOOD_EXTRACT;
    expect((await POST(dictee(GOOD_TRANSCRIPT, { cookie }))).status).toBe(200);
  });
});

describe("statut", () => {
  it("sans clé Mistral : l'essai reste ouvert pour la dictée du navigateur, l'audio est annoncé indisponible", async () => {
    const GET = (await import("@/app/api/essai/statut/route")).GET;
    const req = () => new Request("http://localhost:3000/api/essai/statut", { headers: { "x-real-ip": "203.0.113.9" } });
    expect(await (await GET(req())).json()).toEqual({ available: true, audio: true });
    vi.stubEnv("MISTRAL_API_KEY", "");
    try { expect(await (await GET(req())).json()).toEqual({ available: true, audio: false }); }
    finally { vi.stubEnv("MISTRAL_API_KEY", "cle-de-test"); }
  });
});
