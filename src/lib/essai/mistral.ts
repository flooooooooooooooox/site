/**
 * Voix -> texte -> champs du devis, avec le meme moteur que l'ERP Cirrion :
 * transcription Mistral Voxtral, extraction Mistral small en JSON strict,
 * parseur a regles en secours (voir floxia-nextjs/lib/devis/voice-parse-ai.ts).
 *
 * Differences voulues pour l'essai public :
 *  - le vocabulaire de l'organisation (catalogue, clients) n'existe pas ici :
 *    pas de contexte de biais propre au client, seulement le vocabulaire du metier ;
 *  - seuls les champs utiles a un devis d'essai sont demandes ;
 *  - les delais d'attente sont courts et bornes : un appel qui traine coute et bloque.
 *
 * La cle MISTRAL_API_KEY ne quitte jamais le serveur.
 */
import { Mistral } from "@mistralai/mistralai";
import { ESSAI } from "./config";
import { emptyDevis, MAX_LIGNES, type Devis, type Ligne, type Tva } from "./devis";
import { parseDevisDictation } from "./voice-parse-rules";

const DEVIS_MODEL = process.env.MISTRAL_DEVIS_MODEL || "mistral-small-latest";
const STT_MODEL = process.env.MISTRAL_STT_MODEL || "voxtral-small-latest";
const STT_BIAS = ["devis", "chantier", "main d'œuvre", "fourniture", "pose", "rénovation", "euros", "TVA", "acompte"];

export class MistralNotConfiguredError extends Error {
  constructor() {
    super("MISTRAL_API_KEY manquante");
    this.name = "MistralNotConfiguredError";
  }
}

function client(): Mistral {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) throw new MistralNotConfiguredError();
  // MISTRAL_SERVER_URL : uniquement pour pointer les tests vers un faux serveur.
  const serverURL = process.env.NODE_ENV !== "production" ? process.env.MISTRAL_SERVER_URL : undefined;
  return new Mistral({ apiKey, ...(serverURL ? { serverURL } : {}) });
}

const EXT: Record<string, string> = { wav: "wav", mp3: "mp3", m4a: "m4a", ogg: "ogg", webm: "webm" };

export async function transcribe(audio: Uint8Array, kind: string): Promise<string> {
  const res = await client().audio.transcriptions.complete(
    {
      model: STT_MODEL,
      file: { fileName: `essai.${EXT[kind] ?? "webm"}`, content: audio },
      language: "fr",
      contextBias: STT_BIAS,
    },
    { timeoutMs: ESSAI.transcribeTimeoutMs },
  );
  return (res.text || "").trim();
}

/* Prompt de l'ERP, reduit aux champs d'un devis d'essai. Les regles de fond sont inchangees :
   corriger la transcription, ne rien inventer, null pour tout ce qui n'est pas dit. */
const SYSTEM = `Tu extrais les informations d'un DEVIS d'artisan dicté à la voix, à partir d'une transcription audio souvent imparfaite (fautes, mots recollés, ponctuation manquante).
Corrige intelligemment : noms propres (« du pont » → « Dupont »), nombres écrits en lettres → chiffres. Ignore le bruit (« euh », répétitions).
Réponds UNIQUEMENT par un objet JSON valide, sans texte autour, avec EXACTEMENT ces clés :
{
  "client": string|null,
  "email": string|null,
  "telephone": string|null,
  "adresse": string|null,
  "adresse_chantier": string|null,
  "objet": string|null,
  "duree_jours": number|null,
  "conditions": string|null,   // conditions de paiement DITES (acompte, paiement à 30 jours...), recopiées en une phrase courte
  "tva": string|null,          // EXACTEMENT une de : "0","5.5","10","20", et SEULEMENT si le taux est prononcé
  "lignes": [ { "designation": string, "quantite": number|null, "prix": number|null } ]
}
Pour les lignes : « pose de 5 prises à 20 euros » → quantite 5, prix 20 (prix UNITAIRE HT). « main d'œuvre 150 euros » → quantite 1, prix 150. Si aucune quantité dite → quantite null. Si aucun prix dit → prix null.
Montants : convertis TOUJOURS en nombre (« quatre-vingt-dix » → 90, « mille deux cents » → 1200, « 99,90 » → 99.9). Ne confonds pas un numéro de téléphone avec un montant.
TVA : « TVA 10 / dix pour cent » → "10". « micro-entreprise / sans TVA » → "0". Si le taux n'est PAS prononcé : null. Ne déduis JAMAIS un taux du type de travaux.
Mets null (jamais de chaîne vide) pour tout champ NON dicté. N'invente JAMAIS d'information, de prix ou de quantité absents. "lignes" = [] si aucune prestation.`;

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const num = (v: unknown): number | null => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = parseFloat(v.replace(/[^\d.,-]/g, "").replace(",", "."));
    if (Number.isFinite(n)) return n;
  }
  return null;
};
function tva(v: unknown): Tva {
  const n = num(v);
  if (n === null) return "";
  if (n === 0) return "0";
  if (n === 5.5 || n === 5) return "5.5";
  if (n === 10) return "10";
  if (n === 20) return "20";
  return ""; // un taux inattendu n'est pas arrondi vers un taux voisin : on laisse le visiteur choisir
}

