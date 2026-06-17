"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function Spotlight({ style }: { style: React.CSSProperties }) {
  return <motion.div style={style} />;
}

export default function GlobalScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const base: React.CSSProperties = {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(80px)",
    pointerEvents: "none",
    mixBlendMode: "screen",
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        zIndex: 0, pointerEvents: "none", overflow: "hidden",
      }}
    >
      {/* Background photo */}
      <img
        src="/chantier1.png"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,10,16,0.55)" }} />

      {/* Spotlights */}
      <div style={{ position: "absolute", inset: 0 }}>
        {/* Left gold spotlight */}
        <Spotlight
          style={{
            ...base,
            width: 600, height: 600,
            background: "radial-gradient(circle, rgba(245,200,66,0.18) 0%, transparent 70%)",
            top: "20%", left: "10%",
          }}
        />
        <motion.div
          style={{
            ...base,
            width: 600, height: 600,
            background: "radial-gradient(circle, rgba(245,200,66,0.18) 0%, transparent 70%)",
            position: "absolute",
            top: "20%", left: "10%",
          }}
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -80, 60, 0],
            rotate: ["0deg", "15deg", "-15deg", "0deg"],
          }}
          transition={{ duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Center amber spotlight */}
        <motion.div
          style={{
            ...base,
            width: 700, height: 700,
            background: "radial-gradient(circle, rgba(230,168,0,0.12) 0%, transparent 70%)",
            position: "absolute",
            top: "30%", left: "35%",
          }}
          animate={{
            x: [0, 120, -80, 0],
            y: [0, 100, 40, 0],
            rotate: ["-20deg", "0deg", "20deg", "-20deg"],
          }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 3 }}
        />

        {/* Right warm spotlight */}
        <motion.div
          style={{
            ...base,
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(255,180,50,0.1) 0%, transparent 70%)",
            position: "absolute",
            top: "10%", right: "5%",
          }}
          animate={{
            x: [0, -100, 40, 0],
            y: [0, -60, 80, 0],
            rotate: ["10deg", "-10deg", "25deg", "10deg"],
          }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 5 }}
        />
      </div>
    </div>
  );
}
