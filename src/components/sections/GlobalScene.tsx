"use client";
import { MeshGradient } from "@paper-design/shaders-react";

export default function GlobalScene() {
  return (
    <div style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }}>
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#000000", "#0D0500", "#3B1E00", "#6B3A00"]}
        speed={0.5}
        distortion={2.0}
        swirl={1.5}
      />
    </div>
  );
}
