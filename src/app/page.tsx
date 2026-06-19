import type { Metadata } from "next";
import ContentOverlay from "@/components/sections/ContentOverlay";
import StickyHero from "@/components/sections/StickyHero";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ErpOsSection from "@/components/sections/ErpOsSection";
import StorySection from "@/components/sections/StorySection";
import RoiCalculator from "@/components/sections/RoiCalculator";
import Comparatif from "@/components/sections/Comparatif";
import Pricing from "@/components/sections/Pricing";
import CtaBand from "@/components/sections/CtaBand";
import PartnersBand from "@/components/sections/PartnersBand";
import TradesSection from "@/components/sections/TradesSection";
import StatsSection from "@/components/sections/StatsSection";
import Faq from "@/components/sections/Faq";
import {
  Perspective3DFloor,
  CubeEdge,
  RippleDepth,
  DepthFade,
} from "@/components/ui/SectionTransitions";

export const metadata: Metadata = {
  title: "Floxia — Logiciel de devis et factures pour artisans du bâtiment | ERP IA",
  description:
    "Floxia : créez vos devis et factures en 3 minutes depuis WhatsApp (vocal) ou l'application ERP avec pré-modèles IA. Logiciel pour électriciens, plombiers, maçons, couvreurs et tous les artisans du bâtiment. Conforme e-facturation 2026.",
  keywords: [
    "Floxia",
    "logiciel devis artisan",
    "logiciel facturation bâtiment",
    "devis WhatsApp artisan",
    "ERP artisan bâtiment",
    "logiciel électricien",
    "logiciel plombier",
    "logiciel maçon",
    "pré-modèle devis IA",
    "e-facturation 2026 artisan",
  ],
  alternates: { canonical: "https://floxia.fr" },
  openGraph: {
    title: "Floxia — Logiciel de devis et factures pour artisans du bâtiment",
    description:
      "Créez vos devis en 3 minutes depuis WhatsApp ou l'application Floxia ERP. Pré-modèles IA, TVA automatique, e-facturation 2026. Pour tous les artisans du bâtiment.",
    url: "https://floxia.fr",
    images: [{ url: "https://floxia.fr/dashboard-floxia.jpg", width: 842, height: 414, alt: "Tableau de bord Floxia — logiciel ERP artisan bâtiment" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Floxia — Devis artisan en 3 min depuis WhatsApp",
    description: "Logiciel de devis et facturation pour artisans du bâtiment. Pré-modèles IA, TVA auto, e-facturation 2026.",
    images: ["https://floxia.fr/dashboard-floxia.jpg"],
  },
};

export default function Home() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <StickyHero>
        <Hero />
      </StickyHero>
      <ContentOverlay>
        <StatsSection />
        <Services />
        <DepthFade />
        <ErpOsSection />
        <PartnersBand />
        <StorySection />
        <CubeEdge />
        <RoiCalculator />
        <RippleDepth />
        <Comparatif />
        <Perspective3DFloor />
        <Pricing />
        <DepthFade />
        <Faq />
        <TradesSection />
        <CtaBand />
      </ContentOverlay>
    </main>
  );
}
