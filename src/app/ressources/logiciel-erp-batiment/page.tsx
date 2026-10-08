import { organizationReference, pageMetadata, serializeJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = pageMetadata({
  title: "ERP bâtiment : choisir son logiciel de gestion | Cirrion",
  description:
    "Choisir un ERP bâtiment : devis, factures, chantiers, équipes et critères à vérifier en démonstration. Guide pour artisans et PME, avec sources officielles.",
  keywords: [
    "logiciel ERP bâtiment", "ERP artisan", "logiciel gestion artisan", "ERP PME bâtiment",
    "logiciel devis facture artisan", "meilleur logiciel bâtiment", "gestion chantier logiciel",
  ],
  openGraph: {
    title: "Logiciel ERP Bâtiment 2026 — Guide complet artisans et PME",
    description:
      "Quel ERP choisir pour votre entreprise du bâtiment ? Comparatif ERP généraliste vs solution IA. Devis, facturation, gestion de chantier.",
    url: "https://www.cirrion.eu/ressources/logiciel-erp-batiment",
  },
  alternates: { canonical: "https://www.cirrion.eu/ressources/logiciel-erp-batiment" },
});

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Logiciel ERP bâtiment : le guide pour artisans et PME",
  description:
    "Quel logiciel ERP choisir pour votre entreprise du bâtiment ? Comparatif complet et guide pratique.",
  author: organizationReference,
  publisher: organizationReference,
  datePublished: "2026-06-18",
  dateModified: "2026-10-06",
  image: "https://www.cirrion.eu/dashboard-cirrion.jpg",
  mainEntityOfPage: "https://www.cirrion.eu/ressources/logiciel-erp-batiment",
  keywords: "ERP bâtiment, logiciel artisan, devis facture, gestion chantier",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.cirrion.eu/ressources" },
    { "@type": "ListItem", position: 3, name: "Logiciel ERP bâtiment", item: "https://www.cirrion.eu/ressources/logiciel-erp-batiment" },
  ],
};

export default function ErpBatiment() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumb) }} />
      <BlogArticle
        badge="ERP & Logiciel"
        title="Logiciel ERP bâtiment : le guide pour artisans et PME"
        description="Comprendre les fonctions d’un ERP bâtiment et vérifier qu’elles correspondent à votre activité : devis, facturation, chantiers, équipes et connexions."
        date="18 juin 2026"
        updatedDate="6 octobre 2026"
        readTime="6 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Un ERP bâtiment est un logiciel qui relie les clients, les devis, les factures et le suivi des chantiers dans une même gestion. Il peut aussi couvrir les dépenses, les stocks ou les équipes selon l’offre. Pour choisir, partez de vos tâches réelles et vérifiez-les avec un dossier concret pendant une démonstration.",
          },
          {
            type: "h2",
            content: "Qu'est-ce qu'un ERP pour le bâtiment ?",
          },
          {
            type: "p",
            content:
              "Un ERP (Enterprise Resource Planning) est un logiciel de gestion centralisé. Pour un artisan ou une PME du bâtiment, il regroupe en un seul outil : la création de devis, la facturation, la gestion des clients et des chantiers, le suivi des paiements, et parfois la gestion des stocks et des équipes. L'objectif : tout gérer depuis un seul endroit, sans ressaisie manuelle.",
          },
          {
            type: "h2",
            content: "ERP généraliste vs logiciel bâtiment spécialisé",
          },
          {
            type: "p",
            content:
              "Un ERP généraliste et un logiciel spécialisé peuvent répondre à des besoins différents. Comparez les fonctions effectivement comprises : catalogue de prestations, acomptes et soldes, suivi des chantiers, documents et accès des équipes. Un format comme Factur-X décrit une facture électronique : ce n’est pas un logiciel de gestion.",
          },
          {
            type: "ul",
            items: [
              "ERP généraliste : vérifier les modules et les paramétrages nécessaires à votre métier.",
              "Logiciel spécialisé bâtiment : vérifier le traitement des devis, des chantiers et des documents propres à vos interventions.",
              "Cirrion : création de devis depuis WhatsApp ou l’application web, avec vos modèles et votre catalogue. Vérifier pendant la démonstration le parcours qui correspond à votre équipe.",
            ],
          },
          {
            type: "h2",
            content: "Les 5 fonctionnalités indispensables en 2026",
          },
          {
            type: "ul",
            items: [
              "Devis détaillés : catalogue, quantités, prix, taux de TVA vérifié et modèles réutilisables.",
              "Facturation : acomptes, soldes, paiements et connexion aux flux de facturation électronique selon les obligations applicables.",
              "Documents clients : vérifier le parcours d’envoi, de validation et de signature proposé.",
              "Relances : contrôler les règles, les délais et l’historique avant de les activer.",
              "Chantiers et équipes : retrouver les dépenses, les interventions et les accès utiles à chaque rôle.",
            ],
          },
          {
            type: "h2",
            content: "Pourquoi l'IA change la donne pour les artisans",
          },
          {
            type: "p",
            content:
              "Les ERP traditionnels demandent de saisir manuellement chaque ligne de devis, chaque prestation, chaque montant. Avec un ERP nouvelle génération comme Cirrion, vous décrivez votre chantier à voix haute depuis WhatsApp — \"installation salle de bain 8m², faïence, plomberie, sanitaires\" — et le logiciel génère automatiquement le devis complet avec votre grille tarifaire et la TVA de votre choix sur chaque ligne.",
          },
          {
            type: "h2",
            content: "Combien coûte un logiciel ERP bâtiment ?",
          },
          {
            type: "ul",
            items: [
              "Comparer le coût total : abonnement, utilisateurs, modules, paramétrage et accompagnement.",
              "Demander ce qui est inclus, les limites d’usage, les conditions d’engagement et les possibilités d’export.",
              "Cirrion : tarif sur devis après une démonstration. Faire préciser le périmètre de l’offre adaptée à votre entreprise.",
            ],
          },
          {
            type: "h2",
            content: "Conformité e-facturation 2026 : l'ERP doit être prêt",
          },
          {
            type: "p",
            content:
              "Selon le calendrier de la DGFiP, la réception des factures électroniques s’applique depuis le 1er septembre 2026. L’émission et l’e-reporting s’appliquent depuis cette date aux grandes entreprises et ETI, puis à partir du 1er septembre 2027 aux PME et micro-entreprises. Vérifiez le périmètre applicable à votre activité et les flux effectivement pris en charge par le logiciel et la plateforme agréée.",
          },
          { type: "links", content: "Sources et guides", links: [
            { href: "https://www.impots.gouv.fr/professionnel/questions/partir-de-quand-suis-je-concerne-par-la-reforme-de-la-facturation", label: "Calendrier officiel de la DGFiP" },
            { href: "/logiciel-gestion-entreprise-batiment", label: "La gestion bâtiment avec Cirrion" },
            { href: "/artisans/peintre", label: "Devis et factures pour peintres" },
            { href: "/ressources/facturation-electronique-2026", label: "Comprendre la facturation électronique" },
          ] },
          {
            type: "cta",
            content: "Découvrez Cirrion, l'ERP nouvelle génération conçu pour les artisans du bâtiment",
          },
        ]}
      />
    </>
  );
}
