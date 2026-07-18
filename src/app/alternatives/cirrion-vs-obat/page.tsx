import type { Metadata } from "next";
import AlternativePage from "@/components/sections/AlternativePage";

export const metadata: Metadata = {
  title: "Cirrion vs Obat : quel logiciel de devis pour artisans choisir ?",
  description:
    "Comparatif Cirrion vs Obat pour les artisans du bâtiment. Devis WhatsApp, IA, e-facturation 2026, pré-modèles de devis. Découvrez quelle solution choisir.",
  keywords: ["Cirrion vs Obat", "alternative Obat", "Obat avis", "comparatif logiciel devis artisan", "logiciel comme Obat"],
  openGraph: {
    title: "Cirrion vs Obat — Comparatif logiciel devis artisan",
    description: "Devis WhatsApp, IA, e-facturation 2026 : Cirrion vs Obat, le comparatif complet pour artisans du bâtiment.",
    url: "https://www.florianai.fr/alternatives/cirrion-vs-obat",
  },
  alternates: { canonical: "https://www.florianai.fr/alternatives/cirrion-vs-obat" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.florianai.fr" },
    { "@type": "ListItem", position: 2, name: "Alternatives", item: "https://www.florianai.fr/alternatives" },
    { "@type": "ListItem", position: 3, name: "Cirrion vs Obat", item: "https://www.florianai.fr/alternatives/cirrion-vs-obat" },
  ],
};

export default function CirrionVsObat() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AlternativePage
        competitor="Obat"
        badge="Comparatif"
        title="Cirrion vs Obat : quel logiciel choisir pour vos devis ?"
        intro="Obat est un logiciel de devis et facturation apprécié des artisans du bâtiment. Mais si vous cherchez à créer vos devis depuis WhatsApp par message vocal, ou à automatiser vos relances et votre accueil client avec l'IA, Cirrion va plus loin. Voici une comparaison honnête pour vous aider à choisir."
        whyTitle="Ce qui distingue Cirrion d'Obat"
        whyParagraphs={[
          "Obat est un excellent outil de création de devis et factures en ligne, avec une bibliothèque d'ouvrages riche. C'est une solution solide pour la gestion documentaire classique.",
          "Cirrion ajoute une couche d'intelligence artificielle : vous créez vos devis depuis WhatsApp par simple message vocal, l'agent IA répond à vos clients 24h/24, les relances de devis et factures partent automatiquement, et vous pouvez aussi créer vos devis sur l'application avec des pré-modèles IA. Cirrion couvre toute la chaîne, pas seulement le document.",
        ]}
        rows={[
          { feature: "Devis par vocal WhatsApp", floxia: true, competitor: false },
          { feature: "Pré-modèles de devis IA sur l'app", floxia: true, competitor: "partial" },
          { feature: "Bibliothèque d'ouvrages / prix", floxia: true, competitor: true },
          { feature: "Agent IA réceptionniste 24h/24", floxia: true, competitor: false },
          { feature: "Relances automatiques devis / factures", floxia: true, competitor: false },
          { feature: "E-facturation 2026 conforme", floxia: true, competitor: true },
          { feature: "Signature électronique légale", floxia: true, competitor: "partial" },
          { feature: "Hébergement 100% France / RGPD", floxia: true, competitor: true },
        ]}
        forWhom="Cirrion est l'alternative idéale à Obat pour les artisans et PME qui veulent gagner du temps sur tout l'administratif, pas seulement sur la création de devis. Si vous passez beaucoup de temps au téléphone, à relancer vos clients ou à ressaisir des documents, l'automatisation par l'IA de Cirrion fait une vraie différence."
        others={[
          { label: "Alternative à Batigest", href: "/alternatives/alternative-batigest" },
          { label: "Alternative à Sage", href: "/alternatives/alternative-sage" },
          { label: "Alternative à EBP", href: "/alternatives/alternative-ebp" },
        ]}
      />
    </>
  );
}
