// Fond fixe du site : le ciel bleu, epingle au viewport et visible derriere
// tout le contenu. La couverture nuageuse du haut de page est portee par le
// hero (SkyBackdrop) ; une fois passe, c'est ce ciel qui continue jusqu'au
// pied de page.
//
// Les nuees sont rendues en degrades radiaux natifs plutot qu'avec des
// filter: blur() — meme douceur, mais aucun cout GPU au scroll, ce qui compte
// sur un fond de cette taille.
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
          // trouees blanches : l'air entre les nuages
          "radial-gradient(ellipse 54% 34% at 26% 22%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 70%)",
          "radial-gradient(ellipse 48% 30% at 44% 84%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 68%)",
          "radial-gradient(ellipse 40% 26% at 90% 48%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0) 66%)",
          "radial-gradient(ellipse 36% 24% at 8% 66%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 66%)",
          // voiles plus denses, pour que le ciel ne soit pas un aplat
          "radial-gradient(ellipse 52% 32% at 92% 14%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%)",
          "radial-gradient(ellipse 44% 28% at 70% 96%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 66%)",
          // le bleu du ciel — memes teintes que le fond de l'application
          "linear-gradient(180deg, #B7D2F8 0%, #C3DAFA 42%, #CFE2FC 100%)",
        ].join(", "),
      }}
    />
  );
}
