"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Comment Floxia s'intègre avec WhatsApp ?",
    a: "Floxia se connecte à votre numéro WhatsApp Business existant via l'API officielle Meta. Aucune application supplémentaire à installer.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Hébergement 100% en France (OVH), chiffrement AES-256, conformité RGPD native. Vos données ne quittent jamais le territoire français.",
  },
  {
    q: "Combien de temps pour être opérationnel ?",
    a: "L'onboarding prend 48h. Notre équipe configure votre espace, importe vos données et forme votre équipe en visio.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, sans engagement après les 3 premiers mois. Le setup est non remboursable mais les abonnements sont résiliables à tout moment.",
  },
  {
    q: "Floxia fonctionne-t-il hors connexion ?",
    a: "L'application web nécessite une connexion. Sur chantier, les données sont synchronisées dès le retour en ligne.",
  },
  {
    q: "Y a-t-il une période d'essai ?",
    a: "Oui, 14 jours gratuits sans carte bancaire sur les offres Essentiel et Artisan Pro.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "transparent", padding: "6rem 0" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 6vw" }}>
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
            FAQ
          </span>
          <h2
            className="font-black text-[clamp(2rem,4vw,3rem)]"
            style={{ fontFamily: "var(--font-nunito)", color: "var(--text)" }}
          >
            Questions{" "}
            <span style={{ color: "#F5C842" }}>fréquentes</span>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{
                  background: isOpen ? "rgba(245,200,66,0.04)" : "rgba(var(--surface-rgb),0.03)",
                  border: isOpen ? "1px solid rgba(245,200,66,0.2)" : "1px solid rgba(var(--surface-rgb),0.07)",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  transition: "border-color 0.3s, background 0.3s",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.2rem 1.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "1rem",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      color: isOpen ? "#F5C842" : "var(--text)",
                      fontWeight: 600,
                      fontSize: ".95rem",
                      lineHeight: 1.4,
                      transition: "color 0.3s",
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ flexShrink: 0 }}
                  >
                    <ChevronDown size={18} color={isOpen ? "#F5C842" : "rgba(var(--text-rgb),0.4)"} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          padding: "0 1.5rem 1.4rem",
                          color: "rgba(var(--text-rgb),0.65)",
                          fontSize: ".88rem",
                          lineHeight: 1.7,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
