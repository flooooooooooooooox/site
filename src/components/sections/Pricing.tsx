"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PLANS = [
  {
    name: "Essentiel",
    price: 99,
    setup: 299,
    popular: false,
    features: [
      "Devis & factures WhatsApp",
      "50 documents / mois",
      "Signature électronique",
      "Support email",
      "1 utilisateur",
    ],
  },
  {
    name: "Artisan Pro",
    price: 179,
    setup: 349,
    popular: true,
    features: [
      "Tout Essentiel inclus",
      "Standard IA 24h/24",
      "Documents illimités",
      "Relances automatiques",
      "Avis Google automatisés",
      "Prévisions trésorerie",
      "3 utilisateurs",
    ],
  },
  {
    name: "PME Premium",
    price: 349,
    setup: 499,
    popular: false,
    features: [
      "Tout Artisan Pro inclus",
      "Multi-chantiers",
      "API & intégrations",
      "Manager de compte dédié",
      "SLA 99.9%",
      "Utilisateurs illimités",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" style={{ background: "#0F1923", padding: "6rem 0" }}>
      <div className="max-w-6xl mx-auto px-[6vw]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
            Tarifs
          </span>
          <h2
            className="font-black text-[clamp(2rem,4vw,3rem)]"
            style={{ fontFamily: "var(--font-nunito)", color: "#E8EDF4" }}
          >
            Des offres simples,{" "}
            <span style={{ color: "#F5C842" }}>sans surprise</span>
          </h2>
          <p className="mt-3 text-lg" style={{ color: "rgba(232,237,244,0.6)" }}>
            Résiliable à tout moment après 3 mois · 14 jours d&apos;essai gratuit
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{ position: "relative" }}
            >
              {/* Blurred gold glow behind popular card */}
              {plan.popular && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "300px",
                    height: "300px",
                    background: "radial-gradient(circle, rgba(245,200,66,0.12), transparent)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />
              )}

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: plan.popular
                    ? "1px solid rgba(245,200,66,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  transform: plan.popular ? "scale(1.04)" : "scale(1)",
                  boxShadow: plan.popular
                    ? "inset 0 0 60px rgba(245,200,66,0.03), 0 0 40px rgba(245,200,66,0.08)"
                    : "none",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  if (plan.popular) {
                    el.style.boxShadow = "inset 0 0 80px rgba(245,200,66,0.06), 0 0 60px rgba(245,200,66,0.14)";
                  } else {
                    el.style.boxShadow = "inset 0 0 40px rgba(245,200,66,0.02), 0 0 30px rgba(245,200,66,0.05)";
                    el.style.borderColor = "rgba(255,255,255,0.14)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  if (plan.popular) {
                    el.style.boxShadow = "inset 0 0 60px rgba(245,200,66,0.03), 0 0 40px rgba(245,200,66,0.08)";
                  } else {
                    el.style.boxShadow = "none";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                  }
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#F5C842",
                      color: "#0F1923",
                      fontSize: ".72rem",
                      fontWeight: 800,
                      padding: "5px 16px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                      whiteSpace: "nowrap",
                      animation: "badgePulse 2.4s ease-in-out infinite",
                    }}
                  >
                    Le plus vendu
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontWeight: 800,
                      fontSize: "1.15rem",
                      color: plan.popular ? "#F5C842" : "#E8EDF4",
                      marginBottom: "1rem",
                    }}
                  >
                    {plan.name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-nunito)",
                        fontWeight: 900,
                        fontSize: "2.6rem",
                        color: "#E8EDF4",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}€
                    </span>
                    <span style={{ color: "rgba(232,237,244,0.4)", fontSize: ".85rem" }}>/mois</span>
                  </div>
                  <p style={{ color: "rgba(232,237,244,0.35)", fontSize: ".78rem", marginTop: "0.4rem" }}>
                    + {plan.setup}€ de setup (unique)
                  </p>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <CheckCircle
                        size={16}
                        color={plan.popular ? "#F5C842" : "rgba(245,200,66,0.6)"}
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      />
                      <span style={{ color: "rgba(232,237,244,0.75)", fontSize: ".88rem", lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://calendly.com/afele1845/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.85rem",
                    borderRadius: "0.75rem",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: ".9rem",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background: plan.popular ? "#F5C842" : "transparent",
                    color: plan.popular ? "#0F1923" : "#E8EDF4",
                    border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    if (!plan.popular) {
                      el.style.background = "rgba(255,255,255,0.06)";
                      el.style.borderColor = "rgba(255,255,255,0.3)";
                    } else {
                      el.style.background = "#f0be2a";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    if (!plan.popular) {
                      el.style.background = "transparent";
                      el.style.borderColor = "rgba(255,255,255,0.15)";
                    } else {
                      el.style.background = "#F5C842";
                    }
                  }}
                >
                  Réserver une démo gratuite
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(245,200,66,0); }
        }
      `}</style>
    </section>
  );
}
