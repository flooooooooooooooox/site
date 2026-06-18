"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";

const PLANS = [
  {
    name: "Essentiel",
    price: 99,
    setup: 299,
    popular: false,
    features: [
      "Devis & factures WhatsApp",
      "Documents illimités",
      "Signature électronique",
      "Support email",
      "1 utilisateur",
    ],
    details: [
      {
        category: "Devis & facturation",
        items: [
          "Création de devis depuis le site",
          "Devis PDF par vocal / WhatsApp (3 min)",
          "Factures acompte / finale / tous types",
          "PV de réception + facture finale auto",
          "Envoi automatique des factures",
          "Conformité facturation 2026 (e-reporting)",
          "Numérotation automatique devis & factures",
          "Bibliothèque de prix / catalogue",
          "Gestion TVA multiples (5,5% / 10% / 20%)",
          "Signature électronique intégrée",
        ],
      },
      {
        category: "Relances & suivi",
        items: ["Notification devis signé"],
      },
      {
        category: "Assistant vocal IA",
        items: ["Vocal devis via WhatsApp (3 min)"],
      },
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
      "Agent IA WhatsApp 24h/24",
      "Relances automatiques",
      "Avis Google automatisés",
      "Prévisions trésorerie",
      "3 utilisateurs",
    ],
    details: [
      {
        category: "Devis & facturation",
        items: [
          "Tout l'Essentiel inclus",
          "Gestion avenants & avoirs automatiques",
          "Modèles de devis personnalisés",
        ],
      },
      {
        category: "Relances & suivi",
        items: [
          "Suivi hebdo activité (CA, chantiers, devis)",
          "Relances devis non signés (J+3 / J+7 / J+14)",
          "Relances automatiques avant / jour J",
          "Alerte chantier → email pro",
          "Relance garantie 1 an (J+365)",
        ],
      },
      {
        category: "Agent IA & booking",
        items: [
          "Agent réceptionniste IA WhatsApp",
          "Booking automatique de RDV (WhatsApp)",
        ],
      },
      {
        category: "Assistant vocal IA",
        items: ["Assistant vocal technique (bâtiment, admin, juridique)"],
      },
      {
        category: "Comptabilité & dépenses",
        items: [
          "Scan OCR tickets / factures fournisseurs (WhatsApp)",
          "Dashboard dépenses & TVA récupérable",
        ],
      },
      {
        category: "Avis & réputation",
        items: ["Demandes automatiques d'avis Google"],
      },
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
    details: [
      {
        category: "Agent IA & booking",
        items: [
          "Tout l'Artisan Pro inclus",
          "Agent réceptionniste IA téléphone",
        ],
      },
      {
        category: "Assistant vocal IA",
        items: ["Saisie vocale IA avancée (agenda, disponibilités)"],
      },
      {
        category: "Comptabilité & dépenses",
        items: ["Export comptabilité en 1 clic"],
      },
      {
        category: "Gestion équipe & chantiers",
        items: [
          "Collecte photos fin de chantier (WhatsApp)",
          "Gestion équipe & plannings salariés",
          "Suivi des heures collaborateurs",
        ],
      },
    ],
  },
];

export default function Pricing() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <section id="tarifs" style={{ background: "transparent", padding: "6rem 0" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 6vw" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
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
            style={{ fontFamily: "var(--font-nunito)", color: "var(--text)" }}
          >
            Des offres simples,{" "}
            <span style={{ color: "#F5C842" }}>sans surprise</span>
          </h2>
          <p style={{ marginTop: "0.75rem", color: "rgba(var(--text-rgb),0.6)" }}>
            Résiliable à tout moment après 3 mois · 14 jours d&apos;essai gratuit
          </p>
        </motion.div>

        <div className="pricing-grid" style={{ display: "grid", gap: "1.5rem", alignItems: "start" }}>
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
                className={plan.popular ? "pricing-card-popular" : undefined}
                style={{
                  position: "relative",
                  zIndex: 1,
                  background: "rgba(var(--surface-rgb),0.04)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: plan.popular
                    ? "1px solid rgba(245,200,66,0.4)"
                    : "1px solid rgba(var(--surface-rgb),0.08)",
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  transform: "scale(1)",
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
                    el.style.borderColor = "rgba(var(--surface-rgb),0.14)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  if (plan.popular) {
                    el.style.boxShadow = "inset 0 0 60px rgba(245,200,66,0.03), 0 0 40px rgba(245,200,66,0.08)";
                  } else {
                    el.style.boxShadow = "none";
                    el.style.borderColor = "rgba(var(--surface-rgb),0.08)";
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

                <div style={{ marginBottom: "1.5rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontWeight: 800,
                      fontSize: "1.15rem",
                      color: plan.popular ? "#F5C842" : "var(--text)",
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
                        color: "var(--text)",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}€
                    </span>
                    <span style={{ color: "rgba(var(--text-rgb),0.4)", fontSize: ".85rem" }}>/mois</span>
                  </div>
                  <p style={{ color: "rgba(var(--text-rgb),0.35)", fontSize: ".78rem", marginTop: "0.4rem" }}>
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
                      <span style={{ color: "rgba(var(--text-rgb),0.75)", fontSize: ".88rem", lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Voir plus — détails complets de l'offre */}
                <button
                  onClick={() => setExpanded(expanded === plan.name ? null : plan.name)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    width: "100%",
                    padding: "0.6rem",
                    marginBottom: "1rem",
                    borderRadius: "0.65rem",
                    background: "transparent",
                    border: "1px solid rgba(245,200,66,0.25)",
                    color: "#F5C842",
                    fontWeight: 600,
                    fontSize: ".82rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,200,66,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  {expanded === plan.name ? "Voir moins" : "Voir tout le détail"}
                  <ChevronDown
                    size={15}
                    style={{
                      transition: "transform 0.3s",
                      transform: expanded === plan.name ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {expanded === plan.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ paddingBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        {plan.details.map((group) => (
                          <div key={group.category}>
                            <p
                              style={{
                                fontSize: ".68rem",
                                fontWeight: 700,
                                letterSpacing: ".08em",
                                textTransform: "uppercase",
                                color: "rgba(245,200,66,0.7)",
                                marginBottom: "0.6rem",
                              }}
                            >
                              {group.category}
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {group.items.map((item) => (
                                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                                  <CheckCircle size={14} color="rgba(245,200,66,0.55)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                  <span style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: ".82rem", lineHeight: 1.45 }}>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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
                    color: plan.popular ? "#0F1923" : "var(--text)",
                    border: plan.popular ? "none" : "1px solid rgba(var(--surface-rgb),0.15)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    if (!plan.popular) {
                      el.style.background = "rgba(var(--surface-rgb),0.06)";
                      el.style.borderColor = "rgba(var(--surface-rgb),0.3)";
                    } else {
                      el.style.background = "#f0be2a";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    if (!plan.popular) {
                      el.style.background = "transparent";
                      el.style.borderColor = "rgba(var(--surface-rgb),0.15)";
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
        .pricing-grid { grid-template-columns: repeat(3, 1fr); }
        @media (min-width: 921px) {
          .pricing-card-popular { transform: scale(1.04); }
        }
        @media (max-width: 920px) {
          .pricing-grid { grid-template-columns: 1fr; max-width: 26rem; margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </section>
  );
}
