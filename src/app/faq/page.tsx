import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Faq from "@/components/sections/Faq";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — Questions fréquentes sur Cirrion",
  description:
    "Vos questions sur Cirrion : devis depuis WhatsApp, application web, tarifs sur devis, facturation électronique et sécurité des données.",
  keywords: [
    "Cirrion FAQ",
    "questions Cirrion",
    "comment créer un devis Cirrion",
    "Cirrion e-facturation 2026",
    "Cirrion sécurité données",
    "Cirrion tarifs",
  ],
  alternates: { canonical: "https://www.cirrion.eu/faq" },
});

export default function FaqPage() {
  return (
    <main style={{ position: "relative", zIndex: 1, paddingTop: "5rem" }}>
      <Faq headingLevel="h1" />
    </main>
  );
}
