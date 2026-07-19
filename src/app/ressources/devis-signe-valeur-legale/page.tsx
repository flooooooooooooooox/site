import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Devis signé : valeur légale, engagement et signature électronique artisan — Cirrion",
  description:
    "Un devis signé a-t-il une valeur légale pour un artisan ? Quand le client est-il engagé ? Tout sur la signature de devis artisan, la signature électronique et les recours en cas de litige.",
  keywords: [
    "devis signé valeur légale",
    "devis signé artisan",
    "valeur légale devis travaux",
    "devis accepté engagement client",
    "signature électronique devis artisan",
    "devis signé bon pour accord",
    "recours artisan devis non honoré",
  ],
  openGraph: {
    title: "Devis signé : valeur légale et engagement du client — Cirrion",
    description:
      "Un devis signé engage-t-il le client ? Valeur légale, signature électronique et recours en cas de litige pour artisans.",
    url: "https://www.cirrion.eu/ressources/devis-signe-valeur-legale",
  },
  alternates: { canonical: "https://www.cirrion.eu/ressources/devis-signe-valeur-legale" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Devis signé : valeur légale, engagement et signature électronique artisan",
  description:
    "Un devis signé a-t-il une valeur légale pour un artisan ? Quand le client est-il engagé ?",
  author: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  publisher: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  datePublished: "2026-06-19",
  mainEntityOfPage: "https://www.cirrion.eu/ressources/devis-signe-valeur-legale",
  keywords: "devis signé valeur légale, signature électronique devis artisan, engagement client devis",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.cirrion.eu/ressources" },
    { "@type": "ListItem", position: 3, name: "Devis signé valeur légale", item: "https://www.cirrion.eu/ressources/devis-signe-valeur-legale" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Un devis signé est-il un contrat ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Un devis signé par le client avec la mention « bon pour accord » constitue un contrat entre l'artisan et son client. Il engage les deux parties : l'artisan à réaliser les travaux au prix convenu, le client à les payer.",
      },
    },
    {
      "@type": "Question",
      name: "La signature électronique d'un devis a-t-elle une valeur légale ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. La signature électronique simple est reconnue par le droit français (loi du 13 mars 2000, article 1366 du Code civil). Une signature électronique qualifiée (eIDAS) a la même valeur qu'une signature manuscrite.",
      },
    },
    {
      "@type": "Question",
      name: "Que faire si un client refuse de payer après avoir signé un devis ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Envoyez d'abord une lettre de mise en demeure. Si le client ne règle pas, vous pouvez saisir le tribunal de commerce (pour un client professionnel) ou le tribunal judiciaire (pour un particulier). Le devis signé est votre preuve contractuelle.",
      },
    },
  ],
};

export default function DevisSigneValeurLegale() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogArticle
        badge="Juridique & Devis"
        title="Devis signé : valeur légale, engagement du client et signature électronique"
        description="Votre client a signé votre devis — est-il vraiment engagé ? Peut-il se rétracter ? La signature électronique a-t-elle la même valeur qu'une signature papier ? Toutes les réponses pour les artisans."
        date="19 juin 2026"
        readTime="6 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "La question revient souvent : mon client a signé le devis, mais il veut maintenant annuler — que puis-je faire ? Ou à l'inverse : mon client a signé par email, est-ce que ça compte vraiment ? Voici un tour d'horizon clair sur la valeur légale du devis signé pour les artisans.",
          },
          {
            type: "h2",
            content: "Un devis signé est un contrat",
          },
          {
            type: "p",
            content:
              "Dès lors qu'un devis est signé par les deux parties — l'artisan et le client — avec la mention « bon pour accord » (ou équivalent), il constitue un contrat synallagmatique au sens de l'article 1101 du Code civil. Cela signifie :",
          },
          {
            type: "ul",
            items: [
              "L'artisan s'engage à réaliser les travaux décrits, dans les délais et au prix mentionnés.",
              "Le client s'engage à payer le montant TTC indiqué aux conditions convenues.",
              "Toute modification ultérieure (prix, prestations, délais) doit faire l'objet d'un avenant signé.",
            ],
          },
          {
            type: "h2",
            content: "Droit de rétractation : quand s'applique-t-il ?",
          },
          {
            type: "p",
            content:
              "Le droit de rétractation de 14 jours (loi Hamon) s'applique uniquement pour les contrats conclus hors établissement — c'est-à-dire quand vous signez chez le client (à son domicile ou sur son lieu de travail). Dans ce cas, votre devis doit mentionner ce droit de rétractation. Si ce délai est respecté et que le client se rétracte dans les 14 jours, vous ne pouvez pas lui réclamer de paiement (sauf si des travaux urgents ont été expressément demandés). Passé ce délai, ou pour les devis signés en dehors de ce cadre (en agence, en ligne, etc.), le client est pleinement engagé.",
          },
          {
            type: "h2",
            content: "Signature électronique : même valeur que la signature papier ?",
          },
          {
            type: "p",
            content:
              "Oui, depuis la loi du 13 mars 2000 et le règlement européen eIDAS de 2016, la signature électronique est reconnue en droit français (article 1366 du Code civil). Elle est valable dès lors qu'elle permet d'identifier son auteur et que son intégrité est garantie.",
          },
          {
            type: "ul",
            items: [
              "Signature électronique simple (clic « j'accepte » + email de confirmation) : valable pour la plupart des devis artisan.",
              "Signature électronique avancée (avec vérification d'identité) : niveau recommandé pour les chantiers importants.",
              "Signature électronique qualifiée (équivalent eIDAS de la signature manuscrite) : même valeur légale que le papier.",
              "Cirrion intègre une signature électronique à valeur légale, avec horodatage et piste d'audit conservée.",
            ],
          },
          {
            type: "h2",
            content: "Client qui refuse de payer après avoir signé : quels recours ?",
          },
          {
            type: "p",
            content:
              "Si votre client accepte vos travaux mais refuse de payer malgré plusieurs relances, vous disposez de plusieurs recours :",
          },
          {
            type: "ul",
            items: [
              "Lettre de mise en demeure (LRAR) : première étape obligatoire, fixe un délai de paiement formel.",
              "Injonction de payer : procédure rapide et peu coûteuse devant le tribunal (traitement en ligne possible).",
              "Référé-provision : pour obtenir une condamnation rapide si la créance n'est pas sérieusement contestable.",
              "Tribunal judiciaire (particuliers) ou tribunal de commerce (professionnels) pour les litiges plus complexes.",
            ],
          },
          {
            type: "p",
            content:
              "Dans tous les cas, le devis signé (avec la preuve de signature conservée) est votre principale pièce de dossier. C'est pourquoi Cirrion conserve automatiquement la piste d'audit de chaque signature électronique — date, heure, adresse IP, email du signataire.",
          },
          {
            type: "h2",
            content: "Bonnes pratiques pour sécuriser vos devis",
          },
          {
            type: "ul",
            items: [
              "Toujours demander une signature (papier ou électronique) avant de commencer les travaux.",
              "Conserver une copie du devis signé accessible facilement — idéalement dans un logiciel de gestion.",
              "Mentionner les conditions de paiement et d'acompte dès le devis.",
              "En cas de travaux chez un particulier hors établissement, mentionner le droit de rétractation de 14 jours.",
              "Pour les chantiers importants, demander un acompte à la signature pour sécuriser votre engagement.",
            ],
          },
          {
            type: "cta",
            content: "Créer et faire signer vos devis électroniquement avec Cirrion",
          },
        ]}
      />
    </>
  );
}
