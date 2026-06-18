"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Écosystème", href: "/#ecosysteme" },
  { label: "Comparatif", href: "/#comparatif" },
  { label: "ROI", href: "/#roi" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
];

function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  // Liens d'ancrage : si la cible existe sur la page courante, scroll fluide.
  // Sinon (ex. depuis une autre page), on laisse le navigateur naviguer vers /#id.
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return;
  const id = href.substring(hashIndex);
  const target = document.querySelector(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // Positionnement constant (left/transform jamais changés) -> transition fluide
          left: "50%",
          transform: "translateX(-50%)",
          willChange: "max-width, padding, border-radius, background, top",
          transition:
            "max-width 0.5s cubic-bezier(0.22,1,0.36,1), width 0.5s cubic-bezier(0.22,1,0.36,1), padding 0.5s cubic-bezier(0.22,1,0.36,1), border-radius 0.5s cubic-bezier(0.22,1,0.36,1), top 0.5s cubic-bezier(0.22,1,0.36,1), background 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease",
          ...(scrolled
            ? {
                top: "16px",
                maxWidth: "780px",
                width: "calc(100% - 2rem)",
                borderRadius: "9999px",
                padding: "0.55rem 1.25rem",
                background: "rgba(5,8,13,0.95)",
                backdropFilter: "blur(32px)",
                border: "1px solid rgba(245,200,66,0.2)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }
            : {
                top: 0,
                maxWidth: "2000px",
                width: "100%",
                borderRadius: 0,
                padding: "0.85rem 5vw",
                background: "rgba(5,8,13,0.9)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "none",
              }),
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            fontFamily: "var(--font-nunito)",
            fontWeight: 900,
            fontSize: "1.1rem",
            color: "#E8EDF4",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              background: "#F5C842",
              clipPath: "polygon(65% 0%,35% 45%,60% 45%,35% 100%,65% 55%,40% 55%)",
              flexShrink: 0,
            }}
          />
          Floxia
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.3rem",
            flex: 1,
            justifyContent: "center",
          }}
          className="nav-links-desktop"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              style={{
                color: "rgba(232,237,244,.45)",
                fontSize: ".78rem",
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E8EDF4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,237,244,.45)")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <ThemeToggle />
          <a
            href="https://calendly.com/afele1845/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 1.1rem",
              borderRadius: "9999px",
              background: "#F5C842",
              color: "#1E2B45",
              fontWeight: 700,
              fontSize: ".78rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f0be2a"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#F5C842"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Réserver une démo
          </a>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-hamburger"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              color: "#E8EDF4",
              display: "none",
            }}
            aria-label="Menu"
          >
            <div style={{ width: 20, height: 2, background: "currentColor", marginBottom: 5, transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div style={{ width: 20, height: 2, background: "currentColor", marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: "all 0.2s" }} />
            <div style={{ width: 20, height: 2, background: "currentColor", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: "1rem",
            right: "1rem",
            zIndex: 9998,
            background: "rgba(5,8,13,0.98)",
            backdropFilter: "blur(32px)",
            borderRadius: "1rem",
            border: "1px solid rgba(245,200,66,0.15)",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
          className="nav-mobile-menu"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={(e) => { scrollTo(e, l.href); setMenuOpen(false); }}
              style={{
                color: "rgba(232,237,244,.7)",
                fontSize: ".9rem",
                fontWeight: 600,
                letterSpacing: ".04em",
                textDecoration: "none",
                padding: "0.65rem 0.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 720px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; flex-direction: column; }
        }
      `}</style>
    </>
  );
}
