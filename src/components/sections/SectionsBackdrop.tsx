// Fond clair fixe, épinglé au viewport, visible derrière tout le contenu.
// Masses nuageuses volumétriques (gris-bleu + blanches, très floutées) pour
// une immersion "à l'intérieur d'un nuage", cohérente avec l'identité Cirrion.

const PUFFS: React.CSSProperties[] = [
  // — masses grises (l'épaisseur du nuage) —
  { width: "55vw", height: "34vh", top: "6%", right: "-12%", background: "rgba(128,146,180,0.38)" },
  { width: "48vw", height: "30vh", top: "38%", left: "-14%", background: "rgba(118,136,172,0.34)" },
  { width: "42vw", height: "26vh", bottom: "-6%", right: "8%", background: "rgba(134,150,184,0.3)" },
  { width: "34vw", height: "22vh", top: "58%", left: "42%", background: "rgba(140,156,190,0.24)" },
  // — trouées blanches lumineuses —
  { width: "50vw", height: "32vh", top: "14%", left: "6%", background: "rgba(255,255,255,0.95)" },
  { width: "44vw", height: "28vh", bottom: "10%", left: "22%", background: "rgba(255,255,255,0.85)" },
  { width: "36vw", height: "24vh", top: "44%", right: "2%", background: "rgba(255,255,255,0.8)" },
];

export default function SectionsBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "linear-gradient(180deg, #F2F6FF 0%, #E9EFFC 45%, #E4EBFA 100%)",
      }}
    >
      {PUFFS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(70px)",
            ...s,
          }}
        />
      ))}
    </div>
  );
}
