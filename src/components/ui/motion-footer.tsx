"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: color-mix(in srgb, var(--foreground) 4%, transparent);
  --pill-bg-2: color-mix(in srgb, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in srgb, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in srgb, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in srgb, var(--background) 80%, transparent);
  --pill-border: color-mix(in srgb, var(--foreground) 9%, transparent);
  --pill-bg-1-hover: color-mix(in srgb, var(--foreground) 9%, transparent);
  --pill-bg-2-hover: color-mix(in srgb, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in srgb, var(--foreground) 22%, transparent);
  --pill-shadow-hover: color-mix(in srgb, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in srgb, var(--foreground) 22%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 38s linear infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in srgb, var(--foreground) 4%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 4%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in srgb, #2455D6 12%, transparent) 0%,
    color-mix(in srgb, #4ADE80 8%, transparent) 45%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight), inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 0 20px 40px -10px var(--pill-shadow-hover), inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--foreground) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, var(--foreground) 8%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in srgb, var(--foreground) 35%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px color-mix(in srgb, var(--foreground) 12%, transparent));
}

.footer-gold-btn {
  background: linear-gradient(135deg, #2455D6 0%, #1A3FA8 100%);
  color: #FFFFFF;
  font-weight: 800;
  box-shadow: 0 8px 32px rgba(36,85,214,0.35), 0 2px 8px rgba(36,85,214,0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-gold-btn:hover {
  box-shadow: 0 16px 48px rgba(36,85,214,0.5), 0 4px 16px rgba(36,85,214,0.3);
  transform: translateY(-2px);
}

.footer-bottom-bar {
  position: relative;
  z-index: 20;
  width: 100%;
  padding: 1.5rem 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid rgba(36,85,214,0.06);
}

@media (max-width: 768px) {
  .footer-giant-bg-text { font-size: 22vw; }
  .footer-bottom-bar {
    padding: 1.25rem !important;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
  }
}
`;

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;
      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(element, { x: x * 0.35, y: y * 0.35, rotationX: -y * 0.12, rotationY: x * 0.12, scale: 1.05, ease: "power2.out", duration: 0.4 });
        };
        const handleMouseLeave = () => {
          gsap.to(element, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2 });
        };
        element.addEventListener("mousemove", handleMouseMove as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          element.removeEventListener("mousemove", handleMouseMove as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);
      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "3rem", padding: "0 1.5rem" }}>
    <span>Devis en 3 minutes</span> <span style={{ color: "#2455D6", opacity: 0.7 }}>✦</span>
    <span>IA Vocale WhatsApp</span> <span style={{ color: "#4ADE80", opacity: 0.7 }}>✦</span>
    <span>Standard 24h/24</span> <span style={{ color: "#2455D6", opacity: 0.7 }}>✦</span>
    <span>Hébergement France</span> <span style={{ color: "#4ADE80", opacity: 0.7 }}>✦</span>
    <span>RGPD Natif</span> <span style={{ color: "#2455D6", opacity: 0.7 }}>✦</span>
    <span>Relances Auto</span> <span style={{ color: "#4ADE80", opacity: 0.7 }}>✦</span>
    <span>ROI × 3</span> <span style={{ color: "#2455D6", opacity: 0.7 }}>✦</span>
  </div>
);

const NAV_LINKS = [
  { label: "Entreprises", href: "/logiciel-gestion-entreprise-batiment" },
  { label: "Ressources", href: "/ressources" },
  { label: "Métiers", href: "/artisans" },
  { label: "Comparatifs", href: "/alternatives" },
  { label: "Villes", href: "/logiciel-batiment" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Presse", href: "/presse" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "/cgv" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Support", href: "/support" },
];

// Contenu du footer — identique desktop et mobile
function FooterContent({ isMobile }: { isMobile: boolean }) {
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile || typeof window === "undefined" || !wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        { y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 } }
      );
      gsap.fromTo([headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 40%", end: "bottom bottom", scrub: 1 } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={wrapperRef} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", overflow: "hidden", background: "var(--background)", color: "var(--foreground)", position: "relative" }}
      className="cinematic-footer-wrapper"
    >
      {/* Aurora */}
      <div className="footer-aurora animate-footer-breathe" style={{ position: "absolute", left: "50%", top: "50%", width: "80vw", height: "60vh", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div className="footer-bg-grid" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Giant BG text */}
      <div ref={giantTextRef} className="footer-giant-bg-text" style={{ position: "absolute", bottom: "-5vh", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", zIndex: 0, pointerEvents: "none", userSelect: "none" }}>
        CIRRION
      </div>

      {/* Marquee */}
      {!isMobile && (
        <div style={{ position: "absolute", top: "3rem", left: 0, width: "100%", overflow: "hidden", borderTop: "1px solid rgba(36,85,214,0.12)", borderBottom: "1px solid rgba(36,85,214,0.12)", background: "rgba(36,85,214,0.06)", backdropFilter: "blur(12px)", padding: "1rem 0", zIndex: 10, transform: "rotate(-2deg) scaleX(1.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
          <div className="animate-footer-scroll-marquee" style={{ display: "flex", width: "max-content", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.28em", color: "rgba(232,237,244,0.45)", textTransform: "uppercase" }}>
            <MarqueeItem /><MarqueeItem />
          </div>
        </div>
      )}

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "3rem 1.5rem 2rem" : "0 1.5rem", marginTop: isMobile ? 0 : "5rem", maxWidth: "56rem", width: "100%", alignSelf: "center" }}>
        <h2 ref={headingRef} className="footer-text-glow" style={{ fontSize: isMobile ? "clamp(2rem,8vw,3rem)" : "clamp(2.8rem,8vw,6rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "2rem", textAlign: "center", fontFamily: "var(--font-nunito)" }}>
          Prêt à gagner du temps ?
        </h2>

        <div ref={linksRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "100%" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
            <MagneticButton as="a" href="https://calendly.com/afele1845/30min" target="_blank" rel="noopener"
              className="footer-gold-btn"
              style={{ padding: isMobile ? "0.9rem 1.8rem" : "1.1rem 2.5rem", borderRadius: "9999px", fontSize: isMobile ? "0.88rem" : "0.95rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
              Réserver une démo gratuite
            </MagneticButton>
            <MagneticButton as="a" href="/#tarifs"
              className="footer-glass-pill"
              style={{ padding: isMobile ? "0.9rem 1.8rem" : "1.1rem 2.5rem", borderRadius: "9999px", fontSize: isMobile ? "0.88rem" : "0.95rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.6rem", color: "var(--foreground)", fontWeight: 700 }}>
              Voir les tarifs →
            </MagneticButton>
          </div>

          {/* Réseaux */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
            <a href="https://www.instagram.com/floxia.pro" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.75rem", textDecoration: "none", color: "var(--muted-foreground)", fontWeight: 500, border: "1px solid rgba(36,85,214,0.15)", background: "rgba(36,85,214,0.04)" }}>
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/floxia-pro-9360333aa" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.75rem", textDecoration: "none", color: "var(--muted-foreground)", fontWeight: 500, border: "1px solid rgba(36,85,214,0.15)", background: "rgba(36,85,214,0.04)" }}>
              LinkedIn
            </a>
          </div>

          {/* Liens nav */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <MagneticButton key={label} as="a" href={href}
                className="footer-glass-pill"
                style={{ padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.7rem", textDecoration: "none", color: "var(--muted-foreground)", fontWeight: 500 }}>
                {label}
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 28, height: 28, background: "#2455D6", clipPath: "polygon(65% 0%,35% 45%,60% 45%,35% 100%,65% 55%,40% 55%)" }} />
          <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.1rem", color: "var(--foreground)" }}>Cirrion</span>
        </div>
        <a href="/qui-sommes-nous" className="footer-glass-pill" style={{ padding: "0.6rem 1.25rem", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none" }}>
          <span style={{ fontSize: "1rem" }}>🇫🇷</span>
          <span style={{ color: "var(--muted-foreground)", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Conçu en France</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "var(--muted-foreground)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            © {new Date().getFullYear()} Cirrion. Tous droits réservés.
          </span>
          <MagneticButton as="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Retour en haut"
            className="footer-glass-pill"
            style={{ width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted-foreground)", border: "none", background: "none" }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

export function CinematicFooter() {
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {isMobile ? (
        // Mobile : layout normal dans le flux du document
        <footer style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100dvh" }}>
          <FooterContent isMobile={true} />
        </footer>
      ) : (
        // Desktop : effet cinématique avec sticky scroll
        <div style={{ position: "relative", height: "100vh", width: "100%", clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
          <footer style={{ position: "fixed", bottom: 0, left: 0, height: "100vh", width: "100%" }}>
            <FooterContent isMobile={false} />
          </footer>
        </div>
      )}
    </>
  );
}
