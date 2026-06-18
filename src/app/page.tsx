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
        {/* Carte qui glisse par-dessus le hero, fond transparent pour voir le gradient */}
        <div style={{
          position: "relative",
          zIndex: 2,
          borderRadius: "2rem 2rem 0 0",
          marginTop: "-4rem",
          boxShadow: "0 -12px 80px rgba(0,0,0,0.85)",
        }}>
          {/* Peek image — bâtiment illuminé */}
          <div style={{ position: "relative", height: "28rem", overflow: "hidden", borderRadius: "2rem 2rem 0 0" }}>
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
          {/* Sections — fond transparent, le gradient fixe est visible derrière */}
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
