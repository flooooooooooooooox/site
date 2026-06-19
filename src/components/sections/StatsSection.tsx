"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: 3, suffix: " min", label: "pour créer un devis", color: "#F5C842" },
  { value: 47, suffix: "", label: "fonctionnalités IA", color: "#4ADE80" },
  { value: 100, suffix: "%", label: "hébergé en France", color: "#60A5FA" },
  { value: 2026, suffix: "", label: "e-facturation prête", color: "#F5C842" },
];

// Option B — spring easing with gentle overshoot
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
            const eased = springEase(t);
            // clamp so display never exceeds target
            setCount(Math.min(Math.round(eased * target), target));
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

// Option C — animated SVG wave separator
function WaveSeparator() {
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "2.5rem",
        overflow: "hidden",
      }}
    >
      <svg
        width="480"
        height="28"
        viewBox="0 0 480 28"
        fill="none"
        style={{ display: "block", maxWidth: "90vw" }}
      >
        {/* Static base wave */}
        <path
          d="M0,14 Q60,4 120,14 T240,14 T360,14 T480,14"
          stroke="rgba(245,200,66,0.1)"
          strokeWidth="1"
          fill="none"
        />
        {/* Animated glowing wave */}
        <path
          d="M0,14 Q60,4 120,14 T240,14 T360,14 T480,14"
          stroke="rgba(245,200,66,0.55)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            dur="3.5s"
            repeatCount="indefinite"
            values="
              M0,14 Q60,4 120,14 T240,14 T360,14 T480,14;
              M0,14 Q60,24 120,14 T240,14 T360,14 T480,14;
              M0,14 Q60,4 120,14 T240,14 T360,14 T480,14
            "
          />
          <animate
            attributeName="opacity"
            dur="3.5s"
            repeatCount="indefinite"
            values="0.3;1;0.3"
          />
        </path>
        {/* Travelling shimmer dot */}
        <circle r="3" fill="#F5C842" opacity="0.9">
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M0,14 Q60,4 120,14 T240,14 T360,14 T480,14"
          />
          <animate attributeName="opacity" dur="3.5s" repeatCount="indefinite" values="0;1;0" />
        </circle>
      </svg>
    </div>
  );
}

// Option B card spring variants
const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 36,
    filter: "blur(14px)", // Option D — blur-to-focus
    scale: 0.94,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 160,
      damping: 16,
      delay: i * 0.12,
    },
  }),
};

export default function StatsSection() {
  return (
    <section style={{ background: "transparent", padding: "4rem 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw" }}>
        {/* Option C — wave above cards */}
        <WaveSeparator />

        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
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
              {/* Radial glow */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "-30%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "140px",
                  height: "140px",
                  background: `radial-gradient(circle, ${stat.color}22, transparent 70%)`,
                  filter: "blur(18px)",
                  pointerEvents: "none",
                  transition: "opacity 0.3s",
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
