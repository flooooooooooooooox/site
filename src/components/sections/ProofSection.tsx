"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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

/** Facture electronique : un document et sa coche de validation. */
const LogoEFacture = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 2.5h8l4 4V20a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 015 20V4a1.5 1.5 0 011-1.5z" fill="#fff" stroke="#16A34A" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 2.5v4h4" stroke="#16A34A" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8.5 14l2.2 2.2L15.5 11.5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Pas le logo officiel : une clementine, pour reconnaitre le cabinet d'un coup d'oeil. */
const LogoClementine = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="13.5" r="8" fill="#F97316" />
    <circle cx="9.5" cy="11" r="2.2" fill="#FDBA74" fillOpacity=".7" />
    <path d="M12 5.5c.6-2 2.4-3 4.6-2.8-.4 2-2.3 3.2-4.6 2.8z" fill="#16A34A" />
  </svg>
);

/** Fiche de paie : la DSN part du meme calcul. */
const LogoOpenPaye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="4.5" y="2.5" width="15" height="19" rx="2" fill="#fff" stroke="#7C3AED" strokeWidth="1.5" />
    <path d="M8 7.5h8M8 11h8M8 14.5h4.5" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="17" r="2" fill="#7C3AED" />
  </svg>
);

/* ----- Donnees ----- */

type Proof = {
  value: number;
  suffix: string;
  label: string;
  logos: (() => React.JSX.Element)[];
  partner: string;
  detail: string;
};

const PROOFS: Proof[] = [
  {
    value: 3, suffix: " min", label: "pour créer un devis",
    logos: [LogoWhatsApp], partner: "WhatsApp Business", detail: "API officielle Meta, par vocal ou écrit",
  },
  {
    value: 100, suffix: "", label: "fonctions dans un seul outil",
    logos: [LogoModules], partner: "Tout-en-un", detail: "Devis, factures, TVA, planning, trésorerie…",
  },
  {
    value: 100, suffix: " %", label: "de vos données en Europe",
    logos: [LogoMistral], partner: "Mistral AI", detail: "IA française, hébergement en France",
  },
  {
    value: 24, suffix: " h/24", label: "un agent IA décroche pour vous",
    logos: [LogoMistral, LogoWhatsApp, LogoElevenLabs],
    partner: "Mistral · WhatsApp · ElevenLabs",
    detail: "Il comprend, répond par écrit et au téléphone",
  },
];

