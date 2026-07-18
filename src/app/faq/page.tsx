import type { Metadata } from "next";
import Faq from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes sur Cirrion",
  description:
    "Toutes les réponses sur Cirrion : création de devis par vocal WhatsApp, facturation électronique 2026, sécurité des données, tarifs, corps de métier du bâtiment couverts.",
  keywords: [
    "Cirrion FAQ",
    "questions Cirrion",
    "comment créer un devis Cirrion",
    "Cirrion e-facturation 2026",
    "Cirrion sécurité données",
    "Cirrion tarifs",
  ],
  alternates: { canonical: "https://www.florianai.fr/faq" },
};

export default function FaqPage() {
  return (
    <main style={{ position: "relative", zIndex: 1, paddingTop: "5rem" }}>
      <Faq />
    </main>
  );
}
