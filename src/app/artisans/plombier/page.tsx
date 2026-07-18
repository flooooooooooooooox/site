import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis plombier WhatsApp — Cirrion | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour plombiers et chauffagistes. Créez vos devis plomberie depuis WhatsApp en 3 min : salle de bain, chauffe-eau, chauffage, e-facturation 2026.",
  keywords: ["logiciel devis plombier", "devis plombier WhatsApp", "logiciel plombier chauffagiste", "ERP plombier", "gestion plombier bâtiment"],
  openGraph: {
    title: "Logiciel devis plombier — Cirrion",
    description: "Devis et factures pour plombiers depuis WhatsApp en 3 minutes. TVA 5,5/10/20% au choix, e-facturation 2026, relances.",
    url: "https://florianai.fr/artisans/plombier",
  },
  alternates: { canonical: "https://florianai.fr/artisans/plombier" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://florianai.fr" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://florianai.fr/artisans" },
    { "@type": "ListItem", position: 3, name: "Plombier", item: "https://florianai.fr/artisans/plombier" },
  ],
};

export default function Plombier() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <TradeLanding
        trade="plombier"
        badge="Plomberie & Chauffage"
        title="Logiciel de devis et facturation pour plombiers"
        subtitle="Devis plomberie depuis WhatsApp ou sur l'application Cirrion ERP."
        intro="Plombier, chauffagiste ou sanitaire : vos chantiers vont du dépannage d'urgence à la rénovation complète de salle de bain. Cirrion comprend le vocabulaire de la plomberie et génère vos devis PDF depuis votre téléphone, avec la TVA de votre choix sur chaque ligne, sans ressaisie manuelle."
        features={[
          { title: "Devis plomberie par vocal", desc: "Dictez vos prestations — remplacement chauffe-eau, rénovation salle de bain, pose radiateurs — et recevez le devis PDF en 3 min." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Cirrion ERP, l'IA propose des pré-modèles de devis plomberie prêts à personnaliser. Idéal au bureau pour les chantiers complexes." },
          { title: "TVA plomberie au choix", desc: "5,5% pour les travaux d'économie d'énergie (pompe à chaleur, chaudière à condensation), 10% pour rénovation, 20% pour le neuf. Vous choisissez le taux sur chaque ligne." },
          { title: "Gestion des acomptes", desc: "Facture d'acompte à la signature du devis, facture finale en fin de chantier — tout le cycle est géré automatiquement." },
          { title: "Relances clients automatiques", desc: "Devis non répondu à J+3, J+7, J+14. Plus besoin de relancer manuellement — Cirrion s'en charge." },
          { title: "Assistant vocal IA", desc: "Une question sur l'attestation TVA réduite, le RGE ou les normes ? L'assistant vocal IA de Cirrion vous répond à tout moment." },
          { title: "Suivi chantier en temps réel", desc: "Tableau de bord centralisé pour suivre l'avancement, les paiements et les relances de tous vos chantiers." },
        ]}
        useCases={[
          "Un plombier reçoit un appel pour remplacer un ballon d'eau chaude en urgence. Il dicte les prestations depuis le van, le devis est envoyé au client par WhatsApp avant même d'arriver sur le chantier.",
          "Rénovation complète de salle de bain : devis en plusieurs postes (démolition, plomberie, sanitaire), facture d'acompte puis facture finale, PV de réception — tout automatisé.",
          "Installateur de pompes à chaleur : devis TVA 5,5% généré par vocal, et l'assistant IA répond à vos questions sur le RGE et les CEE.",
          "PME de 8 plombiers : chaque technicien gère ses devis depuis le terrain. Le gérant voit en temps réel le CA du mois, les devis en attente et les factures impayées.",
        ]}
        closing="Que vous interveniez en dépannage d'urgence ou sur des rénovations longues durée, Cirrion s'adapte à votre rythme de travail. Aucune formation requise — si vous savez utiliser WhatsApp, vous savez utiliser Cirrion."
        relatedTrades={[
          { label: "Électricien", href: "/artisans/electricien" },
          { label: "Maçon", href: "/artisans/macon" },
          { label: "Peintre", href: "/artisans/peintre" },
        ]}
      />
    </>
  );
}
