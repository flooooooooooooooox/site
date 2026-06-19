import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Qui sommes-nous — Floxia | L'automatisation au service des artisans",
  description:
    "Découvrez l'histoire de Floxia : fondée par Florian, ingénieur en automatisation, pour apporter l'IA et l'ERP aux artisans et PME du bâtiment. Devis, factures, gestion depuis WhatsApp ou l'application Floxia.",
  keywords: [
    "Floxia",
    "qui est Floxia",
    "Floxia bâtiment",
    "fondateur Floxia",
    "Floxia ERP artisan",
    "histoire Floxia",
    "logiciel artisan Floxia",
  ],
  openGraph: {
    title: "Qui sommes-nous — Floxia",
    description:
      "Découvrez l'histoire de Floxia : l'automatisation et l'IA éprouvées en entreprise, mises au service des artisans et PME du bâtiment.",
    url: "https://floxia.fr/qui-sommes-nous",
  },
  alternates: { canonical: "https://floxia.fr/qui-sommes-nous" },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Qui sommes-nous — Floxia",
  url: "https://floxia.fr/qui-sommes-nous",
  description: "Page officielle de présentation de Floxia, logiciel ERP IA pour artisans et PME du bâtiment.",
  about: {
    "@type": "Organization",
    name: "Floxia",
    alternateName: "FloxiaOS",
    url: "https://floxia.fr",
    foundingDate: "2026",
    description:
      "Floxia est un ERP IA conçu pour les artisans, auto-entrepreneurs, TPE et PME du bâtiment. Il permet de créer des devis et factures depuis WhatsApp ou l'application Floxia ERP, avec des pré-modèles générés par l'IA.",
    founder: {
      "@type": "Person",
      name: "Florian",
      jobTitle: "Fondateur & CEO",
      description: "Ingénieur en automatisation, Florian a conçu Floxia pour apporter aux artisans du bâtiment les outils d'automatisation et d'IA dont bénéficient les grandes entreprises.",
    },
    areaServed: { "@type": "Country", name: "France" },
    slogan: "Rendre aux artisans le temps qu'ils consacrent à l'administratif.",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Qui sommes-nous", item: "https://floxia.fr/qui-sommes-nous" },
  ],
};

export default function QuiSommesNous() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AboutContent />
      <Faq />
      <CtaBand />
    </main>
  );
}
