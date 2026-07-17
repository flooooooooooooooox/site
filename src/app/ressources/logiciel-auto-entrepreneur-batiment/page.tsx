import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Logiciel auto-entrepreneur bâtiment : devis & factures simples — Cirrion",
  description:
    "Le logiciel de devis et facturation idéal pour les auto-entrepreneurs et artisans du bâtiment en micro-entreprise. Simple, conforme, depuis WhatsApp. Guide complet 2026.",
  keywords: [
    "logiciel auto-entrepreneur bâtiment", "logiciel micro-entreprise BTP", "devis auto-entrepreneur bâtiment",
    "facture auto-entrepreneur travaux", "logiciel artisan indépendant", "gestion micro-entreprise bâtiment",
  ],
  openGraph: {
    title: "Logiciel auto-entrepreneur bâtiment — Cirrion",
    description: "Devis et factures simples et conformes pour auto-entrepreneurs et artisans du bâtiment, depuis WhatsApp.",
    url: "https://floxia.fr/ressources/logiciel-auto-entrepreneur-batiment",
  },
  alternates: { canonical: "https://floxia.fr/ressources/logiciel-auto-entrepreneur-batiment" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Logiciel auto-entrepreneur bâtiment : devis & factures simples",
  description: "Le logiciel de devis et facturation idéal pour les auto-entrepreneurs et artisans du bâtiment en micro-entreprise.",
  author: { "@type": "Organization", name: "Cirrion", url: "https://floxia.fr" },
  publisher: { "@type": "Organization", name: "Cirrion", url: "https://floxia.fr" },
  datePublished: "2026-06-18",
  mainEntityOfPage: "https://floxia.fr/ressources/logiciel-auto-entrepreneur-batiment",
  keywords: "logiciel auto-entrepreneur bâtiment, micro-entreprise BTP, devis artisan indépendant",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://floxia.fr/ressources" },
    { "@type": "ListItem", position: 3, name: "Logiciel auto-entrepreneur bâtiment", item: "https://floxia.fr/ressources/logiciel-auto-entrepreneur-batiment" },
  ],
};

export default function AutoEntrepreneur() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BlogArticle
        badge="Artisan indépendant"
        title="Logiciel auto-entrepreneur bâtiment : devis et factures sans prise de tête"
        description="Auto-entrepreneur ou artisan en micro-entreprise dans le bâtiment ? Vous n'avez pas besoin d'un ERP complexe — juste d'un outil simple, mobile et conforme pour vos devis et factures. Voici ce qu'il vous faut."
        date="18 juin 2026"
        readTime="5 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Quand on démarre comme auto-entrepreneur dans le bâtiment, on porte toutes les casquettes : on est sur le chantier, au téléphone avec les clients, et le soir devant l'ordinateur pour faire les devis et les factures. Un bon logiciel doit vous faire gagner ce temps-là, sans vous imposer la complexité d'un logiciel pensé pour les grandes entreprises.",
          },
          {
            type: "h2",
            content: "Ce dont un auto-entrepreneur du bâtiment a vraiment besoin",
          },
          {
            type: "ul",
            items: [
              "Créer un devis rapidement, même depuis le chantier, sans ordinateur.",
              "Des factures conformes à la réglementation micro-entreprise (mentions obligatoires, TVA ou franchise en base).",
              "Un suivi simple des devis envoyés, signés et des factures payées.",
              "Aucune formation ni paramétrage compliqué.",
              "Un tarif accessible quand on démarre son activité.",
            ],
          },
          {
            type: "h2",
            content: "La franchise en base de TVA : un cas particulier",
          },
          {
            type: "p",
            content:
              "Beaucoup d'auto-entrepreneurs du bâtiment bénéficient de la franchise en base de TVA : ils ne facturent pas la TVA et apposent la mention « TVA non applicable, art. 293 B du CGI ». Dès que le seuil est dépassé, la TVA devient applicable. Cirrion gère automatiquement ces deux situations et fait évoluer vos documents quand votre statut change, sans risque d'erreur de mention.",
          },
          {
            type: "h2",
            content: "Créer ses devis et factures depuis WhatsApp",
          },
          {
            type: "p",
            content:
              "Avec Cirrion, vous créez vos devis par simple message vocal sur WhatsApp, directement depuis le chantier. Décrivez les travaux, et le devis PDF conforme est généré en 3 minutes, avec vos coordonnées, votre numéro SIRET et les bonnes mentions. Vous pouvez aussi passer par l'application Cirrion, qui propose des pré-modèles de devis prêts à personnaliser — idéal le soir, au calme.",
          },
          {
            type: "h2",
            content: "E-facturation 2026 : les auto-entrepreneurs aussi sont concernés",
          },
          {
            type: "p",
            content:
              "La réforme de la facturation électronique 2026 s'applique également aux micro-entreprises du bâtiment. Dès 2026, toutes les entreprises doivent pouvoir recevoir des factures électroniques, et l'obligation d'émettre arrivera progressivement. Cirrion vous met en conformité automatiquement, sans que vous ayez à comprendre les formats techniques.",
          },
          {
            type: "h2",
            content: "Grandir sans changer d'outil",
          },
          {
            type: "p",
            content:
              "L'avantage de démarrer avec Cirrion comme auto-entrepreneur, c'est que l'outil grandit avec vous. Si votre activité se développe et que vous passez en entreprise individuelle, en EURL ou que vous embauchez, vous gardez le même logiciel : il suffit d'activer les fonctions supplémentaires (relances avancées, gestion d'équipe, multi-utilisateurs). Vous ne perdez ni vos données, ni vos habitudes.",
          },
          {
            type: "cta",
            content: "Lancez votre gestion d'auto-entrepreneur avec Cirrion",
          },
        ]}
      />
    </>
  );
}
