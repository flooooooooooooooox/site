import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alternatives aux logiciels de devis bâtiment — Comparatifs Cirrion",
  description:
    "Cirrion comparé aux principaux logiciels de devis et facturation du bâtiment : Obat, Batigest, Sage, EBP. Découvrez quelle solution choisir pour votre entreprise.",
  keywords: ["alternative logiciel devis bâtiment", "comparatif logiciel artisan", "meilleur logiciel devis bâtiment", "logiciel facturation artisan comparatif"],
  openGraph: {
    title: "Alternatives & comparatifs logiciels devis bâtiment — Cirrion",
    description: "Cirrion comparé à Obat, Batigest, Sage, EBP. Quelle solution de devis et facturation choisir ?",
    url: "https://www.cirrion.eu/alternatives",
  },
  alternates: { canonical: "https://www.cirrion.eu/alternatives" },
};

const ALTS = [
  { href: "/alternatives/cirrion-vs-obat", title: "Cirrion vs Obat", desc: "Devis en ligne et IA : le comparatif complet entre Cirrion et Obat." },
  { href: "/alternatives/alternative-batigest", title: "Alternative à Batigest", desc: "Une alternative à Batigest plus simple et sans formation pour les petites structures." },
  { href: "/alternatives/alternative-sage", title: "Alternative à Sage", desc: "Une alternative à Sage ciblée sur les vrais besoins des artisans du bâtiment." },
  { href: "/alternatives/alternative-ebp", title: "Alternative à EBP", desc: "Une alternative moderne et mobile à EBP Bâtiment, pilotée par l'IA." },
];

export default function Alternatives() {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <style>{`.alt-card{transition:border-color .2s,background .2s}.alt-card:hover{border-color:rgba(36,85,214,.2)!important;background:rgba(36,85,214,.03)!important}`}</style>
      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)", color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            Comparatifs
          </span>
          <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>
            Cirrion vs <span style={{ color: "#2455D6" }}>les autres logiciels</span>
          </h1>
          <p style={{ color: "rgba(var(--text-rgb),0.55)", fontSize: "1.05rem", maxWidth: "500px", margin: "0 auto" }}>
            Comparez Cirrion aux principaux logiciels de devis et facturation du bâtiment pour faire le bon choix.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {ALTS.map((a) => (
            <Link key={a.href} href={a.href} className="alt-card"
              style={{ display: "block", padding: "1.8rem 2.2rem", borderRadius: "1.25rem", border: "1px solid rgba(var(--surface-rgb),0.08)", background: "rgba(var(--surface-rgb),0.02)", textDecoration: "none" }}>
              <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.1rem", color: "var(--text)", marginBottom: "0.5rem" }}>{a.title}</h2>
              <p style={{ color: "rgba(var(--text-rgb),0.55)", fontSize: ".88rem", lineHeight: 1.7 }}>{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
