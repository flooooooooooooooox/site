import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis carreleur WhatsApp — Floxia | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour carreleurs. Créez vos devis carrelage depuis WhatsApp ou sur l'application Floxia ERP : faïence, sol, terrasse, e-facturation 2026.",
  keywords: ["logiciel devis carreleur", "devis carreleur WhatsApp", "logiciel carrelage", "ERP carreleur", "devis carrelage au m2"],
  openGraph: {
    title: "Logiciel devis carreleur — Floxia",
    description: "Devis carrelage depuis WhatsApp ou sur l'application Floxia ERP. Faïence, sol, terrasse — calcul au m² automatique.",
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
        subtitle="Devis carrelage depuis WhatsApp ou sur l'application Floxia ERP."
        intro="Carreleur, mosaïste ou poseur de revêtements : vos devis se calculent au m² avec une part importante de fourniture. Floxia génère vos devis carrelage par message vocal depuis WhatsApp, ou via des pré-modèles IA sur l'application, avec calcul des surfaces et application automatique de la TVA."
        features={[
          { title: "Devis carrelage au m² par vocal", desc: "Dictez les dimensions — sol, murs, faïence — Floxia calcule les surfaces et génère le devis en 3 min." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Floxia ERP, des pré-modèles de devis carrelage prêts à personnaliser avec calcul au m² intégré." },
          { title: "Fourniture + pose distinguées", desc: "Carrelage, colle, joints et main d'œuvre séparés automatiquement, avec les bonnes TVA." },
          { title: "TVA rénovation automatique", desc: "10% pour la rénovation, 20% pour le neuf. Appliqué automatiquement selon le chantier." },
          { title: "Catalogue de prix réutilisable", desc: "Enregistrez vos prix par type de pose et de matériau pour des devis ultra-rapides." },
          { title: "Relances & PV de réception", desc: "Relances automatiques et PV de réception signé électroniquement en fin de chantier." },
        ]}
        useCases={[
          "Carrelage d'une salle de bain 8m² + faïence murale : devis avec calcul des surfaces, fourniture et pose, généré par vocal.",
          "Pose de grès cérame sur une terrasse 30m² : devis créé sur l'application à partir d'un pré-modèle, TVA 10%.",
          "Rénovation de sol d'un appartement : devis multi-pièces avec métré automatique.",
          "Carreleur indépendant : devis créés en sortie de visite, suivi des signatures depuis le téléphone.",
        ]}
        closing="Floxia calcule vos surfaces, applique vos prix au m² et gère la fourniture comme la pose. Vos devis carrelage sont prêts en quelques minutes, du chantier comme du bureau."
        relatedTrades={[
          { label: "Plombier", href: "/artisans/plombier" },
          { label: "Peintre", href: "/artisans/peintre" },
          { label: "Plaquiste", href: "/artisans/plaquiste" },
        ]}
      />
    </>
  );
}
