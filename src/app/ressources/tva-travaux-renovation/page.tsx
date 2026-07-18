import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "TVA travaux de rénovation 2026 : 5,5%, 10% ou 20% ? Le guide",
  description:
    "Quel taux de TVA appliquer sur vos travaux de rénovation en 2026 ? 5,5%, 10% ou 20% : règles, conditions, attestation et exemples par type de travaux pour les artisans du bâtiment.",
  keywords: [
    "TVA travaux rénovation", "TVA 5.5 travaux", "TVA 10 rénovation", "taux TVA bâtiment",
    "attestation TVA réduite", "TVA travaux 2026", "quel taux TVA travaux",
  ],
  openGraph: {
    title: "TVA travaux de rénovation 2026 — 5,5%, 10% ou 20% ?",
    description: "Quel taux de TVA appliquer sur vos travaux ? Règles, conditions et exemples par type de travaux.",
    url: "https://www.florianai.fr/ressources/tva-travaux-renovation",
  },
  alternates: { canonical: "https://www.florianai.fr/ressources/tva-travaux-renovation" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "TVA travaux de rénovation 2026 : 5,5%, 10% ou 20% ?",
  description: "Quel taux de TVA appliquer sur vos travaux de rénovation : règles, conditions, attestation et exemples.",
  author: { "@type": "Organization", name: "Cirrion", url: "https://www.florianai.fr" },
  publisher: { "@type": "Organization", name: "Cirrion", url: "https://www.florianai.fr" },
  datePublished: "2026-06-18",
  mainEntityOfPage: "https://www.florianai.fr/ressources/tva-travaux-renovation",
  keywords: "TVA travaux rénovation, TVA 5.5, TVA 10, attestation TVA réduite",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.florianai.fr" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.florianai.fr/ressources" },
    { "@type": "ListItem", position: 3, name: "TVA travaux de rénovation", item: "https://www.florianai.fr/ressources/tva-travaux-renovation" },
  ],
};

export default function TvaTravaux() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BlogArticle
        badge="Conformité & TVA"
        title="TVA travaux de rénovation : 5,5%, 10% ou 20% ? Le guide 2026"
        description="Appliquer le mauvais taux de TVA sur un devis peut coûter cher à un artisan. Voici comment savoir, à coup sûr, quel taux appliquer selon le type de travaux en 2026."
        date="18 juin 2026"
        readTime="5 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Pour les travaux dans le bâtiment, trois taux de TVA coexistent : 5,5%, 10% et 20%. Choisir le bon taux n'est pas optionnel : en cas d'erreur, c'est l'artisan qui est redevable de la différence auprès de l'administration fiscale. Comprendre les règles est donc essentiel pour établir des devis justes et conformes.",
          },
          {
            type: "h2",
            content: "TVA à 5,5% : la rénovation énergétique",
          },
          {
            type: "p",
            content:
              "Le taux réduit de 5,5% s'applique aux travaux d'amélioration de la performance énergétique des logements achevés depuis plus de 2 ans : isolation thermique (murs, toiture, planchers), installation de chaudières à très haute performance énergétique, pompes à chaleur, équipements de production d'énergie renouvelable.",
          },
          {
            type: "h2",
            content: "TVA à 10% : la rénovation classique",
          },
          {
            type: "p",
            content:
              "Le taux intermédiaire de 10% concerne les travaux d'amélioration, de transformation, d'aménagement et d'entretien des logements achevés depuis plus de 2 ans. C'est le taux le plus courant en rénovation : pose de carrelage, peinture, plomberie, électricité, menuiserie, dès lors qu'il ne s'agit pas de travaux d'amélioration énergétique (5,5%) ni de construction neuve (20%).",
          },
          {
            type: "h2",
            content: "TVA à 20% : le neuf et les exceptions",
          },
          {
            type: "ul",
            items: [
              "Construction neuve et logements de moins de 2 ans.",
              "Travaux d'agrandissement qui augmentent la surface de plus de 10%.",
              "Aménagements extérieurs (terrasses non couvertes, piscines, abris de jardin).",
              "Équipements ménagers et mobilier non considérés comme travaux immobiliers.",
            ],
          },
          {
            type: "h2",
            content: "L'attestation de TVA réduite : obligatoire",
          },
          {
            type: "p",
            content:
              "Pour appliquer un taux de 5,5% ou 10%, l'artisan doit obtenir du client une attestation (formulaire CERFA) confirmant que les conditions sont remplies : ancienneté du logement, nature des travaux. Cette attestation doit être conservée pour justifier le taux appliqué en cas de contrôle. Une question sur cette attestation ou le formulaire CERFA ? L'assistant vocal IA de Cirrion vous répond à tout moment.",
          },
          {
            type: "h2",
            content: "Comment ne plus se tromper de taux de TVA",
          },
          {
            type: "p",
            content:
              "Sur un chantier mêlant plusieurs natures de travaux, il faut parfois appliquer des taux différents sur un même devis. C'est une source fréquente d'erreurs. Avec Cirrion, vous choisissez le bon taux de TVA ligne par ligne selon la nature de chaque prestation, et Cirrion l'applique sur le devis — que vous le créiez depuis WhatsApp ou sur l'application. En cas de doute, l'assistant vocal IA répond à vos questions sur le taux à retenir.",
          },
          {
            type: "cta",
            content: "Créez vos devis avec le bon taux de TVA sur chaque ligne, avec Cirrion",
          },
        ]}
      />
    </>
  );
}
