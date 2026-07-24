"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const STATS = [
  { value: 3,    suffix: " min", label: "pour créer un devis",  color: "#2455D6", z:   0, rx:  3 },
  { value: 47,   suffix: "",     label: "fonctionnalités IA",   color: "#4ADE80", z:  50, rx: -4 },
  { value: 100,  suffix: "%",    label: "hébergé en France",    color: "#60A5FA", z:  50, rx: -4 },
  { value: 2026, suffix: "",     label: "e-facturation prête",  color: "#2455D6", z:   0, rx:  3 },
];

function springEase(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(2, -9 * t) * Math.cos(t * Math.PI * 2.8);
}

function Counter({ target, suffix, color, trigger }: {
  target: number; suffix: string; color: string; trigger: boolean;
}) {
  const [count, setCount] = useState(0);
  const done = useRef(false);
  const startT = useRef(0);

  useEffect(() => {
    if (!trigger || done.current) return;
    done.current = true;
    let raf: number;
    const kick = (now: number) => {
      if (!startT.current) startT.current = now;
      const t = Math.min((now - startT.current) / 1800, 1);
      setCount(Math.min(Math.round(springEase(t) * target), target));
      if (t < 1) raf = requestAnimationFrame(kick);
    };
    raf = requestAnimationFrame(kick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target]);

  return <span style={{ color }}>{count}{suffix}</span>;
}

function Card({ stat, trigger }: { stat: typeof STATS[number]; trigger: boolean }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.06,
        boxShadow: `0 20px 60px ${stat.color}28`,
        borderColor: `${stat.color}50`,
        transition: { duration: 0.22 },
      }}
      style={{
        textAlign: "center",
        padding: "2rem 1.5rem",
        borderRadius: "1.25rem",
        background: "rgba(var(--surface-rgb),0.04)",
        border: "1px solid rgba(var(--surface-rgb),0.08)",
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div aria-hidden style={{
        position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
        width: "140px", height: "140px",
        background: `radial-gradient(circle, ${stat.color}22, transparent 70%)`,
        filter: "blur(18px)", pointerEvents: "none",
      }} />
      <div style={{
        fontFamily: "var(--font-nunito)", fontWeight: 900,
        fontSize: "clamp(2.4rem,5vw,3.5rem)", lineHeight: 1,
        marginBottom: "0.6rem", letterSpacing: "-0.03em",
      }}>
        <Counter target={stat.value} suffix={stat.suffix} color={stat.color} trigger={trigger} />
      </div>
      <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(var(--text-rgb),0.5)", letterSpacing: "0.04em" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

// Simple reveal pour mobile — pas de 3D (évite les cartes hors champ)
function MobileStats({ trigger }: { trigger: boolean }) {
  return (
    <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1rem" }}>
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 160, damping: 18, delay: i * 0.1 }}
        >
          <Card stat={s} trigger={trigger} />
        </motion.div>
      ))}
    </div>
  );
}

export default function StatsSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [trigger, setTrigger] = useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Desktop 3D
  const rotateX    = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [-320, 0]);
  const stageY     = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const stageOp    = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const blurPx     = useTransform(scrollYProgress, [0, 0.65], [16, 0]);
  const fogOp      = useTransform(scrollYProgress, [0, 0.7], [0.85, 0]);
  const stageFilter    = useMotionTemplate`blur(${blurPx}px)`;
  const stageTransform = useMotionTemplate`perspective(1400px) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;

  const glowScale = useTransform(scrollYProgress, [0.15, 0.65], [0.4, 1.8]);
  const glowOp    = useTransform(scrollYProgress, [0.1, 0.4, 0.85], [0, 0.5, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.5 && !trigger) setTrigger(true);
  });

  // Mobile & reduced-motion : simple fade-in stagger, pas de 3D
  if (reduce || isMobile) {
    return (
      <section ref={sectionRef} style={{ background: "transparent", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw" }}>
          <MobileStats trigger={trigger} />
          {/* Trigger counter on scroll */}
          <div ref={(el) => {
            if (!el) return;
            const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTrigger(true); }, { threshold: 0.3 });
            io.observe(el);
          }} style={{ height: 1 }} />
        </div>
        <GridCSS />
      </section>
    );
  }

  return (
    <section ref={sectionRef} style={{ background: "transparent", padding: "5rem 0 4rem", overflow: "visible" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw", position: "relative" }}>

        {/* Bloom */}
        <motion.div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%",
          width: "700px", height: "700px", borderRadius: "50%",
          x: "-50%", y: "-50%", scale: glowScale, opacity: glowOp,
          background: "radial-gradient(circle, rgba(36,85,214,0.2) 0%, rgba(36,85,214,0.05) 38%, transparent 68%)",
          filter: "blur(100px)", pointerEvents: "none", zIndex: 0,
        }} />

        {/* 3D stage */}
        <div style={{ perspective: "1400px", perspectiveOrigin: "50% 50%", position: "relative", zIndex: 1 }}>
          <motion.div style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center top",
            transform: stageTransform,
            filter: stageFilter,
            opacity: stageOp,
            y: stageY,
            willChange: "transform, opacity, filter",
          }}>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem", transformStyle: "preserve-3d" }}>
              {STATS.map((s) => (
                <div key={s.label} style={{ transform: `translateZ(${s.z}px) rotateX(${s.rx}deg)`, transformStyle: "preserve-3d" }}>
                  <Card stat={s} trigger={trigger} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fog */}
          <motion.div aria-hidden style={{
            position: "absolute", inset: "-20px",
            background: "radial-gradient(ellipse 80% 60% at 50% 120%, #05080D 0%, transparent 70%)",
            opacity: fogOp, pointerEvents: "none", zIndex: 2,
          }} />
        </div>
      </div>
      <GridCSS />
    </section>
  );
}

function GridCSS() {
  return (
    <style>{`
      @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
      @media (max-width: 400px) { .stats-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  );
}
