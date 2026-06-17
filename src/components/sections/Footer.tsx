"use client";
export default function Footer() {
  const links = [
    { label: "Services", href: "#services" },
    { label: "Ecosystème", href: "#ecosysteme" },
    { label: "Tarifs", href: "#tarifs" },
    { label: "Mentions légales", href: "#mentions" },
    { label: "CGV", href: "#cgv" },
  ];

  return (
    <footer
      style={{
        background: "#0A1520",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "3rem 0",
      }}
    >
      <div
        style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 6vw" }} 
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#F5C842",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M3 14L9 4L15 14H3Z" fill="#0F1923" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-nunito)",
              fontWeight: 900,
              fontSize: "1.15rem",
              color: "#E8EDF4",
              letterSpacing: "-.01em",
            }}
          >
            Floxia
          </span>
        </div>

        {/* Nav links */}
        <nav>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    color: "rgba(232,237,244,0.45)",
                    fontSize: ".85rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#F5C842"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(232,237,244,0.45)"; }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social / copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "rgba(232,237,244,0.25)", fontSize: ".78rem" }}>
            © {new Date().getFullYear()} Floxia. Tous droits réservés.
          </span>
          {/* LinkedIn placeholder */}
          <a
            href="#"
            aria-label="LinkedIn"
            style={{
              width: 34,
              height: 34,
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(232,237,244,0.4)",
              textDecoration: "none",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(245,200,66,0.3)";
              e.currentTarget.style.color = "#F5C842";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "rgba(232,237,244,0.4)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
