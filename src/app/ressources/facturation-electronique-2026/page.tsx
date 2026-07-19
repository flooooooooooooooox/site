import type { Metadata } from "next";
import BlogArticle from "@/components/sections/BlogArticle";

export const metadata: Metadata = {
  title: "E-facturation 2026 artisan bâtiment : tout ce qu'il faut savoir",
  description:
    "Obligation e-facturation 2026 pour artisans et PME du bâtiment. Ce qui change, les délais, les sanctions, et comment se mettre en conformité simplement.",
  keywords: ["e-facturation 2026 artisan", "facturation électronique bâtiment", "obligation facture électronique artisan", "conformité e-facturation PME"],
  openGraph: {
    title: "E-facturation 2026 pour artisans — Guide complet",
    description: "Obligation e-facturation 2026 : ce qui change pour les artisans du bâtiment, les délais, et comment se conformer simplement.",
    url: "https://www.cirrion.eu/ressources/facturation-electronique-2026",
  },
  alternates: { canonical: "https://www.cirrion.eu/ressources/facturation-electronique-2026" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "E-facturation 2026 artisan bâtiment : tout ce qu'il faut savoir",
  description: "Obligation e-facturation 2026 pour artisans et PME du bâtiment. Ce qui change, les délais, et comment se conformer.",
  author: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  publisher: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
  datePublished: "2026-06-18",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BlogArticle
        badge="Conformité & Légal"
        title="E-facturation 2026 pour artisans et PME du bâtiment"
        description="Obligation e-facturation 2026 : ce qui change pour les artisans et PME du bâtiment, les délais à respecter, les sanctions, et comment se mettre en conformité sans effort."
        date="18 juin 2026"
        readTime="5 min de lecture"
        blocks={[
          {
            type: "p",
            content:
              "Depuis 2026, la facturation électronique n'est plus une option pour les entreprises françaises — c'est une obligation légale. Pour les artisans et PME du bâtiment, cela signifie que vos factures doivent être émises dans un format électronique structuré et transmises via une plateforme de dématérialisation partenaire (PDP) ou via le portail public Chorus Pro.",
          },
          {
            type: "h2",
            content: "Qu'est-ce que la réforme e-facturation 2026 ?",
          },
          {
            type: "p",
            content:
              "La réforme e-facturation 2026 (aussi appelée facturation électronique obligatoire ou e-invoicing) impose à toutes les entreprises assujetties à la TVA en France d'émettre et de recevoir leurs factures dans un format électronique standardisé (Factur-X, UBL, CII). L'objectif de l'État est de lutter contre la fraude fiscale et de moderniser le traitement de la TVA.",
          },
          {
            type: "h2",
            content: "À partir de quand ? Les dates clés",
          },
          {
            type: "ul",
            items: [
              "1er septembre 2026 : obligation de recevoir des factures électroniques pour toutes les entreprises (grandes entreprises ET PME ET micro-entreprises).",
              "1er septembre 2026 : obligation d'émettre des factures électroniques pour les grandes entreprises (plus de 250 salariés ou 50M€ de CA).",
              "1er septembre 2027 : obligation d'émettre pour les ETI (entre 50 et 250 salariés).",
              "1er septembre 2027 : obligation d'émettre pour les PME et micro-entreprises du bâtiment (la majorité des artisans).",
            ],
          },
          {
            type: "h2",
            content: "Quelles sanctions en cas de non-conformité ?",
          },
          {
            type: "p",
            content:
              "Les sanctions en cas de non-émission de facture électronique s'élèvent à 15€ par facture non conforme, dans la limite de 15 000€ par an. Au-delà des sanctions financières, les entreprises non conformes risquent de se voir refuser le paiement de leurs factures par leurs clients professionnels, qui ne pourront plus les déduire en TVA.",
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
              "La bonne nouvelle : si vous utilisez Cirrion, vous êtes automatiquement conforme. Cirrion génère vos factures dans le format Factur-X (PDF avec données structurées intégrées), les transmet via une PDP immatriculée, et gère le reporting TVA automatiquement. Pas besoin de comprendre les normes techniques — Cirrion s'en charge.",
          },
          {
            type: "ul",
            items: [
              "Factur-X intégré : chaque facture Cirrion est automatiquement au format Factur-X conforme.",
              "Transmission PDP : vos factures sont transmises via la plateforme de dématérialisation partenaire certifiée.",
              "E-reporting automatique : les données de vos ventes aux particuliers sont déclarées automatiquement.",
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
