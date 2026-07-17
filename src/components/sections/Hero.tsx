"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { CloudDecor, CLOUD_DECOR_STYLES } from "@/components/ui/CloudDecor";

const HERO_STYLES = `
.hero-glass-pill {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(36,85,214,0.18);
  background: rgba(255,255,255,0.6);
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
}
.hero-glass-pill:hover {
  border-color: rgba(36,85,214,0.4);
  background: rgba(255,255,255,0.85);
  box-shadow: 0 8px 28px rgba(36,85,214,0.14);
}
.hero-solid-btn {
  background: #2455D6;
  color: #FFFFFF;
  font-weight: 800;
  box-shadow: 0 10px 28px rgba(36,85,214,0.28);
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  border: none;
}
.hero-solid-btn:hover {
  box-shadow: 0 16px 36px rgba(36,85,214,0.38);
  transform: translateY(-2px);
  background: #1E46C2;
}
.hero-gmail-disclosure summary::-webkit-details-marker { display: none; }
.hero-gmail-disclosure summary:hover { color: rgba(36,85,214,0.8) !important; }

/* 3 — badge glass + pouls */
.hero-live-badge {
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  background: linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.35));
  border: 1px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.35)), linear-gradient(135deg, rgba(36,85,214,0.5), rgba(36,85,214,0.05));
}
.hero-live-dot { position: relative; }
.hero-live-dot::after {
  content: ""; position: absolute; inset: -4px; border-radius: 50%;
  border: 1.5px solid #16A34A; opacity: 0.6;
  animation: heroPulse 1.8s ease-out infinite;
}
@keyframes heroPulse {
  0% { transform: scale(0.6); opacity: 0.7; }
  100% { transform: scale(2.2); opacity: 0; }
}

/* 2 — mesh de fond animé */
.hero-blob { animation: heroDrift 16s ease-in-out infinite; }
.hero-blob-2 { animation: heroDrift 20s ease-in-out infinite reverse; }
@keyframes heroDrift {
  0%, 100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(3%,4%) scale(1.08); }
}

/* 1 — carte image glass + badges flottants */
.hero-image-card {
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  background: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow: 0 40px 90px -20px rgba(36,85,214,0.35), 0 0 0 1px rgba(36,85,214,0.06);
  transform-style: preserve-3d;
  will-change: transform;
}
.hero-float-badge {
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(255,255,255,0.7);
  box-shadow: 0 12px 28px rgba(27,42,74,0.14);
  animation: heroFloat 4s ease-in-out infinite;
}
.hero-float-badge.b2 { animation-delay: -1.4s; }
.hero-float-badge.b3 { animation-delay: -2.6s; }
@keyframes heroFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}

/* 5 — bouton secondaire glass avec reflet balaye au hover */
.hero-glass-pill { position: relative; overflow: hidden; }
.hero-glass-pill::before {
  content: ""; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
  background: linear-gradient(115deg, transparent, rgba(255,255,255,0.85), transparent);
  transform: skewX(-20deg);
  transition: left 0.7s ease;
}
.hero-glass-pill:hover::before { left: 130%; }

/* Panneau glass derriere le texte — vrai style Apple : tres transparent, pas de fond blanc plein */
.hero-text-glass {
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  background: linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04));
  border: 1px solid rgba(255,255,255,0.35);
  box-shadow: 0 8px 32px -12px rgba(27,42,74,0.1), inset 0 1px 0 rgba(255,255,255,0.4);
}

/* E — degrade anime sur "Automatisee" */
.hero-gradient-word {
  background: linear-gradient(100deg, #2455D6 0%, #6C7CFF 35%, #2455D6 70%);
  background-size: 240% auto;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
  animation: heroGradientMove 6s ease-in-out infinite;
}
@keyframes heroGradientMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* A — soulignement anime (dessine au chargement) */
.hero-underline { position: relative; display: inline-block; white-space: nowrap; }
.hero-underline::after {
  content: ""; position: absolute; left: 0; bottom: -0.05em; height: 0.11em; width: 100%;
  background: currentColor; opacity: 0.35; border-radius: 2px;
  transform: scaleX(0); transform-origin: left;
  animation: heroDrawUnderline 0.7s cubic-bezier(0.16,1,0.3,1) 1.1s forwards;
}
@keyframes heroDrawUnderline { to { transform: scaleX(1); } }

/* B — barre d'accent verticale devant le paragraphe */
.hero-callout { position: relative; padding-left: 1rem; border-left: 2px solid rgba(36,85,214,0.35); }

/* D — reveal ligne par ligne du H1 */
.hero-line { display: block; overflow: hidden; }
.hero-line > span { display: inline-block; }

@media (prefers-reduced-motion: reduce) {
  .hero-blob, .hero-blob-2, .hero-float-badge, .hero-live-dot::after, .hero-gradient-word, .hero-underline::after { animation: none !important; }
}
`;

