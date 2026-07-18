import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis plaquiste WhatsApp — Cirrion | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour plaquistes. Créez vos devis plâtrerie depuis WhatsApp ou sur l'application Cirrion ERP : cloisons, doublage, isolation, e-facturation 2026.",
  keywords: ["logiciel devis plaquiste", "devis plaquiste WhatsApp", "logiciel plâtrerie", "ERP plaquiste", "devis cloison placo"],
  openGraph: {
    title: "Logiciel devis plaquiste — Cirrion",
    description: "Devis plâtrerie depuis WhatsApp ou sur l'application Cirrion ERP. Cloisons, doublage, isolation — devis vocal en 3 minutes.",
    url: "https://www.florianai.fr/artisans/plaquiste",
  },
  alternates: { canonical: "https://www.florianai.fr/artisans/plaquiste" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.florianai.fr" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://www.florianai.fr/artisans" },
    { "@type": "ListItem", position: 3, name: "Plaquiste", item: "https://www.florianai.fr/artisans/plaquiste" },
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
        subtitle="Devis plâtrerie depuis WhatsApp ou sur l'application Cirrion ERP."
        intro="Plaquiste, plâtrier ou spécialiste de l'isolation : vos journées se passent sur les chantiers, pas derrière un bureau. Cirrion génère vos devis plâtrerie par message vocal depuis WhatsApp, ou via des pré-modèles IA sur l'application, avec vos prix du catalogue et la TVA de votre choix sur chaque ligne."
        features={[
          { title: "Devis plâtrerie par vocal", desc: "Dictez la prestation — cloisons, doublage, plafonds — Cirrion génère le devis PDF en 3 min avec vos prix du catalogue." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Cirrion ERP, des pré-modèles de devis plâtrerie prêts à personnaliser avec vos prestations types." },
          { title: "TVA isolation 5,5%", desc: "TVA 5,5, 10 ou 20% au choix sur chaque ligne : vous sélectionnez le taux réduit pour les travaux d'isolation thermique éligibles." },
          { title: "Catalogue de prestations", desc: "Plaques, rails, isolant, pose : enregistrez vos prestations et vos prix dans votre bibliothèque, réutilisable sur chaque devis." },
          { title: "Relances automatiques", desc: "Devis non signé relancé à J+3, J+7, J+14. Facture impayée relancée automatiquement." },
          { title: "Signature & PV de réception", desc: "Signature électronique du devis et PV de réception générés automatiquement." },
        ]}
        useCases={[
          "Cloisons et doublage d'un appartement neuf : devis multi-pièces généré par vocal en sortie de visite.",
          "Isolation thermique intérieure (ITI) : devis TVA 5,5% créé sur l'application à partir d'un pré-modèle.",
          "Pose de faux plafonds dans des bureaux : devis détaillé pièce par pièce, avec les finitions.",
          "Plaquiste indépendant : devis créés depuis le chantier, suivi des paiements depuis le téléphone.",
        ]}
        closing="Vous dictez la prestation par vocal, Cirrion génère le devis avec vos prix du catalogue et la TVA de votre choix. Vos devis de plâtrerie sont prêts en quelques minutes, sur le terrain comme au bureau."
        relatedTrades={[
          { label: "Peintre", href: "/artisans/peintre" },
          { label: "Carreleur", href: "/artisans/carreleur" },
          { label: "Menuisier", href: "/artisans/menuisier" },
        ]}
      />
    </>
  );
}
