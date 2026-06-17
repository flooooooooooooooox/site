"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Euro, PhoneIncoming, FileText, Bell } from "lucide-react";

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

export default function RoiCalculator() {
  const [devis, setDevis] = useState(20);
  const [salarie, setSalarie] = useState(false);

  // Temps gagné par devis/facture/PV complet : 45 min → 8 min avec Floxia
  const gainDevisMin = devis * (45 - 8);

  // Agent réceptionniste : ~3 appels entrants / devis en moyenne, 10 min chacun → 2 min avec IA
  const appelsEntrants = devis * 3;
  const gainAppelsMin = appelsEntrants * (10 - 2);

  // Relances auto : 2 relances / devis non signé (50%), 5 min chacune → 0 avec Floxia
  const gainRelancesMin = Math.round(devis * 0.5 * 2 * 5);

  // Comptabilité / scan tickets / export : forfait 45 min/mois sans Floxia → 5 min
  const gainComptaMin = 40;

  // Suivi chantier / rapports / archivage : 3 min / devis récupérés
  const gainArchivageMin = devis * 3;

  // Conformité e-facturation 2026 : forfait 30 min/mois sans Floxia → 0
  const gainConformiteMin = 30;

  // Total
  const totalGagneMin = gainDevisMin + gainAppelsMin + gainRelancesMin + gainComptaMin + gainArchivageMin + gainConformiteMin;
  const totalGagneH = Math.round(totalGagneMin / 60);

  // Taux horaire : artisan seul = 45 €/h, avec salarié = 35 €/h (temps admin du salarié)
  const tauxH = salarie ? 35 : 45;
  const gainFinancier = Math.round(totalGagneH * tauxH);
  const abonnement = salarie ? 249 : 179;
  const roi = gainFinancier - abonnement;

  const breakdown = [
    { label: "Devis + factures + PV auto", min: gainDevisMin },
    { label: `Agent réceptionniste (${appelsEntrants} appels)`, min: gainAppelsMin },
    { label: "Relances automatiques", min: gainRelancesMin },
    { label: "Comptabilité & scan tickets", min: gainComptaMin },
    { label: "Archivage & rapports chantier", min: gainArchivageMin },
    { label: "Conformité e-facturation 2026", min: gainConformiteMin },
  ];

  const metrics = [
    {
      icon: Clock,
      label: "Temps admin récupéré / mois",
      value: totalGagneH,
      suffix: "h",
      color: "#F5C842",
      sub: `${totalGagneMin} min récupérées sur 6 postes`,
    },
    {
      icon: Euro,
      label: "Gain financier estimé",
      value: gainFinancier,
      suffix: "€",
      color: "#4ADE80",
      sub: `à ${tauxH} €/h — ${Math.round((totalGagneMin / (devis * 60)) * 100)}% du temps admin éliminé`,
    },
    {
      icon: TrendingUp,
      label: "ROI net vs Floxia",
      value: roi,
      suffix: "€",
      color: roi > 0 ? "#4ADE80" : "#F87171",
      sub: `après abonnement ${salarie ? "Pro Équipe" : "Artisan Pro"} ${abonnement}€/mois`,
    },
  ];

  return (
    <section style={{ background: "#0F1923", padding: "6rem 0" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 6vw" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1.25rem", padding: "2rem", backdropFilter: "blur(12px)" }}
          >
            {/* Slider devis */}
            <div style={{ marginBottom: "2rem" }}>
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
              <button
                onClick={() => setSalarie(v => !v)}
                style={{ width: 44, height: 24, borderRadius: 999, border: "none", cursor: "pointer", background: salarie ? "#F5C842" : "rgba(255,255,255,0.12)", position: "relative", transition: "background 0.25s", flexShrink: 0 }}
              >
                <span style={{ position: "absolute", top: 3, left: salarie ? 22 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.25s" }} />
              </button>
            </div>

            {/* Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <p style={{ color: "rgba(232,237,244,0.4)", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Détail du temps récupéré</p>
              {breakdown.map(b => (
                <div key={b.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "rgba(232,237,244,0.6)", fontSize: ".8rem" }}>{b.label}</span>
                  <span style={{ color: "#F5C842", fontWeight: 700, fontSize: ".82rem", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
                    {b.min >= 60 ? `${Math.round(b.min / 60)}h${b.min % 60 > 0 ? String(b.min % 60).padStart(2, "0") : ""}` : `${b.min}min`}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "0.75rem", background: "rgba(245,200,66,0.05)", border: "1px solid rgba(245,200,66,0.12)" }}>
              <p style={{ color: "rgba(232,237,244,0.65)", fontSize: ".82rem", lineHeight: 1.6 }}>
                Avec Floxia, vous éliminez <strong style={{ color: "#F5C842" }}>~80% de l&apos;administratif</strong> : l&apos;IA gère les appels, rédige les devis en 8 min, facture automatiquement et relance à votre place.
              </p>
            </div>
          </motion.div>

          {/* Right metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Mini stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "0.25rem" }}>
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

            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "1rem", padding: "1.4rem 1.6rem", display: "flex", alignItems: "center", gap: "1.2rem" }}
                >
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

      <style>{`
        @media (max-width: 768px) {
          .roi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
