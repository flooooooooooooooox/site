"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: 3, suffix: " min", label: "pour créer un devis", color: "#F5C842" },
  { value: 47, suffix: "", label: "fonctionnalités IA", color: "#4ADE80" },
  { value: 100, suffix: "%", label: "hébergé en France", color: "#60A5FA" },
  { value: 2026, suffix: "", label: "e-facturation prête", color: "#F5C842" },
];

const TRANSITION_STYLES = `
@keyframes wave-drift-1 {
  0%,100% { d: path("M0,32 Q120,8 240,32 T480,32 T720,32 T960,32 T1200,32 T1440,32"); }
  50%      { d: path("M0,32 Q120,56 240,32 T480,32 T720,32 T960,32 T1200,32 T1440,32"); }
}
@keyframes wave-drift-2 {
  0%,100% { d: path("M0,24 Q180,48 360,24 T720,24 T1080,24 T1440,24"); }
  50%      { d: path("M0,24 Q180,0  360,24 T720,24 T1080,24 T1440,24"); }
}
@keyframes wave-drift-3 {
  0%,100% { d: path("M0,40 Q90,16 180,40 T360,40 T540,40 T720,40 T900,40 T1080,40 T1260,40 T1440,40"); }
  50%      { d: path("M0,40 Q90,64 180,40 T360,40 T540,40 T720,40 T900,40 T1080,40 T1260,40 T1440,40"); }
}
@keyframes pulse-ring {
  0%   { transform: translateX(-50%) scale(0.6); opacity: 0.8; }
  100% { transform: translateX(-50%) scale(2.2); opacity: 0; }
}
@keyframes particle-float-0 { 0%,100%{transform:translateY(0) scale(1);opacity:0.7} 50%{transform:translateY(-22px) scale(1.3);opacity:1} }
@keyframes particle-float-1 { 0%,100%{transform:translateY(0) scale(1);opacity:0.5} 50%{transform:translateY(-28px) scale(1.1);opacity:0.9} }
@keyframes particle-float-2 { 0%,100%{transform:translateY(0) scale(1.2);opacity:0.6} 50%{transform:translateY(-18px) scale(0.8);opacity:1} }
@keyframes particle-float-3 { 0%,100%{transform:translateY(0) scale(1);opacity:0.4} 50%{transform:translateY(-32px) scale(1.4);opacity:0.8} }
@keyframes particle-float-4 { 0%,100%{transform:translateY(0) scale(0.9);opacity:0.6} 50%{transform:translateY(-24px) scale(1.2);opacity:1} }
@keyframes particle-float-5 { 0%,100%{transform:translateY(0) scale(1);opacity:0.5} 50%{transform:translateY(-20px) scale(1);opacity:0.9} }
@keyframes particle-float-6 { 0%,100%{transform:translateY(0) scale(1.1);opacity:0.7} 50%{transform:translateY(-16px) scale(0.9);opacity:1} }
@keyframes particle-float-7 { 0%,100%{transform:translateY(0) scale(1);opacity:0.3} 50%{transform:translateY(-26px) scale(1.3);opacity:0.7} }
.stats-transition-wave path { animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
`;

const PARTICLES = [
  { left: "8%",  size: 4, color: "#F5C842", delay: "0s",    dur: "3.2s", anim: 0 },
  { left: "18%", size: 3, color: "#4ADE80", delay: "0.6s",  dur: "2.8s", anim: 1 },
  { left: "29%", size: 5, color: "#F5C842", delay: "0.2s",  dur: "3.6s", anim: 2 },
  { left: "42%", size: 3, color: "#60A5FA", delay: "1.0s",  dur: "2.5s", anim: 3 },
  { left: "55%", size: 4, color: "#F5C842", delay: "0.4s",  dur: "3.0s", anim: 4 },
  { left: "66%", size: 3, color: "#4ADE80", delay: "0.8s",  dur: "3.4s", anim: 5 },
  { left: "78%", size: 5, color: "#F5C842", delay: "0.3s",  dur: "2.9s", anim: 6 },
  { left: "90%", size: 3, color: "#60A5FA", delay: "1.2s",  dur: "3.1s", anim: 7 },
];

