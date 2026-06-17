"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingUp, Euro } from "lucide-react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 600;
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

  return (
    <span>
      {display.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

export default function RoiCalculator() {
  const [devis, setDevis] = useState(20);
  const [tempsParDevis, setTempsParDevis] = useState(90);

  const tempsGagneMin = devis * (tempsParDevis - 8);
  const tempsGagneH = Math.round(tempsGagneMin / 60);
  const gainFinancier = Math.round(tempsGagneH * 45);
  const roi = gainFinancier - 179;

  const metrics = [
    {
      icon: Clock,
      label: "Temps gagné / mois",
      value: tempsGagneH,
      suffix: "h",
      color: "#F5C842",
      sub: `${tempsGagneMin} minutes récupérées`,
    },
    {
      icon: Euro,
      label: "Gain financier estimé",
      value: gainFinancier,
      suffix: "€",
      color: "#4ADE80",
      sub: "à 45 €/h (taux artisan moyen)",
    },
    {
      icon: TrendingUp,
      label: "ROI net vs Floxia",
      value: roi,
      suffix: "€",
      color: roi > 0 ? "#4ADE80" : "#F87171",
      sub: "après abonnement Artisan Pro 179€/mois",
    },
  ];

  return (
    <section style={{ background: "#0F1923", padding: "6rem 0" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 6vw" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "6px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(245,200,66,0.25)",
              background: "rgba(245,200,66,0.07)",
              color: "#F5C842",
              fontSize: ".78rem",
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            ROI Calculator
          </span>
          <h2
            className="font-black text-[clamp(2rem,4vw,3rem)]"
            style={{ fontFamily: "var(--font-nunito)", color: "#E8EDF4" }}
          >
            Calculez votre{" "}
            <span style={{ color: "#F5C842" }}>ROI</span>
          </h2>
          <p style={{ marginTop: "0.75rem", color: "rgba(232,237,244,0.6)" }}>
            Voyez combien Floxia vous rapporte chaque mois
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2.5rem", alignItems: "start" }}>
          {/* Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "1.25rem",
              padding: "2rem",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <label
                  htmlFor="devis-slider"
                  style={{ color: "#E8EDF4", fontWeight: 600, fontSize: ".95rem" }}
                >
                  Nombre de devis / mois
                </label>
                <span style={{ color: "#F5C842", fontWeight: 700, fontSize: "1.1rem" }}>{devis}</span>
              </div>
              <input
                id="devis-slider"
                type="range"
                min={5}
                max={100}
                value={devis}
                onChange={(e) => setDevis(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#F5C842",
                  cursor: "pointer",
                  height: "6px",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem", color: "rgba(232,237,244,0.35)", fontSize: ".75rem" }}>
                <span>5</span><span>100</span>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <label
                  htmlFor="temps-slider"
                  style={{ color: "#E8EDF4", fontWeight: 600, fontSize: ".95rem" }}
                >
                  Temps actuel par devis
                </label>
                <span style={{ color: "#F5C842", fontWeight: 700, fontSize: "1.1rem" }}>{tempsParDevis} min</span>
              </div>
              <input
                id="temps-slider"
                type="range"
                min={30}
                max={180}
                value={tempsParDevis}
                onChange={(e) => setTempsParDevis(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: "#F5C842",
                  cursor: "pointer",
                  height: "6px",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem", color: "rgba(232,237,244,0.35)", fontSize: ".75rem" }}>
                <span>30 min</span><span>3h</span>
              </div>
            </div>

            <div
              style={{ marginTop: "2rem", padding: "1rem", borderRadius: "0.75rem", background: "rgba(245,200,66,0.05)", border: "1px solid rgba(245,200,66,0.12)" }}
            >
              <p style={{ color: "rgba(232,237,244,0.6)", fontSize: ".82rem", lineHeight: 1.6 }}>
                Avec Floxia, chaque devis prend <strong style={{ color: "#F5C842" }}>8 minutes</strong> au lieu de {tempsParDevis} minutes.
                Sur {devis} devis, vous récupérez <strong style={{ color: "#F5C842" }}>{tempsGagneH}h</strong> par mois.
              </p>
            </div>
          </motion.div>

          {/* Metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "1rem",
                    padding: "1.4rem 1.6rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.2rem",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: `${m.color}15`,
                      border: `1px solid ${m.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
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
