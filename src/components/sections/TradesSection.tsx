"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const TRADES = [
  {
    slug: "electricien",
    label: "Électricien",
    emoji: "⚡",
    href: "/artisans/electricien",
    color: "#F5C842",
    headline: "Devis électricien en 3 min depuis WhatsApp",
    features: [
      "Tableau électrique, mise aux normes NF C 15-100",
      "Domotique, VMC, borne de recharge VE",
      "TVA 5,5% / 10% / 20% automatique",
      "Attestation CERFA travaux intégrée",
      "PV de réception et facture finale auto",
    ],
  },
  {
    slug: "plombier",
    label: "Plombier",
    emoji: "🔧",
    href: "/artisans/plombier",
    color: "#60A5FA",
    headline: "Devis plomberie et chauffage en 3 min",
    features: [
      "Salle de bain, chauffe-eau, VMC hygro",
      "Pompe à chaleur, radiateurs, plancher chauffant",
      "TVA 5,5% économies d'énergie auto",
      "Factures d'acompte et situations de travaux",
      "Relances devis non signés automatiques",
    ],
  },
  {
    slug: "macon",
    label: "Maçon",
    emoji: "🧱",
    href: "/artisans/macon",
    color: "#A78BFA",
    headline: "Devis gros œuvre et maçonnerie en 3 min",
    features: [
      "Extension, surélévation, ravalement de façade",
      "Réhabilitation, fondations, dallage",
      "Situations de travaux à l'avancement",
      "PV de réception automatisé",
      "Gestion des sous-traitants et avenants",
    ],
  },
  {
    slug: "peintre",
    label: "Peintre",
    emoji: "🎨",
    href: "/artisans/peintre",
    color: "#F97316",
    headline: "Devis peinture et revêtements en 3 min",
    features: [
      "Ravalement façade, peinture intérieure/extérieure",
      "Calcul au m² automatique",
      "TVA 10% rénovation appliquée auto",
      "Devis avec métrés détaillés",
      "Relances et signature électronique intégrés",
    ],
  },
  {
    slug: "menuisier",
    label: "Menuisier",
    emoji: "🪵",
    href: "/artisans/menuisier",
    color: "#FBBF24",
    headline: "Devis menuiserie et pose en 3 min",
    features: [
      "Fenêtres, portes, volets, portails",
      "Cuisine, dressing, aménagement intérieur",
      "TVA selon type de pose (rénovation / neuf)",
      "Catalogue de prix réutilisable",
      "Envoi devis par WhatsApp ou email auto",
    ],
  },
  {
    slug: "couvreur",
    label: "Couvreur",
    emoji: "🏠",
    href: "/artisans/couvreur",
    color: "#34D399",
    headline: "Devis couverture et charpente en 3 min",
    features: [
      "Tuiles, ardoises, zinc, EPDM, toiture-terrasse",
      "Charpente bois, isolation sous rampant",
      "TVA 5,5% isolation, 10% rénovation auto",
      "Devis au m² ou forfait selon la prestation",
      "Photos fin de chantier via WhatsApp",
    ],
  },
  {
    slug: "carreleur",
    label: "Carreleur",
    emoji: "🔲",
    href: "/artisans/carreleur",
    color: "#E879F9",
    headline: "Devis carrelage et faïence en 3 min",
    features: [
      "Sol, mur, salle de bain, terrasse",
      "Calcul des pertes et fournitures auto",
      "TVA 10% rénovation appliquée auto",
      "Pré-modèles IA adaptés à chaque pièce",
      "Signature électronique mobile-friendly",
    ],
  },
];

export default function TradesSection() {
  const [active, setActive] = useState(0);
  const trade = TRADES[active];

  return (
    <section
      aria-label="Floxia par corps de métier du bâtiment"
      style={{ padding: "6rem 0", background: "transparent" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 6vw" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: "999px",
            border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)",
            color: "#F5C842", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
            textTransform: "uppercase", marginBottom: "1rem",
          }}>
            Tous les métiers du bâtiment
          </span>
          <h2 style={{
            fontFamily: "var(--font-nunito)", fontWeight: 900,
            fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--text)",
            letterSpacing: "-0.03em", lineHeight: 1.15,
          }}>
            Conçu pour <span style={{ color: "#F5C842" }}>votre métier</span>
          </h2>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: "0.5rem", marginBottom: "2.5rem",
        }}>
          {TRADES.map((t, i) => (
            <button
              key={t.slug}
              onClick={() => setActive(i)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.55rem 1.1rem", borderRadius: "999px", cursor: "pointer",
                fontWeight: 600, fontSize: "0.82rem", border: "none",
                transition: "all 0.2s",
                background: active === i ? t.color : "rgba(var(--surface-rgb),0.04)",
                color: active === i ? "#0F1923" : "rgba(var(--text-rgb),0.55)",
                boxShadow: active === i ? `0 4px 20px ${t.color}40` : "none",
              }}
            >
              <span>{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={trade.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              padding: "2.5rem",
              borderRadius: "1.5rem",
              background: "rgba(var(--surface-rgb),0.03)",
              border: `1px solid ${trade.color}22`,
              backdropFilter: "blur(16px)",
              position: "relative",
              overflow: "hidden",
            }}
            className="trades-panel"
          >
            {/* Glow */}
            <div aria-hidden style={{
              position: "absolute", top: "-30%", left: "-10%",
              width: "300px", height: "300px",
              background: `radial-gradient(circle, ${trade.color}12, transparent 70%)`,
              filter: "blur(40px)", pointerEvents: "none",
            }} />

            {/* Left */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                marginBottom: "1.25rem",
              }}>
                <span style={{ fontSize: "2rem" }}>{trade.emoji}</span>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: trade.color,
                  background: `${trade.color}12`,
                  border: `1px solid ${trade.color}25`,
                  padding: "3px 10px", borderRadius: "999px",
                }}>
                  {trade.label}
                </span>
              </div>
              <h3 style={{
                fontFamily: "var(--font-nunito)", fontWeight: 900,
                fontSize: "clamp(1.2rem,2.5vw,1.6rem)", color: "var(--text)",
                lineHeight: 1.25, marginBottom: "1.5rem",
              }}>
                {trade.headline}
              </h3>
              <Link
                href={trade.href}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.75rem 1.5rem", borderRadius: "0.75rem",
                  background: trade.color, color: "#0F1923",
                  fontWeight: 700, fontSize: "0.88rem", textDecoration: "none",
                }}
              >
                Voir Floxia {trade.label} →
              </Link>
            </div>

            {/* Right — features */}
            <ul style={{
              listStyle: "none", padding: 0, margin: 0,
              display: "flex", flexDirection: "column", gap: "0.75rem",
              position: "relative", zIndex: 1,
            }}>
              {trade.features.map((f) => (
                <li key={f} style={{
                  display: "flex", alignItems: "flex-start", gap: "0.6rem",
                  fontSize: "0.88rem", color: "rgba(var(--text-rgb),0.7)", lineHeight: 1.5,
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                    background: `${trade.color}15`, border: `1px solid ${trade.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.65rem", color: trade.color, fontWeight: 700, marginTop: "1px",
                  }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        {/* Link to all trades */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            href="/artisans"
            style={{
              color: "rgba(var(--text-rgb),0.4)", fontSize: "0.82rem",
              textDecoration: "none", fontWeight: 500,
            }}
          >
            Voir tous les métiers →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .trades-panel { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
