"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * La suite du contenu arrive « par-dessus » le hero avec une vraie
 * rotation 3D : la carte est inclinée vers l'arrière (rotateX) puis
 * se redresse à plat en glissant vers le haut, vue en perspective.
 * Un lissage par spring rend le mouvement fluide.
 */
export default function ContentOverlay({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  // Lissage : on amortit la progression du scroll pour un mouvement fluide.
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  const rotateX = useTransform(smooth, [0, 1], [22, 0]); // inclinée -> à plat
  const y = useTransform(smooth, [0, 1], [140, 0]); // glisse vers le haut
  const scale = useTransform(smooth, [0, 1], [0.92, 1]); // grandit en approchant
  const lipOpacity = useTransform(smooth, [0, 0.6, 1], [0, 1, 0.85]);

  return (
    <div
      style={{
        perspective: "1600px",
        perspectiveOrigin: "center top",
        position: "relative",
        zIndex: 2,
        marginTop: "-10vh",
      }}
    >
      <motion.div
        ref={ref}
        style={{
          position: "relative",
          transformOrigin: "center top",
          transformStyle: "preserve-3d",
          rotateX,
          y,
          scale,
          borderTopLeftRadius: "2.5rem",
          borderTopRightRadius: "2.5rem",
          background:
            "linear-gradient(to bottom, rgba(5,8,13,0.94) 0%, rgba(5,8,13,0.6) 14vh, rgba(5,8,13,0) 38vh)",
          boxShadow: "0 -40px 90px -12px rgba(0,0,0,0.8)",
          willChange: "transform",
        }}
      >
        {/* Lèvre dorée lumineuse sur tout le bord supérieur */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            borderTopLeftRadius: "2.5rem",
            borderTopRightRadius: "2.5rem",
            background:
              "linear-gradient(to right, transparent, rgba(245,200,66,0.9) 50%, transparent)",
            boxShadow: "0 0 30px rgba(245,200,66,0.6), 0 0 70px rgba(245,200,66,0.3)",
            opacity: lipOpacity,
            pointerEvents: "none",
          }}
        />
        {/* Reflet blanc subtil sous la lèvre */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "2px",
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.18) 50%, transparent)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>{children}</div>
      </motion.div>
    </div>
  );
}
