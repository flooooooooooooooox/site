import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Acompte sur devis artisan : montant, mentions légales et bonnes pratiques — Cirrion",
  description:
    "Combien demander comme acompte sur un devis artisan ? Quelles mentions obligatoires ? Comment le facturer ? Tout ce qu'il faut savoir sur l'acompte pour artisans et indépendants.",
  keywords: [
    "acompte devis artisan",
    "acompte travaux artisan",
    "acompte sur devis",
    "acompte chantier artisan",
    "demander acompte artisan",
    "mention acompte devis",
    "facturer acompte artisan",
  ],
  openGraph: {
    title: "Acompte sur devis artisan : montant et mentions légales — Cirrion",
    description:
      "Combien demander comme acompte ? Quelles mentions légales ? Comment facturer l'acompte ? Guide complet pour artisans.",
    url: "https://www.florianai.fr/ressources/acompte-devis-artisan",
  },
  alternates: { canonical: "https://www.florianai.fr/ressources/acompte-devis-artisan" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Acompte sur devis artisan : montant, mentions légales et bonnes pratiques",
  description: "Combien demander comme acompte sur un devis ? Mentions légales et bonnes pratiques pour artisans.",
  author: { "@type": "Organization", name: "Cirrion", url: "https://www.florianai.fr" },
  publisher: { "@type": "Organization", name: "Cirrion", url: "https://www.florianai.fr" },
  datePublished: "2026-06-19",
  mainEntityOfPage: "https://www.florianai.fr/ressources/acompte-devis-artisan",
  keywords: "acompte devis artisan, acompte travaux, facturer acompte artisan",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.florianai.fr" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.florianai.fr/ressources" },
    { "@type": "ListItem", position: 3, name: "Acompte devis artisan", item: "https://www.florianai.fr/ressources/acompte-devis-artisan" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel pourcentage demander comme acompte sur un devis artisan ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En général, les artisans demandent entre 20% et 50% du montant TTC à la signature du devis. Pour les petits chantiers, 30% est courant. Pour les chantiers importants nécessitant l'achat de matériaux, 40% à 50% est justifié.",
      },
    },
    {
      "@type": "Question",
      name: "L'acompte est-il obligatoire pour un artisan ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non, l'acompte n'est pas obligatoire légalement. Mais il est fortement recommandé pour couvrir les achats de matériaux et sécuriser l'engagement du client avant le début des travaux.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il émettre une facture pour un acompte ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Dès réception du paiement de l'acompte, vous devez émettre une facture d'acompte mentionnant le montant HT, la TVA et le montant TTC. Cette facture est déduite de la facture finale.",
      },
    },
  ],
};

export default function AcompteDevisArtisan() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogArticle
        badge="Devis & Facturation"
        title="Acompte sur devis artisan : combien demander et comment le facturer ?"
        description="Demander un acompte avant de démarrer un chantier est une bonne pratique qui protège l'artisan. Voici comment fixer le bon montant, quelles mentions mettre sur le devis et comment émettre la facture d'acompte."
        date="19 juin 2026"
        readTime="5 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Démarrer un chantier sans acompte, c'est prendre un risque financier inutile. L'acompte permet de couvrir les achats de matériaux, de s'assurer de la sérieux du client et de stabiliser votre trésorerie. Voici tout ce qu'un artisan doit savoir.",
          },
          {
            type: "h2",
            content: "Pourquoi demander un acompte avant les travaux ?",
          },
          {
            type: "ul",
            items: [
              "Financer les achats de matériaux sans avancer de trésorerie.",
              "Confirmer l'engagement sérieux du client — un client qui ne veut pas payer d'acompte est souvent un mauvais signal.",
              "Réduire le risque d'annulation de chantier de dernière minute.",
              "Améliorer votre trésorerie en échelonnant les paiements sur la durée du chantier.",
            ],
          },
          {
            type: "h2",
            content: "Quel montant demander comme acompte ?",
          },
          {
            type: "p",
            content:
              "Il n'existe pas de règle légale fixant le montant de l'acompte. Les pratiques varient selon les métiers et la taille du chantier :",
          },
          {
            type: "ul",
            items: [
              "Petits travaux (< 2 000 € TTC) : 30% à la signature du devis.",
              "Chantiers moyens (2 000 € – 10 000 € TTC) : 30% à la signature, 30% en cours de chantier, solde à la réception.",
              "Grands chantiers (> 10 000 € TTC) : 40% à la signature, paiements intermédiaires selon avancement.",
              "Chantiers avec forte fourniture de matériaux : jusqu'à 50% pour couvrir les achats.",
            ],
          },
          {
            type: "h2",
            content: "Comment mentionner l'acompte sur le devis ?",
          },
          {
            type: "p",
            content:
              "L'acompte doit être clairement mentionné dans le devis pour être opposable. Indiquez :",
          },
          {
            type: "ul",
            items: [
              "Le montant de l'acompte en euros TTC (ex. : « Acompte à la signature : 600 € TTC »).",
              "Le pourcentage correspondant (ex. : « soit 30% du montant total »).",
              "Les conditions de paiement du solde (à la réception, selon avancement, etc.).",
              "Le mode de paiement accepté (virement, chèque, etc.).",
            ],
          },
          {
            type: "h2",
            content: "La facture d'acompte : obligatoire dès réception du paiement",
          },
          {
            type: "p",
            content:
              "Dès que votre client vous verse l'acompte, vous devez émettre une facture d'acompte. Ce document doit mentionner :",
          },
          {
            type: "ul",
            items: [
              "La mention « Facture d'acompte » clairement visible.",
              "Le numéro de facture (dans votre numérotation habituelle).",
              "La référence au devis signé correspondant.",
              "Le montant HT de l'acompte, la TVA applicable et le montant TTC.",
              "La date de réception du paiement.",
            ],
          },
          {
            type: "p",
            content:
              "La facture finale déduit ensuite le ou les acomptes versés pour afficher uniquement le solde restant à payer. Cirrion gère automatiquement ce calcul — il vous suffit d'indiquer les acomptes reçus et la facture finale est générée avec le solde correct.",
          },
          {
            type: "h2",
            content: "Acompte et TVA : attention aux règles",
          },
          {
            type: "p",
            content:
              "La TVA est exigible dès l'encaissement de l'acompte (et non à la facturation finale). Vous devez donc la déclarer sur la période où vous avez reçu le paiement. La TVA applicable sur l'acompte est la même que celle qui s'appliquera à l'ensemble des travaux.",
          },
          {
            type: "h2",
            content: "Gérer acomptes et factures avec Cirrion",
          },
          {
            type: "p",
            content:
              "Avec Cirrion, vous incluez le montant de l'acompte directement dans votre devis. Une fois le devis signé et l'acompte reçu, Cirrion génère automatiquement la facture d'acompte. La facture de solde finale déduira automatiquement les acomptes versés. Tout est traçable depuis le tableau de bord.",
          },
          {
            type: "cta",
            content: "Créer un devis avec acompte en 3 minutes sur Cirrion",
          },
        ]}
      />
    </>
  );
}
