// Fond clair fixe, épinglé au viewport, visible derrière tout le contenu.
// Masses nuageuses (gris-bleu + trouées blanches) rendues en dégradés radiaux
// natifs — même rendu doux qu'un blur, mais sans aucun coût GPU au scroll
// (les filter: blur() sur de grandes surfaces sont très chers sur mobile).
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
        background: [
          // trouées blanches lumineuses
          "radial-gradient(ellipse 52% 34% at 28% 26%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)",
          "radial-gradient(ellipse 46% 30% at 42% 82%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 68%)",
          "radial-gradient(ellipse 38% 26% at 88% 52%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 66%)",
          // masses grises (l'épaisseur du nuage)
          "radial-gradient(ellipse 56% 34% at 92% 12%, rgba(128,146,180,0.34) 0%, rgba(128,146,180,0) 70%)",
          "radial-gradient(ellipse 50% 30% at 4% 46%, rgba(118,136,172,0.3) 0%, rgba(118,136,172,0) 68%)",
          "radial-gradient(ellipse 44% 26% at 74% 94%, rgba(134,150,184,0.28) 0%, rgba(134,150,184,0) 66%)",
          "radial-gradient(ellipse 36% 22% at 56% 60%, rgba(140,156,190,0.2) 0%, rgba(140,156,190,0) 62%)",
          // base
          "linear-gradient(180deg, #F2F6FF 0%, #E9EFFC 45%, #E4EBFA 100%)",
        ].join(", "),
      }}
    />
  );
}
