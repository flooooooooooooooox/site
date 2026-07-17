"use client";
import { motion } from "framer-motion";

export type LegalBlock = { heading: string; body: string[] };

export default function LegalPage({
  badge,
  title,
  updated,
  blocks,
}: {
  badge: string;
  title: string;
  updated: string;
  blocks: LegalBlock[];
}) {
  return (
    <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto", padding: "clamp(8rem,16vh,11rem) 6vw 6rem" }}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "inline-block",
          padding: "6px 20px",
          borderRadius: "999px",
          border: "1px solid rgba(36,85,214,0.25)",
          background: "rgba(36,85,214,0.07)",
          color: "#2455D6",
          fontSize: ".78rem",
          fontWeight: 600,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          marginBottom: "1.4rem",
        }}
      >
        {badge}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2.2rem,5vw,3.4rem)", lineHeight: 1.1, color: "var(--text)", marginBottom: "0.8rem" }}
      >
        {title}
      </motion.h1>
      <p style={{ color: "rgba(var(--text-rgb),0.45)", fontSize: ".85rem", marginBottom: "3rem" }}>
        Dernière mise à jour : {updated}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {blocks.map((b, i) => (
          <motion.section
            key={b.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.2) }}
          >
            <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.2rem", color: "var(--text)", marginBottom: "0.9rem" }}>
              {b.heading}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {b.body.map((p, j) => (
                <p key={j} style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: "1rem", lineHeight: 1.75 }}>
                  {p}
                </p>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
