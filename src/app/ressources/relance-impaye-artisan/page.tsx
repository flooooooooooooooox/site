import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "Relance impayé artisan : modèle de lettre et procédure étape par étape — Floxia",
  description:
    "Comment relancer un client qui ne paie pas ? Modèle de lettre de relance impayé pour artisans, mise en demeure et procédures de recouvrement. Automatisez vos relances avec Floxia.",
  keywords: [
    "relance impayé artisan",
    "modèle lettre relance impayé artisan",
    "mise en demeure artisan",
    "recouvrement facture artisan",
    "client ne paie pas artisan",
    "relance facture artisan",
    "injonction de payer artisan",
  ],
  openGraph: {
    title: "Relance impayé artisan : modèle de lettre et procédure — Floxia",
    description:
      "Modèle de lettre de relance impayé pour artisans, mise en demeure et procédures de recouvrement étape par étape.",
    url: "https://floxia.fr/ressources/relance-impaye-artisan",
  },
  alternates: { canonical: "https://floxia.fr/ressources/relance-impaye-artisan" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Relance impayé artisan : modèle de lettre et procédure étape par étape",
  description:
    "Comment relancer un client qui ne paie pas ? Modèle de lettre et procédure de recouvrement pour artisans.",
  author: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  publisher: { "@type": "Organization", name: "Floxia", url: "https://floxia.fr" },
  datePublished: "2026-06-19",
  mainEntityOfPage: "https://floxia.fr/ressources/relance-impaye-artisan",
  keywords: "relance impayé artisan, mise en demeure artisan, recouvrement facture artisan",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://floxia.fr/ressources" },
    { "@type": "ListItem", position: 3, name: "Relance impayé artisan", item: "https://floxia.fr/ressources/relance-impaye-artisan" },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Comment relancer un impayé en tant qu'artisan ?",
  description: "Procédure en 4 étapes pour récupérer une facture impayée en tant qu'artisan.",
  step: [
    {
      "@type": "HowToStep",
      name: "Relance amiable (J+7 à J+14)",
      text: "Envoyez un rappel courtois par email ou SMS rappelant le montant dû, la date d'échéance dépassée et vos coordonnées bancaires.",
    },
    {
      "@type": "HowToStep",
      name: "Deuxième relance (J+21)",
      text: "Renvoyez la facture avec une relance plus ferme. Mentionnez les pénalités de retard légales (3 fois le taux d'intérêt légal) qui s'appliquent.",
    },
    {
      "@type": "HowToStep",
      name: "Mise en demeure (J+30)",
      text: "Envoyez une lettre recommandée avec accusé de réception fixant un délai final de 8 à 15 jours pour payer.",
    },
    {
      "@type": "HowToStep",
      name: "Procédure judiciaire (J+45+)",
      text: "Déposez une injonction de payer en ligne sur le site officiel ou saisissez le tribunal judiciaire pour les litiges complexes.",
    },
  ],
};

