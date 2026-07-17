import type { Metadata } from "next";
import AlternativePage from "@/components/sections/AlternativePage";

export const metadata: Metadata = {
  title: "Alternative à Sage : logiciel devis & facture bâtiment IA — Cirrion",
  description:
    "Une alternative à Sage plus simple pour les artisans du bâtiment : devis WhatsApp, IA, e-facturation 2026, pré-modèles de devis. Comparatif Cirrion vs Sage.",
  keywords: ["alternative Sage", "Sage bâtiment avis", "logiciel comme Sage", "remplacer Sage artisan", "concurrent Sage"],
  openGraph: {
    title: "Alternative à Sage — Cirrion pour artisans du bâtiment",
    description: "Une alternative à Sage plus simple et moderne : devis WhatsApp, IA, e-facturation 2026.",
    url: "https://floxia.fr/alternatives/alternative-sage",
  },
  alternates: { canonical: "https://floxia.fr/alternatives/alternative-sage" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Alternatives", item: "https://floxia.fr/alternatives" },
    { "@type": "ListItem", position: 3, name: "Alternative à Sage", item: "https://floxia.fr/alternatives/alternative-sage" },
  ],
};

export default function AlternativeSage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AlternativePage
        competitor="Sage"
        badge="Alternative"
        title="Cirrion, l'alternative à Sage pour les artisans du bâtiment"
        intro="Sage est une référence de la gestion d'entreprise, mais ses solutions sont souvent surdimensionnées et coûteuses pour un artisan ou une petite PME du bâtiment. Cirrion offre une alternative ciblée sur vos besoins réels : devis, factures, relances et accueil client, le tout automatisé par l'IA et utilisable depuis WhatsApp."
        whyTitle="Pourquoi Cirrion est une meilleure alternative à Sage pour le bâtiment"
        whyParagraphs={[
          "Sage couvre la comptabilité, la paie et la gestion d'entreprise au sens large. C'est pertinent pour des structures importantes avec un service administratif dédié, mais c'est un investissement lourd pour un artisan.",
          "Cirrion se concentre sur le quotidien d'un professionnel du bâtiment : générer un devis depuis le terrain par vocal WhatsApp, relancer automatiquement, encaisser plus vite. Pour la comptabilité, Cirrion exporte vos données en un clic vers votre expert-comptable. C'est l'alternative à Sage qui correspond à votre métier, sans payer pour des modules que vous n'utiliserez jamais.",
        ]}
        rows={[
          { feature: "Spécialisé bâtiment / artisan", floxia: true, competitor: "partial" },
          { feature: "Devis par vocal WhatsApp", floxia: true, competitor: false },
          { feature: "Pré-modèles de devis IA", floxia: true, competitor: false },
          { feature: "Agent IA réceptionniste 24h/24", floxia: true, competitor: false },
          { feature: "Relances automatiques IA", floxia: true, competitor: false },
          { feature: "Export comptabilité 1 clic", floxia: true, competitor: true },
          { feature: "E-facturation 2026 conforme", floxia: true, competitor: true },
          { feature: "Tarif adapté aux indépendants", floxia: true, competitor: false },
        ]}
        forWhom="Cirrion est l'alternative à Sage pour les artisans et PME du bâtiment qui n'ont pas besoin d'un ERP comptable complet, mais d'un outil simple et intelligent pour gérer devis, factures et relations clients au quotidien."
        others={[
          { label: "Cirrion vs Obat", href: "/alternatives/floxia-vs-obat" },
          { label: "Alternative à Batigest", href: "/alternatives/alternative-batigest" },
          { label: "Alternative à EBP", href: "/alternatives/alternative-ebp" },
        ]}
      />
    </>
  );
}
