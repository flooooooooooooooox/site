import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Logiciel de gestion pour artisans du bâtiment — Cirrion par métier",
  description:
    "Cirrion s'adapte à chaque corps de métier du bâtiment : électricien, plombier, maçon, peintre. Devis, factures et gestion depuis WhatsApp — spécialisé par métier.",
  keywords: ["logiciel artisan bâtiment", "devis artisan WhatsApp", "ERP corps de métier bâtiment", "logiciel gestion artisan"],
  openGraph: {
    title: "Cirrion par métier — Logiciel pour artisans du bâtiment",
    description: "Cirrion s'adapte à chaque corps de métier : électricien, plombier, maçon, peintre. Devis et facturation depuis WhatsApp.",
    url: "https://www.florianai.fr/artisans",
  },
  alternates: { canonical: "https://www.florianai.fr/artisans" },
};

const TRADES = [
  {
    href: "/artisans/electricien",
    emoji: "⚡",
    title: "Électricien",
    keywords: "Tableau électrique · Mise aux normes · Domotique · Borne recharge",
  },
  {
    href: "/artisans/plombier",
    emoji: "🔧",
    title: "Plombier",
    keywords: "Salle de bain · Chauffe-eau · Sanitaires · Réseau d'eau",
  },
  {
    href: "/artisans/chauffagiste",
    emoji: "🔥",
    title: "Chauffagiste",
    keywords: "Pompe à chaleur · Chaudière · RGE · MaPrimeRénov'",
  },
  {
    href: "/artisans/macon",
    emoji: "🧱",
    title: "Maçon & Gros œuvre",
    keywords: "Fondations · Extension · Ravalement · Réhabilitation",
  },
  {
    href: "/artisans/peintre",
    emoji: "🎨",
    title: "Peintre en bâtiment",
    keywords: "Ravalement façade · Décoration intérieure · Revêtements",
  },
  {
    href: "/artisans/menuisier",
    emoji: "🪵",
    title: "Menuisier",
    keywords: "Fenêtres · Portes · Agencement · Bois, alu, PVC",
  },
  {
    href: "/artisans/couvreur",
    emoji: "🏠",
    title: "Couvreur",
    keywords: "Toiture · Zinguerie · Charpente · Isolation",
  },
  {
    href: "/artisans/carreleur",
    emoji: "◻️",
    title: "Carreleur",
    keywords: "Faïence · Sol · Terrasse · Mosaïque",
  },
  {
    href: "/artisans/plaquiste",
    emoji: "📐",
    title: "Plaquiste",
    keywords: "Cloisons · Doublage · Plafonds · Isolation",
  },
];

export default function Artisans() {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <style>{`
        .trade-card { transition: border-color 0.2s, background 0.2s, transform 0.2s; }
        .trade-card:hover { border-color: rgba(36,85,214,0.25) !important; background: rgba(36,85,214,0.04) !important; transform: translateY(-2px); }
      `}</style>
      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)", color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            Par métier
          </span>
          <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>
            Cirrion pour chaque <span style={{ color: "#2455D6" }}>corps de métier</span>
          </h1>
          <p style={{ color: "rgba(var(--text-rgb),0.55)", fontSize: "1.05rem", maxWidth: "500px", margin: "0 auto" }}>
            Devis, factures et gestion administrative adaptés aux spécificités de votre métier du bâtiment.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
          {TRADES.map((trade) => (
            <Link key={trade.href} href={trade.href} className="trade-card"
              style={{ display: "block", padding: "2rem", borderRadius: "1.25rem", border: "1px solid rgba(var(--surface-rgb),0.08)", background: "rgba(var(--surface-rgb),0.02)", textDecoration: "none" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{trade.emoji}</div>
              <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.1rem", color: "var(--text)", marginBottom: "0.5rem" }}>
                {trade.title}
              </h2>
              <p style={{ color: "rgba(var(--text-rgb),0.4)", fontSize: ".78rem", lineHeight: 1.6 }}>
                {trade.keywords}
              </p>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "4rem", padding: "2rem", borderRadius: "1.25rem", border: "1px solid rgba(36,85,214,0.15)", background: "rgba(36,85,214,0.04)", textAlign: "center" }}>
          <p style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: ".92rem", marginBottom: "1rem" }}>
            Votre métier n&apos;est pas dans la liste ? Cirrion fonctionne pour tous les artisans et PME du bâtiment : menuisier, couvreur, carreleur, serrurier, paysagiste, multi-corps d&apos;état.
          </p>
          <Link href="/#tarifs" style={{ color: "#2455D6", fontWeight: 700, fontSize: ".9rem", textDecoration: "none" }}>
            Voir les tarifs →
          </Link>
        </div>
      </div>
    </main>
  );
}
