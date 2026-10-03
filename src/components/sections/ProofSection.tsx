"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Chaque chiffre, et le partenaire qui le rend vrai.
 *
 * Remplace le carrousel de partenaires et la rangee de compteurs : deux blocs
 * qui parlaient chacun de leur cote. Ici un chiffre ne s'affiche jamais seul,
 * il est adosse a la technologie qui le tient.
 *
 * Tout le texte est dans le HTML servi : les compteurs partent de leur vraie
 * valeur et ne repassent a 0 qu'au moment de l'animation. La phrase sur Gmail
 * doit rester dans la page — Google la lit pour valider l'acces OAuth.
 */

/* ----- Logos ----- */

const LogoWhatsApp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const LogoMistral = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2" y="3" width="20" height="3.4" rx="0.5" fill="#FFD800" />
    <rect x="2" y="8.3" width="20" height="3.4" rx="0.5" fill="#FF8205" />
    <rect x="2" y="13.6" width="20" height="3.4" rx="0.5" fill="#FA500F" />
    <rect x="2" y="18.9" width="20" height="2.1" rx="0.5" fill="#E10500" />
  </svg>
);

const LogoElevenLabs = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="6" y="4" width="3" height="16" rx="1.5" fill="#1B2A4A" />
    <rect x="15" y="4" width="3" height="16" rx="1.5" fill="#1B2A4A" />
  </svg>
);

const LogoModules = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="3" width="8" height="8" rx="2" fill="#2455D6" />
    <rect x="13" y="3" width="8" height="8" rx="2" fill="#2455D6" fillOpacity=".45" />
    <rect x="3" y="13" width="8" height="8" rx="2" fill="#2455D6" fillOpacity=".45" />
    <rect x="13" y="13" width="8" height="8" rx="2" fill="#2455D6" fillOpacity=".2" />
  </svg>
);

const LogoGmail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.908 1.528-1.147C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335" />
  </svg>
);

const LogoBridge = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3l7 3.5v1.5H5V6.5L12 3z" fill="#2563EB" />
    <path d="M6.5 10v6M10 10v6M14 10v6M17.5 10v6" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="5" y="17.5" width="14" height="1.8" rx="0.9" fill="#2563EB" />
  </svg>
);

const LogoAspOne = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 19h14" stroke="#1C43AC" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M6.5 19V10M10 19V10M14 19V10M17.5 19V10" stroke="#1C43AC" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M12 4l7 4H5l7-4z" fill="#1C43AC" />
  </svg>
);

/** Facture electronique : un document et sa coche de validation. */
const LogoEFacture = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 2.5h8l4 4V20a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 015 20V4a1.5 1.5 0 011-1.5z" fill="#fff" stroke="#16A34A" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 2.5v4h4" stroke="#16A34A" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8.5 14l2.2 2.2L15.5 11.5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ----- Donnees ----- */

type Proof = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  Logo: () => React.JSX.Element;
  partner: string;
  detail: string;
};

const PROOFS: Proof[] = [
  {
    value: 3, suffix: " min", label: "pour créer un devis",
    Logo: LogoWhatsApp, partner: "WhatsApp Business", detail: "API officielle Meta, par vocal ou écrit",
  },
  {
    value: 100, suffix: "", label: "fonctions dans un seul outil",
    Logo: LogoModules, partner: "Tout-en-un", detail: "Devis, factures, TVA, planning, trésorerie…",
  },
  {
    value: 100, suffix: " %", label: "de vos données en Europe",
    Logo: LogoMistral, partner: "Mistral AI", detail: "IA française, hébergement en France",
  },
  {
    value: 24, suffix: " h/24", label: "un agent IA décroche pour vous",
    Logo: LogoElevenLabs, partner: "ElevenLabs", detail: "La voix de votre réceptionniste",
  },
];

const ALSO = [
  { Logo: LogoGmail, name: "Gmail", sub: "Envoi en votre nom" },
  { Logo: LogoBridge, name: "Bridge", sub: "Banque · DSP2" },
  { Logo: LogoAspOne, name: "ASPOne", sub: "Partenaire EDI DGFiP" },
];

