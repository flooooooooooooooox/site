"use client";
import { useEffect, useRef } from "react";

/**
 * Le fond du site est une traversee de couche nuageuse, pilotee par le scroll.
 *
 *   haut de page .... on est DANS les nuages : gris dense, contraste
 *   milieu .......... on debouche : ciel bleu degage
 *   bas de page ..... on replonge : les nuages se referment
 *
 * Mise en oeuvre : un cadre fixe au viewport, et a l'interieur une bande
 * beaucoup plus haute que l'ecran que l'on translate selon l'avancement du
 * scroll. Le deplacement est ecrit directement dans le DOM depuis une frame
 * d'animation — aucun rendu React pendant le defilement.
 */

const LAYER_VH = 300; // hauteur de la bande de ciel, en % de viewport

type Puff = {
  top: string;
  left: string;
  w: number;
  scale: number;
  shade: number; // 0 = blanc lumineux, 1 = gris d'ombre
  opacity: number;
  blur: number;
};

// Nuages du haut et du bas : c'est l'alternance de lobes clairs et de lobes
// gris qui donne l'epaisseur. Un nuage uniforme se lit comme un aplat.
const PUFFS: Puff[] = [
  // --- entree dans la couche, tout en haut ---
  { top: "-4%", left: "-12%", w: 620, scale: 1, shade: 0.55, opacity: 1, blur: 10 },
  { top: "1%", left: "18%", w: 540, scale: 1, shade: 0.15, opacity: 1, blur: 8 },
  { top: "-3%", left: "46%", w: 660, scale: 1, shade: 0.7, opacity: 1, blur: 12 },
  { top: "2%", left: "74%", w: 560, scale: 1, shade: 0.25, opacity: 1, blur: 9 },
  { top: "7%", left: "4%", w: 480, scale: 1, shade: 0.85, opacity: 0.95, blur: 14 },
  { top: "8%", left: "58%", w: 520, scale: 1, shade: 0.4, opacity: 1, blur: 10 },
  { top: "12%", left: "30%", w: 440, scale: 1, shade: 0.9, opacity: 0.8, blur: 16 },
  { top: "14%", left: "80%", w: 400, scale: 1, shade: 0.6, opacity: 0.7, blur: 14 },

  // --- derniers lambeaux avant le ciel degage ---
  { top: "20%", left: "-6%", w: 360, scale: 1, shade: 0.3, opacity: 0.55, blur: 14 },
  { top: "23%", left: "68%", w: 340, scale: 1, shade: 0.2, opacity: 0.45, blur: 14 },

  // --- ciel degage : quelques nuages blancs, isoles ---
  { top: "36%", left: "8%", w: 300, scale: 1, shade: 0, opacity: 0.85, blur: 6 },
  { top: "44%", left: "76%", w: 340, scale: 1, shade: 0.08, opacity: 0.75, blur: 7 },
  { top: "54%", left: "34%", w: 280, scale: 1, shade: 0, opacity: 0.6, blur: 6 },

  // --- la couche se referme ---
  { top: "68%", left: "-8%", w: 420, scale: 1, shade: 0.25, opacity: 0.6, blur: 12 },
  { top: "72%", left: "58%", w: 460, scale: 1, shade: 0.35, opacity: 0.7, blur: 12 },
  { top: "78%", left: "20%", w: 540, scale: 1, shade: 0.55, opacity: 0.9, blur: 11 },
  { top: "82%", left: "72%", w: 500, scale: 1, shade: 0.2, opacity: 1, blur: 9 },
  { top: "87%", left: "-4%", w: 600, scale: 1, shade: 0.75, opacity: 1, blur: 12 },
  { top: "90%", left: "40%", w: 640, scale: 1, shade: 0.45, opacity: 1, blur: 10 },
  { top: "94%", left: "76%", w: 560, scale: 1, shade: 0.8, opacity: 1, blur: 13 },
];

// Silhouette d'un nuage : des disques assembles, pas une ellipse floutee.
const SHAPE = [
  { x: 0.18, y: 0.64, r: 0.19 },
  { x: 0.38, y: 0.44, r: 0.27 },
  { x: 0.60, y: 0.54, r: 0.23 },
  { x: 0.80, y: 0.66, r: 0.18 },
  { x: 0.48, y: 0.74, r: 0.25 },
];

// Du blanc lumineux vers le gris d'ombre d'un nuage epais.
function shadeColor(t: number) {
  const a = [255, 255, 255];
  const b = [138, 150, 172];
  const c = a.map((v, i) => Math.round(v + (b[i]! - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export const SKY_JOURNEY_STYLES = `
.skyj-puff { position: absolute; }
.skyj-lobe { position: absolute; border-radius: 50%; }
@media (max-width: 768px) {
  /* Le flou est le poste le plus cher : on l'allege sur petit ecran. */
  .skyj-puff { filter: none !important; }
}
`;

export default function SkyJourney() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = layerRef.current;
    if (!node) return;

    let raf = 0;
    let queued = false;

    const apply = () => {
      queued = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      // La bande fait LAYER_VH% de haut : on en fait defiler le surplus.
      const travel = ((LAYER_VH - 100) / 100) * window.innerHeight;
      node.style.transform = `translate3d(0, ${-p * travel}px, 0)`;
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

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#C3DAFA",
      }}
    >
      <style>{SKY_JOURNEY_STYLES}</style>
      <div
        ref={layerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: `${LAYER_VH}vh`,
          willChange: "transform",
          // Gris dense en haut, ciel franc au milieu, gris a nouveau en bas.
          background:
            "linear-gradient(180deg," +
            " #9BA6BA 0%," +
            " #A8B2C4 8%," +
            " #BCC5D4 16%," +
            " #D2D9E4 22%," +
            " #DCE4F0 26%," +
            " #C9DAF6 31%," +
            " #A8C8F5 37%," +
            " #8FB8F1 46%," +
            " #8FB8F1 56%," +
            " #A8C8F5 64%," +
            " #C9DAF6 70%," +
            " #DCE4F0 75%," +
            " #CBD3E0 81%," +
            " #B4BDCE 88%," +
            " #A2ACC0 95%," +
            " #97A2B7 100%)",
        }}
      >
        {PUFFS.map((p, i) => {
          const h = p.w * 0.62;
          return (
            <div
              key={i}
              className="skyj-puff"
              style={{
                top: p.top,
                left: p.left,
                width: p.w,
                height: h,
                opacity: p.opacity,
                filter: `blur(${p.blur}px)`,
              }}
            >
              {SHAPE.map((l, j) => (
                <span
                  key={j}
                  className="skyj-lobe"
                  style={{
                    left: (l.x - l.r) * p.w,
                    top: (l.y - l.r) * h * 1.6,
                    width: l.r * 2 * p.w,
                    height: l.r * 2 * p.w,
                    // Le lobe du bas est toujours plus sombre que celui du
                    // haut : c'est ce qui fait le volume.
                    background: shadeColor(Math.min(p.shade + (l.y - 0.5) * 0.5, 1)),
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
