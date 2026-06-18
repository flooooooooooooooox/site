"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Fait arriver la suite du contenu « par-dessus » le hero :
 * une grande carte qui glisse vers le haut, avec un bord arrondi,
 * une ombre portée marquée et une lèvre dorée lumineuse — l'effet
 * de superposition cinématique au-dessus du hero.
 */
export default function ContentOverlay({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  // La carte glisse vers le haut au fur et à mesure qu'elle entre.
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: "relative",
        zIndex: 2,
        marginTop: "-12vh",
        y,
        borderTopLeftRadius: "2.5rem",
        borderTopRightRadius: "2.5rem",
        // Surface sombre translucide : on voit le gradient animé à travers,
        // mais le bord arrondi et l'ombre sont bien visibles.
        background: "linear-gradient(to bottom, rgba(5,8,13,0.92) 0%, rgba(5,8,13,0.55) 16vh, rgba(5,8,13,0) 40vh)",
        boxShadow: "0 -30px 70px -10px rgba(0,0,0,0.75)",
      }}
    >
      {/* Lèvre dorée lumineuse sur tout le bord supérieur */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          borderTopLeftRadius: "2.5rem",
          borderTopRightRadius: "2.5rem",
          background: "linear-gradient(to right, transparent, rgba(245,200,66,0.85) 50%, transparent)",
          boxShadow: "0 0 30px rgba(245,200,66,0.6), 0 0 60px rgba(245,200,66,0.25)",
          pointerEvents: "none",
        }}
      />
      {/* Reflet doux sous la lèvre */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15) 50%, transparent)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>{children}</div>
    </motion.div>
  );
}
