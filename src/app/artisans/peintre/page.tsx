import { pageMetadata, serializeJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";
import AnswerSection from "@/components/seo/AnswerSection";

export const metadata: Metadata = pageMetadata({
  title: "Logiciel devis peintre et factures peinture | Cirrion",
  description:
    "Créez vos devis peinture et factures avec Cirrion. Catalogue de prestations, modèles réutilisables et suivi des chantiers depuis WhatsApp ou l’application.",
  keywords: ["logiciel devis peintre", "devis peintre WhatsApp", "logiciel peintre bâtiment", "ERP peintre", "devis peinture bâtiment"],
  openGraph: {
    title: "Logiciel devis peintre — Cirrion",
    description: "Préparez vos devis peinture, réutilisez vos modèles et suivez les factures et chantiers avec Cirrion, depuis WhatsApp ou l’application web.",
    url: "https://www.cirrion.eu/artisans/peintre",
  },
  alternates: { canonical: "https://www.cirrion.eu/artisans/peintre" },
});

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://www.cirrion.eu/artisans" },
    { "@type": "ListItem", position: 3, name: "Peintre", item: "https://www.cirrion.eu/artisans/peintre" },
  ],
};

export default function Peintre() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumb) }} />
      <TradeLanding
        trade="peintre"
        badge="Peinture & Décoration"
        title="Logiciel de devis et facturation pour peintres en bâtiment"
        subtitle="Devis peinture depuis WhatsApp ou sur l'application Cirrion ERP."
        intro="Cirrion est un logiciel de devis et facturation pour peintres en bâtiment. Vous préparez vos prestations de peinture intérieure, ravalement et préparation des supports avec votre catalogue de prix et vos modèles. Depuis WhatsApp sur le chantier ou l’application web au bureau, retrouvez vos devis, factures et dossiers clients au même endroit."
        features={[
          { title: "Devis peinture par vocal en 3 min", desc: "Dictez la prestation par vocal — ravalement, rénovation intérieure, décoration — Cirrion génère le devis PDF avec vos prix du catalogue." },
          { title: "Vos modèles de devis sur l'app", desc: "Sur l'application Cirrion ERP, vous réutilisez vos modèles de devis peinture, créés avec vos prestations types." },
          { title: "TVA sur chaque prestation", desc: "Vous choisissez le taux sur chaque ligne selon la nature des travaux et les conditions applicables. Cirrion applique le taux sélectionné sur le devis." },
          { title: "Catalogue de prestations", desc: "Enregistrez vos prix par type de prestation : préparation des supports, lessivage, enduit, peinture, papier peint, revêtement de sol." },
          { title: "Envoi et signature électronique", desc: "Le client reçoit le devis par WhatsApp ou email et peut signer depuis son téléphone en un clic, avec valeur légale." },
          { title: "Relances devis automatiques", desc: "J+3, J+7, J+14 : Cirrion relance automatiquement les prospects qui n'ont pas encore répondu à votre devis." },
          { title: "Facture et PV de réception", desc: "Facture générée à la signature, acompte automatique, solde à la fin du chantier avec PV de réception signé." },
        ]}
        useCases={[
          "Un peintre sort d'une visite de chantier — appartement 80m², 4 pièces à peindre, préparation des murs. Il dicte les prestations par vocal. Le devis est dans la boîte mail du client 3 minutes après la visite.",
          "Ravalement de façade 250m² : devis avec descriptif technique (nettoyage haute pression, rebouchage fissures, 2 couches de peinture façade), TVA 10%, acompte 30% à la signature.",
          "Peintre avec 3 compagnons : chaque compagnon peut créer des devis depuis le terrain. Le gérant valide et suit tous les chantiers depuis le tableau de bord.",
          "Fin de chantier décoration : le PV de réception est envoyé par WhatsApp, le client signe depuis son téléphone, la facture finale part automatiquement.",
        ]}
        closing="Que vous fassiez 5 devis par semaine ou 20, Cirrion adapte votre charge administrative à votre volume d'activité. Plus vous grandissez, plus le gain de temps est important."
        relatedTrades={[
          { label: "Électricien", href: "/artisans/electricien" },
          { label: "Plombier", href: "/artisans/plombier" },
          { label: "Maçon", href: "/artisans/macon" },
        ]}
      >
        <AnswerSection title="Choisir un logiciel de devis peinture" answers={[
          { question: "Que prévoir dans un devis de peinture ?", answer: "Décrivez la préparation des supports, les surfaces, les fournitures et les finitions. Séparez les prestations et les quantités pour expliquer votre prix au client. Cirrion permet d’enregistrer ces lignes dans un catalogue puis de les réutiliser dans vos modèles de devis." },
          { question: "Peut-on créer un devis peinture depuis WhatsApp ?", answer: "Oui. Dans Cirrion, vous décrivez les travaux par message vocal ou écrit depuis WhatsApp. Vous pouvez aussi préparer le devis dans l’application web avec vos modèles et votre catalogue. Vérifiez les quantités, les prix et le taux de TVA avant l’envoi au client." },
          { question: "Quel est le prix de Cirrion pour un peintre ?", answer: "Le tarif est établi sur devis après une démonstration. Présentez votre organisation, vos besoins et votre volume de documents pour obtenir une proposition adaptée. Aucun prix d’abonnement fixe n’est affiché sur le site." },
        ]} links={[
          { href: "/ressources/modele-devis-batiment", label: "Préparer un modèle de devis" },
          { href: "/ressources/devis-depuis-whatsapp", label: "Créer un devis depuis WhatsApp" },
          { href: "/logiciel-gestion-entreprise-batiment", label: "Gérer une entreprise du bâtiment" },
        ]} />
      </TradeLanding>
    </>
  );
}
