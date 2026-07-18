import type { Metadata } from "next";
import Link from "next/link";
import { METIERS } from "@/lib/metiers";
import { VILLES } from "@/lib/villes";

export const metadata: Metadata = {
  title: "Logiciel de devis bâtiment par métier et ville — Cirrion",
  description:
    "Logiciel de devis et facturation pour tous les artisans du bâtiment : électricien, plombier, chauffagiste, maçon, peintre, menuisier, couvreur, carreleur, plaquiste, serrurier. Disponible dans toutes les grandes villes de France.",
  keywords: [
    "logiciel devis bâtiment",
    "logiciel devis artisan",
    "logiciel facturation artisan",
    "devis bâtiment rapide",
    "logiciel devis électricien",
    "logiciel devis plombier",
    "logiciel devis chauffagiste",
  ],
  openGraph: {
    title: "Logiciel de devis bâtiment par métier et ville — Cirrion",
    description:
      "Logiciel de devis et facturation pour tous les artisans du bâtiment, disponible dans toutes les grandes villes de France.",
    url: "https://www.florianai.fr/logiciel-devis",
  },
  alternates: { canonical: "https://www.florianai.fr/logiciel-devis" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.florianai.fr" },
    { "@type": "ListItem", position: 2, name: "Logiciel de devis", item: "https://www.florianai.fr/logiciel-devis" },
  ],
};

export default function LogicielDevisIndex() {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: "999px", border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)", color: "#2455D6", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
          Logiciel de devis
        </span>

        <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text)", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.2rem" }}>
          Logiciel de devis bâtiment <span style={{ color: "#2455D6" }}>par métier et par ville</span>
        </h1>

        <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "3rem", maxWidth: "640px" }}>
          Cirrion génère vos devis en quelques minutes depuis WhatsApp ou sur l&apos;application Cirrion ERP avec des pré-modèles IA. Retrouvez la page dédiée à votre métier et votre ville pour découvrir comment Cirrion s&apos;adapte à votre activité.
        </p>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.3rem", color: "var(--text)", marginBottom: "1.2rem" }}>
          Par métier
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem", marginBottom: "3.5rem" }}>
          {METIERS.map((m) => (
            <div key={m.slug} style={{ padding: "1.1rem 1.3rem", borderRadius: "1rem", border: "1px solid rgba(var(--surface-rgb),0.08)", background: "rgba(var(--surface-rgb),0.02)" }}>
              <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: ".92rem", color: "var(--text)", marginBottom: "0.6rem" }}>{m.label}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {VILLES.slice(0, 5).map((v) => (
                  <Link key={v.slug} href={`/logiciel-devis/${m.slug}/${v.slug}`} style={{ color: "rgba(var(--text-rgb),0.5)", fontSize: ".78rem", textDecoration: "none" }}>
                    {m.label} {v.prepo} {v.nom}
                  </Link>
                ))}
                <Link href={`/artisans/${m.slug}`} style={{ color: "#2455D6", fontSize: ".78rem", fontWeight: 600, textDecoration: "none", marginTop: "0.2rem" }}>
                  Voir tout →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.3rem", color: "var(--text)", marginBottom: "1.2rem" }}>
          Par ville
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
          {VILLES.map((v) => (
            <Link key={v.slug} href={`/logiciel-batiment/${v.slug}`} style={{ padding: "0.45rem 0.9rem", borderRadius: "999px", border: "1px solid rgba(var(--surface-rgb),0.1)", color: "rgba(var(--text-rgb),0.55)", fontSize: ".8rem", textDecoration: "none" }}>
              {v.nom}
            </Link>
          ))}
        </div>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.3rem", color: "var(--text)", marginBottom: "1rem" }}>
          Pages populaires
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.6rem", marginBottom: "4rem" }}>
          {METIERS.slice(0, 4).flatMap((m) =>
            VILLES.slice(0, 4).map((v) => (
              <Link key={`${m.slug}-${v.slug}`} href={`/logiciel-devis/${m.slug}/${v.slug}`} style={{ padding: "0.55rem 1rem", borderRadius: "0.75rem", border: "1px solid rgba(var(--surface-rgb),0.07)", color: "rgba(var(--text-rgb),0.55)", fontSize: ".82rem", textDecoration: "none" }}>
                {m.label} {v.prepo} {v.nom}
              </Link>
            ))
          )}
        </div>

        <div style={{ padding: "2.5rem", borderRadius: "1.5rem", background: "rgba(36,85,214,0.05)", border: "1px solid rgba(36,85,214,0.18)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.3rem", color: "var(--text)", marginBottom: "0.6rem" }}>
            Essayez Cirrion gratuitement
          </h2>
          <p style={{ color: "rgba(var(--text-rgb),0.5)", fontSize: ".88rem", marginBottom: "1.5rem" }}>Démo gratuite · Sans engagement</p>
          <a href="https://calendly.com/afele1845/30min" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2rem", borderRadius: "0.85rem", background: "#2455D6", color: "#FFFFFF", fontWeight: 700, fontSize: ".95rem", textDecoration: "none" }}>
            Réserver une démo gratuite
          </a>
        </div>
      </div>
    </main>
  );
}
