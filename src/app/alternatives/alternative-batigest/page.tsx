import type { Metadata } from "next";
import AlternativePage from "@/components/sections/AlternativePage";

export const metadata: Metadata = {
  title: "Alternative à Batigest : logiciel devis bâtiment simple et IA — Cirrion",
  description:
    "Vous cherchez une alternative à Batigest plus simple et moins chère ? Cirrion : devis WhatsApp, IA, e-facturation 2026, sans formation. Comparatif complet.",
  keywords: ["alternative Batigest", "Batigest avis", "logiciel comme Batigest", "remplacer Batigest", "concurrent Batigest"],
  openGraph: {
    title: "Alternative à Batigest — Cirrion, le logiciel devis IA",
    description: "Une alternative à Batigest plus simple, sans formation : devis WhatsApp, IA, e-facturation 2026.",
    url: "https://floxia.fr/alternatives/alternative-batigest",
  },
  alternates: { canonical: "https://floxia.fr/alternatives/alternative-batigest" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Alternatives", item: "https://floxia.fr/alternatives" },
    { "@type": "ListItem", position: 3, name: "Alternative à Batigest", item: "https://floxia.fr/alternatives/alternative-batigest" },
  ],
};

export default function AlternativeBatigest() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AlternativePage
        competitor="Batigest"
        badge="Alternative"
        title="Cirrion, l'alternative à Batigest pensée pour les petites structures"
        intro="Batigest (Sage) est un logiciel de gestion bâtiment complet, mais souvent jugé lourd, cher et complexe à prendre en main pour un artisan indépendant ou une petite PME. Cirrion propose une alternative moderne : aussi puissante sur les essentiels, mais utilisable depuis WhatsApp et sans aucune formation."
        whyTitle="Pourquoi choisir Cirrion plutôt que Batigest"
        whyParagraphs={[
          "Batigest s'adresse historiquement aux entreprises du bâtiment structurées, avec un besoin de formation et un coût d'implémentation non négligeable. C'est un outil riche mais exigeant.",
          "Cirrion élimine la barrière de la complexité. Vous créez vos devis par message vocal sur WhatsApp ou via des pré-modèles IA sur l'application, sans manuel ni formation. L'IA gère les relances, l'accueil client et la conformité e-facturation 2026 automatiquement. C'est l'alternative à Batigest pour ceux qui veulent la puissance sans la lourdeur.",
        ]}
        rows={[
          { feature: "Prise en main sans formation", floxia: true, competitor: false },
          { feature: "Devis par vocal WhatsApp", floxia: true, competitor: false },
          { feature: "Pré-modèles de devis IA", floxia: true, competitor: "partial" },
          { feature: "Relances automatiques IA", floxia: true, competitor: false },
          { feature: "Gestion de chantier complète", floxia: true, competitor: true },
          { feature: "E-facturation 2026 conforme", floxia: true, competitor: true },
          { feature: "Tarif adapté aux indépendants", floxia: true, competitor: "partial" },
          { feature: "Hébergement 100% France / RGPD", floxia: true, competitor: true },
        ]}
        forWhom="Cirrion est la meilleure alternative à Batigest pour les artisans indépendants et les PME de moins de 50 salariés qui trouvent Batigest trop complexe ou trop cher. Vous gardez la conformité et la rigueur de gestion, mais avec une simplicité d'usage radicale."
        others={[
          { label: "Cirrion vs Obat", href: "/alternatives/cirrion-vs-obat" },
          { label: "Alternative à Sage", href: "/alternatives/alternative-sage" },
          { label: "Alternative à EBP", href: "/alternatives/alternative-ebp" },
        ]}
      />
    </>
  );
}
