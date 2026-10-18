import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import ManagementFaq from "@/components/sections/ManagementFaq";

export const metadata = pageMetadata({
  title: "Gestion administrative et préparation comptable pour TPE — Cirrion",
  description: "Les réponses aux questions sur la gestion et la comptabilité avec Cirrion : devis, factures, dépenses et accompagnement comptable.",
  alternates: { canonical: "https://www.cirrion.eu/gestion-comptabilite" },
});

export default function ManagementPage() {
  return <main style={{ position: "relative", zIndex: 1, maxWidth: "56rem", margin: "0 auto", padding: "8rem 6vw 5rem", overflowWrap: "anywhere" }}>
    <Link href="/" style={{ color: "#2455D6" }}>← Accueil</Link>
    <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.7rem)", lineHeight: 1.2, margin: "1.3rem 0", color: "var(--text)" }}>La gestion et la comptabilité avec Cirrion</h1>
    <ManagementFaq />
  </main>;
}
