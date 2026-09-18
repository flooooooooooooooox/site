"use client";
import { useEffect, useRef } from "react";

/**
 * Le fond du site est une traversee de couche nuageuse, pilotee par le scroll.
 *
 *   haut de page .... on est DANS les nuages : gris dense, contraste
 *   milieu .......... on debouche : ciel bleu degage
 *   bas de page ..... on replonge : les nuages se referment
 *
 * Mise en oeuvre : trois calques fixes empiles, de la taille du viewport. Le
 * ciel bleu est le fond, les deux couches nuageuses se croisent par simple
 * opacite selon l'avancement du scroll.
 *
 * Pourquoi pas une grande bande que l'on translate : deplacer une texture de
 * 300 vh chargee de `filter: blur()` la fait re-rasteriser au defilement, ce
 * qui saccade des qu'il y a d'autres animations liees au scroll sur la page.
 * Ici rien ne bouge et aucun filtre n'est utilise — les nuages sont dessines
 * en degrades radiaux, que le compositeur peint une fois pour toutes. Seule
 * l'opacite varie, et elle est composite.
 */

// Un lobe de nuage = un degrade radial. `c` est la couleur du lobe, `s` sa
// douceur de bord (plus la valeur est basse, plus le bord est net).
function lobe(x: number, y: number, rx: number, ry: number, c: string, s = 55) {
  return `radial-gradient(ellipse ${rx}% ${ry}% at ${x}% ${y}%, ${c} 0%, ${c} ${s}%, rgba(255,255,255,0) 100%)`;
}

const WHITE = "rgba(255,255,255,0.96)";
const LIGHT = "rgba(226,231,240,0.95)";
const MID = "rgba(186,194,210,0.92)";
const DARK = "rgba(146,157,178,0.9)";
const DEEP = "rgba(122,134,158,0.85)";

// Couche haute : on est dedans, la lumiere est sourde. Les lobes sombres sont
// places sous les lobes clairs — c'est ce decalage qui donne l'epaisseur.
const CLOUDS_TOP = [
  lobe(14, 18, 42, 34, WHITE, 48),
  lobe(52, 10, 46, 32, LIGHT, 50),
  lobe(86, 22, 40, 32, WHITE, 46),
  lobe(30, 34, 44, 30, MID, 52),
  lobe(70, 38, 42, 28, MID, 52),
  lobe(8, 52, 38, 28, DARK, 54),
  lobe(48, 58, 46, 30, DARK, 56),
  lobe(90, 62, 36, 26, DEEP, 54),
  lobe(26, 78, 44, 30, DEEP, 58),
  lobe(72, 84, 42, 28, DARK, 56),
  "linear-gradient(180deg, #C6CDDA 0%, #B4BDCE 38%, #A3ADC2 70%, #96A1B8 100%)",
].join(", ");

// Couche basse : la couche se referme, on y rentre par le dessus. Les lobes
// clairs sont donc en bas cette fois.
const CLOUDS_BOTTOM = [
  lobe(20, 84, 44, 32, WHITE, 48),
  lobe(58, 90, 46, 30, LIGHT, 50),
  lobe(88, 78, 38, 30, WHITE, 46),
  lobe(34, 66, 44, 28, MID, 52),
  lobe(74, 62, 40, 28, MID, 52),
  lobe(10, 46, 38, 28, DARK, 54),
  lobe(50, 40, 46, 28, DARK, 56),
  lobe(88, 32, 36, 26, DEEP, 54),
  lobe(24, 18, 44, 30, DEEP, 58),
  lobe(70, 12, 42, 28, DARK, 56),
  "linear-gradient(0deg, #C6CDDA 0%, #B4BDCE 38%, #A3ADC2 70%, #96A1B8 100%)",
].join(", ");

// Ciel degage : quelques nuages blancs isoles sur le bleu.
const SKY = [
  lobe(16, 24, 26, 18, "rgba(255,255,255,0.85)", 45),
  lobe(78, 36, 24, 16, "rgba(255,255,255,0.7)", 45),
  lobe(44, 72, 28, 18, "rgba(255,255,255,0.6)", 45),
  "linear-gradient(180deg, #A8C8F5 0%, #8FB8F1 46%, #93BAF2 100%)",
].join(", ");

// Bornes de la traversee, en fraction de scroll.
const OUT_START = 0.04; // on commence a sortir des nuages
const OUT_END = 0.26; // ciel degage
const IN_START = 0.7; // la couche se reforme
const IN_END = 0.94; // on est dedans

const ramp = (p: number, a: number, b: number) =>
  Math.min(Math.max((p - a) / (b - a), 0), 1);

export default function SkyJourney() {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!top || !bottom) return;

    let queued = false;
    let raf = 0;

    const apply = () => {
      queued = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      // Ecriture directe dans le DOM : aucun rendu React pendant le scroll.
      top.style.opacity = String(1 - ramp(p, OUT_START, OUT_END));
      bottom.style.opacity = String(ramp(p, IN_START, IN_END));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const layer: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    willChange: "opacity",
    // Promotion explicite : sans elle, Chromium re-rasterise ces degrades a
    // chaque changement d'opacite au lieu de se contenter de recomposer.
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    contain: "strict",
  };

  return (
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: SKY }}
    >
      <div ref={topRef} style={{ ...layer, background: CLOUDS_TOP, opacity: 1 }} />
      <div ref={bottomRef} style={{ ...layer, background: CLOUDS_BOTTOM, opacity: 0 }} />
    </div>
  );
}
