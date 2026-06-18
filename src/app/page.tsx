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
import {
  Perspective3DFloor,
  CubeEdge,
  RippleDepth,
  DepthFade,
} from "@/components/ui/SectionTransitions";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://floxia.fr",
  },
  openGraph: {
    title: "Floxia — Devis & Factures depuis WhatsApp en 3 min | ERP IA Bâtiment",
    description:
      "Générez vos devis et factures depuis WhatsApp en 3 minutes. L'ERP IA pensé pour les artisans et PME du bâtiment.",
    url: "https://floxia.fr",
  },
};

export default function Home() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      {/* Hero épinglé qui recule pendant que la suite remonte par-dessus */}
      <StickyHero>
        <Hero />
      </StickyHero>
      {/* La suite arrive « par-dessus » le hero — carte qui glisse au-dessus en 3D */}
      <ContentOverlay>
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
        <CtaBand />
      </ContentOverlay>
    </main>
  );
}
