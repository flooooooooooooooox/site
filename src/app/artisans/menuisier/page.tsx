import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis menuisier WhatsApp — Cirrion | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour menuisiers. Créez vos devis menuiserie depuis WhatsApp ou sur l'application Cirrion ERP : fenêtres, portes, agencement, e-facturation 2026.",
  keywords: ["logiciel devis menuisier", "devis menuisier WhatsApp", "logiciel menuiserie", "ERP menuisier", "devis agencement bois"],
  openGraph: {
    title: "Logiciel devis menuisier — Cirrion",
    description: "Devis menuiserie depuis WhatsApp ou sur l'application Cirrion ERP. Fenêtres, portes, agencement — TVA 5,5/10/20% au choix.",
    url: "https://floxia.fr/artisans/menuisier",
  },
  alternates: { canonical: "https://floxia.fr/artisans/menuisier" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://floxia.fr/artisans" },
    { "@type": "ListItem", position: 3, name: "Menuisier", item: "https://floxia.fr/artisans/menuisier" },
  ],
};

export default function Menuisier() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <TradeLanding
        trade="menuisier"
        badge="Menuiserie & Agencement"
        title="Logiciel de devis et facturation pour menuisiers"
        subtitle="Devis menuiserie depuis WhatsApp ou sur l'application Cirrion ERP."
        intro="Menuisier bois, alu ou PVC, agenceur ou poseur : vos devis mêlent fourniture et pose, avec des dimensions précises et des finitions variées. Cirrion génère vos devis depuis WhatsApp par message vocal, ou via des pré-modèles IA sur l'application, avec la TVA de votre choix selon le type de travaux."
        features={[
          { title: "Devis menuiserie par vocal", desc: "Dictez les ouvrages — fenêtres, portes, placards, escaliers — et recevez le devis PDF en 3 min depuis WhatsApp." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Cirrion ERP, des pré-modèles de devis menuiserie prêts à personnaliser, idéal pour l'agencement sur mesure." },
          { title: "Catalogue de prestations", desc: "Fenêtres, portes, placards, pose : enregistrez vos prestations et vos prix dans votre bibliothèque, réutilisable sur chaque devis." },
          { title: "TVA rénovation au choix", desc: "5,5% pour les menuiseries d'isolation thermique, 10% en rénovation, 20% pour le neuf. Vous choisissez le taux sur chaque ligne, Cirrion l'applique sur le devis." },
          { title: "Relances automatiques", desc: "Devis non signé relancé à J+3, J+7, J+14. Facture impayée relancée automatiquement." },
          { title: "Signature & PV de réception", desc: "Signature électronique du devis et PV de réception de pose générés automatiquement." },
        ]}
        useCases={[
          "Remplacement de 6 fenêtres en rénovation énergétique : devis avec TVA 5,5%, fourniture et pose détaillées — généré par vocal en sortie de visite.",
          "Agencement sur mesure d'une cuisine : devis détaillé multi-postes créé sur l'application à partir d'un pré-modèle, avec plan de prix enregistré.",
          "Pose de portes intérieures dans un immeuble neuf : devis TVA 20%, facture d'acompte à la commande et facture finale à la pose.",
          "Menuisier indépendant : devis créés depuis le chantier, suivi des signatures et paiements depuis le téléphone.",
        ]}
        closing="Que vous travailliez le bois, l'aluminium ou le PVC, Cirrion s'adapte à vos ouvrages et à vos finitions. La création de devis devient instantanée, sur le terrain comme à l'atelier."
        relatedTrades={[
          { label: "Plombier", href: "/artisans/plombier" },
          { label: "Carreleur", href: "/artisans/carreleur" },
          { label: "Plaquiste", href: "/artisans/plaquiste" },
        ]}
      />
    </>
  );
}
