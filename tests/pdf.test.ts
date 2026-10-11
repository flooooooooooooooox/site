import { inflateSync } from "node:zlib";
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

/** Texte des « Tj » du PDF : on décompresse les flux de page, puis on décode les chaînes hexadécimales. */
function texte(pdf: Uint8Array): string {
  const raw = Buffer.from(pdf);
  const out: string[] = [];
  let from = 0;
  for (;;) {
    const start = raw.indexOf("stream", from, "latin1");
    if (start < 0) break;
    let body = start + 6;
    if (raw[body] === 0x0d) body++;
    if (raw[body] === 0x0a) body++;
    const end = raw.indexOf("endstream", body, "latin1");
    if (end < 0) break;
    try { out.push(inflateSync(raw.subarray(body, end)).toString("latin1")); } catch { /* flux non compressé : ignoré */ }
    from = end + 9;
  }
  const content = out.join("\n");
  // Les phrases longues sont coupées en lignes : on les recolle pour chercher la phrase entière.
  return [...content.matchAll(/<([0-9A-Fa-f]+)>\s*Tj/g)].map((m) => Buffer.from(m[1], "hex").toString("latin1")).join(" ").replace(/\s+/g, " ");
}

describe("mentions légales du gabarit", () => {
  it("reprend mot pour mot les lignes génériques du devis de production", async () => {
    const t = texte(await buildDevisPdf(devis({ duree_jours: 7 }), new Date("2026-10-07")));
    for (const frag of [
      "pénalités de retard au taux légal en vigueur",
      "indemnité forfaitaire de 40",
      "article L441-10 du Code de commerce",
      "14 JOURS",
      "Art. L221-18 Code de la consommation",
      "Aucun paiement ni commencement de travaux avant expiration de ce délai",
      "Tout travail supplémentaire fera l'objet d'un avenant signé.",
      "Devis valable 30 jours à compter de sa date d'émission.",
      "TVA sur les encaissements",
      "La TVA sera exigible à l'encaissement des acomptes et du solde.",
      "à compter de la réception de l'acompte et/ou de la signature du présent devis.",
      "Lu et approuvé, bon pour accord",
    ]) expect(t, frag).toContain(frag);
  });

  it("ne devine rien de ce qui est propre à l'entreprise : « à compléter »", async () => {
    const t = texte(await buildDevisPdf(devis(), new Date("2026-10-07")));
    expect(t).toContain("SIRET : à compléter");
    expect(t).toContain("tribunal compétent : à compléter");
    expect(t).toContain("Modes de paiement acceptés : à compléter");
    expect(t).not.toMatch(/Tribunal judiciaire de|CMAP|IBAN sur demande|Non applicable/);
  });

  it("TVA à 0 % : mention de la franchise ; sinon pas de 293 B ni de TVA sur les encaissements en trop", async () => {
    const franchise = texte(await buildDevisPdf(devis({ tva: "0" })));
    expect(franchise).toContain("Art. 293 B CGI");
    expect(franchise).not.toContain("exigible à l'encaissement");
    const normal = texte(await buildDevisPdf(devis({ tva: "20" })));
    expect(normal).not.toContain("293 B");
  });

  it("le délai n'apparaît que s'il a été dit", async () => {
    expect(texte(await buildDevisPdf(devis({ duree_jours: null })))).not.toContain("Délai d'exécution");
    expect(texte(await buildDevisPdf(devis({ duree_jours: 5 })))).toContain("Délai d'exécution");
  });
});

describe("informations d'entreprise saisies par le visiteur", () => {
  const complet = {
    entreprise: "Durand Électricité", adresse_entreprise: "12 rue des Lilas, 14000 Caen", siret: "123 456 789 00012",
    tva_intra: "fr12345678901", tel_entreprise: "02 31 00 00 00", email_entreprise: "contact@durand.fr",
    assurance: "AXA, contrat n° 998877, France métropolitaine", tribunal: "tribunal judiciaire de Caen",
    mediateur: "CM2C, www.cm2c.net", modes_paiement: "chèque, virement, carte bancaire",
  };
  it("les valeurs saisies remplacent les « à compléter »", async () => {
    const t = texte(await buildDevisPdf(devis(complet), new Date("2026-10-07")));
    for (const v of ["12 rue des Lilas, 14000 Caen", "SIRET : 123 456 789 00012", "FR12345678901", "02 31 00 00 00", "contact@durand.fr", "AXA, contrat n° 998877", "tribunal judiciaire de Caen", "CM2C, www.cm2c.net", "chèque, virement, carte bancaire"]) expect(t, v).toContain(v);
    expect(t).not.toContain("SIRET : à compléter");
    expect(t).not.toContain("tribunal compétent : à compléter");
    expect(t).not.toContain("Modes de paiement acceptés : à compléter");
    expect(t).not.toContain("à compléter (assureur");
  });
  it("seul ce qui manque reste « à compléter »", async () => {
    const t = texte(await buildDevisPdf(devis({ siret: "123 456 789 00012" })));
    expect(t).toContain("SIRET : 123 456 789 00012");
    expect(t).toContain("tribunal compétent : à compléter");
  });
  it("à 0 % le numéro de TVA saisi n'est pas imprimé : c'est l'article 293 B qui s'applique", async () => {
    const t = texte(await buildDevisPdf(devis({ ...complet, tva: "0" })));
    expect(t).not.toContain("FR12345678901");
    expect(t).toContain("art. 293 B du CGI");
  });
  it("un texte démesuré est coupé, sans faire planter ni déborder", async () => {
    const long = "x".repeat(190);
    const bytes = await buildDevisPdf(devis({ ...complet, adresse_entreprise: long, assurance: long, entreprise: "E".repeat(115), mediateur: long }));
    expect((await PDFDocument.load(bytes)).getPageCount()).toBeLessThanOrEqual(2);
    const t = texte(bytes);
    expect(t).toContain("\u0085"); // « … » en WinAnsi
    expect(t).not.toContain(long);
  });
  it("le SIRET ne garde que des chiffres : pas d'injection de texte", () => {
    expect(sanitizeDevis({ siret: "12<b>3</b> 456; DROP" }).siret).toBe("123 456");
  });
});
