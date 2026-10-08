import { organizationReference, pageMetadata, serializeJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = pageMetadata({
  title: "E-facturation 2026 artisan bâtiment : tout ce qu'il faut savoir",
  description:
    "Facturation électronique 2026-2027 pour artisans et PME : réception obligatoire depuis septembre 2026, émission et e-reporting des PME et micro-entreprises en 2027.",
  keywords: ["e-facturation 2026 artisan", "facturation électronique bâtiment", "obligation facture électronique artisan", "conformité e-facturation PME"],
  openGraph: {
    title: "E-facturation 2026 pour artisans — Guide complet",
    description: "Facturation électronique : calendrier 2026-2027 pour les artisans, obligations de réception, émission et e-reporting.",
    url: "https://www.cirrion.eu/ressources/facturation-electronique-2026",
  },
  alternates: { canonical: "https://www.cirrion.eu/ressources/facturation-electronique-2026" },
});

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "E-facturation 2026 artisan bâtiment : tout ce qu'il faut savoir",
  description: "Calendrier 2026-2027 de la facturation électronique pour artisans et PME du bâtiment.",
  author: organizationReference,
  publisher: organizationReference,
  datePublished: "2026-06-18",
  dateModified: "2026-10-02",
  mainEntityOfPage: "https://www.cirrion.eu/ressources/facturation-electronique-2026",
  keywords: "e-facturation 2026, facturation électronique artisan, conformité TVA bâtiment",
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.cirrion.eu/ressources" },
    { "@type": "ListItem", position: 3, name: "E-facturation 2026", item: "https://www.cirrion.eu/ressources/facturation-electronique-2026" },
  ],
};

export default function EFacturation() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumb) }} />
      <BlogArticle
        badge="Conformité & Légal"
        title="E-facturation 2026 pour artisans et PME du bâtiment"
        description="La réforme est entrée en vigueur le 1er septembre 2026. Voici le calendrier exact pour les artisans et PME, les obligations de réception et d'émission, ainsi que les sanctions prévues."
        date="Mis à jour le 2 octobre 2026"
        readTime="5 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "La réforme de la facturation électronique est entrée en vigueur le 1er septembre 2026. Depuis cette date, toutes les entreprises doivent être capables de recevoir des factures électroniques. Les grandes entreprises et les ETI doivent aussi les émettre et transmettre leur e-reporting. Pour les PME et micro-entreprises, dont la majorité des artisans, l'obligation d'émission et d'e-reporting débute le 1er septembre 2027.",
          },
          {
            type: "h2",
            content: "Qu'est-ce que la réforme e-facturation 2026 ?",
          },
          {
            type: "p",
            content:
              "La réforme concerne les entreprises établies en France et assujetties à la TVA. Une facture électronique n'est pas un simple PDF envoyé par e-mail : elle comporte des données structurées et transite par une plateforme agréée. Le calendrier d'émission dépend de la taille de l'entreprise.",
          },
          {
            type: "h2",
            content: "À partir de quand ? Les dates clés",
          },
          {
            type: "ul",
            items: [
              "1er septembre 2026 : obligation de recevoir des factures électroniques pour toutes les entreprises (grandes entreprises ET PME ET micro-entreprises).",
              "1er septembre 2026 : obligation d'émettre des factures électroniques et de transmettre l'e-reporting pour les grandes entreprises et les ETI.",
              "1er septembre 2027 : obligation d'émettre des factures électroniques et de transmettre l'e-reporting pour les PME et micro-entreprises du bâtiment (la majorité des artisans).",
            ],
          },
          {
            type: "h2",
            content: "Quelles sanctions en cas de non-conformité ?",
          },
          {
            type: "p",
            content:
              "Une amende forfaitaire de 15 € par facture est prévue en cas de non-respect de l'obligation d'émission électronique, dans la limite de 15 000 € par année civile. La première infraction n'est pas sanctionnée. Les obligations ne s'appliquent naturellement qu'à partir de la date prévue pour la catégorie d'entreprise concernée.",
          },
          {
            type: "h2",
            content: "E-facturation et e-reporting : quelle différence ?",
          },
          {
            type: "ul",
            items: [
              "E-facturation (e-invoicing) : concerne les factures B2B entre entreprises françaises. Le format électronique structuré remplace la facture PDF traditionnelle.",
              "E-reporting : concerne les transactions avec des particuliers (B2C) et les opérations internationales. Vous devez transmettre à l'administration les données de vos ventes, même si elles ne sont pas dématérialisées.",
              "Pour un artisan du bâtiment qui travaille à la fois pour des particuliers (rénovation) et des professionnels (sous-traitance), les deux obligations s'appliquent.",
            ],
          },
          {
            type: "h2",
            content: "Comment se mettre en conformité simplement",
          },
          {
            type: "p",
            content:
              "Pour être conforme, l'entreprise doit choisir une plateforme agréée pour recevoir les factures et, lorsque son échéance d'émission s'applique, transmettre les factures électroniques et les données de e-reporting. Si Cirrion est utilisé comme outil de facturation, l'intégration exacte avec la plateforme agréée choisie doit être vérifiée dans la configuration du compte.",
          },
          {
            type: "ul",
            items: [
              "Factur-X intégré : chaque facture Cirrion est automatiquement au format Factur-X conforme.",
              "Transmission : les factures électroniques B2B passent par une plateforme agréée.",
              "E-reporting : les données concernées sont transmises selon le calendrier applicable à votre entreprise.",
              "Archivage légal : vos factures sont archivées pendant 10 ans conformément aux obligations légales.",
            ],
          },
          {
            type: "h2",
            content: "Les artisans du bâtiment particulièrement concernés",
          },
          {
            type: "p",
            content:
              "Les artisans du bâtiment sont doublement concernés par la réforme : ils facturent à la fois des particuliers (e-reporting obligatoire) et des professionnels — promoteurs, syndics, entreprises générales — (e-facturation obligatoire). Sans logiciel adapté, la conformité manuelle représente plusieurs heures de travail supplémentaire par mois.",
          },
          {
            type: "cta",
            content: "Cirrion vous met en conformité e-facturation 2026 automatiquement",
          },
        ]}
      />
    </>
  );
}
