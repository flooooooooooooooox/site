import type { Metadata } from "next";
import Link from "next/link";
import { VILLES } from "@/lib/villes";

export const metadata: Metadata = {
  title: "Logiciel de devis bâtiment par ville — Cirrion partout en France",
  description:
    "Cirrion, le logiciel de devis et facturation IA pour artisans du bâtiment, est disponible partout en France : Paris, Lyon, Marseille, Toulouse, Bordeaux et plus.",
  keywords: ["logiciel bâtiment France", "logiciel devis artisan ville", "logiciel artisan national", "ERP bâtiment France"],
  openGraph: {
    title: "Logiciel de devis bâtiment par ville — Cirrion",
    description: "Cirrion est disponible partout en France pour les artisans du bâtiment. Trouvez votre ville.",
    url: "https://floxia.fr/logiciel-batiment",
  },
  alternates: { canonical: "https://floxia.fr/logiciel-batiment" },
};

export default function LogicielBatimentIndex() {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <style>{`.ville-card{transition:border-color .2s,background .2s}.ville-card:hover{border-color:rgba(36,85,214,.25)!important;background:rgba(36,85,214,.04)!important}`}</style>
      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)", color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            Partout en France
          </span>
          <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>
            Logiciel bâtiment <span style={{ color: "#2455D6" }}>près de chez vous</span>
          </h1>
          <p style={{ color: "rgba(var(--text-rgb),0.55)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto" }}>
            Cirrion est un logiciel 100% en ligne, accessible aux artisans et PME du bâtiment dans toute la France. Découvrez Cirrion dans votre ville.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
          {VILLES.map((v) => (
            <Link key={v.slug} href={`/logiciel-batiment/${v.slug}`} className="ville-card"
              style={{ display: "block", padding: "1.4rem 1.6rem", borderRadius: "1rem", border: "1px solid rgba(var(--surface-rgb),0.08)", background: "rgba(var(--surface-rgb),0.02)", textDecoration: "none" }}>
              <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.05rem", color: "var(--text)", marginBottom: "0.3rem" }}>
                {v.nom}
              </h2>
              <p style={{ color: "rgba(var(--text-rgb),0.4)", fontSize: ".78rem" }}>{v.region}</p>
            </Link>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "rgba(var(--text-rgb),0.45)", fontSize: ".88rem", marginTop: "3rem", lineHeight: 1.7 }}>
          Votre ville n&apos;est pas listée ? Aucun problème : Cirrion étant 100% en ligne, vous pouvez l&apos;utiliser partout en France, quelle que soit votre localité.
        </p>
      </div>
    </main>
  );
}
