"use client";
import { useState } from "react";
import Link from "next/link";

// Quatre entrees seulement : au-dela, le menu devient une table des matieres
// et plus personne ne clique. Comparatif, ROI et Qui sommes-nous restent
// accessibles depuis le corps de la page et le footer.
const NAV_LINKS = [
  { label: "Fonctionnalités", href: "/#services" },
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
          // Fond quasi opaque : le flou de verre a ete neutralise pour la
          // performance, et un fond translucide laissait alors lire le contenu
          // qui passe dessous.
          background: "rgba(244,248,255,0.97)",
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-cirrion.png" alt="" width={28} height={19} style={{ flexShrink: 0, objectFit: "contain" }} />
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
          {/* Action principale : demander un devis. Visible partout, y compris
              sur mobile en version compacte. */}
          <Link
            href="/devis"
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
            Demander un devis
          </Link>
          <Link href="/devis" className="nav-cta-mobile" aria-label="Demander un devis">
            Devis
          </Link>
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
          aria-hidden
          onClick={() => setMenuOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 9997, background: "rgba(27,42,74,0.28)" }}
        />
      )}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: "1rem",
            right: "1rem",
            zIndex: 9998,
            background: "#FFFFFF",
            boxShadow: "0 24px 48px -20px rgba(27,42,74,0.45)",
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
          {/* CTA dans le menu mobile : le devis d'abord, la demo ensuite. */}
          <Link
            href="/devis"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block", marginTop: "0.9rem", padding: "1rem",
              borderRadius: "0.9rem",
              background: "linear-gradient(135deg,#2A5FE0,#1C46BE)",
              color: "#FFFFFF", fontWeight: 800, fontSize: "1rem",
              textDecoration: "none", textAlign: "center",
              boxShadow: "0 12px 24px -14px rgba(36,85,214,.9)",
            }}
          >
            Demander un devis
          </Link>
          <a
            href="https://calendly.com/cirrion-pro/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block", marginTop: "0.5rem", padding: "0.85rem",
              borderRadius: "0.9rem", border: "1px solid rgba(36,85,214,0.25)",
              color: "#2455D6", fontWeight: 700, fontSize: ".9rem",
              textDecoration: "none", textAlign: "center",
            }}
          >
            Réserver une démo · 30 min
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; flex-direction: column; }
        }
        .nav-cta-mobile { display: none; }
        @media (max-width: 720px) {
          .nav-cta-desktop { display: none !important; }
          .nav-cta-mobile {
            display: inline-flex; align-items: center; min-height: 40px;
            padding: 0 1.05rem; border-radius: 9999px;
            background: linear-gradient(135deg,#2A5FE0,#1C46BE); color: #fff;
            font-weight: 800; font-size: .85rem; text-decoration: none;
            box-shadow: 0 8px 16px -10px rgba(36,85,214,.9);
          }
          /* Cibles de toucher de 44 px dans le menu. */
          .nav-mobile-menu a { min-height: 44px; display: flex; align-items: center; }
          .nav-mobile-menu a[href="/devis"] { justify-content: center; }
        }
      `}</style>
    </>
  );
}
