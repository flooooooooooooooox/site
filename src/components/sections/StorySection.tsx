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
    title: "Parlez à Cirrion",
    desc: "Envoyez un vocal WhatsApp ou appelez. Cirrion comprend le contexte chantier instantanément.",
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
    <section ref={sectionRef} style={{ background: "transparent", padding: "clamp(3.5rem, 9vw, 7rem) 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4.5rem" }}
        >
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--text)", marginBottom: ".75rem" }}>
            Comment ça <span style={{ color: "#2455D6" }}>marche</span>
          </h2>
          <p style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: "1.05rem" }}>
            De la parole au paiement — en automatique.
          </p>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Base line — traverse les pastilles numérotées */}
          <div className="story-line" style={{
            position: "absolute",
            top: "20px",
            bottom: "20px",
            width: "2px",
            background: "rgba(var(--surface-rgb),0.1)",
            borderRadius: "2px",
          }} />
          {/* Ligne dorée animée au scroll */}
          <motion.div className="story-line" style={{
            position: "absolute",
            top: "20px",
            maxHeight: "calc(100% - 40px)",
            width: "2px",
            height: lineHeight,
            background: "linear-gradient(to bottom, #2455D6, rgba(36,85,214,0.35))",
            borderRadius: "2px",
            boxShadow: "0 0 12px rgba(36,85,214,0.35)",
          }} />

          {/* Step rows : pastille + carte alignées */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="story-row"
                >
                  {/* Pastille numérotée sur la ligne */}
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#2455D6",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: ".85rem",
                    fontFamily: "var(--font-nunito)",
                    zIndex: 1,
                    boxShadow: "0 0 0 6px rgba(36,85,214,0.1), 0 0 20px rgba(36,85,214,0.25)",
                    flexShrink: 0,
                    position: "relative",
                    animation: "dotGlow 2.4s ease-in-out infinite",
                  }}>
                    {i + 1}
                  </div>

                  {/* Carte */}
                  <div style={{
                    flex: 1,
                    minWidth: 0,
                    background: "rgba(var(--surface-rgb),0.03)",
                    border: "1px solid rgba(var(--surface-rgb),0.07)",
                    borderRadius: "1rem",
                    padding: "clamp(1.2rem, 3vw, 1.75rem) clamp(1.2rem, 3.5vw, 2rem)",
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                    backdropFilter: "blur(10px)",
                  }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                    background: "rgba(36,85,214,0.08)",
                    border: "1px solid rgba(36,85,214,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={22} color="#2455D6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span style={{
                      display: "inline-block",
                      fontSize: ".72rem",
                      fontWeight: 700,
                      letterSpacing: ".1em",
                      textTransform: "uppercase" as const,
                      color: "rgba(36,85,214,0.7)",
                      background: "rgba(36,85,214,0.06)",
                      border: "1px solid rgba(36,85,214,0.15)",
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
                      color: "var(--text)",
                      marginBottom: ".5rem",
                    }}>
                      {step.title}
                    </h3>
                    <p style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: ".92rem", lineHeight: 1.65 }}>
                      {step.desc}
                    </p>
                  </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dotGlow {
          0%, 100% { box-shadow: 0 0 0 6px rgba(36,85,214,0.08), 0 0 16px rgba(36,85,214,0.2); }
          50% { box-shadow: 0 0 0 7px rgba(36,85,214,0.1), 0 0 20px rgba(36,85,214,0.28); }
        }
        .story-row {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }
        .story-line { left: 19px; }
        @media (max-width: 640px) {
          .story-row { gap: 0.9rem; }
          .story-row > div:first-child {
            width: 32px !important;
            height: 32px !important;
            font-size: 0.75rem !important;
          }
          .story-line { left: 15px; }
        }
      `}</style>
    </section>
  );
}
