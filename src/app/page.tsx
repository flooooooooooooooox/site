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
import Footer from "@/components/sections/Footer";
import { LiquidWave, GoldParticleLine, DiagonalSlash, FogBlend } from "@/components/ui/SectionTransitions";

export default function Home() {
  return (
    <>
      <ClientCursor />
      <div className="grain" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <Services />
        {/* #0F1923 → #0A1520 */}
        <LiquidWave topColor="#0F1923" bottomColor="#0A1520" />
        <ErpOsSection />
        {/* #0A1520 → #0F1923 */}
        <DiagonalSlash topColor="#0A1520" bottomColor="#0F1923" />
        <StorySection />
        <RoiCalculator />
        {/* #0F1923 → #0A1520 */}
        <FogBlend topColor="#0F1923" bottomColor="#0A1520" />
        <Comparatif />
        {/* #0A1520 → #0F1923 */}
        <LiquidWave topColor="#0A1520" bottomColor="#0F1923" />
        <Pricing />
        {/* #0F1923 → #0A1520 */}
        <GoldParticleLine topColor="#0F1923" bottomColor="#0A1520" />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
