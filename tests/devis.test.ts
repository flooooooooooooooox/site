import { describe, expect, it } from "vitest";
import { emptyDevis, euros, missingFields, sanitizeDevis, totaux } from "@/lib/essai/devis";
import { extractWithRules } from "@/lib/essai/mistral";

describe("on n'invente rien", () => {
  it("une dictée sans TVA ne donne aucune TVA", () => {
    const d = extractWithRules("devis pour Dupont, ligne pose de prises 800 euros, ligne main d'oeuvre 150 euros");
    expect(d.tva).toBe("");
    expect(missingFields(d)).toContain("tva");
  });
  it("une prestation sans prix dit reste sans prix", () => {
    const d = sanitizeDevis({ lignes: [{ designation: "Peinture salon" }] });
    expect(d.lignes[0].prix).toBeNull();
    expect(missingFields(d)).toContain("prix");
  });
  it("aucune prestation : on le demande, on n'en crée pas", () => {
    expect(missingFields(emptyDevis())).toEqual(["lignes", "tva"]);
  });
  it("un devis complet n'a rien de manquant, et le reste est facultatif", () => {
    const d = sanitizeDevis({ tva: "10", lignes: [{ designation: "Pose", prix: 100 }] });
    expect(missingFields(d)).toEqual([]);
    expect(d.client).toBe("");
  });
});

describe("nettoyage de ce que renvoie le navigateur", () => {
  it("rejette les taux de TVA hors liste", () => {
    expect(sanitizeDevis({ tva: "7" }).tva).toBe("");
    expect(sanitizeDevis({ tva: "<script>" }).tva).toBe("");
    expect(sanitizeDevis({ tva: "5.5" }).tva).toBe("5.5");
  });
  it("borne et nettoie", () => {
    const d = sanitizeDevis({
      client: "A".repeat(500) + "\u0000",
      lignes: Array.from({ length: 80 }, (_, i) => ({ designation: `L${i}`, prix: 1, quantite: 1 })),
    });
    expect(d.client.length).toBe(120);
    expect(d.lignes).toHaveLength(30);
  });
  it("refuse les montants absurdes ou négatifs", () => {
    const d = sanitizeDevis({ lignes: [{ designation: "x", prix: -5, quantite: 1 }, { designation: "y", prix: 1e12 }, { designation: "z", prix: "12,50", quantite: "3" }] });
    expect(d.lignes.map((l) => l.prix)).toEqual([null, null, 12.5]);
    expect(d.lignes[2].quantite).toBe(3);
  });
  it("survit à n'importe quelle entrée", () => {
    for (const bad of [null, undefined, 42, "texte", [], { lignes: "non" }, { lignes: [null, 3, "a"] }]) {
      expect(() => sanitizeDevis(bad)).not.toThrow();
    }
  });
});

describe("totaux", () => {
  it("calcule en centimes, sans erreur d'arrondi flottant", () => {
    const d = sanitizeDevis({ tva: "20", lignes: [{ designation: "a", quantite: 3, prix: 0.1 }, { designation: "b", quantite: 1, prix: 0.2 }] });
    const t = totaux(d);
    expect(t.ht).toBe(50); // 0,50 € (et non 0,5000000000000001)
    expect(t.tva).toBe(10);
    expect(t.ttc).toBe(60);
  });
  it("5 prises à 20 € + 150 € de main d'œuvre, TVA 10 %", () => {
    const d = sanitizeDevis({ tva: "10", lignes: [{ designation: "Prises", quantite: 5, prix: 20 }, { designation: "MO", quantite: 1, prix: 150 }] });
    const t = totaux(d);
    expect([t.ht, t.tva, t.ttc]).toEqual([25000, 2500, 27500]);
    expect(euros(t.ttc)).toMatch(/275,00/);
  });
  it("TVA à 0 : le TTC égale le HT", () => {
    const t = totaux(sanitizeDevis({ tva: "0", lignes: [{ designation: "a", prix: 100 }] }));
    expect(t.ttc).toBe(t.ht);
  });
});
