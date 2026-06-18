import Navbar from "@/components/layout/Navbar";
import ClientCursor from "@/components/layout/ClientCursor";
import SectionsBackdrop from "@/components/sections/SectionsBackdrop";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ErpOsSection from "@/components/sections/ErpOsSection";
import StorySection from "@/components/sections/StorySection";
import RoiCalculator from "@/components/sections/RoiCalculator";
import Comparatif from "@/components/sections/Comparatif";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";
import { CinematicFooter } from "@/components/ui/motion-footer";
import PartnersBand from "@/components/sections/PartnersBand";
import {
  Perspective3DFloor,
  CubeEdge,
  RippleDepth,
  DepthFade,
} from "@/components/ui/SectionTransitions";

export default function Home() {
  return (
    <>
      {/* Gradient animé fixe — visible derrière tout le contenu */}
      <SectionsBackdrop />
      <ClientCursor />
      <div className="grain" aria-hidden />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        {/* Sections — fond transparent, le gradient animé fixe est visible derrière */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ position: "relative" }}>
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
            <CtaBand />
          </div>
        </div>
      </main>
      <div style={{ position: "relative", zIndex: 1 }}>
        <CinematicFooter />
      </div>
    </>
  );
}
