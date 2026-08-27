import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Modèle de devis bâtiment : créez vos modèles réutilisables — Cirrion",
  description:
    "Modèles de devis bâtiment : créez vos propres modèles réutilisables et générez des devis professionnels conformes en quelques clics, sur l'application Cirrion ERP ou depuis WhatsApp.",
  keywords: [
    "modèle devis bâtiment", "modèle devis artisan", "exemple devis travaux",
    "modèle devis", "logiciel devis en ligne", "créer devis en ligne artisan",
    "modèle devis gratuit bâtiment", "template devis BTP",
  ],
  openGraph: {
    title: "Modèle de devis bâtiment — Créez vos modèles réutilisables",
    description:
      "Créez des devis bâtiment professionnels en quelques clics avec vos modèles de devis enregistrés dans Cirrion, sur l'application ERP ou depuis WhatsApp.",
    url: "https://www.cirrion.eu/ressources/modele-devis-batiment",
  },
  alternates: { canonical: "https://www.cirrion.eu/ressources/modele-devis-batiment" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Modèle de devis bâtiment : créez vos modèles réutilisables",
  description: "Créez vos propres modèles de devis bâtiment réutilisables et générez des devis conformes en quelques clics.",
  author: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  publisher: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  datePublished: "2026-06-18",
  mainEntityOfPage: "https://www.cirrion.eu/ressources/modele-devis-batiment",
  keywords: "modèle devis bâtiment, modèle devis artisan, logiciel devis en ligne",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.cirrion.eu/ressources" },
    { "@type": "ListItem", position: 3, name: "Modèle de devis bâtiment", item: "https://www.cirrion.eu/ressources/modele-devis-batiment" },
  ],
};

export default function ModeleDevis() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BlogArticle
        badge="Devis & Modèles"
        title="Modèle de devis bâtiment : créez vos modèles une fois, réutilisez-les toujours"
        description="Repartir d'un modèle vierge à chaque chantier fait perdre un temps fou. Découvrez comment enregistrer vos propres modèles de devis et les réutiliser en quelques clics."
        date="18 juin 2026"
        readTime="5 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Un bon modèle de devis bâtiment, c'est la base d'une activité d'artisan bien gérée. Mais télécharger un modèle Word ou Excel gratuit puis tout ressaisir à la main pour chaque chantier reste long et source d'erreurs. La solution : enregistrer une fois vos propres modèles, avec vos prestations, vos unités et vos taux de TVA — puis les réutiliser à chaque chantier.",
          },
          {
            type: "h2",
            content: "Qu'est-ce qu'un modèle de devis réutilisable ?",
          },
          {
            type: "p",
            content:
              "C'est un modèle que vous construisez vous-même, une seule fois, pour un type de chantier récurrent : les prestations que vous facturez habituellement, leurs unités, vos prix issus de votre catalogue et le taux de TVA applicable à chaque ligne. Contrairement à un modèle statique (Word, Excel, PDF vierge) qu'il faut retaper, il vit dans l'application : vous le rappelez, vous ajustez les quantités, le devis est prêt.",
          },
          {
            type: "h2",
            content: "Modèle statique vs modèle IA : la différence",
          },
          {
            type: "ul",
            items: [
              "Modèle Word/Excel gratuit — vous repartez de zéro à chaque fois, vous ressaisissez les prestations, vous calculez la TVA à la main, vous risquez les erreurs et les oublis.",
              "Modèle de devis réutilisable (Cirrion) — vous créez vos propres modèles par type de chantier, avec vos lignes de prestations et votre catalogue de prix, et vous choisissez la TVA (5,5%, 10%, 20%) sur chaque ligne.",
              "Résultat : un devis professionnel conforme en quelques clics au lieu de 30 minutes de saisie.",
            ],
          },
          {
            type: "h2",
            content: "Deux façons d'utiliser vos modèles avec Cirrion",
          },
          {
            type: "p",
            content:
              "Avec Cirrion, vous créez vos devis là où c'est le plus pratique pour vous. Sur l'application Cirrion ERP (ordinateur ou tablette), vous rappelez l'un de vos modèles et vous le personnalisez à l'écran — idéal pour les chantiers complexes à plusieurs postes. Depuis WhatsApp, vous décrivez le chantier par message vocal ou écrit, et Cirrion construit le devis en 3 minutes — idéal sur le terrain.",
          },
          {
            type: "ul",
            items: [
              "Sur l'application web : sélection d'un de vos modèles, personnalisation des lignes, ajout de votre catalogue de prix, génération du PDF.",
              "Sur WhatsApp : description vocale ou écrite du chantier, et Cirrion génère le devis automatiquement.",
              "Vos modèles personnalisés sont enregistrés et réutilisables à l'infini.",
            ],
          },
          {
            type: "h2",
            content: "Ce qu'un bon modèle de devis bâtiment doit contenir",
          },
          {
            type: "ul",
            items: [
              "Vos coordonnées complètes et votre numéro SIRET",
              "Les coordonnées du client et l'adresse du chantier",
              "Le détail des prestations ligne par ligne avec quantités et prix unitaires",
              "Les taux de TVA corrects par type de travaux (5,5% rénovation énergétique, 10% rénovation, 20% neuf)",
              "Les conditions de paiement, acompte et délai de validité du devis",
              "La mention de signature et, idéalement, la signature électronique à valeur légale",
            ],
          },
          {
            type: "p",
            content:
              "Cirrion intègre automatiquement tous ces éléments dans chaque modèle. Vous ne risquez plus d'oublier une mention obligatoire, et chaque devis est conforme à la réglementation, y compris l'e-facturation 2026.",
          },
          {
            type: "h2",
            content: "Modèles de devis par métier",
          },
          {
            type: "ul",
            items: [
              "Modèle de devis électricien — tableau électrique, mise aux normes, points lumineux, prises.",
              "Modèle de devis plombier — salle de bain, chauffe-eau, réseau d'eau, sanitaires.",
              "Modèle de devis maçon — fondations, élévation, dalle, ravalement.",
              "Modèle de devis peintre — préparation des supports, peinture au m², revêtements.",
            ],
          },
          {
            type: "cta",
            content: "Créez votre premier modèle de devis en quelques minutes",
          },
        ]}
      />
    </>
  );
}
