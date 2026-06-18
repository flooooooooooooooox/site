import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Logiciel de gestion d'entreprise du bâtiment — Solution B2B | Floxia",
  description:
    "Floxia, la solution B2B de gestion pour les entreprises du bâtiment et du BTP. Devis, facturation, chantiers, équipes et pilotage : un seul logiciel pour dirigeants de TPE et PME.",
  keywords: [
    "logiciel gestion entreprise bâtiment", "logiciel B2B bâtiment", "solution gestion BTP",
    "logiciel dirigeant PME bâtiment", "SaaS bâtiment", "outil gestion entreprise BTP",
    "logiciel pilotage entreprise bâtiment", "ERP B2B BTP",
  ],
  openGraph: {
    title: "Logiciel de gestion d'entreprise du bâtiment — Floxia",
    description: "La solution B2B de gestion pour les entreprises du bâtiment : devis, facturation, chantiers, équipes et pilotage.",
    url: "https://floxia.fr/logiciel-gestion-entreprise-batiment",
  },
  alternates: { canonical: "https://floxia.fr/logiciel-gestion-entreprise-batiment" },
};

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Logiciel de gestion d'entreprise pour le bâtiment (B2B)",
  provider: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  areaServed: "FR",
  audience: { "@type": "BusinessAudience", name: "TPE et PME du bâtiment et du BTP" },
  description:
    "Solution B2B de gestion, devis, facturation et pilotage pour les entreprises du bâtiment et du BTP.",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Logiciel de gestion d'entreprise du bâtiment", item: "https://floxia.fr/logiciel-gestion-entreprise-batiment" },
  ],
};

const PILLARS = [
  { title: "Devis & facturation centralisés", desc: "Toute l'entreprise produit des devis conformes depuis WhatsApp ou l'application, avec une numérotation et une TVA gérées automatiquement." },
  { title: "Pilotage en temps réel", desc: "Tableau de bord du chiffre d'affaires, des chantiers en cours, des devis signés et des factures impayées — pour décider vite." },
  { title: "Gestion des équipes", desc: "Plannings, suivi des heures et coordination des collaborateurs et sous-traitants depuis un seul outil." },
  { title: "Trésorerie & marges", desc: "Prévisions de trésorerie, suivi des dépenses et des marges chantier par chantier pour protéger votre rentabilité." },
  { title: "Conformité e-facturation 2026", desc: "Votre entreprise est nativement conforme à l'obligation de facturation électronique, sans module supplémentaire." },
  { title: "Hébergement souverain", desc: "Données chiffrées, hébergées en France, conformité RGPD — un point clé pour les marchés et la sous-traitance B2B." },
];

export default function LogicielGestionEntreprise() {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)", color: "#F5C842", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
          Solution B2B
        </span>
        <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4.5vw,3rem)", color: "var(--text)", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
          Le logiciel de gestion des <span style={{ color: "#F5C842" }}>entreprises du bâtiment</span>
        </h1>
        <p style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem" }}>
          Floxia est la solution B2B pensée pour les dirigeants de TPE et PME du bâtiment et du BTP. De la création du devis au pilotage de l&apos;entreprise, vous centralisez toute votre gestion dans un seul outil — accessible depuis WhatsApp sur le terrain et sur l&apos;application au bureau.
        </p>
        <p style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "3rem" }}>
          Que vous dirigiez une entreprise générale du bâtiment, une société de sous-traitance ou une PME multi-corps d&apos;état, Floxia s&apos;adapte à votre organisation et grandit avec vous. Des artisans indépendants jusqu&apos;aux structures de 50 collaborateurs.
        </p>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", color: "var(--text)", marginBottom: "1.5rem" }}>
          Une solution complète pour piloter votre entreprise
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {PILLARS.map((p) => (
            <div key={p.title} style={{ padding: "1.4rem", borderRadius: "1rem", border: "1px solid rgba(var(--surface-rgb),0.08)", background: "rgba(var(--surface-rgb),0.02)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F5C842", marginBottom: "0.75rem" }} />
              <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: ".95rem", color: "var(--text)", marginBottom: "0.4rem" }}>{p.title}</h3>
              <p style={{ color: "rgba(var(--text-rgb),0.55)", fontSize: ".82rem", lineHeight: 1.65 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", color: "var(--text)", marginBottom: "1rem" }}>
          Pourquoi les dirigeants du bâtiment choisissent Floxia
        </h2>
        <p style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "1.2rem" }}>
          En B2B, le temps administratif coûte cher : chaque heure passée sur un devis ou une relance est une heure qui ne génère pas de chiffre d&apos;affaires. Floxia automatise ces tâches grâce à l&apos;IA, ce qui permet à toute l&apos;entreprise — du chef de chantier au dirigeant — de se concentrer sur la production et le développement commercial.
        </p>
        <p style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "3rem" }}>
          La conformité e-facturation 2026, l&apos;hébergement souverain en France et la traçabilité des documents font de Floxia un partenaire fiable pour les relations B2B, les marchés et la sous-traitance, où la rigueur documentaire est exigée.
        </p>

        <div style={{ padding: "2.5rem", borderRadius: "1.5rem", background: "rgba(245,200,66,0.05)", border: "1px solid rgba(245,200,66,0.18)", textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.4rem", color: "var(--text)", marginBottom: "0.6rem" }}>
            Équipez votre entreprise du bâtiment
          </h2>
          <p style={{ color: "rgba(var(--text-rgb),0.5)", fontSize: ".88rem", marginBottom: "1.5rem" }}>Démo gratuite et personnalisée · Sans engagement</p>
          <a href="https://calendly.com/afele1845/30min" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2rem", borderRadius: "0.85rem", background: "#F5C842", color: "#0F1923", fontWeight: 700, fontSize: ".95rem", textDecoration: "none" }}>
            Réserver une démo gratuite
          </a>
        </div>

        <p style={{ color: "rgba(var(--text-rgb),0.35)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1rem" }}>
          À découvrir aussi
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          {[
            { label: "Floxia par métier", href: "/artisans" },
            { label: "Comparatifs", href: "/alternatives" },
            { label: "Logiciel par ville", href: "/logiciel-batiment" },
            { label: "Ressources", href: "/ressources" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ padding: "0.5rem 1rem", borderRadius: "999px", border: "1px solid rgba(var(--surface-rgb),0.1)", color: "rgba(var(--text-rgb),0.55)", fontSize: ".82rem", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
