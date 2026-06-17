"use client";
import { motion } from "framer-motion";

export default function SectionSpotlight({ children, style }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(90px)",
    pointerEvents: "none",
    mixBlendMode: "screen",
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      {/* Spotlights */}
      <motion.div
        style={{
          ...base,
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(245,200,66,0.13) 0%, transparent 70%)",
          position: "absolute", top: "0%", left: "5%", zIndex: 0,
        }}
        animate={{ x: [0, 80, -60, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        style={{
          ...base,
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(230,168,0,0.09) 0%, transparent 70%)",
          position: "absolute", bottom: "10%", right: "10%", zIndex: 0,
        }}
        animate={{ x: [0, -60, 40, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 4 }}
      />
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
