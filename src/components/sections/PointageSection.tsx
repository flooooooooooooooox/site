"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Etapes reelles du module de pointage & preuve de passage.
// Chaque etape correspond a un ecran de l'application terrain.
const STEPS = [
  {
    slug: "arrivee",
    label: "Arrivée",
    emoji: "📍",
    color: "#2455D6",
    headline: "Le pointage démarre à l'arrivée sur site, pas avant",
    features: [
      "Scan du QR code posé sur le site, ou saisie d'un code à 8 chiffres",
      "Géolocalisation vérifiée contre le périmètre défini par l'admin",
      "Hors périmètre : le démarrage est bloqué, l'admin peut débloquer",
      "Date, heure, identité et chantier enregistrés automatiquement",
      "Sous-traitant absent : alerte immédiate côté administrateur",
    ],
  },
  {
    slug: "checklist",
    label: "Check-list",
    emoji: "✅",
    color: "#4ADE80",
    headline: "Chaque site a sa propre liste de missions",
    features: [
      "Missions et sous-missions définies par site, par l'administrateur",
      "Sanitaires, bureaux, parties communes — ou vos propres catégories",
      "Chaque tâche indique la photo attendue",
      "Le sous-traitant coche au fur et à mesure, depuis son téléphone",
      "Aucune liste identique imposée : elle se paramètre client par client",
    ],
  },
  {
    slug: "photos",
    label: "Photos",
    emoji: "📷",
    color: "#60A5FA",
    headline: "Des photos prises sur place, jamais ressorties d'une galerie",
    features: [
      "Prise de vue imposée depuis l'appareil photo de l'application",
      "Impossible d'envoyer une photo existante du téléphone",
      "Classement automatique : client / prestation / objet",
      "Horodatage de chaque cliché",
      "Visibles par le client dès la prise, sans attendre la fin",
    ],
  },
  {
    slug: "anomalies",
    label: "Anomalies",
    emoji: "⚠️",
    color: "#FEBC2E",
    headline: "Un problème sur site remonte tout de suite",
    features: [
      "Fuite, matériel cassé, WC bouché, local inaccessible…",
      "Photo et commentaire joints au signalement",
      "Remontée automatique à l'administrateur",
      "Trace conservée dans l'historique du site",
      "Le gestionnaire traite avant que le client ne réclame",
    ],
  },
  {
    slug: "cloture",
    label: "Clôture",
    emoji: "🔒",
    color: "#1B2A4A",
    headline: "Rien ne se clôture tant que tout n'est pas fait",
    features: [
      "Toutes les tâches obligatoires doivent être validées",
      "Toutes les photos attendues doivent être présentes",
      "QR code ou code de site vérifié",
      "Position GPS conforme au périmètre",
      "Condition manquante : la validation reste impossible",
    ],
  },
  {
    slug: "client",
    label: "Espace client",
    emoji: "👁️",
    color: "#8B5CF6",
    headline: "Votre client suit l'intervention en direct",
    features: [
      "Avancement de la prestation en temps réel",
      "Photos consultables au fur et à mesure",
      "Rapport d'intervention consultable et téléchargeable",
      "Signalement d'un problème directement depuis son espace",
      "Historique complet, exportable sur son poste",
    ],
  },
];

