import Navbar from "@/components/layout/Navbar";
import ClientCursor from "@/components/layout/ClientCursor";
import GlobalSceneWrapper from "@/components/sections/GlobalSceneWrapper";
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
      <GlobalSceneWrapper />
      <ClientCursor />
      <div className="grain" aria-hidden />
      <Navbar />
      <main>
        {/* Hero sticky — carte contenu glisse par-dessus */}
        <div style={{ position: "sticky", top: 0, zIndex: 0 }}>
          <Hero />
        </div>
        <div style={{
          position: "relative",
          zIndex: 10,
          background: "#05080D",
          borderRadius: "2rem 2rem 0 0",
          marginTop: "-4rem",
          boxShadow: "0 -8px 60px rgba(0,0,0,0.7)",
        }}>
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
      </main>
      <CinematicFooter />
    </>
  );
}
