import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Qui sommes-nous — Cirrion | L'automatisation au service des artisans",
  description:
    "Découvrez l'histoire de Cirrion : fondée par Florian, ingénieur en automatisation, pour apporter l'IA et l'ERP aux artisans et PME du bâtiment. Devis, factures, gestion depuis WhatsApp ou l'application Cirrion.",
  keywords: [
    "Cirrion",
    "qui est Cirrion",
    "Cirrion bâtiment",
    "fondateur Cirrion",
    "Cirrion ERP artisan",
    "histoire Cirrion",
    "logiciel artisan Cirrion",
  ],
  openGraph: {
    title: "Qui sommes-nous — Cirrion",
    description:
      "Découvrez l'histoire de Cirrion : l'automatisation et l'IA éprouvées en entreprise, mises au service des artisans et PME du bâtiment.",
    url: "https://www.cirrion.eu/qui-sommes-nous",
  },
  alternates: { canonical: "https://www.cirrion.eu/qui-sommes-nous" },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Qui sommes-nous — Cirrion",
  url: "https://www.cirrion.eu/qui-sommes-nous",
  description: "Page officielle de présentation de Cirrion, logiciel ERP IA pour artisans et PME du bâtiment.",
  about: {
    "@type": "Organization",
    name: "Cirrion",
    alternateName: "CirrionOS",
    url: "https://www.cirrion.eu",
    foundingDate: "2026",
    description:
      "Cirrion est un ERP IA conçu pour les artisans, auto-entrepreneurs, TPE et PME du bâtiment. Il permet de créer des devis et factures depuis WhatsApp ou l'application Cirrion ERP, avec des pré-modèles générés par l'IA.",
    founder: {
      "@type": "Person",
      name: "Florian",
      jobTitle: "Fondateur & CEO",
      description: "Ingénieur en automatisation, Florian a conçu Cirrion pour apporter aux artisans du bâtiment les outils d'automatisation et d'IA dont bénéficient les grandes entreprises.",
    },
    areaServed: { "@type": "Country", name: "France" },
    slogan: "Rendre aux artisans le temps qu'ils consacrent à l'administratif.",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Qui sommes-nous", item: "https://www.cirrion.eu/qui-sommes-nous" },
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
