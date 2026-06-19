import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis maçon WhatsApp — Floxia | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour maçons. Créez vos devis maçonnerie depuis WhatsApp en 3 min : gros œuvre, ravalement, extension, rénovation, e-facturation 2026.",
  keywords: ["logiciel devis maçon", "devis maçon WhatsApp", "logiciel maçonnerie", "ERP maçon gros oeuvre", "gestion maçon bâtiment"],
  openGraph: {
    title: "Logiciel devis maçon — Floxia",
    description: "Devis et factures pour maçons depuis WhatsApp en 3 minutes. Gros œuvre, ravalement, extension — TVA automatique, e-facturation 2026.",
    url: "https://floxia.fr/artisans/macon",
  },
  alternates: { canonical: "https://floxia.fr/artisans/macon" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://floxia.fr/artisans" },
    { "@type": "ListItem", position: 3, name: "Maçon", item: "https://floxia.fr/artisans/macon" },
  ],
};

export default function Macon() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <TradeLanding
        trade="maçon"
        badge="Maçonnerie & Gros œuvre"
        title="Logiciel de devis et facturation pour maçons"
        subtitle="Devis maçonnerie depuis WhatsApp en 3 minutes."
        intro="Maçon, entreprise de gros œuvre ou spécialiste du ravalement : vos chantiers sont souvent complexes, avec plusieurs corps de métier et une facturation à l'avancement. Floxia centralise devis, factures d'acompte, situations de travaux et PV de réception dans un seul outil, accessible depuis votre téléphone sur le chantier."
        features={[
          { title: "Devis maçonnerie par vocal", desc: "Décrivez le chantier par message vocal depuis WhatsApp — fondations, murs, chapes, ravalement — et recevez le devis PDF en 3 min." },
          { title: "Facturation à l'avancement", desc: "Situations de travaux intermédiaires, retenue de garantie, levée de réserves — Floxia gère toute la complexité de la facturation BTP." },
          { title: "TVA gros œuvre automatique", desc: "10% pour les travaux de rénovation sur existant, 20% pour le neuf, 5,5% pour les travaux d'isolation. Calculé automatiquement." },
          { title: "Gestion multi-corps de métier", desc: "Coordonnez les sous-traitants et les différentes équipes depuis le tableau de bord FloxiaOS." },
          { title: "PV de réception automatisé", desc: "À la levée des réserves, Floxia génère et envoie le PV de réception signé électroniquement." },
          { title: "Archivage conforme", desc: "Tous les documents de chantier archivés automatiquement, conformes aux obligations légales des entreprises du BTP." },
        ]}
        useCases={[
          "Extension de maison 40m² : devis en plusieurs lots (terrassement, fondations, élévation, chape), situations de travaux mensuelles, retenue de garantie de 5% — tout géré par Floxia.",
          "Ravalement de façade en copropriété : devis avec descriptif technique, TVA 10%, CCTP simplifié généré automatiquement depuis WhatsApp.",
          "Maçon indépendant avec 2 chantiers simultanés : tableau de bord pour voir en un coup d'œil l'état de chaque chantier, les factures à envoyer et les relances à faire.",
          "Réhabilitation d'immeuble : coordination de 4 corps de métier, suivi budgétaire en temps réel, documents conformes DCE.",
        ]}
        closing="Floxia est adapté aux maçons indépendants comme aux PME de gros œuvre jusqu'à 50 salariés. La prise en main est immédiate — vous pouvez envoyer votre premier devis depuis WhatsApp le jour même de l'installation."
        relatedTrades={[
          { label: "Électricien", href: "/artisans/electricien" },
          { label: "Plombier", href: "/artisans/plombier" },
          { label: "Peintre", href: "/artisans/peintre" },
        ]}
      />
    </>
  );
}
