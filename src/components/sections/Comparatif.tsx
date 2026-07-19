"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Minus, Search, Sparkles } from "lucide-react";

type Val = true | false | "partial" | string;
type Row = { feature: string; floxia: Val; obat: Val; sage: Val; ebp: Val };

// floxia | obat | sage | ebp
const SECTIONS: { label: string; rows: Row[] }[] = [
  {
    label: "Devis & Facturation",
    rows: [
      { feature: "Devis par vocal WhatsApp en 3 min",       floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Pré-modèles de devis IA sur l'app web",   floxia: true,       obat: "partial",  sage: false,      ebp: false },
      { feature: "Devis en moins de 8 minutes",             floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Factures & PV de réception automatisés",  floxia: true,       obat: false,      sage: false,      ebp: false },
      { feature: "Signature électronique légale",           floxia: true,       obat: "partial",  sage: false,      ebp: false },
      { feature: "Réforme e-facturation 2026 (e-reporting)",floxia: true,       obat: true,       sage: true,       ebp: true  },
      { feature: "Assistant vocal IA (TVA, normes, admin)", floxia: true,       obat: false,      sage: false,      ebp: false },
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
  { label: "Cirrion", key: "floxia" as const, color: "#2455D6", highlight: true },
  { label: "Obat",   key: "obat"   as const, color: "#60A5FA", highlight: false },
  { label: "Sage",   key: "sage"   as const, color: "rgba(var(--text-rgb),0.35)", highlight: false },
  { label: "EBP",    key: "ebp"    as const, color: "rgba(var(--text-rgb),0.25)", highlight: false },
];

function Cell({ val, isFloxia }: { val: Val; isFloxia?: boolean }) {
  if (val === true)      return <Check size={17} color={isFloxia ? "#2455D6" : "#4ADE80"} strokeWidth={2.5} style={{ margin: "0 auto" }} />;
  if (val === false)     return <X size={15} color="rgba(var(--text-rgb),0.15)" style={{ margin: "0 auto" }} />;
  if (val === "partial") return <Minus size={15} color="rgba(var(--text-rgb),0.32)" style={{ margin: "0 auto" }} />;
  return <span style={{ color: isFloxia ? "#2455D6" : "rgba(var(--text-rgb),0.45)", fontWeight: isFloxia ? 700 : 400, fontSize: ".8rem" }}>{val}</span>;
}

const COLS: { name: string; key: "floxia"|"obat"|"sage"|"ebp"; highlight: boolean }[] = [
  { name: "Cirrion", key: "floxia", highlight: true },
  { name: "Obat",   key: "obat",   highlight: false },
  { name: "Sage",   key: "sage",   highlight: false },
  { name: "EBP",    key: "ebp",    highlight: false },
];

// Logiciels sélectionnables — avec alias pour la recherche.
// Les logiciels sans colonne dédiée (Kolecto, Axonaut…) tombent sur "autre" :
// on montre alors les exclusivités Cirrion (ce qu'aucun leader ne propose).
type CompetitorKey = "obat" | "sage" | "ebp" | "autre";
const SOFTWARE_LIST: { label: string; key: CompetitorKey; aliases: string[] }[] = [
  { label: "Obat", key: "obat", aliases: ["obat"] },
  { label: "Sage / Batigest", key: "sage", aliases: ["sage", "batigest", "sage batigest", "batigest connect"] },
  { label: "EBP", key: "ebp", aliases: ["ebp", "ebp batiment"] },
  { label: "Kolecto", key: "autre", aliases: ["kolecto"] },
  { label: "Axonaut", key: "autre", aliases: ["axonaut"] },
  { label: "Tolteck", key: "autre", aliases: ["tolteck"] },
  { label: "Excel / papier", key: "autre", aliases: ["excel", "papier", "word", "rien", "aucun"] },
  { label: "Autre logiciel", key: "autre", aliases: ["autre"] },
];

const COMPETITOR_NAMES: Record<Exclude<CompetitorKey, "autre">, string> = {
  obat: "Obat", sage: "Sage / Batigest", ebp: "EBP",
};

function missingFeatures(key: CompetitorKey) {
  const rows = SECTIONS.flatMap(s => s.rows);
  if (key === "autre") {
    // exclusivités : aucune des 3 références ne le fait
    return rows.filter(r => r.obat === false && r.sage === false && r.ebp === false).map(r => ({ feature: r.feature, partial: false }));
  }
  return rows
    .filter(r => r[key] === false || r[key] === "partial")
    .map(r => ({ feature: r.feature, partial: r[key] === "partial" }));
}

export default function Comparatif() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{ label: string; key: CompetitorKey } | null>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SOFTWARE_LIST;
    return SOFTWARE_LIST.filter(s => s.label.toLowerCase().includes(q) || s.aliases.some(a => a.includes(q)));
  }, [query]);

  const missing = selected ? missingFeatures(selected.key) : [];
  const duelCols = selected && selected.key !== "autre"
    ? COLS.filter(c => c.highlight || c.key === selected.key)
    : COLS;
  const grid = duelCols.length === 2 ? "2fr 1fr 1fr" : "2fr 1fr 1fr 1fr 1fr";

  return (
    <section id="comparatif" style={{ background: "transparent", padding: "clamp(3rem, 8vw, 6rem) 0" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 6vw" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)", color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            Comparaison
          </span>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text)" }}>
            Cirrion vs <span style={{ color: "#2455D6" }}>Obat, Sage, EBP</span>
          </h2>
          <p style={{ marginTop: "0.75rem", color: "rgba(var(--text-rgb),0.6)", fontSize: "1.05rem" }}>
            {TOTAL} critères. Un seul outil pensé pour les artisans du bâtiment.
          </p>
        </motion.div>

        {/* ===== Sélecteur : quel logiciel utilisez-vous ? ===== */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ maxWidth: "44rem", margin: "0 auto 2.5rem", textAlign: "center" }}>
          <p style={{ color: "var(--text)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.9rem" }}>
            Quel logiciel utilisez-vous aujourd&apos;hui ?
          </p>
          <div style={{
            display: "flex", alignItems: "center", gap: "0.6rem",
            background: "rgba(255,255,255,0.75)", border: "1px solid rgba(36,85,214,0.2)",
            borderRadius: "999px", padding: "0.7rem 1.2rem", marginBottom: "0.9rem",
            boxShadow: "0 6px 20px -8px rgba(27,42,74,0.12)",
          }}>
            <Search size={17} color="rgba(27,42,74,0.4)" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); }}
              placeholder="Tapez le nom : Obat, Batigest, EBP, Kolecto, Excel…"
              aria-label="Rechercher votre logiciel actuel"
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "0.92rem", color: "var(--text)", minWidth: 0 }}
            />
            {selected && (
              <button onClick={() => { setSelected(null); setQuery(""); }}
                style={{ border: "none", background: "rgba(36,85,214,0.1)", color: "#2455D6", borderRadius: "999px", padding: "0.3rem 0.8rem", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
                Réinitialiser
              </button>
            )}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
            {suggestions.map(s => {
              const isActive = selected?.label === s.label;
              return (
                <button key={s.label}
                  onClick={() => { setSelected({ label: s.label, key: s.key }); setQuery(""); }}
                  style={{
                    padding: "0.45rem 1rem", borderRadius: "999px", cursor: "pointer",
                    border: `1px solid ${isActive ? "#2455D6" : "rgba(36,85,214,0.2)"}`,
                    background: isActive ? "#2455D6" : "rgba(255,255,255,0.6)",
                    color: isActive ? "#FFFFFF" : "#2455D6",
                    fontSize: "0.8rem", fontWeight: 700, transition: "all 0.2s",
                  }}>
                  {s.label}
                </button>
              );
            })}
            {suggestions.length === 0 && (
              <button onClick={() => { setSelected({ label: query.trim() || "votre logiciel", key: "autre" }); setQuery(""); }}
                style={{ padding: "0.45rem 1rem", borderRadius: "999px", cursor: "pointer", border: "1px dashed rgba(36,85,214,0.35)", background: "transparent", color: "#2455D6", fontSize: "0.8rem", fontWeight: 700 }}>
                Comparer avec « {query.trim()} »
              </button>
            )}
          </div>
        </motion.div>

        {/* ===== Panneau : ce que Cirrion a en plus ===== */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              style={{
                maxWidth: "56rem", margin: "0 auto 2.5rem",
                borderRadius: "1.25rem", border: "1px solid rgba(36,85,214,0.25)",
                background: "linear-gradient(145deg, rgba(36,85,214,0.07), rgba(255,255,255,0.5))",
                backdropFilter: "blur(12px)", padding: "clamp(1.3rem, 3vw, 2rem)",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <Sparkles size={18} color="#2455D6" />
                <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.05rem", color: "var(--text)" }}>
                  {selected.key === "autre"
                    ? <>Ce que Cirrion fait et qu&apos;aucun logiciel classique ne propose</>
                    : <>Ce que Cirrion a en plus de <span style={{ color: "#2455D6" }}>{selected.label}</span></>}
                </h3>
                <span style={{ marginLeft: "auto", background: "#2455D6", color: "#fff", borderRadius: "999px", padding: "0.2rem 0.7rem", fontSize: "0.75rem", fontWeight: 800 }}>
                  +{missing.length} fonctionnalités
                </span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0.5rem 1.25rem" }}>
                {missing.map(m => (
                  <li key={m.feature} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.84rem", color: "rgba(var(--text-rgb),0.78)", lineHeight: 1.45 }}>
                    <Check size={15} color="#2455D6" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "0.15em" }} />
                    <span>
                      {m.feature}
                      {m.partial && <span style={{ color: "rgba(var(--text-rgb),0.4)", fontSize: "0.72rem" }}> (limité chez {selected.key !== "autre" ? COMPETITOR_NAMES[selected.key] : "eux"})</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "1.3rem", textAlign: "center" }}>
                <a href="https://calendly.com/afele1845/30min" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem 1.8rem", borderRadius: "999px", background: "#2455D6", color: "#fff", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}>
                  Voir la différence en démo — 30 min →
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="comparatif-scores" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.9rem", marginBottom: "2.5rem" }}>
          {SCORES.map((s, i) => {
            const score = countScore(s.key);
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ background: s.highlight ? "rgba(36,85,214,0.07)" : "rgba(var(--surface-rgb),0.02)", border: `1px solid ${s.highlight ? "rgba(36,85,214,0.25)" : "rgba(var(--surface-rgb),0.06)"}`, borderRadius: "1rem", padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: s.highlight ? "#2455D6" : "rgba(var(--text-rgb),0.5)", fontWeight: 700, fontSize: ".88rem" }}>{s.label}</p>
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
          <div style={{ display: "grid", gridTemplateColumns: grid, background: "rgba(var(--surface-rgb),0.04)", borderBottom: "1px solid rgba(var(--surface-rgb),0.07)" }}>
            <div style={{ padding: "1rem 1.5rem", color: "rgba(var(--text-rgb),0.3)", fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>Critère</div>
            {duelCols.map(col => (
              <div key={col.name} style={{ padding: "1rem 0.75rem", textAlign: "center", background: col.highlight ? "rgba(36,85,214,0.08)" : "transparent", borderLeft: `1px solid ${col.highlight ? "rgba(36,85,214,0.2)" : "rgba(var(--surface-rgb),0.05)"}`, color: col.highlight ? "#2455D6" : "rgba(var(--text-rgb),0.4)", fontWeight: 700, fontSize: ".82rem" }}>
                {col.name}
              </div>
            ))}
          </div>

          {SECTIONS.map((section, si) => (
            <div key={section.label}>
              <div style={{ display: "grid", gridTemplateColumns: grid, background: "rgba(var(--surface-rgb),0.02)", borderTop: si > 0 ? "2px solid rgba(var(--surface-rgb),0.07)" : undefined }}>
                <div style={{ padding: "0.55rem 1.5rem", color: "#2455D6", fontSize: ".7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em" }}>{section.label}</div>
                {duelCols.map((col, j) => (
                  <div key={j} style={{ background: col.highlight ? "rgba(36,85,214,0.05)" : "transparent", borderLeft: `1px solid ${col.highlight ? "rgba(36,85,214,0.15)" : "rgba(var(--surface-rgb),0.04)"}` }} />
                ))}
              </div>
              {section.rows.map((row, i) => (
                <div key={row.feature} style={{ display: "grid", gridTemplateColumns: grid, background: i % 2 === 0 ? "rgba(var(--surface-rgb),0.01)" : "transparent", borderTop: "1px solid rgba(var(--surface-rgb),0.04)" }}>
                  <div style={{ padding: "0.8rem 1.5rem", color: "rgba(var(--text-rgb),0.78)", fontSize: ".84rem", display: "flex", alignItems: "center" }}>{row.feature}</div>
                  {duelCols.map((col, j) => (
                    <div key={j} style={{ padding: "0.8rem 0.75rem", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", background: col.highlight ? "rgba(36,85,214,0.04)" : "transparent", borderLeft: `1px solid ${col.highlight ? "rgba(36,85,214,0.12)" : "rgba(var(--surface-rgb),0.04)"}` }}>
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
