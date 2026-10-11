// Repris tel quel de floxia-nextjs/lib/devis/voice-parse.ts (parseur de secours du devis dicté).
// Ne PAS le modifier ici sans le modifier dans l'ERP : c'est la meme logique, copiee parce que
// les deux projets ne partagent pas encore de paquet. Seul l'en-tete change.
//
// Parseur à RÈGLES « devis dicté → cases du formulaire » (zéro API, zéro IA).
//
// Principe (idée artisan) : on dicte un devis d'un trait, des MOTS D'ANCRAGE précis
// rangent ce qui suit dans la bonne case, jusqu'au prochain ancrage.
//   « devis pour Dupont Électricité, adresse 12 rue de la Paix à Caen, chantier
//     14 rue du Four, objet rénovation cuisine, téléphone 06 12 34 56 78,
//     ligne pose de prises 800 euros, ligne main d'œuvre 150 euros »
//
// Robuste : insensible à la casse/aux accents pour détecter les ancrages, mais on
// restitue la VALEUR dans sa casse d'origine. Les montants acceptent les CHIFFRES
// (« 800 ») — forme fiable en sortie Whisper — et un sous-ensemble de nombres en
// toutes lettres. Rien n'est jamais enregistré automatiquement : la sortie PRÉ-REMPLIT
// le formulaire, l'artisan relit et valide.

export interface ParsedDevisLine { designation: string; prix: number | null; quantite?: number | null; }
export interface ParsedDevis {
  client?: string;
  email?: string;
  telephone?: string;
  adresse?: string;
  adresse_chantier?: string;
  objet?: string;
  lignes: ParsedDevisLine[];
  reste?: string;   // texte non rangé (aide à la relecture / debug)
  // Champs avancés (remplis par l'analyse Mistral ; le parseur à règles les laisse vides).
  categorie?: string;              // une valeur de CATEGORIES_OP
  siren?: string;                  // SIREN/SIRET ou nom d'entreprise
  duree_jours?: number;            // durée estimée en jours
  modalite?: string;               // une valeur de MODALITES
  acompte_pct?: number;            // % d'acompte (modalité « Acompte / Solde »)
  echelonne_commande_pct?: number; // % à la commande (modalité « échelonné »)
  echelonne_encours_pct?: number;  // % en cours de chantier (modalité « échelonné »)
  terme_jours?: number;            // délai en jours (modalité « différé / à terme »)
  tva?: string;                    // '0' | '5.5' | '10' | '20'
  tva_regime?: 'encaissements' | 'debits';
  frequence?: string;              // une valeur de FREQUENCES (factures périodiques)
}

// Ancrages → champ. L'ordre compte peu (on détecte toutes les positions), mais les
// libellés plus spécifiques (« adresse du chantier ») doivent primer sur « adresse ».
type Field = 'client' | 'adresse' | 'adresse_chantier' | 'objet' | 'telephone' | 'email' | 'ligne';
const ANCHORS: Array<{ field: Field; words: string[] }> = [
  { field: 'adresse_chantier', words: ['adresse du chantier', 'adresse chantier', 'chantier', 'sur le chantier'] },
  { field: 'adresse', words: ['adresse du client', 'adresse client', 'adresse', 'domicilié', 'domiciliee', 'situe au', 'situee au'] },
  { field: 'client', words: ['devis pour', 'client', 'pour le client', 'au nom de', 'pour monsieur', 'pour madame', 'pour'] },
  { field: 'objet', words: ['objet des travaux', 'objet', 'travaux de', 'pour des travaux', 'pour les travaux', 'nature des travaux'] },
  { field: 'telephone', words: ['telephone', 'tel', 'numero', 'portable'] },
  { field: 'email', words: ['adresse mail', 'adresse email', 'email', 'mail', 'courriel'] },
  { field: 'ligne', words: ['ligne', 'prestation', 'poste', 'puis'] },
];

