import Navbar from "@/components/layout/Navbar";
import ClientCursor from "@/components/layout/ClientCursor";
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
import {
  Perspective3DFloor,
  CubeEdge,
  RippleDepth,
  PrismSlice,
  DepthFade,
} from "@/components/ui/SectionTransitions";

export default function Home() {
  return (
    <>
      <ClientCursor />
      <div className="grain" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <Perspective3DFloor />
        <Services />
        <DepthFade />
        <ErpOsSection />
        <PrismSlice />
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
      </main>
      <CinematicFooter />
    </>
  );
}
