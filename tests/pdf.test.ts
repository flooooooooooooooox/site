import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { sanitizeDevis } from "@/lib/essai/devis";
import { buildDevisPdf, pdfFileName } from "@/lib/essai/pdf";

const devis = (over: object = {}) =>
  sanitizeDevis({
    client: "Mme Durand", adresse: "12 rue de la Paix, Caen", objet: "Remplacement du tableau électrique",
    tva: "10", conditions: "Acompte de 30 % à la commande",
    lignes: [{ designation: "Tableau électrique 3 rangées", quantite: 1, prix: 450 }, { designation: "Main d'œuvre", quantite: 6, prix: 55 }],
    ...over,
  });

describe("PDF", () => {
  it("produit un vrai PDF qui se rouvre", async () => {
    const bytes = await buildDevisPdf(devis(), new Date("2026-10-11"));
    expect(new TextDecoder().decode(bytes.subarray(0, 5))).toBe("%PDF-");
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(1);
    expect(doc.getTitle()).toContain("Devis");
    expect(bytes.length).toBeGreaterThan(1500);
  });
  it("tient les caractères hors jeu WinAnsi sans planter (emoji, tirets longs, espaces fines)", async () => {
    const bytes = await buildDevisPdf(devis({ client: "Dupont 😀 & Fils — SARL", objet: "Pose  de carrelage ✓ 日本" }));
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(1);
  });
  it("passe à la page suivante quand il y a beaucoup de lignes", async () => {
    const lignes = Array.from({ length: 30 }, (_, i) => ({ designation: `Prestation numéro ${i + 1} avec une désignation assez longue pour passer sur plusieurs lignes dans la colonne`, quantite: 2, prix: 10 + i }));
    const doc = await PDFDocument.load(await buildDevisPdf(devis({ lignes })));
    expect(doc.getPageCount()).toBeGreaterThan(1);
  });
  it("accepte un devis sans client ni objet (champs facultatifs)", async () => {
    const bytes = await buildDevisPdf(devis({ client: "", adresse: "", objet: "", conditions: "" }));
    expect((await PDFDocument.load(bytes)).getPageCount()).toBe(1);
  });
  it("nom de fichier sûr", () => {
    expect(pdfFileName(devis({ client: "Zoë /../ <Dupont>" }), new Date("2026-10-11"))).toBe("devis-essai-Zoe-Dupont-2026-10-11.pdf");
    expect(pdfFileName(devis({ client: "" }), new Date("2026-10-11"))).toBe("devis-essai-devis-2026-10-11.pdf");
  });
});
