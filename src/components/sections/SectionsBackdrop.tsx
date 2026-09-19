// Fond du site, hors hero : clair et uni.
//
// Le paysage nuageux vit desormais dans le hero (HeroCloudscape) et se dissipe
// au defilement. Une fois cette section passee, le fond ne doit plus rien
// raconter — il porte le contenu, c'est tout.
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
        background: "linear-gradient(180deg, #F4F8FF 0%, #EFF4FF 55%, #EAF0FC 100%)",
      }}
    />
  );
}
