import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis plaquiste WhatsApp — Floxia | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour plaquistes. Créez vos devis plâtrerie depuis WhatsApp ou sur l'application Floxia ERP : cloisons, doublage, isolation, e-facturation 2026.",
  keywords: ["logiciel devis plaquiste", "devis plaquiste WhatsApp", "logiciel plâtrerie", "ERP plaquiste", "devis cloison placo"],
  openGraph: {
    title: "Logiciel devis plaquiste — Floxia",
    description: "Devis plâtrerie depuis WhatsApp ou sur l'application Floxia ERP. Cloisons, doublage, isolation — calcul au m² automatique.",
    url: "https://floxia.fr/artisans/plaquiste",
  },
  alternates: { canonical: "https://floxia.fr/artisans/plaquiste" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://floxia.fr/artisans" },
    { "@type": "ListItem", position: 3, name: "Plaquiste", item: "https://floxia.fr/artisans/plaquiste" },
  ],
};

export default function Plaquiste() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <TradeLanding
        trade="plaquiste"
        badge="Plâtrerie & Isolation"
        title="Logiciel de devis et facturation pour plaquistes"
        subtitle="Devis plâtrerie depuis WhatsApp ou sur l'application Floxia ERP."
        intro="Plaquiste, plâtrier ou spécialiste de l'isolation : vos devis se calculent au m² de cloison, doublage ou plafond. Floxia génère vos devis plâtrerie par message vocal depuis WhatsApp, ou via des pré-modèles IA sur l'application, avec calcul des surfaces et TVA automatique."
        features={[
          { title: "Devis plâtrerie au m² par vocal", desc: "Dictez les surfaces — cloisons, doublage, plafonds — Floxia calcule les m² et génère le devis en 3 min." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Floxia ERP, des pré-modèles de devis plâtrerie prêts à personnaliser, avec calcul au m² intégré." },
          { title: "TVA isolation 5,5%", desc: "Application automatique de la TVA réduite pour les travaux d'isolation thermique éligibles." },
          { title: "Fourniture + pose distinguées", desc: "Plaques, rails, isolant et main d'œuvre séparés automatiquement avec les bonnes TVA." },
          { title: "Relances automatiques", desc: "Devis non signé relancé à J+3, J+7, J+14. Facture impayée relancée automatiquement." },
          { title: "Signature & PV de réception", desc: "Signature électronique du devis et PV de réception générés automatiquement." },
        ]}
        useCases={[
          "Cloisons et doublage d'un appartement neuf : devis multi-pièces au m², généré par vocal après le métré.",
          "Isolation thermique intérieure (ITI) : devis TVA 5,5%, attestation, créé sur l'application à partir d'un pré-modèle.",
          "Pose de faux plafonds dans des bureaux : devis avec métré au m² et finitions.",
          "Plaquiste indépendant : devis créés depuis le chantier, suivi des paiements depuis le téléphone.",
        ]}
        closing="Floxia calcule vos surfaces de cloisons et plafonds, applique vos prix au m² et gère la TVA isolation. Vos devis de plâtrerie sont prêts en quelques minutes, sur le terrain comme au bureau."
        relatedTrades={[
          { label: "Peintre", href: "/artisans/peintre" },
          { label: "Carreleur", href: "/artisans/carreleur" },
          { label: "Menuisier", href: "/artisans/menuisier" },
        ]}
      />
    </>
  );
}