/* ----- Compteur ----- */

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const COUNT_MS = 2400;
const STAGGER_MS = 140;

function Counter({ target, suffix, trigger, index }: {
  target: number; suffix: string; trigger: boolean; index: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!trigger || started.current || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    started.current = true;
    node.textContent = `0${suffix}`;

    let raf = 0;
    let t0 = 0;
    const delay = index * STAGGER_MS;
    const step = (now: number) => {
      if (!t0) t0 = now;
      const elapsed = now - t0 - delay;
      if (elapsed < 0) { raf = requestAnimationFrame(step); return; }
      const p = Math.min(elapsed / COUNT_MS, 1);
      node.textContent = `${Math.round(easeOutQuart(p) * target)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, suffix, index]);

  return <span ref={ref}>{`${target}${suffix}`}</span>;
}

/* ----- Section ----- */

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTrigger(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="proof">
      <div className="proof-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="proof-head"
        >
          <span className="proof-eyebrow">Nos partenaires</span>
          <h2 className="proof-title">
            Chaque promesse a <span style={{ color: "#2455D6" }}>quelqu&apos;un derrière</span>
          </h2>
        </motion.div>

        <div className="proof-grid">
          {PROOFS.map((p, i) => (
            <motion.div
              key={p.label}
              className="proof-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="proof-value">
                <Counter target={p.value} suffix={p.suffix} trigger={trigger} index={i} />
              </p>
              <p className="proof-label">{p.label}</p>
              <div className="proof-partner">
                <span className="proof-logo"><p.Logo /></span>
                <span>
                  <span className="proof-partner-name">{p.partner}</span>
                  <span className="proof-partner-detail">{p.detail}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* E-facture : pas un chiffre, une habilitation. Elle a sa propre ligne. */}
        <motion.div
          className="proof-efacture"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="proof-efacture-icon"><LogoEFacture /></span>
          <p>
            <strong>E-facture via B2Brouter</strong>, plateforme agréée par l&apos;administration
            fiscale : vos factures électroniques passent par un canal approuvé par l&apos;État.
          </p>
        </motion.div>

        <div className="proof-also">
          {ALSO.map(({ Logo, name, sub }) => (
            <span key={name} className="proof-chip">
              <Logo />
              <span>
                <span className="proof-chip-name">{name}</span>
                <span className="proof-chip-sub">{sub}</span>
              </span>
            </span>
          ))}
        </div>

        <p className="proof-note">
          <LogoGmail />
          <span>
            Cirrion utilise votre compte Gmail pour envoyer automatiquement vos devis, factures et
            e-mails professionnels à vos clients, en votre nom.
          </span>
        </p>
      </div>

      <style>{`
        .proof { padding: clamp(3rem, 7vw, 5rem) 0 clamp(2.5rem, 6vw, 4rem); }
        .proof-inner { max-width: 1120px; margin: 0 auto; padding: 0 6vw; }

        .proof-head { text-align: center; margin-bottom: 2.4rem; }
        .proof-eyebrow {
          display: inline-block; padding: 6px 20px; border-radius: 999px;
          border: 1px solid rgba(36,85,214,0.25); background: rgba(36,85,214,0.07);
          color: #2455D6; font-size: .78rem; font-weight: 600; letter-spacing: .1em;
          text-transform: uppercase; margin-bottom: 1.1rem;
        }
        .proof-title {
          font-family: var(--font-nunito); font-weight: 900;
          font-size: clamp(1.7rem, 3.6vw, 2.5rem); line-height: 1.15;
          color: var(--text); text-wrap: balance;
        }

        .proof-grid {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem;
        }
        .proof-card {
          position: relative;
          display: flex; flex-direction: column;
          padding: 1.7rem 1.4rem 1.3rem;
          border-radius: 1.25rem;
          background: linear-gradient(175deg, #FFFFFF 0%, #F7FAFF 100%);
          border: 1px solid rgba(36,85,214,0.12);
          box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 18px 40px -28px rgba(27,42,74,0.35);
          transition: transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s ease, border-color .3s ease;
        }
        .proof-card:hover {
          transform: translateY(-4px);
          border-color: rgba(36,85,214,0.3);
          box-shadow: 0 1px 0 rgba(255,255,255,0.9) inset, 0 24px 46px -26px rgba(36,85,214,0.45);
        }
        .proof-value {
          font-family: var(--font-nunito); font-weight: 800;
          font-size: clamp(2.3rem, 4.2vw, 3.1rem); line-height: 1; letter-spacing: -0.035em;
          font-variant-numeric: tabular-nums; white-space: nowrap;
          background: linear-gradient(120deg, #16264A 0%, #2455D6 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
        }
        .proof-label {
          margin-top: .55rem; font-size: .88rem; font-weight: 600;
          color: rgba(var(--text-rgb),0.62); line-height: 1.35;
        }
        .proof-partner {
          margin-top: auto; padding-top: 1.1rem;
          display: flex; align-items: center; gap: .65rem;
          border-top: 1px solid rgba(36,85,214,0.1);
        }
        .proof-label { margin-bottom: 1.2rem; }
        .proof-logo {
          flex-shrink: 0; width: 38px; height: 38px; border-radius: 11px;
          display: grid; place-items: center;
          background: rgba(36,85,214,0.06); border: 1px solid rgba(36,85,214,0.1);
        }
        .proof-partner-name {
          display: block; font-size: .8rem; font-weight: 700; color: var(--text); line-height: 1.25;
        }
        .proof-partner-detail {
          display: block; font-size: .7rem; color: rgba(var(--text-rgb),0.5); line-height: 1.35;
        }

        .proof-efacture {
          margin: 1.4rem auto 0; max-width: 46rem;
          display: flex; align-items: center; gap: .9rem;
          padding: .9rem 1.3rem; border-radius: 1rem;
          background: linear-gradient(100deg, rgba(22,163,74,0.08), rgba(36,85,214,0.05));
          border: 1px solid rgba(22,163,74,0.22);
        }
        .proof-efacture-icon {
          flex-shrink: 0; width: 42px; height: 42px; border-radius: 12px;
          display: grid; place-items: center; background: #FFFFFF;
          border: 1px solid rgba(22,163,74,0.25);
        }
        .proof-efacture p {
          font-size: .86rem; line-height: 1.5; color: rgba(var(--text-rgb),0.7);
        }
        .proof-efacture strong { color: #15803D; font-weight: 800; }

        .proof-also {
          margin-top: 1.4rem;
          display: flex; flex-wrap: wrap; justify-content: center; gap: .6rem;
        }
        .proof-chip {
          display: inline-flex; align-items: center; gap: .55rem;
          padding: .5rem 1rem .5rem .75rem; border-radius: 999px;
          background: rgba(255,255,255,0.7); border: 1px solid rgba(36,85,214,0.1);
        }
        .proof-chip-name { display: block; font-size: .76rem; font-weight: 700; color: var(--text); line-height: 1.2; }
        .proof-chip-sub { display: block; font-size: .64rem; color: rgba(var(--text-rgb),0.48); }

        .proof-note {
          margin: 1.3rem auto 0; max-width: 40rem;
          display: flex; align-items: flex-start; justify-content: center; gap: .5rem;
          font-size: .74rem; line-height: 1.55; color: rgba(var(--text-rgb),0.48); text-align: left;
        }
        .proof-note svg { flex-shrink: 0; margin-top: 1px; width: 15px; height: 15px; }

        @media (max-width: 980px) {
          .proof-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 460px) {
          .proof-grid { grid-template-columns: 1fr; }
          .proof-efacture { align-items: flex-start; }
        }
        @media (hover: none) {
          .proof-card:hover { transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .proof-card { transition: none; }
          .proof-card:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}
