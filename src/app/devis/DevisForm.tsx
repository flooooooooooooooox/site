"use client";
import { useState } from "react";

const TRADES = ["Électricien", "Plombier", "Chauffagiste", "Maçon", "Peintre", "Menuisier", "Couvreur", "Carreleur", "Plaquiste", "Serrurier-métallier", "Autre"];
const SIZES = ["Seul", "2 à 5 personnes", "6 à 20 personnes", "Plus de 20 personnes"];

export default function DevisForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Une erreur est survenue.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="dv-card dv-done" role="status">
        <h2>Demande reçue</h2>
        <p>Merci ! Nous revenons vers vous sous 24 h avec une proposition chiffrée.</p>
      </div>
    );
  }

  return (
    <form className="dv-card" onSubmit={onSubmit}>
      <div className="dv-grid">
        <label>Nom *<input name="name" required autoComplete="name" /></label>
        <label>E-mail *<input name="email" type="email" required autoComplete="email" /></label>
        <label>Téléphone<input name="phone" type="tel" autoComplete="tel" /></label>
        <label>Entreprise<input name="company" autoComplete="organization" /></label>
        <label>Métier
          <select name="trade" defaultValue="">
            <option value="" disabled>Choisir…</option>
            {TRADES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label>Taille de l&apos;équipe
          <select name="size" defaultValue="">
            <option value="" disabled>Choisir…</option>
            {SIZES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      </div>
      <label className="dv-full">Votre besoin *
        <textarea name="message" rows={5} required placeholder="Ce que vous faites aujourd'hui, ce que vous voudriez automatiser…" />
      </label>
      {/* Champ piege anti-robots : ne pas remplir. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="dv-trap" />
      {error && <p className="dv-error" role="alert">{error}</p>}
      <button type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Envoi…" : "Demander mon devis"}
      </button>
    </form>
  );
}
