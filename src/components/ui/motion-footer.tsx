"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { cloudBand } from "@/components/ui/cloudArt";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Note : pas d'@import de police externe ici — les polices du site sont chargees
// et auto-hebergees par next/font (Sora + Inter). Un @import vers fonts.googleapis.com
// ajoutait une requete bloquante sur chaque page.
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-dm), sans-serif;
  -webkit-font-smoothing: antialiased;
  /* Palette redefinie localement : le pied de page est un bloc bleu profond
     et son texte est blanc. Tout le reste du composant lit ces variables. */
  --foreground: #FFFFFF;
  --background: #0B2A63;
  --text: #FFFFFF;
  --text-rgb: 255, 255, 255;
  --muted-foreground: rgba(255, 255, 255, 0.72);
  color: #FFFFFF;
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
/* Le pied de page est en position fixe des le haut du document : sans cette
   suspension, ses deux animations tournent pendant toute la visite. */
.footer-offscreen .animate-footer-breathe,
.footer-offscreen .animate-footer-scroll-marquee { animation-play-state: paused !important; }
/* Tant qu'on en est loin, il n'est pas peint du tout : en position fixe, il
   restait sinon compose a chaque frame pendant toute la visite. */
.footer-offscreen .cinematic-footer-wrapper { visibility: hidden; }

/* Derive lente des deux couches nuageuses, a des vitesses differentes pour la
   profondeur. Transform uniquement : le compositeur ne redessine rien. */
@keyframes footer-clouds-drift {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(-4%, 0, 0); }
}
.footer-clouds { will-change: transform; backface-visibility: hidden; }
.footer-clouds-back { animation: footer-clouds-drift 90s ease-in-out infinite; }
.footer-clouds-front { animation: footer-clouds-front-drift 64s ease-in-out infinite; }
@keyframes footer-clouds-front-drift {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(5%, 0, 0); }
}
.footer-offscreen .footer-clouds { animation-play-state: paused !important; }
@media (prefers-reduced-motion: reduce) {
  .footer-clouds { animation: none !important; }
}
@media (prefers-reduced-motion: reduce) {
  .animate-footer-breathe, .animate-footer-scroll-marquee { animation: none !important; }
}

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
  /* Sur la bande nuageuse claire du haut, un fond a 4 % d'opacite rendait les
     liens invisibles. Ils portent maintenant leur propre fond. */
  background: rgba(13, 47, 105, 0.42);
  color: #FFFFFF;
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight), inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid rgba(255, 255, 255, 0.35);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: rgba(13, 47, 105, 0.62);
  border-color: rgba(255, 255, 255, 0.6);
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

// Maillage local : requetes precises metier x ville, pour la pertinence
// geographique (SEO local + reponses des IA sur des recherches localisees).
const LOCAL_LINKS = [
  { label: "Logiciel devis électricien à Paris", href: "/logiciel-devis/electricien/paris" },
  { label: "Logiciel devis plombier à Lyon", href: "/logiciel-devis/plombier/lyon" },
  { label: "Logiciel devis maçon à Marseille", href: "/logiciel-devis/macon/marseille" },
  { label: "Logiciel devis peintre à Bordeaux", href: "/logiciel-devis/peintre/bordeaux" },
  { label: "Logiciel devis menuisier à Toulouse", href: "/logiciel-devis/menuisier/toulouse" },
  { label: "Logiciel devis couvreur à Nantes", href: "/logiciel-devis/couvreur/nantes" },
  { label: "Logiciel devis carreleur à Lille", href: "/logiciel-devis/carreleur/lille" },
  { label: "Logiciel devis chauffagiste à Rennes", href: "/logiciel-devis/chauffagiste/rennes" },
  { label: "Logiciel bâtiment à Nice", href: "/logiciel-batiment/nice" },
  { label: "Logiciel bâtiment à Strasbourg", href: "/logiciel-batiment/strasbourg" },
  { label: "Logiciel bâtiment à Montpellier", href: "/logiciel-batiment/montpellier" },
  { label: "Logiciel bâtiment à Caen", href: "/logiciel-batiment/caen" },
];

