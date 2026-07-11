"use client";
import { useEffect, useState, useRef } from "react";

// Ember particles rising from hero into darkness
export function HeroWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    }
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; life: number; maxLife: number;
      color: string;
    };

    const COLORS = [
      "rgba(245,200,66,",
      "rgba(255,160,30,",
      "rgba(255,220,100,",
      "rgba(200,100,20,",
    ];

    const particles: Particle[] = [];
    const COUNT = 90;

    function spawn(): Particle {
      if (!canvas) return {} as Particle;
      const W = canvas.width, H = canvas.height;
      const maxLife = 90 + Math.random() * 120;
      return {
        x: W * (0.1 + Math.random() * 0.8),
        y: H * (0.7 + Math.random() * 0.35),
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.5 + Math.random() * 1.8),
        size: 1.5 + Math.random() * 3,
        alpha: 0.6 + Math.random() * 0.4,
        life: Math.random() * maxLife,
        maxLife,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    for (let i = 0; i < COUNT; i++) particles.push(spawn());

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Dark gradient base
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "rgba(5,8,13,0)");
      bg.addColorStop(0.35, "rgba(5,8,13,0.4)");
      bg.addColorStop(1, "rgba(5,8,13,0.98)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        if (p.life > p.maxLife) { particles[i] = spawn(); continue; }

        const progress = p.life / p.maxLife;
        const fadeIn = Math.min(progress * 6, 1);
        const fadeOut = 1 - Math.pow(progress, 2);
        const opacity = p.alpha * fadeIn * fadeOut;

        p.x += p.vx + Math.sin(p.life * 0.05) * 0.3;
        p.y += p.vy;
        p.vy *= 0.995; // slight deceleration

        if (opacity <= 0) continue;

        // Glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, `${p.color}${opacity.toFixed(2)})`);
        glow.addColorStop(1, `${p.color}0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,180,${opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ position: "relative", marginTop: "-1px", zIndex: 1, height: "clamp(180px, 22vw, 300px)", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
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
    <div style={{ width: "100%", height: "clamp(60px, 14vw, 140px)", perspective: "800px", overflow: "hidden", position: "relative", background: bg }}>
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
    <div style={{ width: "100%", height: "clamp(70px, 16vw, 160px)", background: bg, position: "relative", overflow: "hidden" }}>
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
    <div style={{ width: "100%", height: "clamp(80px, 18vw, 200px)", position: "relative", background: bg, overflow: "hidden" }}>
      <div style={{ position: "absolute", width: "130%", height: "300%", top: "-100%", left: "-15%",
        backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        transform: "perspective(600px) rotateX(60deg)", transformOrigin: "center top", opacity: 0.7 }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center top, transparent 0%, ${vignette} 100%)` }} />
      <div style={{ position: "absolute", width: "60%", height: "1px", top: "38%", left: "20%", background: "linear-gradient(to right, transparent, rgba(245,200,66,0.35) 50%, transparent)", boxShadow: "0 0 24px rgba(245,200,66,0.2)" }} />
    </div>
  );
}
