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
 * Deux differences avec `cloudBand`, et elles comptent toutes les deux :
 *
 * 1. Les volumes tiennent entierement dans le cadre, avec du ciel transparent
 *    au-dessus et au-dessous. Deux tuiles mises bout a bout ne se touchent
 *    donc jamais : il n'y a pas de bord a raccorder, donc pas de ligne.
 *
 * 2. Le degrade est en `userSpaceOnUse`, partage par toutes les formes d'un
 *    meme nuage. Avec le degrade par defaut, chaque disque recoit son propre
 *    ombrage et on voit les ronds les uns a cote des autres ; ici la lumiere
 *    traverse la masse entiere, et le nuage se lit comme un seul volume.
 */
export function cloudRow() {
  // Lobes de rayons varies et de centres decales : une silhouette reguliere
  // trahit tout de suite le dessin geometrique.
  const PUFFS: [number, number, number][][] = [
    [[-250, 42, 128], [-130, -18, 168], [-10, -46, 196], [112, -8, 162], [226, 48, 120], [38, 70, 178]],
    [[-210, 36, 112], [-80, -30, 156], [52, -12, 184], [184, 34, 128], [-20, 76, 160]],
    [[-190, 50, 104], [-62, -22, 148], [78, -40, 170], [198, 20, 132], [10, 68, 152]],
  ];

  const puff = (cx: number, cy: number, sc: number, fill: string, o = 1, k = 0) =>
    `<g transform="translate(${cx} ${cy}) scale(${sc})" opacity="${o}">
      ${PUFFS[k % PUFFS.length]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`)
        .join("")}
      <ellipse cx="0" cy="132" rx="316" ry="104" fill="${fill}"/>
    </g>`;

  // Le degrade est pose dans l'espace du dessin, pas dans celui de chaque
  // forme : c'est ce qui fait disparaitre les contours de disques. L'ombre du
  // dessous reste franche, sinon la masse se dilue dans le ciel et le nuage
  // perd son volume.
  const shade = (id: string, y1: number, y2: number, a: number) =>
    `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="${0.99 * a}"/>
      <stop offset="42%" stop-color="#F2F7FE" stop-opacity="${0.96 * a}"/>
      <stop offset="78%" stop-color="#C6DAF4" stop-opacity="${0.95 * a}"/>
      <stop offset="100%" stop-color="#8FB4E4" stop-opacity="${0.92 * a}"/>
    </linearGradient>`;

  const body = `<defs>${shade("rf", 170, 560, 0.62)}${shade("rn", 380, 850, 1)}</defs>
    ${puff(380, 390, 0.72, "url(#rf)", 0.85, 1)}
    ${puff(1120, 352, 0.6, "url(#rf)", 0.7, 2)}
    ${puff(250, 605, 0.86, "url(#rn)", 1, 0)}
    ${puff(840, 632, 0.76, "url(#rn)", 0.96, 2)}
    ${puff(1360, 592, 0.8, "url(#rn)", 0.92, 1)}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="none">${body}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
