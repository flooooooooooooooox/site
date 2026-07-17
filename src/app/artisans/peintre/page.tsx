import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis peintre WhatsApp — Cirrion | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour peintres en bâtiment. Créez vos devis peinture depuis WhatsApp en 3 min : ravalement façade, décoration intérieure, e-facturation 2026.",
  keywords: ["logiciel devis peintre", "devis peintre WhatsApp", "logiciel peintre bâtiment", "ERP peintre", "devis peinture bâtiment"],
  openGraph: {
    title: "Logiciel devis peintre — Cirrion",
    description: "Devis et factures pour peintres depuis WhatsApp en 3 minutes. Ravalement, intérieur — TVA 5,5/10/20% au choix, e-facturation 2026.",
    url: "https://floxia.fr/artisans/peintre",
  },
  alternates: { canonical: "https://floxia.fr/artisans/peintre" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://floxia.fr/artisans" },
    { "@type": "ListItem", position: 3, name: "Peintre", item: "https://floxia.fr/artisans/peintre" },
  ],
};

export default function Peintre() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <TradeLanding
        trade="peintre"
        badge="Peinture & Décoration"
        title="Logiciel de devis et facturation pour peintres en bâtiment"
        subtitle="Devis peinture depuis WhatsApp ou sur l'application Cirrion ERP."
        intro="Peintre en bâtiment, spécialiste du ravalement ou décorateur d'intérieur : vous jonglez entre les visites de chantier et la rédaction des devis. Vous dictez la prestation par vocal, Cirrion génère un devis PDF professionnel avec vos prix du catalogue, depuis votre téléphone, en sortie de visite."
        features={[
          { title: "Devis peinture par vocal en 3 min", desc: "Dictez la prestation par vocal — ravalement, rénovation intérieure, décoration — Cirrion génère le devis PDF avec vos prix du catalogue." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Cirrion ERP, l'IA propose des pré-modèles de devis peinture prêts à personnaliser avec vos prestations types." },
          { title: "TVA peinture au choix", desc: "10% pour la rénovation intérieure et ravalement de résidence principale, 20% pour le neuf. Vous choisissez le taux sur chaque ligne, Cirrion l'applique sur le devis." },
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
      />
    </>
  );
}
