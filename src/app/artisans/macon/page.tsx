import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis maçon WhatsApp — Cirrion | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour maçons. Créez vos devis maçonnerie depuis WhatsApp en 3 min : gros œuvre, ravalement, extension, rénovation, e-facturation 2026.",
  keywords: ["logiciel devis maçon", "devis maçon WhatsApp", "logiciel maçonnerie", "ERP maçon gros oeuvre", "gestion maçon bâtiment"],
  openGraph: {
    title: "Logiciel devis maçon — Cirrion",
    description: "Devis et factures pour maçons depuis WhatsApp en 3 minutes. Gros œuvre, ravalement, extension — TVA 5,5/10/20% au choix, e-facturation 2026.",
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
        subtitle="Devis maçonnerie depuis WhatsApp ou sur l'application Cirrion ERP."
        intro="Maçon, entreprise de gros œuvre ou spécialiste du ravalement : vos chantiers sont souvent longs et complexes, avec une paperasse qui s'accumule. Cirrion centralise devis, factures d'acompte, facture finale et PV de réception dans un seul outil, accessible depuis votre téléphone sur le chantier."
        features={[
          { title: "Devis maçonnerie par vocal", desc: "Décrivez le chantier par message vocal depuis WhatsApp — fondations, murs, chapes, ravalement — et recevez le devis PDF en 3 min." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Cirrion ERP, l'IA propose des pré-modèles de devis gros œuvre que vous adaptez à votre chantier en quelques clics." },
          { title: "Acompte et facture finale automatiques", desc: "Facture d'acompte générée à la signature du devis, facture finale en fin de chantier — Cirrion enchaîne les étapes sans que vous y pensiez." },
          { title: "TVA gros œuvre au choix", desc: "10% pour les travaux de rénovation sur existant, 20% pour le neuf, 5,5% pour les travaux d'isolation. Vous choisissez le taux sur chaque ligne, Cirrion l'applique sur le devis." },
          { title: "Gestion des équipes", desc: "Gérez vos équipes, les plannings et les heures de vos salariés depuis le tableau de bord CirrionOS." },
          { title: "PV de réception automatisé", desc: "En fin de chantier, Cirrion génère et envoie le PV de réception signé électroniquement." },
          { title: "Archivage conforme", desc: "Tous les documents de chantier archivés automatiquement, conformes aux obligations légales des entreprises du BTP." },
        ]}
        useCases={[
          "Extension de maison 40m² : devis en plusieurs lots (terrassement, fondations, élévation, chape), facture d'acompte à la signature, facture finale à la réception — tout géré par Cirrion.",
          "Ravalement de façade en copropriété : devis avec descriptif technique, TVA 10%, généré par vocal depuis WhatsApp.",
          "Maçon indépendant avec 2 chantiers simultanés : tableau de bord pour voir en un coup d'œil l'état de chaque chantier, les factures à envoyer et les relances à faire.",
          "Réhabilitation d'immeuble : gestion des équipes et des plannings, suivi des dépenses et du chiffre d'affaires depuis le tableau de bord.",
        ]}
        closing="Cirrion est adapté aux maçons indépendants comme aux PME de gros œuvre jusqu'à 50 salariés. La prise en main est immédiate — vous pouvez envoyer votre premier devis depuis WhatsApp le jour même de l'installation."
        relatedTrades={[
          { label: "Électricien", href: "/artisans/electricien" },
          { label: "Plombier", href: "/artisans/plombier" },
          { label: "Peintre", href: "/artisans/peintre" },
        ]}
      />
    </>
  );
}