/** Ceux qui tiennent la partie administrative, derriere l'ecran. */
const BACKOFFICE = [
  { Logo: LogoClementine, name: "Clementine", sub: "Bilan et liasse de fin d'année" },
  { Logo: LogoOpenPaye, name: "OpenPaye", sub: "Paie et DSN" },
  { Logo: LogoBridge, name: "Bridge", sub: "Banque connectée · DSP2" },
  { Logo: LogoGmail, name: "Gmail", sub: "Envoi en votre nom" },
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
      { threshold: 0.25 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="proof">
      {/* Un plateau clair, du ciel du site un ton plus dense : la section se
          lit comme un seul objet sans trancher avec le reste de la page. */}
      <div className="proof-stage">
        <div className="proof-sky" aria-hidden>
          <span className="proof-glow proof-glow-a" />
          <span className="proof-glow proof-glow-b" />
          <span className="proof-glow proof-horizon" />
        </div>

        <div className="proof-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="proof-head"
          >
            <span className="proof-eyebrow">Nos partenaires</span>
            <h2 className="proof-title">
              Chaque promesse a <span className="proof-title-accent">quelqu&apos;un derrière</span>
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
                  <span className="proof-logos">
                    {p.logos.map((Logo, k) => (
                      <span key={k} className="proof-logo"><Logo /></span>
                    ))}
                  </span>
                  <span className="proof-partner-name">{p.partner}</span>
                  <span className="proof-partner-detail">{p.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="proof-sub">Et derrière vos papiers</p>

          {/* E-facture : pas un chiffre, une habilitation. Elle a sa propre ligne. */}
          <motion.div
            className="proof-efacture"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="proof-efacture-icon"><LogoEFacture /></span>
            <p>
              <strong>E-facture via B2Brouter</strong>, plateforme agréée par l&apos;administration
              fiscale : vos factures électroniques passent par un canal approuvé par l&apos;État.
            </p>
          </motion.div>

          <div className="proof-back">
            {BACKOFFICE.map(({ Logo, name, sub }, i) => (
              <motion.div
                key={name}
                className="proof-tile"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.06 }}
              >
                <span className="proof-tile-logo"><Logo /></span>
                <span>
                  <span className="proof-tile-name">{name}</span>
                  <span className="proof-tile-sub">{sub}</span>
                </span>
              </motion.div>
            ))}
          </div>

          {/* L'entreprise pilote : le produit a ete eprouve chez elle. */}
          <motion.a
            href="https://www.propre-eclat.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="proof-field"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            <span className="proof-field-icon"><Sparkles size={20} color="#2455D6" strokeWidth={2} aria-hidden /></span>
            <span>
              <strong>Développé sur le terrain avec Propre Éclat</strong>, entreprise de nettoyage près
              de Caen dirigée par Josslyn, notre associé : paie, prestations, pointage et comptabilité
              éprouvés chaque jour.
            </span>
            <span className="proof-field-arrow" aria-hidden>→</span>
          </motion.a>

          <p className="proof-note">
            <LogoGmail />
            <span>
              Cirrion utilise votre compte Gmail pour envoyer automatiquement vos devis, factures et
              e-mails professionnels à vos clients, en votre nom.
            </span>
          </p>
        </div>
      </div>

      <style>{`
        /* Ce que le verre laisse voir : des nappes de couleur posees derriere
           le plateau. Ce sont de simples degrades — aucun flou calcule. */
        .proof {
          position: relative;
          padding: clamp(2.5rem, 6vw, 4.5rem) 6vw;
          background:
            radial-gradient(38% 46% at 18% 30%, rgba(80,140,255,0.32), rgba(80,140,255,0) 70%),
            radial-gradient(34% 42% at 84% 64%, rgba(110,96,255,0.22), rgba(110,96,255,0) 70%),
            radial-gradient(30% 36% at 60% 8%, rgba(56,189,248,0.2), rgba(56,189,248,0) 70%);
        }

        .proof-stage {
          position: relative; isolation: isolate; overflow: clip;
          max-width: 1180px; margin: 0 auto;
          border-radius: 2rem;
          padding: clamp(2.6rem, 5vw, 4rem) clamp(1.1rem, 3.4vw, 3rem) clamp(2rem, 4vw, 3rem);
          /* Verre teinte bleu, facon Apple : une teinte translucide, un liseré
             clair qui accroche la lumiere, et un reflet en haut. Le flou de
             fond (backdrop-filter) est volontairement absent : derriere, il
             n'y a que des degrades lisses, le flouter ne changerait rien a
             l'oeil et doublerait le cout de chaque image au defilement. */
          background:
            linear-gradient(160deg, rgba(150,186,255,0.34) 0%, rgba(96,140,240,0.16) 45%, rgba(170,200,255,0.26) 100%);
          border: 1px solid rgba(255,255,255,0.75);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.95),
            inset 0 -1px 0 rgba(255,255,255,0.45),
            inset 0 24px 48px -28px rgba(255,255,255,0.75),
            inset 0 -30px 60px -40px rgba(36,85,214,0.25),
            0 30px 70px -40px rgba(36,85,214,0.5);
        }

        /* Atmosphere du plateau : deux lueurs et une bande de nuages en bas.
           Tout est fixe — rien ne se recalcule au defilement. */
        .proof-sky { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
        .proof-glow { position: absolute; border-radius: 50%; }
        .proof-glow-a {
          /* Reflet speculaire : une bande de lumiere oblique en haut a gauche. */
          width: 70%; height: 55%; top: -18%; left: -12%; border-radius: 50%;
          background: radial-gradient(closest-side, rgba(255,255,255,0.7), rgba(255,255,255,0));
          transform: rotate(-12deg);
        }
        .proof-glow-b {
          width: 55%; aspect-ratio: 1; top: 10%; right: -20%;
          background: radial-gradient(closest-side, rgba(255,255,255,0.35), rgba(255,255,255,0));
        }
        /* Lueur d'horizon sous les tuiles du bas : la lumiere monte du sol
           du plateau, sans dessin de nuage (les disques empiles se voyaient). */
        .proof-horizon {
          width: 130%; height: 60%; left: -15%; bottom: -38%;
          background: radial-gradient(closest-side, rgba(36,85,214,0.16), rgba(36,85,214,0));
        }

        .proof-head { text-align: center; margin-bottom: clamp(1.8rem, 4vw, 2.6rem); }
        .proof-eyebrow {
          display: inline-block; padding: 6px 20px; border-radius: 999px;
          border: 1px solid rgba(36,85,214,0.25); background: rgba(36,85,214,0.07);
          color: #2455D6; font-size: .76rem; font-weight: 600; letter-spacing: .12em;
          text-transform: uppercase; margin-bottom: 1rem;
        }
        .proof-title {
          font-family: var(--font-nunito); font-weight: 800;
          font-size: clamp(1.7rem, 3.6vw, 2.6rem); line-height: 1.15; letter-spacing: -0.02em;
          color: var(--text); text-wrap: balance;
        }
        .proof-title-accent { color: #2455D6; }

        .proof-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; }
        .proof-card {
          container-type: inline-size;
          position: relative; display: flex; flex-direction: column;
          padding: 1.6rem 1.35rem 1.35rem;
          border-radius: 1.3rem;
          background: linear-gradient(170deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.74) 100%);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow: 0 1px 0 #FFFFFF inset, 0 18px 36px -26px rgba(36,85,214,0.45);
          transition: transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s ease;
        }
        .proof-card:hover {
          transform: translateY(-5px);
          border-color: #FFFFFF;
          box-shadow: 0 1px 0 #FFFFFF inset, 0 26px 46px -22px rgba(36,85,214,0.55);
        }
        /* La taille suit la largeur de la carte : « 24 h/24 » ne deborde plus. */
        .proof-value {
          font-family: var(--font-nunito); font-weight: 800;
          font-size: clamp(2rem, 21cqi, 3.2rem); line-height: 1; letter-spacing: -0.035em;
          font-variant-numeric: tabular-nums; white-space: nowrap;
          background: linear-gradient(120deg, #16264A 0%, #2455D6 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
        }
        /* Deux lignes reservees : les separateurs tombent a la meme hauteur
           sur les quatre cartes. */
        .proof-label {
          min-height: 2.7em;
          margin: .55rem 0 1.3rem; font-size: .88rem; font-weight: 600;
          color: rgba(var(--text-rgb),0.62); line-height: 1.35;
        }
        .proof-partner {
          padding-top: 1rem;
          display: flex; flex-direction: column; gap: .15rem;
          border-top: 1px solid rgba(36,85,214,0.1);
        }
        .proof-logos { display: flex; margin-bottom: .55rem; }
        .proof-logo {
          width: 36px; height: 36px; border-radius: 11px;
          display: grid; place-items: center;
          background: #FFFFFF; border: 1px solid rgba(36,85,214,0.14);
          box-shadow: 0 4px 10px -6px rgba(27,42,74,0.35);
        }
        .proof-logo + .proof-logo { margin-left: -8px; }
        .proof-partner-name { font-size: .8rem; font-weight: 700; color: var(--text); line-height: 1.3; }
        .proof-partner-detail { font-size: .72rem; color: rgba(var(--text-rgb),0.52); line-height: 1.4; }

        .proof-sub {
          margin: clamp(1.8rem, 4vw, 2.4rem) 0 .9rem; text-align: center;
          font-size: .72rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
          color: rgba(var(--text-rgb),0.42);
        }

        .proof-efacture {
          display: flex; align-items: center; gap: .9rem;
          padding: .95rem 1.2rem; border-radius: 1.1rem;
          background: linear-gradient(100deg, rgba(220,252,231,0.75), rgba(255,255,255,0.6));
          border: 1px solid rgba(255,255,255,0.85);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .proof-efacture-icon {
          flex-shrink: 0; width: 42px; height: 42px; border-radius: 12px;
          display: grid; place-items: center; background: #FFFFFF; border: 1px solid rgba(22,163,74,0.22);
        }
        .proof-efacture p { font-size: .88rem; line-height: 1.5; color: rgba(var(--text-rgb),0.7); }
        .proof-efacture strong { color: #15803D; font-weight: 800; }

        .proof-back {
          margin-top: .75rem;
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .75rem;
        }
        .proof-tile {
          display: flex; align-items: center; gap: .7rem;
          padding: .8rem .95rem; border-radius: 1rem;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);
          transition: background .25s ease, border-color .25s ease;
        }
        .proof-tile:hover { background: #FFFFFF; border-color: rgba(36,85,214,0.22); }
        .proof-tile-logo {
          flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px;
          display: grid; place-items: center; background: #FFFFFF;
        }
        .proof-tile-name { display: block; font-size: .82rem; font-weight: 700; color: var(--text); line-height: 1.25; }
        .proof-tile-sub { display: block; font-size: .7rem; color: rgba(var(--text-rgb),0.5); line-height: 1.35; }

        .proof-field {
          margin-top: .75rem;
          display: flex; align-items: center; gap: .9rem;
          padding: .95rem 1.2rem; border-radius: 1.1rem;
          background: rgba(255,255,255,0.82); text-decoration: none;
          border: 1px solid rgba(255,255,255,0.9); border-left: 3px solid #2455D6;
          box-shadow: 0 14px 30px -24px rgba(27,42,74,0.35);
          transition: transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s ease;
        }
        .proof-field:hover { transform: translateY(-2px); box-shadow: 0 20px 36px -22px rgba(36,85,214,0.4); }
        .proof-field-icon {
          flex-shrink: 0; width: 42px; height: 42px; border-radius: 12px;
          display: grid; place-items: center; background: rgba(36,85,214,0.08);
        }
        .proof-field > span:nth-child(2) { font-size: .88rem; line-height: 1.5; color: rgba(var(--text-rgb),0.72); }
        .proof-field strong { color: var(--text); font-weight: 800; }
        .proof-field-arrow { margin-left: auto; color: #2455D6; font-weight: 800; transition: transform .25s ease; }
        .proof-field:hover .proof-field-arrow { transform: translateX(3px); }

        .proof-note {
          margin: 1.5rem auto 0; max-width: 40rem;
          display: flex; align-items: flex-start; justify-content: center; gap: .5rem;
          font-size: .74rem; line-height: 1.55; color: rgba(var(--text-rgb),0.48);
        }
        .proof-note svg { flex-shrink: 0; margin-top: 1px; width: 15px; height: 15px; }

        @media (max-width: 980px) {
          .proof-grid, .proof-back { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 520px) {
          .proof { padding-inline: 16px; }
          .proof-stage { border-radius: 1.5rem; }
          .proof-grid, .proof-back { grid-template-columns: 1fr; }
          .proof-efacture, .proof-field { align-items: flex-start; }
          .proof-field-arrow { display: none; }
        }
        @media (hover: none) { .proof-card:hover { transform: none; } }
        @media (prefers-reduced-motion: reduce) {
          .proof-card, .proof-tile, .proof-field { transition: none; }
          .proof-card:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}
