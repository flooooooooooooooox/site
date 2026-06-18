"use client";
import { MeshGradient } from "@paper-design/shaders-react";

// Sticky animated gradient that stays in the viewport behind the scrolling content.
export default function SectionsBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        zIndex: 0,
        marginBottom: "-100vh",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
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
