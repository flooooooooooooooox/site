/**
 * Lecture « a regles » d'une dictee en langage naturel, sans IA.
 *
 * Le parseur de l'ERP (voice-parse-rules.ts) attend des mots d'ancrage (« ligne pose de prises 800 euros »).
 * Une dictee spontanee (« six heures de main-d'oeuvre a 55 euros ») n'en contient pas : il ne trouve rien.
 * Ce lecteur sert quand l'analyse Mistral n'est pas disponible (pas de cle, ou panne).
 *
 * Principe de prudence, comme partout dans l'essai : on ne retient QUE ce qui est dit.
 * Un prix en toutes lettres n'est pas lu (la ligne est ignoree plutot qu'inventee) ;
 * la TVA n'est retenue que si un taux admis est prononce.
 */
import { MAX_LIGNES, type Tva } from "./devis";

export type FreeParsed = {
  client: string; adresse: string; objet: string; tva: Tva;
  lignes: { designation: string; quantite: number; prix: number }[];
};

const QTY_WORDS: Record<string, number> = {
  un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10, onze: 11, douze: 12,
};
const NUM = "\\d{1,3}(?:[\\s\\u00a0]\\d{3})+(?:[.,]\\d{1,2})?|\\d+(?:[.,]\\d{1,2})?";
const PRICE = `(${NUM})\\s*(?:€|euros?|eur\\b)`;
const STREET = "rue|avenue|av\\.|boulevard|bd|chemin|impasse|allée|allee|place|route|quai|cours|square|résidence|residence";
const STOP = "remplacement|pose|installation|rénovation|renovation|réfection|refection|réparation|reparation|création|creation|dépannage|depannage|travaux|devis|tva|ligne|un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix";

const toNumber = (s: string) => Number(s.replace(/[\s ]/g, "").replace(",", "."));
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const titleCase = (s: string) => s.split(/\s+/).map((w) => w.split("-").map(cap).join("-")).join(" ");
const clean = (s: string) => s.replace(/\s+/g, " ").replace(/^[\s,.;:–-]+|[\s,.;:–-]+$/g, "").trim();

function readTva(text: string): { tva: Tva; rest: string } {
  const t = text.replace(/(\d)\s*(?:%|pour\s*cent)/gi, "$1 %");
  const m = /\btva\s*(?:à|a|de|au taux de|taux)?\s*(20|10|5[.,]5|0|vingt|dix|cinq\s*virgule\s*cinq|zéro|zero)\s*(?:%|pour\s*cent)?/i.exec(t);
  let tva: Tva = "";
  if (m) {
    const v = m[1].toLowerCase().replace(/\s+/g, " ");
    tva = v === "20" || v === "vingt" ? "20" : v === "10" || v === "dix" ? "10" : /^5[.,]5$|cinq virgule cinq/.test(v) ? "5.5" : "0";
  } else if (/\b(sans tva|franchise en base|tva non applicable)\b/i.test(t)) {
    tva = "0";
  }
  return { tva, rest: m ? t.replace(m[0], " ") : t };
}

export function parseFreeText(raw: string): FreeParsed {
  let text = clean(raw.replace(/\s+/g, " "));
  const out: FreeParsed = { client: "", adresse: "", objet: "", tva: "", lignes: [] };

  const t = readTva(text);
  out.tva = t.tva;
  text = t.rest;

  // Client : seulement avec une civilite ou « societe/entreprise », sinon on ne devine pas.
  const civRe = new RegExp(
    `\\b(?:pour|client)\\s+(?:le\\s+|la\\s+)?(monsieur|madame|mme|mlle|m\\.?|société|societe|entreprise|ets|sarl|sas|eurl)\\s+([\\p{L}'’-]+(?:\\s+(?!(?:${STOP}|à|au|aux|chez|de|du|des|le|la|les|et)\\b)[\\p{L}'’-]+){0,2})`,
    "iu",
  );
  const cm = civRe.exec(text);
  if (cm) {
    const c = cm[1].toLowerCase().replace(/\.$/, "");
    const label = c === "m" ? "M." : cap(c === "mme" ? "Madame" : c === "societe" ? "société" : c);
    out.client = `${label} ${titleCase(clean(cm[2]))}`;
  }

  // Adresse du client : « 12 rue de la Paix a Caen ».
  const adr = new RegExp(`\\b(\\d{1,3}\\s*(?:bis|ter)?,?\\s+(?:${STREET})\\s+[^.;:]*?)(?=[.;:]|\\s+(?:${STOP})\\b|$)`, "iu").exec(text);
  if (adr) out.adresse = clean(adr[1]);

  // On retire ce qui est deja lu (client, adresse), puis on decoupe PRIX par PRIX :
  // la reconnaissance vocale ne met pas toujours de ponctuation.
  let rest = text;
  if (cm) rest = rest.replace(new RegExp(`(?:\\bdevis\\s+)?\\b(?:pour|client)\\s+(?:le\\s+|la\\s+)?${escapeRe(cm[0].replace(/^(?:pour|client)\s+(?:le\s+|la\s+)?/i, ""))}`, "i"), " ");
  if (adr) rest = rest.replace(adr[1], " ");
  rest = rest.replace(/^\s*devis\b[\s,.:]*/i, " ");

  const QTY = "\\d+(?:[.,]\\d+)?|un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze";
  const priceRe = new RegExp(PRICE, "gi");
  let cursor = 0;
  for (let m = priceRe.exec(rest); m; m = priceRe.exec(rest)) {
    const prix = toNumber(m[1]);
    let seg = rest.slice(cursor, m.index);
    cursor = m.index + m[0].length;
    if (!Number.isFinite(prix)) continue;

    // Ce qui precede la derniere phrase ou le « : » decrit les travaux, pas une ligne.
    const cut = Math.max(seg.lastIndexOf(":"), seg.search(/[.;][^.;]*$/));
    if (cut >= 0) {
      const head = clean(seg.slice(0, cut));
      if (head && !out.objet) out.objet = cap(head);
      seg = seg.slice(cut + 1);
    }
    seg = clean(seg).replace(/^(?:et|puis|ensuite|plus)\s+/i, "").replace(/\s+(?:à|a|pour|de|d'|au tarif de|=)$/i, "");

    let quantite = 1;
    let designation = seg;
    // La derniere quantite dite devant le prix : « ... un tableau », « ... six heures de main d'oeuvre ».
    const words = seg.split(" ");
    for (let i = words.length - 2; i >= 0; i--) {
      if (new RegExp(`^(?:${QTY})$`, "i").test(words[i])) {
        const n = /^\d/.test(words[i]) ? toNumber(words[i]) : QTY_WORDS[words[i].toLowerCase()];
        if (!(n > 0 && n <= 100_000)) continue;
        const prefix = words.slice(0, i);
        const after = words.slice(i + 1).join(" ");
        quantite = n;
        if (prefix.length <= 3) designation = [...prefix, after].join(" ");
        else { if (!out.objet) out.objet = cap(clean(prefix.join(" "))); designation = after; }
        break;
      }
    }
    designation = cap(clean(designation.replace(/^(?:de|d'|du|des|la|le|l')\s*/i, "")));
    if (!designation) continue;
    out.lignes.push({ designation: designation.slice(0, 200), quantite, prix });
    if (out.lignes.length >= MAX_LIGNES) break;
  }
  return out;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
