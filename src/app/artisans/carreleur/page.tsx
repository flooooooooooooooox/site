import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis carreleur WhatsApp — Cirrion | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour carreleurs. Créez vos devis carrelage depuis WhatsApp ou sur l'application Cirrion ERP : faïence, sol, terrasse, e-facturation 2026.",
  keywords: ["logiciel devis carreleur", "devis carreleur WhatsApp", "logiciel carrelage", "ERP carreleur", "devis carrelage au m2"],
  openGraph: {
    title: "Logiciel devis carreleur — Cirrion",
    description: "Devis carrelage depuis WhatsApp ou sur l'application Cirrion ERP. Faïence, sol, terrasse — devis vocal en 3 minutes.",
    url: "https://floxia.fr/artisans/carreleur",
  },
  alternates: { canonical: "https://floxia.fr/artisans/carreleur" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://floxia.fr/artisans" },
    { "@type": "ListItem", position: 3, name: "Carreleur", item: "https://floxia.fr/artisans/carreleur" },
  ],
};

export default function Carreleur() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <TradeLanding
        trade="carreleur"
        badge="Carrelage & Revêtements"
        title="Logiciel de devis et facturation pour carreleurs"
        subtitle="Devis carrelage depuis WhatsApp ou sur l'application Cirrion ERP."
        intro="Carreleur, mosaïste ou poseur de revêtements : vos journées se passent sur les chantiers, pas derrière l'administratif. Cirrion génère vos devis carrelage par message vocal depuis WhatsApp, ou via des pré-modèles IA sur l'application, avec vos prix du catalogue et la TVA de votre choix sur chaque ligne."
        features={[
          { title: "Devis carrelage par vocal", desc: "Dictez la prestation — sol, murs, faïence — Cirrion génère le devis en 3 min avec vos prix du catalogue." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Cirrion ERP, des pré-modèles de devis carrelage prêts à personnaliser avec vos prestations types." },
          { title: "Bibliothèque de prestations", desc: "Carrelage, colle, joints, pose : enregistrez vos prestations et vos prix, réutilisables sur chaque devis." },
          { title: "TVA rénovation au choix", desc: "10% pour la rénovation, 20% pour le neuf. Vous choisissez le taux sur chaque ligne, Cirrion l'applique sur le devis." },
          { title: "Catalogue de prix réutilisable", desc: "Enregistrez vos prix par type de pose et de matériau pour des devis ultra-rapides." },
          { title: "Relances & PV de réception", desc: "Relances automatiques et PV de réception signé électroniquement en fin de chantier." },
        ]}
        useCases={[
          "Carrelage d'une salle de bain 8m² + faïence murale : devis détaillé fourniture et pose, généré par vocal.",
          "Pose de grès cérame sur une terrasse 30m² : devis créé sur l'application à partir d'un pré-modèle, TVA 10%.",
          "Rénovation de sol d'un appartement : devis multi-pièces généré en quelques minutes.",
          "Carreleur indépendant : devis créés en sortie de visite, suivi des signatures depuis le téléphone.",
        ]}
        closing="Vous dictez la prestation par vocal, Cirrion génère le devis avec vos prix du catalogue, fourniture comme pose. Vos devis carrelage sont prêts en quelques minutes, du chantier comme du bureau."
        relatedTrades={[
          { label: "Plombier", href: "/artisans/plombier" },
          { label: "Peintre", href: "/artisans/peintre" },
          { label: "Plaquiste", href: "/artisans/plaquiste" },
        ]}
      />
    </>
  );
}
