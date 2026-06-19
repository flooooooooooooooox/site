import Link from "next/link";

const TRADES = [
  {
    href: "/artisans/electricien",
    title: "Électricien",
    desc: "Devis et facturation électricien depuis WhatsApp. Tableau électrique, mise aux normes NF C 15-100, domotique, borne de recharge VE. TVA automatique.",
  },
  {
    href: "/artisans/plombier",
    title: "Plombier & Chauffagiste",
    desc: "Logiciel devis plombier depuis WhatsApp. Salle de bain, chauffe-eau, pompe à chaleur, chauffage. TVA 5,5% économies d'énergie, 10% rénovation.",
  },
  {
    href: "/artisans/macon",
    title: "Maçon & Gros œuvre",
    desc: "Devis maçonnerie et gros œuvre depuis WhatsApp. Extension, ravalement, réhabilitation. Facturation à l'avancement, situations de travaux, PV de réception.",
  },
  {
    href: "/artisans/peintre",
    title: "Peintre en bâtiment",
    desc: "Logiciel devis peintre depuis WhatsApp. Ravalement façade, décoration intérieure. Calcul au m² automatique, TVA 10% rénovation.",
  },
  {
    href: "/artisans",
    title: "Menuisier, Couvreur, Carreleur…",
    desc: "Floxia fonctionne pour tous les corps de métier du bâtiment. Logiciel de devis et facturation adapté à chaque artisan et PME du BTP.",
  },
];

export default function TradesSection() {
  return (
    <section
      aria-label="Floxia par corps de métier du bâtiment"
      style={{ padding: "5rem 0", background: "transparent" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 6vw" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: "999px",
            border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)",
            color: "#F5C842", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
            textTransform: "uppercase", marginBottom: "1rem",
          }}>
            Tous les métiers du bâtiment
          </span>
          <h2 style={{
            fontFamily: "var(--font-nunito)", fontWeight: 900,
            fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--text)",
            letterSpacing: "-0.03em", lineHeight: 1.15,
          }}>
            Conçu pour <span style={{ color: "#F5C842" }}>votre métier</span>
          </h2>
          <p style={{ marginTop: "0.75rem", color: "rgba(var(--text-rgb),0.5)", fontSize: ".95rem", maxWidth: "480px", margin: "0.75rem auto 0" }}>
            Électricien, plombier, maçon, peintre — Floxia parle le vocabulaire de votre corps de métier et applique les bonnes TVA automatiquement.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
          {TRADES.map((trade) => (
            <Link
              key={trade.href}
              href={trade.href}
              style={{
                display: "block", padding: "1.5rem", borderRadius: "1rem",
                border: "1px solid rgba(var(--surface-rgb),0.07)",
                background: "rgba(var(--surface-rgb),0.02)",
                textDecoration: "none",
              }}
            >
              <h3 style={{
                fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: ".95rem",
                color: "var(--text)", marginBottom: "0.5rem",
              }}>
                {trade.title}
              </h3>
              <p style={{ color: "rgba(var(--text-rgb),0.45)", fontSize: ".78rem", lineHeight: 1.6 }}>
                {trade.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
