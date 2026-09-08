// Objectif de l'application — texte statique present dans le HTML des le chargement
// (lisible par le scanner de validation OAuth Google). Il vivait dans le hero, ou il
// parasitait l'entree de page : il est desormais en pied de page d'accueil, toujours
// dans le HTML servi.
export default function GmailDisclosure() {
  return (
    <section style={{ padding: "0 6vw 3rem", display: "flex", justifyContent: "center" }}>
      <details style={{ maxWidth: 620, width: "100%" }}>
        <summary
          style={{
            cursor: "pointer",
            listStyle: "none",
            color: "rgba(27,42,74,0.42)",
            fontSize: "0.78rem",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span aria-hidden>ℹ️</span> Comment Cirrion utilise Gmail
        </summary>
        <p style={{ marginTop: "0.6rem", color: "rgba(27,42,74,0.5)", fontSize: "0.8rem", lineHeight: 1.6 }}>
          Cirrion est une application de gestion pour les artisans du bâtiment : elle crée vos devis et factures,
          les envoie à vos clients par e-mail via votre compte Gmail, et automatise vos relances.
        </p>
      </details>
    </section>
  );
}
