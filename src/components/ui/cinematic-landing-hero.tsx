"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain-floxia {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
  }

  .text-floxia-silver {
    background: linear-gradient(180deg, #F5C842 0%, rgba(245,200,66,0.5) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0px 8px 20px rgba(245,200,66,0.3)) drop-shadow(0px 2px 4px rgba(245,200,66,0.2));
  }

  .text-floxia-white {
    color: #E8EDF4;
    text-shadow: 0 8px 24px rgba(232,237,244,0.15), 0 2px 4px rgba(232,237,244,0.08);
  }

  .text-card-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.8)) drop-shadow(0px 3px 6px rgba(0,0,0,0.6));
  }

  .floxia-depth-card {
    background: linear-gradient(145deg, #0D1F35 0%, #060D18 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.95),
      0 20px 40px -20px rgba(0,0,0,0.85),
      inset 0 1px 2px rgba(245,200,66,0.12),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(245,200,66,0.08);
    position: relative;
  }

  .card-sheen-floxia {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245,200,66,0.05) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel-floxia {
    background-color: #0a0a0a;
    box-shadow:
      inset 0 0 0 2px #3a3a3a,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.95),
      0 15px 25px -5px rgba(0,0,0,0.8);
    transform-style: preserve-3d;
  }

  .hardware-btn-floxia {
    background: linear-gradient(90deg, #3a3a3a 0%, #111 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.9), inset -1px 0 1px rgba(255,255,255,0.1), inset 1px 0 2px rgba(0,0,0,0.9);
    border-left: 1px solid rgba(255,255,255,0.04);
  }

  .screen-glare-floxia {
    background: linear-gradient(110deg, rgba(245,200,66,0.04) 0%, rgba(255,255,255,0) 40%);
  }

  .floating-ui-badge-floxia {
    background: linear-gradient(135deg, rgba(245,200,66,0.08) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(245,200,66,0.15),
      0 25px 50px -12px rgba(0,0,0,0.8),
      inset 0 1px 1px rgba(245,200,66,0.15),
      inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .btn-floxia-primary {
    background: linear-gradient(180deg, #F5C842 0%, #d4a823 100%);
    color: #0A1520;
    font-weight: 800;
    box-shadow: 0 0 0 1px rgba(245,200,66,0.3), 0 2px 4px rgba(0,0,0,0.3), 0 12px 24px -4px rgba(245,200,66,0.25), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.15);
    transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
  }
  .btn-floxia-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 0 1px rgba(245,200,66,0.4), 0 6px 12px -2px rgba(245,200,66,0.2), 0 20px 32px -6px rgba(245,200,66,0.3), inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.15);
  }

  .btn-floxia-secondary {
    background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
    color: #E8EDF4;
    font-weight: 700;
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 2px 4px rgba(0,0,0,0.5), 0 12px 24px -4px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1);
    transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
    backdrop-filter: blur(12px);
  }
  .btn-floxia-secondary:hover {
    transform: translateY(-3px);
    border-color: rgba(245,200,66,0.3);
    box-shadow: 0 6px 12px -2px rgba(0,0,0,0.5), 0 20px 32px -6px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,200,66,0.2);
  }

  .wa-bubble-out {
    background: #025C4C;
    border-radius: 12px 12px 4px 12px;
    font-size: 11px;
    color: #e9e9e9;
    padding: 7px 10px;
    max-width: 85%;
    align-self: flex-end;
    box-shadow: 0 1px 2px rgba(0,0,0,0.4);
    line-height: 1.4;
  }
  .wa-bubble-in {
    background: #1F2C34;
    border-radius: 12px 12px 12px 4px;
    font-size: 11px;
    color: #e9e9e9;
    padding: 7px 10px;
    max-width: 90%;
    align-self: flex-start;
    box-shadow: 0 1px 2px rgba(0,0,0,0.4);
    line-height: 1.5;
  }
  .wa-time { font-size: 9px; color: rgba(255,255,255,0.35); margin-top: 2px; text-align: right; }

  .wa-voice-pill {
    background: #025C4C;
    border-radius: 24px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: flex-end;
    box-shadow: 0 1px 2px rgba(0,0,0,0.4);
  }

  .devis-card {
    background: linear-gradient(135deg, #1a2744 0%, #0f1a2e 100%);
    border: 1px solid rgba(245,200,66,0.2);
    border-radius: 10px;
    padding: 10px;
    font-size: 10px;
    align-self: flex-start;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }

  .progress-ring-floxia {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }
`;

export default function CinematicLandingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Mouse parallax on card
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;
        const rect = mainCardRef.current.getBoundingClientRect();
        mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(mockupRef.current, { rotationY: xVal * 10, rotationX: -yVal * 10, ease: "power3.out", duration: 1.2 });
      });
    };
    window.addEventListener("mousemove", onMouse);
    return () => { window.removeEventListener("mousemove", onMouse); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Scroll timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".flx-text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".flx-text-accent", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".flx-main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".flx-card-left", ".flx-card-right", ".flx-mockup", ".flx-badge", ".flx-widget"], { autoAlpha: 0 });
      gsap.set(".flx-cta", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const intro = gsap.timeline({ delay: 0.3 });
      intro
        .to(".flx-text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".flx-text-accent", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500",
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });

      tl
        .to([".flx-hero-text", ".flx-bg-grid"], { scale: 1.12, filter: "blur(20px)", opacity: 0.15, ease: "power2.inOut", duration: 1 }, 0)
        .to(".flx-main-card", { y: 0, ease: "power3.inOut", duration: 1 }, 0)
        .to(".flx-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 0.8 })
        .fromTo(".flx-mockup",
          { y: 200, z: -300, rotationX: 40, rotationY: -20, autoAlpha: 0, scale: 0.7 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.2 }, "-=0.4"
        )
        .fromTo(".flx-widget", { y: 30, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.08, ease: "back.out(1.2)", duration: 0.8 }, "-=0.8")
        .fromTo(".flx-badge", { y: 60, autoAlpha: 0, scale: 0.7, rotationZ: -8 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 0.8, stagger: 0.12 }, "-=1.0")
        .fromTo(".flx-card-left", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 0.8 }, "-=0.8")
        .fromTo(".flx-card-right", { x: 40, autoAlpha: 0, scale: 0.85 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 0.8 }, "<")
        .to({}, { duration: 1.2 })
        .set(".flx-hero-text", { autoAlpha: 0 })
        .set(".flx-cta", { autoAlpha: 1 })
        .to({}, { duration: 0.8 })
        .to([".flx-mockup", ".flx-badge", ".flx-card-left", ".flx-card-right"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 0.8, stagger: 0.04,
        })
        .to(".flx-main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut", duration: 1,
        }, "pullback")
        .to(".flx-cta", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1 }, "pullback")
        .to(".flx-main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 0.8 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#060D18", perspective: "1500px" }}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain-floxia" aria-hidden />

      {/* Background subtle grid */}
      <div className="flx-bg-grid" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundSize: "60px 60px", backgroundImage: "linear-gradient(to right, rgba(245,200,66,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,200,66,0.04) 1px, transparent 1px)", maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)" }} aria-hidden />

      {/* LAYER 1: Hero text */}
      <div className="flx-hero-text" style={{ position: "absolute", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", width: "100vw", padding: "0 1rem" }}>
        <h1 className="flx-text-track gsap-reveal text-floxia-white" style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2.8rem,7vw,6rem)", letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>
          Votre devis en
        </h1>
        <h1 className="flx-text-accent gsap-reveal text-floxia-silver" style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2.8rem,7vw,6rem)", letterSpacing: "-0.04em" }}>
          3 minutes chrono.
        </h1>
        <p style={{ marginTop: "1.25rem", color: "rgba(232,237,244,0.45)", fontSize: "clamp(0.95rem,2vw,1.1rem)", fontWeight: 400, maxWidth: "32rem" }}>
          Un message vocal sur WhatsApp suffit pour générer un devis PDF complet.
        </p>
      </div>

      {/* LAYER 2: CTA */}
      <div className="flx-cta gsap-reveal" style={{ position: "absolute", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", width: "100vw", padding: "0 1rem", pointerEvents: "auto" }}>
        <h2 className="text-floxia-silver" style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,5vw,4rem)", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
          Prêt à gagner 8h/semaine ?
        </h2>
        <p style={{ color: "rgba(232,237,244,0.5)", fontSize: "1.05rem", marginBottom: "2.5rem", maxWidth: "30rem", lineHeight: 1.6 }}>
          Rejoignez les artisans du bâtiment qui ont automatisé leur administratif avec Floxia.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#tarifs" className="btn-floxia-primary" style={{ padding: "1rem 2.25rem", borderRadius: "999px", fontSize: "1rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            Démarrer gratuitement
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#services" className="btn-floxia-secondary" style={{ padding: "1rem 2.25rem", borderRadius: "999px", fontSize: "1rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            Voir les fonctionnalités
          </a>
        </div>
      </div>

      {/* LAYER 3: Main Card */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="flx-main-card gsap-reveal floxia-depth-card"
          style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "auto", width: "92vw", height: "92vh", borderRadius: "32px" }}
        >
          <div className="card-sheen-floxia" aria-hidden />

          <div style={{ position: "relative", width: "100%", height: "100%", maxWidth: "80rem", margin: "0 auto", padding: "1.5rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-evenly", zIndex: 10, gap: "1rem" }}>

            {/* Desktop: 3-col grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem", alignItems: "center", height: "100%", width: "100%" }} className="flx-inner-grid">

              {/* LEFT: Text */}
              <div className="flx-card-left gsap-reveal" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "4px 14px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)", marginBottom: "1.25rem", width: "fit-content" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px rgba(74,222,128,0.8)" }} />
                  <span style={{ color: "#F5C842", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>IA Vocale WhatsApp</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-nunito)", color: "#E8EDF4", fontSize: "clamp(1.5rem,2.5vw,2.25rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1rem" }}>
                  Administrez votre chantier <span style={{ color: "#F5C842" }}>depuis le terrain.</span>
                </h3>
                <p style={{ color: "rgba(232,237,244,0.5)", fontSize: "0.9rem", lineHeight: 1.65 }}>
                  Un message vocal ou texte suffit. <span style={{ color: "#E8EDF4", fontWeight: 600 }}>Floxia</span> génère vos devis, factures, PV de réception et relances — automatiquement.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1.5rem" }}>
                  {["Devis PDF en 3 min via WhatsApp", "Relances auto devis & factures", "Agent IA réceptionniste 24h/24"].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="9" height="9" fill="none" stroke="#4ADE80" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                      </span>
                      <span style={{ color: "rgba(232,237,244,0.7)", fontSize: "0.82rem" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CENTER: Phone mockup */}
              <div className="flx-mockup" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: "100%", perspective: "1000px" }}>
                <div style={{ transform: "scale(0.88)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>

                  {/* iPhone */}
                  <div ref={mockupRef} className="iphone-bezel-floxia" style={{ position: "relative", width: 270, height: 560, borderRadius: "3rem", display: "flex", flexDirection: "column", willChange: "transform", transformStyle: "preserve-3d" }}>
                    {/* Buttons */}
                    <div className="hardware-btn-floxia" style={{ position: "absolute", top: 115, left: -3, width: 3, height: 25, borderRadius: "4px 0 0 4px" }} />
                    <div className="hardware-btn-floxia" style={{ position: "absolute", top: 155, left: -3, width: 3, height: 42, borderRadius: "4px 0 0 4px" }} />
                    <div className="hardware-btn-floxia" style={{ position: "absolute", top: 210, left: -3, width: 3, height: 42, borderRadius: "4px 0 0 4px" }} />
                    <div className="hardware-btn-floxia" style={{ position: "absolute", top: 165, right: -3, width: 3, height: 65, borderRadius: "0 4px 4px 0", transform: "scaleX(-1)" }} />

                    {/* Screen */}
                    <div style={{ position: "absolute", inset: 7, background: "#111B21", borderRadius: "2.5rem", overflow: "hidden", boxShadow: "inset 0 0 15px rgba(0,0,0,1)", color: "white", zIndex: 10 }}>
                      <div className="screen-glare-floxia" style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: "none" }} />

                      {/* Dynamic island */}
                      <div style={{ position: "absolute", top: 5, left: "50%", transform: "translateX(-50%)", width: 95, height: 26, background: "#000", borderRadius: 999, zIndex: 50 }} />

                      {/* WhatsApp UI */}
                      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                        {/* Header */}
                        <div className="flx-widget" style={{ background: "#1F2C34", padding: "40px 12px 10px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <svg width="12" height="12" fill="none" stroke="#25D366" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #F5C842, #d4a823)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, color: "#0A1520" }}>F</div>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#E8EDF4" }}>Floxia IA</div>
                            <div style={{ fontSize: 9, color: "#25D366" }}>en ligne</div>
                          </div>
                        </div>

                        {/* Chat */}
                        <div style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: "8px", overflowY: "hidden", background: "#0B141A" }}>

                          <div className="flx-widget wa-voice-pill">
                            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <svg width="9" height="9" fill="white" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                            </div>
                            <div style={{ flex: 1, height: 20, background: "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.04) 100%)", borderRadius: 999 }}>
                              <div style={{ height: "100%", width: "65%", background: "#25D366", borderRadius: 999, opacity: 0.6 }} />
                            </div>
                            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>0:12</span>
                          </div>

                          <div className="flx-widget wa-bubble-in">
                            <div style={{ color: "#F5C842", fontSize: 10, fontWeight: 700, marginBottom: 3 }}>✦ Floxia IA</div>
                            Bien reçu ! Je génère votre devis pour M. Durand — pose carrelage 85m²...
                            <div className="wa-time">09:42 ✓✓</div>
                          </div>

                          <div className="flx-widget devis-card">
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                              <div style={{ width: 20, height: 20, borderRadius: 4, background: "rgba(245,200,66,0.15)", border: "1px solid rgba(245,200,66,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="10" height="10" fill="#F5C842" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                              </div>
                              <div>
                                <div style={{ color: "#F5C842", fontWeight: 700, fontSize: 10 }}>DEVIS_Durand_Carrelage.pdf</div>
                                <div style={{ color: "rgba(232,237,244,0.4)", fontSize: 9 }}>PDF · 1 page · 48 Ko</div>
                              </div>
                            </div>
                            <div style={{ borderTop: "1px solid rgba(245,200,66,0.1)", paddingTop: 6, display: "flex", justifyContent: "space-between" }}>
                              <span style={{ color: "rgba(232,237,244,0.4)", fontSize: 9 }}>Total HT</span>
                              <span style={{ color: "#4ADE80", fontWeight: 800, fontSize: 11 }}>3 840 €</span>
                            </div>
                          </div>

                          <div className="flx-widget wa-bubble-in" style={{ fontSize: 10 }}>
                            Devis envoyé par e-mail à durand@gmail.com 📧
                            <br/>Relance automatique dans 3 jours si non signé.
                            <div className="wa-time">09:43 ✓✓</div>
                          </div>
                        </div>

                        {/* Input bar */}
                        <div style={{ background: "#1F2C34", padding: "8px 10px", display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                          <div style={{ flex: 1, background: "#2A3942", borderRadius: 999, padding: "6px 12px", fontSize: 10, color: "rgba(232,237,244,0.3)" }}>Message</div>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="10" height="10" fill="white" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <div className="flx-badge floating-ui-badge-floxia" style={{ position: "absolute", top: 30, left: -70, borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, zIndex: 30 }}>
                    <span style={{ fontSize: 18 }}>⚡</span>
                    <div>
                      <div style={{ color: "#E8EDF4", fontSize: 11, fontWeight: 700 }}>Devis en 3 min</div>
                      <div style={{ color: "rgba(245,200,66,0.6)", fontSize: 9 }}>IA Vocale WhatsApp</div>
                    </div>
                  </div>

                  <div className="flx-badge floating-ui-badge-floxia" style={{ position: "absolute", bottom: 60, right: -80, borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, zIndex: 30 }}>
                    <span style={{ fontSize: 18 }}>✍️</span>
                    <div>
                      <div style={{ color: "#E8EDF4", fontSize: 11, fontWeight: 700 }}>Signé en ligne</div>
                      <div style={{ color: "rgba(74,222,128,0.7)", fontSize: 9 }}>Valeur légale</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Brand + stats */}
              <div className="flx-card-right gsap-reveal" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", textAlign: "right" }}>
                <div className="text-card-silver" style={{ fontFamily: "var(--font-nunito)", fontSize: "clamp(3rem,6vw,7rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, marginBottom: "1.5rem" }}>
                  Floxia
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end" }}>
                  {[
                    { val: "47", label: "Fonctionnalités IA", color: "#F5C842" },
                    { val: "8h", label: "Gagnées par semaine", color: "#4ADE80" },
                    { val: "3min", label: "Par devis complet", color: "#60A5FA" },
                  ].map((s) => (
                    <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}20`, borderRadius: 12, padding: "0.75rem 1.25rem", textAlign: "right" }}>
                      <div style={{ color: s.color, fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.6rem", lineHeight: 1 }}>{s.val}</div>
                      <div style={{ color: "rgba(232,237,244,0.4)", fontSize: "0.72rem", marginTop: "0.2rem" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .flx-inner-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .flx-card-right { align-items: center !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