// Contenu du footer — identique desktop et mobile
function FooterContent({ isMobile }: { isMobile: boolean }) {
  const giantTextRef = useRef<HTMLDivElement>(null);
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
      gsap.fromTo(linksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 40%", end: "bottom bottom", scrub: 1 } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={wrapperRef} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", overflow: "hidden", background: "linear-gradient(180deg, #9CC4F2 0%, #6BA0EA 9%, #3A72D2 22%, #1E4FA8 44%, #123C86 70%, #0B2A63 100%)", color: "var(--foreground)", position: "relative" }}
      className="cinematic-footer-wrapper"
    >
      {/* Aurora */}
      <div className="footer-aurora animate-footer-breathe" style={{ position: "absolute", left: "50%", top: "50%", width: "80vw", height: "60vh", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
      <div className="footer-bg-grid" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Nuages 3D : la page se termine dans la couche. Memes volumes lisses
          que le hero, encodes en image — rien a recalculer au defilement. */}
      <div
        aria-hidden
        className="footer-clouds footer-clouds-back"
        style={{
          position: "absolute", left: "-12%", right: "-12%", top: "-20%", height: "38%",
          backgroundImage: cloudBand("light"),
          // Une seule bande etiree plutot qu'un motif repete : la repetition
          // laissait une couture verticale et un chapelet de lobes identiques.
          backgroundSize: "150% 100%", backgroundPosition: "0% 0%", backgroundRepeat: "no-repeat",
          opacity: 0.95, zIndex: 0, pointerEvents: "none",
          maskImage: "linear-gradient(180deg, #000 0%, #000 62%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 62%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="footer-clouds footer-clouds-front"
        style={{
          position: "absolute", left: "-18%", right: "-18%", top: "-8%", height: "30%",
          backgroundImage: cloudBand("light"),
          backgroundSize: "118% 100%", backgroundPosition: "100% 0%", backgroundRepeat: "no-repeat",
          opacity: 0.85, zIndex: 0, pointerEvents: "none",
          maskImage: "linear-gradient(180deg, #000 0%, #000 58%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 58%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Giant BG text */}
      <div ref={giantTextRef} className="footer-giant-bg-text" style={{ position: "absolute", bottom: "-5vh", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", zIndex: 0, pointerEvents: "none", userSelect: "none" }}>
        CIRRION
      </div>

      {/* Marquee */}
      {!isMobile && (
        <div style={{ position: "absolute", top: "3rem", left: 0, width: "100%", overflow: "hidden", borderTop: "1px solid rgba(36,85,214,0.12)", borderBottom: "1px solid rgba(36,85,214,0.12)", background: "rgba(255,255,255,0.4)", padding: "1rem 0", zIndex: 10, transform: "rotate(-2deg) scaleX(1.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
          <div className="animate-footer-scroll-marquee" style={{ display: "flex", width: "max-content", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.28em", color: "rgba(11,42,99,0.5)", textTransform: "uppercase" }}>
            <MarqueeItem /><MarqueeItem />
          </div>
        </div>
      )}

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "3rem 1.5rem 2rem" : "0 1.5rem", marginTop: isMobile ? 0 : "5rem", maxWidth: "56rem", width: "100%", alignSelf: "center" }}>
        <div ref={linksRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "100%" }}>
          {/* Réseaux */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
            <a href="https://www.instagram.com/floxia.pro" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.75rem", textDecoration: "none", color: "var(--muted-foreground)", fontWeight: 500, border: "1px solid rgba(36,85,214,0.15)", background: "rgba(36,85,214,0.04)" }}>
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/cirrion-pro-9360333aa" target="_blank" rel="noopener noreferrer"
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

          {/* Maillage local — metier x ville */}
          <div style={{ marginTop: "1.5rem", width: "100%" }}>
            <div style={{ textAlign: "center", color: "var(--muted-foreground)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.7rem", opacity: 0.75 }}>
              Cirrion près de chez vous
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.4rem" }}>
              {LOCAL_LINKS.map(({ label, href }) => (
                <a key={href} href={href}
                  style={{ padding: "0.35rem 0.8rem", borderRadius: "9999px", fontSize: "0.63rem", textDecoration: "none", color: "var(--muted-foreground)", fontWeight: 500, border: "1px solid rgba(36,85,214,0.12)", background: "rgba(36,85,214,0.03)", opacity: 0.85 }}>
                  {label}
                </a>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "0.7rem" }}>
              <Link href="/logiciel-batiment" style={{ color: "#BFD8FF", fontSize: "0.65rem", fontWeight: 700, textDecoration: "none" }}>
                Voir les 200+ villes couvertes →
              </Link>
            </div>
          </div>

          {/* Badge FranceSaaS — lien retour requis par l'annuaire (plan gratuit).
              Code fourni par FranceSaaS, conserve tel quel : pas de nofollow,
              pas de masquage CSS, present sur toutes les pages via ce footer. */}
          <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
            <a
              href="https://francesaas.fr/saas/cirrion"
              target="_blank"
              rel="noopener"
              title="Profil du SaaS Cirrion sur FranceSaaS.fr"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://francesaas.fr/badge-francesaas.svg"
                alt="Badge FranceSaaS"
                width="200"
                height="44"
                style={{ height: "auto" }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-cirrion.png" alt="" width={32} height={22} style={{ flexShrink: 0, objectFit: "contain" }} />
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
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const node = revealRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => document.body.classList.toggle("footer-offscreen", !entry?.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(node);
    return () => { io.disconnect(); document.body.classList.remove("footer-offscreen"); };
  }, [isMobile]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {isMobile ? (
        // Mobile : layout normal dans le flux du document, hauteur naturelle
        <footer style={{ background: "linear-gradient(180deg, #9CC4F2 0%, #3A72D2 22%, #0B2A63 100%)", color: "var(--foreground)" }}>
          <FooterContent isMobile={true} />
        </footer>
      ) : (
        // Desktop : effet cinématique avec sticky scroll
        <div ref={revealRef} style={{ position: "relative", height: "100vh", width: "100%", clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
          <footer style={{ position: "fixed", bottom: 0, left: 0, height: "100vh", width: "100%" }}>
            <FooterContent isMobile={false} />
          </footer>
        </div>
      )}
    </>
  );
}
