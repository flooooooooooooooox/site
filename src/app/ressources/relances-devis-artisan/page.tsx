import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Relances devis artisan : comment ne plus perdre de clients — Cirrion",
  description:
    "30% des devis artisan ne reçoivent jamais de réponse. Guide pratique pour automatiser vos relances devis et récupérer des chantiers sans effort.",
  keywords: ["relances devis artisan", "relance devis non signé", "automatiser relances devis", "suivi devis artisan bâtiment"],
  openGraph: {
    title: "Relances devis artisan — Récupérez vos chantiers perdus",
    description: "30% des devis sans réponse. Automatisez vos relances à J+3, J+7, J+14 et récupérez des chantiers sans effort.",
    url: "https://www.cirrion.eu/ressources/relances-devis-artisan",
  },
  alternates: { canonical: "https://www.cirrion.eu/ressources/relances-devis-artisan" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Relances devis artisan : comment ne plus perdre de clients",
  description: "30% des devis artisan ne reçoivent jamais de réponse. Guide pratique pour automatiser vos relances.",
  author: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  publisher: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  datePublished: "2026-06-18",
  mainEntityOfPage: "https://www.cirrion.eu/ressources/relances-devis-artisan",
  keywords: "relances devis artisan, suivi devis bâtiment, automatisation relances",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.cirrion.eu/ressources" },
    { "@type": "ListItem", position: 3, name: "Relances devis artisan", item: "https://www.cirrion.eu/ressources/relances-devis-artisan" },
  ],
};

export default function RelancesDevis() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BlogArticle
        badge="Devis & Relances"
        title="Relances devis artisan : comment ne plus perdre de clients"
        description="30% des devis envoyés par les artisans ne reçoivent jamais de réponse. Pas parce que le client a dit non — souvent parce qu'il a simplement oublié. Voici comment automatiser vos relances et récupérer ces chantiers perdus."
        date="18 juin 2026"
        readTime="4 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Un artisan qui envoie 10 devis par semaine sans relancer perd statistiquement 3 à 4 chantiers potentiels. Ce n'est pas que les clients ont refusé — c'est qu'ils ont reçu le devis, ont eu l'intention de répondre, et ont oublié. Une relance simple à J+3 récupère en moyenne 25% de ces devis dormants.",
          },
          {
            type: "h2",
            content: "Pourquoi les artisans ne relancent pas",
          },
          {
            type: "ul",
            items: [
              "Manque de temps : entre deux chantiers, les relances passent à la trappe.",
              "Gêne ou maladresse : relancer un client pour lui demander s'il a lu le devis peut sembler insistant.",
              "Pas de système : sans outil dédié, il faut se souvenir manuellement de qui relancer et quand.",
              "Accumulation : quand on a 20 devis en cours, savoir lesquels relancer et à quelle date devient vite un casse-tête.",
            ],
          },
          {
            type: "h2",
            content: "La règle des 3 relances",
          },
          {
            type: "p",
            content:
              "Les meilleurs artisans et les PME du bâtiment les plus efficaces utilisent une règle simple : relancer à J+3, J+7 et J+14 après l'envoi d'un devis sans réponse. La première relance est amicale (\"avez-vous eu le temps de consulter notre devis ?\"), la deuxième rappelle la disponibilité, la troisième informe d'une possible évolution des tarifs ou délais.",
          },
          {
            type: "h2",
            content: "Automatiser les relances avec Cirrion",
          },
          {
            type: "p",
            content:
              "Cirrion déclenche automatiquement les relances selon le calendrier que vous choisissez. Dès qu'un devis est envoyé et n'a pas été signé, Cirrion envoie le premier message de relance à J+3 via WhatsApp ou email. Vous n'avez rien à faire — et vous pouvez personnaliser les messages une fois pour toutes.",
          },
          {
            type: "ul",
            items: [
              "J+3 : relance douce — rappel de la proposition avec lien de signature directe.",
              "J+7 : relance avec question ouverte — \"avez-vous des questions sur notre devis ?\".",
              "J+14 : relance de clôture — information sur la disponibilité ou l'évolution des délais.",
              "Après J+14 : le devis est marqué comme inactif, vous pouvez l'archiver ou le rouvrir manuellement.",
            ],
          },
          {
            type: "h2",
            content: "Relances factures impayées : même logique",
          },
          {
            type: "p",
            content:
              "Le même principe s'applique aux factures impayées. Cirrion envoie une première relance à J+15 après l'échéance, une deuxième à J+30 et une troisième à J+45 avec mention de la mise en demeure possible. En moyenne, 85% des factures en retard sont réglées avant la troisième relance.",
          },
          {
            type: "h2",
            content: "Résultats concrets pour les artisans qui automatisent leurs relances",
          },
          {
            type: "ul",
            items: [
              "+25% à +40% de taux de transformation des devis en chantier.",
              "Réduction de 60% des factures impayées de plus de 30 jours.",
              "Zéro oubli de relance — le système gère tout, même pendant les congés.",
              "Gain de 1 à 2 heures par semaine sur le suivi commercial.",
            ],
          },
          {
            type: "cta",
            content: "Activez les relances automatiques pour votre entreprise",
          },
        ]}
      />
    </>
  );
}
