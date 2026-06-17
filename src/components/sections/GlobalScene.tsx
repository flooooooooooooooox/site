"use client";
import { motion } from "framer-motion";

export default function GlobalScene() {
  const base: React.CSSProperties = {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(100px)",
    pointerEvents: "none",
  };

  return (
    <div style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", overflow: "hidden", background: "#05080D" }}>
      {/* Gold spotlight 1 */}
      <motion.div
        style={{ ...base, width: 600, height: 600, background: "radial-gradient(circle, rgba(245,200,66,0.12) 0%, transparent 70%)", top: "10%", left: "5%" }}
        animate={{ x: [0, 100, -80, 0], y: [0, -80, 60, 0] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />
      {/* Gold spotlight 2 */}
      <motion.div
        style={{ ...base, width: 500, height: 500, background: "radial-gradient(circle, rgba(230,168,0,0.09) 0%, transparent 70%)", top: "40%", right: "0%" }}
        animate={{ x: [0, -120, 60, 0], y: [0, 80, -60, 0] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 4 }}
      />
      {/* Subtle warm light bottom */}
      <motion.div
        style={{ ...base, width: 700, height: 400, background: "radial-gradient(circle, rgba(245,180,50,0.07) 0%, transparent 70%)", bottom: "5%", left: "30%" }}
        animate={{ x: [0, 80, -50, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 8 }}
      />
    </div>
  );
}
