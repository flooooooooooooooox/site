/**
 * PDF du devis d'essai, genere cote serveur avec pdf-lib.
 *
 * La mise en page suit le devis Cirrion de production (bandeau DEVIS, encadres
 * client et travaux, tableau avec TVA et TTC par ligne, totaux, paiement,
 * signatures). Ce n'est pourtant PAS ce gabarit : le PDF de production (Factur-X)
 * est produit par un service dedie (`pdf-service`, appele depuis n8n) qui n'est ni
 * dans ce depot ni joignable d'ici.
 *
 * Regle de fond : on n'ecrit que ce que le visiteur a dit ou saisi. Tout ce qui
 * releve de l'entreprise (SIRET, assurance, conditions generales, retractation)
 * reste « a completer » : aucun texte juridique n'est invente a sa place.
 */
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { detailParLigne, euros, totaux, type Devis } from "./devis";

const BLUE = rgb(29 / 255, 78 / 255, 216 / 255);
const BLUE_SOFT = rgb(239 / 255, 245 / 255, 255 / 255);
const BLUE_LINE = rgb(191 / 255, 210 / 255, 250 / 255);
const INK = rgb(30 / 255, 41 / 255, 59 / 255);
const MUTED = rgb(100 / 255, 116 / 255, 139 / 255);
const PALE = rgb(248 / 255, 250 / 255, 252 / 255);
const RULE = rgb(226 / 255, 232 / 255, 240 / 255);
const WHITE = rgb(1, 1, 1);
const ORANGE = rgb(194 / 255, 90 / 255, 12 / 255);
const GREEN = rgb(5 / 255, 150 / 255, 105 / 255);
const AMBER = rgb(217 / 255, 119 / 255, 6 / 255);

const W = 595.28;
const H = 841.89;
const M = 36;
const CW = W - 2 * M;

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

