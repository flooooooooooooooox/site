/**
 * PDF du devis d'essai, genere cote serveur avec pdf-lib.
 *
 * Ce n'est PAS le gabarit de production de l'ERP : celui-ci (PDF Factur-X) est
 * produit par un service dedie (`pdf-service`, appele depuis n8n) qui n'est ni
 * dans ce depot ni joignable d'ici. Ce document est un vrai devis lisible, mais
 * il porte la mention « essai » et les mentions legales y restent à compléter.
 */
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { euros, totaux, type Devis } from "./devis";

const BLUE = rgb(36 / 255, 85 / 255, 214 / 255);
const INK = rgb(27 / 255, 42 / 255, 74 / 255);
const MUTED = rgb(0.4, 0.45, 0.55);
const LINE = rgb(0.85, 0.88, 0.94);

const W = 595.28;
const H = 841.89;
const M = 48;

/** Les polices standard du PDF ne savent ecrire que le jeu WinAnsi : le reste devient « ? ». */
function safe(font: PDFFont, s: string): string {
  const ok = new Set(font.getCharacterSet());
  return [...s.replace(/[   ]/g, " ").replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-")]
    .map((c) => (ok.has(c.codePointAt(0)!) ? c : "?"))
    .join("");
}

function wrap(font: PDFFont, text: string, size: number, maxWidth: number): string[] {
  const out: string[] = [];
  for (const para of safe(font, text).split("\n")) {
    let line = "";
    for (const word of para.split(" ")) {
      const test = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(test, size) <= maxWidth) line = test;
      else {
        if (line) out.push(line);
        // Mot plus large que la colonne : on le coupe.
        let rest = word;
        while (font.widthOfTextAtSize(rest, size) > maxWidth && rest.length > 1) {
          let n = rest.length - 1;
          while (n > 1 && font.widthOfTextAtSize(rest.slice(0, n), size) > maxWidth) n--;
          out.push(rest.slice(0, n));
          rest = rest.slice(n);
        }
        line = rest;
      }
    }
    out.push(line);
  }
  return out;
}

