"use client";
import { motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

const ROWS = [
  { feature: "Génération devis par vocal", floxia: true,  erp: false, excel: false },
  { feature: "Devis en < 3 minutes",       floxia: true,  erp: false, excel: false },
  { feature: "Signature électronique",      floxia: true,  erp: true,  excel: false },
  { feature: "Relances automatiques",       floxia: true,  erp: false, excel: false },
  { feature: "Standard IA 24h/24",          floxia: true,  erp: false, excel: false },
  { feature: "Hébergement France / RGPD",   floxia: true,  erp: false, excel: false },
  { feature: "Prix mensuel",                floxia: "99€", erp: "350€+", excel: "0€*" },
  { feature: "Temps de formation",          floxia: "0h",  erp: "40h+", excel: "5h+" },
];

function Cell({ val, isFloxia }: { val: boolean | string; isFloxia?: boolean }) {
  if (typeof val === "boolean") {
    return val ? (
      <CheckCircle size={20} color="#F5C842" style={{ margin: "0 auto" }} />
    ) : (
      <X size={18} color="rgba(232,237,244,0.2)" style={{ margin: "0 auto" }} />
    );
  }
  return (
    <span style={{ color: isFloxia ? "#F5C842" : "rgba(232,237,244,0.5)", fontWeight: isFloxia ? 700 : 400 }}>
      {val}
    </span>
  );
}

export default function Comparatif() {
  return (
    <section style={{ background: "#0A1520", padding: "6rem 0" }}>
      <div className="max-w-5xl mx-auto px-[6vw]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
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
            Comparaison
          </span>
          <h2
            className="font-black text-[clamp(2rem,4vw,3rem)]"
            style={{ fontFamily: "var(--font-nunito)", color: "#E8EDF4" }}
          >
            Floxia vs la{" "}
            <span style={{ color: "#F5C842" }}>concurrence</span>
          </h2>
          <p className="mt-3 text-lg" style={{ color: "rgba(232,237,244,0.6)" }}>
            Pourquoi les artisans nous choisissent
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            borderRadius: "1.25rem",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <div style={{ padding: "1.2rem 1.5rem", color: "rgba(232,237,244,0.4)", fontSize: ".82rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em" }}>
              Fonctionnalité
            </div>
            {[
              { name: "Floxia", highlight: true },
              { name: "ERP Traditionnel", highlight: false },
              { name: "Tableur Excel", highlight: false },
            ].map((col) => (
              <div
                key={col.name}
                style={{
                  padding: "1.2rem 1rem",
                  textAlign: "center",
                  background: col.highlight ? "rgba(245,200,66,0.08)" : "transparent",
                  borderLeft: col.highlight ? "1px solid rgba(245,200,66,0.2)" : "1px solid rgba(255,255,255,0.04)",
                  borderRight: col.highlight ? "1px solid rgba(245,200,66,0.2)" : "none",
                  color: col.highlight ? "#F5C842" : "rgba(232,237,244,0.5)",
                  fontWeight: 700,
                  fontSize: ".88rem",
                }}
              >
                {col.name}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                borderTop: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  padding: "1rem 1.5rem",
                  color: "#E8EDF4",
                  fontSize: ".9rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {row.feature}
              </div>
              {[
                { val: row.floxia, isFloxia: true },
                { val: row.erp, isFloxia: false },
                { val: row.excel, isFloxia: false },
              ].map((col, j) => (
                <div
                  key={j}
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: j === 0 ? "rgba(245,200,66,0.04)" : "transparent",
                    borderLeft: j === 0 ? "1px solid rgba(245,200,66,0.15)" : "1px solid rgba(255,255,255,0.04)",
                    borderRight: j === 0 ? "1px solid rgba(245,200,66,0.15)" : "none",
                  }}
                >
                  <Cell val={col.val} isFloxia={col.isFloxia} />
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        <p className="mt-4 text-center" style={{ color: "rgba(232,237,244,0.3)", fontSize: ".75rem" }}>
          * Excel gratuit mais coût caché en temps : 5h+ de formation + risque d&apos;erreurs humaines
        </p>
      </div>
    </section>
  );
}
