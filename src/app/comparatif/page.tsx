import type { Metadata } from "next";
import Comparatif from "@/components/sections/Comparatif";

export const metadata: Metadata = {
  title: "Comparatif — Cirrion vs Obat, Sage, EBP",
  description:
    "Comparez Cirrion aux logiciels bâtiment Obat, Sage et EBP : devis par vocal WhatsApp, agent IA 24h/24, relances automatiques, e-facturation 2026. 21 critères comparés.",
  keywords: [
    "Cirrion vs Obat",
    "alternative Obat",
    "alternative Batigest",
    "alternative Sage bâtiment",
    "alternative EBP bâtiment",
    "comparatif logiciel artisan",
    "meilleur logiciel devis bâtiment",
  ],
  alternates: { canonical: "https://www.cirrion.eu/comparatif" },
};

export default function ComparatifPage() {
  return (
    <main style={{ position: "relative", zIndex: 1, paddingTop: "5rem" }}>
      <Comparatif />
    </main>
  );
}
