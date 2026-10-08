"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText, Landmark, MapPin, Monitor, Bell, Sparkles, PhoneIncoming,
  Mic, Receipt, TrendingUp, Tags, GraduationCap, Star, Shield, LucideIcon,
} from "lucide-react";
import { FrameVocal, FrameDeclarations, FramePlanning } from "@/components/ui/storyFrames";
import { cloudBand, cloudRow } from "@/components/ui/cloudArt";

const BAND = cloudBand("light");
const ROW = cloudRow();

/**
 * Les fonctionnalites en bento.
 *
 * Avant : quatorze pastilles identiques sur deux rangees reliees par des
 * traits, puis deux colonnes de douze puces. Un schema technique suivi d'un
 * cahier des charges — tout au meme poids, donc rien ne ressortait.
 *
 * Ici les tailles font la hierarchie. Trois tuiles larges en bleu profond
 * portent les trois promesses qu'aucun concurrent ne tient — la voix a
 * l'entree, l'administratif a la sortie, la preuve du travail — et les autres
 * suivent, plus discretes.
 *
 * Rien n'est perdu : chaque tuile montre ses quatre points principaux et
 * deplie le reste a la demande. Les quatorze modules et leurs cent fonctions
 * sont tous la, mais la page reste lisible tant qu'on n'a pas demande le
 * detail.
 */

type Tile = {
  icon: LucideIcon;
  title: string;
  lead: string;
  items: string[];
  /** Colonnes occupees sur la grille de quatre. */
  c?: number;
  /** Les trois promesses : fond bleu profond, texte blanc, et un visuel. */
  hero?: boolean;
  art?: () => React.JSX.Element;
};

