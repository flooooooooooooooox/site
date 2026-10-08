import { pageMetadata, serializeJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = pageMetadata({
  title: "Logiciel devis serrurier-métallier WhatsApp — Cirrion",
  description:
    "Logiciel de devis et facturation pour serruriers-métalliers. Chiffrez dépannage, portes blindées, garde-corps et ouvrages métalliques depuis WhatsApp ou l'app Cirrion.",
  keywords: [
    "logiciel devis serrurier",
    "logiciel serrurier métallier",
    "devis serrurier WhatsApp",
    "logiciel facturation serrurier",
    "ERP serrurier",
  ],
  openGraph: {
    title: "Logiciel devis serrurier-métallier — Cirrion",
    description: "Devis et factures pour serruriers-métalliers depuis WhatsApp ou l'application Cirrion.",
    url: "https://www.cirrion.eu/artisans/serrurier",
  },
  alternates: { canonical: "https://www.cirrion.eu/artisans/serrurier" },
});

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://www.cirrion.eu/artisans" },
    { "@type": "ListItem", position: 3, name: "Serrurier-métallier", item: "https://www.cirrion.eu/artisans/serrurier" },
  ],
};

export default function Serrurier() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumb) }} />
      <TradeLanding
        trade="serrurier-métallier"
        badge="Serrurerie & Métallerie"
        title="Logiciel de devis et facturation pour serruriers-métalliers"
        subtitle="Chiffrez vos interventions depuis WhatsApp ou l'application Cirrion."
        intro="Dépannage urgent, remplacement de serrure, porte blindée, portail ou garde-corps sur mesure : le serrurier-métallier alterne interventions rapides et ouvrages à chiffrer précisément. Cirrion met au même endroit devis, factures et suivi client depuis le terrain ou le bureau."
        features={[
          { title: "Devis depuis le terrain", desc: "Décrivez l'intervention par vocal ou texte depuis WhatsApp et préparez le devis sans ressaisie au retour à l'atelier." },
          { title: "Modèles de devis réutilisables", desc: "Enregistrez vos prestations récurrentes dans l'application Cirrion et adaptez quantités, fournitures et main-d'œuvre à chaque chantier." },
          { title: "Dépannage et métallerie", desc: "Séparez clairement déplacement, urgence, fourniture, pose et fabrication sur mesure dans vos lignes de devis." },
          { title: "Acomptes et factures", desc: "Suivez l'acompte, la facture finale et les paiements depuis le même dossier client." },
          { title: "Relances structurées", desc: "Centralisez les devis en attente et les factures à relancer pour éviter les dossiers oubliés." },
          { title: "Historique client", desc: "Retrouvez devis, factures, interventions et documents d'un client dans un historique unique." },
        ]}
        useCases={[
          "Un client appelle pour une porte bloquée : le serrurier prépare le devis depuis son téléphone avant ou juste après l'intervention.",
          "Pour un garde-corps sur mesure, le devis distingue fourniture, fabrication, finition et pose afin de garder un chiffrage lisible.",
          "Une entreprise de serrurerie suit plusieurs devis en attente et retrouve immédiatement ceux qui nécessitent une relance.",
        ]}
        closing="Cirrion réunit les documents commerciaux et le suivi client des serruriers-métalliers dans un outil utilisable aussi bien sur le terrain qu'au bureau."
        relatedTrades={[
          { label: "Menuisier", href: "/artisans/menuisier" },
          { label: "Électricien", href: "/artisans/electricien" },
          { label: "Maçon", href: "/artisans/macon" },
        ]}
      />
    </>
  );
}
