"use client";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const STATS = [
  { value: 3,    suffix: " min", label: "pour créer un devis",  color: "#F5C842", z:   0, rx:  4, delay: 0    },
  { value: 47,   suffix: "",     label: "fonctionnalités IA",   color: "#4ADE80", z:  80, rx: -6, delay: 0.08 },
  { value: 100,  suffix: "%",    label: "hébergé en France",    color: "#60A5FA", z:  80, rx: -6, delay: 0.16 },
  { value: 2026, suffix: "",     label: "e-facturation prête",  color: "#F5C842", z:   0, rx:  4, delay: 0.24 },
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
  const start = useRef(0);

  if (trigger && !done.current) {
    done.current = true;
    const kick = (now: number) => {
      if (!start.current) start.current = now;
      const t = Math.min((now - start.current) / 1800, 1);
      setCount(Math.min(Math.round(springEase(t) * target), target));
      if (t < 1) requestAnimationFrame(kick);
    };
    requestAnimationFrame(kick);
  }

  return <span style={{ color }}>{count}{suffix}</span>;
}

export default function StatsSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [trigger, setTrigger] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Stage 3D — incliné loin en arrière, pivote et fonce vers le spectateur
  const rotateX    = useTransform(scrollYProgress, [0, 1], [52, 0]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [-560, 0]);
  const stageY     = useTransform(scrollYProgress, [0, 1], [110, 0]);
  const stageOp    = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  // Fog de profondeur — s'éclaircit au fur et à mesure
  const blurPx     = useTransform(scrollYProgress, [0, 0.65], [22, 0]);
  const fogOp      = useTransform(scrollYProgress, [0, 0.7], [0.9, 0]);

  const stageFilter    = useMotionTemplate`blur(${blurPx}px)`;
  const stageTransform = useMotionTemplate`perspective(1400px) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;

  // Glow de profondeur (bloom unique)
  const glowScale = useTransform(scrollYProgress, [0.15, 0.65], [0.4, 1.8]);
  const glowOp    = useTransform(scrollYProgress, [0.1, 0.4, 0.85], [0, 0.55, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.55 && !trigger) setTrigger(true);
  });

  if (reduce) {
    return (
      <section style={{ padding: "4rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
            {STATS.map((s) => <Card key={s.label} stat={s} trigger={true} />)}
          </div>
        </div>
        <GridCSS />
      </section>
    );
  }

  return (
    <section ref={sectionRef} style={{ background: "transparent", padding: "5rem 0 4rem", overflow: "visible" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw", position: "relative" }}>

        {/* Bloom radial depuis la profondeur */}
        <motion.div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%",
          width: "700px", height: "700px", borderRadius: "50%",
          x: "-50%", y: "-50%",
          scale: glowScale, opacity: glowOp,
          background: "radial-gradient(circle, rgba(245,200,66,0.22) 0%, rgba(245,200,66,0.06) 38%, transparent 68%)",
          filter: "blur(100px)", pointerEvents: "none", zIndex: 0,
        }} />

        {/* Scène 3D */}
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
              {STATS.map((s) => <Card key={s.label} stat={s} trigger={trigger} />)}
            </div>
          </motion.div>

          {/* Fog overlay qui s'évapore */}
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
        // Profondeur Z individuelle par carte + légère inclinaison propre
        transform: `translateZ(${stat.z}px) rotateX(${stat.rx}deg)`,
        transformStyle: "preserve-3d",
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

function GridCSS() {
  return (
    <style>{`
      @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
      @media (max-width: 400px) { .stats-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  );
}
