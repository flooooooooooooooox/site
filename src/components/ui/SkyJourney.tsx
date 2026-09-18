"use client";
import { useEffect, useRef } from "react";

/**
 * Le fond du site est une traversee de couche nuageuse, pilotee par le scroll.
 *
 *   haut de page .... on est DANS les nuages : gris dense, contraste
 *   milieu .......... on debouche : ciel bleu degage
 *   bas de page ..... on replonge : la couche se referme
 *
 * La matiere nuageuse est une turbulence fractale (feTurbulence), pas des
 * ellipses floutees : des degrades radiaux, meme adoucis, se lisent comme des
 * taches, parce qu'il leur manque les decoupes et les details fins d'un vrai
 * nuage. La turbulence donne cette texture a toutes les echelles.
 *
 * Cout : le SVG est rasterise une fois en image de fond, puis les bandes sont
 * simplement translatees — elles sont promues en calques composites, donc le
 * defilement ne redessine rien. C'est le `filter: blur()` d'une version
 * precedente qui coutait cher, parce qu'il se recalculait a chaque frame.
 */

// Les textures sont pre-calculees : generees une fois en turbulence fractale
// puis enregistrees en images. Laisser le navigateur executer feTurbulence sur
// un calque de la taille de l'ecran coutait 980 ms par frame au defilement sur
// desktop — le filtre se recalcule a chaque frame. Une image, elle, est
// simplement replaquee.
const MASS = 'url("/cloud-mass.webp")';
const WISPS = 'url("/cloud-wisps.webp")';

const SKY_VH = 260;
const WISPS_VH = 360;

// Le ciel bleu est peint PAR-DESSUS la matiere nuageuse, opaque au milieu et
// transparent aux deux bouts : c'est lui qui ouvre la trouee centrale.
const SKY_VEIL =
  "linear-gradient(180deg," +
  " rgba(143,184,241,0) 0%, rgba(143,184,241,0) 22%," +
  " rgba(168,200,245,0.55) 29%," +
  " #9FC3F6 36%, #8FB8F1 46%, #8FB8F1 58%, #9FC3F6 66%," +
  " rgba(168,200,245,0.55) 73%," +
  " rgba(143,184,241,0) 80%, rgba(143,184,241,0) 100%)";

// Densite de la couche : pleine en haut et en bas, absente au milieu.
const DENSITY =
  "linear-gradient(180deg," +
  " #000 0%, #000 20%, rgba(0,0,0,0.55) 27%, rgba(0,0,0,0) 34%," +
  " rgba(0,0,0,0) 66%, rgba(0,0,0,0.55) 73%, #000 80%, #000 100%)";

const BASE = "linear-gradient(180deg, #7E8AA2 0%, #8A95AB 14%, #A7B1C4 24%, #8FB8F1 40%, #8FB8F1 60%, #A7B1C4 76%, #8A95AB 86%, #7E8AA2 100%)";

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
      {/* Bande du ciel : matiere nuageuse, masquee au centre pour ouvrir le
          bleu, avec le voile bleu par-dessus. */}
      <div ref={backRef} style={{ ...band(SKY_VH), background: BASE }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `${MASS}, ${MASS}`,
            backgroundSize: "150% 30%, 110% 22%",
            backgroundPosition: "0 0, 40% 9%",
            backgroundRepeat: "repeat",
            // Le masque creuse la couche au milieu de la bande.
            maskImage: DENSITY,
            WebkitMaskImage: DENSITY,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: SKY_VEIL }} />
      </div>
      {/* Bande de devant : voiles fins, plus rapides — c'est l'ecart de
          vitesse entre les deux bandes qui donne la profondeur. */}
      <div
        ref={frontRef}
        style={{
          ...band(WISPS_VH),
          backgroundImage: WISPS,
          backgroundSize: "190% 20%",
          backgroundRepeat: "repeat",
          maskImage: DENSITY,
          WebkitMaskImage: DENSITY,
          opacity: 0.75,
        }}
      />
    </div>
  );
}
