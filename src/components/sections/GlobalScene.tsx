"use client";
import { MeshGradient } from "@paper-design/shaders-react";

export default function GlobalScene() {
  return (
    <div style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }}>
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#05080D", "#0D1600", "#1C1200", "#05080D"]}
        speed={0.35}
        distortion={1.2}
        swirl={0.6}
      />
    </div>
  );
}
