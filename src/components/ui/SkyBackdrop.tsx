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

// Le haut de page est une couverture nuageuse pleine, qui s'ouvre ensuite sur
// le ciel bleu. Les nuages du bandeau superieur se chevauchent volontairement
// pour former une masse continue ; ceux du bas sont isoles dans le bleu.
const CLOUDS: Cloud[] = [
  // --- couverture pleine, tout en haut ---
  { top: "-26%", left: "-12%", w: 460, opacity: 1, blur: 6, dur: 54, delay: 0, drift: 40, mobile: true },
  { top: "-23%", left: "14%", w: 400, opacity: 1, blur: 6, dur: 62, delay: -15, drift: -32, mobile: true },
  { top: "-28%", left: "38%", w: 470, opacity: 1, blur: 7, dur: 58, delay: -30, drift: 36, mobile: true },
  { top: "-22%", left: "64%", w: 420, opacity: 1, blur: 6, dur: 66, delay: -8, drift: -28, mobile: true },
  { top: "-26%", left: "86%", w: 440, opacity: 1, blur: 7, dur: 60, delay: -42, drift: 34, mobile: true },
  { top: "-14%", left: "26%", w: 300, opacity: 0.9, blur: 8, dur: 70, delay: -22, drift: 26 },
  { top: "-13%", left: "72%", w: 290, opacity: 0.9, blur: 8, dur: 74, delay: -36, drift: -24 },

  // --- nuages isoles, une fois le ciel bleu degage ---
  { top: "42%", left: "-7%", w: 260, opacity: 0.7, blur: 6, dur: 68, delay: -12, drift: 28, mobile: true },
  { top: "56%", left: "86%", w: 280, opacity: 0.55, blur: 7, dur: 78, delay: -26, drift: -22 },
  { top: "72%", left: "34%", w: 230, opacity: 0.35, blur: 9, dur: 80, delay: -50, drift: 18 },
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
        // Couleurs relevees sur le fond de l'application, pour que le site et
        // le produit soient le meme ciel. Le tout debute en blanc — la
        // couverture nuageuse — s'ouvre sur le bleu, puis redevient
        // transparent afin que la section suivante reprenne le fond du site.
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F6FAFF 10%, #D2E2FB 22%, #9CC0F5 34%, #93BAF2 48%, #9FC3F6 62%, #BCD7F9 74%, #DAE9FD 85%, rgba(199,219,250,0.5) 92%, rgba(199,219,250,0) 100%)",
      }}
    >
      {/* Voile blanc du haut : c'est lui qui soude les nuages de la premiere
          rangee en une couverture continue plutot qu'en formes separees. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "14%",
          background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0) 100%)",
        }}
      />
      {CLOUDS.map((c, i) => (
        <CloudShape key={i} c={c} />
      ))}

    </div>
  );
}