export default function RelanceImpayeArtisan() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogArticle
        badge="Trésorerie & Recouvrement"
        title="Relance impayé artisan : modèle de lettre et procédure en 4 étapes"
        description="Un client qui ne paie pas, c'est une situation stressante et malheureusement fréquente pour les artisans. Voici la procédure à suivre, étape par étape, avec les modèles de lettres et les bons délais."
        date="19 juin 2026"
        readTime="7 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "En France, les impayés représentent l'une des premières causes de défaillance des TPE et PME. Pour un artisan, une seule facture non réglée peut déséquilibrer toute une trésorerie mensuelle. Voici comment agir efficacement, sans détériorer inutilement la relation client.",
          },
          {
            type: "h2",
            content: "Étape 1 — Relance amiable (J+7 à J+14 après l'échéance)",
          },
          {
            type: "p",
            content:
              "La première relance doit être courtoise. Un oubli ou un problème de trésorerie passager peut expliquer le retard. Contactez votre client par téléphone d'abord, puis par email ou SMS en résumant :",
          },
          {
            type: "ul",
            items: [
              "Le numéro et la date de la facture concernée",
              "Le montant TTC dû",
              "La date d'échéance dépassée",
              "Vos coordonnées bancaires (IBAN) pour faciliter le règlement",
              "Un ton professionnel et non agressif : « Je me permets de vous relancer concernant... »",
            ],
          },
          {
            type: "h2",
            content: "Étape 2 — Deuxième relance avec mention des pénalités (J+21)",
          },
          {
            type: "p",
            content:
              "Si la première relance reste sans réponse, renvoyez la facture par email avec une relance plus ferme. Vous pouvez maintenant mentionner les pénalités de retard légales :",
          },
          {
            type: "ul",
            items: [
              "Les pénalités de retard sont dues de plein droit dès le premier jour de retard (article L441-10 du Code de commerce).",
              "Le taux légal est de 3 fois le taux d'intérêt légal en vigueur, soit environ 12% à 15% par an.",
              "Pour les particuliers, vous pouvez prévoir des intérêts de retard dans vos CGV ou votre devis.",
              "Indiquez clairement que ces pénalités s'accumulent chaque jour et incitez votre client à régulariser rapidement.",
            ],
          },
          {
            type: "h2",
            content: "Modèle de lettre de relance impayé (2ème relance)",
          },
          {
            type: "p",
            content:
              "Objet : Relance — Facture n°[XXXX] du [date] — [montant] TTC\n\nBonjour [Nom du client],\n\nJe me permets de revenir vers vous concernant la facture n°[XXXX] d'un montant de [montant] TTC, dont l'échéance était fixée au [date d'échéance]. À ce jour, je n'ai pas reçu votre règlement.\n\nJe vous rappelle que des pénalités de retard sont applicables à partir du [date d'échéance + 1 jour] au taux de [taux applicable].\n\nAfin de régulariser cette situation, je vous invite à procéder au virement dans les meilleurs délais sur le compte suivant : IBAN [votre IBAN].\n\nRestant disponible pour tout renseignement, je vous adresse mes cordiales salutations.\n\n[Votre nom et signature]",
          },
          {
            type: "h2",
            content: "Étape 3 — Mise en demeure par courrier recommandé (J+30)",
          },
          {
            type: "p",
            content:
              "La mise en demeure est un acte formel qui marque le passage à une démarche pré-contentieuse. Elle doit être envoyée en lettre recommandée avec accusé de réception (LRAR) et doit contenir :",
          },
          {
            type: "ul",
            items: [
              "La référence à la facture impayée et au contrat (devis signé)",
              "Le montant total dû incluant les pénalités de retard calculées",
              "Un délai formel de règlement : 8 à 15 jours",
              "La mention que sans règlement dans ce délai, vous engagerez une procédure judiciaire",
              "Vos coordonnées et votre IBAN",
            ],
          },
          {
            type: "p",
            content:
              "Important : la mise en demeure fait courir les intérêts légaux si vous ne les aviez pas encore mentionnés. Elle est indispensable avant toute saisine du tribunal.",
          },
          {
            type: "h2",
            content: "Étape 4 — Procédure judiciaire (à partir de J+45)",
          },
          {
            type: "ul",
            items: [
              "Injonction de payer : procédure rapide et peu coûteuse, déposable en ligne sur le portail officiel du ministère de la Justice. Idéale pour les créances non contestées.",
              "Référé-provision : au tribunal judiciaire, pour obtenir une condamnation provisoire rapide si la créance est évidente.",
              "Tribunal judiciaire (ancien TI) pour les particuliers, tribunal de commerce pour les professionnels.",
              "Un huissier peut aussi intervenir pour une mise en demeure officielle ou la signification du jugement.",
            ],
          },
          {
            type: "h2",
            content: "Automatiser ses relances avec Floxia",
          },
          {
            type: "p",
            content:
              "Avec Floxia, vous configurez des relances automatiques par email ou SMS à J+7, J+21 et J+30. L'application envoie les relances à votre place, avec les bons montants et les bonnes dates — vous recevez une alerte uniquement si le client ne répond pas. Résultat : aucun impayé ne passe entre les mailles du filet, sans que vous ayez à suivre manuellement chaque facture.",
          },
          {
            type: "cta",
            content: "Automatiser mes relances de factures avec Floxia",
          },
        ]}
      />
    </>
  );
}
