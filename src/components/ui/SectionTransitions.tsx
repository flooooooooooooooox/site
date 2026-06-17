"use client";
import { useEffect, useState, useRef } from "react";

// Animated 3D warp tunnel transition — canvas-based gold grid flying toward viewer
export function HeroWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const horizon = H * 0.08;
      const LINES = 12;
      const speed = 0.018;
      t = (t + speed) % 1;

      // Draw perspective grid lines (vertical — left/right vanishing)
      for (let i = 0; i <= LINES; i++) {
        const frac = i / LINES; // 0..1
        const xStart = W * frac;
        const xEnd = cx + (xStart - cx) * 0.01;
        const alpha = 0.06 + 0.18 * Math.sin(Math.PI * frac);
        ctx.beginPath();
        ctx.moveTo(xStart, H);
        ctx.lineTo(xEnd, horizon);
        ctx.strokeStyle = `rgba(245,200,66,${alpha})`;
        ctx.lineWidth = 1 * window.devicePixelRatio;
        ctx.stroke();
      }

      // Draw horizontal lines flying toward viewer
      const HLINES = 14;
      for (let i = 0; i < HLINES; i++) {
        const prog = ((i / HLINES) + t) % 1; // 0=horizon, 1=bottom
        const eased = Math.pow(prog, 2.2);
        const y = horizon + (H - horizon) * eased;
        const spread = eased;
        const x0 = cx - (cx) * spread;
        const x1 = cx + (cx) * spread;
        const alpha = Math.min(eased * 0.7, 0.35);
        ctx.beginPath();
        ctx.moveTo(x0, y);
        ctx.lineTo(x1, y);
        ctx.strokeStyle = `rgba(245,200,66,${alpha})`;
        ctx.lineWidth = (0.5 + eased * 1.5) * window.devicePixelRatio;
        ctx.stroke();
      }

      // Gold horizon glow
      const grad = ctx.createLinearGradient(0, horizon - 2, 0, horizon + 6);
      grad.addColorStop(0, "rgba(245,200,66,0)");
      grad.addColorStop(0.5, "rgba(245,200,66,0.55)");
      grad.addColorStop(1, "rgba(245,200,66,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, horizon - 2, W, 8);

      // Fade overlay top→transparent, bottom→dark
      const fade = ctx.createLinearGradient(0, 0, 0, H);
      fade.addColorStop(0, "rgba(5,8,13,0.95)");
      fade.addColorStop(0.25, "rgba(5,8,13,0.4)");
      fade.addColorStop(0.7, "rgba(5,8,13,0.1)");
      fade.addColorStop(1, "rgba(5,8,13,0)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ position: "relative", marginTop: "-1px", zIndex: 1, height: "clamp(160px, 20vw, 260px)", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

function useTheme() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  return isDark ? "dark" : "light" as "dark" | "light";
}

// 1. Perspective 3D floor with grid
export function Perspective3DFloor() {
  const mode = useTheme();
  const isDark = mode === "dark";
  const bg = isDark ? "transparent" : "#F8F9FC";
  const grid = isDark ? "rgba(232,237,244,0.07)" : "rgba(15,25,35,0.07)";
  return (
    <div style={{ width: "100%", height: "140px", perspective: "800px", overflow: "hidden", position: "relative", background: bg }}>
      <div style={{
        position: "absolute", width: "100%", height: "200%", top: "-50%", left: 0,
        background: bg,
        transform: "rotateX(65deg)", transformOrigin: "center bottom",
        backgroundImage: `linear-gradient(${grid} 2px, transparent 2px), linear-gradient(90deg, ${grid} 2px, transparent 2px)`,
        backgroundSize: "60px 60px",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: `linear-gradient(to top, ${bg}, transparent)` }} />
      <div style={{ position: "absolute", bottom: "30%", left: "50%", transform: "translateX(-50%)", width: "40%", height: "2px", background: "linear-gradient(to right, transparent, rgba(245,200,66,0.4) 50%, transparent)", boxShadow: "0 0 20px rgba(245,200,66,0.2)" }} />
    </div>
  );
}

// 2. Cube edge with gold glow band
export function CubeEdge() {
  const mode = useTheme();
  const isDark = mode === "dark";
  const top = isDark ? "transparent" : "#EFEFEF";
  const edge = isDark ? "transparent" : "#E0E0E0";
  const bottom = isDark ? "transparent" : "#FFFFFF";
  return (
    <div style={{ width: "100%", height: "80px", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, background: `linear-gradient(to bottom, ${top}, ${edge})` }} />
      <div style={{ height: "3px", background: "linear-gradient(to right, transparent, #F5C842 20%, #F5C842 80%, transparent)", boxShadow: "0 0 16px rgba(245,200,66,0.7), 0 0 40px rgba(245,200,66,0.3)" }} />
      <div style={{ flex: 1, background: `linear-gradient(to bottom, ${edge}, ${bottom})` }} />
    </div>
  );
}

// 3. Ripple portal — concentric ellipses
export function RippleDepth() {
  const mode = useTheme();
  const isDark = mode === "dark";
  const bg = isDark ? "transparent" : "#FFFFFF";
  const ring = isDark ? "#E8EDF4" : "#0F1923";
  const rings = [
    { rx: 440, ry: 88, op: 0.06 },
    { rx: 350, ry: 70, op: 0.1 },
    { rx: 260, ry: 52, op: 0.14 },
    { rx: 170, ry: 34, op: 0.18 },
    { rx: 90, ry: 18, op: 0.22 },
    { rx: 42, ry: 9, op: 0.9, gold: true },
  ];
  return (
    <div style={{ width: "100%", height: "160px", background: bg, position: "relative", overflow: "hidden" }}>
      <svg width="100%" height="160" viewBox="0 0 1000 160" preserveAspectRatio="xMidYMax meet" style={{ position: "absolute", bottom: 0 }}>
        {rings.map((r, i) => (
          <ellipse key={i} cx="500" cy="160" rx={r.rx} ry={r.ry} fill="none"
            stroke={r.gold ? "#F5C842" : ring} strokeWidth={r.gold ? "2.5" : "1.5"} opacity={r.op}
            style={r.gold ? { filter: "drop-shadow(0 0 8px rgba(245,200,66,0.8))" } : {}} />
        ))}
      </svg>
    </div>
  );
}

// 4. Prism slice — 3D crystal edge
export function PrismSlice() {
  const mode = useTheme();
  const isDark = mode === "dark";
  const bg = isDark ? "#0F1923" : "#F8F9FC";
  const f1 = isDark ? "#162030" : "#ECECEC";
  const f2 = isDark ? "#1E2D40" : "#DEDEDE";
  return (
    <div style={{ width: "100%", height: "100px", position: "relative", background: bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: f1, clipPath: "polygon(0 0, 100% 28%, 100% 100%, 0 72%)" }} />
      <div style={{ position: "absolute", inset: 0, background: f2, clipPath: "polygon(0 72%, 100% 28%, 100% 100%, 0 100%)" }} />
      <div style={{ position: "absolute", width: "100%", height: "2px", top: "calc(28% - 1px)", left: 0, background: "linear-gradient(to right, transparent, #F5C842 15%, #F5C842 85%, transparent)", boxShadow: "0 0 14px rgba(245,200,66,0.9)", transform: "skewY(-2.2deg)", transformOrigin: "left center" }} />
    </div>
  );
}

// 5. Depth fade — cinematic perspective grid
export function DepthFade() {
  const mode = useTheme();
  const isDark = mode === "dark";
  const bg = isDark ? "transparent" : "#F8F9FC";
  const grid = isDark ? "rgba(232,237,244,0.06)" : "rgba(15,25,35,0.06)";
  const vignette = isDark ? "transparent" : "rgba(248,249,252,0.92)";
  return (
    <div style={{ width: "100%", height: "200px", position: "relative", background: bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", width: "130%", height: "300%", top: "-100%", left: "-15%",
        backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        transform: "perspective(600px) rotateX(60deg)", transformOrigin: "center top", opacity: 0.7 }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center top, transparent 0%, ${vignette} 100%)` }} />
      <div style={{ position: "absolute", width: "60%", height: "1px", top: "38%", left: "20%", background: "linear-gradient(to right, transparent, rgba(245,200,66,0.35) 50%, transparent)", boxShadow: "0 0 24px rgba(245,200,66,0.2)" }} />
    </div>
  );
}
