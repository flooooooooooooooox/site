"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { CloudSupport, CLOUD_SUPPORT_STYLES } from "@/components/ui/CloudSupport";

/**
 * Une seule offre, et le prix se fixe en rendez-vous.
 *
 * Trois colonnes annoncant toutes "Sur devis" ne faisaient rien choisir : elles
 * demandaient au visiteur de se ranger dans une case dont il ne connaissait pas
 * le prix. Une offre unique, et un seul geste a faire — reserver l'appel ou le
 * prix est dit.
 *
 * La carte reagit au survol : le cadre degrade s'allume, le halo grandit,
 * l'ensemble se souleve. Seules transform, opacity et box-shadow bougent, et
 * uniquement au survol : rien ne tourne pendant le defilement.
 */

const GUARANTEES = [
  "Prix annoncé dès la première réponse",
  "Logiciel et comptabilité compris",
  "Mise en route accompagnée",
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
            color: "rgba(var(--text-rgb),0.6)", fontSize: "1rem",
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

            /* Cadre degrade : un fond en degrade, et la carte posee dessus en
               laissant 1.5px apparent. Pas de bordure animee, pas de repaint. */
            .pricing-frame {
              position: relative;
              max-width: 40rem;
              margin: 0 auto;
              padding: 1.5px;
              border-radius: 1.6rem;
              background: linear-gradient(145deg,
                rgba(36,85,214,0.45) 0%,
                rgba(108,124,255,0.28) 38%,
                rgba(36,85,214,0.12) 70%,
                rgba(36,85,214,0.4) 100%);
              transition: transform .35s cubic-bezier(.2,.7,.3,1), box-shadow .35s ease;
              box-shadow: 0 16px 38px -26px rgba(36,85,214,0.5);
              will-change: transform;
            }
            .pricing-frame:hover {
              transform: translateY(-5px);
              box-shadow: 0 26px 52px -24px rgba(36,85,214,0.55);
            }

            /* Halo diffus derriere la carte : il grandit au survol. */
            .pricing-frame::before {
              content: "";
              position: absolute;
              inset: -14%;
              border-radius: 50%;
              background: radial-gradient(closest-side, rgba(36,85,214,0.16), rgba(36,85,214,0));
              opacity: .55;
              transform: scale(.82);
              transition: transform .5s cubic-bezier(.2,.7,.3,1), opacity .5s ease;
              pointer-events: none;
              z-index: -1;
            }
            .pricing-frame:hover::before { transform: scale(1); opacity: 1; }

            .pricing-card {
              position: relative;
              border-radius: calc(1.6rem - 1.5px);
              background: linear-gradient(170deg, #FFFFFF 0%, #FBFCFF 55%, #F3F7FF 100%);
              padding: clamp(2.1rem,5vw,3rem) clamp(1.5rem,4vw,2.6rem);
              text-align: center;
              overflow: hidden;
            }

            /* Reflet oblique qui traverse la carte au survol. */
            .pricing-card::after {
              content: "";
              position: absolute;
              top: -60%; bottom: -60%; left: -35%;
              width: 40%;
              background: linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.75) 50%, rgba(255,255,255,0) 100%);
              transform: translateX(-140%) rotate(8deg);
              transition: transform .9s cubic-bezier(.3,.7,.3,1);
              pointer-events: none;
            }
            .pricing-frame:hover .pricing-card::after { transform: translateX(340%) rotate(8deg); }

            .pricing-cta {
              display: inline-flex; align-items: center; justify-content: center; gap: .55rem;
              margin-top: 1.9rem;
              padding: 1rem 2.3rem;
              border-radius: 9999px;
              background: linear-gradient(135deg, #2A5FE0 0%, #2455D6 55%, #1C46BE 100%);
              color: #FFFFFF; font-weight: 800; font-size: 1rem; text-decoration: none;
              box-shadow: 0 10px 22px -12px rgba(36,85,214,.85);
              transition: transform .25s cubic-bezier(.2,.7,.3,1), box-shadow .25s ease;
              will-change: transform;
            }
            .pricing-cta:hover {
              transform: translateY(-2px) scale(1.02);
              box-shadow: 0 16px 30px -12px rgba(36,85,214,.95);
            }
            .pricing-cta-arrow { transition: transform .25s cubic-bezier(.2,.7,.3,1); }
            .pricing-frame:hover .pricing-cta-arrow { transform: translateX(4px); }

            .pricing-price {
              display: inline-block;
              transition: transform .35s cubic-bezier(.2,.7,.3,1);
              will-change: transform;
            }
            .pricing-frame:hover .pricing-price { transform: scale(1.03); }

            @media (hover: none) {
              .pricing-frame:hover { transform: none; }
              .pricing-card::after { display: none; }
            }
            @media (prefers-reduced-motion: reduce) {
              .pricing-frame, .pricing-cta, .pricing-price,
              .pricing-cta-arrow, .pricing-frame::before { transition: none !important; }
              .pricing-frame:hover { transform: none; }
              .pricing-frame:hover .pricing-price { transform: none; }
              .pricing-card::after { display: none; }
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
          className="pricing-frame"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="pricing-card">
            <CloudSupport width={340} bottom={-34} delay={0.4} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                color: "rgba(var(--text-rgb),0.42)", fontSize: ".76rem", fontWeight: 700,
                letterSpacing: ".13em", textTransform: "uppercase", marginBottom: "0.8rem",
              }}>
                Votre abonnement
              </p>

              <p className="pricing-price" style={{
                fontFamily: "var(--font-nunito)", fontWeight: 900,
                fontSize: "clamp(2.2rem,6vw,3.3rem)", lineHeight: 1.05, letterSpacing: "-0.035em",
                background: "linear-gradient(120deg, #16264A 0%, #24457F 45%, #2455D6 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text",
                WebkitTextFillColor: "transparent", color: "transparent",
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

              <a href="/devis" className="pricing-cta">
                Demander un devis
                <span className="pricing-cta-arrow" aria-hidden>→</span>
              </a>

              <p style={{ marginTop: "0.9rem", fontSize: "0.85rem" }}>
                <a
                  href="https://calendly.com/cirrion-pro/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2455D6", fontWeight: 700, textDecoration: "none" }}
                >
                  ou réserver un appel de 30 min →
                </a>
              </p>

              <div style={{
                display: "flex", flexWrap: "wrap", justifyContent: "center",
                gap: "0.6rem 1.4rem", marginTop: "1.5rem",
              }}>
                {GUARANTEES.map((t) => (
                  <span key={t} style={{
                    display: "inline-flex", alignItems: "center", gap: "0.35rem",
                    color: "rgba(var(--text-rgb),0.5)", fontSize: "0.8rem", fontWeight: 600,
                  }}>
                    <CheckCircle size={13} color="#4ADE80" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
