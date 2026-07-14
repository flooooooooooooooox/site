import type { Metadata } from "next";
import Faq from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes sur Floxia",
  description:
    "Toutes les réponses sur Floxia : création de devis par vocal WhatsApp, facturation électronique 2026, sécurité des données, tarifs, corps de métier du bâtiment couverts.",
  keywords: [
    "Floxia FAQ",
    "questions Floxia",
    "comment créer un devis Floxia",
    "Floxia e-facturation 2026",
    "Floxia sécurité données",
    "Floxia tarifs",
  ],
  alternates: { canonical: "https://florianai.fr/faq" },
};

export default function FaqPage() {
  return (
    <main style={{ position: "relative", zIndex: 1, paddingTop: "5rem" }}>
      <Faq />
    </main>
  );
}
