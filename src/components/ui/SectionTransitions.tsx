import React from "react";

interface TransitionProps {
  topColor?: string;
  bottomColor?: string;
}

export function LiquidWave({ topColor = "#0F1923", bottomColor = "#0A1520" }: TransitionProps) {
  return (
    <div style={{ width: "100%", height: "120px", backgroundColor: topColor, overflow: "hidden", position: "relative", display: "block", marginBottom: "-2px" }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
        <path d="M0,40 C320,100 420,0 720,40 C1020,80 1120,0 1440,40 L1440,120 L0,120 Z" fill={bottomColor} opacity="0.5" />
        <path d="M0,60 C280,0 480,120 720,60 C960,0 1160,120 1440,60 L1440,120 L0,120 Z" fill={bottomColor} />
      </svg>
    </div>
  );
}

export function GoldParticleLine({ topColor = "#0F1923", bottomColor = "#0A1520" }: TransitionProps) {
  const particles = [
    { left: "8%", size: 4, opacity: 0.8 },
    { left: "22%", size: 6, opacity: 0.6 },
    { left: "38%", size: 3, opacity: 0.9 },
    { left: "52%", size: 5, opacity: 0.7 },
    { left: "67%", size: 7, opacity: 0.5 },
    { left: "80%", size: 4, opacity: 0.8 },
    { left: "93%", size: 5, opacity: 0.6 },
  ];
  return (
    <div style={{ width: "100%", height: "100px", background: `linear-gradient(to bottom, ${topColor} 50%, ${bottomColor} 50%)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", height: "1px", backgroundColor: "#F5C842", boxShadow: "0 0 10px 1px rgba(245,200,66,0.6), 0 0 30px 4px rgba(245,200,66,0.25), 0 0 60px 8px rgba(245,200,66,0.1)" }} />
      {particles.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: p.left, width: `${p.size}px`, height: `${p.size}px`, backgroundColor: "#F5C842", borderRadius: "50%", opacity: p.opacity, filter: "blur(1px)", boxShadow: "0 0 8px 2px rgba(245,200,66,0.8)", transform: "translateY(-50%)", top: "50%" }} />
      ))}
    </div>
  );
}

export function DiagonalSlash({ topColor = "#0F1923", bottomColor = "#0A1520" }: TransitionProps) {
  return (
    <div style={{ width: "100%", height: "100px", backgroundColor: topColor, position: "relative", overflow: "hidden", display: "block", marginBottom: "-2px" }}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
        <polygon points="0,100 1440,0 1440,100" fill={bottomColor} />
        <line x1="0" y1="100" x2="1440" y2="0" stroke="#F5C842" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 6px rgba(245,200,66,0.8))" }} />
      </svg>
    </div>
  );
}

export function FogBlend({ topColor = "#0F1923", bottomColor = "#0A1520" }: TransitionProps) {
  return (
    <div style={{ width: "100%", height: "180px", background: `radial-gradient(ellipse 60% 80% at 50% 50%, rgba(245,200,66,0.08) 0%, transparent 100%), linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 40%, rgba(245,200,66,0.04) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(245,200,66,0.04) 0%, transparent 40%)", mixBlendMode: "screen" }} />
    </div>
  );
}
