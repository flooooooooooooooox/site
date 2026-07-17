"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export interface TradeFeature { title: string; desc: string }
export interface TradeLandingProps {
  trade: string;
  badge: string;
  title: string;
  subtitle: string;
  intro: string;
  features: TradeFeature[];
  useCases: string[];
  closing: string;
  relatedTrades: { label: string; href: string }[];
}

export default function TradeLanding({ trade, badge, title, subtitle, intro, features, useCases, closing, relatedTrades }: TradeLandingProps) {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link href="/artisans" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(var(--text-rgb),0.45)", fontSize: ".82rem", textDecoration: "none", marginBottom: "2.5rem" }}>
            <ArrowLeft size={14} /> Tous les métiers
          </Link>

          <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: "999px", border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)", color: "#2455D6", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            {badge}
          </span>

          <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4.5vw,3.2rem)", color: "var(--text)", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
            {title}
          </h1>
          <p style={{ color: "#2455D6", fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "1.1rem", marginBottom: "1.5rem" }}>{subtitle}</p>
          <p style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "3rem", maxWidth: "620px" }}>{intro}</p>

          {/* Features grid */}
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", color: "var(--text)", marginBottom: "1.5rem" }}>
            Ce que Floxia fait pour les {trade}s
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45 }}
                style={{ padding: "1.4rem", borderRadius: "1rem", border: "1px solid rgba(var(--surface-rgb),0.08)", background: "rgba(var(--surface-rgb),0.02)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2455D6", marginBottom: "0.75rem" }} />
                <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: ".95rem", color: "var(--text)", marginBottom: "0.4rem" }}>{f.title}</h3>
                <p style={{ color: "rgba(var(--text-rgb),0.55)", fontSize: ".82rem", lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Use cases */}
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", color: "var(--text)", marginBottom: "1rem" }}>
            Cas d&apos;usage concrets
          </h2>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "3rem" }}>
            {useCases.map((u, i) => (
              <li key={i} style={{ display: "flex", gap: "0.75rem", color: "rgba(var(--text-rgb),0.7)", fontSize: ".92rem", lineHeight: 1.7 }}>
                <span style={{ color: "#2455D6", fontWeight: 700, flexShrink: 0 }}>→</span>
                {u}
              </li>
            ))}
          </ul>

          <p style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: ".95rem", lineHeight: 1.8, marginBottom: "3rem" }}>{closing}</p>

          {/* CTA */}
          <div style={{ padding: "2.5rem", borderRadius: "1.5rem", background: "rgba(36,85,214,0.05)", border: "1px solid rgba(36,85,214,0.18)", textAlign: "center", marginBottom: "4rem" }}>
            <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.4rem", color: "var(--text)", marginBottom: "0.6rem" }}>
              Prêt à automatiser votre gestion de {trade} ?
            </h3>
            <p style={{ color: "rgba(var(--text-rgb),0.5)", fontSize: ".88rem", marginBottom: "1.5rem" }}>Demo gratuite · Mise en place en 24h · Sans engagement</p>
            <a href="https://calendly.com/afele1845/30min" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2rem", borderRadius: "0.85rem", background: "#2455D6", color: "#FFFFFF", fontWeight: 700, fontSize: ".95rem", textDecoration: "none" }}>
              <CalendarDays size={17} />
              Réserver une démo gratuite
            </a>
          </div>

          {/* Related trades */}
          <div>
            <p style={{ color: "rgba(var(--text-rgb),0.35)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Autres métiers du bâtiment
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {relatedTrades.map(({ label, href }) => (
                <Link key={href} href={href} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "999px", border: "1px solid rgba(var(--surface-rgb),0.1)", color: "rgba(var(--text-rgb),0.55)", fontSize: ".82rem", textDecoration: "none" }}>
                  {label} <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
