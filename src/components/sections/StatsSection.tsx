"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const STATS = [
  { value: 3, suffix: " min", label: "pour créer un devis", color: "#2455D6" },
  { value: 47, suffix: "", label: "fonctionnalités", color: "#4ADE80" },
  { value: 100, suffix: "%", label: "hébergé en France", color: "#60A5FA" },
  { value: 2026, suffix: "", label: "e-facturation prête", color: "#2455D6" },
];

// easeOutQuart : les chiffres restent lisibles longtemps, le freinage arrive tard.
// (easeOutExpo atteignait la valeur finale aux deux tiers du temps.)
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const COUNT_MS = 2800;
const STAGGER_MS = 140;

function Counter({ target, suffix, color, trigger, index }: {
  target: number; suffix: string; color: string; trigger: boolean; index: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!trigger || started.current || !node) return;
    started.current = true;

    let raf = 0;
    let t0 = 0;
    const delay = index * STAGGER_MS;

    // Ecriture directe dans le DOM : aucun rendu React pendant l'animation.
    const step = (now: number) => {
      if (!t0) t0 = now;
      const elapsed = now - t0 - delay;
      if (elapsed < 0) { raf = requestAnimationFrame(step); return; }
      const p = Math.min(elapsed / COUNT_MS, 1);
      node.textContent = `${Math.round(easeOutQuart(p) * target)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, suffix, index]);

  return <span ref={ref} style={{ color }}>{`0${suffix}`}</span>;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 90, rotateX: 42, rotateY: -14, z: -260 },
  show: {
    opacity: 1, y: 0, rotateX: 0, rotateY: 0, z: 0,
    transition: { type: "spring", stiffness: 90, damping: 18, mass: 1 },
  },
};

function Card({ stat, trigger, index, tilt }: {
  stat: typeof STATS[number]; trigger: boolean; index: number; tilt: boolean;
}) {
  // Inclinaison 3D suivant le curseur — transform uniquement, donc composite.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), spring);
  const lift = useSpring(useTransform(py, [-0.5, 0.5], [18, 18]), spring);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        textAlign: "center",
        padding: "2rem 1.5rem",
        borderRadius: "1.25rem",
        background: "rgba(var(--surface-rgb),0.06)",
        border: "1px solid rgba(var(--surface-rgb),0.10)",
        boxShadow: "0 18px 50px rgba(10,21,32,0.10)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        willChange: "transform, opacity",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
          width: 140, height: 140,
          background: `radial-gradient(circle, ${stat.color}26, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      {/* Le contenu flotte au-dessus de la face de la carte : c'est ce decalage
          en profondeur qui donne le relief quand la carte s'incline. */}
      <motion.div style={{ z: tilt ? lift : 0, transformStyle: "preserve-3d" }}>
        <div style={{
          fontFamily: "var(--font-nunito)", fontWeight: 900,
          fontSize: "clamp(2.4rem,5vw,3.5rem)", lineHeight: 1,
          marginBottom: "0.6rem", letterSpacing: "-0.03em",
          fontVariantNumeric: "tabular-nums",
        }}>
          <Counter target={stat.value} suffix={stat.suffix} color={stat.color} trigger={trigger} index={index} />
        </div>
        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(var(--text-rgb),0.5)", letterSpacing: "0.04em" }}>
          {stat.label}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StatsSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTrigger(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: 0.05 } },
  };

  return (
    <section ref={sectionRef} style={{ background: "transparent", padding: "clamp(3rem,7vw,5rem) 0 4rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 6vw", position: "relative" }}>

        {/* Halo : seule l'opacite est animee — redimensionner un flou le fait
            recalculer a chaque frame. */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: trigger ? 0.5 : 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          style={{
            position: "absolute", top: "50%", left: "50%",
            width: 720, height: 720, borderRadius: "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, rgba(36,85,214,0.20) 0%, rgba(36,85,214,0.05) 40%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }}
        />

        <motion.div
          className="stats-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1.5rem",
            perspective: 1200,
            perspectiveOrigin: "50% 40%",
            transformStyle: "preserve-3d",
            position: "relative",
            zIndex: 1,
          }}
        >
          {STATS.map((s, i) => (
            <Card key={s.label} stat={s} trigger={trigger} index={i} tilt={!reduce} />
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 400px) { .stats-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
