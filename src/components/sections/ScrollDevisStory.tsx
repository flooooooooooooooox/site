"use client";
import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

/**
 * Du vocal a la facture en 4 etapes, joue par le scroll : la position dans la page est le temps
 * de l'animation (on remonte, elle recule). Pas de video : tout est calcule a partir de `p`,
 * donc net sur tous les ecrans, leger, et sans saccade sur mobile.
 * Le defilement n'est jamais bloque : la scene est seulement collee (sticky) pendant la traversee.
 * Les montants sont ceux de l'exemple de la page d'essai, annonces comme tels.
 */

const STEPS = [
  { t: "Vous dictez", d: "Vous décrivez le chantier à voix haute, comme à un collègue." },
  { t: "Le devis est prêt", d: "Cirrion range les prestations et calcule les totaux. Vous vérifiez." },
  { t: "Signé et envoyé", d: "Le client signe, le devis part. Rien à ressaisir." },
  { t: "Facture et TVA suivies", d: "La facture se prépare, les impayés sont relancés, la TVA est préparée." },
];
const SPOKEN = "Devis pour Madame Durand. Remplacement du tableau électrique, six heures de main-d'œuvre à 55 euros. TVA 10 %.";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Apparition progressive entre deux instants de l'etape (0..1). */
const ramp = (lp: number, from: number, to: number) => clamp((lp - from) / (to - from));