const dateLongue = (d: Date) => d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export async function buildDevisPdf(d: Devis, now = new Date()): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle("Devis d'essai Cirrion");
  pdf.setProducer("Cirrion — essai gratuit");
  pdf.setCreator("Cirrion");
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const ital = await pdf.embedFont(StandardFonts.HelveticaOblique);
  const t = totaux(d);
  const detail = detailParLigne(d);

  let page: PDFPage = pdf.addPage([W, H]);
  let y = H - M;

  /* ----- Primitives ----- */
  const rr = (x: number, top: number, w: number, h: number, r: number, o: { fill?: ReturnType<typeof rgb>; stroke?: ReturnType<typeof rgb>; sw?: number }) => {
    const path = `M ${r} 0 H ${w - r} a ${r} ${r} 0 0 1 ${r} ${r} V ${h - r} a ${r} ${r} 0 0 1 ${-r} ${r} H ${r} a ${r} ${r} 0 0 1 ${-r} ${-r} V ${r} a ${r} ${r} 0 0 1 ${r} ${-r} Z`;
    page.drawSvgPath(path, { x, y: top, color: o.fill, borderColor: o.stroke, borderWidth: o.stroke ? (o.sw ?? 0.7) : undefined });
  };
  const txt = (s: string, x: number, yy: number, size = 9, f: PDFFont = font, color = INK) =>
    page.drawText(safe(f, s), { x, y: yy, size, font: f, color });
  const txtR = (s: string, xr: number, yy: number, size = 9, f: PDFFont = font, color = INK) => {
    const str = safe(f, s);
    page.drawText(str, { x: xr - f.widthOfTextAtSize(str, size), y: yy, size, font: f, color });
  };
  const spaced = (s: string, x: number, yy: number, size: number, f: PDFFont, color: ReturnType<typeof rgb>, spacing: number) => {
    let cx = x;
    for (const c of safe(f, s)) {
      page.drawText(c, { x: cx, y: yy, size, font: f, color });
      cx += f.widthOfTextAtSize(c, size) + spacing;
    }
  };
  const newPage = () => { page = pdf.addPage([W, H]); y = H - M; };
  const need = (h: number) => { if (y - h < M + 34) newPage(); };
  const label = (s: string, x: number, yy: number, color = BLUE) => spaced(s.toUpperCase(), x, yy, 6.8, bold, color, 0.5);

  /* ----- En-tete : badge DEVIS, puces, emetteur ----- */
  rr(M, y, 62, 22, 3, { fill: BLUE });
  spaced("DEVIS", M + 9, y - 15, 11, bold, WHITE, 1.6);
  const chips: string[] = [`Émis le : ${dateLongue(now)}`];
  if (d.tva === "0") chips.push("TVA non applicable");
  let cx = M;
  const cy = y - 38;
  for (const c of chips) {
    const w = bold.widthOfTextAtSize(safe(bold, c), 6.8) + 12;
    rr(cx, cy + 9, w, 13, 2, { fill: rgb(0.93, 0.94, 0.97) });
    txt(c, cx + 6, cy + 2.5, 6.8, bold, MUTED);
    cx += w + 5;
  }

  const emitter = d.entreprise || "Votre entreprise (à compléter)";
  const initials = (d.entreprise.match(/[A-Za-zÀ-ÿ0-9]/g) ?? []).slice(0, 2).join("").toUpperCase();
  const textRight = W - M - (initials ? 40 : 0);
  txtR(emitter, textRight, y - 8, 9, bold, d.entreprise ? BLUE : MUTED);
  txtR("Adresse, SIRET, n° de TVA : à compléter", textRight, y - 20, 7, ital, MUTED);
  if (initials) {
    rr(W - M - 30, y + 2, 30, 30, 5, { fill: BLUE });
    const iw = bold.widthOfTextAtSize(initials, 11);
    txt(initials, W - M - 15 - iw / 2, y - 18, 11, bold, WHITE);
  }
  y -= 56;
  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 1.6, color: BLUE });
  y -= 14;

  /* ----- Encadres client / travaux ----- */
  const half = (CW - 10) / 2;
  const boxLines = (title: string, rows: { s: string; f?: PDFFont; size?: number; color?: ReturnType<typeof rgb> }[], x: number) => {
    const lines: { s: string; f: PDFFont; size: number; color: ReturnType<typeof rgb> }[] = [];
    for (const r of rows) for (const l of wrap(r.f ?? font, r.s, r.size ?? 8, half - 20)) lines.push({ s: l, f: r.f ?? font, size: r.size ?? 8, color: r.color ?? INK });
    return { title, lines, x, h: 26 + lines.length * 11.5 };
  };
  const client = boxLines("Client / maître d'ouvrage", [
    { s: d.client || "(Client : à compléter)", f: bold, size: 9, color: d.client ? INK : MUTED },
    ...(d.adresse ? [{ s: d.adresse }] : []),
    ...(d.email ? [{ s: d.email }] : []),
    ...(d.telephone ? [{ s: d.telephone }] : []),
  ], M);
  const travaux = boxLines("Objet & lieu des travaux", [
    ...(d.objet ? [{ s: d.objet, f: bold, size: 9 }] : [{ s: "(Objet : à compléter)", f: ital, color: MUTED }]),
    ...(d.adresse_chantier ? [{ s: d.adresse_chantier }] : []),
    ...(d.duree_jours ? [{ s: `Durée estimée : ${d.duree_jours} jour${d.duree_jours > 1 ? "s" : ""}`, f: bold }] : []),
  ], M + half + 10);
  const bh = Math.max(client.h, travaux.h, 60);
  need(bh + 10);
  for (const b of [client, travaux]) {
    rr(b.x, y, half, bh, 5, { fill: PALE, stroke: RULE });
    label(b.title, b.x + 10, y - 14);
    let ly = y - 28;
    for (const l of b.lines) { txt(l.s, b.x + 10, ly, l.size, l.f, l.color); ly -= 11.5; }
  }
  y -= bh + 16;

  /* ----- Tableau ----- */
  label("Détail des prestations", M, y);
  y -= 10;
  const colQte = M + CW - 232;
  const colPu = M + CW - 168;
  const colTva = M + CW - 100;
  const colTtc = M + CW - 8;
  const header = () => {
    page.drawRectangle({ x: M, y: y - 18, width: CW, height: 18, color: BLUE });
    spaced("N°", M + 6, y - 12, 6.8, bold, WHITE, 0.4);
    spaced("DÉSIGNATION DES TRAVAUX", M + 28, y - 12, 6.8, bold, WHITE, 0.4);
    const r = (s: string, x: number) => { const w = [...s].reduce((a, c) => a + bold.widthOfTextAtSize(c, 6.8) + 0.4, 0); spaced(s, x - w, y - 12, 6.8, bold, WHITE, 0.4); };
    r("QTÉ", colQte); r("PRIX HT (€)", colPu); r("TVA (€)", colTva); r("PRIX TTC (€)", colTtc);
    y -= 18;
  };
  need(60);
  header();
  const fmt = (c: number) => (c / 100).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  d.lignes.forEach((l, i) => {
    const lines = wrap(font, l.designation || "(sans désignation)", 8.5, colQte - M - 80);
    const rowH = Math.max(24, lines.length * 11 + 12);
    if (y - rowH < M + 34) { newPage(); header(); }
    if (i % 2 === 1) page.drawRectangle({ x: M, y: y - rowH, width: CW, height: rowH, color: PALE });
    page.drawLine({ start: { x: M, y: y - rowH }, end: { x: M + CW, y: y - rowH }, thickness: 0.5, color: RULE });
    const base = y - 15;
    txt(String(i + 1), M + 7, base, 8, font, MUTED);
    lines.forEach((ln, k) => txt(ln, M + 28, base - k * 11, 8.5, k === 0 ? bold : font));
    txtR(String(l.quantite).replace(".", ","), colQte, base, 8.5);
    if (l.prix === null) {
      txtR("—", colPu, base, 8.5); txtR("—", colTva, base, 8.5); txtR("—", colTtc, base, 8.5, bold);
    } else {
      txtR(fmt(Math.round(l.prix * 100)), colPu, base, 8.5);
      txtR(fmt(detail[i].tva), colTva, base, 8.5);
      txtR(fmt(detail[i].ttc), colTtc, base, 8.5, bold, BLUE);
    }
    y -= rowH;
  });
  y -= 14;

  /* ----- Totaux ----- */
  need(78);
  const tw = 190;
  const tx = M + CW - tw;
  rr(tx, y, tw, 62, 4, { fill: WHITE, stroke: RULE });
  txt("Total HT", tx + 10, y - 15, 8.5, font, MUTED); txtR(euros(t.ht), tx + tw - 10, y - 15, 8.5, bold);
  page.drawLine({ start: { x: tx, y: y - 22 }, end: { x: tx + tw, y: y - 22 }, thickness: 0.5, color: RULE });
  txt(d.tva === "0" ? "TVA (non applicable)" : `TVA (${d.tva.replace(".", ",")} %)`, tx + 10, y - 36, 8.5, font, MUTED);
  txtR(euros(t.tva), tx + tw - 10, y - 36, 8.5, bold);
  rr(tx, y - 40, tw, 22, 4, { fill: BLUE });
  spaced("TOTAL TTC", tx + 10, y - 55, 8.5, bold, WHITE, 0.6);
  txtR(euros(t.ttc), tx + tw - 10, y - 55, 10.5, bold, WHITE);
  y -= 78;

  /* ----- Delai, paiement (seulement ce qui a ete dit) ----- */
  if (d.duree_jours) {
    need(30);
    rr(M, y, CW, 22, 4, { fill: BLUE_SOFT });
    page.drawRectangle({ x: M, y: y - 22, width: 3, height: 22, color: BLUE });
    txt("Durée estimée des travaux :", M + 12, y - 14, 8, bold, BLUE);
    txt(`${d.duree_jours} jour${d.duree_jours > 1 ? "s" : ""}`, M + 12 + bold.widthOfTextAtSize("Durée estimée des travaux : ", 8), y - 14, 8, bold, INK);
    y -= 32;
  }
  if (d.conditions) {
    const lines = wrap(font, d.conditions, 8.5, CW - 24);
    const h = 30 + lines.length * 11.5;
    need(h + 10);
    rr(M, y, CW, h, 5, { fill: BLUE_SOFT, stroke: BLUE_LINE });
    txt("Modalités de paiement", M + 12, y - 15, 8.5, bold, BLUE);
    lines.forEach((l, k) => txt(l, M + 12, y - 30 - k * 11.5, 8.5));
    y -= h + 12;
  }

  /* ----- Mentions legales : a completer par l'entreprise ----- */
  need(78);
  const third = (CW - 12) / 3;
  const legal = [
    { t: "Assurance décennale & RC Pro", c: BLUE },
    { t: "Conditions générales & litiges", c: AMBER },
    { t: "Droit de rétractation", c: GREEN },
  ];
  legal.forEach((b, i) => {
    const x = M + i * (third + 6);
    rr(x, y, third, 56, 4, { fill: PALE, stroke: RULE });
    page.drawRectangle({ x, y: y - 56, width: 2.5, height: 56, color: b.c });
    label(b.t, x + 9, y - 13, b.c);
    txt("À compléter par l'entreprise.", x + 9, y - 28, 7.5, ital, MUTED);
    txt("Mention propre à votre situation.", x + 9, y - 39, 7.5, ital, MUTED);
  });
  y -= 70;

  /* ----- Signatures ----- */
  need(96);
  rr(M, y, CW, 82, 5, { fill: WHITE, stroke: RULE });
  label("Signature du prestataire", M + 14, y - 16);
  txt(d.entreprise || "(Votre entreprise)", M + 14, y - 28, 8, font, MUTED);
  page.drawLine({ start: { x: M + 14, y: y - 68 }, end: { x: M + CW / 2 - 14, y: y - 68 }, thickness: 0.6, color: MUTED });
  const rx = M + CW / 2 + 14;
  label("Bon pour accord — client", rx, y - 16);
  txt("Date : ____________________", rx, y - 30, 8, font, MUTED);
  txt("Précédé de la mention manuscrite « Lu et approuvé, bon pour accord »", rx, y - 42, 6.8, ital, MUTED);
  page.drawLine({ start: { x: rx, y: y - 68 }, end: { x: M + CW - 14, y: y - 68 }, thickness: 0.6, color: MUTED });
  y -= 92;

  /* ----- Pied de page : sur chaque page ----- */
  pdf.getPages().forEach((p, i, all) => {
    p.drawLine({ start: { x: M, y: 40 }, end: { x: W - M, y: 40 }, thickness: 0.5, color: RULE });
    const note = safe(font, "Devis d'essai généré par Cirrion, sans valeur contractuelle. Mentions légales (SIREN, assurance, conditions de vente) à compléter.");
    p.drawText(note, { x: M, y: 27, size: 7, font, color: MUTED });
    const n = `${i + 1} / ${all.length}`;
    p.drawText(n, { x: W - M - font.widthOfTextAtSize(n, 7.5), y: 27, size: 7.5, font, color: MUTED });
  });

  return pdf.save();
}

export const pdfFileName = (d: Devis, now = new Date()) => {
  const who = (d.client || "devis").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30) || "devis";
  return `devis-essai-${who}-${now.toISOString().slice(0, 10)}.pdf`;
};
