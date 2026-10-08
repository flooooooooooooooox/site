import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ClientCursor from "@/components/layout/ClientCursor";
import IntroLoader from "@/components/layout/IntroLoader";
import FloatingCtaMobile from "@/components/layout/FloatingCtaMobile";
import SectionsBackdrop from "@/components/sections/SectionsBackdrop";
import { CinematicFooter } from "@/components/ui/motion-footer";
import JsonLd from "@/components/seo/JsonLd";
import { identityGraph } from "@/lib/seo";

// Direction C — Net & Confiant : Sora (titres) + Inter (texte courant).
// Noms de variables CSS conservés (--font-nunito / --font-dm) pour ne pas
// toucher aux centaines de références fontFamily existantes dans le code.
const nunito = Sora({ subsets: ["latin"], variable: "--font-nunito", weight: ["600","700","800"] });
const dmSans = Inter({ subsets: ["latin"], variable: "--font-dm", weight: ["300","400","500","600"] });

const SITE_URL = "https://www.cirrion.eu";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Cirrion — Devis & Factures depuis WhatsApp en 3 min | Plus qu'un ERP", template: "%s | Cirrion" },
  description: "Cirrion centralise devis, factures et suivi des chantiers pour les artisans du bâtiment. Utilisez WhatsApp sur le terrain et l’application web au bureau.",
  authors: [{ name: "Cirrion", url: SITE_URL + "/qui-sommes-nous" }],
  creator: "Cirrion", publisher: "Cirrion",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { type: "website", locale: "fr_FR", siteName: "Cirrion" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nunito.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>
        {/* Execute avant le premier affichage : si le logo d'intro a deja ete
            vu dans cette session, il est masque d'emblee. Sans cela, chaque
            rechargement complet de page le rejouait un instant. */}
        <script dangerouslySetInnerHTML={{ __html: "try{var t=+localStorage.getItem('cirrion-intro-at');if(t&&Date.now()-t<108e5)document.documentElement.setAttribute('data-intro-seen','1')}catch(e){}" }} />
        <style>{"html[data-intro-seen] .intro-loader{display:none!important}"}</style>
        <JsonLd data={identityGraph} />
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
