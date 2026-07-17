"use client";
import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

interface BlogBlock {
  type: "h2" | "h3" | "p" | "ul" | "cta";
  content?: string;
  items?: string[];
}

interface BlogArticleProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  badge: string;
  blocks: BlogBlock[];
}

export default function BlogArticle({ title, description, date, readTime, badge, blocks }: BlogArticleProps) {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "8rem 6vw 6rem" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link
            href="/ressources"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              color: "rgba(var(--text-rgb),0.5)", fontSize: ".85rem", textDecoration: "none",
              marginBottom: "2.5rem",
            }}
          >
            <ArrowLeft size={15} />
            Retour aux ressources
          </Link>

          <span style={{
            display: "inline-block", padding: "5px 16px", borderRadius: "999px",
            border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)",
            color: "#2455D6", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em",
            textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            {badge}
          </span>

          <h1 style={{
            fontFamily: "var(--font-nunito)", fontWeight: 900,
            fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text)",
            lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: "1rem",
          }}>
            {title}
          </h1>

          <p style={{ color: "rgba(var(--text-rgb),0.55)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            {description}
          </p>

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "3.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(var(--surface-rgb),0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "rgba(var(--text-rgb),0.4)", fontSize: ".8rem" }}>
              <CalendarDays size={13} />
              {date}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "rgba(var(--text-rgb),0.4)", fontSize: ".8rem" }}>
              <Clock size={13} />
              {readTime}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            {blocks.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} style={{
                    fontFamily: "var(--font-nunito)", fontWeight: 800,
                    fontSize: "clamp(1.3rem,2.5vw,1.6rem)", color: "var(--text)",
                    marginTop: "1.5rem", lineHeight: 1.25,
                  }}>
                    {block.content}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3 key={i} style={{
                    fontFamily: "var(--font-nunito)", fontWeight: 700,
                    fontSize: "1.1rem", color: "var(--text)", lineHeight: 1.3,
                  }}>
                    {block.content}
                  </h3>
                );
              }
              if (block.type === "p") {
                return (
                  <p key={i} style={{ color: "rgba(var(--text-rgb),0.72)", fontSize: ".95rem", lineHeight: 1.85 }}>
                    {block.content}
                  </p>
                );
              }
              if (block.type === "ul" && block.items) {
                return (
                  <ul key={i} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", padding: 0 }}>
                    {block.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "rgba(var(--text-rgb),0.72)", fontSize: ".95rem", lineHeight: 1.7 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2455D6", marginTop: "0.6rem", flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "cta") {
                return (
                  <div key={i} style={{
                    marginTop: "2rem", padding: "2rem", borderRadius: "1.25rem",
                    background: "rgba(36,85,214,0.06)", border: "1px solid rgba(36,85,214,0.18)",
                    textAlign: "center",
                  }}>
                    <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.2rem", color: "var(--text)", marginBottom: "0.75rem" }}>
                      {block.content}
                    </p>
                    <a
                      href="https://calendly.com/afele1845/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        padding: "0.9rem 1.8rem", borderRadius: "0.85rem",
                        background: "#2455D6", color: "#FFFFFF", fontWeight: 700,
                        fontSize: ".9rem", textDecoration: "none",
                      }}
                    >
                      Réserver une démo gratuite →
                    </a>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
