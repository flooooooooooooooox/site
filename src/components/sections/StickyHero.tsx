"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Épingle le hero : il reste fixé pendant qu'on scrolle, puis recule
 * légèrement (scale) et s'estompe (opacity) à mesure que la suite du
 * contenu remonte par-dessus. Donne l'impression de profondeur 3D.
 */
export default function StickyHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 26, mass: 0.4 });

  const opacity = useTransform(smooth, [0, 0.55, 0.85], [1, 0.5, 0]);
  const scale = useTransform(smooth, [0, 0.85], [1, 0.9]);
  const y = useTransform(smooth, [0, 0.85], [0, -60]);

  return (
    <div ref={ref} style={{ height: "100vh", position: "relative", zIndex: 1 }}>
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          opacity,
          scale,
          y,
          transformOrigin: "center 40%",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
