/**
 * PDF du devis d'essai, genere cote serveur avec pdf-lib.
 *
 * La mise en page suit le devis Cirrion de production (bandeau DEVIS, encadres
 * client et travaux, tableau avec TVA et TTC par ligne, totaux, paiement,
 * signatures). Ce n'est pourtant PAS ce gabarit : le PDF de production (Factur-X)
 * est produit par un service dedie (`pdf-service`, appele depuis n8n) qui n'est ni
 * dans ce depot ni joignable d'ici.
 *
 * Mentions legales : les lignes GENERIQUES du gabarit de production sont reprises
 * mot pour mot (penalites de retard L441-10, retractation L221-18, avenant, validite
 * 30 jours, TVA sur les encaissements, art. 293 B si TVA a 0 %). Les lignes qui
 * decrivent l'ENTREPRISE (SIRET, assureur, tribunal, mediateur, moyens de paiement)
 * restent « a completer » : le visiteur n'est pas Cirrion, on ne les devine pas.
 */
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { detailParLigne, euros, totaux, type Devis } from "./devis";

const BLUE = rgb(29 / 255, 78 / 255, 216 / 255);
const BLUE_SOFT = rgb(239 / 255, 245 / 255, 255 / 255);
const BLUE_LINE = rgb(191 / 255, 210 / 255, 250 / 255);
const INK = rgb(30 / 255, 41 / 255, 59 / 255);
const MUTED = rgb(100 / 255, 116 / 255, 139 / 255);
const PALE = rgb(248 / 255, 250 / 255, 252 / 255);
const ORANGE = rgb(194 / 255, 90 / 255, 12 / 255);
const RULE = rgb(226 / 255, 232 / 255, 240 / 255);
const WHITE = rgb(1, 1, 1);
const GREEN = rgb(5 / 255, 150 / 255, 105 / 255);
const AMBER = rgb(217 / 255, 119 / 255, 6 / 255);

