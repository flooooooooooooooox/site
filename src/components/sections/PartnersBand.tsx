"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PARTNERS = [
  {
    name: "WhatsApp Business",
    sub: "Meta API Officielle",
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "Gmail",
    sub: "Envoi d'e-mails pro",
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.908 1.528-1.147C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
      </svg>
    ),
  },
  {
    name: "Devis PDF",
    sub: "Signature électronique",
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#2455D6" fillOpacity="0.12"/>
        <path d="M6 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#2455D6" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 2v4h4M9 13h6M9 9h4M9 17h6" stroke="#2455D6" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "E-facture 2026",
    sub: "via B2Brouter (PDP)",
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#4ADE80" fillOpacity="0.1"/>
        <path d="M9 12l2 2 4-4" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="#4ADE80" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "Mistral AI",
    sub: "IA souveraine 🇫🇷 · données en UE",
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="3.4" rx="0.5" fill="#2455D6"/>
        <rect x="2" y="8.3" width="20" height="3.4" rx="0.5" fill="#FA8C16"/>
        <rect x="2" y="13.6" width="20" height="3.4" rx="0.5" fill="#F5222D"/>
        <rect x="2" y="18.9" width="20" height="2.1" rx="0.5" fill="#000" fillOpacity="0.55"/>
      </svg>
    ),
  },
  {
    name: "ElevenLabs",
    sub: "Voix agent réceptionniste IA",
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="4" width="3" height="16" rx="1.5" fill="var(--text)" fillOpacity="0.85"/>
        <rect x="15" y="4" width="3" height="16" rx="1.5" fill="var(--text)" fillOpacity="0.85"/>
      </svg>
    ),
  },
  {
    name: "ASPOne",
    sub: "Partenaire EDI de la DGFiP",
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#2455D6" fillOpacity="0.1"/>
        <path d="M5 19h14" stroke="#2455D6" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M6.5 19V10M10 19V10M14 19V10M17.5 19V10" stroke="#2455D6" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M12 4l7 4H5l7-4z" fill="#2455D6"/>
      </svg>
    ),
  },
  {
    name: "Bridge",
    sub: "Rapprochement bancaire (DSP2)",
    svg: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#2563EB" fillOpacity="0.12"/>
        <path d="M12 3l7 3.5v1.5H5V6.5L12 3z" fill="#2563EB"/>
        <path d="M6.5 10v6M10 10v6M14 10v6M17.5 10v6" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round"/>
        <rect x="5" y="17.5" width="14" height="1.8" rx="0.9" fill="#2563EB"/>
      </svg>
    ),
  },
];

export default function PartnersBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Defilement infini sans animation permanente : la liste est repetee trois
  // fois et, des qu'on approche d'un bord, on saute silencieusement d'une
  // longueur de liste. Le defilement natif du navigateur fait le reste — rien
  // ne tourne tant que personne ne clique.
  const loop = () => {
    const rail = railRef.current;
    if (!rail) return;
    const span = rail.scrollWidth / 3;
    if (rail.scrollLeft < span * 0.5) rail.scrollLeft += span;
    else if (rail.scrollLeft > span * 1.5) rail.scrollLeft -= span;
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    // On demarre sur la copie du milieu : il y a de la matiere des deux cotes.
    rail.scrollLeft = rail.scrollWidth / 3;
  }, []);

  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    loop();
    rail.scrollBy({ left: dir * Math.min(rail.clientWidth * 0.8, 420), behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} style={{ background: "transparent", padding: "3rem 0", borderTop: "1px solid rgba(var(--surface-rgb),0.05)", borderBottom: "1px solid rgba(var(--surface-rgb),0.05)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 6vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(var(--text-rgb),0.25)" }}
        >
          Nos partenaires
        </motion.p>
        <div style={{ position: "relative", width: "100%" }}>
          <div
            ref={railRef}
            className="partners-rail"
            onScroll={loop}
            style={{
              display: "flex",
              gap: "0.75rem",
              overflowX: "auto",
              scrollbarWidth: "none",
              padding: "0.25rem 0",
              maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
              WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
            }}
          >
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="partners-chip"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.65rem",
                  padding: "0.65rem 1.2rem", borderRadius: "999px",
                  border: "1px solid rgba(var(--surface-rgb),0.08)",
                  background: "rgba(var(--surface-rgb),0.03)",
                  whiteSpace: "nowrap", flexShrink: 0,
                  transition: "transform .2s ease, border-color .2s ease, background .2s ease",
                }}
              >
                <div style={{ flexShrink: 0 }}>{p.svg}</div>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "rgba(var(--text-rgb),0.85)", lineHeight: 1.2 }}>{p.name}</div>
                  <div style={{ fontSize: "0.65rem", color: "rgba(var(--text-rgb),0.4)", fontWeight: 500 }}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <button type="button" aria-label="Partenaires precedents" className="partners-arrow partners-arrow-l" onClick={() => nudge(-1)}>←</button>
          <button type="button" aria-label="Partenaires suivants" className="partners-arrow partners-arrow-r" onClick={() => nudge(1)}>→</button>
        </div>

        <style>{`
          .partners-rail::-webkit-scrollbar { display: none; }
          .partners-chip:hover {
            transform: translateY(-2px);
            border-color: rgba(36,85,214,0.35);
            background: rgba(36,85,214,0.06);
          }
          .partners-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 1px solid rgba(36,85,214,0.22);
            background: rgba(255,255,255,0.92);
            color: #2455D6;
            font-size: 0.95rem;
            line-height: 1;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px -4px rgba(27,42,74,0.18);
            transition: background .2s ease, border-color .2s ease, transform .2s ease;
            z-index: 2;
          }
          .partners-arrow:hover { background: #2455D6; color: #FFFFFF; border-color: #2455D6; }
          .partners-arrow:active { transform: translateY(-50%) scale(0.94); }
          .partners-arrow-l { left: -6px; }
          .partners-arrow-r { right: -6px; }
          @media (max-width: 640px) {
            .partners-arrow-l { left: -2px; }
            .partners-arrow-r { right: -2px; }
          }
        `}</style>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: "0.72rem", color: "rgba(var(--text-rgb),0.4)", textAlign: "center", fontWeight: 500 }}
        >
          🔒 IA 100% européenne (Mistral AI) — vos données ne quittent jamais l&apos;UE, en conformité RGPD.
        </motion.p>
        <p style={{ fontSize: "0.72rem", color: "rgba(var(--text-rgb),0.4)", textAlign: "center", fontWeight: 500, maxWidth: "42rem" }}>
          ✉️ Cirrion utilise votre compte Gmail pour envoyer automatiquement vos devis, factures et e-mails professionnels à vos clients, en votre nom.
        </p>
      </div>
    </section>
  );
}
