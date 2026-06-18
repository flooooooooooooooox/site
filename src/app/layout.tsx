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
    "Floxia — Générez vos devis et factures depuis WhatsApp en 3 minutes. ERP IA pour artisans et PME du bâtiment. Automatisez devis, factures, relances et planning.",
  keywords: [
    "ERP bâtiment",
    "logiciel artisan",
    "devis facture WhatsApp",
    "gestion chantier",
    "automatisation artisan",
    "IA bâtiment",
    "logiciel PME bâtiment",
    "devis artisan",
    "facture artisan",
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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Floxia — ERP IA pour artisans du bâtiment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Floxia — ERP IA pour artisans du bâtiment",
    description:
      "Devis et factures depuis WhatsApp en 3 minutes. Automatisez votre gestion avec Floxia.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Floxia",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  url: "https://floxia.fr",
  description:
    "ERP IA pour artisans et PME du bâtiment. Générez devis, factures et PV de réception depuis WhatsApp en 3 minutes.",
  offers: {
    "@type": "Offer",
    price: "49",
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "49",
      priceCurrency: "EUR",
      billingDuration: "P1M",
    },
  },
  provider: {
    "@type": "Organization",
    name: "Floxia",
    url: "https://floxia.fr",
    areaServed: "FR",
    knowsAbout: ["Bâtiment", "Artisanat", "Gestion de chantier", "ERP", "Intelligence artificielle"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nunito.variable} ${dmSans.variable}`}>
      <body>
        {/* Chrome partagé — monté une seule fois, persiste entre les pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
