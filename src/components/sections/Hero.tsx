"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

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

export default function Hero() {
  return (
    <section
      style={{
        position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "clamp(6rem,12vh,9rem) 6vw clamp(3rem,6vh,5rem)", textAlign: "center",
        background: "#EFF4FF", overflow: "hidden",
      }}
    >
      <style>{HERO_STYLES}</style>

      {/* Fond clair — bulles douces, pas de photo */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(36,85,214,0.16) 0%, transparent 70%)",
          top: "-8%", right: "-6%", filter: "blur(6px)",
        }} />
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,217,138,0.35) 0%, transparent 70%)",
          bottom: "2%", left: "-4%", filter: "blur(4px)",
        }} />
        <div style={{
          position: "absolute", width: 180, height: 180, borderRadius: "50%",
          border: "1.5px solid rgba(36,85,214,0.12)",
          top: "18%", left: "8%",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 780 }}>
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "6px 18px",
            borderRadius: "999px", border: "1px solid rgba(36,85,214,0.2)", background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)", marginBottom: "1.8rem",
          }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", boxShadow: "0 0 8px rgba(22,163,74,0.6)", display: "inline-block" }} />
          <span style={{ color: "#2455D6", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            IA disponible 24h/24 — Hébergé en France
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }}
          style={{
            marginBottom: "1.4rem", fontFamily: "var(--font-nunito)",
            fontSize: "clamp(2.4rem,6vw,5rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-.03em",
            color: "#1B2A4A",
          }}>
          <span>Floxia</span>
          <span style={{
            display: "inline-flex", alignItems: "center", marginLeft: "0.6rem", padding: "0 0.5rem",
            borderRadius: "0.3rem", background: "#2455D6", color: "#FFFFFF",
            fontSize: "clamp(0.9rem,1.6vw,1.3rem)", letterSpacing: ".08em", verticalAlign: "middle",
            position: "relative", top: "-.08em", fontWeight: 900,
          }}>OS</span>
          <br />
          <span style={{ color: "#2455D6" }}>Automatisée</span>.<br />
          <span style={{ fontSize: "clamp(1.8rem,4vw,3.5rem)", color: "rgba(27,42,74,0.6)" }}>Votre temps. Rendu.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }}
          style={{
            marginBottom: "2.4rem", color: "#42527A", fontSize: "clamp(1rem,2vw,1.15rem)",
            fontWeight: 400, lineHeight: 1.65, maxWidth: 560, margin: "0 auto 2.4rem",
          }}>
          Générez vos devis et factures depuis WhatsApp en 3 minutes — par vocal ou sur l&apos;application ERP.
          <br />−80&nbsp;% de votre temps administratif éliminé.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.36 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          <MagneticBtn href="https://calendly.com/afele1845/30min" className="hero-solid-btn"
            style={{ padding: "1rem 2.2rem", borderRadius: "999px", fontSize: "0.92rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            Réserver une démo — 30 min
          </MagneticBtn>
          <MagneticBtn href="#services" className="hero-glass-pill"
            style={{ padding: "1rem 2rem", borderRadius: "999px", fontSize: "0.88rem", color: "#2455D6", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            Voir les services →
          </MagneticBtn>
        </motion.div>

        {/* Objectif de l'application — texte statique (lisible par le scanner de validation OAuth Google) */}
        <p style={{ marginTop: "1.6rem", color: "rgba(27,42,74,0.5)", fontSize: "0.8rem", fontWeight: 400, lineHeight: 1.6, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          Floxia est une application de gestion pour les artisans du bâtiment : elle crée vos devis et factures,
          les envoie à vos clients par e-mail via votre compte Gmail, et automatise vos relances.
        </p>
      </div>
    </section>
  );
}
