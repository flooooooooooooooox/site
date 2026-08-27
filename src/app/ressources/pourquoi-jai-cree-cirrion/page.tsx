import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Pourquoi j'ai créé Cirrion — par Florian Gagnebien, fondateur",
  description:
    "De l'automatisation en ETI à l'ERP des artisans : Florian Gagnebien, fondateur de Cirrion, raconte pourquoi il a créé un logiciel de devis et facturation piloté par IA pour les artisans du bâtiment.",
  keywords: [
    "Florian Gagnebien", "fondateur Cirrion", "histoire Cirrion", "pourquoi Cirrion",
    "ingénieur automatisation", "ERP artisan français", "IA souveraine artisan",
    "logiciel artisan fondateur", "Cirrion avis",
  ],
  openGraph: {
    title: "Pourquoi j'ai créé Cirrion — par Florian Gagnebien",
    description:
      "De l'automatisation en ETI à l'ERP des artisans : l'histoire de Cirrion, racontée par son fondateur.",
    url: "https://www.cirrion.eu/ressources/pourquoi-jai-cree-cirrion",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pourquoi j'ai créé Cirrion — par Florian Gagnebien",
    description: "L'histoire de Cirrion, racontée par son fondateur.",
  },
  alternates: { canonical: "https://www.cirrion.eu/ressources/pourquoi-jai-cree-cirrion" },
};

const authorJsonLd = {
  "@type": "Person",
  name: "Florian Gagnebien",
  jobTitle: "Fondateur & CEO de Cirrion",
  url: "https://www.cirrion.eu/qui-sommes-nous",
  worksFor: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  knowsAbout: [
    "Automatisation des processus",
    "Intelligence artificielle appliquée",
    "ERP bâtiment",
    "Facturation électronique",
    "Gestion administrative des artisans",
  ],
  sameAs: ["https://www.linkedin.com/in/cirrion-pro-9360333aa"],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Pourquoi j'ai créé Cirrion",
  description:
    "De l'automatisation en ETI à l'ERP des artisans : l'histoire de Cirrion, racontée par son fondateur Florian Gagnebien.",
  author: authorJsonLd,
  publisher: {
    "@type": "Organization",
    name: "Cirrion",
    url: "https://www.cirrion.eu",
    logo: { "@type": "ImageObject", url: "https://www.cirrion.eu/icon.png", width: 256, height: 256 },
  },
  datePublished: "2026-07-26",
  dateModified: "2026-07-26",
  mainEntityOfPage: "https://www.cirrion.eu/ressources/pourquoi-jai-cree-cirrion",
  inLanguage: "fr-FR",
  keywords: "Florian Gagnebien, fondateur Cirrion, histoire Cirrion, ERP artisan, IA souveraine",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.cirrion.eu/ressources" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Pourquoi j'ai créé Cirrion",
      item: "https://www.cirrion.eu/ressources/pourquoi-jai-cree-cirrion",
    },
  ],
};

