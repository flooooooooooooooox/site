"use client";
import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

function useIsDark() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

// Fixed animated gradient pinned to the viewport — always visible behind the content.
export default function SectionsBackdrop() {
  const isDark = useIsDark();

  const colors = isDark
    ? ["#000000", "#0A0400", "#2A1600", "#48280A"]
    : ["#FFFFFF", "#F4F2EC", "#F7ECD6", "#EFE2C2"];
  const veil = isDark ? "rgba(5,8,13,0.35)" : "rgba(250,250,252,0.62)";

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={colors}
        speed={0.15}
        distortion={1.6}
        swirl={1.1}
        // Optimisation : rendu en 1x (au lieu de 2x) + plafond de pixels bas.
        // L'animation continue de tourner, mais le coût GPU est fortement réduit.
        minPixelRatio={1}
        maxPixelCount={2073600}
      />
      {/* Veil — keeps it readable but still visible */}
      <div style={{ position: "absolute", inset: 0, background: veil }} />
    </div>
  );
}
