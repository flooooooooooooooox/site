"use client";
import { MeshGradient } from "@paper-design/shaders-react";

export default function GlobalScene() {
  return (
    <div style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }}>
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#05080D", "#1F0D00", "#150800", "#0A0500"]}
        speed={0.3}
        distortion={1.4}
        swirl={0.8}
      />
    </div>
  );
}
