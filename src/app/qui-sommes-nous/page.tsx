import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ClientCursor from "@/components/layout/ClientCursor";
import SectionsBackdrop from "@/components/sections/SectionsBackdrop";
import AboutContent from "@/components/sections/AboutContent";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";
import { CinematicFooter } from "@/components/ui/motion-footer";

export const metadata: Metadata = {
  title: "Qui sommes-nous — Floxia | L'automatisation au service des artisans",
  description:
    "Découvrez l'histoire de Floxia : l'automatisation et l'IA éprouvées en entreprise, mises au service des artisans et PME du bâtiment.",
};

export default function QuiSommesNous() {
  return (
    <>
      <SectionsBackdrop />
      <ClientCursor />
      <div className="grain" aria-hidden />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <AboutContent />
        <Faq />
        <CtaBand />
      </main>
      <div style={{ position: "relative", zIndex: 1 }}>
        <CinematicFooter />
      </div>
    </>
  );
}