const TILES: Tile[] = [
  {
    icon: FileText,
    title: "Vous dictez, c'est écrit",
    art: FrameVocal,
    lead: "Facturez en 3 minutes, sans jamais ressaisir.",
    c: 2, hero: true,
    items: [
      "Devis PDF par vocal ou écrit sur WhatsApp, en 3 min",
      "Devis depuis l'application sur ordinateur, avec vos modèles",
      "Le client signe sur son téléphone (la signature a valeur légale)",
      "Prêt pour la facture électronique obligatoire (2026-2027)",
      "PV de réception et facture finale qui se font tout seuls",
      "Factures d'acompte, de situation, finale : toutes les factures",
      "Factures qui reviennent chaque mois, sans y penser",
      "Avenants et avoirs faits en deux clics",
      "Vos prix enregistrés une fois, réutilisés à chaque devis",
      "TVA 5,5 % / 10 % / 20 % au choix par ligne",
      "Numéros de devis et de factures posés pour vous",
      "Clients, documents et signatures classés tout seuls",
    ],
  },
  {
    icon: Landmark,
    title: "Vous ne touchez plus à l'administratif",
    art: FrameDeclarations,
    lead: "Une photo suffit. Tout est traité, déclaré et déposé pour vous.",
    c: 2, hero: true,
    items: [
      "Déclaration de TVA faite, puis envoyée aux impôts",
      "Fiches de paie et déclaration sociale du mois, faites avec OpenPaye",
      "Bilan de fin d'année signé par notre cabinet comptable partenaire",
      "Le bilan est lissé sur l'année : pas de grosse facture à la fin",
      "Vous photographiez vos tickets et factures fournisseurs sur WhatsApp",
      "Fournisseur, articles, montants et TVA lus automatiquement sur la photo",
      "La TVA que vous devez payer, calculée chaque mois ou trimestre",
      "TVA que vous encaissez et TVA que vous récupérez, ligne par ligne",
      "Tableau de bord de vos dépenses et de la TVA à récupérer",
    ],
  },
  {
    icon: MapPin,
    title: "Vous prouvez chaque intervention",
    art: FramePlanning,
    lead: "Les autres pointent des heures. Vous prouvez le travail.",
    c: 2, hero: true,
    items: [
      "Vos salariés pointent avec un QR code ou un code à 8 chiffres, sur chaque site",
      "Le pointage ne passe que s'ils sont bien sur le lieu du chantier",
      "Photos prises sur place obligatoires : impossible d'envoyer une ancienne photo",
      "Impossible de clôturer tant que le travail n'est pas terminé",
      "Liste des tâches à faire, adaptée à chaque chantier",
      "Chrono par tâche, lancé par le salarié",
      "Temps comparés d'un salarié à l'autre",
      "La photo coche la tâche, le salarié n'a qu'à valider",
      "Photos rangées toutes seules : par client, par prestation",
      "Un problème sur place ? Photo et commentaire en quelques secondes",
      "Vous êtes prévenu si un salarié est en retard ou n'a pas commencé",
      "Le client suit l'avancement et voit les photos, sans vous appeler",
      "Compte rendu d'intervention à consulter ou à télécharger",
      "Vos sous-traitants ne voient que leurs chantiers",
      "Contrat de travail signé sur téléphone par le salarié",
      "Avenants et attestations signés de la même façon, et classés",
    ],
  },
  {
    icon: Monitor,
    title: "Chantiers, équipes et heures",
    lead: "Chantiers, équipes et heures : tout suivi sur un seul écran.",
    items: [
      "Un seul écran : devis, factures, chantiers, planning",
      "Plusieurs chantiers suivis en même temps",
      "Équipes et plannings à jour en temps réel",
      "Heures des salariés : pointage et feuilles d'heures",
      "Suivi des heures par salarié et par chantier",
      "Heures supplémentaires calculées et récapitulatif de fin de mois",
      "Autant d'utilisateurs que vous voulez",
      "Photos de fin de chantier envoyées par WhatsApp, rangées au bon endroit",
      "Fiche de chaque client avec tout son historique",
      "Tableau de bord : dépenses et chiffre d'affaires mois par mois",
    ],
  },
  {
    icon: Bell,
    title: "Relances & Suivi",
    lead: "Plus aucun devis oublié, plus aucune facture impayée.",
    items: [
      "Devis non signé ? Relances automatiques à 3, 7 et 14 jours",
      "Facture impayée ? Relancée toute seule",
      "Rappel de la garantie un an après la fin du chantier",
      "Vous êtes prévenu dès qu'un devis est signé",
      "Relances aussi pour les avenants et avoirs à signer",
      "Un souci sur un chantier : un vocal de 30 secondes, et l'e-mail part",
      "Point de la semaine : chiffre d'affaires, chantiers, devis signés",
      "Factures envoyées à la bonne date, sans y penser",
    ],
  },
  {
    icon: Sparkles,
    title: "Copilote Cirrion",
    lead: "Posez votre question, il lit vos chiffres et répond.",
    items: [
      "« Combien j'ai d'impayés ? » — montant, clients, retards",
      "« Ma trésorerie sur 30 jours ? » — échéance par échéance",
      "« Quel taux de TVA pour cette rénovation ? » — avec l'article du CGI",
      "« Je peux embaucher à 2 000 € net ? » — coût employeur chargé",
      "Il lit vos chiffres sans jamais rien modifier",
      "Ses réponses s'appuient sur vos vrais devis, factures et dépenses",
    ],
  },
  {
    icon: PhoneIncoming,
    title: "Une secrétaire qui décroche",
    lead: "Une standardiste qui décroche à votre place, 24 h/24.",
    items: [
      "Une secrétaire virtuelle sur WhatsApp et au téléphone, jour et nuit",
      "Elle trie les demandes : urgence, devis, simple question",
      "Les rendez-vous se placent seuls dans votre agenda",
      "Les créneaux tiennent compte des distances entre chantiers",
      "Elle vous passe la main quand c'est important",
    ],
  },
  {
    icon: Mic,
    title: "Vous parlez, il rédige",
    lead: "Vous dictez, l'IA écrit. Vos mains restent sur le chantier.",
    items: [
      "Vous parlez, c'est écrit, tout de suite",
      "E-mail professionnel rédigé à partir d'un vocal de 30 secondes",
      "Rapport de chantier envoyé par e-mail au client",
    ],
  },
  {
    icon: Receipt,
    title: "Argent et banque",
    lead: "Les paiements se cochent seuls, les relances s'arrêtent.",
    items: [
      "Votre banque connectée en toute sécurité (via Bridge)",
      "Les paiements reçus sont repérés tout seuls",
      "La facture passe en « payée » toute seule et les relances s'arrêtent",
      "Prévisions de trésorerie",
      "Vous pouvez aussi valider un paiement à la main, en un clic",
      "Votre trésorerie à jour en permanence",
    ],
  },
  {
    icon: TrendingUp,
    title: "Rentabilité & Stock",
    lead: "Ce que chaque chantier vous rapporte vraiment.",
    items: [
      "Combien chaque chantier vous rapporte vraiment, en temps réel",
      "Matériaux et main-d'œuvre rattachés à chaque chantier",
      "Stock tenu à jour tout seul",
      "Le stock baisse à chaque chantier",
      "Alerte quand il faut recommander",
      "Tableau de bord : dépenses et chiffre d'affaires mois par mois",
    ],
  },
  {
    icon: Tags,
    title: "Vos prix et vos infos",
    lead: "Vos prix et vos infos légales, sous votre main.",
    items: [
      "Créez et modifiez vos tarifs et prestations",
      "Vos prix et vos prestations modifiables quand vous voulez",
      "Un changement vaut pour l'avenir : les anciens documents ne bougent pas",
      "SIREN, numéro de TVA, IBAN et mentions légales",
      "Les mentions obligatoires sont ajoutées à tous vos documents",
      "Une seule recherche pour retrouver clients, devis, factures et chantiers",
    ],
  },
  {
    icon: GraduationCap,
    title: "Cours & Formation",
    lead: "Vos équipes se forment seules, depuis le chantier.",
    items: [
      "Vos propres cours pour vos équipes",
      "Un tutoriel attaché à chaque tâche",
      "Vidéos YouTube ou vos propres vidéos",
      "Images, photos d'exemple et cours écrits",
      "Vous déposez les contenus, vos équipes les consultent",
      "Accessibles aux salariés et aux sous-traitants depuis le chantier",
    ],
  },
  {
    icon: Star,
    title: "Avis & Réputation",
    lead: "Vos meilleurs chantiers deviennent des avis 5 étoiles.",
    items: [
      "Demande d'avis Google envoyée toute seule en fin de chantier",
      "Un e-mail soigné qui aide aussi à se faire payer",
    ],
  },
  {
    icon: Shield,
    title: "Vos données restent en France",
    lead: "Hébergées en France, protégées — et à vous.",
    c: 4,
    items: [
      "Vos données sont hébergées en France",
      "Respect du RGPD (protection des données personnelles)",
      "Sauvegarde chaque jour sur des serveurs français",
      "Vous récupérez vos données quand vous voulez",
      "Un site rapide et sécurisé",
    ],
  },
];

