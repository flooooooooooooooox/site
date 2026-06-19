"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: 3, suffix: " min", label: "pour créer un devis", color: "#F5C842" },
  { value: 47, suffix: "", label: "fonctionnalités IA", color: "#4ADE80" },
  { value: 100, suffix: "%", label: "hébergé en France", color: "#60A5FA" },
  { value: 2026, suffix: "", label: "e-facturation prête", color: "#F5C842" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
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
          const duration = 1400;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section style={{ background: "transparent", padding: "4rem 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw" }}>
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                textAlign: "center",
                padding: "2rem 1.5rem",
                borderRadius: "1.25rem",
                background: "rgba(var(--surface-rgb),0.03)",
                border: "1px solid rgba(var(--surface-rgb),0.07)",
                backdropFilter: "blur(12px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "-30%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "120px",
                  height: "120px",
                  background: `radial-gradient(circle, ${stat.color}20, transparent 70%)`,
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 900,
                  fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: "0.6rem",
                  letterSpacing: "-0.03em",
                }}
              >
                <Counter target={stat.value} suffix={stat.suffix} />
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