function MagneticBtn({ children, className, style, href }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * 0.25, y: y * 0.25, scale: 1.03, ease: "power2.out", duration: 0.4 });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, scale: 1, ease: "elastic.out(1,0.3)", duration: 1.1 });
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove as EventListener); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  const isInternal = href?.startsWith("#");
  const handleClick = isInternal ? (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector(href!)?.scrollIntoView({ behavior: "smooth", block: "start" });
  } : undefined;

  return (
    <a ref={ref} href={href} onClick={handleClick} className={className} style={{ ...style, textDecoration: "none", cursor: "pointer" }}
      target={isInternal ? undefined : "_blank"} rel={isInternal ? undefined : "noopener noreferrer"}>
      {children}
    </a>
  );
}

function TiltImageCard({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotateY: px * 10, rotateX: -py * 8,
        x: px * 14, y: py * 10,
        ease: "power2.out", duration: 0.5,
      });
    };
    const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, x: 0, y: 0, ease: "elastic.out(1,0.4)", duration: 1.2 });
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => { wrap.removeEventListener("mousemove", onMove); wrap.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <div ref={wrapRef} style={{ perspective: "1400px" }}>
      <div ref={cardRef} className="hero-image-card" style={{ borderRadius: "1.25rem", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      style={{
        position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(6rem,12vh,7rem) 6vw clamp(3rem,6vh,5rem)",
        background: "#EFF4FF", overflow: "hidden",
      }}
    >
      <style>{HERO_STYLES}</style>
      <style>{CLOUD_DECOR_STYLES}</style>

      {/* Fond clair — mesh de bulles animees, pas de photo */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div className="hero-blob" style={{
          position: "absolute", width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(36,85,214,0.16) 0%, transparent 70%)",
          top: "-8%", right: "-6%", filter: "blur(6px)",
        }} />
        <div className="hero-blob-2" style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,217,138,0.35) 0%, transparent 70%)",
          bottom: "2%", left: "-4%", filter: "blur(4px)",
        }} />
        <CloudDecor size={110} opacity={0.14} style={{ top: "16%", left: "6%" }} />
        <CloudDecor size={70} opacity={0.1} style={{ top: "62%", left: "16%" }} float={false} />
      </div>

      <div className="hero-split" style={{ position: "relative", zIndex: 10, maxWidth: "1200px", width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: "2.5rem", alignItems: "center" }}>
        <div className="hero-split-text hero-text-glass" style={{ textAlign: "left", borderRadius: "1.5rem", padding: "clamp(2rem,3.4vw,2.8rem) clamp(1.8rem,3vw,2.4rem)" }}>
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="hero-live-badge"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "5px 14px",
              borderRadius: "999px", marginBottom: "1.4rem",
            }}>
            <span className="hero-live-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 8px rgba(22,163,74,0.6)", display: "inline-block", flexShrink: 0 }} />
            <span style={{ color: "#2455D6", fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              IA disponible 24h/24 — Hébergé en France
            </span>
          </motion.div>

          <h1
            style={{
              marginBottom: "1.2rem", fontFamily: "var(--font-nunito)",
              fontSize: "clamp(1.9rem,3vw,2.9rem)", fontWeight: 900, lineHeight: 1.06, letterSpacing: "-.03em",
              color: "#1B2A4A",
            }}>
            <span className="hero-line">
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                Cirrion
                <span style={{
                  display: "inline-flex", alignItems: "center", marginLeft: "0.5rem", padding: "0 0.4rem",
                  borderRadius: "0.3rem", background: "#2455D6", color: "#FFFFFF",
                  fontSize: "clamp(0.65rem,1vw,0.85rem)", letterSpacing: ".08em", verticalAlign: "middle",
                  position: "relative", top: "-.08em", fontWeight: 900,
                }}>OS</span>
              </motion.span>
            </span>
            <span className="hero-line">
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }} className="hero-gradient-word">
                Automatisée.
              </motion.span>
            </span>
            <span className="hero-line">
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: "clamp(1.2rem,2vw,1.8rem)", color: "rgba(27,42,74,0.6)" }}>
                Votre temps. Rendu.
              </motion.span>
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="hero-callout"
            style={{
              marginBottom: "2rem", color: "#42527A", fontSize: "clamp(0.88rem,1.1vw,0.98rem)",
              fontWeight: 400, lineHeight: 1.6, maxWidth: 460,
            }}>
            Créez vos devis et factures en 3 minutes depuis WhatsApp — l&apos;ERP IA qui automatise devis, factures, relances et planning pour artisans du bâtiment et TPE de services.
            <br /><span className="hero-underline" style={{ color: "#2455D6", fontWeight: 700 }}>−90&nbsp;% de temps administratif en moins</span>. Conforme e-facturation 2026.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.62 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <MagneticBtn href="https://calendly.com/afele1845/30min" className="hero-solid-btn"
              style={{ padding: "0.8rem 1.7rem", borderRadius: "999px", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Réserver une démo — 30 min
            </MagneticBtn>
            <MagneticBtn href="#services" className="hero-glass-pill"
              style={{ padding: "0.8rem 1.5rem", borderRadius: "999px", fontSize: "0.82rem", color: "#2455D6", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              Voir les services →
            </MagneticBtn>
          </motion.div>

          {/* Objectif de l'application — texte statique présent dans le HTML dès le chargement
              (lisible par le scanner de validation OAuth Google), replié visuellement via <details> natif */}
          <details className="hero-gmail-disclosure" style={{ marginTop: "1.6rem", maxWidth: 520 }}>
            <summary style={{
              cursor: "pointer", listStyle: "none", color: "rgba(27,42,74,0.45)",
              fontSize: "0.78rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.4rem",
            }}>
              <span aria-hidden>ℹ️</span> Comment Cirrion utilise Gmail
            </summary>
            <p style={{ marginTop: "0.6rem", color: "rgba(27,42,74,0.5)", fontSize: "0.8rem", fontWeight: 400, lineHeight: 1.6 }}>
              Cirrion est une application de gestion pour les artisans du bâtiment : elle crée vos devis et factures,
              les envoie à vos clients par e-mail via votre compte Gmail, et automatise vos relances.
            </p>
          </details>
        </div>

        <motion.div className="hero-split-image" style={{ position: "relative" }}
          initial={{ opacity: 0, x: 24, scale: 1.05 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
          <TiltImageCard>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dashboard-cirrion.jpg"
              alt="Tableau de bord CirrionOS — cockpit de gestion pour artisans du bâtiment : devis, factures, chantiers, planning, relances et notifications"
              loading="eager"
              decoding="async"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </TiltImageCard>

          {/* Badges flottants */}
          <motion.div className="hero-float-badge b1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
            style={{ position: "absolute", top: "-4%", left: "-6%", borderRadius: "0.9rem", padding: "0.6rem 0.9rem", display: "flex", alignItems: "center", gap: "0.5rem", zIndex: 5 }}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(22,163,74,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>✓</span>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1B2A4A" }}>Facture envoyée</span>
          </motion.div>

          <motion.div className="hero-float-badge b2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.05 }}
            style={{ position: "absolute", top: "22%", right: "-7%", borderRadius: "0.9rem", padding: "0.6rem 0.9rem", display: "flex", alignItems: "center", gap: "0.5rem", zIndex: 5 }}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(36,85,214,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>🔔</span>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1B2A4A" }}>Relance auto envoyée</span>
          </motion.div>

          <motion.div className="hero-float-badge b3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}
            style={{ position: "absolute", bottom: "-5%", left: "10%", borderRadius: "0.9rem", padding: "0.6rem 0.9rem", display: "flex", alignItems: "center", gap: "0.5rem", zIndex: 5 }}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,159,10,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>⚡</span>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1B2A4A" }}>Devis créé en 3 min</span>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-split { grid-template-columns: 1fr !important; text-align: center; }
          .hero-split-text { text-align: center !important; }
          .hero-split-text p { margin-left: auto; margin-right: auto; }
          .hero-split-text > div:first-child { margin-left: auto; margin-right: auto; }
          .hero-split-image { order: -1; }
          .hero-float-badge { display: none; }
          .hero-callout { border-left: none; padding-left: 0; border-top: 2px solid rgba(36,85,214,0.25); padding-top: 0.75rem; }
        }
      `}</style>
    </section>
  );
}