export default function ScrollDevisStory() {
  const track = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(clamp(v)));

  const pos = reduce ? 0 : p * 4; // 0..4
  const active = reduce ? -1 : Math.min(3, Math.floor(pos));

  return (
    <section ref={track} className={`ss-track${reduce ? " ss-static" : ""}`} aria-label="Du vocal à la facture, en 4 étapes">
      <div className="ss-stage">
        <ol className="ss-dots" aria-label="Étapes">
          {STEPS.map((s, i) => (
            <li key={s.t} className={i === active ? "on" : i < active ? "done" : ""}><span>{i + 1}</span><b>{s.t}</b></li>
          ))}
        </ol>

        <a className="ss-skip" href="#essai-outil">Passer et dicter mon devis ↓</a>
        <div className="ss-scenes">
          {STEPS.map((s, i) => {
            const lp = reduce ? 1 : clamp(pos - i);
            const o = reduce ? 1 : Math.round(clamp((0.6 - Math.abs(pos - (i + 0.5))) / 0.2) * 100) / 100;
            const dy = reduce ? 0 : Math.round((i + 0.5 - pos) * 28);
            return (
              <div
                key={s.t}
                className="ss-scene"
                style={{ opacity: o, transform: `translateY(${dy}px)`, pointerEvents: o > 0.5 ? "auto" : "none" }}
                aria-hidden={!reduce && Math.round(o) === 0}
              >
                <div className="ss-card">
                  {i === 0 && <Dictate lp={lp} />}
                  {i === 1 && <Quote lp={lp} />}
                  {i === 2 && <Sign lp={lp} />}
                  {i === 3 && <Invoice lp={lp} />}
                </div>
                <h2 className="ss-h">{s.t}</h2>
                <p className="ss-p">{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>
      <style>{CSS}</style>
    </section>
  );
}

function Dictate({ lp }: { lp: number }) {
  const chars = Math.floor(clamp(lp * 1.25) * SPOKEN.length);
  return (
    <>
      <div className="ss-mic" style={{ boxShadow: `0 0 0 ${Math.round(6 + lp * 18)}px rgba(36,85,214,${(0.16 - lp * 0.08).toFixed(2)})` }} aria-hidden>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
      </div>
      <div className="ss-wave" aria-hidden>
        {Array.from({ length: 18 }, (_, k) => (
          <i key={k} style={{ height: `${Math.round(10 + Math.abs(Math.sin(lp * 22 + k * 0.9)) * 30)}px` }} />
        ))}
      </div>
      <p className="ss-typed">« {SPOKEN.slice(0, chars)}<em aria-hidden>|</em> »</p>
    </>
  );
}

function Row({ lp, at, label, value }: { lp: number; at: number; label: string; value: string }) {
  const a = Math.round(ramp(lp, at, at + 0.14) * 100) / 100;
  return (
    <div className="ss-row" style={{ opacity: a, transform: `translateY(${Math.round((1 - a) * 8)}px)` }}>
      <span>{label}</span><b>{value}</b>
    </div>
  );
}

function Quote({ lp }: { lp: number }) {
  return (
    <>
      <div className="ss-doc-head"><b>DEVIS</b><small>Exemple · Madame Durand</small></div>
      <Row lp={lp} at={0.08} label="Tableau électrique" value="450,00 €" />
      <Row lp={lp} at={0.3} label="Main-d'œuvre, 6 h × 55 €" value="330,00 €" />
      <div className="ss-sums">
        <Row lp={lp} at={0.56} label="Total HT" value="780,00 €" />
        <Row lp={lp} at={0.68} label="TVA 10 %" value="78,00 €" />
        <Row lp={lp} at={0.8} label="Total TTC" value="858,00 €" />
      </div>
    </>
  );
}

function Sign({ lp }: { lp: number }) {
  const draw = clamp(lp * 1.6);
  return (
    <>
      <div className="ss-doc-head"><b>DEVIS</b><small>Madame Durand</small></div>
      <div className="ss-sign">
        <span>Bon pour accord</span>
        <svg viewBox="0 0 200 50" aria-hidden>
          <path d="M8 36 C 22 6, 34 6, 40 30 S 58 44, 70 20 S 92 8, 100 32 S 140 40, 192 14" fill="none" stroke="#2455D6" strokeWidth="2.6" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={Math.round((1 - draw) * 100) / 100} />
        </svg>
      </div>
      <div className="ss-badges">
        <span className="ss-badge" style={{ opacity: ramp(lp, 0.55, 0.7) }}>✓ Signé</span>
        <span className="ss-badge go" style={{ opacity: ramp(lp, 0.75, 0.9), transform: `translateX(${(1 - ramp(lp, 0.75, 0.9)) * 24}px)` }}>Envoyé à Mme Durand</span>
      </div>
    </>
  );
}

function Invoice({ lp }: { lp: number }) {
  return (
    <>
      <div className="ss-doc-head"><b>FACTURE</b><small>Issue du devis signé</small></div>
      <Row lp={lp} at={0.08} label="Facture prête et envoyée" value="✓" />
      <Row lp={lp} at={0.3} label="Paiement suivi, relance si besoin" value="✓" />
      <div className="ss-tva">
        <span>TVA préparée</span>
        <div className="ss-bar"><i style={{ width: `${ramp(lp, 0.5, 0.95) * 100}%` }} /></div>
        <small style={{ opacity: ramp(lp, 0.85, 0.98) }}>Prête à déclarer</small>
      </div>
    </>
  );
}

const CSS = `
.ss-track { position: relative; height: 340vh; margin: 2rem 0 3rem; }
.ss-stage { position: sticky; top: 72px; height: calc(100svh - 84px); min-height: 520px; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.ss-dots { list-style: none; padding: 0; display: flex; gap: .4rem; flex-wrap: wrap; justify-content: center; }
.ss-dots li { display: flex; align-items: center; gap: .4rem; padding: .3rem .7rem .3rem .35rem; border-radius: 999px; background: rgba(var(--text-rgb),0.06); color: rgba(var(--text-rgb),0.5); font-size: .72rem; transition: background .3s, color .3s; }
.ss-dots li span { width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; background: rgba(var(--text-rgb),0.12); font-weight: 800; font-size: .68rem; }
.ss-dots li.on { background: rgba(36,85,214,0.14); color: #2455D6; }
.ss-dots li.on span, .ss-dots li.done span { background: #2455D6; color: #fff; }
.ss-dots li.done { color: #2455D6; }
.ss-dots li b { font-weight: 700; }
.ss-scenes { position: relative; flex: 1; width: 100%; max-width: 26rem; }
.ss-scene { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .9rem; text-align: center; will-change: opacity, transform; }
.ss-card { width: 100%; min-height: 15.5rem; padding: 1.3rem; border-radius: 1.4rem; background: linear-gradient(160deg, rgba(255,255,255,0.92), rgba(222,233,255,0.78)); border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 30px 60px -34px rgba(36,85,214,0.55), inset 0 1px 0 rgba(255,255,255,0.9); display: flex; flex-direction: column; gap: .7rem; text-align: left; justify-content: center; }
.ss-h { font-family: var(--font-nunito); font-weight: 900; font-size: clamp(1.35rem,4.6vw,1.8rem); color: var(--text); line-height: 1.15; text-wrap: balance; }
.ss-p { color: rgba(var(--text-rgb),0.65); line-height: 1.55; font-size: .95rem; max-width: 22rem; text-wrap: balance; }
.ss-mic { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg,#2A5FE0,#1C46BE); display: grid; place-items: center; align-self: center; }
.ss-wave { display: flex; align-items: center; justify-content: center; gap: 4px; height: 44px; }
.ss-wave i { width: 4px; border-radius: 4px; background: #2455D6; opacity: .75; }
.ss-typed { font-size: .9rem; font-style: italic; color: var(--text); line-height: 1.5; min-height: 4.2em; }
.ss-typed em { font-style: normal; color: #2455D6; margin-left: 1px; }
.ss-doc-head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #2455D6; padding-bottom: .5rem; }
.ss-doc-head b { font-family: var(--font-nunito); font-weight: 900; letter-spacing: .12em; color: #2455D6; }
.ss-doc-head small { color: rgba(var(--text-rgb),0.55); font-size: .74rem; }
.ss-row { display: flex; justify-content: space-between; gap: 1rem; font-size: .92rem; color: rgba(var(--text-rgb),0.75); font-variant-numeric: tabular-nums; }
.ss-row b { color: var(--text); }
.ss-sums { margin-top: .3rem; padding-top: .6rem; border-top: 1px dashed rgba(36,85,214,0.35); display: flex; flex-direction: column; gap: .3rem; }
.ss-sums .ss-row:last-child { font-size: 1.05rem; } .ss-sums .ss-row:last-child b { color: #2455D6; }
.ss-sign { display: flex; flex-direction: column; gap: .2rem; padding: .6rem 0; }
.ss-sign span { font-size: .74rem; font-weight: 700; color: rgba(var(--text-rgb),0.5); text-transform: uppercase; letter-spacing: .08em; }
.ss-sign svg { width: 100%; height: 56px; border-bottom: 1px solid rgba(var(--text-rgb),0.25); }
.ss-badges { display: flex; gap: .5rem; flex-wrap: wrap; }
.ss-badge { padding: .4rem .8rem; border-radius: 999px; font-weight: 800; font-size: .82rem; background: rgba(16,150,90,0.14); color: #0B7A48; }
.ss-badge.go { background: rgba(36,85,214,0.12); color: #2455D6; }
.ss-tva { display: flex; flex-direction: column; gap: .4rem; margin-top: .4rem; font-weight: 700; color: var(--text); font-size: .92rem; }
.ss-bar { height: 10px; border-radius: 999px; background: rgba(36,85,214,0.14); overflow: hidden; }
.ss-bar i { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg,#2A5FE0,#5C8DFF); }
.ss-tva small { color: #0B7A48; font-weight: 700; }
.ss-skip { font-size: .8rem; margin-top: -.4rem; font-weight: 700; color: #2455D6; text-decoration: underline; text-underline-offset: 3px; padding: .5rem; }
@media (max-width: 640px) { .ss-track { height: 300vh; } .ss-dots li b { display: none; } .ss-dots li.on b { display: inline; } .ss-card { padding: 1.05rem; } }
/* Animations reduites : les 4 etapes se lisent l'une sous l'autre, sans scroll anime. */
.ss-static { height: auto; }
.ss-static .ss-stage { position: static; height: auto; min-height: 0; }
.ss-static .ss-scenes { display: flex; flex-direction: column; gap: 2.2rem; max-width: 26rem; }
.ss-static .ss-scene { position: static; }
.ss-static .ss-dots { display: none; }
.ss-static .ss-skip { display: none; }
`;
