import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import EssaiClient from "./EssaiClient";

export const metadata: Metadata = pageMetadata({
  title: "Devis vocal gratuit : essayez sans inscription",
  description:
    "Dictez votre chantier, Cirrion prépare le devis, vous le corrigez et le téléchargez en PDF. Gratuit, sans compte, 5 devis gratuits par visiteur.",
  alternates: { canonical: "https://www.cirrion.eu/essai-devis-vocal" },
});

export default function EssaiDevisVocalPage() {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <div style={{ maxWidth: "46rem", margin: "0 auto", padding: "clamp(6.5rem,16vw,8rem) max(16px,6vw) 5rem" }}>
        <p style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{ display: "inline-block", padding: "6px 18px", borderRadius: 999, border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)", color: "#2455D6", fontSize: ".74rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
            Essai gratuit · sans inscription
          </span>
        </p>
        <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,5vw,3rem)", lineHeight: 1.1, color: "var(--text)", textAlign: "center", marginBottom: "0.9rem", textWrap: "balance" }}>
          Votre devis, <span style={{ color: "#2455D6" }}>dicté à la voix</span>
        </h1>
        <p style={{ textAlign: "center", color: "rgba(var(--text-rgb),0.62)", marginBottom: "2rem", lineHeight: 1.6, maxWidth: "34rem", marginInline: "auto" }}>
          Décrivez le chantier comme à un collègue. Cirrion prépare le devis, vous le vérifiez, vous le téléchargez en PDF.
        </p>
        <EssaiClient />
      </div>
    </main>
  );
}
