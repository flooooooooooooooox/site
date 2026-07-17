"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, FileText, FileCheck, TrendingUp, LucideIcon } from "lucide-react";
import { CloudBadge } from "@/components/ui/CloudBadge";

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
    <section ref={sectionRef} style={{ background: "transparent", padding: "clamp(1.5rem, 4vw, 3rem) 0 clamp(1.5rem, 4vw, 2.5rem)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
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
                  {/* Nuage numéroté sur la ligne — se remplit de bleu quand on l'atteint */}
                  <div style={{ position: "relative", zIndex: 1, flexShrink: 0, filter: "drop-shadow(0 4px 12px rgba(36,85,214,0.3))" }}>
                    <CloudBadge size={44} fill="rgba(255,255,255,0.9)" border="rgba(36,85,214,0.3)">
                      <span style={{ color: "#2455D6", fontWeight: 900, fontSize: ".82rem", fontFamily: "var(--font-nunito)" }}>{i + 1}</span>
                    </CloudBadge>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-45% 0px -45% 0px" }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      style={{ position: "absolute", inset: 0 }}
                    >
                      <CloudBadge size={44} fill="#2455D6">
                        <span style={{ color: "#FFFFFF", fontWeight: 900, fontSize: ".82rem", fontFamily: "var(--font-nunito)" }}>{i + 1}</span>
                      </CloudBadge>
                    </motion.div>
                  </div>

                  {/* Carte */}
                  <div className="story-card" style={{
                    flex: 1,
                    minWidth: 0,
                    position: "relative",
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    borderRadius: "1.1rem",
                    padding: "clamp(1.2rem, 3vw, 1.75rem) clamp(1.2rem, 3.5vw, 2rem)",
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 8px 28px -10px rgba(27,42,74,0.14)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}>
                  <CloudBadge size={48} fill="rgba(36,85,214,0.08)" border="rgba(36,85,214,0.15)">
                    <Icon size={22} color="#2455D6" strokeWidth={1.5} />
                  </CloudBadge>
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
        .story-row {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }
        .story-line { left: 21px; }
        .story-card:hover { transform: translateY(-3px); box-shadow: 0 14px 36px -10px rgba(36,85,214,0.22); }
        @media (max-width: 640px) {
          .story-row { gap: 0.9rem; }
        }
      `}</style>
    </section>
  );
}
