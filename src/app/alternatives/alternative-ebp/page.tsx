import type { Metadata } from "next";
import AlternativePage from "@/components/sections/AlternativePage";

export const metadata: Metadata = {
  title: "Alternative à EBP : logiciel devis bâtiment moderne et IA — Cirrion",
  description:
    "Une alternative à EBP plus moderne pour artisans du bâtiment : devis WhatsApp, IA, e-facturation 2026, pré-modèles de devis. Comparatif Cirrion vs EBP.",
  keywords: ["alternative EBP", "EBP bâtiment avis", "logiciel comme EBP", "remplacer EBP", "concurrent EBP artisan"],
  openGraph: {
    title: "Alternative à EBP — Cirrion, le logiciel devis IA",
    description: "Une alternative à EBP plus moderne : devis WhatsApp, IA, e-facturation 2026, pré-modèles de devis.",
    url: "https://floxia.fr/alternatives/alternative-ebp",
  },
  alternates: { canonical: "https://floxia.fr/alternatives/alternative-ebp" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Alternatives", item: "https://floxia.fr/alternatives" },
    { "@type": "ListItem", position: 3, name: "Alternative à EBP", item: "https://floxia.fr/alternatives/alternative-ebp" },
  ],
};

export default function AlternativeEbp() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AlternativePage
        competitor="EBP"
        badge="Alternative"
        title="Cirrion, l'alternative moderne à EBP Bâtiment"
        intro="EBP Bâtiment est un logiciel de gestion installé chez de nombreux artisans, mais son interface et son approche restent classiques. Cirrion propose une alternative résolument moderne : créez vos devis par message vocal sur WhatsApp ou via des pré-modèles IA, et laissez l'intelligence artificielle gérer relances et accueil client."
        whyTitle="Pourquoi passer d'EBP à Cirrion"
        whyParagraphs={[
          "EBP est un logiciel fiable pour la création de devis, factures et le suivi comptable. Mais il repose sur une utilisation au bureau, devant un ordinateur, avec une saisie manuelle.",
          "Cirrion inverse la logique : votre outil de gestion vous suit sur le chantier, dans votre poche, via WhatsApp. Un message vocal et le devis est prêt. L'IA relance vos clients, répond au téléphone, et l'application web vous offre des pré-modèles de devis pour les chantiers complexes. C'est l'alternative à EBP pour les artisans qui vivent sur le terrain.",
        ]}
        rows={[
          { feature: "Mobilité totale (WhatsApp terrain)", floxia: true, competitor: "partial" },
          { feature: "Devis par vocal WhatsApp", floxia: true, competitor: false },
          { feature: "Pré-modèles de devis IA", floxia: true, competitor: false },
          { feature: "Agent IA réceptionniste 24h/24", floxia: true, competitor: false },
          { feature: "Relances automatiques IA", floxia: true, competitor: false },
          { feature: "Devis & facturation complète", floxia: true, competitor: true },
          { feature: "E-facturation 2026 conforme", floxia: true, competitor: true },
          { feature: "Hébergement 100% France / RGPD", floxia: true, competitor: true },
        ]}
        forWhom="Cirrion est l'alternative à EBP pour les artisans du bâtiment qui veulent un outil mobile, intelligent et sans saisie fastidieuse. Si vous passez plus de temps sur les chantiers qu'au bureau, Cirrion est fait pour vous."
        others={[
          { label: "Cirrion vs Obat", href: "/alternatives/cirrion-vs-obat" },
          { label: "Alternative à Batigest", href: "/alternatives/alternative-batigest" },
          { label: "Alternative à Sage", href: "/alternatives/alternative-sage" },
        ]}
      />
    </>
  );
}
