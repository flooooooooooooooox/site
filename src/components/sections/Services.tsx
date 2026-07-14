"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Bell, PhoneIncoming, Mic, Receipt,
  Star, Monitor, Shield, LucideIcon,
} from "lucide-react";

interface Category {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: string;
  features: string[];
}

const CATEGORIES: Category[] = [
  {
    icon: FileText,
    title: "Devis & Facturation",
    subtitle: "Facturez en 3 minutes, sans jamais ressaisir.",
    color: "#F5C842",
    features: [
      "Devis PDF par vocal/écrit WhatsApp en 3 min",
      "Devis sur l'application Floxia ERP (pré-modèles IA)",
      "PV de réception + facture finale automatisés",
      "Factures d'acompte, finale, tous types",
      "Factures périodiques & récurrentes automatiques",
      "Gestion des avenants et avoirs automatiques",
      "Signature électronique intégrée (valeur légale)",
      "Conformité e-facturation 2026 (e-reporting pro)",
      "Bibliothèque de prix & catalogue réutilisable",
      "TVA 5,5% / 10% / 20% au choix par ligne",
      "Numérotation automatique devis & factures",
      "Archivage automatique clients / docs / signatures",
    ],
  },
  {
    icon: Bell,
    title: "Relances & Suivi",
    subtitle: "Plus aucun devis oublié, plus aucune facture impayée.",
    color: "#F5C842",
    features: [
      "Relances devis non signés : J+3 / J+7 / J+14",
      "Relances factures impayées automatiques (J+X)",
      "Relances signature avenants & avoirs",
      "Alerte chantier → e-mail pro depuis un vocal en 30s",
      "Relance garantie 1 an (J+365 fin de chantier)",
      "Suivi hebdomadaire : CA, chantiers, devis signés",
      "Envoi factures à date calculée automatiquement",
      "Notification devis signé en temps réel",
    ],
  },
  {
    icon: PhoneIncoming,
    title: "Agent IA & Booking",
    subtitle: "Une standardiste IA qui décroche à votre place, 24h/24.",
    color: "#4ADE80",
    features: [
      "Réceptionniste IA WhatsApp & téléphone 24h/24",
      "Qualification automatique des demandes entrantes",
      "Booking RDV automatique dans votre agenda",
      "Optimisation des créneaux selon la distance",
      "Transfert intelligent vers l'artisan (CRM)",
    ],
  },
  {
    icon: Mic,
    title: "Assistant & IA Vocale",
    subtitle: "Vous dictez, l'IA écrit. Vos mains restent sur le chantier.",
    color: "#4ADE80",
    features: [
      "Assistant vocal : bâtiment, administratif, juridique",
      "Saisie vocale IA avancée (dispo instantanée)",
      "E-mail pro rédigé depuis un vocal en 30s",
      "Rapport de chantier envoyé par e-mail client",
    ],
  },
  {
    icon: Receipt,
    title: "Comptabilité & Dépenses",
    subtitle: "Une photo suffit. Votre comptable reçoit tout, prêt.",
    color: "#60A5FA",
    features: [
      "Scan tickets & factures fournisseurs via WhatsApp",
      "OCR IA : fournisseur, articles, HT/TVA, SIRET auto",
      "Dashboard dépenses & TVA récupérable",
      "Export comptabilité en 1 clic",
    ],
  },
  {
    icon: Star,
    title: "Avis & Réputation",
    subtitle: "Vos meilleurs chantiers deviennent des avis 5 étoiles.",
    color: "#FBBF24",
    features: [
      "Demande d'avis Google Maps auto fin de chantier",
      "E-mail beau & pro qui favorise les paiements",
    ],
  },
  {
    icon: Monitor,
    title: "ERP & Gestion",
    subtitle: "Chantiers, équipes et heures : tout piloté d'un seul écran.",
    color: "#A78BFA",
    features: [
      "Interface OS : devis, factures, chantiers, planning",
      "Gestion équipes & plannings salariés temps réel",
      "Gestion complète des heures salariés : pointage & feuilles d'heures",
      "Suivi des heures par salarié et par chantier",
      "Calcul automatique heures sup + récap mensuel exportable",
      "Collecte photos fin de chantier via WhatsApp",
      "CRM intelligent avec historique client complet",
      "Dashboard dépenses & CA par mois",
    ],
  },
  {
    icon: Shield,
    title: "Données & Infrastructure",
    subtitle: "Vos données, en France, protégées — et à vous.",
    color: "#34D399",
    features: [
      "Hébergement 100% France",
      "Conformité RGPD native",
      "Sauvegarde quotidienne serveurs français",
      "Export données à tout moment, sans friction",
      "Site sécurisé, rapide, interactif",
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const cat = CATEGORIES[active];
  const Icon = cat.icon;

  return (
    <section id="services" style={{ background: "transparent", padding: "clamp(3.5rem, 8vw, 6rem) 0" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 6vw" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <span style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)", color: "#F5C842", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            Fonctionnalités
          </span>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--text)", marginBottom: ".6rem", lineHeight: 1.1 }}>
            Une chaîne qui tourne <span style={{ color: "#F5C842" }}>toute seule</span>
          </h2>
          <p style={{ color: "rgba(var(--text-rgb),0.55)", fontSize: "1rem", maxWidth: "38rem", margin: "0 auto" }}>
            8 modules connectés. Cliquez sur une étape pour voir ce qu&apos;elle automatise.
          </p>
        </motion.div>

        {/* ===== Chaîne de nœuds ===== */}
        <div className="flow-track" role="tablist" aria-label="Modules Floxia">
          {CATEGORIES.map((c, i) => {
            const NodeIcon = c.icon;
            const isActive = i === active;
            return (
              <div key={c.title} className="flow-node-wrap">
                {/* Connecteur (sauf avant le 1er) */}
                {i > 0 && <span className="flow-link" aria-hidden />}
                <button
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className="flow-node"
                  title={c.title}
                  style={{
                    background: isActive ? c.color : "rgba(var(--surface-rgb),0.05)",
                    borderColor: isActive ? c.color : "rgba(var(--surface-rgb),0.12)",
                    boxShadow: isActive ? `0 0 22px ${c.color}66` : "none",
                    color: isActive ? "#0F1923" : c.color,
                  }}
                >
                  <NodeIcon size={19} strokeWidth={2} />
                </button>
              </div>
            );
          })}
        </div>

        {/* ===== Panneau du module actif ===== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginTop: "2rem",
              borderRadius: "1.25rem",
              border: `1px solid ${cat.color}33`,
              background: `linear-gradient(135deg, ${cat.color}0D 0%, rgba(var(--surface-rgb),0.02) 100%)`,
              backdropFilter: "blur(14px)",
              padding: "clamp(1.4rem, 3vw, 2rem)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow d'angle */}
            <div aria-hidden style={{ position: "absolute", top: "-30%", right: "-8%", width: 260, height: 260, background: `radial-gradient(circle, ${cat.color}1A, transparent 70%)`, filter: "blur(38px)", pointerEvents: "none" }} />

            {/* En-tête du module */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "1.4rem", position: "relative", zIndex: 1 }}>
              <div style={{ width: 46, height: 46, borderRadius: "12px", background: `${cat.color}18`, border: `1px solid ${cat.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={22} color={cat.color} strokeWidth={1.75} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                  <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.15rem", color: "var(--text)", lineHeight: 1.2 }}>
                    {cat.title}
                  </h3>
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, color: cat.color, background: `${cat.color}15`, border: `1px solid ${cat.color}25`, padding: "2px 8px", borderRadius: "999px" }}>
                    {cat.features.length} fonctions
                  </span>
                </div>
                <p style={{ fontSize: "0.86rem", color: cat.color, opacity: 0.85, fontWeight: 600, marginTop: "0.15rem" }}>
                  {cat.subtitle}
                </p>
              </div>
            </div>

            {/* Fonctions en 2 colonnes compactes */}
            <ul className="flow-features" style={{ position: "relative", zIndex: 1 }}>
              {cat.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.83rem", color: "rgba(var(--text-rgb),0.72)", lineHeight: 1.45 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: cat.color, flexShrink: 0, marginTop: "0.5em" }} />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .flow-track {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0;
          max-width: 720px;
          margin: 0 auto;
        }
        .flow-node-wrap { display: inline-flex; align-items: center; }
        .flow-link {
          width: clamp(14px, 3vw, 34px);
          height: 2px;
          background: linear-gradient(to right, rgba(245,200,66,0.25), rgba(245,200,66,0.5));
          flex-shrink: 0;
        }
        .flow-node {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background .25s, box-shadow .25s, border-color .25s, transform .2s;
          flex-shrink: 0;
        }
        .flow-node:hover { transform: translateY(-2px); }
        .flow-features {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem 1.5rem;
        }
        @media (max-width: 600px) {
          .flow-features { grid-template-columns: 1fr; }
          .flow-node { width: 40px; height: 40px; border-radius: 11px; }
        }
      `}</style>
    </section>
  );
}
