import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import StorySection from "@/components/sections/StorySection";
import RoiCalculator from "@/components/sections/RoiCalculator";
import Link from "next/link";
import Pricing from "@/components/sections/Pricing";
import CtaBand from "@/components/sections/CtaBand";
import PartnersBand from "@/components/sections/PartnersBand";
import TradesSection from "@/components/sections/TradesSection";
import StatsSection from "@/components/sections/StatsSection";
import { DepthFade } from "@/components/ui/SectionTransitions";

export const metadata: Metadata = {
  title: "Cirrion — Logiciel de devis et factures pour artisans du bâtiment | ERP IA",
  description:
    "Cirrion : créez vos devis et factures en 3 minutes depuis WhatsApp (vocal) ou l'application ERP avec pré-modèles IA. Logiciel pour électriciens, plombiers, maçons, couvreurs et tous les artisans du bâtiment. Conforme e-facturation 2026.",
  keywords: [
    "Cirrion",
    "logiciel devis artisan",
    "logiciel facturation bâtiment",
    "devis WhatsApp artisan",
    "ERP artisan bâtiment",
    "logiciel électricien",
    "logiciel plombier",
    "logiciel maçon",
    "logiciel peintre",
    "logiciel menuisier",
    "logiciel couvreur",
    "logiciel carreleur",
    "logiciel chauffagiste",
    "pré-modèle devis IA",
    "e-facturation 2026 artisan",
    "devis vocal WhatsApp",
    "devis en 3 minutes",
    "facture artisan automatique",
    "relance impayé artisan",
    "signature électronique devis",
    "agent IA artisan",
    "réceptionniste IA bâtiment",
    "CRM bâtiment",
    "gestion chantier",
    "suivi heures salariés",
    "logiciel BTP français",
    "alternative Obat Batigest EBP",
    "meilleur logiciel artisan 2026",
  ],
  alternates: { canonical: "https://floxia.fr" },
  openGraph: {
    title: "Cirrion — Logiciel de devis et factures pour artisans du bâtiment",
    description:
      "Créez vos devis en 3 minutes depuis WhatsApp ou l'application Cirrion ERP. Pré-modèles IA, TVA 5,5/10/20% au choix, e-facturation 2026. Pour tous les artisans du bâtiment.",
    url: "https://floxia.fr",
    images: [{ url: "https://floxia.fr/dashboard-cirrion.jpg", width: 842, height: 414, alt: "Tableau de bord Cirrion — logiciel ERP artisan bâtiment" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cirrion — Devis artisan en 3 min depuis WhatsApp",
    description: "Logiciel de devis et facturation pour artisans du bâtiment. Pré-modèles IA, TVA auto, e-facturation 2026.",
    images: ["https://floxia.fr/dashboard-cirrion.jpg"],
  },
};

export default function Home() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <Hero />
      <div style={{ position: "relative", zIndex: 2 }}>
        <PartnersBand />
        <StatsSection />
        <Services />
        <DepthFade />
        <StorySection />
        <RoiCalculator />
        {/* Lien vers le comparatif (page dédiée) */}
        <section style={{ padding: "1rem 6vw 3rem", textAlign: "center" }}>
          <Link
            href="/comparatif"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              padding: "0.9rem 1.8rem", borderRadius: "999px",
              border: "1px solid rgba(36,85,214,0.3)", background: "rgba(36,85,214,0.06)",
              color: "#2455D6", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
            }}
          >
            Comparer Cirrion vs Obat, Sage, EBP — 21 critères →
          </Link>
        </section>
        <Pricing />
        <DepthFade />
        {/* Lien vers la FAQ (page dédiée) */}
        <section style={{ padding: "1rem 6vw 3rem", textAlign: "center" }}>
          <Link
            href="/faq"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              padding: "0.9rem 1.8rem", borderRadius: "999px",
              border: "1px solid rgba(36,85,214,0.3)", background: "rgba(36,85,214,0.06)",
              color: "#2455D6", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
            }}
          >
            Questions fréquentes — voir toutes les réponses →
          </Link>
        </section>
        <TradesSection />
        <CtaBand />
      </div>
    </main>
  );
}
