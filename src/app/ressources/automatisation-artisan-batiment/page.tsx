import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Automatisation artisan : gagnez 10h par semaine sur votre gestion",
  description:
    "5 tâches administratives que tout artisan du bâtiment peut automatiser aujourd'hui : devis, relances, facturation, conformité 2026, suivi chantier.",
  keywords: [
    "automatisation artisan", "automatisation gestion bâtiment", "gagner du temps artisan",
    "gestion administrative artisan", "logiciel gestion chantier", "automatisation facture artisan",
  ],
  openGraph: {
    title: "Automatisation artisan — Gagnez 10h par semaine",
    description:
      "5 tâches administratives que tout artisan du bâtiment peut automatiser aujourd'hui avec l'IA.",
    url: "https://floxia.fr/ressources/automatisation-artisan-batiment",
  },
  alternates: { canonical: "https://floxia.fr/ressources/automatisation-artisan-batiment" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Automatisation artisan : gagnez 10h par semaine sur votre gestion",
  description:
    "5 tâches administratives que tout artisan du bâtiment peut automatiser aujourd'hui : devis, relances, facturation, conformité 2026.",
  author: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  publisher: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  datePublished: "2026-06-18",
  mainEntityOfPage: "https://floxia.fr/ressources/automatisation-artisan-batiment",
  keywords: "automatisation artisan, gestion administrative bâtiment, logiciel artisan",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://floxia.fr/ressources" },
    { "@type": "ListItem", position: 3, name: "Automatisation artisan", item: "https://floxia.fr/ressources/automatisation-artisan-batiment" },
  ],
};

export default function AutomatisationArtisan() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BlogArticle
        badge="Gestion & Productivité"
        title="Automatisation : comment les artisans gagnent 10h par semaine"
        description="Devis, relances, facturation, conformité 2026 — 5 tâches administratives que les artisans du bâtiment peuvent automatiser aujourd'hui pour se concentrer sur le chantier."
        date="18 juin 2026"
        readTime="5 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Un artisan qui fait 5 chantiers par semaine passe en moyenne 10 à 15 heures sur des tâches administratives : rédiger les devis, envoyer les factures, relancer les impayés, gérer la TVA, archiver les documents. C'est l'équivalent de deux journées de travail par semaine — payées à ne pas poser de carrelage ni à câbler des prises. L'automatisation change ça.",
          },
          {
            type: "h2",
            content: "Tâche 1 — Création des devis artisan",
          },
          {
            type: "p",
            content:
              "Créer un devis manuellement prend entre 20 et 45 minutes : trouver le bon modèle, saisir les lignes de prestations, calculer les TVA correctes (5,5% pour la rénovation, 10% pour certains travaux, 20% pour le neuf), mettre en forme, exporter en PDF, l'envoyer. Avec Floxia, vous dictez le chantier par vocal depuis WhatsApp et le devis est prêt en moins de 3 minutes, avec votre logo et vos tarifs.",
          },
          {
            type: "h2",
            content: "Tâche 2 — Relances devis et factures impayées",
          },
          {
            type: "p",
            content:
              "Les artisans oublient souvent de relancer — par manque de temps, par gêne, ou tout simplement parce qu'ils sont sur un chantier. Résultat : 30 à 40% des devis envoyés ne reçoivent jamais de réponse. Floxia envoie automatiquement des relances à J+3, J+7 et J+14 pour les devis non signés, et à J+15, J+30 pour les factures impayées. Vous n'avez rien à faire.",
          },
          {
            type: "h2",
            content: "Tâche 3 — Facturation à l'avancement du chantier",
          },
          {
            type: "p",
            content:
              "La facturation à l'avancement est complexe : facture d'acompte à la signature, situation de travaux intermédiaire, facture finale à la réception. Chaque étape doit être conforme, numérotée dans l'ordre, avec les bons taux de TVA. Floxia déclenche automatiquement chaque document au bon moment, selon le calendrier que vous avez défini lors de la création du devis.",
          },
          {
            type: "h2",
            content: "Tâche 4 — Conformité e-facturation 2026",
          },
          {
            type: "p",
            content:
              "Depuis 2026, toutes les entreprises françaises — y compris les artisans en micro-entreprise — doivent émettre des factures électroniques conformes (e-reporting, e-invoicing). Se mettre en conformité manuellement nécessite un comptable ou des heures de paramétrage. Floxia gère cette conformité nativement : chaque facture est générée au bon format, déclarée automatiquement.",
          },
          {
            type: "h2",
            content: "Tâche 5 — Suivi et archivage des chantiers",
          },
          {
            type: "p",
            content:
              "Retrouver un devis signé de l'année dernière, le montant facturé sur un chantier en cours, ou l'état des paiements d'un client — ça prend du temps si tout est éparpillé dans des dossiers papier ou des boîtes email. Floxia centralise tout : chaque chantier a sa fiche avec tous les documents, statuts et historiques. Et à la fin du chantier, le PV de réception est généré et envoyé automatiquement.",
          },
          {
            type: "h2",
            content: "Combien de temps peut-on vraiment gagner ?",
          },
          {
            type: "ul",
            items: [
              "Devis : 30 min → 3 min par devis. Pour 8 devis/semaine = 3h30 économisées.",
              "Relances : 0 à 2h/semaine → zéro, géré automatiquement.",
              "Facturation : 1h → 10 min par chantier facturé.",
              "Archivage et recherche : 30 min/semaine → zéro, tout est centralisé.",
              "Total : 8 à 12 heures récupérées chaque semaine.",
            ],
          },
          {
            type: "h2",
            content: "Par où commencer ?",
          },
          {
            type: "p",
            content:
              "L'automatisation n'est pas réservée aux grandes entreprises. Floxia est conçu pour les artisans seuls ou les PME jusqu'à 50 personnes. La mise en place prend moins de 24 heures : on connecte votre numéro WhatsApp Business, on configure vos tarifs et modèles, et vous pouvez envoyer votre premier devis depuis votre téléphone le lendemain matin.",
          },
          {
            type: "cta",
            content: "Commencez à automatiser votre gestion dès cette semaine",
          },
        ]}
      />
    </>
  );
}
