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
