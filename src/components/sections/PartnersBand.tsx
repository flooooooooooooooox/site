"use client";
import { motion } from "framer-motion";

const MAIN_PARTNERS = [
  {
    name: "WhatsApp Business",
    sub: "Meta API Officielle",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "Gmail",
    sub: "Envoi d'e-mails pro",
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.908 1.528-1.147C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
      </svg>
    ),
  },
];

const SECONDARY_PARTNERS = [
  {
    name: "OVHcloud",
    sub: "Hébergement France",
    svg: (
      <svg width="32" height="16" viewBox="0 0 100 40">
        <text x="0" y="32" fontFamily="Arial" fontWeight="900" fontSize="36" fill="#0050d8">OVH</text>
      </svg>
    ),
  },
  {
    name: "Stripe",
    sub: "Paiements",
    svg: (
      <svg width="36" height="16" viewBox="0 0 100 40">
        <text x="0" y="30" fontFamily="Arial" fontWeight="800" fontSize="30" fill="#635BFF">stripe</text>
      </svg>
    ),
  },
  {
    name: "DocuSign",
    sub: "Signature élec.",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#FFCC22"/>
        <path d="M7 12h10M12 7v10" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Pennylane",
    sub: "Comptabilité",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#7C3AED"/>
        <text x="6.5" y="17" fontFamily="Arial" fontWeight="900" fontSize="13" fill="white">P</text>
      </svg>
    ),
  },
  {
    name: "DGFiP / CERFA",
    sub: "TVA & e-reporting",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#002395"/>
        <text x="3.5" y="17" fontFamily="Arial" fontWeight="900" fontSize="11" fill="white">FR</text>
      </svg>
    ),
  },
  {
    name: "Twilio / SIP",
    sub: "Standard vocal",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#F22F46"/>
        <circle cx="8.5" cy="8.5" r="1.8" fill="white"/>
        <circle cx="15.5" cy="8.5" r="1.8" fill="white"/>
        <circle cx="8.5" cy="15.5" r="1.8" fill="white"/>
        <circle cx="15.5" cy="15.5" r="1.8" fill="white"/>
      </svg>
    ),
  },
];

function Pill({ name, sub, svg, large, delay }: { name: string; sub: string; svg: React.ReactNode; large?: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ borderColor: "rgba(245,200,66,0.25)", backgroundColor: "rgba(245,200,66,0.04)" }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: large ? "0.75rem" : "0.5rem",
        padding: large ? "0.75rem 1.4rem" : "0.45rem 0.9rem",
        borderRadius: "999px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(8px)",
        transition: "border-color 0.25s, background 0.25s",
        cursor: "default",
      }}
    >
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>{svg}</div>
      <div>
        <div style={{ fontSize: large ? "0.88rem" : "0.72rem", fontWeight: 700, color: large ? "rgba(232,237,244,0.9)" : "rgba(232,237,244,0.7)", lineHeight: 1.2 }}>{name}</div>
        <div style={{ fontSize: large ? "0.68rem" : "0.58rem", color: "rgba(232,237,244,0.35)", fontWeight: 500 }}>{sub}</div>
      </div>
    </motion.div>
  );
}

export default function PartnersBand() {
  return (
    <section style={{ background: "#0A1520", padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 6vw" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(232,237,244,0.25)", marginBottom: "1.5rem" }}
        >
          Intégrations & services partenaires
        </motion.p>

        {/* Ligne 1 — WhatsApp + Gmail en grand */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          {MAIN_PARTNERS.map((p, i) => (
            <Pill key={p.name} {...p} large delay={i * 0.08} />
          ))}
        </div>

        {/* Ligne 2 — autres services plus petits */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.65rem", flexWrap: "wrap" }}>
          {SECONDARY_PARTNERS.map((p, i) => (
            <Pill key={p.name} {...p} delay={0.18 + i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
