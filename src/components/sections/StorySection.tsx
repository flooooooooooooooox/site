"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Mic, PenLine, CalendarClock, Receipt, Landmark, TrendingUp, LucideIcon } from "lucide-react";
import { STORY_FRAMES } from "@/components/ui/storyFrames";

interface Step {
  icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
}

// La chaine complete, du devis dicte aux declarations : chaque etape est
// declenchee par la precedente, l'artisan n'intervient qu'a la premiere.
const STEPS: Step[] = [
  {
    icon: Mic,
    tag: "Étape 1",
    title: "Le devis part de votre voix",
    desc: "Un vocal sur WhatsApp depuis le camion, ou quelques touches dans l'application Cirrion. Le devis se rédige à partir de votre catalogue de prix, avec la bonne TVA par ligne.",
  },
  {
    icon: PenLine,
    tag: "Étape 2",
    title: "Votre client signe sur son téléphone",
    desc: "Il reçoit le devis par e-mail ou SMS et le signe électroniquement, sans imprimante ni rendez-vous. La signature est horodatée et archivée.",
  },
  {
    icon: CalendarClock,
    tag: "Étape 3",
    title: "Le chantier se planifie tout seul",
    desc: "Vous indiquez la date de début : le planning se remplit, les horaires se posent, vous affectez vos salariés et le stock est décompté automatiquement.",
  },
  {
    icon: Receipt,
    tag: "Étape 4",
    title: "Acompte, PV de réception, facture finale",
    desc: "Les documents s'enchaînent et se classent seuls, au format Factur-X conforme 2026. Les impayés sont relancés sans que vous ayez à écrire quoi que ce soit.",
  },
  {
    icon: Landmark,
    tag: "Étape 5",
    title: "TVA, URSSAF et DSN préparées",
    desc: "TVA collectée et déductible calculées en continu, CA3 pré-remplie, cotisations et déclarations sociales préparées à partir des heures pointées et des factures émises.",
  },
  {
    icon: TrendingUp,
    tag: "Étape 6",
    title: "Tout est déclaré, vous encaissez",
    desc: "TVA télétransmise à la DGFiP, DSN déposée, bilan et liasse préparés puis signés par notre cabinet partenaire en fin d'exercice. Vous n'avez plus de comptable à relancer : vous suivez votre trésorerie en temps réel.",
  },
];

/**
 * La chaine, montree plutot que racontee.
 *
 * Six cartes identiques empilees se lisaient comme une notice : tout etait
 * visible d'un coup et rien ne se transformait. Ici le panneau de droite reste
 * a l'ecran et change de vue a chaque etape, pendant que l'etape lue s'allume
 * et que les autres s'effacent — on voit la machine tourner au lieu de lire
 * qu'elle tourne.
 *
 * Cout : le fondu entre deux vues est une opacity sur un calque promu, les
 * etapes ne bougent qu'en transform, et la derive des nuages est tiree du
 * defilement au lieu de tourner en boucle. Rien ne s'anime a l'arret.
 *
 * Sur mobile il n'y a pas de panneau collant : chaque etape porte sa propre
 * vue, au-dessus de son texte.
 */
