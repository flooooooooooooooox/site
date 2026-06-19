import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Presse & médias — Floxia | Kit de presse logiciel artisan bâtiment",
  description:
    "Kit de presse Floxia : informations officielles, éléments de langage et visuels pour les journalistes et blogueurs. Floxia est le logiciel ERP IA pour artisans et PME du bâtiment.",
  keywords: ["Floxia presse", "kit presse Floxia", "Floxia médias", "logiciel artisan bâtiment presse"],
  openGraph: {
    title: "Presse & médias — Floxia",
    description: "Kit de presse officiel Floxia : éléments de langage, visuels et contacts pour journalistes.",
    url: "https://floxia.fr/presse",
  },
  alternates: { canonical: "https://floxia.fr/presse" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Floxia",
  alternateName: "FloxiaOS",
  url: "https://floxia.fr",
  logo: "https://floxia.fr/icon.svg",
  image: "https://floxia.fr/dashboard-floxia.jpg",
  description:
    "Floxia est un logiciel ERP IA pour artisans et PME du bâtiment. Créez devis et factures depuis WhatsApp ou l'application Floxia en 3 minutes.",
  foundingDate: "2026",
  areaServed: { "@type": "Country", name: "France" },
  founder: { "@type": "Person", name: "Florian", jobTitle: "Fondateur & CEO" },
  sameAs: [
    "https://www.instagram.com/floxia.pro",
    "https://www.linkedin.com/in/floxia-pro-9360333aa",
  ],
};

const FAITS = [
  { label: "Nom officiel", value: "Floxia" },
  { label: "Nom produit", value: "Floxia ERP / FloxiaOS" },
  { label: "Secteur", value: "SaaS · Logiciel de gestion pour artisans et indépendants" },
  { label: "Fondé en", value: "2026" },
  { label: "Fondateur", value: "Florian — ingénieur en automatisation" },
  { label: "Siège", value: "France" },
  { label: "Marché", value: "Artisans, auto-entrepreneurs, TPE et PME en France (bâtiment, services, commerce)" },
  { label: "Tarif d'entrée", value: "À partir de 99 €/mois" },
];

const ANGLES = [
  {
    titre: "L'IA qui répond à vos clients à 2h du matin",
    desc: "Floxia intègre un agent IA disponible 24h/24 pour répondre aux demandes de devis des clients, même quand l'artisan est sur chantier.",
  },
  {
    titre: "Devis depuis WhatsApp en 3 minutes",
    desc: "L'artisan décrit son intervention par vocal sur WhatsApp ; Floxia génère le devis PDF et l'envoie au client — sans ordinateur, sans saisie.",
  },
  {
    titre: "La e-facturation 2026 sans effort",
    desc: "Floxia prépare nativement les artisans et PME à l'obligation de facturation électronique 2026, sans module supplémentaire.",
  },
  {
    titre: "L'ERP des artisans vs les mastodontes",
    desc: "Face à Sage, EBP ou Batigest, Floxia mise sur la simplicité mobile-first et l'IA pour séduire les artisans qui rejettent les logiciels complexes.",
  },
];

