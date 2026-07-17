"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown, Zap, Star, Building2 } from "lucide-react";

const PLANS = [
  {
    name: "Essentiel",
    tagline: "Pour démarrer sans prise de tête",
    icon: Zap,
    price: 99,
    setup: 299,
    popular: false,
    accentColor: "rgba(96,165,250,0.8)",
    features: [
      "Devis & factures WhatsApp + app ERP",
      "Documents illimités",
      "Signature électronique",
      "Support email",
      "1 utilisateur",
    ],
    details: [
      {
        category: "Devis & facturation",
        items: [
          "Création de devis sur l'application Floxia ERP",
          "Pré-modèles de devis générés par l'IA",
          "Devis PDF par vocal / WhatsApp (3 min)",
          "Factures acompte / finale / tous types",
          "Factures périodiques & récurrentes auto",
          "PV de réception + facture finale auto",
          "Envoi automatique des factures",
          "Conformité facturation 2026 (e-reporting)",
          "Numérotation automatique devis & factures",
          "Bibliothèque de prix / catalogue",
          "Gestion TVA multiples (5,5% / 10% / 20%)",
          "Signature électronique intégrée",
        ],
      },
      { category: "Relances & suivi", items: ["Notification devis signé"] },
      { category: "Assistant vocal IA", items: ["Vocal devis via WhatsApp (3 min)"] },
    ],
  },
  {
    name: "Artisan Pro",
    tagline: "Le choix des artisans qui veulent scaler",
    icon: Star,
    price: 179,
    setup: 349,
    popular: true,
    accentColor: "#2455D6",
    features: [
      "Tout Essentiel inclus",
      "Standard IA 24h/24",
      "Agent IA WhatsApp 24h/24",
      "Relances auto + validation paiement en 1 clic",
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
          "Relances signature avenants & avoirs",
          "Relances factures impayées automatiques (J+X)",
          "Marquez une facture « payée » d'un clic → les relances s'arrêtent automatiquement",
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
      { category: "Assistant vocal IA", items: ["Assistant vocal technique (bâtiment, admin, juridique)"] },
      {
        category: "Comptabilité & dépenses",
        items: [
          "Scan OCR tickets / factures fournisseurs (WhatsApp)",
          "Dashboard dépenses & TVA récupérable",
        ],
      },
      { category: "Avis & réputation", items: ["Demandes automatiques d'avis Google"] },
    ],
  },
  {
    name: "PME Premium",
    tagline: "Pour les entreprises avec équipe et multi-chantiers",
    icon: Building2,
    price: 349,
    setup: 499,
    popular: false,
    accentColor: "rgba(74,222,128,0.9)",
    features: [
      "Tout Artisan Pro inclus",
      "Multi-chantiers",
      "Rapprochement bancaire 100% auto (Bridge)",
      "Manager de compte dédié",
      "SLA 99.9%",
      "Utilisateurs illimités",
    ],
    details: [
      {
        category: "Agent IA & booking",
        items: ["Tout l'Artisan Pro inclus", "Agent réceptionniste IA téléphone"],
      },
      { category: "Assistant vocal IA", items: ["Saisie vocale IA avancée (agenda, disponibilités)"] },
      { category: "Comptabilité & dépenses", items: ["Export comptabilité en 1 clic"] },
      {
        category: "Rapprochement bancaire",
        items: [
          "Connexion bancaire sécurisée (Bridge · DSP2)",
          "Détection des paiements 100% automatique : les factures passent en « payée » toutes seules, relances stoppées",
          "Suivi de trésorerie en temps réel",
        ],
      },
      {
        category: "Gestion équipe & chantiers",
        items: [
          "Collecte photos fin de chantier (WhatsApp)",
          "Gestion équipe & plannings salariés",
          "Gestion complète des heures salariés (pointage & feuilles d'heures)",
          "Suivi heures par salarié et par chantier",
          "Calcul heures sup + récap mensuel exportable",
        ],
      },
    ],
  },
];

