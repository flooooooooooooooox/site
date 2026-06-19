"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const STATS = [
  { value: 3, suffix: " min", label: "pour créer un devis", color: "#F5C842", depth: 0 },
  { value: 47, suffix: "", label: "fonctionnalités IA", color: "#4ADE80", depth: 38 },
  { value: 100, suffix: "%", label: "hébergé en France", color: "#60A5FA", depth: 38 },
  { value: 2026, suffix: "", label: "e-facturation prête", color: "#F5C842", depth: 0 },
];

function springEase(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(2, -9 * t) * Math.cos(t * Math.PI * 2.8);
}

function Counter({ target, suffix, color, trigger }: { target: number; suffix: string; color: string; trigger: boolean }) {
  const [count, setCount] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!trigger || done.current) return;
    done.current = true;
    const duration = 1800;
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.min(Math.round(springEase(t) * target), target));
      if (t < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [trigger, target]);

  return <span style={{ color }}>{count}{suffix}</span>;
}

function StatCard({ stat, trigger }: { stat: typeof STATS[number]; trigger: boolean }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotateX: 0,
        borderColor: `${stat.color}45`,
        boxShadow: `0 18px 50px ${stat.color}20`,
        transition: { duration: 0.25 },
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
        transform: `translateZ(${stat.depth}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
          width: "140px", height: "140px",
          background: `radial-gradient(circle, ${stat.color}22, transparent 70%)`,
          filter: "blur(18px)", pointerEvents: "none",
        }}
      />
      <div style={{
        fontFamily: "var(--font-nunito)", fontWeight: 900,
        fontSize: "clamp(2.4rem, 5vw, 3.5rem)", lineHeight: 1,
        marginBottom: "0.6rem", letterSpacing: "-0.03em",
      }}>
        <Counter target={stat.value} suffix={stat.suffix} color={stat.color} trigger={trigger} />
      </div>
      <div style={{
        fontSize: "0.8rem", fontWeight: 600,
        color: "rgba(var(--text-rgb),0.5)", letterSpacing: "0.04em",
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [trigger, setTrigger] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // 3D stage: tilted-back plane pushed into depth → resolves flat & forward
  const rotateX = useTransform(scrollYProgress, [0, 1], [26, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [-320, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 0.55], [16, 0]);
  const gridFilter = useMotionTemplate`blur(${blurPx}px)`;
  const gridTransform = useMotionTemplate`perspective(1200px) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;

  // Laser cut on entry
  const laserScaleX = useTransform(scrollYProgress, [0.05, 0.32], [0, 1]);
  const laserScaleY = useTransform(scrollYProgress, [0.32, 0.4, 0.52], [1, 26, 1]);
  const laserOpacity = useTransform(scrollYProgress, [0.05, 0.32, 0.5, 0.62], [0, 1, 1, 0]);

  // Radial depth glow that blooms once as cards arrive
  const glowScale = useTransform(scrollYProgress, [0.2, 0.6], [0.5, 1.6]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.8], [0, 0.6, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.5 && !trigger) setTrigger(true);
  });

  // Reduced-motion: simple, accessible layout
  if (reduce) {
    return (
      <section ref={sectionRef} style={{ background: "transparent", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
            {STATS.map((s) => <StatCard key={s.label} stat={s} trigger={true} />)}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 400px) { .stats-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    );
  }

  return (
    <section ref={sectionRef} style={{ background: "transparent", padding: "5rem 0 4rem", overflow: "visible" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw", position: "relative" }}>

        {/* Depth glow bloom */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute", top: "50%", left: "50%",
            width: "640px", height: "640px", borderRadius: "50%",
            x: "-50%", y: "-50%", scale: glowScale, opacity: glowOpacity,
            background: "radial-gradient(circle, rgba(245,200,66,0.18) 0%, rgba(245,200,66,0.05) 40%, transparent 70%)",
            filter: "blur(90px)", pointerEvents: "none", zIndex: 0,
          }}
        />

        {/* Laser cut */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute", top: "-1.5rem", left: 0, right: 0, height: "2px",
            transformOrigin: "center", scaleX: laserScaleX, scaleY: laserScaleY,
            opacity: laserOpacity, zIndex: 2, pointerEvents: "none",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "#F5C842" }} />
          <div style={{ position: "absolute", left: 0, right: 0, height: "10px", top: "-4px", background: "#F5C842", filter: "blur(8px)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, height: "40px", top: "-19px", background: "#F5C842", filter: "blur(28px)", opacity: 0.5 }} />
        </motion.div>

        {/* 3D stage */}
        <div style={{ perspective: "1200px", position: "relative", zIndex: 1 }}>
          <motion.div
            className="stats-grid"
            style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem",
              transformStyle: "preserve-3d", transformOrigin: "center top",
              transform: gridTransform, filter: gridFilter, opacity: gridOpacity, y: gridY,
              willChange: "transform, opacity, filter",
            }}
          >
            {STATS.map((s) => <StatCard key={s.label} stat={s} trigger={trigger} />)}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 400px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
