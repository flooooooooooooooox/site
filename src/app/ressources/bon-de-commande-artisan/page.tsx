import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Bon de commande artisan : modèle, mentions obligatoires et utilité — Floxia",
  description:
    "Tout sur le bon de commande pour artisans : définition, différence avec le devis, mentions obligatoires, modèle gratuit. Créez vos bons de commande en 3 minutes avec Floxia.",
  keywords: [
    "bon de commande artisan",
    "bon de commande travaux",
    "bon de commande BTP",
    "modèle bon de commande artisan",
    "bon commande vs devis",
    "document commercial artisan",
    "bon de commande signé artisan",
  ],
  openGraph: {
    title: "Bon de commande artisan : modèle et mentions obligatoires — Floxia",
    description:
      "Bon de commande artisan : définition, différence avec le devis, mentions obligatoires et modèle prêt à l'emploi.",
    url: "https://floxia.fr/ressources/bon-de-commande-artisan",
  },
  alternates: { canonical: "https://floxia.fr/ressources/bon-de-commande-artisan" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Bon de commande artisan : modèle, mentions obligatoires et utilité",
  description:
    "Tout sur le bon de commande pour artisans : définition, différence avec le devis, mentions obligatoires.",
  author: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  publisher: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  datePublished: "2026-06-19",
  mainEntityOfPage: "https://floxia.fr/ressources/bon-de-commande-artisan",
  keywords: "bon de commande artisan, modèle bon de commande BTP, document commercial artisan",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://floxia.fr/ressources" },
    { "@type": "ListItem", position: 3, name: "Bon de commande artisan", item: "https://floxia.fr/ressources/bon-de-commande-artisan" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle est la différence entre un devis et un bon de commande ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le devis est une offre de prix émise par l'artisan avant acceptation. Le bon de commande est la confirmation de commande émise par le client (ou l'artisan) une fois le devis accepté. Dans la pratique, un devis signé vaut bon de commande.",
      },
    },
    {
      "@type": "Question",
      name: "Un bon de commande est-il obligatoire pour un artisan ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non, le bon de commande n'est pas obligatoire en soi. En revanche, tout travail supérieur à 150 € TTC réalisé chez un particulier nécessite un devis écrit accepté. Un devis signé joue le rôle de bon de commande.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les mentions obligatoires d'un bon de commande artisan ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les mentions obligatoires sont : coordonnées de l'artisan (SIRET, RCS ou RM), coordonnées du client, date, description des travaux ou fournitures, prix unitaires HT, TVA applicable, total TTC, conditions de paiement et délai de livraison ou d'exécution.",
      },
    },
  ],
};

export default function BonDeCommandeArtisan() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogArticle
        badge="Documents commerciaux"
        title="Bon de commande artisan : à quoi ça sert et comment le faire ?"
        description="Devis, bon de commande, facture — ces trois documents jalonnent chaque chantier. Voici tout ce qu'un artisan doit savoir sur le bon de commande : quand l'utiliser, quelles mentions y mettre, et pourquoi un devis signé suffit souvent."
        date="19 juin 2026"
        readTime="5 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "En tant qu'artisan, vous entendez parfois vos clients parler de « bon de commande ». Ce document commercial fait partie du cycle de vente classique — mais dans le monde de l'artisanat, il est souvent confondu avec le devis ou la facture. Clarifions les choses.",
          },
          {
            type: "h2",
            content: "Définition : qu'est-ce qu'un bon de commande ?",
          },
          {
            type: "p",
            content:
              "Un bon de commande est un document qui formalise l'accord du client sur une prestation ou une fourniture. Il peut être émis par le client (pour commander des travaux ou des matériaux à un artisan) ou par l'artisan lui-même (pour valider une intervention avec son client). Dans la pratique, pour les artisans du bâtiment et des services, le devis signé par le client remplit exactement cette fonction.",
          },
          {
            type: "h2",
            content: "Bon de commande vs devis : quelle différence ?",
          },
          {
            type: "ul",
            items: [
              "Le devis est une offre de prix émise par l'artisan avant le début des travaux. Il décrit les prestations et leur coût.",
              "Le bon de commande est la confirmation d'achat — il indique que le client accepte la prestation et s'engage à payer.",
              "En pratique : un devis signé « bon pour accord » par le client vaut bon de commande. Il n'est pas nécessaire d'établir les deux.",
              "Pour les marchés publics ou les grandes entreprises, un bon de commande formel peut être exigé séparément du devis.",
            ],
          },
          {
            type: "h2",
            content: "Quand utiliser un bon de commande séparé ?",
          },
          {
            type: "p",
            content:
              "Pour la plupart des artisans travaillant avec des particuliers, le devis signé suffit. Un bon de commande séparé est utile dans ces cas :",
          },
          {
            type: "ul",
            items: [
              "Vos clients professionnels (promoteurs, syndics, gestionnaires) ont un processus d'achat formalisé et envoient leurs propres bons de commande.",
              "Vous commandez des fournitures à vos fournisseurs et souhaitez un document de traçabilité.",
              "Le chantier est important et implique plusieurs phases ou lots séparés.",
            ],
          },
          {
            type: "h2",
            content: "Mentions obligatoires du bon de commande artisan",
          },
          {
            type: "ul",
            items: [
              "Coordonnées complètes de l'artisan : nom/raison sociale, adresse, SIRET, numéro RCS ou RM",
              "Coordonnées du client : nom, adresse",
              "Date du bon de commande et numéro de commande",
              "Description précise des travaux ou fournitures commandées",
              "Prix unitaires HT, quantités, montant HT total",
              "Taux et montant de TVA applicable",
              "Montant TTC",
              "Conditions et délai de paiement",
              "Délai d'exécution ou de livraison prévu",
              "Signatures des deux parties",
            ],
          },
          {
            type: "h2",
            content: "Un devis signé = un bon de commande valide",
          },
          {
            type: "p",
            content:
              "Pour les artisans travaillant avec des particuliers, le cadre légal est clair : dès que votre devis contient toutes les mentions obligatoires et qu'il est signé par votre client avec la mention « bon pour accord », il vaut contrat. Vous n'avez pas besoin d'un bon de commande supplémentaire. C'est pourquoi Floxia se concentre sur la création de devis complets et conformes, que vous pouvez faire signer électroniquement à valeur légale.",
          },
          {
            type: "h2",
            content: "Créer un bon de commande avec Floxia",
          },
          {
            type: "p",
            content:
              "Avec Floxia, votre devis inclut d'emblée toutes les mentions obligatoires. Votre client peut le signer électroniquement, ce qui transforme ce devis en engagement contractuel immédiat. Vous conservez la preuve de signature horodatée, opposable en cas de litige. Plus besoin de documents papier.",
          },
          {
            type: "cta",
            content: "Créer un devis qui vaut bon de commande en 3 minutes",
          },
        ]}
      />
    </>
  );
}
