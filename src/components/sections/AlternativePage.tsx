"use client";
import Link from "next/link";
import { ArrowLeft, Check, X, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export interface CompareRow { feature: string; floxia: boolean; competitor: boolean | "partial" }
export interface AlternativePageProps {
  competitor: string;
  badge: string;
  title: string;
  intro: string;
  whyTitle: string;
  whyParagraphs: string[];
  rows: CompareRow[];
  forWhom: string;
  others: { label: string; href: string }[];
}

function mark(v: boolean | "partial") {
  if (v === true) return <Check size={16} color="#4ADE80" strokeWidth={2.5} />;
  if (v === "partial") return <span style={{ color: "rgba(var(--text-rgb),0.4)", fontSize: ".8rem" }}>partiel</span>;
  return <X size={15} color="rgba(var(--text-rgb),0.2)" />;
}

export default function AlternativePage({ competitor, badge, title, intro, whyTitle, whyParagraphs, rows, forWhom, others }: AlternativePageProps) {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link href="/alternatives" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(var(--text-rgb),0.45)", fontSize: ".82rem", textDecoration: "none", marginBottom: "2.5rem" }}>
            <ArrowLeft size={14} /> Toutes les alternatives
          </Link>

          <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)", color: "#F5C842", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            {badge}
          </span>

          <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4.5vw,3rem)", color: "var(--text)", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            {title}
          </h1>
          <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "3rem" }}>{intro}</p>

          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", color: "var(--text)", marginBottom: "1.25rem" }}>{whyTitle}</h2>
          {whyParagraphs.map((p, i) => (
            <p key={i} style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "1.2rem" }}>{p}</p>
          ))}

          {/* Comparison table */}
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", color: "var(--text)", margin: "2.5rem 0 1.25rem" }}>
            Floxia vs {competitor} : le comparatif
          </h2>
          <div style={{ border: "1px solid rgba(var(--surface-rgb),0.1)", borderRadius: "1rem", overflow: "hidden", marginBottom: "3rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "0.9rem 1.2rem", background: "rgba(245,200,66,0.06)", fontWeight: 700, fontSize: ".82rem", color: "var(--text)" }}>
              <span>Fonctionnalité</span>
              <span style={{ textAlign: "center", color: "#F5C842" }}>Floxia</span>
              <span style={{ textAlign: "center" }}>{competitor}</span>
            </div>
            {rows.map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "0.85rem 1.2rem", borderTop: "1px solid rgba(var(--surface-rgb),0.06)", alignItems: "center", fontSize: ".85rem", color: "rgba(var(--text-rgb),0.7)" }}>
                <span>{r.feature}</span>
                <span style={{ display: "flex", justifyContent: "center" }}>{mark(r.floxia)}</span>
                <span style={{ display: "flex", justifyContent: "center" }}>{mark(r.competitor)}</span>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", color: "var(--text)", marginBottom: "1rem" }}>
            Pour qui Floxia est-il la meilleure alternative ?
          </h2>
          <p style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: ".95rem", lineHeight: 1.85, marginBottom: "3rem" }}>{forWhom}</p>

          {/* CTA */}
          <div style={{ padding: "2.5rem", borderRadius: "1.5rem", background: "rgba(245,200,66,0.05)", border: "1px solid rgba(245,200,66,0.18)", textAlign: "center", marginBottom: "4rem" }}>
            <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1.4rem", color: "var(--text)", marginBottom: "0.6rem" }}>
              Découvrez pourquoi Floxia est l&apos;alternative à {competitor}
            </h3>
            <p style={{ color: "rgba(var(--text-rgb),0.5)", fontSize: ".88rem", marginBottom: "1.5rem" }}>Démo gratuite · Sans engagement</p>
            <a href="https://calendly.com/afele1845/30min" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "1rem 2rem", borderRadius: "0.85rem", background: "#F5C842", color: "#0F1923", fontWeight: 700, fontSize: ".95rem", textDecoration: "none" }}>
              <CalendarDays size={17} /> Réserver une démo gratuite
            </a>
          </div>

          <div>
            <p style={{ color: "rgba(var(--text-rgb),0.35)", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Autres comparaisons
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {others.map(({ label, href }) => (
                <Link key={href} href={href} style={{ padding: "0.5rem 1rem", borderRadius: "999px", border: "1px solid rgba(var(--surface-rgb),0.1)", color: "rgba(var(--text-rgb),0.55)", fontSize: ".82rem", textDecoration: "none" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
