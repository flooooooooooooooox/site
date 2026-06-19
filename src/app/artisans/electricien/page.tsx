import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis électricien WhatsApp — Floxia | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour électriciens. Créez vos devis électricité depuis WhatsApp en 3 min : mise aux normes, tableau électrique, domotique, e-facturation 2026.",
  keywords: ["logiciel devis électricien", "devis électricien WhatsApp", "logiciel électricien bâtiment", "ERP électricien", "gestion électricien"],
  openGraph: {
    title: "Logiciel devis électricien — Floxia",
    description: "Devis et factures pour électriciens depuis WhatsApp en 3 minutes. TVA automatique, e-facturation 2026, relances.",
    url: "https://floxia.fr/artisans/electricien",
  },
  alternates: { canonical: "https://floxia.fr/artisans/electricien" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://floxia.fr/artisans" },
    { "@type": "ListItem", position: 3, name: "Électricien", item: "https://floxia.fr/artisans/electricien" },
  ],
};

export default function Electricien() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <TradeLanding
        trade="électricien"
        badge="Électricité"
        title="Logiciel de devis et facturation pour électriciens"
        subtitle="Devis électricité depuis WhatsApp ou sur l'application Floxia ERP."
        intro="En tant qu'électricien, vous intervenez sur des chantiers variés : mise aux normes NF C 15-100, installation de tableaux électriques, domotique, bornes de recharge VE. Floxia comprend le vocabulaire de l'électricité du bâtiment et génère automatiquement vos devis avec les bonnes TVA et les bonnes nomenclatures, depuis votre téléphone sur chantier."
        features={[
          { title: "Devis électricité par vocal", desc: "Dictez vos prestations depuis WhatsApp — tableau électrique, câblage, prises, éclairage — et recevez le devis PDF en 3 min." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Floxia ERP, l'IA propose des pré-modèles de devis électricité que vous personnalisez en quelques clics. Idéal au bureau." },
          { title: "TVA automatique", desc: "5,5% pour rénovation en résidence principale, 10% pour travaux sur existant, 20% pour le neuf. Floxia applique la bonne TVA automatiquement." },
          { title: "Attestation TVA réduite", desc: "Génération automatique du formulaire CERFA requis pour les TVA à taux réduit sur les travaux de rénovation." },
          { title: "Conformité e-facturation 2026", desc: "Toutes vos factures sont conformes à l'obligation e-facturation 2026 pour les entreprises du bâtiment." },
          { title: "Relances automatiques", desc: "Devis non signé à J+3, J+7, J+14. Facture impayée à J+15, J+30. Tout est automatique." },
          { title: "PV de réception", desc: "À la fin du chantier électrique, Floxia génère et envoie le PV de réception avec signature électronique." },
        ]}
        useCases={[
          "Un électricien reçoit un appel pour la mise aux normes d'un appartement. Il dicte les prestations par vocal depuis WhatsApp en sortant de la visite. Le devis est envoyé au client avant même de rentrer au bureau.",
          "Une PME d'électricité avec 5 techniciens : chaque technicien génère ses propres devis depuis le terrain. Le gérant suit l'activité en temps réel sur le tableau de bord FloxiaOS.",
          "Installation de 3 bornes de recharge IRVE sur un parking : devis spécifique, TVA 20%, convention Advenir — Floxia gère tout le formalisme.",
          "Fin de chantier : la facture finale et le PV de réception sont générés et envoyés automatiquement dès que le client valide la réception des travaux.",
        ]}
        closing="Floxia s'adapte à tous les types d'interventions électriques : dépannage, installation neuve, rénovation, mise aux normes, domotique et bornes de recharge. La prise en main prend moins d'une journée — pas de formation requise."
        relatedTrades={[
          { label: "Plombier", href: "/artisans/plombier" },
          { label: "Maçon", href: "/artisans/macon" },
          { label: "Peintre", href: "/artisans/peintre" },
        ]}
      />
    </>
  );
}
