"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const MORPH_WORDS = ["Automatisée", "Intelligente", "Connectée", "Souveraine", "Libérée"];
const TYPED = [
  "Générez vos devis et factures depuis WhatsApp en 3 minutes.",
  "Un message vocal suffit pour créer un devis PDF complet.",
  "Votre agent IA répond aux clients pendant que vous travaillez.",
  "Relances automatiques, signature électronique, zéro ressaisie.",
];

const HERO_STYLES = `
@keyframes hero-breathe {
  0% { transform: translate(-50%,-50%) scale(1); opacity:0.5; }
  100% { transform: translate(-50%,-50%) scale(1.18); opacity:0.85; }
}
@keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(180deg)} }
@keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-22px) rotate(180deg)} }
@keyframes floatC { 0%,100%{transform:translateY(0) rotateZ(0deg)} 50%{transform:translateY(14px) rotateZ(180deg)} }

.hero-aurora {
  background: radial-gradient(circle at 50% 50%,
    rgba(245,200,66,0.13) 0%,
    rgba(74,222,128,0.07) 45%,
    transparent 70%);
}
.hero-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(232,237,244,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(232,237,244,0.04) 1px, transparent 1px);
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}
.hero-giant-text {
  font-size: 32vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(245,200,66,0.07);
  background: linear-gradient(180deg, rgba(245,200,66,0.09) 0%, transparent 55%);
  -webkit-background-clip: text;
  background-clip: text;
  pointer-events: none;
  user-select: none;
}
.hero-glass-pill {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(245,200,66,0.18);
  background: rgba(255,255,255,0.04);
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
}
.hero-glass-pill:hover {
  border-color: rgba(245,200,66,0.45);
  background: rgba(245,200,66,0.06);
  box-shadow: 0 8px 32px rgba(245,200,66,0.18);
}
.hero-gold-btn {
  background: linear-gradient(135deg,#F5C842 0%,#E6A800 100%);
  color: #1E2B45;
  font-weight: 800;
  box-shadow: 0 8px 32px rgba(245,200,66,0.35);
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  border: none;
}
.hero-gold-btn:hover {
  box-shadow: 0 16px 48px rgba(245,200,66,0.55);
  transform: translateY(-3px);
}
.hero-text-glow {
  background: linear-gradient(180deg, #E8EDF4 0%, rgba(232,237,244,0.5) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`;

