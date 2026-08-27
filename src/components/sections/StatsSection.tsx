"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STATS = [
  { value: 3, suffix: " min", label: "pour créer un devis", color: "#2455D6" },
  { value: 47, suffix: "", label: "fonctionnalités", color: "#4ADE80" },
  { value: 100, suffix: "%", label: "hébergé en France", color: "#60A5FA" },
  { value: 2026, suffix: "", label: "e-facturation prête", color: "#2455D6" },
];

// easeOutExpo : monotone, rapide au debut puis freinage net.
// Pas d'overshoot, donc pas de clamp ni de rebond visuel.
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Le compteur ecrit directement dans le DOM plutot que via setState :
 * un setState par frame rerendait la carte 60 fois par seconde et saccadait.
 */
function Counter({ target, suffix, color, trigger }: {
  target: number; suffix: string; color: string; trigger: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!trigger || started.current || !node) return;
    started.current = true;

    const DURATION = 1600;
    let raf = 0;
    let t0 = 0;

    const step = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min((now - t0) / DURATION, 1);
      node.textContent = `${Math.round(easeOutExpo(p) * target)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, suffix]);

  return <span ref={ref} style={{ color }}>{`0${suffix}`}</span>;
}

function Card({ stat, trigger }: { stat: typeof STATS[number]; trigger: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
      style={{
        textAlign: "center",
        padding: "2rem 1.5rem",
        borderRadius: "1.25rem",
        background: "rgba(var(--surface-rgb),0.06)",
        border: "1px solid rgba(var(--surface-rgb),0.10)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        willChange: "transform",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
          width: 140, height: 140,
          background: `radial-gradient(circle, ${stat.color}22, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div style={{
        fontFamily: "var(--font-nunito)", fontWeight: 900,
        fontSize: "clamp(2.4rem,5vw,3.5rem)", lineHeight: 1,
        marginBottom: "0.6rem", letterSpacing: "-0.03em",
        fontVariantNumeric: "tabular-nums",
      }}>
        <Counter target={stat.value} suffix={stat.suffix} color={stat.color} trigger={trigger} />
      </div>
      <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(var(--text-rgb),0.5)", letterSpacing: "0.04em" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [trigger, setTrigger] = useState(false);

  // Un seul IntersectionObserver, cree une fois et deconnecte proprement.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrigger(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Entree jouee une seule fois, sur transform + opacity uniquement (composites).
  // L'ancienne version liait la rotation 3D au scroll : le navigateur recalculait
  // la scene et les backdrop-filter a chaque frame de defilement.
  const enter = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
    : {
        initial: { opacity: 0, y: 60, rotateX: 26, transformPerspective: 1400 },
        animate: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1400 },
        transition: { type: "spring" as const, stiffness: 110, damping: 20, mass: 0.9 },
      };

  return (
    <section ref={sectionRef} style={{ background: "transparent", padding: "clamp(3rem,7vw,5rem) 0 4rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw", position: "relative" }}>

        {/* Halo : opacite animee seulement, jamais l'echelle — un flou redimensionne
            est recalcule a chaque frame. */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: trigger ? 0.45 : 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            position: "absolute", top: "50%", left: "50%",
            width: 700, height: 700, borderRadius: "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, rgba(36,85,214,0.18) 0%, rgba(36,85,214,0.05) 40%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }}
        />

        <motion.div
          initial={enter.initial}
          whileInView={enter.animate}
          viewport={{ once: true, amount: 0.25 }}
          transition={enter.transition}
          style={{ position: "relative", zIndex: 1, willChange: "transform, opacity" }}
        >
          <div
            className="stats-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}
          >
            {STATS.map((s) => (
              <Card key={s.label} stat={s} trigger={trigger} />
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 400px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
