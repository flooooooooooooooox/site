import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Tarif horaire artisan bâtiment 2026 : comment fixer ses prix",
  description:
    "Quel tarif horaire pratiquer en tant qu'artisan du bâtiment en 2026 ? Méthode de calcul, fourchettes par métier (électricien, plombier, maçon) et conseils pour des devis rentables.",
  keywords: [
    "tarif horaire artisan bâtiment", "prix horaire artisan", "comment fixer ses prix artisan",
    "taux horaire électricien plombier", "calcul prix de revient artisan", "marge devis bâtiment",
  ],
  openGraph: {
    title: "Tarif horaire artisan bâtiment 2026 — Comment fixer ses prix",
    description: "Méthode de calcul du tarif horaire, fourchettes par métier et conseils pour des devis rentables.",
    url: "https://floxia.fr/ressources/tarif-horaire-artisan-batiment",
  },
  alternates: { canonical: "https://floxia.fr/ressources/tarif-horaire-artisan-batiment" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tarif horaire artisan bâtiment 2026 : comment fixer ses prix",
  description: "Méthode de calcul du tarif horaire, fourchettes par métier et conseils pour des devis rentables.",
  author: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  publisher: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  datePublished: "2026-06-18",
  mainEntityOfPage: "https://floxia.fr/ressources/tarif-horaire-artisan-batiment",
  keywords: "tarif horaire artisan, prix horaire bâtiment, calcul prix de revient",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://floxia.fr/ressources" },
    { "@type": "ListItem", position: 3, name: "Tarif horaire artisan", item: "https://floxia.fr/ressources/tarif-horaire-artisan-batiment" },
  ],
};

export default function TarifHoraire() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BlogArticle
        badge="Gestion & Prix"
        title="Tarif horaire artisan bâtiment : comment fixer ses prix en 2026"
        description="Fixer son tarif horaire est l'une des décisions les plus importantes pour un artisan. Trop bas, vous travaillez à perte ; trop haut, vous perdez des chantiers. Voici la méthode pour trouver le juste prix."
        date="18 juin 2026"
        readTime="6 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Le tarif horaire d'un artisan du bâtiment ne se résume pas à ce qu'il met dans sa poche. Il doit couvrir le salaire, les charges sociales, les frais fixes de l'entreprise, le matériel, les temps non facturables (devis, déplacements, administratif) et dégager une marge. Beaucoup d'artisans sous-estiment leur prix de revient et travaillent sans réelle rentabilité.",
          },
          {
            type: "h2",
            content: "La méthode pour calculer son tarif horaire",
          },
          {
            type: "ul",
            items: [
              "1. Calculez votre coût de revient annuel : salaire souhaité + charges sociales + frais fixes (assurance décennale, véhicule, local, comptable, logiciel, téléphone).",
              "2. Estimez vos heures réellement facturables : sur 1 600 h travaillées par an, seules 1 000 à 1 200 h sont facturables (le reste = devis, déplacements, administratif).",
              "3. Divisez le coût de revient par les heures facturables pour obtenir votre seuil de rentabilité horaire.",
              "4. Ajoutez votre marge (15 à 30%) pour obtenir votre tarif horaire de vente.",
            ],
          },
          {
            type: "h2",
            content: "Fourchettes de tarif horaire par métier (2026)",
          },
          {
            type: "p",
            content:
              "Ces fourchettes sont indicatives et varient selon la région, l'expérience et la spécialité. Elles donnent un ordre de grandeur du tarif horaire main d'œuvre couramment observé en France.",
          },
          {
            type: "ul",
            items: [
              "Électricien : 40 à 70 €/h",
              "Plombier / chauffagiste : 45 à 75 €/h",
              "Maçon : 40 à 65 €/h",
              "Peintre : 35 à 55 €/h",
              "Menuisier : 45 à 70 €/h",
              "Carreleur : 40 à 60 €/h",
            ],
          },
          {
            type: "h2",
            content: "L'erreur classique : oublier les temps non facturables",
          },
          {
            type: "p",
            content:
              "Le piège le plus fréquent est de calculer son tarif sur la base de toutes les heures travaillées. Or, rédiger des devis, se déplacer entre chantiers et gérer l'administratif représente facilement 30 à 40% du temps. Si ce temps n'est pas intégré dans le tarif horaire, l'artisan travaille à perte sans s'en rendre compte. C'est précisément là qu'un outil comme Floxia aide : en automatisant devis et relances, vous réduisez le temps non facturable et améliorez votre rentabilité réelle.",
          },
          {
            type: "h2",
            content: "Comment gagner en rentabilité sans augmenter ses prix",
          },
          {
            type: "ul",
            items: [
              "Réduire le temps passé sur les devis : avec Floxia, un devis prend 3 minutes au lieu de 30.",
              "Relancer automatiquement pour transformer plus de devis en chantiers.",
              "Diminuer les impayés grâce aux relances de factures automatiques.",
              "Suivre sa marge chantier par chantier pour ajuster ses prix au bon endroit.",
            ],
          },
          {
            type: "cta",
            content: "Optimisez votre rentabilité avec Floxia",
          },
        ]}
      />
    </>
  );
}