export default function PointageSection() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section
      aria-label="Pointage sur site et suivi client en temps réel"
      style={{ padding: "clamp(3rem, 8vw, 6rem) 0 clamp(1.5rem, 4vw, 3rem)", background: "transparent" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 6vw" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: "999px",
            border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)",
            color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
            textTransform: "uppercase", marginBottom: "1rem",
          }}>
            Nouvelle fonctionnalité
          </span>
          <h2 style={{
            fontFamily: "var(--font-nunito)", fontWeight: 900,
            fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "var(--text)",
            letterSpacing: "-0.03em", lineHeight: 1.15,
          }}>
            Pointage sur site et <span style={{ color: "#2455D6" }}>preuve de passage</span>
          </h2>
          <p style={{
            marginTop: "1rem", maxWidth: "42rem", marginLeft: "auto", marginRight: "auto",
            color: "rgba(var(--text-rgb),0.6)", fontSize: "1rem", lineHeight: 1.7,
          }}>
            Aucune intervention ne se clôture sans preuve de passage et sans preuve de réalisation.
            Vos clients suivent le travail en direct — les réclamations tombent d&apos;elles-mêmes.
          </p>
        </div>

        {/* ===== Fenêtre OS ===== */}
        <div style={{
          borderRadius: "1.1rem",
          border: "1px solid rgba(var(--surface-rgb),0.12)",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          overflow: "hidden",
          boxShadow: "0 30px 80px -20px rgba(27,42,74,0.25), 0 0 0 1px rgba(255,255,255,0.6) inset",
        }}>
          {/* Barre de titre */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.65rem 1rem",
            background: "rgba(var(--surface-rgb),0.05)",
            borderBottom: "1px solid rgba(var(--surface-rgb),0.08)",
          }}>
            <div style={{ display: "flex", gap: "7px", flexShrink: 0 }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
            </div>
            <div style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
              maxWidth: "26rem", margin: "0 auto",
              padding: "0.32rem 1rem", borderRadius: "999px",
              background: "rgba(27,42,74,0.06)",
              border: "1px solid rgba(var(--surface-rgb),0.08)",
              fontSize: "0.72rem", color: "rgba(var(--text-rgb),0.5)", fontWeight: 600,
              whiteSpace: "nowrap", overflow: "hidden",
            }}>
              <span style={{ color: "#4ADE80", fontSize: "0.6rem" }}>🔒</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                cirrion.app/intervention/<span style={{ color: step.color }}>{step.slug}</span>
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, color: "rgba(var(--text-rgb),0.3)", fontSize: "0.8rem" }}>
              <span>—</span><span>▢</span>
            </div>
          </div>

          {/* Corps : sidebar + contenu */}
          <div className="pointage-os-body">
            <nav className="pointage-os-sidebar" aria-label="Étapes d'une intervention">
              <p className="pointage-os-sidebar-title">INTERVENTION</p>
              {STEPS.map((s, i) => (
                <button
                  key={s.slug}
                  onClick={() => setActive(i)}
                  className="pointage-os-item"
                  style={{
                    background: active === i ? `${s.color}18` : "transparent",
                    borderLeft: `3px solid ${active === i ? s.color : "transparent"}`,
                    color: active === i ? "var(--text)" : "rgba(var(--text-rgb),0.5)",
                    fontWeight: active === i ? 700 : 500,
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{s.emoji}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </nav>

            {/* Écran principal */}
            <div style={{ position: "relative", minWidth: 0 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="pointage-panel"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2rem",
                    padding: "clamp(1.4rem, 3vw, 2.5rem)",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "100%",
                  }}
                >
                  <div aria-hidden style={{
                    position: "absolute", top: "-30%", left: "-10%",
                    width: "300px", height: "300px",
                    background: `radial-gradient(circle, ${step.color}12, transparent 70%)`,
                    filter: "blur(40px)", pointerEvents: "none",
                  }} />

                  {/* Left */}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                      <span style={{ fontSize: "2rem" }}>{step.emoji}</span>
                      <span style={{
                        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: step.color,
                        background: `${step.color}12`,
                        border: `1px solid ${step.color}25`,
                        padding: "3px 10px", borderRadius: "999px",
                      }}>
                        Étape {active + 1} · {step.label}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-nunito)", fontWeight: 900,
                      fontSize: "clamp(1.2rem,2.5vw,1.6rem)", color: "var(--text)",
                      lineHeight: 1.25, marginBottom: "1.5rem",
                    }}>
                      {step.headline}
                    </h3>
                    <a
                      href="https://calendly.com/afele1845/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        padding: "0.75rem 1.5rem", borderRadius: "0.75rem",
                        background: step.color, color: "#FFFFFF",
                        fontWeight: 700, fontSize: "0.88rem", textDecoration: "none",
                      }}
                    >
                      Voir une démo →
                    </a>
                  </div>

                  {/* Right — détails de l'étape */}
                  <ul style={{
                    listStyle: "none", padding: 0, margin: 0,
                    display: "flex", flexDirection: "column", gap: "0.75rem",
                    position: "relative", zIndex: 1,
                  }}>
                    {step.features.map((f) => (
                      <li key={f} style={{
                        display: "flex", alignItems: "flex-start", gap: "0.6rem",
                        fontSize: "0.88rem", color: "rgba(var(--text-rgb),0.7)", lineHeight: 1.5,
                      }}>
                        <span style={{
                          width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                          background: `${step.color}15`, border: `1px solid ${step.color}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.65rem", color: step.color, fontWeight: 700, marginTop: "1px",
                        }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Barre de statut */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.45rem 1rem",
            borderTop: "1px solid rgba(var(--surface-rgb),0.08)",
            background: "rgba(var(--surface-rgb),0.04)",
            fontSize: "0.68rem", color: "rgba(var(--text-rgb),0.35)", fontWeight: 600,
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
              Cirrion ERP · Intervention en cours
            </span>
            <span>Données hébergées en France · RGPD</span>
          </div>
        </div>

        {/* Lien vers les métiers — conserve le maillage interne */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            href="/artisans"
            style={{ color: "rgba(var(--text-rgb),0.4)", fontSize: "0.82rem", textDecoration: "none", fontWeight: 500 }}
          >
            Voir tous les métiers couverts →
          </Link>
        </div>
      </div>

      <style>{`
        .pointage-os-body {
          display: grid;
          grid-template-columns: 190px 1fr;
          min-height: 340px;
        }
        .pointage-os-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 0.75rem 0.5rem;
          border-right: 1px solid rgba(var(--surface-rgb),0.08);
          background: rgba(27,42,74,0.03);
        }
        .pointage-os-sidebar-title {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(var(--text-rgb),0.3);
          padding: 0.25rem 0.75rem 0.5rem;
        }
        .pointage-os-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.75rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 0.83rem;
          text-align: left;
          transition: all 0.18s;
          white-space: nowrap;
        }
        .pointage-os-item:hover { background: rgba(var(--surface-rgb),0.06) !important; }
        @media (max-width: 700px) {
          .pointage-os-body {
            grid-template-columns: 1fr;
            min-height: 0;
          }
          .pointage-os-sidebar {
            flex-direction: row;
            overflow-x: auto;
            border-right: none;
            border-bottom: 1px solid rgba(var(--surface-rgb),0.08);
            padding: 0.5rem 0.6rem;
            gap: 0.35rem;
            scrollbar-width: none;
          }
          .pointage-os-sidebar::-webkit-scrollbar { display: none; }
          .pointage-os-sidebar-title { display: none; }
          .pointage-os-item {
            border-left: none !important;
            border-radius: 999px;
            padding: 0.45rem 0.85rem;
            flex-shrink: 0;
          }
          .pointage-panel { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