export default function PourquoiCirrion() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BlogArticle
        badge="Le mot du fondateur"
        title="Pourquoi j'ai créé Cirrion"
        description="Par Florian Gagnebien, fondateur & CEO. J'ai passé des mois à automatiser les processus d'une ETI. Puis j'ai regardé le quotidien administratif d'un artisan, et j'ai compris qu'il y avait un fossé à combler."
        date="26 juillet 2026"
        readTime="6 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Je m'appelle Florian Gagnebien, je suis ingénieur en automatisation et je suis le fondateur de Cirrion. On me demande souvent pourquoi j'ai choisi les artisans du bâtiment plutôt qu'un marché plus « tech ». La réponse tient en une observation que j'ai faite en passant d'un monde à l'autre en quelques semaines.",
          },
          {
            type: "h2",
            content: "Le déclic : l'automatisation vue de l'intérieur d'une ETI",
          },
          {
            type: "p",
            content:
              "Lors de mon expérience à la Fondation ANAIS, une ETI basée à Alençon, j'ai travaillé sur la conception et la mise en place d'automatisations de processus internes. Concrètement : identifier les tâches répétitives, les cartographier, puis les faire exécuter par des systèmes plutôt que par des humains. Saisies en double, transferts de données entre outils, relances manuelles, documents à générer à la chaîne.",
          },
          {
            type: "p",
            content:
              "Ce qui m'a marqué, ce n'est pas la technique — c'est l'ampleur de l'effet. Une automatisation bien placée ne fait pas gagner cinq minutes : elle supprime des centaines d'heures par an et, surtout, elle supprime la charge mentale associée. Les équipes ne se demandent plus « est-ce que j'ai bien pensé à relancer ce dossier ». Le système y pense.",
          },
          {
            type: "p",
            content:
              "Mais ces outils ont un point commun : ils sont réservés aux structures qui ont un service informatique, un budget projet et quelqu'un pour piloter le déploiement. Autrement dit, aux grandes entreprises.",
          },
          {
            type: "h2",
            content: "La conversation qui a tout changé",
          },
          {
            type: "p",
            content:
              "En parallèle, je discutais avec mon oncle, artisan. Un soir, il m'a décrit sa semaine : les journées sur chantier, puis les soirées et les week-ends passés sur les devis, les factures, les relances de clients qui ne paient pas, les tickets de caisse à ranger, la TVA à ne pas se tromper.",
          },
          {
            type: "p",
            content:
              "Et là, le fossé m'a sauté aux yeux. D'un côté, une ETI où j'automatisais des processus qui, franchement, étaient moins critiques que ça. De l'autre, un artisan qui perdait une dizaine d'heures par semaine sur exactement le genre de tâches que je venais d'automatiser — sans aucun outil pour l'aider.",
          },
          {
            type: "p",
            content:
              "Pas parce que la technologie n'existait pas. Parce que personne ne l'avait emballée pour lui. Les logiciels du bâtiment existants étaient soit des usines à gaz conçues pour des bureaux d'études, soit de simples éditeurs de devis qui ne faisaient que déplacer le travail de saisie de la feuille au clavier.",
          },
          {
            type: "h2",
            content: "Le pari de Cirrion : commencer par WhatsApp, pas par un logiciel",
          },
          {
            type: "p",
            content:
              "La contrainte de départ était simple : un artisan n'ouvre pas un ERP sur un chantier. Il a les mains sales, un téléphone dans la poche et trois minutes entre deux interventions. Toute solution qui exige de « se mettre devant l'ordinateur ce soir » a déjà perdu.",
          },
          {
            type: "p",
            content:
              "D'où le choix qui structure tout Cirrion : le point d'entrée, c'est WhatsApp. L'artisan envoie un message vocal — « devis pour Mme Durand, remplacement tableau électrique, 6 heures de main d'œuvre, matériel autour de 400 euros » — et l'IA produit le devis complet, avec le bon taux de TVA, prêt à être envoyé et signé. Environ trois minutes, sans quitter le chantier.",
          },
          {
            type: "p",
            content:
              "L'application ERP existe bien sûr, avec vos modèles de devis pour ceux qui préfèrent travailler au bureau. Mais elle n'est pas le prérequis. C'est un choix d'architecture, et c'est aussi un choix philosophique : l'outil doit s'adapter au métier, jamais l'inverse.",
          },
          {
            type: "h2",
            content: "Pourquoi je tiens à une IA européenne",
          },
          {
            type: "p",
            content:
              "Il y a un point sur lequel je n'ai pas voulu transiger : les données de facturation d'une entreprise, ce sont ses clients, ses prix, ses marges. C'est stratégique. Faire transiter tout ça par des serveurs hors de l'Union européenne pour économiser quelques centimes de coût d'inférence, je ne pouvais pas le justifier auprès d'un artisan qui me confie son activité.",
          },
          {
            type: "p",
            content:
              "Cirrion s'appuie donc sur Mistral AI pour l'intelligence, sur ElevenLabs pour le traitement de la voix, et l'hébergement est en France. Ce n'est pas un argument marketing pour cocher une case RGPD : c'est la condition pour qu'un artisan puisse dire oui sans se poser de question.",
          },
          {
            type: "h2",
            content: "Ce que Cirrion est devenu",
          },
          {
            type: "p",
            content:
              "Cirrion n'est pas un générateur de devis. C'est un ensemble de modules connectés qui couvrent la chaîne administrative complète d'une TPE du bâtiment :",
          },
          {
            type: "ul",
            items: [
              "Devis et factures — depuis WhatsApp par vocal, ou depuis l'application avec vos modèles de devis",
              "Signature électronique à valeur légale, pour ne plus courir après un devis signé",
              "Relances automatiques des devis sans réponse et des factures impayées",
              "Facturation électronique conforme 2026, via B2Brouter (plateforme de dématérialisation)",
              "Rapprochement bancaire automatique via Bridge (connexion sécurisée DSP2)",
              "Suivi de chantier, planning et heures des salariés",
              "Espace client, pour que le client suive son dossier sans appeler",
              "Suivi des dépenses et scan des tickets et factures fournisseurs",
            ],
          },
          {
            type: "p",
            content:
              "L'objectif n'a pas changé depuis la première ligne de code : que l'artisan retrouve ses soirées. Pas qu'il ait un logiciel de plus à apprendre.",
          },
          {
            type: "h2",
            content: "Ce qui vient ensuite",
          },
          {
            type: "p",
            content:
              "Cirrion est une jeune entreprise, et je l'assume : chaque retour d'artisan modifie encore la feuille de route. C'est d'ailleurs pour ça que je prends personnellement les démonstrations. Si vous êtes artisan et que vous reconnaissez la semaine de mon oncle dans la vôtre, la conversation la plus utile qu'on puisse avoir, c'est trente minutes ensemble.",
          },
          {
            type: "p",
            content:
              "Vous n'y verrez pas un argumentaire commercial : on regarde votre organisation actuelle, et on détermine honnêtement si l'automatisation vous fera gagner du temps ou non. Parfois la réponse est non, et je le dis.",
          },
          {
            type: "cta",
            content: "Échangeons 30 minutes sur votre organisation — avec moi, directement.",
          },
        ]}
      />
    </>
  );
}