// Enlève les accents + minuscule, pour la DÉTECTION uniquement.
function norm(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Quelques nombres en toutes lettres (sous-ensemble courant pour montants simples).
// Les chiffres restent la voie fiable ; ceci couvre « huit cents », « mille deux cents »…
const WORD_NUM: Record<string, number> = {
  zero: 0, un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7,
  huit: 8, neuf: 9, dix: 10, onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15,
  seize: 16, vingt: 20, trente: 30, quarante: 40, cinquante: 50, soixante: 60,
  cent: 100, cents: 100, mille: 1000,
};
// Montant en FIN de désignation : « … 800 euros », « … huit cents », « … 150 € ».
const AMOUNT_TRAIL = new RegExp(
  `\\s*(?:\\d[\\d\\s.,]*|(?:\\b(?:${Object.keys(WORD_NUM).join('|')})\\b[\\s-]*)+)\\s*(?:euros?|€)?\\s*$`,
  'i',
);

function wordsToNumber(text: string): number | null {
  const toks = norm(text).replace(/-/g, ' ').split(/\s+/).filter(t => WORD_NUM[t] != null);
  if (!toks.length) return null;
  // Algorithme additif/multiplicatif simple : cent/mille multiplient le courant.
  let total = 0, current = 0;
  for (const t of toks) {
    const v = WORD_NUM[t];
    if (v === 100 || v === 1000) { current = (current || 1) * v; total += current; current = 0; }
    else current += v;
  }
  return total + current || null;
}

// Extrait un montant (€) depuis un bout de texte : d'abord les chiffres, sinon lettres.
function extractMontant(text: string): number | null {
  const n = norm(text);
  const digits = n.match(/(\d[\d\s.,]*)\s*(?:euros?|€)/);
  if (digits) {
    const num = parseFloat(digits[1].replace(/\s/g, '').replace(',', '.'));
    if (Number.isFinite(num)) return num;
  }
  const bare = n.match(/(\d[\d\s.,]*\d|\d)/);
  if (bare) {
    const num = parseFloat(bare[1].replace(/\s/g, '').replace(',', '.'));
    if (Number.isFinite(num)) return num;
  }
  const w = n.match(/([a-zàâéèêîïôûù\s-]*?)\s*(?:euros?|€)/);
  if (w) return wordsToNumber(w[1]);
  return null;
}

// Numéro de téléphone FR (10 chiffres, groupés ou non).
function extractTelephone(text: string): string | null {
  const m = text.match(/0\s*\d(?:\s*\d){8}/);
  return m ? m[0].replace(/\s+/g, ' ').trim() : null;
}

// E-mail : littéral (a@b.fr) ou dicté (« arobase »/« point »).
function extractEmail(text: string): string | null {
  const lit = text.match(/[\w.+-]+@[\w.-]+\.\w{2,}/);
  if (lit) return lit[0].toLowerCase();
  const dicte = norm(text).replace(/\s+arobase\s+/g, '@').replace(/\s+point\s+/g, '.').match(/[\w.+-]+@[\w.-]+\.\w{2,}/);
  return dicte ? dicte[0] : null;
}

// Nettoie une valeur de fin de segment (ponctuation, « et », « à » parasites).
function clean(v: string): string {
  return v.replace(/^[\s,.;:]+|[\s,.;:]+$/g, '').replace(/^(a|à|au|le|la|les|de|du)\s+/i, '').trim();
}

/**
 * Parse un devis dicté en champs pré-remplis. Déterministe, sans IA.
 * Les montants/téléphone/email sont extraits par motif ; le reste est segmenté
 * par mots d'ancrage. Renvoie ce qu'il a compris + `reste` (non rangé).
 */
export function parseDevisDictation(raw: string): ParsedDevis {
  const out: ParsedDevis = { lignes: [] };
  const text = (raw || '').trim();
  if (!text) return out;

  const nText = norm(text);

  // 1) Repère toutes les occurrences d'ancrages → positions (sur le texte normalisé,
  //    aligné 1:1 avec l'original car norm() ne change pas la longueur… sauf accents
  //    multi-octets : on travaille donc par indices de caractères sur la version
  //    normalisée et on découpe l'original aux mêmes indices — longueurs identiques
  //    car NFD+suppression de diacritiques conserve 1 lettre = 1 caractère de base).
  type Hit = { field: Field; start: number; end: number };  // [start,end[ = zone de l'ancrage
  const hits: Hit[] = [];
  for (const { field, words } of ANCHORS) {
    for (const w of words) {
      const rx = new RegExp(`(?:^|[^a-z])(${w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})(?=[^a-z]|$)`, 'g');
      let m: RegExpExecArray | null;
      while ((m = rx.exec(nText)) !== null) {
        const start = m.index + m[0].indexOf(m[1]);
        hits.push({ field, start, end: start + m[1].length });
      }
    }
  }
  if (!hits.length) { out.objet = clean(text); return out; }

  // 2) Garde, pour chaque position de départ, l'ancrage le PLUS LONG (spécifique) ;
  //    puis trie et élimine les chevauchements (un ancrage dans la valeur d'un autre).
  hits.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
  const kept: Hit[] = [];
  let lastEnd = -1;
  for (const h of hits) {
    if (h.start < lastEnd) continue;            // chevauche la valeur précédente
    if (kept.length && kept[kept.length - 1].start === h.start) continue;  // même départ, moins spécifique
    kept.push(h); lastEnd = h.end;
  }

  // 3) Chaque segment = valeur entre la fin d'un ancrage et le début du suivant.
  for (let i = 0; i < kept.length; i++) {
    const seg = text.slice(kept[i].end, i + 1 < kept.length ? kept[i + 1].start : text.length);
    const val = clean(seg);
    if (!val) continue;
    switch (kept[i].field) {
      case 'telephone': out.telephone = extractTelephone(seg) ?? val; break;
      case 'email': out.email = extractEmail(seg) ?? val; break;
      case 'client': if (!out.client) out.client = val; break;
      case 'adresse': if (!out.adresse) out.adresse = val; break;
      case 'adresse_chantier': if (!out.adresse_chantier) out.adresse_chantier = val; break;
      case 'objet': if (!out.objet) out.objet = val; break;
      case 'ligne': {
        const prix = extractMontant(seg);
        // Désignation = segment sans le montant de FIN (chiffres ou lettres) ni « euros ».
        // On ne retire l'amount qu'en fin de chaîne → préserve un nombre au milieu
        // (ex. « pose de 6 prises » garde « 6 »).
        const designation = clean(
          val
            .replace(AMOUNT_TRAIL, '')
            .replace(/\b(a|à|pour|au prix de)\b\s*$/i, ''),
        );
        if (designation || prix != null) out.lignes.push({ designation, prix });
        break;
      }
    }
  }

  // 4) Texte avant le 1er ancrage = non rangé (souvent « devis » / bruit).
  const avant = clean(text.slice(0, kept[0].start));
  if (avant && avant.length > 2) out.reste = avant;

  return out;
}
