import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ressources — Guides & conseils pour artisans du bâtiment",
  description:
    "Guides pratiques pour artisans et PME du bâtiment : devis WhatsApp, logiciel ERP, automatisation administrative. Gagnez du temps sur votre gestion.",
  openGraph: {
    title: "Ressources Floxia — Guides pour artisans du bâtiment",
    description:
      "Guides pratiques pour artisans et PME du bâtiment : devis WhatsApp, logiciel ERP, automatisation administrative.",
    url: "https://floxia.fr/ressources",
  },
  alternates: { canonical: "https://floxia.fr/ressources" },
};

const ARTICLES = [
  {
    href: "/ressources/devis-depuis-whatsapp",
    badge: "Devis",
    title: "Comment envoyer un devis depuis WhatsApp en 3 minutes",
    description:
      "Vous êtes sur chantier, un prospect vous appelle. En 3 minutes, votre devis PDF est envoyé, signé et archivé — depuis WhatsApp ou l'application Floxia ERP. Voici comment.",
    date: "Juin 2026",
    readTime: "4 min",
  },
  {
    href: "/ressources/modele-devis-batiment",
    badge: "Modèles",
    title: "Modèle de devis bâtiment : les pré-modèles IA qui font gagner du temps",
    description:
      "Repartir d'un modèle vierge à chaque chantier fait perdre du temps. Découvrez les pré-modèles de devis générés par l'IA, sur l'application ERP ou depuis WhatsApp.",
    date: "Juin 2026",
    readTime: "5 min",
  },
  {
    href: "/ressources/logiciel-erp-batiment",
    badge: "ERP",
    title: "Logiciel ERP bâtiment : le guide complet pour artisans et PME",
    description:
      "ERP généraliste ou logiciel spécialisé bâtiment ? On compare les solutions du marché et on explique pourquoi l'IA change tout pour les petites structures.",
    date: "Juin 2026",
    readTime: "6 min",
  },
  {
    href: "/ressources/automatisation-artisan-batiment",
    badge: "Gestion",
    title: "Automatisation : comment les artisans gagnent 10h par semaine",
    description:
      "Devis, relances, facturation, conformité 2026 — 5 tâches administratives que les artisans peuvent automatiser aujourd'hui pour se concentrer sur le chantier.",
    date: "Juin 2026",
    readTime: "5 min",
  },
];

export default function Ressources() {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <style>{`
        .res-card { transition: border-color 0.2s, background 0.2s; }
        .res-card:hover { border-color: rgba(245,200,66,0.2) !important; background: rgba(245,200,66,0.03) !important; }
      `}</style>
      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: "999px",
            border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)",
            color: "#F5C842", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
            textTransform: "uppercase", marginBottom: "1.2rem",
          }}>
            Ressources
          </span>
          <h1 style={{
            fontFamily: "var(--font-nunito)", fontWeight: 900,
            fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text)",
            letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem",
          }}>
            Guides pour <span style={{ color: "#F5C842" }}>artisans du bâtiment</span>
          </h1>
          <p style={{ color: "rgba(var(--text-rgb),0.55)", fontSize: "1.05rem", maxWidth: "480px", margin: "0 auto" }}>
            Conseils pratiques pour automatiser votre gestion, gagner du temps et développer votre activité.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {ARTICLES.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="res-card"
              style={{
                display: "block", padding: "2rem 2.5rem", borderRadius: "1.25rem",
                border: "1px solid rgba(var(--surface-rgb),0.08)",
                background: "rgba(var(--surface-rgb),0.02)",
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{
                  padding: "3px 12px", borderRadius: "999px",
                  background: "rgba(245,200,66,0.1)", color: "#F5C842",
                  fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
                }}>
                  {article.badge}
                </span>
                <span style={{ color: "rgba(var(--text-rgb),0.35)", fontSize: ".78rem" }}>
                  {article.date} · {article.readTime} de lecture
                </span>
              </div>
              <h2 style={{
                fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.15rem",
                color: "var(--text)", lineHeight: 1.3, marginBottom: "0.6rem",
              }}>
                {article.title}
              </h2>
              <p style={{ color: "rgba(var(--text-rgb),0.55)", fontSize: ".88rem", lineHeight: 1.7 }}>
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