export default function Presse() {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)", color: "#F5C842", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
          Presse & médias
        </span>

        <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text)", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.2rem" }}>
          Kit de presse <span style={{ color: "#F5C842" }}>Floxia</span>
        </h1>

        <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "3rem", maxWidth: "600px" }}>
          Vous êtes journaliste, blogueur ou créateur de contenu et souhaitez parler de Floxia ? Retrouvez ici les informations officielles sur notre société, notre produit et nos angles éditoriaux.
        </p>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.25rem", color: "var(--text)", marginBottom: "1.2rem" }}>
          Floxia en quelques mots
        </h2>
        <p style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "1rem" }}>
          <strong style={{ color: "var(--text)" }}>Floxia</strong> (aussi appelé <strong style={{ color: "var(--text)" }}>FloxiaOS</strong>) est un logiciel ERP IA destiné aux artisans, auto-entrepreneurs, TPE et PME du bâtiment en France. Il permet de créer des devis et factures en 3 minutes, depuis WhatsApp par message vocal ou sur l&apos;application web Floxia ERP avec des pré-modèles de devis générés par l&apos;IA.
        </p>
        <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "3rem" }}>
          Fondé en 2024 par Florian, ingénieur en automatisation, Floxia a pour mission de rendre aux artisans le temps qu&apos;ils consacrent à l&apos;administratif, en apportant aux petites structures du bâtiment les outils d&apos;automatisation dont bénéficient les grandes entreprises.
        </p>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.25rem", color: "var(--text)", marginBottom: "1.2rem" }}>
          Faits & chiffres clés
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.75rem", marginBottom: "3rem" }}>
          {FAITS.map((f) => (
            <div key={f.label} style={{ padding: "1rem 1.2rem", borderRadius: "0.85rem", border: "1px solid rgba(var(--surface-rgb),0.08)", background: "rgba(var(--surface-rgb),0.02)" }}>
              <div style={{ color: "rgba(var(--text-rgb),0.4)", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{f.label}</div>
              <div style={{ color: "var(--text)", fontSize: ".9rem", fontWeight: 600 }}>{f.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.25rem", color: "var(--text)", marginBottom: "1.2rem" }}>
          Angles éditoriaux
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
          {ANGLES.map((a) => (
            <div key={a.titre} style={{ padding: "1.3rem 1.5rem", borderRadius: "1rem", border: "1px solid rgba(var(--surface-rgb),0.08)", background: "rgba(var(--surface-rgb),0.02)" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#F5C842", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>→</span>
                <div>
                  <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: ".95rem", color: "var(--text)", marginBottom: "0.3rem" }}>{a.titre}</p>
                  <p style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: ".88rem", lineHeight: 1.65 }}>{a.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.25rem", color: "var(--text)", marginBottom: "1rem" }}>
          Contact presse
        </h2>
        <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: ".95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
          Pour toute demande d&apos;interview, de démonstration produit ou d&apos;information complémentaire, prenez rendez-vous directement via notre calendrier en ligne.
        </p>
        <a href="https://calendly.com/afele1845/30min" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.9rem 1.8rem", borderRadius: "0.85rem", background: "#F5C842", color: "#0F1923", fontWeight: 700, fontSize: ".95rem", textDecoration: "none", marginBottom: "4rem" }}>
          Prendre rendez-vous
        </a>

        <p style={{ color: "rgba(var(--text-rgb),0.35)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Réseaux sociaux
        </p>
        <div style={{ display: "flex", gap: "0.6rem", marginBottom: "3rem" }}>
          <a href="https://www.instagram.com/floxia.pro" target="_blank" rel="noopener noreferrer"
            style={{ padding: "0.5rem 1.1rem", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.2)", background: "rgba(245,200,66,0.05)", color: "#F5C842", fontSize: ".82rem", fontWeight: 600, textDecoration: "none" }}>
            Instagram @floxia.pro
          </a>
          <a href="https://www.linkedin.com/in/floxia-pro-9360333aa" target="_blank" rel="noopener noreferrer"
            style={{ padding: "0.5rem 1.1rem", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.2)", background: "rgba(245,200,66,0.05)", color: "#F5C842", fontSize: ".82rem", fontWeight: 600, textDecoration: "none" }}>
            LinkedIn Floxia
          </a>
        </div>

        <p style={{ color: "rgba(var(--text-rgb),0.35)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          À explorer
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {[
            { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
            { label: "Logiciel par métier", href: "/artisans" },
            { label: "Comparatifs", href: "/alternatives" },
            { label: "Ressources", href: "/ressources" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ padding: "0.45rem 0.9rem", borderRadius: "999px", border: "1px solid rgba(var(--surface-rgb),0.1)", color: "rgba(var(--text-rgb),0.55)", fontSize: ".8rem", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