function ImmersiveTransition() {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        width: "100%",
        height: "100px",
        marginBottom: "2rem",
        overflow: "visible",
      }}
    >
      <style>{TRANSITION_STYLES}</style>

      {/* Multi-layer SVG waves */}
      <svg
        className="stats-transition-wave"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <filter id="wave-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Layer 1 — thin ambient */}
        <path
          d="M0,32 Q120,8 240,32 T480,32 T720,32 T960,32 T1200,32 T1440,32"
          stroke="rgba(245,200,66,0.12)"
          strokeWidth="1"
          fill="none"
          style={{ animationName: "wave-drift-1", animationDuration: "5s" }}
        />
        {/* Layer 2 — medium */}
        <path
          d="M0,24 Q180,48 360,24 T720,24 T1080,24 T1440,24"
          stroke="rgba(245,200,66,0.22)"
          strokeWidth="1.2"
          fill="none"
          filter="url(#wave-glow)"
          style={{ animationName: "wave-drift-2", animationDuration: "3.8s" }}
        />
        {/* Layer 3 — bright glowing */}
        <path
          d="M0,40 Q90,16 180,40 T360,40 T540,40 T720,40 T900,40 T1080,40 T1260,40 T1440,40"
          stroke="rgba(245,200,66,0.65)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#wave-glow)"
          strokeLinecap="round"
          style={{ animationName: "wave-drift-3", animationDuration: "2.9s" }}
        />
        {/* Travelling shimmer */}
        <circle r="4" fill="#F5C842" opacity="0.95" filter="url(#wave-glow)">
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path="M0,40 Q90,16 180,40 T360,40 T540,40 T720,40 T900,40 T1080,40 T1260,40 T1440,40"
          />
          <animate attributeName="opacity" dur="3.2s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.05;0.9;1" />
        </circle>
        <circle r="2.5" fill="#4ADE80" opacity="0.8">
          <animateMotion
            dur="4.1s"
            begin="1.4s"
            repeatCount="indefinite"
            path="M0,24 Q180,48 360,24 T720,24 T1080,24 T1440,24"
          />
          <animate attributeName="opacity" dur="4.1s" begin="1.4s" repeatCount="indefinite" values="0;0.9;0.9;0" keyTimes="0;0.05;0.9;1" />
        </circle>
      </svg>

      {/* Floating particles above the wave */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "52px",
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationName: `particle-float-${p.anim}`,
            animationDuration: p.dur,
            animationDelay: p.delay,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />
      ))}

      {/* Central energy pulse rings */}
      <div style={{ position: "absolute", left: "50%", bottom: "40px" }}>
        <div style={{
          position: "absolute",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "1px solid rgba(245,200,66,0.5)",
          animation: "pulse-ring 2.4s ease-out infinite",
          transformOrigin: "center",
          transform: "translateX(-50%)",
          top: "-30px",
        }} />
        <div style={{
          position: "absolute",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "1px solid rgba(245,200,66,0.3)",
          animation: "pulse-ring 2.4s ease-out infinite",
          animationDelay: "0.8s",
          transformOrigin: "center",
          transform: "translateX(-50%)",
          top: "-30px",
        }} />
        <div style={{
          position: "absolute",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "1px solid rgba(245,200,66,0.15)",
          animation: "pulse-ring 2.4s ease-out infinite",
          animationDelay: "1.6s",
          transformOrigin: "center",
          transform: "translateX(-50%)",
          top: "-30px",
        }} />
        {/* Core dot */}
        <div style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#F5C842",
          boxShadow: "0 0 16px rgba(245,200,66,0.9), 0 0 32px rgba(245,200,66,0.4)",
          left: "-4px",
          top: "-4px",
        }} />
      </div>
    </div>
  );
}

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

const cardVariants = {
  hidden: (_i: number) => ({
    opacity: 0,
    y: 36,
    filter: "blur(14px)",
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
    <section style={{ background: "transparent", padding: "2rem 0 4rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw" }}>
        <ImmersiveTransition />

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
