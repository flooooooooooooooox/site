"use client";
import { motion } from "framer-motion";

export default function ErpOsSection() {
  return (
    <section id="ecosysteme" style={{ background: "transparent", padding: "clamp(3.5rem, 9vw, 7rem) 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 6vw" }}>
        <div className="erp-split">
          {/* Texte à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="erp-split-text"
          >
            <span style={{
              display: "inline-block", padding: "6px 20px", borderRadius: "999px",
              border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)",
              color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
              textTransform: "uppercase", marginBottom: "1.2rem",
            }}>
              CirrionOS
            </span>
            <h2 style={{
              fontFamily: "var(--font-nunito)", fontWeight: 900,
              fontSize: "clamp(2rem,4vw,3.2rem)", color: "var(--text)",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem",
            }}>
              Votre{" "}
              <span style={{ color: "#2455D6" }}>cockpit opérationnel</span>
            </h2>
            <p style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: "1.1rem", lineHeight: 1.65, maxWidth: "30rem" }}>
              Un seul écran. Tout votre business — devis, factures, chantiers, planning,
              relances et notifications, centralisés et pilotés en temps réel.
            </p>
          </motion.div>

          {/* Image à droite */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="erp-split-image"
          >
            <div style={{
              borderRadius: "1.25rem", overflow: "hidden", border: "1px solid rgba(27,42,74,0.08)",
              boxShadow: "0 30px 70px rgba(27,42,74,0.16)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dashboard-cirrion.jpg"
                alt="Tableau de bord CirrionOS — cockpit de gestion pour artisans du bâtiment : devis, factures, chantiers, planning, relances et notifications"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .erp-split {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 900px) {
          .erp-split { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
          .erp-split-text p { margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </section>
  );
}
