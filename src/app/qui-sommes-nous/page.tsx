import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Qui sommes-nous — Floxia | L'automatisation au service des artisans",
  description:
    "Découvrez l'histoire de Floxia : l'automatisation et l'IA éprouvées en entreprise, mises au service des artisans et PME du bâtiment.",
};

export default function QuiSommesNous() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <AboutContent />
      <Faq />
      <CtaBand />
    </main>
  );
}
