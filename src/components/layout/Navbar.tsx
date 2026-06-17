"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        ...(scrolled
          ? {
              top: "16px",
              left: "50%",
              right: "auto",
              transform: "translateX(-50%)",
              maxWidth: "680px",
              width: "calc(100% - 2rem)",
              borderRadius: "9999px",
              padding: "0.5rem 1.5rem",
              background: "rgba(15,25,35,0.95)",
              backdropFilter: "blur(32px)",
              border: "1px solid rgba(245,200,66,0.2)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            }
          : {
              top: 0,
              left: 0,
              right: 0,
              transform: "none",
              maxWidth: "none",
              width: "auto",
              borderRadius: 0,
              padding: "1rem 5vw",
              background: "rgba(15,25,35,0.85)",
              backdropFilter: "blur(24px)",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "none",
            }),
      }}
    >
      <a
        href="#"
        style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.15rem", color: "#E8EDF4" }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            background: "#F5C842",
            clipPath: "polygon(65% 0%,35% 45%,60% 45%,35% 100%,65% 55%,40% 55%)",
          }}
        />
        Floxia
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: "2.25rem" }}>
        {["Services", "Ecosystème", "Comparatif", "ROI", "Tarifs"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="text-[.78rem] font-semibold tracking-[.06em] uppercase no-underline transition-colors"
            style={{ color: "rgba(232,237,244,.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E8EDF4")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,237,244,.4)")}
          >
            {l}
          </a>
        ))}
        <ThemeToggle />
        <a
          href="https://calendly.com/afele1845/30min"
          target="_blank"
          rel="noopener"
          className="text-[.78rem] font-extrabold no-underline rounded-full px-5 py-2 transition-all hover:scale-105"
          style={{ background: "#F5C842", color: "#1E2B45" }}
        >
          Réserver une démo
        </a>
      </div>
    </nav>
  );
}
