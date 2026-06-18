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
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <Hero />
        </div>
        <div style={{
          position: "relative",
          zIndex: 10,
          borderRadius: "2rem 2rem 0 0",
          marginTop: "-6rem",
          boxShadow: "0 -12px 80px rgba(0,0,0,0.85)",
          overflow: "hidden",
        }}>
          {/* Peek image — bâtiment illuminé — fond de la carte */}
          <div style={{ position: "relative", height: "28rem", overflow: "hidden" }}>
            <img
              src="/chantier3.png"
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,8,13,0.3) 0%, rgba(5,8,13,0.6) 60%, rgba(5,8,13,0.98) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,8,13,0) 60%, rgba(5,8,13,0.5) 100%)" }} />
            {/* Label centré */}
            <div style={{ position: "absolute", bottom: "3rem", left: 0, right: 0, textAlign: "center" }}>
              <span style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.3)", background: "rgba(245,200,66,0.08)", color: "#F5C842", fontSize: ".78rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
                Ce que Floxia rend possible
              </span>
            </div>
          </div>
          {/* Reste du contenu sur fond sombre semi-transparent */}
          <div style={{ background: "rgba(5,8,13,0.97)" }}>
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
      <CinematicFooter />
    </>
  );
}
