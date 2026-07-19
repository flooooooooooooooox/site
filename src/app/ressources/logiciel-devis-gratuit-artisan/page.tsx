import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Logiciel de devis gratuit artisan : ce qu'il faut vraiment savoir — Cirrion",
  description:
    "Logiciel de devis gratuit pour artisan : avantages, limites et alternatives payantes. Découvrez pourquoi un logiciel de devis IA comme Cirrion vous fait gagner plus qu'un outil gratuit.",
  keywords: [
    "logiciel devis gratuit artisan",
    "logiciel devis artisan gratuit",
    "application devis gratuite artisan",
    "logiciel devis en ligne gratuit",
    "meilleur logiciel devis artisan",
    "logiciel facturation gratuit artisan",
    "outil devis artisan",
  ],
  openGraph: {
    title: "Logiciel de devis gratuit artisan : avantages et limites — Cirrion",
    description:
      "Logiciel de devis gratuit ou payant pour artisan ? On compare les options et on vous dit ce qui vaut vraiment le coup.",
    url: "https://www.cirrion.eu/ressources/logiciel-devis-gratuit-artisan",
  },
  alternates: { canonical: "https://www.cirrion.eu/ressources/logiciel-devis-gratuit-artisan" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Logiciel de devis gratuit artisan : ce qu'il faut vraiment savoir",
  description:
    "Logiciel de devis gratuit pour artisan : avantages, limites et alternatives. Comparatif pour choisir le bon outil.",
  author: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  publisher: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  datePublished: "2026-06-19",
  mainEntityOfPage: "https://www.cirrion.eu/ressources/logiciel-devis-gratuit-artisan",
  keywords: "logiciel devis gratuit artisan, application devis artisan, meilleur logiciel devis artisan",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.cirrion.eu/ressources" },
    { "@type": "ListItem", position: 3, name: "Logiciel devis gratuit artisan", item: "https://www.cirrion.eu/ressources/logiciel-devis-gratuit-artisan" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Existe-t-il un logiciel de devis vraiment gratuit pour artisan ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, des outils gratuits existent (modèles Word/Excel, certaines versions freemium). Mais ils imposent souvent des limites : nombre de devis restreint, pas de pré-modèles IA, pas de signature électronique, pas d'envoi direct au client.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le meilleur logiciel de devis pour artisan ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le meilleur logiciel de devis artisan est celui qui fait gagner du temps réellement. Cirrion se distingue par ses pré-modèles IA adaptés à chaque métier et la création de devis depuis WhatsApp par vocal en 3 minutes, sans ordinateur.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on créer un devis depuis son téléphone ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, avec Cirrion vous créez un devis depuis WhatsApp en décrivant le chantier par message vocal ou écrit. L'IA génère le devis PDF et l'envoie au client — depuis votre téléphone, sur le terrain.",
      },
    },
  ],
};

export default function LogicielDevisGratuitArtisan() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogArticle
        badge="Logiciels & Outils"
        title="Logiciel de devis gratuit artisan : avantages, limites et ce qui vaut vraiment le coup"
        description="Chercher un logiciel de devis gratuit est un réflexe courant chez les artisans. Mais gratuit veut-il dire efficace ? On fait le point sur ce que proposent les outils gratuits, leurs limites, et pourquoi de nombreux artisans passent finalement à un logiciel IA."
        date="19 juin 2026"
        readTime="5 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Quand on lance son activité d'artisan ou d'indépendant, réduire les coûts est une priorité. Chercher un « logiciel de devis gratuit artisan » est donc naturel. Mais après quelques mois d'utilisation, beaucoup d'artisans réalisent que le gratuit coûte cher en temps — et que le temps, c'est de l'argent.",
          },
          {
            type: "h2",
            content: "Ce que proposent les outils gratuits",
          },
          {
            type: "ul",
            items: [
              "Modèles Word ou Excel à télécharger : rapides à trouver, mais tout est à remplir manuellement à chaque nouveau devis.",
              "Versions freemium de logiciels (Devis Facile, Henrri, etc.) : limitées en nombre de devis, sans pré-modèles IA, sans signature électronique.",
              "PDF éditables : pratiques pour commencer, mais sans numérotation automatique, sans calcul de TVA, sans envoi direct.",
            ],
          },
          {
            type: "h2",
            content: "Les limites du gratuit que les artisans rencontrent vite",
          },
          {
            type: "ul",
            items: [
              "Tout doit être saisi manuellement à chaque devis : nom du client, adresse du chantier, liste des prestations, TVA.",
              "Pas de pré-modèles adaptés à votre métier — vous repartez d'une feuille blanche à chaque fois.",
              "Pas de signature électronique : le client doit imprimer, signer, scanner et renvoyer.",
              "Pas d'envoi direct depuis le logiciel : vous devez télécharger le PDF puis l'envoyer par email.",
              "Pas d'accès depuis le téléphone sur chantier : il faut rentrer au bureau ou être sur ordinateur.",
              "Pas de conformité e-facturation 2026 : vous devrez changer d'outil de toute façon.",
            ],
          },
          {
            type: "h2",
            content: "Combien de temps perd-on vraiment avec un outil gratuit ?",
          },
          {
            type: "p",
            content:
              "Un devis créé manuellement depuis un modèle Word prend en moyenne 25 à 45 minutes : saisie des informations client, liste des prestations, calcul des quantités et prix, TVA, mise en forme, enregistrement en PDF, envoi par email. Avec un logiciel de devis IA comme Cirrion, ce même devis prend 3 minutes — en décrivant le chantier par vocal sur WhatsApp depuis le terrain.",
          },
          {
            type: "ul",
            items: [
              "Si vous faites 3 devis par semaine : 3 × 40 min = 2h perdues/semaine avec un outil gratuit.",
              "Sur un an : environ 100h de saisie administrative qui auraient pu être du temps facturable.",
              "À 50 €/h de taux horaire : 5 000 € de manque à gagner annuel.",
            ],
          },
          {
            type: "h2",
            content: "Ce que Cirrion apporte en plus",
          },
          {
            type: "ul",
            items: [
              "Pré-modèles de devis IA adaptés à votre métier (électricien, plombier, peintre, maçon, etc.).",
              "Création de devis depuis WhatsApp par message vocal en 3 minutes, même sur chantier.",
              "Signature électronique à valeur légale intégrée — votre client signe depuis son téléphone.",
              "Envoi automatique du devis au client par email ou WhatsApp.",
              "Conformité e-facturation 2026 native — aucun module à ajouter.",
              "Catalogue de prix personnalisé réutilisable sur tous vos devis.",
            ],
          },
          {
            type: "h2",
            content: "Gratuit ou payant : comment choisir ?",
          },
          {
            type: "p",
            content:
              "Si vous faites moins de 2 devis par mois et que votre activité est très occasionnelle, un modèle gratuit peut suffire pour commencer. En revanche, dès que votre activité se développe, le temps perdu sur l'administratif devient votre premier frein à la croissance. Un logiciel de devis artisan comme Cirrion s'autofinance dès les premières heures gagnées.",
          },
          {
            type: "cta",
            content: "Essayer Cirrion — Devis artisan en 3 min depuis WhatsApp",
          },
        ]}
      />
    </>
  );
}