export default function Pricing() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="tarifs" style={{ background: "transparent", padding: "clamp(3rem, 8vw, 6rem) 0" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 6vw" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: "999px",
            border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)",
            color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
            textTransform: "uppercase", marginBottom: "1.2rem",
          }}>
            Tarifs
          </span>
          <h2
            className="font-black text-[clamp(2rem,4vw,3rem)]"
            style={{ fontFamily: "var(--font-nunito)", color: "var(--text)" }}
          >
            Des offres simples,{" "}
            <span style={{ color: "#2455D6" }}>sans surprise</span>
          </h2>
          <p style={{ marginTop: "0.75rem", color: "rgba(var(--text-rgb),0.6)", fontSize: "0.95rem" }}>
            Résiliable à tout moment après 3 mois · Sans engagement caché
          </p>
        </motion.div>

        {/* Bandeau offre de lancement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: "44rem", margin: "0 auto 3rem", padding: "1.1rem 1.5rem",
            borderRadius: "1rem",
            background: "linear-gradient(135deg, rgba(36,85,214,0.14), rgba(245,84,54,0.10))",
            border: "1px solid rgba(36,85,214,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem",
            flexWrap: "wrap", textAlign: "center",
            boxShadow: "0 0 40px rgba(36,85,214,0.12)",
          }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "#F5544F", color: "#fff", fontWeight: 800,
            fontSize: ".72rem", letterSpacing: ".06em", textTransform: "uppercase",
            padding: "5px 12px", borderRadius: "999px", whiteSpace: "nowrap",
            animation: "pulseUrgent 2s ease-in-out infinite",
          }}>
            🔥 Offre de lancement
          </span>
          <span style={{ color: "var(--text)", fontWeight: 700, fontSize: "0.95rem" }}>
            <span style={{ color: "#2455D6", fontWeight: 900 }}>−50% à vie</span> sur l&apos;abonnement pour les <span style={{ color: "#2455D6", fontWeight: 900 }}>10 premiers artisans</span>
          </span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            color: "rgba(var(--text-rgb),0.6)", fontSize: "0.8rem", fontWeight: 600, whiteSpace: "nowrap",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px #4ADE80", animation: "pulseUrgent 1.5s infinite" }} />
            Places limitées
          </span>
        </motion.div>

        {/* Cards */}
        <div className="pricing-grid" style={{ display: "grid", gap: "1.5rem", alignItems: "start" }}>
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            const isExpanded = expanded === plan.name;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                style={{ position: "relative" }}
              >
                {/* Glow behind popular */}
                {plan.popular && (
                  <div aria-hidden style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: "340px", height: "340px",
                    background: "radial-gradient(circle, rgba(36,85,214,0.14), transparent)",
                    filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
                  }} />
                )}

                <div
                  style={{
                    position: "relative", zIndex: 1,
                    background: plan.popular
                      ? "linear-gradient(145deg, rgba(36,85,214,0.06) 0%, rgba(var(--surface-rgb),0.04) 100%)"
                      : "rgba(var(--surface-rgb),0.04)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: plan.popular
                      ? "1px solid rgba(36,85,214,0.35)"
                      : "1px solid rgba(var(--surface-rgb),0.08)",
                    borderRadius: "1.5rem",
                    padding: 0,
                    overflow: "hidden",
                    boxShadow: plan.popular
                      ? "0 0 0 1px rgba(36,85,214,0.08), 0 24px 80px rgba(36,85,214,0.1)"
                      : "none",
                    transition: "box-shadow 0.3s, border-color 0.3s",
                  }}
                >
                  {/* Colored top accent bar */}
                  <div style={{
                    height: "3px",
                    background: plan.popular
                      ? "linear-gradient(90deg, #2455D6, #1A3FA8)"
                      : `linear-gradient(90deg, ${plan.accentColor}, transparent)`,
                    borderRadius: "1.5rem 1.5rem 0 0",
                  }} />

                  <div style={{ padding: "1.75rem 2rem 2rem" }}>
                    {/* Badge popular */}
                    {plan.popular && (
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "0.35rem",
                        padding: "4px 12px", borderRadius: "999px",
                        background: "#2455D6", color: "#FFFFFF",
                        fontSize: ".68rem", fontWeight: 800,
                        letterSpacing: ".08em", textTransform: "uppercase",
                        marginBottom: "1rem",
                      }}>
                        <Star size={10} fill="#FFFFFF" /> Le plus vendu
                      </div>
                    )}

                    {/* Plan header */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1.25rem" }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: "0.75rem", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: plan.popular ? "rgba(36,85,214,0.15)" : "rgba(var(--surface-rgb),0.08)",
                        border: `1px solid ${plan.popular ? "rgba(36,85,214,0.3)" : "rgba(var(--surface-rgb),0.1)"}`,
                      }}>
                        <Icon size={18} color={plan.popular ? "#2455D6" : "rgba(var(--text-rgb),0.5)"} />
                      </div>
                      <div>
                        <h3 style={{
                          fontFamily: "var(--font-nunito)", fontWeight: 800,
                          fontSize: "1.1rem", color: plan.popular ? "#2455D6" : "var(--text)",
                          lineHeight: 1.2, marginBottom: "0.2rem",
                        }}>
                          {plan.name}
                        </h3>
                        <p style={{ color: "rgba(var(--text-rgb),0.4)", fontSize: ".75rem", lineHeight: 1.4 }}>
                          {plan.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{
                      padding: "1rem 1.25rem",
                      borderRadius: "1rem",
                      background: "rgba(var(--surface-rgb),0.04)",
                      border: "1px solid rgba(var(--surface-rgb),0.06)",
                      marginBottom: "1.5rem",
                    }}>
                      {/* Badge -50% lancement */}
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "0.3rem",
                        background: "rgba(245,84,79,0.15)", border: "1px solid rgba(245,84,79,0.4)",
                        color: "#F5544F", fontWeight: 800, fontSize: ".64rem", letterSpacing: ".04em",
                        textTransform: "uppercase", padding: "3px 9px", borderRadius: "999px", marginBottom: "0.6rem",
                      }}>
                        −50% lancement · 10 premiers
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                        <span style={{
                          fontFamily: "var(--font-nunito)", fontWeight: 900,
                          fontSize: "3rem", color: "var(--text)", lineHeight: 1, letterSpacing: "-0.04em",
                        }}>
                          {(plan.price / 2).toLocaleString("fr-FR")}€
                        </span>
                        <span style={{ color: "rgba(var(--text-rgb),0.4)", fontSize: ".85rem" }}>/mois</span>
                        <span style={{
                          color: "rgba(var(--text-rgb),0.35)", fontSize: "1.05rem", fontWeight: 700,
                          textDecoration: "line-through", marginLeft: "2px",
                        }}>
                          {plan.price}€
                        </span>
                      </div>
                      <p style={{ color: "rgba(var(--text-rgb),0.3)", fontSize: ".75rem", marginTop: "0.4rem" }}>
                        + {plan.setup}€ de setup (frais unique) · Tarif réduit conservé à vie
                      </p>
                    </div>

                    {/* Features */}
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                      {plan.features.map((f) => (
                        <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                          <CheckCircle
                            size={15}
                            color={plan.popular ? "#2455D6" : "rgba(36,85,214,0.5)"}
                            style={{ flexShrink: 0, marginTop: "2px" }}
                          />
                          <span style={{ color: "rgba(var(--text-rgb),0.75)", fontSize: ".86rem", lineHeight: 1.5 }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expand details */}
                    <button
                      onClick={() => setExpanded(isExpanded ? null : plan.name)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                        width: "100%", padding: "0.6rem", marginBottom: "1rem",
                        borderRadius: "0.65rem", background: "transparent",
                        border: "1px solid rgba(36,85,214,0.2)", color: "#2455D6",
                        fontWeight: 600, fontSize: ".8rem", cursor: "pointer", transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(36,85,214,0.07)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      {isExpanded ? "Voir moins" : "Voir le détail complet"}
                      <ChevronDown size={14} style={{ transition: "transform 0.3s", transform: isExpanded ? "rotate(180deg)" : "none" }} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
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
                                <p style={{
                                  fontSize: ".65rem", fontWeight: 700, letterSpacing: ".08em",
                                  textTransform: "uppercase", color: "rgba(36,85,214,0.6)", marginBottom: "0.5rem",
                                }}>
                                  {group.category}
                                </p>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                                  {group.items.map((item) => (
                                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                                      <CheckCircle size={13} color="rgba(36,85,214,0.45)" style={{ flexShrink: 0, marginTop: "2px" }} />
                                      <span style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: ".8rem", lineHeight: 1.45 }}>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* CTA */}
                    <a
                      href="https://calendly.com/afele1845/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: "0.5rem", width: "100%", padding: "0.9rem",
                        borderRadius: "0.75rem", textAlign: "center", fontWeight: 700,
                        fontSize: ".88rem", textDecoration: "none", cursor: "pointer",
                        transition: "all 0.2s",
                        background: plan.popular ? "#2455D6" : "transparent",
                        color: plan.popular ? "#FFFFFF" : "var(--text)",
                        border: plan.popular ? "none" : "1px solid rgba(var(--surface-rgb),0.15)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = plan.popular ? "#1e46c2" : "rgba(var(--surface-rgb),0.06)";
                        if (!plan.popular) el.style.borderColor = "rgba(var(--surface-rgb),0.3)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = plan.popular ? "#2455D6" : "transparent";
                        if (!plan.popular) el.style.borderColor = "rgba(var(--surface-rgb),0.15)";
                      }}
                    >
                      Réserver une démo gratuite
                      {plan.popular && <span style={{ fontSize: "0.8rem" }}>→</span>}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            marginTop: "2.5rem",
            padding: "1rem 1.5rem",
            borderRadius: "1rem",
            background: "rgba(var(--surface-rgb),0.03)",
            border: "1px solid rgba(var(--surface-rgb),0.06)",
            display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem",
          }}
        >
          {[
            "✓ Résiliable après 3 mois",
            "✓ Setup inclus dans l'accompagnement",
            "✓ Données hébergées en France",
          ].map((item) => (
            <span key={item} style={{ color: "rgba(var(--text-rgb),0.45)", fontSize: ".75rem", fontWeight: 600 }}>
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(36,85,214,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(36,85,214,0); }
        }
        @keyframes pulseUrgent {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(0.94); }
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
