import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import DevisForm from "./DevisForm";

export const metadata: Metadata = pageMetadata({
  title: "Demande de devis — Cirrion",
  description: "Décrivez votre activité : vous recevez une proposition chiffrée de Cirrion sous 24 h.",
  alternates: { canonical: "https://www.cirrion.eu/devis" },
});

export default function DevisPage() {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <div style={{ maxWidth: "46rem", margin: "0 auto", padding: "clamp(6.5rem,16vw,8rem) max(16px,6vw) 5rem" }}>
        <h1 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4.5vw,3rem)", lineHeight: 1.1, color: "var(--text)", textAlign: "center", marginBottom: "0.9rem" }}>
          Demandez votre <span style={{ color: "#2455D6" }}>devis</span>
        </h1>
        <p style={{ textAlign: "center", color: "rgba(var(--text-rgb),0.6)", marginBottom: "2.2rem", lineHeight: 1.6 }}>
          Un seul prix, logiciel et comptabilité compris, fixé selon votre activité. Réponse sous 24 h.
        </p>
        <DevisForm />
      </div>
      <style>{`
        .dv-card { background: rgba(255,255,255,0.85); border: 1px solid rgba(36,85,214,0.12); border-radius: 1.4rem; padding: clamp(1.3rem,4vw,2.2rem); box-shadow: 0 24px 50px -34px rgba(36,85,214,0.4); display: flex; flex-direction: column; gap: 1rem; }
        .dv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .dv-card label { display: flex; flex-direction: column; gap: .35rem; font-size: .82rem; font-weight: 700; color: var(--text); }
        .dv-card input, .dv-card select, .dv-card textarea { font: inherit; font-weight: 400; font-size: .95rem; padding: .7rem .85rem; border-radius: .75rem; border: 1px solid rgba(36,85,214,0.2); background: #fff; color: var(--text); }
        .dv-card input:focus, .dv-card select:focus, .dv-card textarea:focus { outline: 2px solid #2455D6; outline-offset: 1px; }
        .dv-card button { align-self: flex-start; padding: .95rem 2rem; border-radius: 999px; border: 0; background: linear-gradient(135deg,#2A5FE0,#1C46BE); color: #fff; font-weight: 800; font-size: 1rem; cursor: pointer; }
        .dv-card button:disabled { opacity: .6; cursor: wait; }
        .dv-trap { position: absolute !important; left: -9999px; width: 1px; height: 1px; opacity: 0; }
        .dv-error { color: #B91C1C; font-size: .88rem; }
        .dv-done h2 { font-family: var(--font-nunito); font-weight: 900; color: var(--text); }
        .dv-done p { color: rgba(var(--text-rgb),0.7); }
        @media (max-width: 560px) {
          .dv-grid { grid-template-columns: 1fr; }
          /* 16 px minimum : en dessous, iOS zoome la page au toucher d'un champ. */
          .dv-card input, .dv-card select, .dv-card textarea { font-size: 16px; padding: .85rem .95rem; min-height: 48px; }
          .dv-card textarea { min-height: 120px; }
          .dv-card button { align-self: stretch; min-height: 56px; font-size: 1.05rem; }
        }
      `}</style>
    </main>
  );
}
