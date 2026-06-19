import type { Metadata } from "next";
import { Nunito, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ClientCursor from "@/components/layout/ClientCursor";
import SectionsBackdrop from "@/components/sections/SectionsBackdrop";
import { CinematicFooter } from "@/components/ui/motion-footer";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", weight: ["700","800","900"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", weight: ["300","400","500"] });

const SITE_URL = "https://floxia.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Floxia — Devis & Factures depuis WhatsApp en 3 min | ERP IA Bâtiment",
    template: "%s | Floxia",
  },
  description:
    "Floxia — Créez vos devis et factures depuis WhatsApp ou sur l'application ERP en 3 minutes. Logiciel de devis IA avec pré-modèles pour artisans et PME du bâtiment. Automatisez devis, factures, relances et planning.",
  keywords: [
    "ERP bâtiment",
    "logiciel artisan",
    "logiciel devis en ligne bâtiment",
    "application devis artisan",
    "devis facture WhatsApp",
    "modèle devis bâtiment",
    "pré-modèle devis artisan",
    "créer devis en ligne",
    "gestion chantier",
    "automatisation artisan",
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
    "FloxiaOS",
  ],
  authors: [{ name: "Floxia" }],
  creator: "Floxia",
  publisher: "Floxia",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Floxia",
    title: "Floxia — Devis & Factures depuis WhatsApp en 3 min | ERP IA Bâtiment",
    description:
      "Générez vos devis et factures depuis WhatsApp en 3 minutes. L'ERP IA pensé pour les artisans et PME du bâtiment.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Floxia — ERP IA pour artisans du bâtiment",
    description:
      "Devis et factures depuis WhatsApp en 3 minutes. Automatisez votre gestion avec Floxia.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Floxia",
  url: "https://floxia.fr",
  description: "ERP IA pour artisans et PME du bâtiment — Devis et factures depuis WhatsApp en 3 minutes.",
  inLanguage: "fr-FR",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://floxia.fr/ressources?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Floxia",
  alternateName: "FloxiaOS",
  url: "https://floxia.fr",
  logo: {
    "@type": "ImageObject",
    url: "https://floxia.fr/icon.svg",
    width: 512,
    height: 512,
  },
  image: "https://floxia.fr/dashboard-floxia.jpg",
  description: "Floxia est un logiciel ERP IA pour artisans et PME du bâtiment. Créez vos devis et factures depuis WhatsApp ou l'application Floxia ERP en 3 minutes grâce aux pré-modèles IA.",
  foundingDate: "2024",
  foundingLocation: { "@type": "Place", addressCountry: "FR" },
  areaServed: { "@type": "Country", name: "France" },
  knowsAbout: [
    "ERP bâtiment", "Logiciel artisan", "Devis WhatsApp", "Facturation électronique 2026",
    "Gestion de chantier", "Automatisation PME", "Intelligence artificielle bâtiment",
    "Logiciel devis", "Logiciel facturation artisan",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Abonnements Floxia",
    itemListElement: [
      { "@type": "Offer", name: "Essentiel", price: "99", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Artisan Pro", price: "179", priceCurrency: "EUR" },
      { "@type": "Offer", name: "PME Premium", price: "349", priceCurrency: "EUR" },
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
    name: "Florian",
    jobTitle: "Fondateur & CEO",
    worksFor: { "@type": "Organization", name: "Floxia" },
    knowsAbout: ["Automatisation", "Intelligence artificielle", "ERP bâtiment"],
  },
  sameAs: [
    "https://floxia.fr",
    "https://floxia.fr/qui-sommes-nous",
    "https://www.instagram.com/floxia.pro",
    "https://www.linkedin.com/in/floxia-pro-9360333aa",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Floxia",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  url: "https://floxia.fr",
  description:
    "ERP IA pour artisans et PME du bâtiment. Créez devis, factures et PV de réception depuis WhatsApp ou sur l'application web, avec des pré-modèles de devis générés par l'IA.",
  featureList: [
    "Devis depuis WhatsApp par vocal en 3 minutes",
    "Pré-modèles de devis IA sur l'application ERP",
    "Facturation électronique conforme 2026",
    "Relances automatiques devis et factures",
    "Signature électronique à valeur légale",
  ],
  audience: {
    "@type": "BusinessAudience",
    name: "Artisans, TPE et PME du bâtiment et du BTP",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Essentiel",
      price: "99",
      priceCurrency: "EUR",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "99", priceCurrency: "EUR", billingDuration: "P1M" },
    },
    {
      "@type": "Offer",
      name: "Artisan Pro",
      price: "179",
      priceCurrency: "EUR",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "179", priceCurrency: "EUR", billingDuration: "P1M" },
    },
    {
      "@type": "Offer",
      name: "PME Premium",
      price: "349",
      priceCurrency: "EUR",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "349", priceCurrency: "EUR", billingDuration: "P1M" },
    },
  ],
  provider: {
    "@type": "Organization",
    name: "Floxia",
    url: "https://floxia.fr",
    areaServed: "FR",
    knowsAbout: ["Bâtiment", "Artisanat", "Gestion de chantier", "ERP", "Intelligence artificielle", "Logiciel B2B", "Gestion d'entreprise BTP"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nunito.variable} ${dmSans.variable}`}>
      <body>
        {/* Chrome partagé — monté une seule fois, persiste entre les pages */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SectionsBackdrop />
        <ClientCursor />
        <div className="grain" aria-hidden />
        <Navbar />
        {children}
        <div style={{ position: "relative", zIndex: 1 }}>
          <CinematicFooter />
        </div>
      </body>
    </html>
  );
}