function MagneticBtn({ children, className, style, href, onClick }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
  href?: string; onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, rotationY: x * 0.1, rotationX: -y * 0.1, scale: 1.05, ease: "power2.out", duration: 0.4 });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1,0.3)", duration: 1.2 });
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove as EventListener); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  const props = { ref, className, style };
  if (href) return <a {...props} href={href} target="_blank" rel="noopener" style={{ ...style, textDecoration: "none", cursor: "pointer" }}>{children}</a>;
  return <button {...props} onClick={onClick} style={{ ...style, cursor: "pointer", border: "none" }}>{children}</button>;
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const charRef = useRef(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const giantRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % MORPH_WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const line = TYPED[lineIdx];
    const delay = deleting ? 28 : 52;
    const t = setTimeout(() => {
      if (!deleting) {
        if (charRef.current < line.length) { charRef.current++; setTyped(line.slice(0, charRef.current)); }
        else { setTimeout(() => setDeleting(true), 2200); return; }
      } else {
        if (charRef.current > 0) { charRef.current--; setTyped(line.slice(0, charRef.current)); }
        else { setDeleting(false); setLineIdx(i => (i + 1) % TYPED.length); return; }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [typed, deleting, lineIdx]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(giantRef.current, { scale: 0.7, opacity: 0, duration: 1.8, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8rem 6vw 6rem", overflow: "hidden", textAlign: "center" }}
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setMouseX(e.clientX - r.left); setMouseY(e.clientY - r.top); }}
    >
      <style>{HERO_STYLES}</style>

      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/image.png')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,15,20,0.92) 0%, rgba(10,15,20,0.75) 50%, rgba(10,15,20,0.88) 100%)", zIndex: 1 }} />
      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "16rem", background: "linear-gradient(to top, #0F1923, transparent)", zIndex: 2 }} />

      {/* Grid overlay */}
      <div className="hero-bg-grid" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }} />

      {/* Aurora glow */}
      <div className="hero-aurora" style={{ position: "absolute", left: "50%", top: "45%", width: "70vw", height: "55vh", borderRadius: "50%", filter: "blur(80px)", animation: "hero-breathe 9s ease-in-out infinite alternate", zIndex: 2, pointerEvents: "none" }} />

      {/* Spotlight mouse */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", background: `radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(245,200,66,0.07), transparent 42%)`, transition: "background 0.1s" }} />

      {/* Giant BG text */}
      <div ref={giantRef} className="hero-giant-text" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", whiteSpace: "nowrap", zIndex: 2 }}>
        FLOXIA
      </div>

      {/* Floating geo shapes */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 3 }} aria-hidden>
        {[
          { top: "12%", right: "8%", size: 80, anim: "floatA 14s ease-in-out infinite" },
          { top: "58%", right: "20%", size: 60, anim: "floatB 18s ease-in-out infinite" },
          { top: "32%", right: "38%", size: 44, anim: "floatC 11s ease-in-out infinite" },
        ].map((g, i) => (
          <div key={i} style={{ position: "absolute", top: g.top, right: g.right, animation: g.anim, opacity: 0.6 }}>
            <svg width={g.size} height={g.size} viewBox={`0 0 ${g.size} ${g.size}`} fill="none" stroke="rgba(245,200,66,0.18)" strokeWidth="1">
              {i === 0 && <><rect x="10" y="10" width="60" height="60" rx="4"/><rect x="22" y="22" width="36" height="36" rx="2"/><line x1="10" y1="10" x2="22" y2="22"/><line x1="70" y1="10" x2="58" y2="22"/><line x1="10" y1="70" x2="22" y2="58"/><line x1="70" y1="70" x2="58" y2="58"/></>}
              {i === 1 && <><polygon points="30,4 56,20 56,44 30,58 4,44 4,20"/><polygon points="30,14 46,23 46,38 30,47 14,38 14,23"/></>}
              {i === 2 && <><circle cx="22" cy="22" r="18"/><circle cx="22" cy="22" r="10"/><line x1="4" y1="22" x2="40" y2="22"/><line x1="22" y1="4" x2="22" y2="40"/></>}
            </svg>
          </div>
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ position: "relative", zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "6px 18px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.06)", backdropFilter: "blur(8px)", marginBottom: "1.8rem" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px rgba(74,222,128,0.8)", display: "inline-block" }} />
          <span style={{ color: "#F5C842", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>IA disponible 24h/24 — Hébergé en France</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: "1.5rem", fontFamily: "var(--font-nunito)", fontSize: "clamp(3rem,8vw,7.5rem)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-.04em" }}>
          <span className="hero-text-glow">Floxia</span>
          <span style={{ display: "inline-flex", alignItems: "center", marginLeft: "0.75rem", padding: "0 0.5rem", borderRadius: "0.3rem", background: "#F5C842", color: "#1E2B45", fontSize: "clamp(1rem,2vw,1.8rem)", letterSpacing: ".08em", verticalAlign: "middle", position: "relative", top: "-.1em", fontWeight: 900, boxShadow: "0 4px 20px rgba(245,200,66,0.45)" }}>OS</span>
          <br />
          <AnimatePresence mode="wait">
            <motion.span key={wordIdx} initial={{ filter: "blur(8px)", opacity: 0 }} animate={{ filter: "blur(0)", opacity: 1 }} exit={{ filter: "blur(8px)", opacity: 0 }} transition={{ duration: 0.4 }}
              style={{ color: "#F5C842", display: "inline-block" }}>
              {MORPH_WORDS[wordIdx]}
            </motion.span>
          </AnimatePresence>.<br />
          <span style={{ fontSize: "clamp(1.8rem,4vw,3.5rem)", color: "rgba(232,237,244,0.65)" }}>Votre temps. Rendu.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.38 }}
          style={{ marginBottom: "2.5rem", color: "rgba(232,237,244,0.72)", fontSize: "clamp(1rem,2.2vw,1.2rem)", fontWeight: 300, lineHeight: 1.7, maxWidth: 620, margin: "0 auto 2.5rem" }}>
          <span style={{ display: "block", minHeight: "1.7em" }}>
            {typed}<span style={{ display: "inline-block", width: 1, height: "1em", background: "#F5C842", margin: "0 1px", verticalAlign: "middle", animation: "hero-breathe 0.8s steps(1) infinite" }} />
          </span>
          <span>Un vocal suffit — Floxia s&apos;occupe du reste.</span>
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.52 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
          <MagneticBtn href="https://calendly.com/afele1845/30min" className="hero-gold-btn" style={{ padding: "1rem 2.2rem", borderRadius: "999px", fontSize: "0.92rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            🎯 Réserver une démo — 30 min
          </MagneticBtn>
          <MagneticBtn href="#services" className="hero-glass-pill" style={{ padding: "1rem 2rem", borderRadius: "999px", fontSize: "0.88rem", color: "rgba(245,200,66,0.9)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            Voir les services →
          </MagneticBtn>
        </motion.div>

        {/* Stats rapides */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.75 }}
          style={{ display: "flex", gap: "2.5rem", justifyContent: "center", flexWrap: "wrap", marginTop: "3.5rem" }}>
          {[["3 min", "par devis"], ["99€", "/mois"], ["0h", "de formation"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 900, fontFamily: "var(--font-nunito)", color: "#F5C842", lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: "0.72rem", color: "rgba(232,237,244,0.45)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.25rem" }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
