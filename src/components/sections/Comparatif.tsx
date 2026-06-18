"use client";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

type Val = true | false | "partial" | string;

// floxia | obat | sage | ebp
const SECTIONS = [
  {
    label: "Devis & Facturation",
    rows: [
      { feature: "Devis par vocal WhatsApp en 3 min",       floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Devis en moins de 8 minutes",             floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Factures & PV de réception automatisés",  floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Signature électronique légale",           floxia: true,       obat: "partial",  sage: false,      ebp: false },
      { feature: "Réforme e-facturation 2026 (e-reporting)",floxia: true,       obat: true,       sage: true,       ebp: true  },
      { feature: "Attestation TVA réduite (CERFA bâtiment)",floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Avoirs & avenants automatiques",          floxia: true,       obat: false,      sage: "partial",  ebp: "partial" },
    ],
  },
  {
    label: "Automatisation & IA",
    rows: [
      { feature: "Agent réceptionniste IA 24h/24",          floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Relances automatiques devis / factures",  floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Rédaction e-mail pro par vocal (30s)",    floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Booking RDV automatique",                 floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "OCR scan tickets fournisseurs IA",        floxia: true,       obat: false,      sage: "partial",  ebp: false },
      { feature: "Rapport chantier par vocal",              floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Avis Google Maps auto fin chantier",      floxia: true,       obat: false,      sage: false,      ebp: false },
    ],
  },
  {
    label: "Gestion & Pilotage",
    rows: [
      { feature: "CRM clients & historique complet",        floxia: true,       obat: true,       sage: true,       ebp: true  },
      { feature: "Planning équipes temps réel",             floxia: true,       obat: "partial",  sage: false,      ebp: "partial" },
      { feature: "Collecte photos chantier WhatsApp",       floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Dashboard CA & trésorerie",               floxia: true,       obat: true,       sage: true,       ebp: true  },
      { feature: "Export comptabilité 1 clic",              floxia: true,       obat: true,       sage: true,       ebp: true  },
    ],
  },
  {
    label: "Infrastructure & Prix",
    rows: [
      { feature: "Hébergement 100% France / RGPD natif",   floxia: true,       obat: true,       sage: false,      ebp: false },
    ],
  },
];

const TOTAL = SECTIONS.reduce((acc, s) => acc + s.rows.length, 0);
function countScore(key: "floxia" | "obat" | "sage" | "ebp") {
  return SECTIONS.reduce((acc, s) => acc + s.rows.filter(r => r[key] === true).length, 0);
}

const SCORES = [
  { label: "Floxia", key: "floxia" as const, color: "#F5C842", highlight: true },
  { label: "Obat",   key: "obat"   as const, color: "#60A5FA", highlight: false },
  { label: "Sage",   key: "sage"   as const, color: "rgba(var(--text-rgb),0.35)", highlight: false },
  { label: "EBP",    key: "ebp"    as const, color: "rgba(var(--text-rgb),0.25)", highlight: false },
];

function Cell({ val, isFloxia }: { val: Val; isFloxia?: boolean }) {
  if (val === true)      return <Check size={17} color={isFloxia ? "#F5C842" : "#4ADE80"} strokeWidth={2.5} style={{ margin: "0 auto" }} />;
  if (val === false)     return <X size={15} color="rgba(var(--text-rgb),0.15)" style={{ margin: "0 auto" }} />;
  if (val === "partial") return <Minus size={15} color="rgba(var(--text-rgb),0.32)" style={{ margin: "0 auto" }} />;
  return <span style={{ color: isFloxia ? "#F5C842" : "rgba(var(--text-rgb),0.45)", fontWeight: isFloxia ? 700 : 400, fontSize: ".8rem" }}>{val}</span>;
}

const COLS: { name: string; key: "floxia"|"obat"|"sage"|"ebp"; highlight: boolean }[] = [
  { name: "Floxia", key: "floxia", highlight: true },
  { name: "Obat",   key: "obat",   highlight: false },
  { name: "Sage",   key: "sage",   highlight: false },
  { name: "EBP",    key: "ebp",    highlight: false },
];

const GRID = "2fr 1fr 1fr 1fr 1fr";

export default function Comparatif() {
  return (
    <section id="comparatif" style={{ background: "transparent", padding: "6rem 0" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 6vw" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)", color: "#F5C842", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            Comparaison
          </span>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text)" }}>
            Floxia vs <span style={{ color: "#F5C842" }}>Obat, Sage, EBP</span>
          </h2>
          <p style={{ marginTop: "0.75rem", color: "rgba(var(--text-rgb),0.6)", fontSize: "1.05rem" }}>
            {TOTAL} critères. Un seul outil pensé pour les artisans du bâtiment.
          </p>
        </motion.div>

        <div className="comparatif-scores" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.9rem", marginBottom: "2.5rem" }}>
          {SCORES.map((s, i) => {
            const score = countScore(s.key);
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ background: s.highlight ? "rgba(245,200,66,0.07)" : "rgba(var(--surface-rgb),0.02)", border: `1px solid ${s.highlight ? "rgba(245,200,66,0.25)" : "rgba(var(--surface-rgb),0.06)"}`, borderRadius: "1rem", padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: s.highlight ? "#F5C842" : "rgba(var(--text-rgb),0.5)", fontWeight: 700, fontSize: ".88rem" }}>{s.label}</p>
                  <div style={{ marginTop: "0.4rem", height: 4, borderRadius: 999, background: "rgba(var(--surface-rgb),0.06)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(score / TOTAL) * 100}%`, background: s.color, borderRadius: 999 }} />
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span style={{ color: s.color, fontWeight: 900, fontSize: "1.5rem", fontFamily: "var(--font-nunito)" }}>{score}</span>
                  <span style={{ color: "rgba(var(--text-rgb),0.25)", fontSize: ".72rem" }}>/{TOTAL}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="comparatif-scroll" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="comparatif-table"
          style={{ borderRadius: "1.25rem", overflow: "hidden", border: "1px solid rgba(var(--surface-rgb),0.07)" }}>
          <div style={{ display: "grid", gridTemplateColumns: GRID, background: "rgba(var(--surface-rgb),0.04)", borderBottom: "1px solid rgba(var(--surface-rgb),0.07)" }}>
            <div style={{ padding: "1rem 1.5rem", color: "rgba(var(--text-rgb),0.3)", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>Critère</div>
            {COLS.map(col => (
              <div key={col.name} style={{ padding: "1rem 0.75rem", textAlign: "center", background: col.highlight ? "rgba(245,200,66,0.08)" : "transparent", borderLeft: `1px solid ${col.highlight ? "rgba(245,200,66,0.2)" : "rgba(var(--surface-rgb),0.05)"}`, color: col.highlight ? "#F5C842" : "rgba(var(--text-rgb),0.4)", fontWeight: 700, fontSize: ".82rem" }}>
                {col.name}
              </div>
            ))}
          </div>

          {SECTIONS.map((section, si) => (
            <div key={section.label}>
              <div style={{ display: "grid", gridTemplateColumns: GRID, background: "rgba(var(--surface-rgb),0.02)", borderTop: si > 0 ? "2px solid rgba(var(--surface-rgb),0.07)" : undefined }}>
                <div style={{ padding: "0.55rem 1.5rem", color: "#F5C842", fontSize: ".7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em" }}>{section.label}</div>
                {COLS.map((col, j) => (
                  <div key={j} style={{ background: col.highlight ? "rgba(245,200,66,0.05)" : "transparent", borderLeft: `1px solid ${col.highlight ? "rgba(245,200,66,0.15)" : "rgba(var(--surface-rgb),0.04)"}` }} />
                ))}
              </div>
              {section.rows.map((row, i) => (
                <div key={row.feature} style={{ display: "grid", gridTemplateColumns: GRID, background: i % 2 === 0 ? "rgba(var(--surface-rgb),0.01)" : "transparent", borderTop: "1px solid rgba(var(--surface-rgb),0.04)" }}>
                  <div style={{ padding: "0.8rem 1.5rem", color: "rgba(var(--text-rgb),0.78)", fontSize: ".84rem", display: "flex", alignItems: "center" }}>{row.feature}</div>
                  {COLS.map((col, j) => (
                    <div key={j} style={{ padding: "0.8rem 0.75rem", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", background: col.highlight ? "rgba(245,200,66,0.04)" : "transparent", borderLeft: `1px solid ${col.highlight ? "rgba(245,200,66,0.12)" : "rgba(var(--surface-rgb),0.04)"}` }}>
                      <Cell val={row[col.key] as Val} isFloxia={col.highlight} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
        </div>

        <p style={{ marginTop: "1rem", textAlign: "center", color: "rgba(var(--text-rgb),0.22)", fontSize: ".7rem" }}>
          * Prix Sage/EBP hors modules bâtiment additionnels &nbsp;·&nbsp; <span style={{ color: "rgba(var(--text-rgb),0.32)" }}>— Partiel</span> = option payante ou fonctionnalité limitée
        </p>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .comparatif-scores { grid-template-columns: repeat(2, 1fr) !important; }
          .comparatif-table { min-width: 600px; }
        }
      `}</style>
    </section>
  );
}
