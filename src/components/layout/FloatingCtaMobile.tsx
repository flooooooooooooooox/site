"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingCtaMobile() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 320) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <>
      <div
        className="floating-cta-mobile"
        style={{
          position: "fixed",
          bottom: "1.25rem",
          left: "1rem",
          right: "1rem",
          zIndex: 8888,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.85rem 1.1rem",
          borderRadius: "1rem",
          background: "rgba(255,255,255,0.97)",
          border: "1px solid rgba(36,85,214,0.3)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 8px 40px rgba(27,42,74,0.18), 0 0 0 1px rgba(36,85,214,0.1)",
          animation: "slideUpCta 0.4s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        {/* Pulse dot */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ADE80" }} />
          <div style={{
            position: "absolute", inset: -3, borderRadius: "50%",
            border: "2px solid #4ADE80", opacity: 0.4,
            animation: "pulseDot 1.8s ease-in-out infinite",
          }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#4ADE80", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.15rem" }}>
            Démo gratuite disponible
          </div>
          <div style={{ fontSize: "0.78rem", color: "rgba(27,42,74,0.6)", fontWeight: 500 }}>
            Sans engagement · 30 min
          </div>
        </div>

        <a
          href="https://calendly.com/afele1845/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.35rem",
            padding: "0.6rem 1.1rem", borderRadius: "0.6rem",
            background: "#2455D6", color: "#FFFFFF",
            fontWeight: 700, fontSize: "0.8rem", textDecoration: "none",
            whiteSpace: "nowrap", flexShrink: 0,
          }}
        >
          Réserver →
        </a>

        <button
          onClick={() => setDismissed(true)}
          aria-label="Fermer"
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(27,42,74,0.35)", padding: "0.2rem",
            fontSize: "1.1rem", lineHeight: 1, flexShrink: 0,
          }}
        >
          ×
        </button>
      </div>

      <style>{`
        @keyframes slideUpCta {
          from { transform: translateY(120%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.6); opacity: 0; }
        }
        /* Desktop : masqué */
        @media (min-width: 769px) {
          .floating-cta-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
