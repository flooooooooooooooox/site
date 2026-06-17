"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STYLES = `
  .hero-wa-bubble-in {
    background: #1F2C34; border-radius: 12px 12px 12px 4px;
    font-size: 11px; color: #e9e9e9; padding: 7px 10px;
    max-width: 90%; align-self: flex-start;
    box-shadow: 0 1px 2px rgba(0,0,0,0.4); line-height: 1.5;
  }
  .hero-wa-voice {
    background: #025C4C; border-radius: 24px; padding: 8px 12px;
    display: flex; align-items: center; gap: 8px; align-self: flex-end;
    box-shadow: 0 1px 2px rgba(0,0,0,0.4);
  }
  .hero-devis-card {
    background: linear-gradient(135deg, #1a2744 0%, #0f1a2e 100%);
    border: 1px solid rgba(245,200,66,0.2); border-radius: 10px;
    padding: 10px; font-size: 10px; align-self: flex-start;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  }
  .hero-iphone {
    background-color: #0a0a0a;
    box-shadow: inset 0 0 0 2px #3a3a3a, inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.95), 0 15px 25px -5px rgba(0,0,0,0.8);
  }
  .hero-hw-btn {
    background: linear-gradient(90deg, #3a3a3a 0%, #111 100%);
    box-shadow: -2px 0 5px rgba(0,0,0,0.9);
  }
  .hero-badge {
    background: linear-gradient(135deg, rgba(245,200,66,0.08) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 0 0 1px rgba(245,200,66,0.15), 0 20px 40px -8px rgba(0,0,0,0.7),
      inset 0 1px 1px rgba(245,200,66,0.1);
  }
`;

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Mouse parallax on phone
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!phoneRef.current) return;
        const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(phoneRef.current, { rotationY: xVal * 10, rotationX: -yVal * 8, ease: "power3.out", duration: 1.2 });
      });
    };
    window.addEventListener("mousemove", onMouse);
    return () => { window.removeEventListener("mousemove", onMouse); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Scroll-pinned animation
  useEffect(() => {
    const section = sectionRef.current;
    const heroText = heroTextRef.current;
    const card = cardRef.current;
    const cta = ctaRef.current;
    const mockup = mockupRef.current;
    if (!section || !heroText || !card || !cta || !mockup) return;

    const isMobile = window.innerWidth < 768;

    // Initial states
    gsap.set(card, { y: window.innerHeight + 200 });
    gsap.set(cta, { autoAlpha: 0, scale: 0.85, filter: "blur(20px)" });
    gsap.set(mockup, { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3500",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    });

    tl
      // Card rises, text fades
      .to(heroText, { scale: 1.1, filter: "blur(16px)", opacity: 0.1, duration: 1, ease: "power2.inOut" }, 0)
      .to(card, { y: 0, duration: 1, ease: "power3.inOut" }, 0)
      // Card expands fullscreen
      .to(card, { width: "100%", height: "100%", borderRadius: "0px", duration: 0.8, ease: "power3.inOut" })
      // Mockup + content reveal
      .to(mockup, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")
      // Hold
      .to({}, { duration: 1.2 })
      // CTA reveal
      .set(heroText, { autoAlpha: 0 })
      .set(cta, { autoAlpha: 1 })
      .to(mockup, { autoAlpha: 0, y: -30, duration: 0.6, ease: "power2.in" })
      .to(card, { width: isMobile ? "92vw" : "85vw", height: isMobile ? "92vh" : "85vh", borderRadius: isMobile ? "32px" : "40px", duration: 1, ease: "expo.inOut" }, "cta")
      .to(cta, { scale: 1, filter: "blur(0px)", duration: 1, ease: "expo.inOut" }, "cta")
      // Exit
      .to({}, { duration: 0.8 })
      .to(card, { y: -window.innerHeight - 300, duration: 0.8, ease: "power3.in" });

    return () => { tl.kill(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#060D18" }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundSize: "60px 60px", backgroundImage: "linear-gradient(to right, rgba(245,200,66,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,200,66,0.04) 1px, transparent 1px)", maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)" }} />

      {/* Hero text */}
      <div ref={heroTextRef} style={{ position: "absolute", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100vw", padding: "0 1.5rem" }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2.5rem,6.5vw,5.5rem)", color: "#E8EDF4", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "0.2rem" }}
        >
          Votre devis en
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2.5rem,6.5vw,5.5rem)", letterSpacing: "-0.04em", lineHeight: 1.05, background: "linear-gradient(180deg, #F5C842 0%, rgba(245,200,66,0.6) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          3 minutes chrono.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{ marginTop: "1.25rem", color: "rgba(232,237,244,0.45)", fontSize: "clamp(0.9rem,1.8vw,1.05rem)", maxWidth: "32rem" }}
        >
          Un message vocal sur WhatsApp suffit pour générer un devis PDF complet.
        </motion.p>
      </div>

      {/* CTA (revealed after scroll) */}
      <div ref={ctaRef} style={{ position: "absolute", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100vw", padding: "0 1.5rem", pointerEvents: "auto" }}>
        <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4.5vw,3.5rem)", background: "linear-gradient(180deg,#F5C842 0%,rgba(245,200,66,0.55) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem" }}>
          Prêt à gagner 8h/semaine ?
        </h2>
        <p style={{ color: "rgba(232,237,244,0.5)", fontSize: "1rem", marginBottom: "2rem", maxWidth: "28rem", lineHeight: 1.65 }}>
          Rejoignez les artisans du bâtiment qui ont automatisé leur administratif.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#tarifs" style={{ padding: "0.9rem 2rem", borderRadius: "999px", background: "linear-gradient(180deg,#F5C842 0%,#d4a823 100%)", color: "#0A1520", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none", boxShadow: "0 8px 24px rgba(245,200,66,0.25)" }}>
            Démarrer gratuitement →
          </a>
          <a href="#services" style={{ padding: "0.9rem 2rem", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#E8EDF4", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>
            Voir les fonctionnalités
          </a>
        </div>
      </div>

      {/* Main card */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div
          ref={cardRef}
          style={{ position: "relative", overflow: "hidden", width: "92vw", height: "92vh", borderRadius: "32px", background: "linear-gradient(145deg,#0D1F35 0%,#060D18 100%)", border: "1px solid rgba(245,200,66,0.08)", boxShadow: "0 40px 100px -20px rgba(0,0,0,0.95), inset 0 1px 2px rgba(245,200,66,0.1)", pointerEvents: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div ref={mockupRef} style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem", alignItems: "center", padding: "2rem 3rem", maxWidth: "80rem", margin: "0 auto" }}>

            {/* LEFT */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "4px 12px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)", marginBottom: "1.25rem", width: "fit-content" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px rgba(74,222,128,0.8)" }} />
                <span style={{ color: "#F5C842", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>IA Vocale WhatsApp</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-nunito)", color: "#E8EDF4", fontSize: "clamp(1.3rem,2.2vw,2rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "1rem" }}>
                Administrez votre chantier <span style={{ color: "#F5C842" }}>depuis le terrain.</span>
              </h3>
              <p style={{ color: "rgba(232,237,244,0.5)", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                Un vocal suffit. <strong style={{ color: "#E8EDF4" }}>Floxia</strong> génère vos devis, factures et relances automatiquement.
              </p>
              {["Devis PDF en 3 min via WhatsApp", "Relances auto devis & factures", "Agent IA réceptionniste 24h/24"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                  <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="9" height="9" fill="none" stroke="#4ADE80" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                  </span>
                  <span style={{ color: "rgba(232,237,244,0.7)", fontSize: "0.8rem" }}>{f}</span>
                </div>
              ))}
            </div>

            {/* CENTER: Phone */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", height: "100%" }}>
              <div style={{ position: "relative", transform: "scale(0.9)" }}>
                <div ref={phoneRef} className="hero-iphone" style={{ position: "relative", width: 265, height: 550, borderRadius: "3rem", willChange: "transform", transformStyle: "preserve-3d" }}>
                  <div className="hero-hw-btn" style={{ position: "absolute", top: 110, left: -3, width: 3, height: 24, borderRadius: "4px 0 0 4px" }} />
                  <div className="hero-hw-btn" style={{ position: "absolute", top: 148, left: -3, width: 3, height: 40, borderRadius: "4px 0 0 4px" }} />
                  <div className="hero-hw-btn" style={{ position: "absolute", top: 200, left: -3, width: 3, height: 40, borderRadius: "4px 0 0 4px" }} />
                  <div className="hero-hw-btn" style={{ position: "absolute", top: 160, right: -3, width: 3, height: 62, borderRadius: "0 4px 4px 0" }} />

                  <div style={{ position: "absolute", inset: 7, background: "#111B21", borderRadius: "2.5rem", overflow: "hidden", color: "white", zIndex: 10 }}>
                    <div style={{ position: "absolute", top: 5, left: "50%", transform: "translateX(-50%)", width: 90, height: 25, background: "#000", borderRadius: 999, zIndex: 50 }} />

                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                      {/* WA Header */}
                      <div style={{ background: "#1F2C34", padding: "38px 12px 10px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#F5C842,#d4a823)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, color: "#0A1520" }}>F</div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700 }}>Floxia IA</div>
                          <div style={{ fontSize: 9, color: "#25D366" }}>en ligne</div>
                        </div>
                      </div>

                      {/* Chat */}
                      <div style={{ flex: 1, padding: "10px 9px", display: "flex", flexDirection: "column", gap: 7, background: "#0B141A", overflowY: "hidden" }}>
                        <div className="hero-wa-voice">
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="9" height="9" fill="white" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
                          </div>
                          <div style={{ flex: 1, height: 18, background: "rgba(255,255,255,0.1)", borderRadius: 999 }}>
                            <div style={{ height: "100%", width: "60%", background: "#25D366", borderRadius: 999, opacity: 0.6 }} />
                          </div>
                          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>0:12</span>
                        </div>

                        <div className="hero-wa-bubble-in">
                          <div style={{ color: "#F5C842", fontSize: 10, fontWeight: 700, marginBottom: 3 }}>✦ Floxia IA</div>
                          Je génère votre devis pour M. Durand — carrelage 85m²...
                          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2, textAlign: "right" }}>09:42 ✓✓</div>
                        </div>

                        <div className="hero-devis-card">
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                            <div style={{ width: 18, height: 18, borderRadius: 4, background: "rgba(245,200,66,0.15)", border: "1px solid rgba(245,200,66,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="9" height="9" fill="#F5C842" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            </div>
                            <div>
                              <div style={{ color: "#F5C842", fontWeight: 700, fontSize: 10 }}>DEVIS_Durand.pdf</div>
                              <div style={{ color: "rgba(232,237,244,0.4)", fontSize: 9 }}>PDF · 48 Ko</div>
                            </div>
                          </div>
                          <div style={{ borderTop: "1px solid rgba(245,200,66,0.1)", paddingTop: 5, display: "flex", justifyContent: "space-between" }}>
                            <span style={{ color: "rgba(232,237,244,0.4)", fontSize: 9 }}>Total HT</span>
                            <span style={{ color: "#4ADE80", fontWeight: 800, fontSize: 11 }}>3 840 €</span>
                          </div>
                        </div>

                        <div className="hero-wa-bubble-in" style={{ fontSize: 10 }}>
                          ✅ Envoyé à durand@gmail.com<br/>Relance auto J+3 si non signé.
                          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2, textAlign: "right" }}>09:43 ✓✓</div>
                        </div>
                      </div>

                      {/* Input */}
                      <div style={{ background: "#1F2C34", padding: "7px 9px", display: "flex", alignItems: "center", gap: 7, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ flex: 1, background: "#2A3942", borderRadius: 999, padding: "5px 11px", fontSize: 10, color: "rgba(232,237,244,0.3)" }}>Message</div>
                        <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="9" height="9" fill="white" viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="hero-badge" style={{ position: "absolute", top: 20, left: -80, borderRadius: 12, padding: "9px 12px", display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ fontSize: 16 }}>⚡</span>
                  <div>
                    <div style={{ color: "#E8EDF4", fontSize: 11, fontWeight: 700 }}>Devis en 3 min</div>
                    <div style={{ color: "rgba(245,200,66,0.55)", fontSize: 9 }}>IA Vocale WhatsApp</div>
                  </div>
                </div>
                <div className="hero-badge" style={{ position: "absolute", bottom: 50, right: -85, borderRadius: 12, padding: "9px 12px", display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ fontSize: 16 }}>✍️</span>
                  <div>
                    <div style={{ color: "#E8EDF4", fontSize: 11, fontWeight: 700 }}>Signé en ligne</div>
                    <div style={{ color: "rgba(74,222,128,0.65)", fontSize: 9 }}>Valeur légale</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-nunito)", fontSize: "clamp(3rem,5.5vw,6.5rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.9, marginBottom: "1.5rem", background: "linear-gradient(180deg,#fff 0%,#a1a1aa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.7))" }}>
                Floxia
              </div>
              {[
                { val: "47", label: "Fonctionnalités IA", color: "#F5C842" },
                { val: "8h", label: "Gagnées/semaine", color: "#4ADE80" },
                { val: "3min", label: "Par devis complet", color: "#60A5FA" },
              ].map((s) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}20`, borderRadius: 10, padding: "0.65rem 1.1rem", marginBottom: "0.6rem", textAlign: "right", width: "100%" }}>
                  <div style={{ color: s.color, fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.5rem", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ color: "rgba(232,237,244,0.4)", fontSize: "0.7rem", marginTop: "0.15rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "10rem", background: "linear-gradient(to top, rgba(15,25,35,0.95) 0%, transparent 100%)", zIndex: 30, pointerEvents: "none" }} />
    </div>
  );
}