export default function StorySection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start 65%", "end 85%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    setActive((prev) => (prev === i ? prev : i));
  });

  // La traversee : les nuages du panneau derivent avec le defilement, ils ne
  // tournent pas en boucle. Hors ecran, plus rien ne bouge.
  const driftA = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const driftB = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="comment-ca-marche"
      style={{ position: "relative", padding: "clamp(3.5rem,8vw,6rem) 0 clamp(2rem,5vw,4rem)" }}
    >
      <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 6vw" }}>

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3.5rem)" }}
        >
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: "999px",
            border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)",
            color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
            textTransform: "uppercase", marginBottom: "1.2rem",
          }}>
            Comment ça marche
          </span>
          <h2 style={{
            fontFamily: "var(--font-nunito)", fontWeight: 900,
            fontSize: "clamp(1.9rem,4vw,2.8rem)", color: "var(--text)", lineHeight: 1.15,
          }}>
            Du devis dicté à la TVA déclarée
          </h2>
          <p style={{
            color: "rgba(var(--text-rgb),0.58)", fontSize: "1rem",
            maxWidth: "32rem", margin: "0.9rem auto 0", lineHeight: 1.55,
          }}>
            Vous n&apos;intervenez qu&apos;à la première étape. Le reste s&apos;enchaîne tout seul.
          </p>
        </motion.div>

        {/* Scene : les etapes a gauche, la vue qui change a droite */}
        <div ref={stageRef} className="story-stage">

          {/* Colonne des etapes */}
          <div className="story-steps">
            {/* Le fil et sa progression */}
            <div className="story-rail" aria-hidden>
              <div className="story-rail-track" />
              <motion.div className="story-rail-fill" style={{ height: lineHeight }} />
            </div>

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const Frame = STORY_FRAMES[i];
              const on = i === active;
              return (
                <div key={i} className={`story-step${on ? " is-on" : ""}`}>
                  <span className="story-dot" aria-hidden>{i + 1}</span>

                  <div className="story-step-body">
                    <span className="story-tag">
                      <Icon size={13} strokeWidth={2} aria-hidden />
                      {step.tag}
                    </span>
                    <h3 className="story-title">{step.title}</h3>
                    <p className="story-desc">{step.desc}</p>

                    {/* Sur mobile, chaque etape porte sa propre vue */}
                    <div className="story-frame-inline" aria-hidden={false}>
                      <Frame />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panneau colle : la vue change, le cadre reste */}
          <div className="story-panel-col">
            <div className="story-panel">
              <motion.span className="story-cloud story-cloud-a" style={{ x: driftA }} aria-hidden />
              <motion.span className="story-cloud story-cloud-b" style={{ x: driftB }} aria-hidden />

              <div className="story-frames">
                {STORY_FRAMES.map((Frame, i) => (
                  <div key={i} className={`story-frame${i === active ? " is-on" : ""}`}>
                    <Frame />
                  </div>
                ))}
              </div>

              <div className="story-panel-foot">
                <span className="story-panel-count">
                  {String(active + 1).padStart(2, "0")} <span>/ 06</span>
                </span>
                <span className="story-panel-label">{STEPS[active].title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .story-stage {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(2rem, 5vw, 4rem);
          /* Pas de align-items: start — la colonne de droite doit faire toute
             la hauteur de la rangee, sinon le panneau colle n'a aucune course
             et sort de l'ecran des la premiere etape. */
        }

        /* --- Les etapes --- */
        .story-steps { position: relative; padding-left: 2.6rem; }
        .story-rail { position: absolute; left: 13px; top: 18px; bottom: 18px; width: 2px; }
        .story-rail-track { position: absolute; inset: 0; background: rgba(36,85,214,0.14); border-radius: 2px; }
        .story-rail-fill {
          position: absolute; left: 0; top: 0; width: 100%;
          background: linear-gradient(180deg, #2455D6, #6C7CFF);
          border-radius: 2px;
        }

        .story-step { position: relative; padding: 1.1rem 0 2.6rem; }
        .story-step:last-child { padding-bottom: 0; }

        .story-dot {
          position: absolute; left: -2.6rem; top: 1.25rem;
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: .78rem; font-weight: 800; font-family: var(--font-nunito);
          color: rgba(27,42,74,0.4);
          background: #EEF3FD;
          border: 2px solid rgba(36,85,214,0.18);
          transition: background .35s ease, color .35s ease, border-color .35s ease, transform .35s cubic-bezier(.2,.7,.3,1);
          will-change: transform;
        }
        .story-step.is-on .story-dot {
          background: #2455D6; color: #FFFFFF;
          border-color: rgba(36,85,214,0.3);
          transform: scale(1.14);
        }

        /* Les etapes non lues s'effacent : une seule chose a lire a la fois. */
        .story-step-body {
          opacity: .38;
          transform: translateX(-4px);
          transition: opacity .4s ease, transform .4s cubic-bezier(.2,.7,.3,1);
          will-change: opacity, transform;
        }
        .story-step.is-on .story-step-body { opacity: 1; transform: none; }

        .story-tag {
          display: inline-flex; align-items: center; gap: .4rem;
          font-size: .72rem; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
          color: rgba(36,85,214,0.8);
          background: rgba(36,85,214,0.07);
          border: 1px solid rgba(36,85,214,0.16);
          border-radius: 100px; padding: .22rem .7rem; margin-bottom: .65rem;
        }
        .story-title {
          font-family: var(--font-nunito); font-weight: 800;
          font-size: clamp(1.1rem, 2.2vw, 1.3rem); color: var(--text);
          line-height: 1.3; margin-bottom: .5rem;
        }
        .story-desc { color: rgba(var(--text-rgb),0.6); font-size: .93rem; line-height: 1.65; }

        /* --- Le panneau colle --- */
        /* Le collant porte sur le panneau, pas sur la colonne : une colonne
           etiree a la hauteur de la rangee est deja immobile. */
        .story-panel {
          position: sticky;
          top: 6.5rem;
          border-radius: 1.6rem;
          background: linear-gradient(165deg, #FFFFFF 0%, #F7FAFF 55%, #EFF4FE 100%);
          border: 1px solid rgba(36,85,214,0.16);
          box-shadow: 0 18px 40px -28px rgba(36,85,214,0.5);
          padding: clamp(1.2rem, 3vw, 2rem);
          overflow: hidden;
        }

        /* Deux voiles nuageux tires du defilement : la traversee, sans boucle. */
        .story-cloud {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,255,255,0));
          will-change: transform;
        }
        .story-cloud-a { width: 70%; aspect-ratio: 1; left: -14%; top: -12%; }
        .story-cloud-b { width: 58%; aspect-ratio: 1; right: -12%; bottom: -8%;
          background: radial-gradient(closest-side, rgba(36,85,214,0.12), rgba(36,85,214,0)); }

        .story-frames { position: relative; aspect-ratio: 1; }
        .story-frame {
          position: absolute; inset: 0;
          opacity: 0;
          transform: scale(.965);
          transition: opacity .45s ease, transform .55s cubic-bezier(.2,.7,.3,1);
          will-change: opacity, transform;
          backface-visibility: hidden;
        }
        .story-frame.is-on { opacity: 1; transform: none; }

        .story-panel-foot {
          position: relative;
          display: flex; align-items: baseline; gap: .7rem;
          margin-top: .6rem; padding-top: .9rem;
          border-top: 1px solid rgba(36,85,214,0.12);
        }
        .story-panel-count {
          font-family: var(--font-nunito); font-weight: 900; font-size: 1.1rem;
          color: #2455D6; letter-spacing: -.02em;
        }
        .story-panel-count span { color: rgba(27,42,74,0.3); font-size: .8rem; font-weight: 700; }
        .story-panel-label {
          color: rgba(var(--text-rgb),0.55); font-size: .84rem; font-weight: 600;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        /* La vue inline n'existe que sur mobile. */
        .story-frame-inline { display: none; }

        @media (max-width: 900px) {
          .story-stage { grid-template-columns: 1fr; }
          .story-panel-col { display: none; }
          .story-steps { padding-left: 2.3rem; }
          .story-dot { left: -2.3rem; }
          .story-step-body { opacity: 1; transform: none; }
          .story-frame-inline {
            display: block;
            margin-top: 1.1rem;
            border-radius: 1.1rem;
            border: 1px solid rgba(36,85,214,0.16);
            background: linear-gradient(165deg, #FFFFFF 0%, #F7FAFF 60%, #EFF4FE 100%);
            padding: .8rem;
            max-width: 22rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .story-dot, .story-step-body, .story-frame { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
