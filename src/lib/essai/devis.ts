/**
 * Le devis d'essai : forme, nettoyage, ce qui manque, totaux.
 *
 * Regle de fond : on n'ecrit jamais une valeur que le visiteur n'a pas dite.
 * Un champ absent reste vide ; le taux de TVA en particulier n'a AUCUNE valeur
 * par defaut et ne se deduit pas du type de travaux.
 */

export type Tva = "" | "0" | "5.5" | "10" | "20";
export const TVA_VALUES: Tva[] = ["0", "5.5", "10", "20"];

export interface Ligne {
  designation: string;
  /** Nombre d'unites ; 1 quand le visiteur n'en a pas donne. */
  quantite: number;
  /** Prix unitaire HT en euros ; null tant qu'il n'a pas ete dit. */
  prix: number | null;
}

export interface Devis {
  client: string;
  email: string;
  telephone: string;
  adresse: string;
  adresse_chantier: string;
  objet: string;
  duree_jours: number | null;
  /** Texte libre repris de ce qui a ete dicte (acompte, paiement a 30 jours...). */
  conditions: string;
  tva: Tva;
  /** Facultatif : l'entreprise qui emet le devis, saisie par le visiteur. */
  entreprise: string;
  lignes: Ligne[];
}

export const MAX_LIGNES = 30;

export function emptyDevis(): Devis {
  return {
    client: "", email: "", telephone: "", adresse: "", adresse_chantier: "", objet: "",
    duree_jours: null, conditions: "", tva: "", entreprise: "", lignes: [],
  };
}

const text = (v: unknown, max: number): string =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";

const number = (v: unknown, min: number, max: number): number | null => {
  const n = typeof v === "number" ? v : typeof v === "string" ? parseFloat(v.replace(",", ".")) : NaN;
  return Number.isFinite(n) && n >= min && n <= max ? n : null;
};

/** Accepte n'importe quoi (le corps vient du navigateur) et rend un Devis sain. */
export function sanitizeDevis(input: unknown): Devis {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const lignesRaw = Array.isArray(o.lignes) ? o.lignes.slice(0, MAX_LIGNES) : [];
  const tva = typeof o.tva === "string" && (TVA_VALUES as string[]).includes(o.tva) ? (o.tva as Tva) : "";
  return {
    client: text(o.client, 120),
    email: text(o.email, 120),
    telephone: text(o.telephone, 30),
    adresse: text(o.adresse, 200),
    adresse_chantier: text(o.adresse_chantier, 200),
    objet: text(o.objet, 300),
    duree_jours: number(o.duree_jours, 1, 3650),
    conditions: text(o.conditions, 300),
    tva,
    entreprise: text(o.entreprise, 120),
    lignes: lignesRaw
      .map((l): Ligne => {
        const r = (l && typeof l === "object" ? l : {}) as Record<string, unknown>;
        return {
          designation: text(r.designation, 200),
          quantite: number(r.quantite, 0.01, 100_000) ?? 1,
          prix: number(r.prix, 0, 10_000_000),
        };
      })
      .filter((l) => l.designation || l.prix !== null),
  };
}

export type MissingCode = "lignes" | "prix" | "tva";

/** Seulement ce qui empeche de produire un devis utilisable. Le reste est facultatif. */
export function missingFields(d: Devis): MissingCode[] {
  const out: MissingCode[] = [];
  if (d.lignes.length === 0) out.push("lignes");
  else if (d.lignes.some((l) => l.prix === null || !l.designation)) out.push("prix");
  if (!d.tva) out.push("tva");
  return out;
}

export const MISSING_MESSAGES: Record<MissingCode, string> = {
  lignes: "Ajoutez au moins une prestation.",
  prix: "Indiquez le prix de chaque prestation.",
  tva: "Choisissez le taux de TVA : nous ne le devinons pas.",
};

/* ----- Montants : en centimes, pour ne jamais accumuler d'erreurs d'arrondi ----- */

export interface Totaux {
  lignes: number[]; // centimes HT par ligne
  ht: number;
  tva: number;
  ttc: number;
}

export function totaux(d: Devis): Totaux {
  const lignes = d.lignes.map((l) => (l.prix === null ? 0 : Math.round(l.quantite * l.prix * 100)));
  const ht = lignes.reduce((a, b) => a + b, 0);
  const taux = d.tva ? Number(d.tva) : 0;
  const tva = Math.round((ht * taux) / 100);
  return { lignes, ht, tva, ttc: ht + tva };
}

export const euros = (cents: number): string =>
  (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
