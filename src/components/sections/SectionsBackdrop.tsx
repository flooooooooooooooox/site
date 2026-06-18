"use client";
import { MeshGradient } from "@paper-design/shaders-react";

// Animated gradient covering the full height of the content card, behind the content.
export default function SectionsBackdrop() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%" }}>
        <MeshGradient
          style={{ width: "100%", height: "100%" }}
          colors={["#000000", "#070300", "#160B00", "#241300"]}
          speed={0.4}
          distortion={1.6}
          swirl={1.1}
        />
        {/* Dark veil — keeps it subtle & dark */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,8,13,0.55)" }} />
      </div>
    </div>
  );
}
