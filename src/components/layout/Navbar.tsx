"use client";
import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Écosystème", href: "/#ecosysteme" },
  { label: "Comparatif", href: "/comparatif" },
  { label: "ROI", href: "/#roi" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Ressources", href: "/ressources" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
];

function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          left: 0,
          right: 0,
          top: 0,
          width: "100%",
          padding: "0.9rem 5vw",
          background: "rgba(239,244,255,0.85)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderBottom: "1px solid rgba(36,85,214,0.12)",
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
            color: "#1B2A4A",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              background: "#2455D6",
              clipPath: "polygon(65% 0%,35% 45%,60% 45%,35% 100%,65% 55%,40% 55%)",
              flexShrink: 0,
            }}
          />
          Cirrion
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.1rem",
            flex: 1,
            justifyContent: "center",
            margin: "0 1.25rem",
            minWidth: 0,
            overflow: "hidden",
          }}
          className="nav-links-desktop"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={(e) => scrollTo(e, l.href)}
              style={{
                color: "rgba(27,42,74,.55)",
                fontSize: ".78rem",
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1B2A4A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(27,42,74,.55)")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          {/* CTA masqué sur mobile (remplacé dans le menu) */}
          <a
            href="https://calendly.com/afele1845/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-desktop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 1.1rem",
              borderRadius: "9999px",
              background: "#2455D6",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: ".78rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#1e46c2"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#2455D6"; e.currentTarget.style.transform = "scale(1)"; }}
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
              color: "#1B2A4A",
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
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(32px)",
            borderRadius: "1rem",
            border: "1px solid rgba(36,85,214,0.15)",
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
                color: "rgba(27,42,74,.8)",
                fontSize: ".9rem",
                fontWeight: 600,
                letterSpacing: ".04em",
                textDecoration: "none",
                padding: "0.65rem 0.5rem",
                borderBottom: "1px solid rgba(27,42,74,0.08)",
              }}
            >
              {l.label}
            </Link>
          ))}
          {/* CTA dans le menu mobile */}
          <a
            href="https://calendly.com/afele1845/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              marginTop: "0.75rem",
              padding: "0.85rem",
              borderRadius: "0.75rem",
              background: "#2455D6",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: ".9rem",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Réserver une démo gratuite
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; flex-direction: column; }
        }
        @media (max-width: 720px) {
          .nav-cta-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