export async function buildDevisPdf(d: Devis, now = new Date()): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle("Devis d'essai Cirrion");
  pdf.setProducer("Cirrion — essai gratuit");
  pdf.setCreator("Cirrion");
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const t = totaux(d);

  let page: PDFPage = pdf.addPage([W, H]);
  let y = H - M;

  const text = (s: string, x: number, size = 10, f = font, color = INK) =>
    page.drawText(safe(f, s), { x, y, size, font: f, color });
  const right = (s: string, xRight: number, size = 10, f = font, color = INK) => {
    const str = safe(f, s);
    page.drawText(str, { x: xRight - f.widthOfTextAtSize(str, size), y, size, font: f, color });
  };

  const newPage = () => {
    page = pdf.addPage([W, H]);
    y = H - M;
  };
  const need = (h: number) => { if (y - h < M + 40) newPage(); };

  /* En-tete */
  page.drawRectangle({ x: 0, y: H - 86, width: W, height: 86, color: BLUE });
  y = H - 46;
  text("DEVIS", M, 26, bold, rgb(1, 1, 1));
  y = H - 66;
  text("Document d'essai généré par Cirrion", M, 9, font, rgb(0.85, 0.9, 1));
  y = H - 46;
  right(`Date : ${now.toLocaleDateString("fr-FR")}`, W - M, 10, font, rgb(1, 1, 1));
  y = H - 118;

  /* Emetteur / client */
  const colW = (W - 2 * M - 24) / 2;
  const block = (title: string, lines: string[], x: number): number => {
    let yy = y;
    page.drawText(safe(bold, title), { x, y: yy, size: 8, font: bold, color: MUTED });
    yy -= 15;
    for (const raw of lines) {
      for (const l of wrap(font, raw, 10, colW)) {
        page.drawText(l, { x, y: yy, size: 10, font, color: INK });
        yy -= 13.5;
      }
    }
    return yy;
  };
  const from = block("ÉMETTEUR", [d.entreprise || "(Votre entreprise : à compléter)"], M);
  const to = block(
    "CLIENT",
    [d.client || "(Client : à compléter)", d.adresse, d.telephone, d.email].filter(Boolean),
    M + colW + 24,
  );
  y = Math.min(from, to) - 14;

  if (d.objet) {
    need(40);
    page.drawText("OBJET", { x: M, y, size: 8, font: bold, color: MUTED });
    y -= 15;
    for (const l of wrap(font, d.objet, 11, W - 2 * M)) { text(l, M, 11, bold); y -= 15; }
  }
  if (d.adresse_chantier) {
    need(30);
    for (const l of wrap(font, `Lieu des travaux : ${d.adresse_chantier}`, 10, W - 2 * M)) { text(l, M, 10); y -= 14; }
  }
  if (d.duree_jours) { need(20); text(`Durée estimée : ${d.duree_jours} jour${d.duree_jours > 1 ? "s" : ""}`, M, 10); y -= 14; }
  y -= 10;

  /* Tableau */
  const cQte = W - M - 190;
  const cPu = W - M - 105;
  const cTot = W - M;
  const header = () => {
    page.drawRectangle({ x: M, y: y - 6, width: W - 2 * M, height: 22, color: rgb(0.94, 0.96, 1) });
    text("Désignation", M + 8, 9, bold);
    right("Qté", cQte, 9, bold);
    right("PU HT", cPu, 9, bold);
    right("Total HT", cTot - 8, 9, bold);
    y -= 26;
  };
  header();
  d.lignes.forEach((l, i) => {
    const lines = wrap(font, l.designation || "(sans désignation)", 10, cQte - M - 50);
    need(lines.length * 13 + 12);
    if (y > H - 40) header();
    const top = y;
    lines.forEach((ln, k) => { y = top - k * 13; text(ln, M + 8, 10); });
    y = top;
    right(String(l.quantite).replace(".", ","), cQte, 10);
    right(l.prix === null ? "-" : euros(Math.round(l.prix * 100)), cPu, 10);
    right(l.prix === null ? "-" : euros(t.lignes[i]), cTot - 8, 10, bold);
    y = top - lines.length * 13 - 4;
    page.drawLine({ start: { x: M, y: y + 6 }, end: { x: W - M, y: y + 6 }, thickness: 0.5, color: LINE });
    y -= 6;
  });

  /* Totaux */
  need(90);
  y -= 8;
  const row = (label: string, value: string, strong = false) => {
    text(label, W - M - 200, strong ? 11 : 10, strong ? bold : font, strong ? INK : MUTED);
    right(value, cTot - 8, strong ? 12 : 10, strong ? bold : font);
    y -= strong ? 20 : 16;
  };
  row("Total HT", euros(t.ht));
  row(d.tva === "0" ? "TVA (non applicable)" : `TVA ${d.tva.replace(".", ",")} %`, euros(t.tva));
  page.drawLine({ start: { x: W - M - 200, y: y + 12 }, end: { x: W - M, y: y + 12 }, thickness: 1, color: BLUE });
  row("Total TTC", euros(t.ttc), true);

  if (d.conditions) {
    need(46);
    y -= 8;
    page.drawText("CONDITIONS", { x: M, y, size: 8, font: bold, color: MUTED });
    y -= 15;
    for (const l of wrap(font, d.conditions, 10, W - 2 * M)) { text(l, M, 10); y -= 14; }
  }

  /* Mention d'essai : sur chaque page */
  pdf.getPages().forEach((p, i, all) => {
    const note = safe(font, "Devis d'essai généré par Cirrion, sans valeur contractuelle. Mentions légales (SIREN, assurance, conditions de vente) à compléter.");
    p.drawLine({ start: { x: M, y: 46 }, end: { x: W - M, y: 46 }, thickness: 0.5, color: LINE });
    p.drawText(note, { x: M, y: 32, size: 7.5, font, color: MUTED });
    const n = `${i + 1} / ${all.length}`;
    p.drawText(n, { x: W - M - font.widthOfTextAtSize(n, 8), y: 32, size: 8, font, color: MUTED });
  });

  return pdf.save();
}

export const pdfFileName = (d: Devis, now = new Date()) => {
  const who = (d.client || "devis").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30) || "devis";
  return `devis-essai-${who}-${now.toISOString().slice(0, 10)}.pdf`;
};
