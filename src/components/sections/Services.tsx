"use client";
import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  FileText, Camera, Star, AlertTriangle, Bell, Monitor,
  Mic, PhoneIncoming, FileCheck, TrendingUp, Users, Shield,
} from "lucide-react";

const SERVICES = [
  { icon: FileText,      title: "Devis PDF IA",            desc: "Générez un devis complet depuis un vocal WhatsApp en 3 minutes." },
  { icon: Camera,        title: "Photo → Devis",           desc: "Photographiez un chantier, obtenez un devis instantané." },
  { icon: Star,          title: "Avis Google Auto",        desc: "Relances automatiques post-chantier pour maximiser vos avis 5 étoiles." },
  { icon: AlertTriangle, title: "Détection d'anomalies",   desc: "L'IA repère les écarts de budget et vous alerte avant qu'ils explosent." },
  { icon: Bell,          title: "Relances intelligentes",  desc: "Relances de paiement automatiques, ton professionnel, zéro friction." },
  { icon: Monitor,       title: "Tableau de bord",         desc: "Vue 360° : devis, factures, chantiers, encaissements en temps réel." },
  { icon: Mic,           title: "Dictée vocale",           desc: "Parlez, Floxia rédige. Rapports de chantier en quelques secondes." },
  { icon: PhoneIncoming, title: "Standard IA",             desc: "Un agent vocal répond à vos appels entrants 24h/24." },
  { icon: FileCheck,     title: "Signature électronique",  desc: "Vos clients signent sur mobile en 1 clic, valeur légale garantie." },
  { icon: TrendingUp,    title: "Prévisions de trésorerie",desc: "Anticipez vos flux à 3 mois grâce à l'analyse IA de vos données." },
  { icon: Users,         title: "Multi-utilisateurs",      desc: "Gérez équipes, sous-traitants et sites depuis un seul espace." },
  { icon: Shield,        title: "Données souveraines",     desc: "Hébergement 100% français, RGPD natif, vos données restent vôtres." },
];

// Bento layout config: [colSpan, rowSpan]
const BENTO_LAYOUT: [number, number][] = [
  [2, 2], // 0: Devis PDF IA — hero
  [1, 1], // 1
  [1, 1], // 2
  [2, 1], // 3: Tableau de bord — wide
  [1, 1], // 4
  [1, 1], // 5
  [1, 1], // 6
  [1, 1], // 7
  [1, 1], // 8
  [1, 1], // 9
  [1, 1], // 10
  [2, 1], // 11: last — wide
];

interface ServiceCardProps {
  svc: typeof SERVICES[0];
  delay: number;
  colSpan: number;
  rowSpan: number;
  isHero?: boolean;
}

function ServiceCard({ svc, delay, colSpan, rowSpan, isHero }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const Icon = svc.icon;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) * 8;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    if (shineRef.current) {
      shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(245,200,66,0.12) 0%, transparent 65%)`;
    }
  }

  function handleMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    if (shineRef.current) shineRef.current.style.background = "transparent";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        style={{
          height: "100%",
          background: isHero
            ? "linear-gradient(135deg, rgba(245,200,66,0.10) 0%, rgba(245,200,66,0.03) 50%, rgba(255,255,255,0.03) 100%)"
            : "rgba(255,255,255,0.03)",
          border: isHero ? "1px solid rgba(245,200,66,0.20)" : "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          borderRadius: "1rem",
          padding: isHero ? "2.5rem" : "1.75rem",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transition: "border-color 0.3s, box-shadow 0.3s",
          willChange: "transform",
          display: "flex",
          flexDirection: "column",
          justifyContent: isHero ? "flex-end" : "flex-start",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,200,66,0.2)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(245,200,66,0.06)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = isHero ? "rgba(245,200,66,0.20)" : "rgba(255,255,255,0.07)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          handleMouseLeave();
        }}
      >
        {/* Shine overlay */}
        <div ref={shineRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "1rem", transition: "background 0.1s" }} />

        {/* Hero card decorative background element */}
        {isHero && (
          <div aria-hidden style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: "260px",
            height: "260px",
            background: "radial-gradient(circle, rgba(245,200,66,0.14), transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }} />
        )}

        <div style={{ marginBottom: isHero ? "1.5rem" : "1rem" }}>
          <Icon size={isHero ? 44 : 28} color="#F5C842" strokeWidth={1.5} />
        </div>
        <h3 style={{
          fontFamily: "var(--font-nunito)",
          fontWeight: 800,
          fontSize: isHero ? "1.5rem" : "1.05rem",
          color: "#E8EDF4",
          marginBottom: ".5rem",
        }}>
          {svc.title}
        </h3>
        <p style={{ color: "rgba(232,237,244,0.6)", fontSize: isHero ? "1rem" : ".9rem", lineHeight: 1.6 }}>
          {svc.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" style={{ background: "#0F1923", padding: "7rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 6vw" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#E8EDF4", marginBottom: ".75rem" }}>
            Ce que <span style={{ color: "#F5C842" }}>Floxia</span> fait pour vous
          </h2>
          <p style={{ color: "rgba(232,237,244,0.6)", fontSize: "1.05rem" }}>
            12 modules IA activables à la carte — zéro formation requise
          </p>
        </motion.div>

        <div
          className="services-bento"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "minmax(140px, auto)",
            gap: "1.25rem",
          }}
        >
          {SERVICES.map((svc, i) => {
            const [colSpan, rowSpan] = BENTO_LAYOUT[i];
            return (
              <ServiceCard
                key={svc.title}
                svc={svc}
                delay={i * 0.06}
                colSpan={colSpan}
                rowSpan={rowSpan}
                isHero={i === 0}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-bento {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .services-bento > *:first-child {
            grid-column: span 2 !important;
            grid-row: span 2 !important;
          }
          .services-bento > *:last-child {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 640px) {
          .services-bento {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .services-bento > * {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
          .services-bento > *:first-child {
            grid-column: span 2 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
