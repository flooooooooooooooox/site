import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Comment envoyer un devis depuis WhatsApp en 3 minutes",
  description:
    "Guide pratique : créez et envoyez un devis PDF professionnel directement depuis WhatsApp en moins de 3 minutes. Solution idéale pour artisans du bâtiment.",
  keywords: [
    "devis depuis WhatsApp", "devis WhatsApp artisan", "envoyer devis WhatsApp",
    "créer devis WhatsApp", "logiciel devis artisan", "devis pdf WhatsApp bâtiment",
  ],
  openGraph: {
    title: "Devis depuis WhatsApp en 3 minutes — Guide artisan",
    description:
      "Créez et envoyez un devis PDF professionnel depuis WhatsApp en moins de 3 minutes. Guide pratique pour artisans et PME du bâtiment.",
    url: "https://floxia.fr/ressources/devis-depuis-whatsapp",
  },
  alternates: { canonical: "https://floxia.fr/ressources/devis-depuis-whatsapp" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Comment envoyer un devis depuis WhatsApp en 3 minutes",
  description:
    "Guide pratique : créez et envoyez un devis PDF professionnel directement depuis WhatsApp en moins de 3 minutes.",
  author: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  publisher: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  datePublished: "2026-06-18",
  mainEntityOfPage: "https://floxia.fr/ressources/devis-depuis-whatsapp",
  keywords: "devis WhatsApp artisan, logiciel devis bâtiment, Floxia",
};

export default function DevisWhatsApp() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogArticle
        badge="Devis & Facturation"
        title="Comment envoyer un devis depuis WhatsApp en 3 minutes"
        description="Vous êtes sur chantier, un prospect vous appelle. En 3 minutes, votre devis PDF est envoyé, signé et archivé — depuis WhatsApp. Voici comment Floxia rend ça possible."
        date="18 juin 2026"
        readTime="4 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Faire un devis artisan depuis WhatsApp, c'est possible — et ça change tout. Fini les heures passées le soir devant Excel ou Word. Avec Floxia, vous décrivez votre chantier par message vocal ou texte depuis votre téléphone, et le devis PDF est généré, mis en forme et envoyé au client en moins de 3 minutes.",
          },
          {
            type: "h2",
            content: "Pourquoi WhatsApp pour vos devis artisan ?",
          },
          {
            type: "p",
            content:
              "Les artisans du bâtiment passent en moyenne 2 à 3 heures par jour sur les tâches administratives : devis, factures, relances, suivi chantier. WhatsApp est déjà l'outil que vous utilisez pour communiquer avec vos clients. Floxia connecte votre numéro WhatsApp Business à un agent IA qui comprend le vocabulaire du bâtiment — plomberie, électricité, maçonnerie, peinture — et génère automatiquement un devis professionnel.",
          },
          {
            type: "h2",
            content: "Les 3 étapes pour créer un devis depuis WhatsApp",
          },
          {
            type: "ul",
            items: [
              "Étape 1 — Décrivez le chantier : envoyez un message vocal ou écrit à Floxia via WhatsApp. \"Pose de 3 radiateurs dans un appartement 75m², remplacement du tableau électrique, mise aux normes.\"",
              "Étape 2 — Validation automatique : Floxia analyse votre message, extrait les prestations, applique votre grille tarifaire et génère un devis PDF avec votre logo, vos coordonnées et la TVA correcte (5,5%, 10% ou 20% selon le type de travaux).",
              "Étape 3 — Envoi et signature : le devis est envoyé directement à votre client par WhatsApp ou email. Il peut le signer électroniquement en un clic depuis son téléphone.",
            ],
          },
          {
            type: "h2",
            content: "Ce que ça change concrètement pour un artisan",
          },
          {
            type: "p",
            content:
              "Un plombier qui fait 8 devis par semaine perd environ 4 heures rien que sur la rédaction. Avec Floxia, ces 4 heures deviennent 24 minutes. Sur un mois, c'est 14 heures récupérées — soit presque 2 journées de chantier. Pour une PME du bâtiment avec plusieurs techniciens, le gain est encore plus important : chaque chef d'équipe peut générer ses propres devis depuis le terrain, sans repasser par le bureau.",
          },
          {
            type: "h2",
            content: "Devis WhatsApp + facturation automatique",
          },
          {
            type: "p",
            content:
              "Floxia ne s'arrête pas au devis. Dès que le client signe, la chaîne complète se déclenche automatiquement : facture d'acompte, relances à J+3 / J+7 / J+14 si pas de réponse, facture finale et PV de réception à la fin du chantier. Tout est archivé, conforme à la réglementation e-facturation 2026.",
          },
          {
            type: "h3",
            content: "Compatible avec tous les corps de métier du bâtiment",
          },
          {
            type: "ul",
            items: [
              "Électricien — mise aux normes, installation domotique, tableau électrique",
              "Plombier — rénovation salle de bain, remplacement chauffe-eau, chauffage",
              "Maçon — ravalement, extension, gros œuvre",
              "Peintre — ravalement façade, décoration intérieure",
              "Multi-corps d'état — gestion de plusieurs équipes depuis un seul tableau de bord",
            ],
          },
          {
            type: "h2",
            content: "Intégration avec WhatsApp Business : comment ça marche ?",
          },
          {
            type: "p",
            content:
              "Floxia se connecte à votre numéro WhatsApp Business existant via l'API officielle Meta. Vous gardez votre numéro actuel, votre profil, vos conversations. Floxia s'intègre comme un assistant supplémentaire — vous lui écrivez comme vous écririez à un collaborateur, et il traite les documents à votre place.",
          },
          {
            type: "cta",
            content: "Prêt à faire votre premier devis depuis WhatsApp ?",
          },
        ]}
      />
    </>
  );
}
