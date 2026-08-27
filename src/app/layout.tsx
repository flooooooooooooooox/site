import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ClientCursor from "@/components/layout/ClientCursor";
import IntroLoader from "@/components/layout/IntroLoader";
import FloatingCtaMobile from "@/components/layout/FloatingCtaMobile";
import SectionsBackdrop from "@/components/sections/SectionsBackdrop";
import { CinematicFooter } from "@/components/ui/motion-footer";

// Direction C — Net & Confiant : Sora (titres) + Inter (texte courant).
// Noms de variables CSS conservés (--font-nunito / --font-dm) pour ne pas
// toucher aux centaines de références fontFamily existantes dans le code.
const nunito = Sora({ subsets: ["latin"], variable: "--font-nunito", weight: ["600","700","800"] });
const dmSans = Inter({ subsets: ["latin"], variable: "--font-dm", weight: ["300","400","500","600"] });

const SITE_URL = "https://www.cirrion.eu";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cirrion — Devis & Factures depuis WhatsApp en 3 min | ERP IA Artisans & Services",
    template: "%s | Cirrion",
  },
  description:
    "Cirrion — L'ERP IA des artisans et TPE de services (bâtiment, nettoyage, et toutes petites entreprises). Créez vos devis et factures depuis WhatsApp en 3 minutes, automatisez relances, planning, heures salariés et rapprochement bancaire.",
  keywords: [
    "ERP artisan",
    "logiciel devis artisan",
    "logiciel facturation artisan",
    "logiciel artisan",
    "logiciel devis en ligne bâtiment",
    "application devis artisan",
    "devis facture WhatsApp",
    "modèle devis bâtiment",
    "modèle devis artisan",
    "créer devis en ligne",
    "gestion chantier",
    "automatisation artisan",
    "logiciel TPE services",
    "ERP TPE",
    "logiciel entreprise de nettoyage",
    "logiciel devis nettoyage",
    "logiciel facturation nettoyage",
    "logiciel entreprise de services",
    "logiciel auto-entrepreneur services",
    "logiciel gestion petite entreprise",
    "logiciel factures récurrentes",
    "logiciel contrats récurrents",
    "logiciel paysagiste",
    "logiciel déménagement",
    "logiciel aide à domicile",
    "logiciel prestataire de services",
    "IA bâtiment",
    "logiciel PME bâtiment",
    "devis artisan",
    "facture artisan",
    "logiciel facturation bâtiment",
    "logiciel artisan indépendant",
    "logiciel auto-entrepreneur bâtiment",
    "logiciel micro-entreprise BTP",
    "logiciel gestion entreprise bâtiment",
    "logiciel B2B bâtiment",
    "SaaS bâtiment BTP",
    "solution gestion PME BTP",
    "logiciel dirigeant entreprise bâtiment",
    "outil gestion artisan B2B",
    "CirrionOS",
    "Cirrion",
    "logiciel BTP",
    "ERP BTP",
    "logiciel gestion BTP",
    "devis vocal",
    "devis par vocal WhatsApp",
    "devis rapide artisan",
    "devis en 3 minutes",
    "faire un devis bâtiment",
    "faire une facture artisan",
    "application facture artisan",
    "logiciel devis facture TPE",
    "logiciel devis facture PME",
    "facturation électronique 2026 artisan",
    "e-facturation 2026 BTP",
    "Factur-X artisan",
    "conformité facture 2026",
    "signature électronique devis",
    "devis signé en ligne",
    "relance facture impayée automatique",
    "relance devis automatique",
    "recouvrement facture artisan",
    "agent IA artisan",
    "réceptionniste IA",
    "standard téléphonique IA artisan",
    "secrétaire virtuelle artisan",
    "prise de rendez-vous automatique artisan",
    "CRM artisan",
    "CRM bâtiment",
    "logiciel suivi chantier",
    "planning chantier",
    "gestion équipe bâtiment",
    "suivi heures salariés BTP",
    "pointage chantier",
    "feuille d'heures salarié bâtiment",
    "logiciel électricien",
    "logiciel plombier",
    "logiciel chauffagiste",
    "logiciel maçon",
    "logiciel peintre en bâtiment",
    "logiciel menuisier",
    "logiciel couvreur",
    "logiciel carreleur",
    "logiciel plaquiste",
    "logiciel serrurier",
    "devis électricien",
    "devis plomberie",
    "devis maçonnerie",
    "devis peinture",
    "devis rénovation",
    "facture acompte bâtiment",
    "PV de réception chantier",
    "TVA 10 travaux rénovation",
    "TVA 5.5 travaux",
    "scan ticket de caisse artisan",
    "OCR facture fournisseur",
    "export comptable artisan",
    "pré-comptabilité artisan",
    "trésorerie artisan",
    "avis Google artisan",
    "alternative Obat",
    "alternative Batigest",
    "alternative EBP bâtiment",
    "alternative Sage bâtiment",
    "meilleur logiciel artisan 2026",
    "meilleur logiciel devis bâtiment",
    "logiciel bâtiment français",
    "logiciel artisan données France",
    "logiciel artisan RGPD",
    "IA souveraine bâtiment",
    "Mistral AI bâtiment",
    "automatisation devis facture",
    "gagner du temps administratif artisan",
    "gestion administrative artisan",
  ],
  authors: [{ name: "Cirrion" }],
  creator: "Cirrion",
  publisher: "Cirrion",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Cirrion",
    title: "Cirrion — Devis & Factures depuis WhatsApp en 3 min | ERP IA Bâtiment",
    description:
      "Générez vos devis et factures depuis WhatsApp en 3 minutes. L'ERP IA pensé pour les artisans et PME du bâtiment.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cirrion — ERP IA pour artisans du bâtiment",
    description:
      "Devis et factures depuis WhatsApp en 3 minutes. Automatisez votre gestion avec Cirrion.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cirrion",
  url: "https://www.cirrion.eu",
  description: "Logiciel de devis et facturation pour artisans — Devis depuis WhatsApp ou app ERP en 3 minutes.",
  inLanguage: "fr-FR",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://www.cirrion.eu/ressources?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cirrion",
  alternateName: "CirrionOS",
  url: "https://www.cirrion.eu",
  logo: {
    "@type": "ImageObject",
    url: "https://www.cirrion.eu/icon.png",
    width: 256,
    height: 256,
  },
  image: "https://www.cirrion.eu/dashboard-cirrion.jpg",
  description: "Cirrion est un logiciel ERP IA pour artisans et indépendants. Créez vos devis et factures depuis WhatsApp ou l'application Cirrion ERP en 3 minutes grâce aux vos modèles de devis.",
  foundingDate: "2026",
  foundingLocation: { "@type": "Place", addressCountry: "FR" },
  areaServed: { "@type": "Country", name: "France" },
  knowsAbout: [
    "ERP artisan",
    "logiciel devis artisan",
    "logiciel facturation artisan", "Logiciel artisan", "Devis WhatsApp", "Facturation électronique 2026",
    "Gestion de chantier", "Automatisation PME", "Intelligence artificielle bâtiment",
    "Logiciel devis", "Logiciel facturation artisan",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Abonnements Cirrion",
    itemListElement: [
      // Tarifs sur devis : aucun prix publie, donc aucun prix declare ici.
      { "@type": "Offer", name: "Essentiel" },
      { "@type": "Offer", name: "Artisan Pro" },
      { "@type": "Offer", name: "PME Premium" },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://calendly.com/afele1845/30min",
    availableLanguage: "French",
    contactOption: "TollFree",
  },
  founder: {
    "@type": "Person",
    name: "Florian Gagnebien",
    jobTitle: "Fondateur & CEO",
    url: "https://www.cirrion.eu/qui-sommes-nous",
    worksFor: { "@type": "Organization", name: "Cirrion" },
    knowsAbout: [
      "Automatisation des processus",
      "Intelligence artificielle appliquée",
      "ERP bâtiment",
      "Facturation électronique",
    ],
    alumniOf: { "@type": "Organization", name: "Fondation ANAIS", address: { "@type": "PostalAddress", addressLocality: "Alençon", addressCountry: "FR" } },
    sameAs: ["https://www.linkedin.com/in/cirrion-pro-9360333aa"],
  },
  sameAs: [
    "https://www.cirrion.eu",
    "https://www.cirrion.eu/qui-sommes-nous",
    "https://www.instagram.com/floxia.pro",
    "https://www.linkedin.com/in/cirrion-pro-9360333aa",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cirrion",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  url: "https://www.cirrion.eu",
  description:
    "ERP IA pour artisans et indépendants. Créez devis, factures et PV de réception depuis WhatsApp ou sur l'application web, avec des modèles de devis que vous créez.",
  featureList: [
    "Devis depuis WhatsApp par vocal en 3 minutes",
    "Vos modèles de devis sur l'application ERP",
    "Facturation électronique conforme 2026",
    "Relances automatiques devis et factures",
    "Signature électronique à valeur légale",
    "Rentabilité par chantier en temps réel",
    "Gestion de stock automatique",
    "Pointage sur site par QR code et géolocalisation",
    "Preuve de passage et preuve de réalisation des interventions",
    "Espace client avec suivi des interventions en temps réel",
    "Cours et tutoriels internes : vidéos, images et fiches écrites pour les équipes",
  ],
  audience: {
    "@type": "BusinessAudience",
    name: "Artisans, auto-entrepreneurs, TPE et PME",
  },
  // Offres sans prix : la tarification se fait sur devis apres demonstration.
  offers: [
    { "@type": "Offer", name: "Essentiel", availability: "https://schema.org/InStock" },
    { "@type": "Offer", name: "Artisan Pro", availability: "https://schema.org/InStock" },
    { "@type": "Offer", name: "PME Premium", availability: "https://schema.org/InStock" },
  ],
  provider: {
    "@type": "Organization",
    name: "Cirrion",
    url: "https://www.cirrion.eu",
    areaServed: "FR",
    knowsAbout: ["Bâtiment", "Artisanat", "Gestion de chantier", "ERP", "Intelligence artificielle", "Logiciel B2B", "Gestion d'entreprise BTP"],
  },
  // Technologies et entités officielles utilisées — permet aux moteurs et aux IA
  // de relier Cirrion aux entités connues (WhatsApp, Mistral AI, ElevenLabs...).
  isAccessibleForFree: false,
  softwareVersion: "1.0",
  inLanguage: "fr-FR",
  countriesSupported: "FR",
  isBasedOn: [
    {
      "@type": "SoftwareApplication",
      name: "WhatsApp Business Platform",
      url: "https://business.whatsapp.com/products/business-platform",
      sameAs: ["https://en.wikipedia.org/wiki/WhatsApp", "https://www.wikidata.org/wiki/Q1049511"],
    },
    {
      "@type": "Organization",
      name: "Mistral AI",
      url: "https://mistral.ai",
      sameAs: ["https://en.wikipedia.org/wiki/Mistral_AI", "https://www.wikidata.org/wiki/Q124373819"],
    },
    {
      "@type": "Organization",
      name: "ElevenLabs",
      url: "https://elevenlabs.io",
      sameAs: ["https://en.wikipedia.org/wiki/ElevenLabs"],
    },
    {
      "@type": "Organization",
      name: "B2Brouter",
      url: "https://www.b2brouter.net/fr/",
    },
    {
      "@type": "Organization",
      name: "Bridge",
      url: "https://bridgeapi.io",
    },
  ],
};

// Product + AggregateOffer : donne aux moteurs et aux IA une lecture directe
// de la gamme tarifaire (fourchette, devise, disponibilite).
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Cirrion — ERP IA pour artisans",
  description:
    "Logiciel de devis, facturation et gestion pour artisans et TPE de services. Devis en 3 minutes depuis WhatsApp par message vocal, facturation électronique conforme 2026, rentabilité par chantier, gestion de stock automatique, relances automatiques et rapprochement bancaire.",
  brand: { "@type": "Brand", name: "Cirrion" },
  category: "Logiciel de gestion pour artisans du bâtiment",
  url: "https://www.cirrion.eu",
  image: "https://www.cirrion.eu/dashboard-cirrion.jpg",
  // Pas d'AggregateOffer : elle exigerait un lowPrice/highPrice, or la
  // tarification se fait sur devis. On declare les offres sans prix.
  offers: [
    { "@type": "Offer", name: "Essentiel", availability: "https://schema.org/InStock", areaServed: { "@type": "Country", name: "France" }, seller: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" } },
    { "@type": "Offer", name: "Artisan Pro", availability: "https://schema.org/InStock", areaServed: { "@type": "Country", name: "France" }, seller: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" } },
    { "@type": "Offer", name: "PME Premium", availability: "https://schema.org/InStock", areaServed: { "@type": "Country", name: "France" }, seller: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" } },
  ],
  audience: { "@type": "BusinessAudience", name: "Artisans, auto-entrepreneurs, TPE et PME du bâtiment et des services" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nunito.variable} ${dmSans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
        <IntroLoader />
        <SectionsBackdrop />
        <ClientCursor />
        <div className="grain" aria-hidden />
        <Navbar />
        {children}
        <FloatingCtaMobile />
        <div style={{ position: "relative", zIndex: 1 }}>
          <CinematicFooter />
        </div>
      </body>
    </html>
  );
}
