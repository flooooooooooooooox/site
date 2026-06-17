"use client";
import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  FileText, Bell, PhoneIncoming, Mic, Receipt,
  Star, Monitor, Shield, ChevronDown,
} from "lucide-react";

const CATEGORIES = [
  {
    icon: FileText,
    title: "Devis & Facturation",
    color: "#F5C842",
    hero: true,
    features: [
      "Devis PDF par vocal/écrit WhatsApp en 3 min",
      "Devis depuis le site web",
      "PV de réception + facture finale automatisés",
      "Factures d'acompte, finale, tous types",
      "Gestion des avenants et avoirs automatiques",
      "Signature électronique intégrée (valeur légale)",
      "Conformité e-facturation 2026 (e-reporting pro)",
      "Bibliothèque de prix & catalogue réutilisable",
      "TVA multiple : 5,5% / 10% / 20% automatique",
      "Attestation TVA réduite (CERFA bâtiment)",
      "Modèles de devis personnalisables",
      "Numérotation automatique devis & factures",
      "Archivage automatique clients / docs / signatures",
    ],
  },
  {
    icon: Bell,
    title: "Relances & Suivi",
    color: "#F5C842",
    hero: true,
    features: [
      "Relances devis non signés : J+3 / J+7 / J+14",
      "Relances signature avenants & avoirs",
      "Alerte chantier → e-mail pro depuis un vocal en 30s",
      "Relance garantie 1 an (J+365 fin de chantier)",
      "Gestion des retards automatique",
      "Suivi hebdomadaire : CA, chantiers, devis signés",
      "Envoi factures à date calculée automatiquement",
      "Notification devis signé en temps réel",
    ],
  },
  {
    icon: PhoneIncoming,
    title: "Agent IA & Booking",
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
    color: "#FBBF24",
    features: [
      "Demande d'avis Google Maps auto fin de chantier",
      "E-mail beau & pro qui favorise les paiements",
    ],
  },
  {
    icon: Monitor,
    title: "ERP & Gestion",
    color: "#A78BFA",
    features: [
      "Interface OS : devis, factures, chantiers, planning",
      "Gestion équipes & plannings salariés temps réel",
      "Suivi heures collaborateurs (Premium)",
      "Collecte photos fin de chantier via WhatsApp",
      "CRM intelligent avec historique client complet",
      "Rentabilité réelle par chantier (analyse IA)",
      "Archivage structuré sur nos serveurs",
    ],
  },
  {
    icon: Shield,
    title: "Données & Infrastructure",
    color: "#34D399",
    features: [
      "Hébergement 100% France",
      "Conformité RGPD native",
      "Sauvegarde quotidienne serveurs français",
      "Export données à tout moment, sans friction",
      "Zéro friction envoi e-mail (boîte prospect)",
      "Site sécurisé, rapide, interactif",
    ],
  },
];

const COLOR_GRADIENTS: Record<string, string> = {
  "#F5C842": "rgba(245,200,66,0.10)",
  "#4ADE80": "rgba(74,222,128,0.08)",
  "#60A5FA": "rgba(96,165,250,0.08)",
  "#FBBF24": "rgba(251,191,36,0.08)",
  "#A78BFA": "rgba(167,139,250,0.08)",
  "#34D399": "rgba(52,211,153,0.08)",
};

function CategoryCard({ cat, delay, colSpan }: {
  cat: typeof CATEGORIES[0]; delay: number; colSpan: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const Icon = cat.icon;
  const accent = cat.color;
  const bg = COLOR_GRADIENTS[accent] ?? "rgba(255,255,255,0.04)";
  const showAll = cat.features.length <= 6 || expanded;
  const visible = showAll ? cat.features : cat.features.slice(0, 5);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -7;
    const ry = ((x - r.width / 2) / r.width) * 7;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (shineRef.current)
      shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${accent}22 0%, transparent 65%)`;
  }

  function handleMouseLeave() {
    if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    if (shineRef.current) shineRef.current.style.background = "transparent";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{ gridColumn: `span ${colSpan}` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}44`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${accent}10`;
        }}
        style={{
          height: "100%",
          background: `linear-gradient(135deg, ${bg} 0%, rgba(255,255,255,0.02) 100%)`,
          border: `1px solid rgba(255,255,255,0.07)`,
          backdropFilter: "blur(12px)",
          borderRadius: "1.25rem",
          padding: "1.75rem",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
          transition: "border-color 0.3s, box-shadow 0.3s",
          willChange: "transform",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div ref={shineRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "1.25rem", transition: "background 0.12s" }} />

        {/* Glow orb */}
        <div aria-hidden style={{ position: "absolute", top: "-20%", right: "-10%", width: 180, height: 180, background: `radial-gradient(circle, ${accent}18, transparent 70%)`, filter: "blur(30px)", pointerEvents: "none" }} />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "10px", background: `${accent}15`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={20} color={accent} strokeWidth={1.5} />
          </div>
          <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1rem", color: "#E8EDF4", lineHeight: 1.2 }}>
            {cat.title}
          </h3>
          <span style={{ marginLeft: "auto", fontSize: "0.65rem", fontWeight: 700, color: accent, background: `${accent}15`, border: `1px solid ${accent}25`, padding: "2px 8px", borderRadius: "999px", whiteSpace: "nowrap", flexShrink: 0 }}>
            {cat.features.length} fonctions
          </span>
        </div>

        {/* Feature list */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem", flex: 1 }}>
          {visible.map((f, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", fontSize: "0.82rem", color: "rgba(232,237,244,0.7)", lineHeight: 1.45 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, flexShrink: 0, marginTop: "0.45em", opacity: 0.8 }} />
              {f}
            </li>
          ))}
        </ul>

        {/* Show more */}
        {cat.features.length > 6 && (
          <button
            onClick={() => setExpanded(v => !v)}
            style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.9rem", background: "none", border: "none", cursor: "pointer", color: accent, fontSize: "0.75rem", fontWeight: 700, padding: 0, opacity: 0.8 }}
          >
            {expanded ? "Voir moins" : `+${cat.features.length - 5} de plus`}
            <ChevronDown size={13} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Bento: 3 cols. hero cards span 2, others span 1
const LAYOUT = [2, 2, 1, 1, 1, 1, 2, 2];

export default function Services() {
  return (
    <section id="services" style={{ background: "rgba(15,25,35,0.82)", padding: "7rem 0" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 6vw" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span style={{ display: "inline-block", padding: "6px 20px", borderRadius: "999px", border: "1px solid rgba(245,200,66,0.25)", background: "rgba(245,200,66,0.07)", color: "#F5C842", fontSize: ".78rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
            Fonctionnalités
          </span>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#E8EDF4", marginBottom: ".75rem" }}>
            Tout ce que <span style={{ color: "#F5C842" }}>Floxia</span> fait pour vous
          </h2>
          <p style={{ color: "rgba(232,237,244,0.55)", fontSize: "1.05rem" }}>
            47 fonctionnalités IA organisées en 8 modules — activables à la carte
          </p>
        </motion.div>

        <div
          className="services-bento"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
            alignItems: "start",
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              cat={cat}
              delay={i * 0.07}
              colSpan={LAYOUT[i]}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-bento { grid-template-columns: repeat(2, 1fr) !important; }
          .services-bento > * { grid-column: span 1 !important; }
        }
        @media (max-width: 640px) {
          .services-bento { grid-template-columns: 1fr !important; }
          .services-bento > * { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
