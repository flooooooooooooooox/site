// Fond clair fixe, épinglé au viewport, visible derrière tout le contenu.
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
        background: "linear-gradient(180deg, #F5F8FF 0%, #EFF4FF 40%, #EBF1FE 100%)",
      }}
    />
  );
}
