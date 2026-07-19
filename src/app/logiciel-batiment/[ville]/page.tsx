import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { VILLES, getVille } from "@/lib/villes";

export function generateStaticParams() {
  return VILLES.map((v) => ({ ville: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville: slug } = await params;
  const ville = getVille(slug);
  if (!ville) return {};
  const url = `https://www.cirrion.eu/logiciel-batiment/${ville.slug}`;
  const title = `Logiciel de devis bâtiment ${ville.prepo} ${ville.nom} — Cirrion`;
  const description = `Logiciel de devis et facturation pour artisans du bâtiment ${ville.prepo} ${ville.nom} (${ville.region}). Créez vos devis depuis WhatsApp ou sur l'application Cirrion ERP. E-facturation 2026.`;
  return {
    title,
    description,
    keywords: [
      `logiciel devis bâtiment ${ville.nom}`,
      `logiciel artisan ${ville.nom}`,
      `devis artisan ${ville.nom}`,
      `logiciel facturation bâtiment ${ville.nom}`,
      `ERP bâtiment ${ville.region}`,
    ],
    openGraph: { title, description, url },
    alternates: { canonical: url },
  };
}

export default async function VillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville: slug } = await params;
  const ville = getVille(slug);
  if (!ville) notFound();

  const url = `https://www.cirrion.eu/logiciel-batiment/${ville.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
      { "@type": "ListItem", position: 2, name: "Logiciel bâtiment par ville", item: "https://www.cirrion.eu/logiciel-batiment" },
      { "@type": "ListItem", position: 3, name: ville.nom, item: url },
    ],
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Logiciel de devis et facturation pour le bâtiment",
    provider: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
    areaServed: { "@type": "City", name: ville.nom },
    description: `Logiciel de gestion, devis et facturation pour artisans et PME du bâtiment ${ville.prepo} ${ville.nom}.`,
  };

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Cirrion — Logiciel de devis bâtiment ${ville.prepo} ${ville.nom}`,
    url: `https://www.cirrion.eu/logiciel-batiment/${ville.slug}`,
    description: `Logiciel ERP IA de devis et facturation pour artisans du bâtiment ${ville.prepo} ${ville.nom}. Créez vos devis depuis WhatsApp en 3 minutes.`,
    areaServed: {
      "@type": "City",
      name: ville.nom,
      containedInPlace: { "@type": "AdministrativeArea", name: ville.region },
    },
    priceRange: "€€",
    telephone: null,
    sameAs: ["https://www.cirrion.eu", "https://www.instagram.com/floxia.pro", "https://www.linkedin.com/in/floxia-pro-9360333aa"],
  };

  const autres = VILLES.filter((v) => v.slug !== ville.slug).slice(0, 6);

  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />

      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <Link href="/logiciel-batiment" style={{ color: "rgba(var(--text-rgb),0.45)", fontSize: ".82rem", textDecoration: "none", marginBottom: "2rem", display: "inline-block" }}>
          ← Toutes les villes
        </Link>

        <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: "999px", border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)", color: "#2455D6", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
          {ville.region}
        </span>

        <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.9rem,4vw,2.9rem)", color: "var(--text)", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
          Logiciel de devis bâtiment {ville.prepo} <span style={{ color: "#2455D6" }}>{ville.nom}</span>
        </h1>

        <p style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem" }}>
          Cirrion est l&apos;ERP IA des artisans et PME du bâtiment, disponible partout en France — y compris {ville.prepo} {ville.nom}.
          Créez vos devis et factures depuis WhatsApp en 3 minutes, ou directement sur l&apos;application Cirrion ERP grâce aux pré-modèles de devis générés par l&apos;IA.
        </p>

        <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "3rem" }}>
          {ville.contexte}
        </p>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.4rem", color: "var(--text)", marginBottom: "1.25rem" }}>
          Pourquoi les artisans {ville.prepo} {ville.nom} choisissent Cirrion
        </h2>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2.5rem" }}>
          {[
            "Devis créé depuis WhatsApp par message vocal, directement sur le chantier.",
            "Pré-modèles de devis générés par l'IA sur l'application Cirrion ERP, idéal au bureau.",
            "Relances automatiques des devis et factures pour ne plus perdre de chantiers.",
            "Conformité e-facturation 2026 native, sans paperasse supplémentaire.",
            "Hébergement 100% France et conformité RGPD.",
          ].map((b) => (
            <li key={b} style={{ display: "flex", gap: "0.7rem", color: "rgba(var(--text-rgb),0.7)", fontSize: ".92rem", lineHeight: 1.7 }}>
              <span style={{ color: "#2455D6", fontWeight: 700, flexShrink: 0 }}>→</span>{b}
            </li>
          ))}
        </ul>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.4rem", color: "var(--text)", marginBottom: "0.75rem" }}>
          Zone couverte
        </h2>
        <p style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: ".92rem", lineHeight: 1.8, marginBottom: "3rem" }}>
          {ville.zones} Cirrion étant 100% en ligne, votre métier — électricien, plombier, maçon, peintre, menuisier, couvreur, carreleur, chauffagiste ou plaquiste — est couvert partout.
        </p>

        <div style={{ padding: "2.5rem", borderRadius: "1.5rem", background: "rgba(36,85,214,0.05)", border: "1px solid rgba(36,85,214,0.18)", textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.4rem", color: "var(--text)", marginBottom: "0.6rem" }}>
            Essayez Cirrion {ville.prepo} {ville.nom}
          </h2>
          <p style={{ color: "rgba(var(--text-rgb),0.5)", fontSize: ".88rem", marginBottom: "1.5rem" }}>Démo gratuite · Sans engagement</p>
          <a href="https://calendly.com/afele1845/30min" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2rem", borderRadius: "0.85rem", background: "#2455D6", color: "#FFFFFF", fontWeight: 700, fontSize: ".95rem", textDecoration: "none" }}>
            Réserver une démo gratuite
          </a>
        </div>

        <p style={{ color: "rgba(var(--text-rgb),0.35)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1rem" }}>
          Cirrion dans d&apos;autres villes
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          {autres.map((v) => (
            <Link key={v.slug} href={`/logiciel-batiment/${v.slug}`} style={{ padding: "0.5rem 1rem", borderRadius: "999px", border: "1px solid rgba(var(--surface-rgb),0.1)", color: "rgba(var(--text-rgb),0.55)", fontSize: ".82rem", textDecoration: "none" }}>
              {v.nom}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