const W = 595.28;
const H = 841.89;
const M = 36;
const CW = W - 2 * M;
/** Hauteur reservee en bas de page pour le pied de page legal. */
const FOOT = 74;
const VALID_DAYS = 30;

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
  const need = (h: number) => { if (y - h < FOOT + 12) newPage(); };
  const label = (s: string, x: number, yy: number, color = BLUE) => spaced(s.toUpperCase(), x, yy, 6.8, bold, color, 0.5);

  /* ----- En-tete : badge DEVIS, puces, emetteur ----- */
  rr(M, y, 62, 22, 3, { fill: BLUE });
  spaced("DEVIS", M + 9, y - 15, 11, bold, WHITE, 1.6);
  const until = new Date(now.getTime() + VALID_DAYS * 86_400_000);
  const chips: string[] = [`Émis le : ${dateLongue(now)}`, `Valable jusqu'au : ${dateLongue(until)}`];
  chips.push(d.tva === "0" ? "TVA non applicable — Franchise en base" : "TVA sur les encaissements");
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
  const idLines = [
    "Adresse, code postal, ville : à compléter",
    "SIRET : à compléter",
    "RNE : à compléter",
    d.tva === "0" ? "TVA non applicable, art. 293 B du CGI" : "N° TVA intracommunautaire : à compléter",
    "Tél. et e-mail : à compléter",
  ];
  idLines.forEach((l, k) => txtR(l, textRight, y - 19 - k * 9, 6.8, font, MUTED));
  if (initials) {
    rr(W - M - 30, y + 2, 30, 30, 5, { fill: BLUE });
    const iw = bold.widthOfTextAtSize(initials, 11);
    txt(initials, W - M - 15 - iw / 2, y - 18, 11, bold, WHITE);
  }
  y -= 66;
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
  need(96);
  const tw = 190;
  const tx = M + CW - tw;
  rr(tx, y, tw, 62, 4, { fill: WHITE, stroke: RULE });
  txt("Total HT", tx + 10, y - 15, 8.5, font, MUTED); txtR(euros(t.ht), tx + tw - 10, y - 15, 8.5, bold);
  page.drawLine({ start: { x: tx, y: y - 22 }, end: { x: tx + tw, y: y - 22 }, thickness: 0.5, color: RULE });
  txt(d.tva === "0" ? "TVA (0 %)" : `TVA (${d.tva.replace(".", ",")} %)`, tx + 10, y - 36, 8.5, font, MUTED);
  txtR(euros(t.tva), tx + tw - 10, y - 36, 8.5, bold);
  rr(tx, y - 40, tw, 22, 4, { fill: BLUE });
  spaced("TOTAL TTC", tx + 10, y - 55, 8.5, bold, WHITE, 0.6);
  txtR(euros(t.ttc), tx + tw - 10, y - 55, 10.5, bold, WHITE);
  y -= 70;
  if (d.tva === "0") {
    const m = wrap(ital, "Art. 293 B CGI — TVA non applicable, dispense de TVA (franchise en base de TVA).", 6.5, tw);
    m.forEach((l) => { txtR(l, tx + tw, y, 6.5, ital, MUTED); y -= 8.5; });
  }
  y -= 8;

  /* ----- Delai d'execution (seulement s'il a ete dit) ----- */
  if (d.duree_jours) {
    need(30);
    const lead = "Délai d'exécution : ";
    const dur = `${d.duree_jours} jour${d.duree_jours > 1 ? "(s)" : ""}`;
    const tail = " à compter de la réception de l'acompte et/ou de la signature du présent devis.";
    rr(M, y, CW, 22, 4, { fill: BLUE_SOFT });
    page.drawRectangle({ x: M, y: y - 22, width: 3, height: 22, color: BLUE });
    txt(lead, M + 12, y - 14, 8, font, BLUE);
    txt(dur, M + 12 + font.widthOfTextAtSize(lead, 8), y - 14, 8, bold, BLUE);
    txt(tail, M + 12 + font.widthOfTextAtSize(lead, 8) + bold.widthOfTextAtSize(dur, 8), y - 14, 8, font, BLUE);
    y -= 32;
  }

  /* ----- Modalites de paiement : toujours, car elles portent les penalites obligatoires ----- */
  {
    const inner = CW - 24;
    const rows: { l: string[]; f: PDFFont; color: ReturnType<typeof rgb>; size: number }[] = [];
    if (d.conditions) rows.push({ l: wrap(font, d.conditions, 8.5, inner), f: font, color: INK, size: 8.5 });
    rows.push({
      l: wrap(font, "⚠ Tout retard de paiement entraîne des pénalités de retard au taux légal en vigueur. Une indemnité forfaitaire de 40 € pour frais de recouvrement est due uniquement pour les clients professionnels, conformément à l'article L441-10 du Code de commerce.".replace("⚠ ", ""), 7.8, inner),
      f: font, color: ORANGE, size: 7.8,
    });
    rows.push({ l: wrap(font, "Modes de paiement acceptés : à compléter par l'entreprise.", 7.8, inner), f: font, color: MUTED, size: 7.8 });
    if (d.tva !== "0") rows.push({ l: wrap(font, "TVA sur les encaissements — La TVA sera exigible à l'encaissement des acomptes et du solde.", 7.8, inner), f: font, color: MUTED, size: 7.8 });
    const lines = rows.reduce((n, r) => n + r.l.length, 0);
    const h = 28 + lines * 10.5 + rows.length * 3;
    need(h + 10);
    rr(M, y, CW, h, 5, { fill: BLUE_SOFT, stroke: BLUE_LINE });
    txt("Modalités de paiement", M + 12, y - 16, 8.5, bold, BLUE);
    let ly = y - 30;
    for (const r of rows) {
      for (const ln of r.l) { txt(ln, M + 12, ly, r.size, r.f, r.color); ly -= 10.5; }
      ly -= 3;
    }
    y -= h + 12;
  }

  /* ----- Trois blocs legaux ----- */
  {
    const third = (CW - 12) / 3;
    const colW = third - 22;
    const blocks = [
      { t: "Assurance décennale & RC Pro", c: BLUE, rows: [
        { s: "Assurance Responsabilité Civile Décennale :", f: font },
        { s: "à compléter (assureur et n° de contrat).", f: bold },
        { s: "Garantie valable pour : à compléter.", f: font },
        { s: "RC Professionnelle : à compléter.", f: font },
      ] },
      { t: "Conditions générales & litiges", c: AMBER, rows: [
        { s: `Devis valable ${VALID_DAYS} jours à compter de sa date d'émission.`, f: font },
        { s: "En cas de litige, tribunal compétent : à compléter.", f: font },
        { s: "Médiation de la consommation : à compléter (nom et coordonnées du médiateur).", f: font },
        { s: "Tout travail supplémentaire fera l'objet d'un avenant signé.", f: font },
      ] },
      { t: "Droit de rétractation", c: GREEN, rows: [
        { s: "Pour tout contrat conclu hors établissement, le client particulier dispose d'un délai de", f: font },
        { s: "14 JOURS", f: bold },
        { s: "pour exercer son droit de rétractation (Art. L221-18 Code de la consommation).", f: font },
        { s: "Aucun paiement ni commencement de travaux avant expiration de ce délai, sauf demande expresse écrite du client.", f: font },
      ] },
    ].map((b) => ({ ...b, lines: b.rows.flatMap((r) => wrap(r.f, r.s, 7, colW).map((l) => ({ l, f: r.f, hi: r.f === bold && b.t.startsWith("Droit") }))) }));
    const bh = 26 + Math.max(...blocks.map((b) => b.lines.length)) * 9.3;
    need(bh + 10);
    blocks.forEach((b, i) => {
      const x = M + i * (third + 6);
      rr(x, y, third, bh, 4, { fill: PALE, stroke: RULE });
      page.drawRectangle({ x, y: y - bh, width: 2.5, height: bh, color: b.c });
      label(b.t, x + 10, y - 14, b.c);
      let ly = y - 27;
      for (const ln of b.lines) { txt(ln.l, x + 10, ly, ln.hi ? 8 : 7, ln.f, ln.hi ? BLUE : INK); ly -= 9.3; }
    });
    y -= bh + 14;
  }

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
  const centre = (p: PDFPage, text: string, yy: number, size: number, f: PDFFont, color: ReturnType<typeof rgb>) => {
    const str = safe(f, text);
    p.drawText(str, { x: (W - f.widthOfTextAtSize(str, size)) / 2, y: yy, size, font: f, color });
  };
  pdf.getPages().forEach((p, i, all) => {
    p.drawLine({ start: { x: M, y: 62 }, end: { x: W - M, y: 62 }, thickness: 0.5, color: RULE });
    centre(p, `${d.entreprise || "Votre entreprise"} | Adresse, SIRET, RNE : à compléter | TVA : ${d.tva === "0" ? "non applicable, art. 293 B du CGI" : "à compléter"}`, 51, 6.6, bold, MUTED);
    centre(p, "Tél., e-mail, assurance décennale (assureur, n° de contrat) : à compléter", 42, 6.6, font, MUTED);
    centre(p, `Document généré automatiquement — valable ${VALID_DAYS} jours à compter du ${dateLongue(now)}`, 33, 6.6, font, MUTED);
    centre(p, "Devis d'essai généré par Cirrion, sans valeur contractuelle : les mentions « à compléter » relèvent de votre entreprise.", 24, 6.6, ital, MUTED);
    const n = `${i + 1} / ${all.length}`;
    p.drawText(n, { x: W - M - font.widthOfTextAtSize(n, 7), y: 24, size: 7, font, color: MUTED });
  });

  return pdf.save();
}

export const pdfFileName = (d: Devis, now = new Date()) => {
  const who = (d.client || "devis").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30) || "devis";
  return `devis-essai-${who}-${now.toISOString().slice(0, 10)}.pdf`;
};
