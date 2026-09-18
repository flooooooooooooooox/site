"use client";
import { useEffect, useRef } from "react";

/**
 * Le fond du site est une traversee de couche nuageuse, pilotee par le scroll.
 *
 *   haut de page .... on est DANS les nuages : gris dense, contraste
 *   milieu .......... on debouche : ciel bleu degage
 *   bas de page ..... on replonge : la couche se referme
 *
 * On traverse reellement : deux bandes plus hautes que l'ecran defilent a des
 * vitesses differentes, ce qui donne la profondeur. Un simple fondu entre deux
 * images fixes ne produit pas cette sensation.
 *
 * Ce qui coutait cher dans la premiere version n'etait pas le mouvement mais
 * le `filter: blur()` pose sur chaque nuage : deplacer une texture floutee la
 * fait re-rasteriser a chaque frame. Ici les nuages sont dessines en degrades
 * radiaux — peints une fois — et les bandes sont promues en calques
 * composites : le defilement n'est plus qu'une translation.
 */

// Un lobe de nuage = un degrade radial. `s` regle la douceur du bord.
function lobe(x: number, y: number, rx: number, ry: number, c: string, s = 52) {
  return `radial-gradient(ellipse ${rx}% ${ry}% at ${x}% ${y}%, ${c} 0%, ${c} ${s}%, rgba(255,255,255,0) 100%)`;
}

const WHITE = "rgba(255,255,255,0.97)";
const LIGHT = "rgba(228,233,242,0.95)";
const MID = "rgba(188,196,212,0.92)";
const DARK = "rgba(148,159,180,0.9)";
const DEEP = "rgba(124,136,160,0.88)";

// La bande du fond porte le ciel et la traversee ; celle de devant ne porte
// que des voiles. Plus haute, elle parcourt plus de chemin pour la meme
// fraction de scroll : c'est ce differentiel qui fait la profondeur.
const SKY_VH = 260;
const WISPS_VH = 360;

/**
 * Bande principale : la matiere du ciel. Les pourcentages verticaux sont
 * exprimes sur la hauteur totale de la bande (260 vh), pas sur l'ecran.
 */
const MAIN = [
  // --- on est DANS la masse : lobes sombres devant, lumiere sourde ---
  lobe(16, 1, 52, 10, DEEP, 54),
  lobe(62, 2, 54, 9, DARK, 54),
  lobe(94, 5, 46, 9, DEEP, 52),
  lobe(8, 8, 48, 8, DARK, 54),
  lobe(44, 10, 52, 8, DEEP, 56),
  lobe(80, 12, 48, 8, DARK, 54),
  // --- la lumiere monte : les lobes s'eclaircissent ---
  lobe(24, 15, 50, 8, MID, 52),
  lobe(68, 17, 48, 7, MID, 52),
  lobe(6, 20, 44, 7, LIGHT, 50),
  lobe(52, 22, 50, 8, WHITE, 48),
  lobe(90, 24, 42, 7, LIGHT, 48),
  // --- derniers lambeaux avant la sortie ---
  lobe(18, 28, 38, 6, "rgba(255,255,255,0.6)", 50),
  lobe(76, 31, 34, 5, "rgba(255,255,255,0.45)", 50),
  // --- ciel degage : nuages blancs isoles ---
  lobe(18, 42, 26, 4.5, "rgba(255,255,255,0.9)", 44),
  lobe(76, 49, 24, 4, "rgba(255,255,255,0.75)", 44),
  lobe(40, 57, 28, 4.5, "rgba(255,255,255,0.65)", 44),
  lobe(86, 63, 22, 3.5, "rgba(255,255,255,0.55)", 44),
  // --- la couche se referme : l'inverse, du clair vers le sombre ---
  lobe(22, 72, 40, 6, "rgba(255,255,255,0.6)", 50),
  lobe(70, 75, 44, 6, LIGHT, 50),
  lobe(12, 79, 48, 7, WHITE, 48),
  lobe(56, 82, 50, 7, MID, 52),
  lobe(92, 85, 44, 7, MID, 52),
  lobe(28, 89, 50, 8, DARK, 54),
  lobe(74, 92, 48, 8, DEEP, 56),
  lobe(10, 96, 46, 8, DARK, 54),
  lobe(58, 99, 52, 9, DEEP, 56),
  // --- le ciel lui-meme ---
  "linear-gradient(180deg," +
    " #8A95AB 0%, #909BB1 10%, #A3ADC2 18%, #C2CAD9 25%," +
    " #C6D9F6 32%, #A8C8F5 40%, #8FB8F1 50%, #8FB8F1 60%," +
    " #A8C8F5 68%, #C6D9F6 74%, #C2CAD9 81%," +
    " #A3ADC2 88%, #909BB1 95%, #8A95AB 100%)",
].join(", ");

/** Bande de fond : voiles plus diffus, qui avancent moins vite. */
const DEPTH = [
  lobe(70, 5, 60, 10, "rgba(255,255,255,0.5)", 55),
  lobe(20, 15, 58, 9, "rgba(140,152,175,0.45)", 58),
  lobe(84, 22, 54, 8, "rgba(255,255,255,0.4)", 55),
  lobe(30, 45, 46, 7, "rgba(255,255,255,0.35)", 55),
  lobe(78, 58, 44, 6, "rgba(255,255,255,0.3)", 55),
  lobe(16, 80, 58, 9, "rgba(140,152,175,0.4)", 58),
  lobe(74, 90, 60, 10, "rgba(255,255,255,0.45)", 55),
].join(", ");

export default function SkyJourney() {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const front = frontRef.current;
    const back = backRef.current;
    if (!front || !back) return;

    let queued = false;
    let raf = 0;

    const apply = () => {
      queued = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      const vh = window.innerHeight;
      // Ecriture directe dans le DOM : aucun rendu React pendant le scroll.
      back.style.transform = `translate3d(0, ${-p * ((SKY_VH - 100) / 100) * vh}px, 0)`;
      front.style.transform = `translate3d(0, ${-p * ((WISPS_VH - 100) / 100) * vh}px, 0)`;
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

  const band = (h: number): React.CSSProperties => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: `${h}vh`,
    willChange: "transform",
    backfaceVisibility: "hidden",
  });

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#8FB8F1",
      }}
    >
      <div ref={backRef} style={{ ...band(SKY_VH), background: MAIN }} />
      <div ref={frontRef} style={{ ...band(WISPS_VH), background: DEPTH }} />
    </div>
  );
}
