import Link from "next/link";
import JsonLd from "./JsonLd";

export type Answer = { question: string; answer: string };

export default function AnswerSection({ title, answers, links = [] }: {
  title: string;
  answers: Answer[];
  links?: { href: string; label: string }[];
}) {
  return (
    <section style={{ margin: "3rem 0", overflowWrap: "anywhere" }}>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: answers.map(a => ({
          "@type": "Question", name: a.question,
          acceptedAnswer: { "@type": "Answer", text: a.answer },
        })),
      }} />
      <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", marginBottom: "1.2rem", color: "var(--text)" }}>{title}</h2>
      {answers.map(a => (
        <details key={a.question} style={{ padding: "1rem 0", borderBottom: "1px solid rgba(var(--text-rgb),0.12)" }}>
          <summary style={{ cursor: "pointer", fontWeight: 600, lineHeight: 1.5, color: "var(--text)" }}>{a.question}</summary>
          <p style={{ marginTop: ".75rem", color: "rgba(var(--text-rgb),0.72)", lineHeight: 1.8, fontSize: ".95rem" }}>{a.answer}</p>
        </details>
      ))}
      {links.length > 0 && <nav aria-label="Guides pour approfondir" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
        {links.map(l => <Link key={l.href} href={l.href} style={{ color: "#2455D6", fontSize: ".9rem", textUnderlineOffset: ".2em" }}>{l.label}</Link>)}
      </nav>}
    </section>
  );
}
