"use client";

/**
 * Ciel du haut de page — reprend a l'identique le fond de l'application
 * Cirrion : meme degrade (couleurs relevees sur la capture du tableau de
 * bord) et memes gros nuages blancs pleins.
 *
 * Un nuage n'est pas une ellipse floutee mais un assemblage de disques
 * blancs : c'est ce qui lui donne des lobes lisibles plutot qu'une tache.
 * Seul `transform` est anime, donc la derive reste composite, et le flou
 * n'est jamais redimensionne.
 */

type Lobe = { x: number; y: number; r: number };

// Silhouette d'un nuage, en unites relatives (1 = largeur du nuage).
const SHAPE: Lobe[] = [
  { x: 0.20, y: 0.62, r: 0.20 },
  { x: 0.40, y: 0.42, r: 0.28 },
  { x: 0.62, y: 0.52, r: 0.24 },
  { x: 0.80, y: 0.66, r: 0.18 },
  { x: 0.50, y: 0.72, r: 0.26 },
];

type Cloud = {
  top: string;
  left: string;
  w: number;
  opacity: number;
  blur: number;
  dur: number;
  delay: number;
  drift: number;
  mobile?: boolean;
};

const CLOUDS: Cloud[] = [
  { top: "-4%", left: "-10%", w: 460, opacity: 1, blur: 6, dur: 54, delay: 0, drift: 46, mobile: true },
  { top: "2%", left: "30%", w: 320, opacity: 0.92, blur: 5, dur: 64, delay: -14, drift: -34 },
  { top: "-6%", left: "66%", w: 520, opacity: 1, blur: 7, dur: 58, delay: -28, drift: 38, mobile: true },
  { top: "22%", left: "86%", w: 300, opacity: 0.85, blur: 5, dur: 70, delay: -9, drift: -28 },
  { top: "34%", left: "-6%", w: 340, opacity: 0.8, blur: 6, dur: 66, delay: -36, drift: 30, mobile: true },
  { top: "52%", left: "72%", w: 380, opacity: 0.62, blur: 8, dur: 76, delay: -20, drift: -26 },
  { top: "66%", left: "26%", w: 300, opacity: 0.45, blur: 8, dur: 72, delay: -48, drift: 22 },
];

export const SKY_STYLES = `
@keyframes skyDrift {
  0%, 100% { transform: translate3d(0,0,0); }
  50% { transform: translate3d(var(--drift), -12px, 0); }
}
.sky-cloud {
  position: absolute;
  will-change: transform;
  animation: skyDrift var(--dur) ease-in-out infinite;
}
.sky-lobe {
  position: absolute;
  border-radius: 50%;
  background: #FFFFFF;
}
@media (max-width: 768px) {
  /* Moins de nuages sur mobile : surface plus petite, et chaque flou coute
     cher a rasteriser. */
  .sky-cloud:not(.sky-cloud-m) { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .sky-cloud { animation: none !important; }
}
`;

function CloudShape({ c }: { c: Cloud }) {
  const h = c.w * 0.62;
  return (
    <div
      className={`sky-cloud${c.mobile ? " sky-cloud-m" : ""}`}
      style={{
        top: c.top,
        left: c.left,
        width: c.w,
        height: h,
        opacity: c.opacity,
        filter: `blur(${c.blur}px)`,
        animationDelay: `${c.delay}s`,
        ["--dur" as string]: `${c.dur}s`,
        ["--drift" as string]: `${c.drift}px`,
      }}
    >
      {SHAPE.map((l, i) => (
        <span
          key={i}
          className="sky-lobe"
          style={{
            left: (l.x - l.r) * c.w,
            top: (l.y - l.r) * h * 1.6,
            width: l.r * 2 * c.w,
            height: l.r * 2 * c.w,
          }}
        />
      ))}
    </div>
  );
}

export default function SkyBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        // Couleurs relevees directement sur le fond de l'application, pour que
        // le site et le produit soient le meme ciel. Le bas devient transparent
        // afin que la section suivante reprenne le fond normal du site.
        background:
          "linear-gradient(180deg, #8DAEE0 0%, #A3C6F8 14%, #B0CDF8 28%, #BCD7F9 40%, #CDE1FD 54%, #DAE9FD 66%, #EDF4FF 80%, rgba(247,251,255,0.6) 92%, rgba(247,251,255,0) 100%)",
      }}
    >
      {CLOUDS.map((c, i) => (
        <CloudShape key={i} c={c} />
      ))}

      {/* Raccord final : evite que les nuages du bas ne coupent net sur la
          section suivante. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "20%",
          background: "linear-gradient(180deg, rgba(239,244,255,0) 0%, var(--background) 100%)",
        }}
      />
    </div>
  );
}
