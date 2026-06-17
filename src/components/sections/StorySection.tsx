"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, FileText, FileCheck, TrendingUp, LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    icon: Mic,
    tag: "Étape 1",
    title: "Parlez à Floxia",
    desc: "Envoyez un vocal WhatsApp ou appelez. Floxia comprend le contexte chantier instantanément.",
  },
  {
    icon: FileText,
    tag: "Étape 2",
    title: "L'IA génère vos documents",
    desc: "Devis PDF complet, facture conforme, rapport de chantier — en moins de 3 minutes.",
  },
  {
    icon: FileCheck,
    tag: "Étape 3",
    title: "Votre client reçoit & signe",
    desc: "Email ou SMS automatique avec lien de signature électronique mobile-friendly.",
  },
  {
    icon: TrendingUp,
    tag: "Étape 4",
    title: "Vous encaissez plus vite",
    desc: "Relances automatiques, suivi de paiement, trésorerie prévisionnelle en temps réel.",
  },
];


export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Map scroll progress to line height percentage
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} style={{ background: "#0F1923", padding: "7rem 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4.5rem" }}
        >
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#E8EDF4", marginBottom: ".75rem" }}>
            Comment ça <span style={{ color: "#F5C842" }}>marche</span>
          </h2>
          <p style={{ color: "rgba(232,237,244,0.6)", fontSize: "1.05rem" }}>
            De la parole au paiement — en automatique.
          </p>
        </motion.div>

        <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Timeline column */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "2rem" }}>
            {/* Base line */}
            <div style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: "2px",
              background: "rgba(255,255,255,0.1)",
              transform: "translateX(-50%)",
            }} />
            {/* Animated gold fill line */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: "2px",
                height: lineHeight,
                background: "linear-gradient(to bottom, #F5C842, rgba(245,200,66,0.4))",
                transform: "translateX(-50%)",
                transformOrigin: "top",
              }}
            />

            {/* Dots */}
            {STEPS.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.18 }}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#F5C842",
                  color: "#1E2B45",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: ".85rem",
                  fontFamily: "var(--font-nunito)",
                  zIndex: 1,
                  marginBottom: i < STEPS.length - 1 ? "5.5rem" : 0,
                  boxShadow: "0 0 0 6px rgba(245,200,66,0.1), 0 0 20px rgba(245,200,66,0.25)",
                  flexShrink: 0,
                  position: "relative",
                  animation: "dotGlow 2.4s ease-in-out infinite",
                }}
              >
                {i + 1}
              </motion.div>
            ))}
          </div>

          {/* Step cards */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: i * 0.18 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "1rem",
                    padding: "1.75rem 2rem",
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    background: "rgba(245,200,66,0.08)",
                    border: "1px solid rgba(245,200,66,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={22} color="#F5C842" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span style={{
                      display: "inline-block",
                      fontSize: ".72rem",
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase" as const,
                      color: "rgba(245,200,66,0.7)",
                      background: "rgba(245,200,66,0.06)",
                      border: "1px solid rgba(245,200,66,0.15)",
                      borderRadius: "100px",
                      padding: ".2rem .75rem",
                      marginBottom: ".6rem",
                    }}>
                      {step.tag}
                    </span>
                    <h3 style={{
                      fontFamily: "var(--font-nunito)",
                      fontWeight: 800,
                      fontSize: "1.15rem",
                      color: "#E8EDF4",
                      marginBottom: ".5rem",
                    }}>
                      {step.title}
                    </h3>
                    <p style={{ color: "rgba(232,237,244,0.6)", fontSize: ".92rem", lineHeight: 1.65 }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dotGlow {
          0%, 100% { box-shadow: 0 0 0 6px rgba(245,200,66,0.1), 0 0 20px rgba(245,200,66,0.25); }
          50% { box-shadow: 0 0 0 10px rgba(245,200,66,0.05), 0 0 32px rgba(245,200,66,0.45); }
        }
      `}</style>
    </section>
  );
}
