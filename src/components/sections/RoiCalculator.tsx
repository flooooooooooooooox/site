"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Euro, PhoneIncoming, FileText, Bell, Star } from "lucide-react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 700;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prevRef.current = end;
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <span>{display.toLocaleString("fr-FR")}{suffix}</span>;
}

const PLANS = [
  { name: "Starter", price: 99, max: 15, color: "#60A5FA", desc: "Jusqu'à 15 devis/mois" },
  { name: "Artisan Pro", price: 179, max: 50, color: "#F5C842", desc: "Jusqu'à 50 devis/mois" },
  { name: "Pro Équipe", price: 249, max: 100, color: "#A78BFA", desc: "Illimité + salariés" },
];

function getPlan(devis: number, salarie: boolean) {
  if (salarie) return PLANS[2];
  if (devis <= 15) return PLANS[0];
  if (devis <= 50) return PLANS[1];
  return PLANS[2];
}

export default function RoiCalculator() {
  const [devis, setDevis] = useState(20);
  const [salarie, setSalarie] = useState(false);

  const plan = getPlan(devis, salarie);

  // 1. Devis + facture + PV + archivage : 45 min → 8 min chacun
  const gainDevisMin = devis * (45 - 8);

  // 2. Agent réceptionniste IA : économie forfaitaire mensuelle (calls entrants, qualification, booking)
  //    Estimation : 6h/mois pour un artisan solo, +2h si salariés
  const gainReceptionnisteMin = salarie ? 480 : 360;

  // 3. Relances auto (devis non signés, factures, garantie)
  const gainRelancesMin = Math.round(devis * 0.5 * 2 * 5);

  // 4. Comptabilité / scan tickets / export
  const gainComptaMin = 45;

  // 5. Conformité e-facturation 2026 + suivi hebdo CA
  const gainConformiteMin = 40;

  const totalMin = gainDevisMin + gainReceptionnisteMin + gainRelancesMin + gainComptaMin + gainConformiteMin;
  const totalH = Math.round(totalMin / 60);
  const tauxH = 45;
  const gainFinancier = Math.round(totalH * tauxH);
  const roi = gainFinancier - plan.price;

  const breakdown = [
    { icon: FileText, label: "Devis + factures + PV auto", min: gainDevisMin, color: "#F5C842" },
    { icon: PhoneIncoming, label: "Agent réceptionniste IA", min: gainReceptionnisteMin, color: "#4ADE80" },
    { icon: Bell, label: "Relances automatiques", min: gainRelancesMin, color: "#60A5FA" },
    { icon: Euro, label: "Comptabilité & scan tickets", min: gainComptaMin, color: "#A78BFA" },
    { icon: Star, label: "Conformité 2026 + suivi CA", min: gainConformiteMin, color: "#34D399" },
  ];

  function fmtMin(m: number) {
    if (m >= 60) {
      const h = Math.floor(m / 60);
      const min = m % 60;
      return min > 0 ? `${h}h${String(min).padStart(2, "0")}` : `${h}h`;
    }
    return `${m}min`;
  }

  return (
    <section style={{ background: "#0F1923", padding: "6rem 0" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 6vw" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)", color: "#F5C842", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            ROI Calculator
          </span>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "#E8EDF4" }}>
            Calculez votre <span style={{ color: "#F5C842" }}>ROI</span>
          </h2>
          <p style={{ marginTop: "0.75rem", color: "rgba(232,237,244,0.6)", fontSize: "1.05rem" }}>
            Floxia élimine <strong style={{ color: "#F5C842" }}>~80% de votre temps administratif</strong> — devis, facturation, appels, relances, comptabilité
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

          {/* Left panel */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1.25rem", padding: "2rem", backdropFilter: "blur(12px)" }}>

            {/* Slider */}
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <label style={{ color: "#E8EDF4", fontWeight: 600, fontSize: ".95rem" }}>Devis réalisés / mois</label>
                <span style={{ color: "#F5C842", fontWeight: 700, fontSize: "1.1rem" }}>{devis}</span>
              </div>
              <input type="range" min={5} max={100} value={devis} onChange={e => setDevis(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#F5C842", cursor: "pointer", height: "6px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem", color: "rgba(232,237,244,0.35)", fontSize: ".75rem" }}>
                <span>5</span><span>100</span>
              </div>
            </div>

            {/* Toggle salarié */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", padding: "0.85rem 1rem", borderRadius: "0.75rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ color: "#E8EDF4", fontWeight: 600, fontSize: ".9rem" }}>J&apos;ai des salariés</span>
              <button onClick={() => setSalarie(v => !v)}
                style={{ width: 44, height: 24, borderRadius: 999, border: "none", cursor: "pointer", background: salarie ? "#F5C842" : "rgba(255,255,255,0.12)", position: "relative", transition: "background 0.25s", flexShrink: 0 }}>
                <span style={{ position: "absolute", top: 3, left: salarie ? 22 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.25s" }} />
              </button>
            </div>

            {/* Plan recommandé */}
            <div style={{ marginBottom: "1.75rem", padding: "1rem 1.25rem", borderRadius: "0.9rem", background: `${plan.color}0D`, border: `1px solid ${plan.color}30`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ color: "rgba(232,237,244,0.45)", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Offre recommandée</p>
                <p style={{ color: plan.color, fontWeight: 800, fontSize: "1.1rem", marginTop: "0.15rem" }}>{plan.name}</p>
                <p style={{ color: "rgba(232,237,244,0.4)", fontSize: ".75rem" }}>{plan.desc}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: plan.color, fontWeight: 900, fontSize: "1.5rem", fontFamily: "var(--font-nunito)" }}>{plan.price}€</p>
                <p style={{ color: "rgba(232,237,244,0.35)", fontSize: ".7rem" }}>/ mois</p>
              </div>
            </div>

            {/* Offres disponibles */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.75rem" }}>
              {PLANS.map(p => (
                <div key={p.name} style={{ flex: 1, padding: "0.6rem 0.4rem", borderRadius: "0.6rem", background: plan.name === p.name ? `${p.color}15` : "rgba(255,255,255,0.02)", border: `1px solid ${plan.name === p.name ? p.color + "40" : "rgba(255,255,255,0.06)"}`, textAlign: "center", transition: "all 0.25s" }}>
                  <p style={{ color: plan.name === p.name ? p.color : "rgba(232,237,244,0.4)", fontWeight: 700, fontSize: ".75rem" }}>{p.name}</p>
                  <p style={{ color: plan.name === p.name ? p.color : "rgba(232,237,244,0.25)", fontWeight: 800, fontSize: ".9rem" }}>{p.price}€</p>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <p style={{ color: "rgba(232,237,244,0.4)", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Détail du temps récupéré</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {breakdown.map(b => {
                const Icon = b.icon;
                return (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Icon size={13} color={b.color} style={{ flexShrink: 0 }} />
                    <span style={{ color: "rgba(232,237,244,0.6)", fontSize: ".8rem", flex: 1 }}>{b.label}</span>
                    <span style={{ color: b.color, fontWeight: 700, fontSize: ".82rem", whiteSpace: "nowrap" }}>{fmtMin(b.min)}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Mini icons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {[
                { icon: FileText, label: "Devis auto", val: "8 min", color: "#F5C842" },
                { icon: PhoneIncoming, label: "Appels IA", val: "24h/24", color: "#4ADE80" },
                { icon: Bell, label: "Relances auto", val: "100%", color: "#60A5FA" },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.9rem", padding: "0.9rem", textAlign: "center" }}>
                    <Icon size={18} color={s.color} style={{ margin: "0 auto 0.4rem" }} />
                    <div style={{ color: s.color, fontWeight: 800, fontSize: "0.95rem" }}>{s.val}</div>
                    <div style={{ color: "rgba(232,237,244,0.4)", fontSize: "0.68rem", marginTop: "0.15rem" }}>{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Big metrics */}
            {[
              { icon: Clock, label: "Temps admin récupéré / mois", value: totalH, suffix: "h", color: "#F5C842", sub: `${totalMin} min sur 5 postes automatisés` },
              { icon: Euro, label: "Gain financier estimé", value: gainFinancier, suffix: "€", color: "#4ADE80", sub: `à ${tauxH} €/h — taux artisan moyen` },
              { icon: TrendingUp, label: "ROI net vs Floxia", value: roi, suffix: "€", color: roi >= 0 ? "#4ADE80" : "#F87171", sub: `après abonnement ${plan.name} ${plan.price}€/mois` },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div key={m.label} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem", padding: "1.4rem 1.6rem", display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${m.color}15`, border: `1px solid ${m.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={22} color={m.color} />
                  </div>
                  <div>
                    <p style={{ color: "rgba(232,237,244,0.5)", fontSize: ".78rem", marginBottom: "0.2rem" }}>{m.label}</p>
                    <p style={{ color: m.color, fontWeight: 800, fontSize: "1.6rem", fontFamily: "var(--font-nunito)", lineHeight: 1 }}>
                      <AnimatedNumber value={m.value} suffix={m.suffix} />
                    </p>
                    <p style={{ color: "rgba(232,237,244,0.35)", fontSize: ".72rem", marginTop: "0.2rem" }}>{m.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
