"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

export default function CtaBand() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(4rem, 10vw, 8rem) 0",
      }}
    >
      {/* Fond clair — dégradé bleu doux, pas de photo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #E4ECFF 0%, #EFF4FF 50%, #FFF3DE 100%)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vh",
          background: "radial-gradient(circle, rgba(36,85,214,0.1) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 6vw", textAlign: "center", position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "6px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(36,85,214,0.3)",
              background: "rgba(36,85,214,0.08)",
              color: "#2455D6",
              fontSize: ".78rem",
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Passez à l&apos;action
          </span>

          <h2
            style={{
              fontFamily: "var(--font-nunito)",
              fontWeight: 900,
              fontSize: "clamp(2.2rem,5vw,3.5rem)",
              color: "var(--text)",
              lineHeight: 1.1,
              marginBottom: "1.2rem",
            }}
          >
            Prêt à récupérer{" "}
            <span style={{ color: "#2455D6" }}>votre temps ?</span>
          </h2>

          <p
            style={{
              color: "rgba(var(--text-rgb),0.65)",
              fontSize: "clamp(1rem,2vw,1.15rem)",
              marginBottom: "3rem",
              maxWidth: "560px",
              margin: "0 auto 3rem",
            }}
          >
            Rejoignez les artisans et PME qui ont choisi l&apos;efficacité.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://calendly.com/afele1845/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1rem 2rem",
                borderRadius: "0.85rem",
                background: "#2455D6",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: ".95rem",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1e46c2"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#2455D6"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <CalendarDays size={18} />
              Réserver une démo gratuite
            </a>

            <Link
              href="/#tarifs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1rem 2rem",
                borderRadius: "0.85rem",
                background: "transparent",
                color: "var(--text)",
                fontWeight: 600,
                fontSize: ".95rem",
                textDecoration: "none",
                cursor: "pointer",
                border: "1px solid rgba(var(--text-rgb),0.2)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(var(--text-rgb),0.5)"; e.currentTarget.style.background = "rgba(var(--text-rgb),0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(var(--text-rgb),0.2)"; e.currentTarget.style.background = "transparent"; }}
            >
              Voir les tarifs
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
