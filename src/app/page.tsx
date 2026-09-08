import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import StorySection from "@/components/sections/StorySection";
import Link from "next/link";
import Pricing from "@/components/sections/Pricing";
import CtaBand from "@/components/sections/CtaBand";
import PartnersBand from "@/components/sections/PartnersBand";
import StatsSection from "@/components/sections/StatsSection";
import GmailDisclosure from "@/components/sections/GmailDisclosure";

export const metadata: Metadata = {
  title: "Cirrion — Logiciel de devis et factures pour artisans du bâtiment | Plus qu'un ERP",
  description:
    "Cirrion : créez vos devis et factures en 3 minutes depuis WhatsApp (vocal) ou l'application ERP avec vos modèles de devis. Logiciel pour électriciens, plombiers, maçons, couvreurs et tous les artisans du bâtiment. Conforme e-facturation 2026.",
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
    "modèle devis artisan",
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
  alternates: { canonical: "https://www.cirrion.eu" },
  openGraph: {
    title: "Cirrion — Logiciel de devis et factures pour artisans du bâtiment",
    description:
      "Créez vos devis en 3 minutes depuis WhatsApp ou l'application Cirrion ERP. Vos modèles de devis, TVA 5,5/10/20% au choix, e-facturation 2026. Pour tous les artisans du bâtiment.",
    url: "https://www.cirrion.eu",
    images: [{ url: "https://www.cirrion.eu/dashboard-cirrion.jpg", width: 1600, height: 787, alt: "Tableau de bord Cirrion — logiciel ERP artisan bâtiment" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cirrion — Devis artisan en 3 min depuis WhatsApp",
    description: "Logiciel de devis et facturation pour artisans du bâtiment. Vos modèles de devis, TVA auto, e-facturation 2026.",
    images: ["https://www.cirrion.eu/dashboard-cirrion.jpg"],
  },
};

export default function Home() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      {/* Six sections, pas onze : promesse → mecanique → preuve → couverture →
          prix → passage a l'acte. Le comparatif, le calculateur de ROI, le
          pointage et la FAQ ont leurs pages dediees, rassemblees plus bas. */}
      <Hero />
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* 2 — La mecanique : ce que fait Cirrion, etape par etape */}
        <StorySection />

        {/* 3 — Le bandeau de confiance, pose sur une surface distincte pour
               casser l'uniformite visuelle du reste de la page */}
        <div
          style={{
            background: "color-mix(in srgb, var(--foreground) 3%, transparent)",
            borderTop: "1px solid color-mix(in srgb, var(--foreground) 7%, transparent)",
            borderBottom: "1px solid color-mix(in srgb, var(--foreground) 7%, transparent)",
            padding: "clamp(1rem,3vw,2rem) 0",
          }}
        >
          <PartnersBand />
          <StatsSection />
        </div>

        {/* 4 — Ce que ça couvre */}
        <Services />

        {/* 5 — Prix */}
        <Pricing />

        {/* Aller plus loin — une seule rangee de liens au lieu de sections fantomes */}
        <section style={{ padding: "clamp(2rem,5vw,3.5rem) 6vw" }}>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: "0.9rem",
            }}
          >
            {[
              { href: "/roi", label: "Calculer ce que vous récupérez", sub: "Estimation en 30 secondes" },
              { href: "/comparatif", label: "Cirrion vs Obat, Sage, EBP", sub: "28 critères comparés" },
              { href: "/pointage-preuve-de-passage", label: "Pointage & preuve de passage", sub: "QR code, photos horodatées" },
              { href: "/faq", label: "Questions fréquentes", sub: "Toutes les réponses" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  display: "block",
                  padding: "1.1rem 1.3rem",
                  borderRadius: "0.9rem",
                  border: "1px solid rgba(36,85,214,0.16)",
                  background: "rgba(36,85,214,0.04)",
                  textDecoration: "none",
                }}
              >
                <span style={{ display: "block", color: "#2455D6", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>
                  {l.label} →
                </span>
                <span style={{ display: "block", color: "rgba(27,42,74,0.5)", fontSize: "0.78rem" }}>{l.sub}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 6 — Passage a l'acte */}
        <CtaBand />

        <GmailDisclosure />
      </div>
    </main>
  );
}