function fromRaw(raw: Record<string, unknown>): Devis {
  const d = emptyDevis();
  d.client = str(raw.client);
  d.email = str(raw.email);
  d.telephone = str(raw.telephone);
  d.adresse = str(raw.adresse);
  d.adresse_chantier = str(raw.adresse_chantier);
  d.objet = str(raw.objet);
  const jours = num(raw.duree_jours);
  d.duree_jours = jours !== null && jours > 0 ? Math.min(Math.round(jours), 3650) : null;
  d.conditions = str(raw.conditions);
  d.tva = tva(raw.tva);
  d.lignes = (Array.isArray(raw.lignes) ? raw.lignes : [])
    .slice(0, MAX_LIGNES)
    .map((l): Ligne => {
      const r = (l && typeof l === "object" ? l : {}) as Record<string, unknown>;
      const q = num(r.quantite);
      const p = num(r.prix);
      return { designation: str(r.designation), quantite: q !== null && q > 0 ? q : 1, prix: p !== null && p >= 0 ? p : null };
    })
    .filter((l) => l.designation || l.prix !== null);
  return d;
}

export async function extractWithMistral(transcript: string): Promise<Devis> {
  const res = await client().chat.complete(
    {
      model: DEVIS_MODEL,
      temperature: 0,
      responseFormat: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: `Transcription :\n"""${transcript.slice(0, 6000)}"""` },
      ],
    },
    { timeoutMs: ESSAI.extractTimeoutMs },
  );
  const content = res.choices?.[0]?.message?.content;
  const out = typeof content === "string"
    ? content
    : Array.isArray(content)
      ? content.map((c) => (typeof c === "object" && c && "text" in c ? String((c as { text: unknown }).text) : "")).join("")
      : "";
  if (!out.trim()) throw new Error("Réponse Mistral vide");
  return fromRaw(JSON.parse(out) as Record<string, unknown>);
}

/** Secours deterministe, comme dans l'ERP : ne renvoie jamais de TVA ni de prix inventes. */
export function extractWithRules(transcript: string): Devis {
  const p = parseDevisDictation(transcript);
  const d = emptyDevis();
  d.client = p.client ?? "";
  d.email = p.email ?? "";
  d.telephone = p.telephone ?? "";
  d.adresse = p.adresse ?? "";
  d.adresse_chantier = p.adresse_chantier ?? "";
  d.objet = p.objet ?? "";
  d.lignes = p.lignes
    .slice(0, MAX_LIGNES)
    .map((l) => ({ designation: l.designation, quantite: l.quantite && l.quantite > 0 ? l.quantite : 1, prix: l.prix }));
  return d;
}

export async function extractDevis(transcript: string): Promise<{ devis: Devis; engine: "mistral" | "regles" }> {
  try {
    return { devis: await extractWithMistral(transcript), engine: "mistral" };
  } catch (err) {
    if (err instanceof MistralNotConfiguredError) throw err;
    console.error("[essai] extraction Mistral KO, repli parseur à règles :", err instanceof Error ? err.message : err);
    return { devis: extractWithRules(transcript), engine: "regles" };
  }
}
