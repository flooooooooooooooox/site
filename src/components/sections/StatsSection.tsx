"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: 3, suffix: " min", label: "pour créer un devis", color: "#F5C842" },
  { value: 47, suffix: "", label: "fonctionnalités IA", color: "#4ADE80" },
  { value: 100, suffix: "%", label: "hébergé en France", color: "#60A5FA" },
  { value: 2026, suffix: "", label: "e-facturation prête", color: "#F5C842" },
];

const SECTION_STYLES = `
@keyframes glow-pulse {
  0%   { opacity: 0; transform: translateX(-50%) scale(0.6); }
  30%  { opacity: 1; }
  100% { opacity: 0; transform: translateX(-50%) scale(3); }
}
`;

function springEase(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(2, -9 * t) * Math.cos(t * Math.PI * 2.8);
}

function Counter({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            setCount(Math.min(Math.round(springEase(t) * target), target));
            if (t < 1) requestAnimationFrame(animate);
            else setCount(target);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ color }}>
      {count}{suffix}
    </span>
  );
}

// Direction 1 — gold line expanding from center
function LineReveal() {
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "3rem", height: "40px" }}>
      {/* Expanding line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          height: "1px",
          width: "100%",
          maxWidth: "520px",
          background: "linear-gradient(90deg, transparent 0%, rgba(245,200,66,0.15) 15%, rgba(245,200,66,0.7) 50%, rgba(245,200,66,0.15) 85%, transparent 100%)",
          transformOrigin: "center",
        }}
      />
      {/* Center glow dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#F5C842",
          boxShadow: "0 0 16px rgba(245,200,66,0.9), 0 0 32px rgba(245,200,66,0.4)",
          zIndex: 1,
        }}
      />
    </div>
  );
}

// Direction 4 — one-time glow pulse behind the grid
function GlowPulse() {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          el.style.animationPlayState = "running";
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        width: "320px",
        height: "320px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,200,66,0.18) 0%, rgba(245,200,66,0.06) 40%, transparent 70%)",
        filter: "blur(24px)",
        pointerEvents: "none",
        animation: "glow-pulse 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
        animationPlayState: "paused",
        zIndex: 0,
      }}
    />
  );
}

const cardVariants = {
  hidden: (_i: number) => ({
    opacity: 0,
    y: 40,
    filter: "blur(12px)",
    scale: 0.95,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 18,
      delay: i * 0.1,
    },
  }),
};

export default function StatsSection() {
  return (
    <section style={{ background: "transparent", padding: "0 0 4rem" }}>
      <style>{SECTION_STYLES}</style>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw" }}>

        {/* Direction 1 — gold line */}
        <LineReveal />

        {/* Cards + Direction 4 glow */}
        <div style={{ position: "relative" }}>
          <GlowPulse />
          <div
            className="stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                whileHover={{
                  scale: 1.04,
                  borderColor: `${stat.color}40`,
                  boxShadow: `0 12px 40px ${stat.color}18`,
                  transition: { duration: 0.25 },
                }}
                style={{
                  textAlign: "center",
                  padding: "2rem 1.5rem",
                  borderRadius: "1.25rem",
                  background: "rgba(var(--surface-rgb),0.03)",
                  border: "1px solid rgba(var(--surface-rgb),0.07)",
                  backdropFilter: "blur(12px)",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "-30%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "140px",
                    height: "140px",
                    background: `radial-gradient(circle, ${stat.color}20, transparent 70%)`,
                    filter: "blur(18px)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-nunito)",
                    fontWeight: 900,
                    fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                    lineHeight: 1,
                    marginBottom: "0.6rem",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} color={stat.color} />
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "rgba(var(--text-rgb),0.5)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 400px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
