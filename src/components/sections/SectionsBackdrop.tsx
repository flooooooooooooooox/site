// Fond clair fixe, épinglé au viewport, visible derrière tout le contenu.
// Zones nuageuses douces (voiles gris-bleu et blancs) pour une immersion
// "à l'intérieur d'un nuage", cohérente avec l'identité Cirrion.
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
          // voiles blancs lumineux (les "trouées" du nuage)
          "radial-gradient(ellipse 70% 45% at 18% 22%, rgba(255,255,255,0.85) 0%, transparent 65%)",
          "radial-gradient(ellipse 60% 40% at 85% 70%, rgba(255,255,255,0.7) 0%, transparent 60%)",
          // zones grises douces (l'épaisseur du nuage)
          "radial-gradient(ellipse 55% 38% at 78% 18%, rgba(27,42,74,0.055) 0%, transparent 62%)",
          "radial-gradient(ellipse 65% 42% at 10% 78%, rgba(27,42,74,0.05) 0%, transparent 60%)",
          "radial-gradient(ellipse 45% 30% at 50% 48%, rgba(120,140,180,0.06) 0%, transparent 58%)",
          // base
          "linear-gradient(180deg, #F5F8FF 0%, #EFF4FF 40%, #EBF1FE 100%)",
        ].join(", "),
      }}
    />
  );
}
