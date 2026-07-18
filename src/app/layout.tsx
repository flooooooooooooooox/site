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

const SITE_URL = "https://florianai.fr";

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
    "pré-modèle devis artisan",
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
    "assistant vocal artisan",
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
  url: "https://florianai.fr",
  description: "Logiciel de devis et facturation pour artisans — Devis depuis WhatsApp ou app ERP en 3 minutes.",
  inLanguage: "fr-FR",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://florianai.fr/ressources?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cirrion",
  alternateName: "CirrionOS",
  url: "https://florianai.fr",
  logo: {
    "@type": "ImageObject",
    url: "https://florianai.fr/icon.png",
    width: 256,
    height: 256,
  },
  image: "https://florianai.fr/dashboard-cirrion.jpg",
  description: "Cirrion est un logiciel ERP IA pour artisans et indépendants. Créez vos devis et factures depuis WhatsApp ou l'application Cirrion ERP en 3 minutes grâce aux pré-modèles IA.",
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
    worksFor: { "@type": "Organization", name: "Cirrion" },
    knowsAbout: ["Automatisation", "Intelligence artificielle", "ERP bâtiment"],
  },
  sameAs: [
    "https://florianai.fr",
    "https://florianai.fr/qui-sommes-nous",
    "https://www.instagram.com/floxia.pro",
    "https://www.linkedin.com/in/floxia-pro-9360333aa",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cirrion",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  url: "https://florianai.fr",
  description:
    "ERP IA pour artisans et indépendants. Créez devis, factures et PV de réception depuis WhatsApp ou sur l'application web, avec des pré-modèles de devis générés par l'IA.",
  featureList: [
    "Devis depuis WhatsApp par vocal en 3 minutes",
    "Pré-modèles de devis IA sur l'application ERP",
    "Facturation électronique conforme 2026",
    "Relances automatiques devis et factures",
    "Signature électronique à valeur légale",
  ],
  audience: {
    "@type": "BusinessAudience",
    name: "Artisans, auto-entrepreneurs, TPE et PME",
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
    name: "Cirrion",
    url: "https://florianai.fr",
    areaServed: "FR",
    knowsAbout: ["Bâtiment", "Artisanat", "Gestion de chantier", "ERP", "Intelligence artificielle", "Logiciel B2B", "Gestion d'entreprise BTP"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nunito.variable} ${dmSans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
