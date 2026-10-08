"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Mic, PenLine, CalendarClock, Receipt, Landmark, TrendingUp, LucideIcon } from "lucide-react";
import { STORY_FRAMES } from "@/components/ui/storyFrames";
import { cloudBand, cloudRow } from "@/components/ui/cloudArt";

// Rasterise une fois au chargement : au defilement il ne reste qu'une image de
// fond a composer, jamais un filtre a recalculer.
const BAND = cloudBand("light");
const ROW = cloudRow();

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
    desc: "Un vocal sur WhatsApp depuis le camion, ou quelques touches sur l'application. Le devis se rédige avec vos prix et la bonne TVA sur chaque ligne.",
  },
  {
    icon: PenLine,
    tag: "Étape 2",
    title: "Votre client signe sur son téléphone",
    desc: "Il reçoit le devis par e-mail ou SMS et le signe du doigt, sans imprimante ni rendez-vous. La date et l'heure de signature sont gardées.",
  },
  {
    icon: CalendarClock,
    tag: "Étape 3",
    title: "Le chantier se planifie tout seul",
    desc: "Vous donnez la date de début : le planning se remplit, vous placez vos gars sur le chantier et le stock baisse tout seul.",
  },
  {
    icon: Receipt,
    tag: "Étape 4",
    title: "Acompte, PV de réception, facture finale",
    desc: "Les documents s'enchaînent et se rangent tout seuls, dans le format de la facture électronique. Les impayés sont relancés sans que vous écriviez un mot.",
  },
  {
    icon: Landmark,
    tag: "Étape 5",
    title: "TVA, charges et paie préparées",
    desc: "La TVA est calculée au fil de l'eau, la déclaration est déjà remplie, et la paie et les charges se préparent à partir des heures pointées et de vos factures.",
  },
  {
    icon: TrendingUp,
    tag: "Étape 6",
    title: "Tout est déclaré, vous encaissez",
    desc: "La TVA part aux impôts, la déclaration de paie est déposée, et le bilan de fin d'année est signé par notre cabinet comptable partenaire. Plus de comptable à relancer : vous voyez votre argent en temps réel.",
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

  // Le fond monte avec la traversee : le ciel se charge de bleu au fil des
  // etapes puis s'eclaircit a l'arrivee, et un halo suit la pile. Tout est
  // tire du defilement, rien ne tourne en boucle.
  const skyDepth = useTransform(scrollYProgress, [0, 0.45, 1], [0, 0.85, 0.35]);
  const haloY = useTransform(scrollYProgress, [0, 1], ["18%", "-14%"]);
  const haloScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.12, 0.95]);
  // Deux bandes de nuages a des vitesses differentes : c'est l'ecart entre les
  // deux qui fait la profondeur. La bande proche grossit en plus de glisser,
  // comme si on la traversait.
  const farX = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const farY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const nearX = useTransform(scrollYProgress, [0, 1], ["12%", "-14%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["-8%", "14%"]);
  const nearScale = useTransform(scrollYProgress, [0, 1], [1, 1.24]);

  return (
    <section
      id="comment-ca-marche"
      style={{ position: "relative", padding: "clamp(3.5rem,8vw,6rem) 0 clamp(2rem,5vw,4rem)" }}
    >
      {/* Le ciel de la section, pilote par le defilement */}
      <div
        className="story-ambience"
        aria-hidden
        style={{ ["--band" as string]: BAND, ["--row" as string]: ROW }}
      >
        <motion.div className="story-sky" style={{ opacity: skyDepth }} />
        <motion.div
          className="story-band story-band-far"
          style={{ x: farX, y: farY }}
        />
        <motion.div className="story-halo" style={{ y: haloY, scale: haloScale }} />
        <motion.div
          className="story-band story-band-near"
          style={{ x: nearX, y: nearY, scale: nearScale }}
        />
        {/* Ciel mobile : deux calques fixes, sans aucune transformation.
            Les deux calques du dessus sont deplaces et agrandis par le
            defilement ; etendus a toute la hauteur de la section, leurs bords
            entrent dans l'ecran et la tuile s'arrete net — c'est ce qui
            dessinait une ligne en travers de la page. Ceux-ci ne bougent pas,
            donc ils n'ont pas de bord a montrer. */}
        <span className="story-band story-band-mid story-band-mid-a" />
        <span className="story-band story-band-mid story-band-mid-b" />
      </div>

      <div style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 6vw", position: "relative", zIndex: 1 }}>

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

          {/* Panneau colle : la pile change, le cadre reste */}
          <div className="story-panel-col">
            <div className="story-panel">
              <motion.span className="story-cloud story-cloud-a" style={{ x: driftA }} aria-hidden />
              <motion.span className="story-cloud story-cloud-b" style={{ x: driftB }} aria-hidden />

              {/* La pile : l'etape lue est devant et droite, les precedentes
                  reculent et s'inclinent derriere, la suivante attend en bas.
                  Quatre calques au plus restent composes — au-dela on ne voit
                  plus rien et chaque calque coute. */}
              <div className="story-deck">
                {STORY_FRAMES.map((Frame, i) => {
                  const d = active - i;
                  const future = d < 0;
                  const visible = d >= 0 && d <= 2;
                  return (
                    <div
                      key={i}
                      className="story-win"
                      aria-hidden={i !== active}
                      style={{
                        zIndex: 10 - Math.max(d, 0),
                        opacity: visible ? 1 - d * 0.34 : 0,
                        transform: future
                          ? "translate3d(0, 20%, -40px) rotateX(16deg) scale(.95)"
                          : `translate3d(0, ${-d * 12}%, ${-d * 52}px) rotateX(${d === 0 ? 6 : 15}deg) scale(${1 - d * 0.028})`,
                      }}
                    >
                      <div className="story-win-bar">
                        <span className="story-win-dot" />
                        <span className="story-win-dot" />
                        <span className="story-win-dot" />
                        <span className="story-win-name">{STEPS[i].tag} — Cirrion</span>
                      </div>
                      <div className="story-win-body">
                        <Frame />
                      </div>
                    </div>
                  );
                })}
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
        /* --- Le ciel de la section --- */
        .story-ambience {
          position: absolute; inset: -6% 0 -4%;
          pointer-events: none; z-index: 0; overflow: hidden;
        }
        .story-sky {
          position: absolute; inset: 0;
          background: linear-gradient(180deg,
            rgba(214,228,249,0) 0%,
            rgba(168,199,243,0.68) 26%,
            rgba(120,167,232,0.72) 52%,
            rgba(170,201,244,0.42) 78%,
            rgba(222,234,252,0) 100%);
          /* Sur mobile ce voile est fige a 1 (voir plus bas) : c'est lui qui
             donne aux nuages blancs de quoi se detacher. */
          will-change: opacity;
        }
        /* Le halo suit la pile : c'est lui qui donne l'impression de traverser
           une couche lumineuse plutot que de defiler devant un aplat. */
        .story-halo {
          position: absolute;
          right: -4%; top: 22%;
          width: 58%; aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(closest-side,
            rgba(255,255,255,0.92) 0%,
            rgba(214,231,252,0.5) 48%,
            rgba(214,231,252,0) 100%);
          will-change: transform;
        }
        /* De vrais volumes nuageux, et non des taches floues : des disques
           fondus remplis d'un degrade vertical, lumiere au-dessus et ombre
           bleutee dessous. Le navigateur les rasterise une fois, puis il n'y a
           plus qu'une image de fond a deplacer. */
        .story-band {
          position: absolute;
          left: -18%; right: -18%;
          background-image: var(--band);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          will-change: transform;
          backface-visibility: hidden;
          /* La bande est une boite : sans ce fondu, son bord bas tranche net
             en travers de la page. Le masque est rasterise avec le calque, il
             n'est pas recalcule au defilement. */
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 20%, #000 68%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, #000 20%, #000 68%, transparent 100%);
        }
        .story-band-far { top: 0; height: 46%; opacity: .42; }
        .story-band-mid { display: none; }
        .story-band-near { bottom: -10%; height: 58%; opacity: .78; transform-origin: 50% 100%; }

        .story-stage {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
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
        /* Le panneau fait une hauteur d'ecran et centre son contenu : la pile
           est au milieu du regard sans qu'aucun transform ne la fasse sortir
           de la scene. Un translateY(-50%) la faisait deborder par le haut et
           recouvrir le titre de la section.
           Et plus de boite : les fenetres flottent sur le ciel de la page, ce
           qui est tout l'effet recherche. */
        .story-panel {
          position: sticky;
          top: 4.5rem;
          height: calc(100vh - 7rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Deux voiles nuageux tires du defilement : la traversee, sans boucle. */
        .story-cloud {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: radial-gradient(closest-side, rgba(255,255,255,0.95), rgba(255,255,255,0));
          will-change: transform;
        }
        .story-cloud-a { width: 88%; aspect-ratio: 1; left: -18%; top: -6%; z-index: 0; }
        .story-cloud-b { width: 72%; aspect-ratio: 1; right: -16%; bottom: 2%; z-index: 0;
          background: radial-gradient(closest-side, rgba(36,85,214,0.14), rgba(36,85,214,0)); }

        /* --- La pile en perspective --- */
        .story-deck {
          position: relative;
          aspect-ratio: 1;
          max-height: 62vh;
          width: 100%;
          max-width: 62vh;
          margin-inline: auto;
          /* Les fenetres passees remontent : sans cette marge, le panneau les
             rogne et la pile ne se voit plus. */
          perspective: 1000px;
          perspective-origin: 50% 36%;
          transform-style: preserve-3d;
        }
        .story-win {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          border-radius: 1rem;
          overflow: hidden;
          background: #FFFFFF;
          border: 1px solid rgba(27,42,74,0.1);
          box-shadow: 0 30px 60px -28px rgba(27,42,74,0.4);
          transform-origin: 50% 100%;
          transition: transform .62s cubic-bezier(.22,.68,.26,1), opacity .45s ease;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        /* Barre de fenetre : ce qui fait lire le dessin comme un ecran. */
        .story-win-bar {
          display: flex; align-items: center; gap: .32rem;
          padding: .55rem .8rem;
          background: #F3F6FC;
          border-bottom: 1px solid rgba(27,42,74,0.07);
          flex-shrink: 0;
        }
        .story-win-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(27,42,74,0.14);
        }
        .story-win-dot:first-child { background: rgba(245,84,79,0.5); }
        .story-win-dot:nth-child(2) { background: rgba(245,184,79,0.55); }
        .story-win-dot:nth-child(3) { background: rgba(54,194,122,0.5); }
        .story-win-name {
          margin-left: .55rem;
          font-size: .66rem; font-weight: 700; letter-spacing: .05em;
          color: rgba(27,42,74,0.35); text-transform: uppercase;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .story-win-body { flex: 1; min-height: 0; padding: .5rem; }
        .story-win-body > svg { display: block; width: 100%; height: 100%; }

        .story-panel-foot {
          position: relative; z-index: 20;
          display: flex; align-items: baseline; gap: .7rem;
          margin-top: 1.6rem; padding-top: .9rem;
          border-top: 1px solid rgba(36,85,214,0.14);
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

        /* Sur un ecran etroit, une bande haute de 46% de la section devient
           etroite et longue : les volumes s'etirent en trainees verticales.
           On la raccourcit en pixels et on la fait deborder en largeur, comme
           le bandeau d'appel a l'action — c'est une bande courte et large qui
           garde des nuages ronds. */
        @media (max-width: 900px) {
          /* Un ciel continu plutot que deux bandes aux extremites : sur un
             telephone la section fait plusieurs milliers de pixels, et une
             bande posee en haut ne se voit plus des le deuxieme ecran.
             Deux couches qui se repetent a des hauteurs differentes — 230 et
             310 px — ne se realignent qu'au bout de 7 000 px : le motif ne se
             lit jamais. */
          /* Une bande en entrant dans la section, une en sortant, et rien
             entre les deux : c'est la recette du bandeau d'appel a l'action,
             la seule qui tienne sur un telephone. Un motif repete sur des
             milliers de pixels fait un papier peint, pas un ciel.
             Ce sont les calques fixes qui les portent : les deux autres sont
             deplaces par le defilement et montreraient leur bord. */
          .story-band-far, .story-band-near { display: none; }
          .story-band-mid {
            display: block;
            background-repeat: no-repeat;
          }
          /* Hauteurs calees sur le rapport de forme du dessin a cette largeur :
             une bande plus plate ecraserait les volumes. */
          .story-band-mid-a {
            top: 0; height: 320px;
            background-size: 150% 100%; background-position: 0% 0%;
            opacity: .85;
          }
          .story-band-mid-b {
            top: auto; bottom: 0; height: 265px;
            background-size: 125% 100%; background-position: 100% 0%;
            opacity: .7;
          }

          .story-stage { grid-template-columns: 1fr; }
          .story-panel-col { display: none; }
          .story-steps { padding-left: 2.3rem; }
          .story-dot { left: -2.3rem; }
          .story-step-body { opacity: 1; transform: none; }
          .story-frame-inline {
            display: block;
            margin-top: 1.1rem;
            border-radius: 1rem;
            border: 1px solid rgba(27,42,74,0.1);
            background: #FFFFFF;
            box-shadow: 0 14px 30px -22px rgba(27,42,74,0.4);
            overflow: hidden;
            max-width: 22rem;
          }
          /* Meme barre de fenetre que sur la pile : un seul langage visuel. */
          .story-frame-inline::before {
            content: "";
            display: block;
            height: 26px;
            background:
              radial-gradient(circle at 16px 13px, rgba(245,84,79,.5) 4px, transparent 4.5px),
              radial-gradient(circle at 32px 13px, rgba(245,184,79,.55) 4px, transparent 4.5px),
              radial-gradient(circle at 48px 13px, rgba(54,194,122,.5) 4px, transparent 4.5px),
              #F3F6FC;
            border-bottom: 1px solid rgba(27,42,74,0.07);
          }
          .story-frame-inline > svg { display: block; width: 100%; padding: .6rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .story-dot, .story-step-body, .story-win { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
