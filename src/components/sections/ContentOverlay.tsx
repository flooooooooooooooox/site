"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Fait arriver la suite du contenu « par-dessus » le hero :
 * une grande carte qui glisse vers le haut, avec un bord arrondi,
 * une lèvre lumineuse dorée et une ombre portée — pendant que le
 * hero recule légèrement (scale + fondu) en arrière-plan.
 */
export default function ContentOverlay({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Progression du scroll : du moment où la carte entre par le bas
  // jusqu'à ce qu'elle ait recouvert le hero.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [44, 0]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 0]);
  const lipOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "relative",
        zIndex: 2,
        marginTop: "-9vh",
        y,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
      }}
    >
      {/* Ombre portée — la carte projette son ombre sur le hero */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          transform: "translateY(-100%)",
          background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          opacity: shadowOpacity,
          pointerEvents: "none",
        }}
      />
      {/* Lèvre dorée sur le bord supérieur de la carte */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(245,200,66,0.7) 50%, transparent)",
          boxShadow: "0 0 24px rgba(245,200,66,0.4)",
          opacity: lipOpacity,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>{children}</div>
    </motion.div>
  );
}
