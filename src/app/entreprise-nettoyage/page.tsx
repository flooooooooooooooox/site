import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Logiciel pour entreprise de nettoyage — Devis, factures récurrentes & planning | Floxia",
  description:
    "Floxia, l'ERP IA pour les entreprises de nettoyage : devis en 3 min depuis WhatsApp, factures récurrentes automatiques (contrats mensuels), relances, planning des agents et suivi des heures. Idéal pour lancer et gérer votre société de nettoyage.",
  keywords: [
    "logiciel entreprise de nettoyage",
    "logiciel société de nettoyage",
    "logiciel devis nettoyage",
    "logiciel facturation nettoyage",
    "logiciel gestion entreprise nettoyage",
    "factures récurrentes nettoyage",
    "planning agents de nettoyage",
    "logiciel propreté",
    "créer entreprise de nettoyage",
    "gérer une entreprise de nettoyage",
  ],
  alternates: { canonical: "https://florianai.fr/entreprise-nettoyage" },
};

const FEATURES = [
  {
    title: "Devis en 3 minutes depuis WhatsApp",
    desc: "Dictez la prestation par vocal (bureaux, copropriété, fin de chantier, vitres…), Floxia génère le devis PDF professionnel avec vos tarifs.",
  },
  {
    title: "Factures récurrentes automatiques",
    desc: "Vos contrats d'entretien mensuels se facturent tout seuls, chaque mois, sans que vous y pensiez. Le cœur du métier du nettoyage.",
  },
  {
    title: "Relances automatiques",
    desc: "Devis non signés et factures impayées relancés automatiquement. Plus aucun oubli, plus d'impayés qui traînent.",
  },
  {
    title: "Planning & heures des agents",
    desc: "Gérez les plannings de vos agents, suivez leurs heures par site et par client, calculez les heures sup automatiquement.",
  },
  {
    title: "Agent IA qui répond 24h/24",
    desc: "Une standardiste IA prend les demandes de devis et les rendez-vous à votre place, même quand vous êtes sur le terrain.",
  },
  {
    title: "Comptabilité simplifiée",
    desc: "Scannez vos dépenses (produits, matériel) d'une photo, exportez tout à votre comptable en 1 clic.",
  },
];

export default function NettoyagePage() {
  return (
    <main style={{ position: "relative", zIndex: 1, maxWidth: "60rem", margin: "0 auto", padding: "7rem 6vw 5rem" }}>
      <span style={{
        display: "inline-block", padding: "6px 18px", borderRadius: "999px",
        border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)",
        color: "#2455D6", fontSize: ".75rem", fontWeight: 700, letterSpacing: ".1em",
        textTransform: "uppercase", marginBottom: "1.5rem",
      }}>
        Entreprises de nettoyage
      </span>

      <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.2rem)", color: "var(--text)", lineHeight: 1.1, marginBottom: "1.2rem" }}>
        Le logiciel qui gère votre <span style={{ color: "#2455D6" }}>entreprise de nettoyage</span>
      </h1>

      <p style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "44rem" }}>
        Devis, factures récurrentes, relances, planning des agents et suivi des heures — Floxia
        automatise tout l&apos;administratif de votre société de nettoyage pour que vous vous
        concentriez sur vos chantiers et vos clients. Depuis WhatsApp ou l&apos;application.
      </p>

      <a
        href="https://calendly.com/afele1845/30min"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "1rem 2rem", borderRadius: "0.85rem", background: "#2455D6",
          color: "#FFFFFF", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
          marginBottom: "3.5rem",
        }}
      >
        Réserver une démo gratuite →
      </a>

      <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.6rem", color: "var(--text)", marginBottom: "1.5rem" }}>
        Pensé pour le nettoyage
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", gap: "1.25rem", marginBottom: "3.5rem" }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{
            background: "rgba(var(--surface-rgb),0.03)",
            border: "1px solid rgba(var(--surface-rgb),0.08)",
            borderRadius: "1rem", padding: "1.5rem",
          }}>
            <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1rem", color: "#2455D6", marginBottom: "0.5rem" }}>
              {f.title}
            </h3>
            <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: "0.88rem", lineHeight: 1.55 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        background: "rgba(36,85,214,0.06)", border: "1px solid rgba(36,85,214,0.2)",
        borderRadius: "1.25rem", padding: "2rem", textAlign: "center",
      }}>
        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.4rem", color: "var(--text)", marginBottom: "0.75rem" }}>
          Vous lancez votre entreprise de nettoyage ?
        </h2>
        <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem", maxWidth: "38rem", margin: "0 auto 1.5rem" }}>
          Floxia vous donne dès le départ des outils pros : devis, factures récurrentes et suivi
          client. Vous démarrez organisé, vous gagnez du temps, vous paraissez sérieux face à vos clients.
        </p>
        <a
          href="https://calendly.com/afele1845/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.9rem 1.8rem", borderRadius: "0.75rem", background: "#2455D6",
            color: "#FFFFFF", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
          }}
        >
          Voir Floxia en démo →
        </a>
      </div>

      <p style={{ marginTop: "2.5rem", textAlign: "center" }}>
        <Link href="/" style={{ color: "#2455D6", textDecoration: "underline", fontSize: "0.9rem" }}>
          Découvrir tout ce que fait Floxia
        </Link>
      </p>
    </main>
  );
}
