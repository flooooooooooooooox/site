"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fond du hero : paysage nuageux "cloud tech" — volumes 3D lisses, ruban
 * enroule, lignes lumineuses — qui s'ecarte vers les bords et se dissipe au
 * defilement, comme une plongee a travers la couche. Le hero passe, le fond du
 * site redevient clair et uni.
 *
 * Chaque calque est un DIV distinct portant son SVG en image de fond, et non un
 * groupe a l'interieur d'un seul SVG : animer un <g> force le navigateur a
 * revectoriser le contenu a chaque frame (mesure : 83 ms par frame sur
 * desktop). Un div dont l'image est deja rasterisee se contente d'etre
 * recompose — seules transform et opacity sont animees.
 */

const W = 1440;
const H = 900;

const svg = (body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${body}</svg>`
  )}")`;

/** Degrades partages par les calques. */
const DEFS = `
<defs>
  <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.98"/>
    <stop offset="55%" stop-color="#EAF2FD" stop-opacity="0.92"/>
    <stop offset="100%" stop-color="#B9D2F1" stop-opacity="0.78"/>
  </linearGradient>
  <linearGradient id="volSoft" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/>
    <stop offset="100%" stop-color="#CBDDF6" stop-opacity="0.42"/>
  </linearGradient>
  <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
    <stop offset="45%" stop-color="#DCEAFB" stop-opacity="0.7"/>
    <stop offset="100%" stop-color="#7FB0EE" stop-opacity="0.3"/>
  </linearGradient>
  <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
    <stop offset="45%" stop-color="#FFFFFF" stop-opacity="0.85"/>
    <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="dot">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
    <stop offset="45%" stop-color="#CFE3FB" stop-opacity="0.6"/>
    <stop offset="100%" stop-color="#CFE3FB" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="vig" cx="0.5" cy="0.5" r="0.72">
    <stop offset="55%" stop-color="#FFFFFF" stop-opacity="1"/>
    <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
  </radialGradient>
  <mask id="soft"><rect width="${W}" height="${H}" fill="url(#vig)"/></mask>
</defs>`;

/** Volume nuageux lisse : des disques fondus, eclaires par le haut. */
const volume = (cx: number, cy: number, s: number, fill: string, o = 1) => {
  const lobes: [number, number, number][] = [
    [-210, 40, 140],
    [-70, -30, 185],
    [90, 10, 165],
    [230, 60, 130],
    [20, 95, 175],
  ];
  return `<g transform="translate(${cx} ${cy}) scale(${s})" opacity="${o}">
    ${lobes.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join("")}
    <ellipse cx="0" cy="150" rx="330" ry="120" fill="${fill}"/>
  </g>`;
};

// Le ciel est un degrade CSS et non une image : rien a rasteriser.
const SKY_CSS = "linear-gradient(155deg, #2F6FD8 0%, #5E97E8 34%, #9CC4F2 64%, #DCEAFB 100%)";

const BACK = svg(`${DEFS}<g mask="url(#soft)">
  ${volume(250, 760, 1.25, "url(#vol)")}
  ${volume(760, 830, 1.1, "url(#vol)", 0.95)}
  ${volume(1210, 790, 1.05, "url(#volSoft)")}
  ${volume(160, 120, 0.8, "url(#volSoft)", 0.75)}
  ${volume(980, 90, 0.7, "url(#volSoft)", 0.6)}
</g>`);

const SWIRL = svg(`${DEFS}<g mask="url(#soft)">
  <g transform="translate(1105 330) rotate(-24)">
    ${[
      [300, 208, 46, 0.5],
      [248, 170, 40, 0.62],
      [198, 134, 34, 0.72],
      [150, 100, 28, 0.82],
      [106, 70, 22, 0.9],
      [66, 43, 17, 0.95],
      [32, 21, 12, 1],
    ]
      .map(
        ([rx, ry, w, o]) =>
          `<ellipse rx="${rx}" ry="${ry}" fill="none" stroke="url(#ring)" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`
      )
      .join("")}
  </g>
  ${volume(1240, 560, 0.9, "url(#vol)", 0.85)}
  ${[
    ["M -40 820 C 320 760, 560 700, 900 520 S 1320 300, 1520 210", 2, 0.55],
    ["M -40 880 C 340 840, 620 780, 940 620 S 1340 420, 1520 330", 1.4, 0.43],
    ["M 120 900 C 420 880, 700 830, 1000 720 S 1360 560, 1520 480", 1.4, 0.31],
  ]
    .map(
      ([d, w, o]) =>
        `<path d="${d}" fill="none" stroke="url(#line)" stroke-width="${w}" opacity="${o}"/>`
    )
    .join("")}
  ${[
    [905, 518],
    [1188, 372],
    [648, 690],
    [1330, 300],
    [430, 795],
  ]
    .map(
      ([cx, cy]) =>
        `<circle cx="${cx}" cy="${cy}" r="22" fill="url(#dot)" opacity="0.55"/><circle cx="${cx}" cy="${cy}" r="3.2" fill="#FFFFFF" opacity="0.95"/>`
    )
    .join("")}
</g>`);

const FRONT = svg(`${DEFS}<g mask="url(#soft)">
  ${volume(520, 980, 1.5, "url(#vol)", 0.9)}
  ${volume(1180, 1010, 1.3, "url(#vol)", 0.8)}
</g>`);

export default function HeroCloudscape() {
  const rootRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const swirlRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const trigger = root.closest("section") ?? root;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: 0.6 },
        defaults: { ease: "none" },
      });

      // Chaque calque sort par un bord different : c'est l'ecartement, et non
      // le seul fondu, qui donne la sensation de traverser la couche.
      tl.to(backRef.current, { xPercent: -22, yPercent: 16, scale: 1.35, opacity: 0 }, 0)
        .to(swirlRef.current, { xPercent: 26, yPercent: -18, scale: 1.4, opacity: 0 }, 0)
        .to(frontRef.current, { yPercent: 30, scale: 1.6, opacity: 0 }, 0)
        .to(skyRef.current, { opacity: 0 }, 0.25);
    }, root);

    return () => ctx.revert();
  }, []);

  const layer = (image: string): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    backgroundImage: image,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
  });

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div ref={skyRef} style={{ ...layer(""), backgroundImage: SKY_CSS }} />
      <div ref={backRef} style={layer(BACK)} />
      <div ref={swirlRef} style={layer(SWIRL)} />
      <div ref={frontRef} style={layer(FRONT)} />
      {/* Sortie vers le fond uni de la suite. Un voile peint coute nettement
          moins qu'un mask-image sur le conteneur (mesure : 17 ms par frame). */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "34%",
          background: "linear-gradient(180deg, rgba(244,248,255,0) 0%, #F4F8FF 100%)",
        }}
      />
    </div>
  );
}
