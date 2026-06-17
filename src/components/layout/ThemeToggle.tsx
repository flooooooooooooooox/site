"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("floxia-theme");
    if (stored === "light") {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("floxia-theme", next ? "dark" : "light");
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      style={{
        position: "relative",
        width: 52,
        height: 28,
        borderRadius: 999,
        border: isDark ? "1px solid rgba(245,200,66,0.3)" : "1px solid rgba(15,25,35,0.15)",
        background: isDark ? "rgba(245,200,66,0.08)" : "rgba(15,25,35,0.06)",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
        flexShrink: 0,
      }}
    >
      {/* Track icons */}
      <span style={{ position: "absolute", left: 7, fontSize: 11, opacity: isDark ? 0.9 : 0.3, transition: "opacity 0.3s" }}>🌙</span>
      <span style={{ position: "absolute", right: 7, fontSize: 11, opacity: isDark ? 0.3 : 0.9, transition: "opacity 0.3s" }}>☀️</span>
      {/* Thumb */}
      <span
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: isDark ? "#F5C842" : "#0F1923",
          boxShadow: isDark ? "0 0 8px rgba(245,200,66,0.6)" : "0 2px 8px rgba(0,0,0,0.2)",
          left: isDark ? 4 : 28,
          transition: "left 0.35s cubic-bezier(.22,1,.36,1), background 0.35s, box-shadow 0.35s",
        }}
      />
    </button>
  );
}
