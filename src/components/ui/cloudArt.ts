/**
 * Nuages 3D lisses, partages entre le hero et le pied de page.
 *
 * Un nuage = des disques fondus remplis d'un degre vertical : lumiere sur le
 * dessus, ombre bleutee dessous. C'est ce qui lui donne du volume la ou un
 * simple flou ne donne qu'une tache.
 *
 * Le rendu est encode en data-URI : le navigateur le rasterise une fois, puis
 * il n'y a plus qu'une image de fond a composer. Aucun filtre, rien a
 * recalculer au defilement.
 */

type Stop = { o: number; c: string; a: number };

const gradient = (id: string, stops: Stop[]) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops
    .map((s) => `<stop offset="${s.o}%" stop-color="${s.c}" stop-opacity="${s.a}"/>`)
    .join("")}</linearGradient>`;

const LOBES: [number, number, number][] = [
  [-210, 40, 140],
  [-70, -30, 185],
  [90, 10, 165],
  [230, 60, 130],
  [20, 95, 175],
];

const volume = (cx: number, cy: number, s: number, fill: string, o = 1) =>
  `<g transform="translate(${cx} ${cy}) scale(${s})" opacity="${o}">
    ${LOBES.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join("")}
    <ellipse cx="0" cy="150" rx="330" ry="120" fill="${fill}"/>
  </g>`;

/**
 * Bande de nuages 3D, prete a servir de background-image.
 * `tone` : "light" pour des volumes blancs sur fond clair, "onDark" pour des
 * volumes lumineux qui se detachent sur un fond bleu profond.
 */
export function cloudBand(tone: "light" | "onDark" = "light") {
  const stops: Stop[] =
    tone === "onDark"
      ? [
          { o: 0, c: "#FFFFFF", a: 0.92 },
          { o: 55, c: "#D8E6FA", a: 0.6 },
          { o: 100, c: "#7FA6DC", a: 0.22 },
        ]
      : [
          { o: 0, c: "#FFFFFF", a: 0.98 },
          { o: 55, c: "#EAF2FD", a: 0.9 },
          { o: 100, c: "#B9D2F1", a: 0.75 },
        ];

  const body = `<defs>${gradient("v", stops)}${gradient(
    "vs",
    stops.map((s) => ({ ...s, a: s.a * 0.55 }))
  )}</defs>
    ${volume(240, 330, 1.05, "url(#vs)", 0.8)}
    ${volume(760, 300, 0.85, "url(#vs)", 0.7)}
    ${volume(1240, 340, 1, "url(#vs)", 0.75)}
    ${volume(140, 430, 1.2, "url(#v)")}
    ${volume(620, 460, 1, "url(#v)", 0.95)}
    ${volume(1080, 440, 1.15, "url(#v)", 0.92)}
    ${volume(1480, 470, 0.95, "url(#v)", 0.88)}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 640" preserveAspectRatio="none">${body}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Rangee de nuages concue pour se repeter verticalement.
 *
 * Trois choses la distinguent de `cloudBand`, et chacune repond a un defaut
 * constate a l'ecran :
 *
 * 1. **La silhouette est une courbe, pas des disques.** Un nuage fait de
 *    cercles empiles se reconnait tout de suite : bosses de meme rayon,
 *    contours visibles la ou deux disques se recouvrent. Ici chaque nuage est
 *    un seul trace en arcs de cercle, avec des bosses de rayons inegaux et
 *    une base posee a plat.
 *
 * 2. **L'ombre est posee dans l'espace du dessin**, partagee par tout le
 *    nuage : la lumiere traverse la masse entiere au lieu d'eclairer chaque
 *    forme separement.
 *
 * 3. **Tout tient a l'interieur du cadre**, avec une marge en haut et en bas :
 *    deux tuiles mises bout a bout ne se touchent jamais, donc aucune ligne au
 *    raccord et aucun nuage tranche.
 */
export function cloudRow() {
  // Contours traces a l'arc de cercle et non a la courbe de Bezier : des
  // points de controle mal places font des pointes la ou on attend des bosses,
  // ce qui donnait des nuages en dents de scie. Un arc dont le rayon depasse
  // la moitie de la corde est toujours rond. Rayons volontairement inegaux :
  // des bosses identiques trahissent le dessin.
  const SHAPES = [
    // large, quatre bosses
    "M 0 220 A 62 62 0 0 1 96 160 A 92 92 0 0 1 272 128 A 78 78 0 0 1 418 156 A 58 58 0 0 1 520 206 L 520 220 Z",
    // moyen, trois bosses
    "M 0 180 A 50 50 0 0 1 78 128 A 76 76 0 0 1 222 104 A 76 76 0 0 1 350 166 L 350 180 Z",
    // long, cinq bosses
    "M 0 250 A 58 58 0 0 1 90 192 A 80 80 0 0 1 240 160 A 66 66 0 0 1 368 182 A 88 88 0 0 1 540 150 A 78 78 0 0 1 660 232 L 660 250 Z",
  ];

  const cloud = (i: number, x: number, y: number, sc: number, fill: string, o = 1) =>
    `<path d="${SHAPES[i]}" transform="translate(${x} ${y}) scale(${sc})" fill="${fill}" opacity="${o}"/>`;

  const shade = (id: string, y1: number, y2: number) =>
    `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
      <stop offset="46%" stop-color="#F3F8FF" stop-opacity="0.99"/>
      <stop offset="82%" stop-color="#CBDFF7" stop-opacity="0.97"/>
      <stop offset="100%" stop-color="#9DC0EA" stop-opacity="0.95"/>
    </linearGradient>`;

  // Deux plans : des nuages lointains plus hauts et plus pales, des nuages
  // proches plus bas et pleins. Marges : rien avant y=200 ni apres y=860, pour
  // que deux tuiles bout a bout ne se touchent jamais.
  const body = `<defs>${shade("rf", 200, 480)}${shade("rn", 500, 860)}</defs>
    ${cloud(1, 300, 260, 1.05, "url(#rf)", 0.5)}
    ${cloud(2, 980, 230, 0.78, "url(#rf)", 0.42)}
    ${cloud(2, 60, 560, 1.15, "url(#rn)")}
    ${cloud(0, 760, 580, 1.08, "url(#rn)", 0.96)}
    ${cloud(1, 1220, 540, 0.95, "url(#rn)", 0.9)}`;

  // Les dimensions sont declarees et le rapport de forme conserve. Sans elles,
  // le navigateur ne connait pas le rapport de l'image : avec une hauteur de
  // fond en `auto`, il prend alors toute la hauteur du calque et etire le
  // dessin — les nuages devenaient des pics verticaux.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000" preserveAspectRatio="xMidYMid meet">${body}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
