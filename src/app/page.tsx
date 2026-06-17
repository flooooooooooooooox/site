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

export default function Home() {
  return (
    <>
      <ClientCursor />
      <div className="grain" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <Services />
<ErpOsSection />
        <StorySection />
        <RoiCalculator />
        <Comparatif />
        <Pricing />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
