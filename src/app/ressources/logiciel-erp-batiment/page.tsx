import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Logiciel ERP Bâtiment : guide complet pour artisans et PME 2026",
  description:
    "Quel logiciel ERP choisir pour votre entreprise du bâtiment ? Comparatif complet : ERP généraliste vs solution IA spécialisée. Devis, facturation, chantiers.",
  keywords: [
    "logiciel ERP bâtiment", "ERP artisan", "logiciel gestion artisan", "ERP PME bâtiment",
    "logiciel devis facture artisan", "meilleur logiciel bâtiment", "gestion chantier logiciel",
  ],
  openGraph: {
    title: "Logiciel ERP Bâtiment 2026 — Guide complet artisans et PME",
    description:
      "Quel ERP choisir pour votre entreprise du bâtiment ? Comparatif ERP généraliste vs solution IA. Devis, facturation, gestion de chantier.",
    url: "https://floxia.fr/ressources/logiciel-erp-batiment",
  },
  alternates: { canonical: "https://floxia.fr/ressources/logiciel-erp-batiment" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Logiciel ERP Bâtiment : guide complet pour artisans et PME 2026",
  description:
    "Quel logiciel ERP choisir pour votre entreprise du bâtiment ? Comparatif complet et guide pratique.",
  author: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  publisher: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  datePublished: "2026-06-18",
  mainEntityOfPage: "https://floxia.fr/ressources/logiciel-erp-batiment",
  keywords: "ERP bâtiment, logiciel artisan, devis facture, gestion chantier",
};

export default function ErpBatiment() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogArticle
        badge="ERP & Logiciel"
        title="Logiciel ERP bâtiment : le guide complet pour artisans et PME"
        description="ERP généraliste ou logiciel spécialisé bâtiment ? On compare les solutions du marché et on explique pourquoi l'IA change tout pour les petites structures en 2026."
        date="18 juin 2026"
        readTime="6 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "En 2026, un artisan ou une PME du bâtiment sans logiciel de gestion perd en moyenne 3 heures par jour sur des tâches administratives. Devis manuels, factures sur Excel, relances oubliées, conformité e-facturation à gérer — tout ça grignote le temps que vous devriez passer sur chantier. Un bon logiciel ERP bâtiment règle ces problèmes. Encore faut-il choisir le bon.",
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
              "La plupart des artisans commencent avec un ERP généraliste (Sage, Dolibarr, Cegid) ou un logiciel de facturation basique (Factur-X, Freebe). Le problème : ces outils ne parlent pas le langage du bâtiment. Ils ne gèrent pas les TVA multiples propres aux travaux de rénovation (5,5%, 10%, 20%), l'attestation CERFA pour TVA réduite, les PV de réception, ou la facturation à l'avancement.",
          },
          {
            type: "ul",
            items: [
              "ERP généraliste — avantage : prix bas. Inconvénient : pas adapté au bâtiment, nécessite des paramétrages complexes et du temps de formation.",
              "Logiciel bâtiment classique (Batigest, Onaya) — adapté aux grands groupes, trop lourd et trop cher pour un artisan indépendant ou une PME de moins de 20 personnes.",
              "Solution IA spécialisée (Floxia) — conçue pour les artisans, fonctionne depuis WhatsApp, automatise toute la chaîne devis → facture → PV de réception.",
            ],
          },
          {
            type: "h2",
            content: "Les 5 fonctionnalités indispensables en 2026",
          },
          {
            type: "ul",
            items: [
              "Devis PDF automatique avec TVA bâtiment correcte (5,5% rénovation, 10% travaux neufs sur existant, 20% neuf)",
              "Facturation électronique conforme e-facturation 2026 (obligation légale pour toutes les entreprises à partir de 2026)",
              "Signature électronique à valeur légale intégrée — le client signe depuis son téléphone",
              "Relances automatiques — devis non signé à J+3, facture impayée à J+15",
              "Gestion multi-chantiers — suivi en temps réel de l'avancement, des dépenses et des marges",
            ],
          },
          {
            type: "h2",
            content: "Pourquoi l'IA change la donne pour les artisans",
          },
          {
            type: "p",
            content:
              "Les ERP traditionnels demandent de saisir manuellement chaque ligne de devis, chaque prestation, chaque montant. Avec un ERP IA comme Floxia, vous décrivez votre chantier à voix haute depuis WhatsApp — \"installation salle de bain 8m², faïence, plomberie, sanitaires\" — et le logiciel génère automatiquement le devis complet avec les bonnes TVA, les bonnes unités et votre grille tarifaire.",
          },
          {
            type: "h2",
            content: "Combien coûte un logiciel ERP bâtiment ?",
          },
          {
            type: "ul",
            items: [
              "ERP généraliste (Sage, Cegid) : 200€ à 800€/mois pour une petite entreprise, plus les coûts de formation et d'implémentation.",
              "Logiciel bâtiment classique (Batigest, Onaya) : 100€ à 400€/mois, + 1 000€ à 3 000€ de setup.",
              "Floxia : à partir de 99€/mois tout inclus, aucune formation requise — vous l'utilisez depuis WhatsApp ou directement sur l'application Floxia ERP avec ses pré-modèles de devis.",
            ],
          },
          {
            type: "h2",
            content: "Conformité e-facturation 2026 : l'ERP doit être prêt",
          },
          {
            type: "p",
            content:
              "Depuis 2026, toutes les entreprises françaises (y compris les micro-entreprises du bâtiment) doivent être capables de recevoir et émettre des factures électroniques conformes. Floxia gère nativement l'e-reporting et l'e-facturation — pas besoin d'un module supplémentaire ou d'un comptable pour s'y conformer.",
          },
          {
            type: "cta",
            content: "Découvrez Floxia, l'ERP IA conçu pour les artisans du bâtiment",
          },
        ]}
      />
    </>
  );
}
