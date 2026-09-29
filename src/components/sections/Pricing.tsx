"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { CloudSupport, CLOUD_SUPPORT_STYLES } from "@/components/ui/CloudSupport";

/**
 * Une seule offre, et le prix se fixe en rendez-vous.
 *
 * Trois colonnes annoncant toutes "Sur devis" ne faisaient rien choisir : elles
 * demandaient au visiteur de se ranger dans une case dont il ne connaissait pas
 * le prix. Une offre unique, la liste complete de ce qu'elle contient, et un
 * seul geste a faire — reserver l'appel ou le prix est dit.
 */

const INCLUDED: { category: string; items: string[] }[] = [
  {
    category: "Devis & facturation",
    items: [
      "Devis dicté sur WhatsApp, prêt en 3 minutes",
      "Signature électronique à valeur légale",
      "Acomptes, situations, avenants et avoirs",
      "Conformité e-facturation 2026",
    ],
  },
  {
    category: "Comptabilité complète",
    items: [
      "TVA calculée puis télétransmise à la DGFiP",
      "Bulletins de paie et DSN mensuelle",
      "Bilan et liasse signés par notre cabinet partenaire",
      "Tickets et factures fournisseurs scannés d'une photo",
    ],
  },
  {
    category: "Relances & trésorerie",
    items: [
      "Devis non signés relancés à J+3, J+7, J+14",
      "Factures impayées relancées sans que vous y pensiez",
      "Connexion bancaire sécurisée (Bridge · DSP2)",
      "Paiement détecté, relance arrêtée toute seule",
    ],
  },
  {
    category: "Chantiers & équipes",
    items: [
      "Planning, heures salariés et heures supplémentaires",
      "Pointage par QR code et preuve de passage photo",
      "Espace client : avancement et photos en temps réel",
      "Comptes sous-traitants à accès limité",
    ],
  },
  {
    category: "Intelligence artificielle",
    items: [
      "Copilote : il lit vos chiffres et répond à vos questions",
      "Standardiste IA qui décroche 24 h/24",
      "Rendez-vous posés dans votre agenda selon la distance",
      "E-mails et rapports de chantier rédigés depuis un vocal",
    ],
  },
  {
    category: "Et aussi",
    items: [
      "Rentabilité réelle par chantier",
      "Stock décrémenté automatiquement",
      "Avis Google demandés en fin de chantier",
      "Hébergement en France, conformité RGPD",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" style={{ background: "transparent", padding: "clamp(3rem, 8vw, 6rem) 0" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 6vw" }}>

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: "999px",
            border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)",
            color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
            textTransform: "uppercase", marginBottom: "1.2rem",
          }}>
            Tarifs
          </span>
          <h2 style={{
            fontFamily: "var(--font-nunito)", fontWeight: 900,
            fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text)", lineHeight: 1.1,
          }}>
            Une seule offre,{" "}
            <span className="hero-gradient-word" style={{
              background: "linear-gradient(100deg, #2455D6 0%, #6C7CFF 35%, #2455D6 70%)",
              backgroundSize: "240% auto", WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent", color: "transparent",
              animation: "pricingGradientMove 6s ease-in-out infinite",
            }}>tout est dedans</span>
          </h2>
          <p style={{
            marginTop: "0.9rem", color: "rgba(var(--text-rgb),0.6)", fontSize: "1rem",
            maxWidth: "34rem", margin: "0.9rem auto 0", lineHeight: 1.55,
          }}>
            Pas de formule à choisir, pas d&apos;option à cocher. Le prix est fixé avec
            vous pendant l&apos;appel, selon votre activité et la taille de votre équipe.
          </p>
          <style>{CLOUD_SUPPORT_STYLES}</style>
          <style>{`
            @keyframes pricingGradientMove {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes pulseUrgent {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
            .pricing-included { grid-template-columns: repeat(3, 1fr); }
            @media (max-width: 900px) { .pricing-included { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 600px) { .pricing-included { grid-template-columns: 1fr; } }
            .pricing-cta:hover { background: #1e46c2 !important; transform: translateY(-2px); }
            @media (prefers-reduced-motion: reduce) {
              .pricing-cta { transition: none !important; }
              .pricing-cta:hover { transform: none; }
            }
          `}</style>
        </motion.div>

        {/* Offre de lancement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: "44rem", margin: "0 auto 2rem", padding: "1rem 1.4rem",
            borderRadius: "1rem",
            background: "linear-gradient(135deg, rgba(36,85,214,0.14), rgba(245,84,54,0.10))",
            border: "1px solid rgba(36,85,214,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.9rem",
            flexWrap: "wrap", textAlign: "center",
          }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "#F5544F", color: "#fff", fontWeight: 800,
            fontSize: ".72rem", letterSpacing: ".06em", textTransform: "uppercase",
            padding: "5px 12px", borderRadius: "999px", whiteSpace: "nowrap",
          }}>
            Offre de lancement
          </span>
          <span style={{ color: "var(--text)", fontWeight: 700, fontSize: "0.95rem" }}>
            Conditions préférentielles pour les{" "}
            <span style={{ color: "#2455D6", fontWeight: 900 }}>10 premiers artisans</span>
          </span>
        </motion.div>

        {/* La carte : le prix se donne en rendez-vous */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            position: "relative",
            maxWidth: "40rem", margin: "0 auto",
            padding: "clamp(2rem,5vw,3rem) clamp(1.5rem,4vw,2.5rem)",
            borderRadius: "1.5rem",
            background: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(36,85,214,0.22)",
            boxShadow: "0 18px 40px -24px rgba(36,85,214,0.45)",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <CloudSupport width={340} bottom={-34} delay={0.4} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{
              color: "rgba(var(--text-rgb),0.45)", fontSize: ".76rem", fontWeight: 700,
              letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "0.7rem",
            }}>
              Votre abonnement
            </p>
            <p style={{
              fontFamily: "var(--font-nunito)", fontWeight: 900,
              fontSize: "clamp(2.2rem,6vw,3.2rem)", color: "var(--text)",
              lineHeight: 1.05, letterSpacing: "-0.03em",
            }}>
              Tarif sur devis
            </p>
            <p style={{
              marginTop: "1rem", color: "rgba(var(--text-rgb),0.62)",
              fontSize: "0.97rem", lineHeight: 1.6, maxWidth: "26rem", marginInline: "auto",
            }}>
              Un seul prix mensuel, logiciel et comptabilité compris. Nous le fixons
              ensemble pendant l&apos;appel — vous repartez avec le chiffre, pas avec
              une proposition à attendre.
            </p>

            <a
              href="https://calendly.com/cirrion-pro/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-cta"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: "0.5rem", marginTop: "1.8rem",
                padding: "0.95rem 2.2rem", borderRadius: "9999px",
                background: "#2455D6", color: "#FFFFFF",
                fontWeight: 800, fontSize: "1rem", textDecoration: "none",
                transition: "background .2s ease, transform .2s ease",
              }}
            >
              Réserver un appel de 30 min
            </a>

            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center",
              gap: "0.6rem 1.4rem", marginTop: "1.4rem",
            }}>
              {[
                "Prix annoncé pendant l'appel",
                "Sans engagement au-delà de 3 mois",
                "Mise en route accompagnée",
              ].map((t) => (
                <span key={t} style={{
                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  color: "rgba(var(--text-rgb),0.5)", fontSize: "0.8rem", fontWeight: 600,
                }}>
                  <CheckCircle size={13} color="#4ADE80" /> {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ce que l'abonnement contient — la place liberee par les trois colonnes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginTop: "clamp(2.5rem,6vw,4rem)" }}
        >
          <p style={{
            textAlign: "center", fontFamily: "var(--font-nunito)", fontWeight: 800,
            fontSize: "1.25rem", color: "var(--text)", marginBottom: "2rem",
          }}>
            Tout est compris, sans option
          </p>

          <div className="pricing-included" style={{ display: "grid", gap: "1.6rem 2rem" }}>
            {INCLUDED.map((block) => (
              <div key={block.category}>
                <p style={{
                  color: "#2455D6", fontSize: ".74rem", fontWeight: 800,
                  letterSpacing: ".09em", textTransform: "uppercase", marginBottom: "0.75rem",
                }}>
                  {block.category}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
                  {block.items.map((item) => (
                    <li key={item} style={{
                      display: "flex", alignItems: "flex-start", gap: "0.5rem",
                      color: "rgba(var(--text-rgb),0.66)", fontSize: "0.88rem", lineHeight: 1.45,
                    }}>
                      <CheckCircle size={14} color="#4ADE80" style={{ flexShrink: 0, marginTop: 3 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