const PREVIEW = 3;
const TOTAL = TILES.reduce((n, t) => n + t.items.length, 0);
const HEROES = TILES.filter((t) => t.hero);
const REST = TILES.filter((t) => !t.hero);

export default function Services() {
  const [open, setOpen] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const toggle = (k: string) =>
    setOpen((o) => (o.includes(k) ? o.filter((x) => x !== k) : [...o, k]));

  return (
    <section id="services" className="services" style={{ padding: "clamp(3.5rem, 8vw, 6rem) 0 clamp(2.5rem, 5vw, 4rem)" }}>
      {/* Le ciel de la section. Fixe : rien ne bouge, donc rien ne coute au
          defilement — c'est la profondeur du degrade et les volumes nuageux qui
          font le travail, pas le mouvement. */}
      <div
        className="services-sky"
        aria-hidden
        style={{ ["--band" as string]: BAND, ["--row" as string]: ROW }}
      >
        <span className="services-band services-band-top" />
        <span className="services-band services-band-mid" />
        <span className="services-band services-band-bottom" />
      </div>

      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 6vw", position: "relative", zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3rem)" }}
        >
          <span style={{
            display: "inline-block", padding: "6px 20px", borderRadius: "999px",
            border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)",
            color: "#2455D6", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em",
            textTransform: "uppercase", marginBottom: "1.2rem",
          }}>
            Fonctionnalités
          </span>
          <h2 style={{
            fontFamily: "var(--font-nunito)", fontWeight: 900,
            fontSize: "clamp(1.9rem,4vw,2.8rem)", color: "var(--text)", lineHeight: 1.18,
          }}>
            Une chaîne qui tourne{" "}
            <span style={{ color: "#2455D6" }}>toute seule</span>
          </h2>
          <p style={{
            color: "rgba(var(--text-rgb),0.58)", fontSize: "1rem",
            maxWidth: "34rem", margin: "0.9rem auto 0", lineHeight: 1.55,
          }}>
            Trois promesses qu&apos;aucun logiciel du bâtiment ne tient, et{" "}
            {TILES.length} rubriques derrière — {TOTAL}&nbsp;fonctions en tout.
          </p>
        </motion.div>

        {/* Les trois promesses, chacune avec sa vue : c'est ce qu'on retient
            de la section, le reste n'est la que pour rassurer. */}
        <div className="bento bento-heroes">
          {HEROES.map((t, i) => {
            const Icon = t.icon;
            const Art = t.art;
            const isOpen = open.includes(t.title);
            const rest = t.items.length - PREVIEW;
            return (
              <motion.div
                key={t.title}
                className="bento-tile is-hero"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {Art && (
                  <div className="bento-art" aria-hidden>
                    <Art />
                  </div>
                )}
                <span className="bento-icon">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="bento-title">{t.title}</h3>
                <p className="bento-lead">{t.lead}</p>
                {/* Toutes les lignes sont dans le HTML ; celles au-dela de
                    l'apercu sont masquees en CSS tant que la tuile est
                    repliee. Rendues conditionnellement, elles etaient
                    invisibles pour Google et pour les IA. */}
                <ul className="bento-points">
                  {t.items.map((p, k) => (
                    <li key={p} className={!isOpen && k >= PREVIEW ? "is-folded" : undefined}>
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="bento-more"
                  onClick={() => toggle(t.title)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? "Replier" : `+ ${rest} autres fonctions`}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Le reste du produit tient sur une ligne tant qu'on ne l'ouvre pas. */}
        <button
          type="button"
          className="bento-reveal"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
        >
          <span>
            {REST.length} autres rubriques — chantiers, relances, Copilote, trésorerie,
            rentabilité, formation…
          </span>
          <span className="bento-reveal-cta">{showAll ? "Masquer" : "Tout afficher"}</span>
        </button>

        <div className="bento bento-rest" hidden={!showAll}>
          {REST.map((t, i) => {
              const Icon = t.icon;
              const isOpen = open.includes(t.title);
              return (
                <motion.div
                  key={t.title}
                  className="bento-tile"
                  style={{ ["--c" as string]: t.c ?? 1 }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(i, 7) * 0.03 }}
                >
                  <span className="bento-icon">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <h3 className="bento-title">{t.title}</h3>
                  <p className="bento-lead">{t.lead}</p>
                  <ul className="bento-points" hidden={!isOpen}>
                    {t.items.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="bento-more"
                    onClick={() => toggle(t.title)}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Replier" : `${t.items.length} fonctions`}
                  </button>
                </motion.div>
              );
            })}
        </div>
      </div>

      <style>{`
        .services { position: relative; overflow: hidden; }
        .services-sky {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background: linear-gradient(180deg,
            rgba(222,234,252,0) 0%,
            rgba(186,212,248,0.75) 18%,
            rgba(150,188,242,0.85) 50%,
            rgba(186,212,248,0.7) 82%,
            rgba(222,234,252,0) 100%);
        }
        .services-band {
          position: absolute; left: -14%; right: -14%;
          background-image: var(--band);
          background-size: 100% 100%; background-repeat: no-repeat;
        }
        .services-band-top { top: -2%; height: 34%; opacity: .5; transform: scaleY(-1); }
        .services-band-bottom { bottom: -4%; height: 38%; opacity: .72; }
        .services-band-mid { display: none; }

        .bento { display: grid; gap: 1rem; align-items: stretch; }
        /* Le contenu replie reste dans le document et n'est que masque :
           la regle display: grid l'emporterait sinon sur [hidden]. */
        .bento[hidden], .bento-points[hidden] { display: none; }
        .bento-points li.is-folded { display: none; }
        .bento-heroes { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .bento-rest { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 0.9rem; }

        /* La vue dans la carte : un ecran pose dans la promesse. C'est elle
           qui porte l'immersion, le texte ne fait que la nommer. */
        .bento-art {
          border-radius: 1rem;
          background: linear-gradient(172deg, #FFFFFF 0%, #F4F8FF 62%, #E9F0FD 100%);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.55),
            0 18px 34px -22px rgba(8,24,66,0.85);
          padding: .55rem;
          margin-bottom: 1.2rem;
          aspect-ratio: 1.26;
          overflow: hidden;
          transition: transform .3s cubic-bezier(.2,.7,.3,1);
          will-change: transform;
        }
        .bento-tile:hover .bento-art { transform: translateY(-3px) scale(1.015); }
        .bento-art > svg { display: block; width: 100%; height: 100%; }

        /* La barre qui garde le reste du produit replie. */
        .bento-reveal {
          width: 100%;
          margin-top: 0.9rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem; flex-wrap: wrap;
          padding: .95rem 1.3rem;
          border-radius: 1rem;
          border: 1px dashed rgba(36,85,214,0.32);
          background: rgba(255,255,255,0.55);
          color: rgba(var(--text-rgb),0.6);
          font-family: inherit; font-size: .88rem; text-align: left;
          cursor: pointer;
          transition: background .2s ease, border-color .2s ease;
        }
        .bento-reveal:hover { background: rgba(255,255,255,0.85); border-color: rgba(36,85,214,0.5); }
        .bento-reveal-cta {
          color: #2455D6; font-weight: 800; font-size: .82rem; white-space: nowrap;
        }
        .bento-tile {
          grid-column: span var(--c);
          display: flex;
          flex-direction: column;
          padding: clamp(1.1rem, 2.6vw, 1.6rem);
          border-radius: 1.25rem;
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(36,85,214,0.14);
          box-shadow: 0 10px 26px -20px rgba(27,42,74,0.4);
          transition: transform .28s cubic-bezier(.2,.7,.3,1), box-shadow .28s ease, border-color .28s ease;
          will-change: transform;
        }
        .bento-tile:hover {
          transform: translateY(-4px);
          border-color: rgba(36,85,214,0.32);
          box-shadow: 0 18px 34px -20px rgba(36,85,214,0.45);
        }

        /* Les trois promesses : c'est leur poids visuel qui fait la hierarchie,
           pas un badge "le plus populaire". Et leur teinte s'assombrit de
           gauche a droite — la chaine avance, le bleu descend avec elle. */
        .bento-tile.is-hero {
          position: relative;
          overflow: hidden;
          border: none;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.26),
            inset 0 0 0 1px rgba(255,255,255,0.09),
            0 24px 50px -26px rgba(12,32,86,0.8);
        }
        .bento-heroes .bento-tile:nth-child(1) { background: linear-gradient(158deg, #3D77EC 0%, #2A5CCF 54%, #1C43AC 100%); }
        .bento-heroes .bento-tile:nth-child(2) { background: linear-gradient(158deg, #2C62E2 0%, #1F4CB8 54%, #143485 100%); }
        .bento-heroes .bento-tile:nth-child(3) { background: linear-gradient(158deg, #2050C9 0%, #163C9B 54%, #0D2765 100%); }

        /* Un reflet diffus en haut a gauche : sans lui, l'aplat reste plat. */
        .bento-tile.is-hero::before {
          content: "";
          position: absolute; left: -25%; top: -35%;
          width: 85%; aspect-ratio: 1; border-radius: 50%;
          background: radial-gradient(closest-side, rgba(255,255,255,0.2), rgba(255,255,255,0));
          pointer-events: none;
        }
        .bento-tile.is-hero > * { position: relative; z-index: 1; }
        .bento-tile.is-hero:hover {
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.32),
            inset 0 0 0 1px rgba(255,255,255,0.14),
            0 32px 60px -24px rgba(12,32,86,0.85);
        }

        .bento-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 12px;
          background: rgba(36,85,214,0.09);
          color: #2455D6;
          margin-bottom: .85rem;
          flex-shrink: 0;
        }
        .is-hero .bento-icon {
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.16);
          color: #FFFFFF;
        }

        .bento-title {
          font-family: var(--font-nunito); font-weight: 800;
          font-size: 1rem; line-height: 1.3; color: var(--text);
          margin-bottom: .3rem;
        }
        .is-hero .bento-title { font-size: clamp(1.15rem, 2.3vw, 1.4rem); color: #FFFFFF; }

        .bento-lead { color: rgba(var(--text-rgb),0.55); font-size: .85rem; line-height: 1.5; }
        .is-hero .bento-lead { color: rgba(255,255,255,0.8); font-size: .93rem; }

        .bento-points {
          list-style: none; padding: 0;
          margin: 1rem 0 1.1rem;
          display: grid; gap: .45rem;
        }
        .bento-points li {
          position: relative; padding-left: 1rem;
          color: rgba(var(--text-rgb),0.62);
          font-size: .83rem; line-height: 1.45;
        }
        .bento-points li::before {
          content: "";
          position: absolute; left: 0; top: .48rem;
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(36,85,214,0.45);
        }
        .is-hero .bento-points li { color: rgba(255,255,255,0.8); font-size: .86rem; }
        .is-hero .bento-points li::before { background: rgba(255,255,255,0.6); }

        .bento-more {
          align-self: flex-start;
          margin-top: 1.1rem;
          padding: .35rem .8rem;
          border-radius: 999px;
          border: 1px solid rgba(36,85,214,0.22);
          background: rgba(36,85,214,0.05);
          color: #2455D6;
          font-size: .76rem; font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: background .2s ease, border-color .2s ease;
        }
        .bento-more:hover { background: rgba(36,85,214,0.11); border-color: rgba(36,85,214,0.4); }
        .is-hero .bento-more {
          margin-top: auto;
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.12);
          color: #FFFFFF;
        }
        .is-hero .bento-more:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.5); }

        /* Meme correction que dans la section du dessus : une bande courte et
           large, comme le bandeau d'appel a l'action, pour que les volumes
           restent ronds et bien visibles. */
        @media (max-width: 900px) {
          /* Meme recette que dans la section du dessus : une bande en haut,
             une en bas, rien au milieu. */
          .services-band { background-repeat: no-repeat; }
          .services-band-mid { display: none; }
          .services-band-top {
            top: 0; height: 300px;
            background-size: 150% 100%; background-position: 0% 0%;
            opacity: .8; transform: scaleY(-1);
          }
          .services-band-bottom {
            bottom: 0; height: 265px;
            background-size: 125% 100%; background-position: 100% 0%;
            opacity: .72;
          }
          .services-sky {
            background: linear-gradient(180deg,
              rgba(222,234,252,0) 0%,
              rgba(196,218,248,0.7) 16%,
              rgba(176,206,245,0.78) 50%,
              rgba(200,221,249,0.6) 84%,
              rgba(222,234,252,0) 100%);
          }
        }

        @media (max-width: 980px) {
          .bento-heroes { grid-template-columns: 1fr; }
          .bento-rest { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .bento-tile { grid-column: span min(var(--c), 2); }
          .bento-art { aspect-ratio: 1.7; }
        }
        @media (max-width: 560px) {
          .bento-rest { grid-template-columns: 1fr; }
          .bento-tile { grid-column: span 1; }
          .bento-art { aspect-ratio: 1.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bento-tile { transition: none !important; }
          .bento-tile:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}
