import { describe, expect, it } from "vitest";
import { parseFreeText } from "@/lib/essai/free-text";

describe("dictée spontanée lue sans IA", () => {
  it("l'exemple de la page", () => {
    const r = parseFreeText("Devis pour Madame Durand, 12 rue de la Paix à Caen. Remplacement du tableau électrique : un tableau à 450 euros, six heures de main-d'œuvre à 55 euros. TVA 10 %.");
    expect(r.client).toBe("Madame Durand");
    expect(r.adresse).toBe("12 rue de la Paix à Caen");
    expect(r.objet).toBe("Remplacement du tableau électrique");
    expect(r.tva).toBe("10");
    expect(r.lignes).toEqual([
      { designation: "Tableau", quantite: 1, prix: 450 },
      { designation: "Heures de main-d'œuvre", quantite: 6, prix: 55 },
    ]);
  });
  it("sortie typique d'une reconnaissance vocale : sans ponctuation", () => {
    const r = parseFreeText("devis pour Madame Durand remplacement du tableau électrique un tableau à 450 euros six heures de main d'oeuvre à 55 euros TVA 10 %");
    expect(r.client).toBe("Madame Durand");
    expect(r.tva).toBe("10");
    expect(r.objet).toBe("Remplacement du tableau électrique");
    expect(r.lignes).toEqual([
      { designation: "Tableau", quantite: 1, prix: 450 },
      { designation: "Heures de main d'oeuvre", quantite: 6, prix: 55 },
    ]);
  });
  it("adresse et quantité en toutes lettres", () => {
    const r = parseFreeText("Devis pour monsieur Martin 8 rue des Lilas à Caen pose de cinq prises à 20 euros et main d'oeuvre 150 euros");
    expect(r.client).toBe("Monsieur Martin");
    expect(r.adresse).toBe("8 rue des Lilas à Caen");
    expect(r.lignes).toEqual([
      { designation: "Pose de prises", quantite: 5, prix: 20 },
      { designation: "Main d'oeuvre", quantite: 1, prix: 150 },
    ]);
  });
  it("sans quantité, sans civilité", () => {
    const r = parseFreeText("pose de 5 prises à 20 euros, main d'oeuvre 150 euros");
    expect(r.client).toBe("");
    expect(r.lignes).toEqual([
      { designation: "Pose de prises", quantite: 5, prix: 20 },
      { designation: "Main d'oeuvre", quantite: 1, prix: 150 },
    ]);
  });
  it("ne devine jamais : pas de TVA dite = pas de TVA, prix en lettres = ligne ignorée", () => {
    const r = parseFreeText("peinture du salon quatre cents euros");
    expect(r.tva).toBe("");
    expect(r.lignes).toEqual([]);
  });
  it("taux de TVA : seuls les taux admis sont lus", () => {
    expect(parseFreeText("peinture 400 euros TVA 20 %").tva).toBe("20");
    expect(parseFreeText("peinture 400 euros TVA 5,5 pour cent").tva).toBe("5.5");
    expect(parseFreeText("peinture 400 euros TVA 7 %").tva).toBe("");
    expect(parseFreeText("peinture 400 euros, je suis en franchise en base").tva).toBe("0");
  });
  it("montants avec espaces et virgule", () => {
    const r = parseFreeText("rénovation salle de bain 1 200,50 euros");
    expect(r.lignes[0]).toMatchObject({ prix: 1200.5 });
  });
});
