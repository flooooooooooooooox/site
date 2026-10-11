import AnswerSection from "@/components/seo/AnswerSection";

const answers = [
  {
    question: "Cirrion est-il seulement un logiciel de devis WhatsApp ?",
    answer: "Non. Cirrion réunit la gestion et la comptabilité de votre entreprise : devis, factures, paiements, relances et dépenses. WhatsApp est un moyen d’utiliser Cirrion depuis le terrain ; vous pouvez aussi travailler dans l’application web.",
  },
  {
    question: "Cirrion vise-t-il à remplacer ma comptable ?",
    answer: "Oui, c’est l’objectif : remplacer votre gestion comptable actuelle par une offre qui réunit automatisation et accompagnement comptable. Cirrion centralise vos factures, dépenses et paiements. Les déclarations, le bilan et les validations comptables pris en charge sont précisés dans votre offre.",
  },
  {
    question: "Comment commencer avec Cirrion ?",
    answer: "Échangez avec l’équipe pour définir ce que Cirrion prend en charge pour votre entreprise, les outils à connecter et l’accompagnement comptable inclus dans votre offre.",
  },
  {
    question: "À quelles entreprises s’adresse Cirrion ?",
    answer: "Cirrion s’adresse aux artisans, aux indépendants et aux petites entreprises qui veulent déléguer leur administratif et leur gestion comptable. L’accompagnement est défini selon votre activité et vos besoins.",
  },
];

export default function ManagementFaq({ showMore = false }: { showMore?: boolean }) {
  return <AnswerSection title="Vos questions sur Cirrion" answers={answers}
    links={showMore ? [
      { href: "/gestion-comptabilite", label: "Gestion et comptabilité" },
      { href: "/application", label: "L’application Cirrion" },
      { href: "/entreprise-nettoyage", label: "Entreprises de services" },
      { href: "/logiciel-devis", label: "Les usages par métier" },
    ] : []} />;
}
