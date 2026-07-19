import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { METIERS, getMetier } from "@/lib/metiers";
import { VILLES, getVille } from "@/lib/villes";

export function generateStaticParams() {
  return METIERS.flatMap((m) => VILLES.map((v) => ({ metier: m.slug, ville: v.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ metier: string; ville: string }> }): Promise<Metadata> {
  const { metier: ms, ville: vs } = await params;
  const m = getMetier(ms);
  const v = getVille(vs);
  if (!m || !v) return {};
  const url = `https://www.cirrion.eu/logiciel-devis/${m.slug}/${v.slug}`;
  const title = `Logiciel de devis ${m.nom} ${v.prepo} ${v.nom} — Cirrion`;
  const description = `Logiciel de devis et facturation pour ${m.nom} ${v.prepo} ${v.nom} (${v.region}). Créez vos devis ${m.label.toLowerCase()} depuis WhatsApp ou sur l'application Cirrion ERP. TVA 5,5/10/20% au choix, e-facturation 2026.`;
  return {
    title,
    description,
    keywords: [
      `logiciel devis ${m.nom} ${v.nom}`,
      `devis ${m.nom} ${v.nom}`,
      `logiciel ${m.nom} ${v.region}`,
      `${m.nom} ${v.nom} logiciel facturation`,
    ],
    openGraph: { title, description, url },
    alternates: { canonical: url },
  };
}

export default async function MetierVillePage({ params }: { params: Promise<{ metier: string; ville: string }> }) {
  const { metier: ms, ville: vs } = await params;
  const m = getMetier(ms);
  const v = getVille(vs);
  if (!m || !v) notFound();

  const url = `https://www.cirrion.eu/logiciel-devis/${m.slug}/${v.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
      { "@type": "ListItem", position: 2, name: "Logiciel de devis", item: "https://www.cirrion.eu/logiciel-devis" },
      { "@type": "ListItem", position: 3, name: m.label, item: `https://www.cirrion.eu/artisans/${m.slug}` },
      { "@type": "ListItem", position: 4, name: v.nom, item: url },
    ],
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Logiciel de devis et facturation pour ${m.nom}`,
    provider: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
    areaServed: { "@type": "City", name: v.nom },
    description: `Logiciel de devis, facturation et gestion pour ${m.pluriel} ${v.prepo} ${v.nom}.`,
  };

  // autres villes pour ce métier + autres métiers pour cette ville
  const autresVilles = VILLES.filter((x) => x.slug !== v.slug).slice(0, 6);
  const autresMetiers = METIERS.filter((x) => x.slug !== m.slug).slice(0, 6);

  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem", fontSize: ".8rem" }}>
          <Link href={`/artisans/${m.slug}`} style={{ color: "rgba(var(--text-rgb),0.45)", textDecoration: "none" }}>← {m.label}</Link>
          <span style={{ color: "rgba(var(--text-rgb),0.25)" }}>·</span>
          <Link href={`/logiciel-batiment/${v.slug}`} style={{ color: "rgba(var(--text-rgb),0.45)", textDecoration: "none" }}>{v.nom}</Link>
        </div>

        <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: "999px", border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)", color: "#2455D6", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
          {m.label} · {v.region}
        </span>

        <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text)", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
          Logiciel de devis {m.nom} <span style={{ color: "#2455D6" }}>{v.prepo} {v.nom}</span>
        </h1>

        <p style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem" }}>
          Vous êtes {m.nom} {v.prepo} {v.nom} ou dans {v.region} ? Cirrion vous permet de créer vos devis et factures en quelques minutes, depuis WhatsApp par message vocal ou sur l&apos;application Cirrion ERP avec des pré-modèles de devis générés par l&apos;IA. Spécialisé dans {m.domaine}, Cirrion génère des documents conformes avec la TVA de votre choix sur chaque ligne.
        </p>

        <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "1rem" }}>
          {m.contexte} {v.contexte}
        </p>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.35rem", color: "var(--text)", margin: "2rem 0 1rem" }}>
          Vos devis de {m.nom}, prêts en 3 minutes {v.prepo} {v.nom}
        </h2>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
          {m.prestations.map((p) => (
            <li key={p} style={{ display: "flex", gap: "0.7rem", color: "rgba(var(--text-rgb),0.7)", fontSize: ".92rem", lineHeight: 1.7 }}>
              <span style={{ color: "#2455D6", fontWeight: 700, flexShrink: 0 }}>→</span>
              Devis {p} généré automatiquement, avec votre catalogue de prix.
            </li>
          ))}
          <li style={{ display: "flex", gap: "0.7rem", color: "rgba(var(--text-rgb),0.7)", fontSize: ".92rem", lineHeight: 1.7 }}>
            <span style={{ color: "#2455D6", fontWeight: 700, flexShrink: 0 }}>→</span>
            TVA au choix sur chaque ligne : {m.tva}.
          </li>
        </ul>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.35rem", color: "var(--text)", marginBottom: "0.75rem" }}>
          Pourquoi Cirrion pour un {m.nom} {v.prepo} {v.nom}
        </h2>
        <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "0.8rem" }}>
          {v.zones} Cirrion étant 100% en ligne, vous l&apos;utilisez où que soit votre chantier. Les relances de devis et factures sont automatiques, et la conformité e-facturation 2026 est native.
        </p>
        <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "3rem" }}>
          Que vous soyez {m.nom} indépendant, auto-entrepreneur ou à la tête d&apos;une entreprise de {m.domaine}, Cirrion s&apos;adapte à votre activité {v.prepo} {v.nom}.
        </p>

        <div style={{ padding: "2.5rem", borderRadius: "1.5rem", background: "rgba(36,85,214,0.05)", border: "1px solid rgba(36,85,214,0.18)", textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.3rem", color: "var(--text)", marginBottom: "0.6rem" }}>
            Essayez Cirrion, {m.nom} {v.prepo} {v.nom}
          </h2>
          <p style={{ color: "rgba(var(--text-rgb),0.5)", fontSize: ".88rem", marginBottom: "1.5rem" }}>Démo gratuite · Sans engagement</p>
          <a href="https://calendly.com/afele1845/30min" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2rem", borderRadius: "0.85rem", background: "#2455D6", color: "#FFFFFF", fontWeight: 700, fontSize: ".95rem", textDecoration: "none" }}>
            Réserver une démo gratuite
          </a>
        </div>

        <p style={{ color: "rgba(var(--text-rgb),0.35)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1rem" }}>
          {m.label} dans d&apos;autres villes
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem" }}>
          {autresVilles.map((x) => (
            <Link key={x.slug} href={`/logiciel-devis/${m.slug}/${x.slug}`} style={{ padding: "0.45rem 0.9rem", borderRadius: "999px", border: "1px solid rgba(var(--surface-rgb),0.1)", color: "rgba(var(--text-rgb),0.55)", fontSize: ".8rem", textDecoration: "none" }}>
              {m.label} {x.prepo} {x.nom}
            </Link>
          ))}
        </div>

        <p style={{ color: "rgba(var(--text-rgb),0.35)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1rem" }}>
          Autres métiers {v.prepo} {v.nom}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          {autresMetiers.map((x) => (
            <Link key={x.slug} href={`/logiciel-devis/${x.slug}/${v.slug}`} style={{ padding: "0.45rem 0.9rem", borderRadius: "999px", border: "1px solid rgba(var(--surface-rgb),0.1)", color: "rgba(var(--text-rgb),0.55)", fontSize: ".8rem", textDecoration: "none" }}>
              {x.label} {v.prepo} {v.nom}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
