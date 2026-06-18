"use client";
import { MeshGradient } from "@paper-design/shaders-react";

// Fixed animated gradient pinned to the viewport — always visible behind the content.
export default function SectionsBackdrop() {
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
        colors={["#000000", "#0A0400", "#2A1600", "#48280A"]}
        speed={0.4}
        distortion={1.6}
        swirl={1.1}
      />
      {/* Subtle dark veil — keeps it readable but still visible */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,8,13,0.35)" }} />
    </div>
  );
}
