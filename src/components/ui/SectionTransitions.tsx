"use client";
import { useEffect, useState } from "react";

// Terrain/building silhouette transition between hero and dark sections
export function HeroWave() {
  return (
    <div style={{ position: "relative", marginTop: "-2px", lineHeight: 0, zIndex: 1 }}>
      <svg
        viewBox="0 0 1440 160"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "clamp(80px, 12vw, 160px)", display: "block" }}
      >
        <defs>
          <linearGradient id="terrainGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(245,200,66,0)" />
            <stop offset="20%" stopColor="rgba(245,200,66,0.25)" />
            <stop offset="50%" stopColor="rgba(245,200,66,0.4)" />
            <stop offset="80%" stopColor="rgba(245,200,66,0.25)" />
            <stop offset="100%" stopColor="rgba(245,200,66,0)" />
          </linearGradient>
          <linearGradient id="terrainFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#05080D" stopOpacity="0" />
            <stop offset="100%" stopColor="#05080D" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Skyline background fill */}
        <path
          d="
            M0,160 L0,110
            L40,110 L40,90 L60,90 L60,70 L80,70 L80,90 L100,90 L100,75 L120,75 L120,55 L130,55 L130,45 L140,45 L140,55 L150,55 L150,90
            L180,90 L180,80 L200,80 L200,60 L210,60 L210,50 L220,50 L220,60 L230,60 L230,80 L250,80 L250,95
            L290,95 L290,85 L300,85 L300,65 L310,65 L310,50 L315,50 L315,40 L320,40 L325,40 L325,50 L330,50 L330,65 L340,65 L340,85 L360,85 L360,100
            L400,100 L400,85 L420,85 L420,70 L440,70 L440,55 L455,55 L455,45 L460,38 L465,45 L465,55 L480,55 L480,70 L500,70 L500,85 L520,85 L520,100
            L560,100 L560,90 L580,90 L580,75 L600,75 L600,60 L615,60 L615,50 L620,50 L620,60 L640,60 L640,80 L660,80 L660,95
            L700,95 L700,80 L720,80 L720,65 L730,65 L730,55 L735,48 L740,42 L745,48 L750,55 L760,55 L760,65 L780,65 L780,80 L800,80 L800,100
            L840,100 L840,85 L860,85 L860,70 L875,70 L875,58 L880,52 L885,58 L885,70 L900,70 L900,85 L920,85 L920,100
            L960,100 L960,88 L980,88 L980,72 L990,72 L990,60 L1000,60 L1000,50 L1010,50 L1010,60 L1020,60 L1020,72 L1040,72 L1040,88 L1060,88 L1060,105
            L1100,105 L1100,90 L1120,90 L1120,75 L1130,75 L1130,62 L1135,55 L1140,48 L1145,55 L1150,62 L1150,75 L1160,75 L1160,90 L1180,90 L1180,108
            L1220,108 L1220,92 L1240,92 L1240,78 L1260,78 L1260,65 L1270,65 L1270,55 L1280,55 L1280,65 L1290,65 L1290,78 L1310,78 L1310,95 L1330,95
            L1380,95 L1380,108 L1400,108 L1400,115 L1440,115 L1440,160 Z
          "
          fill="#05080D"
        />

        {/* Gold outline on top of skyline */}
        <path
          d="
            M0,110
            L40,110 L40,90 L60,90 L60,70 L80,70 L80,90 L100,90 L100,75 L120,75 L120,55 L130,55 L130,45 L140,45 L140,55 L150,55 L150,90
            L180,90 L180,80 L200,80 L200,60 L210,60 L210,50 L220,50 L220,60 L230,60 L230,80 L250,80 L250,95
            L290,95 L290,85 L300,85 L300,65 L310,65 L310,50 L315,50 L315,40 L320,40 L325,40 L325,50 L330,50 L330,65 L340,65 L340,85 L360,85 L360,100
            L400,100 L400,85 L420,85 L420,70 L440,70 L440,55 L455,55 L455,45 L460,38 L465,45 L465,55 L480,55 L480,70 L500,70 L500,85 L520,85 L520,100
            L560,100 L560,90 L580,90 L580,75 L600,75 L600,60 L615,60 L615,50 L620,50 L620,60 L640,60 L640,80 L660,80 L660,95
            L700,95 L700,80 L720,80 L720,65 L730,65 L730,55 L735,48 L740,42 L745,48 L750,55 L760,55 L760,65 L780,65 L780,80 L800,80 L800,100
            L840,100 L840,85 L860,85 L860,70 L875,70 L875,58 L880,52 L885,58 L885,70 L900,70 L900,85 L920,85 L920,100
            L960,100 L960,88 L980,88 L980,72 L990,72 L990,60 L1000,60 L1000,50 L1010,50 L1010,60 L1020,60 L1020,72 L1040,72 L1040,88 L1060,88 L1060,105
            L1100,105 L1100,90 L1120,90 L1120,75 L1130,75 L1130,62 L1135,55 L1140,48 L1145,55 L1150,62 L1150,75 L1160,75 L1160,90 L1180,90 L1180,108
            L1220,108 L1220,92 L1240,92 L1240,78 L1260,78 L1260,65 L1270,65 L1270,55 L1280,55 L1280,65 L1290,65 L1290,78 L1310,78 L1310,95 L1330,95
            L1380,95 L1380,108 L1400,108 L1400,115 L1440,115
          "
          fill="none"
          stroke="url(#terrainGold)"
          strokeWidth="1"
          opacity="0.9"
        />

        {/* Fade overlay so top blends into hero */}
        <rect x="0" y="0" width="1440" height="100" fill="url(#terrainFade)" />
      </svg>
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
