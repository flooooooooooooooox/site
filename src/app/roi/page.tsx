import type { Metadata } from "next";
import Link from "next/link";
import RoiCalculator from "@/components/sections/RoiCalculator";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Calculateur de ROI — combien Cirrion vous fait gagner | Cirrion",
  description:
    "Estimez en quelques secondes le temps administratif et l'argent que Cirrion vous fait récupérer chaque mois : devis, factures, relances d'impayés et TVA automatisés.",
  keywords: [
    "ROI logiciel artisan",
    "gain de temps administratif artisan",
    "calculateur rentabilité artisan",
    "coût administratif bâtiment",
  ],
  alternates: { canonical: "https://www.cirrion.eu/roi" },
  openGraph: {
    title: "Calculateur de ROI Cirrion",
    description:
      "Combien de temps et d'argent Cirrion vous fait récupérer chaque mois ? Estimation immédiate.",
    url: "https://www.cirrion.eu/roi",
  },
};

export default function RoiPage() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <section style={{ padding: "clamp(7rem,14vh,9rem) 6vw clamp(1rem,3vw,2rem)", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-nunito)",
            fontWeight: 900,
            fontSize: "clamp(1.9rem,4vw,3rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#1B2A4A",
            marginBottom: "1rem",
          }}
        >
          Combien Cirrion vous fait <span style={{ color: "#2455D6" }}>récupérer</span> ?
        </h1>
        <p
          style={{
            maxWidth: 620,
            margin: "0 auto",
            color: "rgba(27,42,74,0.6)",
            fontSize: "clamp(0.95rem,1.2vw,1.05rem)",
            lineHeight: 1.65,
          }}
        >
          Chaque heure passée sur un devis ou une relance est une heure qui ne produit rien.
          Renseignez vos chiffres : l&apos;estimation se met à jour immédiatement.
        </p>
      </section>

      <RoiCalculator />

      <section style={{ padding: "0 6vw 4rem", textAlign: "center" }}>
        <Link
          href="/#tarifs"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.9rem 1.8rem",
            borderRadius: "999px",
            border: "1px solid rgba(36,85,214,0.3)",
            background: "rgba(36,85,214,0.06)",
            color: "#2455D6",
            fontWeight: 700,
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
        >
          Voir les offres Cirrion →
        </Link>
      </section>

      <CtaBand />
    </main>
  );
}
