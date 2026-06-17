"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MORPH_WORDS = ["Automatisée","Intelligente","Connectée","Souveraine","Libérée"];
const TYPED = [
  "Générez vos devis et factures depuis WhatsApp en 3 minutes.",
  "Un message vocal suffit pour créer un devis PDF complet.",
  "Votre agent IA répond aux clients pendant que vous travaillez.",
  "Relances automatiques, signature électronique, zéro ressaisie.",
];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const charRef = useRef(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // morph word
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % MORPH_WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  // typewriter
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

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  }

  return (
    <section
      style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8rem 6vw 6rem", overflow: "hidden", textAlign: "center", background: "#0F1923" }}
      onMouseMove={handleMouseMove}
    >
      {/* bg image */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/image.png')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(10,15,20,.88) 0%,rgba(10,15,20,.65) 45%,rgba(10,15,20,.2) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "14rem", background: "linear-gradient(to top,rgba(10,15,20,.7),transparent)", zIndex: 1 }} />

      {/* Spotlight overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(245,200,66,0.06), transparent 40%)`,
          transition: "background 0.1s",
        }}
      />

      {/* Floating geo shapes */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }} aria-hidden>
        {[
          { cls: "top-[12%] right-[8%]", size: 80, anim: "floatA 14s ease-in-out infinite" },
          { cls: "top-[55%] right-[20%]", size: 60, anim: "floatB 18s ease-in-out infinite" },
          { cls: "top-[30%] right-[38%]", size: 44, anim: "floatC 11s ease-in-out infinite" },
        ].map((g, i) => (
          <div key={i} className={`absolute ${g.cls}`} style={{ animation: g.anim, opacity: .7 }}>
            <svg width={g.size} height={g.size} viewBox={`0 0 ${g.size} ${g.size}`} fill="none" stroke="rgba(245,200,66,0.15)" strokeWidth="1">
              {i === 0 && <><rect x="10" y="10" width="60" height="60" rx="4"/><rect x="22" y="22" width="36" height="36" rx="2"/><line x1="10" y1="10" x2="22" y2="22"/><line x1="70" y1="10" x2="58" y2="22"/><line x1="10" y1="70" x2="22" y2="58"/><line x1="70" y1="70" x2="58" y2="58"/></>}
              {i === 1 && <><polygon points="30,4 56,20 56,44 30,58 4,44 4,20"/><polygon points="30,14 46,23 46,38 30,47 14,38 14,23"/></>}
              {i === 2 && <><circle cx="22" cy="22" r="18"/><circle cx="22" cy="22" r="10"/><line x1="4" y1="22" x2="40" y2="22"/><line x1="22" y1="4" x2="22" y2="40"/></>}
            </svg>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .2 }}
          className="font-black leading-none tracking-tight"
          style={{ marginBottom: "1.5rem", fontFamily: "var(--font-nunito)", fontSize: "clamp(3rem,8vw,7.5rem)", letterSpacing: "-.04em",
            textShadow: "0 2px 30px rgba(0,0,0,.5),1px 1px 0 rgba(245,200,66,.08),2px 2px 0 rgba(245,200,66,.06),3px 3px 0 rgba(245,200,66,.04),4px 4px 0 rgba(245,200,66,.03),5px 5px 12px rgba(0,0,0,.4)" }}>
          <span style={{ color: "#F5C842", textShadow: "1px 1px 0 rgba(200,150,0,.5),2px 2px 0 rgba(180,130,0,.4),3px 3px 0 rgba(160,110,0,.3),4px 4px 0 rgba(140,90,0,.2),5px 5px 14px rgba(0,0,0,.5)" }}>Floxia</span>
          <span className="text-[#1E2B45] font-black" style={{ display: "inline-flex", alignItems: "center", marginLeft: "0.75rem", padding: "0 0.5rem", borderRadius: "0.25rem", background: "#F5C842", fontSize: "clamp(1rem,2vw,1.8rem)", letterSpacing: ".08em", verticalAlign: "middle", position: "relative", top: "-.1em", boxShadow: "0 4px 20px rgba(245,200,66,.4)" }}>OS</span>
          <br />
          <AnimatePresence mode="wait">
            <motion.span key={wordIdx}
              initial={{ filter: "blur(8px)", opacity: 0 }} animate={{ filter: "blur(0)", opacity: 1 }} exit={{ filter: "blur(8px)", opacity: 0 }}
              transition={{ duration: .4 }}
              style={{ color: "#F5C842", display: "inline-block" }}>
              {MORPH_WORDS[wordIdx]}
            </motion.span>
          </AnimatePresence>.<br />
          <span style={{ fontSize: "clamp(1.8rem,4vw,3.5rem)", color: "rgba(232,237,244,.7)" }}>Votre temps. Rendu.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .35 }}
          className="text-[clamp(1rem,2.2vw,1.25rem)] font-light max-w-[620px] leading-relaxed" style={{ marginBottom: "2.25rem", color: "rgba(232,237,244,.75)" }}>
          <span style={{ display: "block", minHeight: "1.7em" }}>{typed}<span className="bg-yellow-400 animate-pulse" style={{ display: "inline-block", width: "1px", height: "1em", margin: "0 1px", verticalAlign: "middle" }} /></span>
          <span>Un vocal suffit — Floxia s&apos;occupe du reste.</span>
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .5 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="https://calendly.com/afele1845/30min" target="_blank" rel="noopener"
            className="px-8 py-3 rounded-full font-extrabold text-[.88rem] no-underline transition-all hover:-translate-y-1"
            style={{ background: "#F5C842", color: "#1E2B45", boxShadow: "0 0 0 rgba(245,200,66,0)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 16px 40px rgba(245,200,66,.45)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 0 rgba(245,200,66,0)")}>
            Réserver une démo — 30 min
          </a>
          <a href="#services" className="px-8 py-3 rounded-full font-bold text-[.88rem] no-underline transition-all hover:border-yellow-400"
            style={{ border: "1px solid rgba(245,200,66,.5)", color: "rgba(245,200,66,.9)", backdropFilter: "blur(8px)", background: "rgba(0,0,0,.2)" }}>
            Voir les services →
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(180deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-22px) rotate(180deg)} }
        @keyframes floatC { 0%,100%{transform:translateY(0) rotateZ(0deg)} 50%{transform:translateY(14px) rotateZ(180deg)} }
      `}</style>
    </section>
  );
}
