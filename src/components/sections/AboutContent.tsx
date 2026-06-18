"use client";
import { motion } from "framer-motion";
import { Cpu, Heart, ShieldCheck, Sparkles, Users, Wrench } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const VALUES = [
  {
    icon: Cpu,
    title: "L'automatisation pour tous",
    text: "Les mêmes outils d'automatisation que les grandes entreprises, mis à portée de l'artisan du bâtiment.",
  },
  {
    icon: ShieldCheck,
    title: "Souveraineté & confiance",
    text: "Hébergement 100% en France, conformité RGPD native. Vos données restent chez vous.",
  },
  {
    icon: Sparkles,
    title: "La simplicité avant tout",
    text: "Un devis en 3 minutes depuis WhatsApp. Pas de logiciel compliqué, pas de formation interminable.",
  },
  {
    icon: Heart,
    title: "Proche du terrain",
    text: "Pensé avec et pour les artisans, par des gens qui connaissent la réalité du chantier.",
  },
];

const STATS = [
  { value: "340+", label: "artisans & PME accompagnés" },
  { value: "−80 %", label: "de temps administratif éliminé" },
  { value: "3 min", label: "pour générer un devis complet" },
  { value: "100 %", label: "hébergé et conçu en France" },
];

const TEAM = [
  {
    icon: Wrench,
    role: "Fondateur",
    name: "Florian",
    text: "Ingénieur en automatisation, à l'origine de Floxia. Il pilote la vision produit et le développement de l'outil.",
  },
  {
    icon: Users,
    role: "Réseau",
    name: "Nos apporteurs d'affaires",
    text: "Un réseau de partenaires de confiance qui font découvrir Floxia aux artisans partout en France.",
  },
];

export default function AboutContent() {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* En-tête */}
      <section style={{ padding: "clamp(8rem,16vh,11rem) 6vw clamp(2rem,5vh,4rem)", textAlign: "center", maxWidth: "60rem", margin: "0 auto" }}>
        <motion.span
          {...fadeUp}
          style={{
            display: "inline-block",
            padding: "6px 20px",
            borderRadius: "999px",
            border: "1px solid rgba(245,200,66,0.25)",
            background: "rgba(245,200,66,0.07)",
            color: "#F5C842",
            fontSize: ".78rem",
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          Qui sommes-nous
        </motion.span>
        <motion.h1
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2.4rem,6vw,4.2rem)", lineHeight: 1.05, color: "var(--text)", marginBottom: "1.4rem" }}
        >
          L&apos;automatisation au service{" "}
          <span style={{ color: "#F5C842" }}>des artisans</span>
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: "clamp(1.05rem,2.2vw,1.25rem)", lineHeight: 1.7, maxWidth: "42rem", margin: "0 auto" }}
        >
          Floxia est né d&apos;une conviction simple : les artisans du bâtiment méritent les
          mêmes outils intelligents que les grandes entreprises.
        </motion.p>
      </section>

      {/* Notre histoire */}
      <section style={{ padding: "clamp(3rem,6vh,5rem) 6vw", maxWidth: "52rem", margin: "0 auto" }}>
        <motion.div {...fadeUp}>
          <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "var(--text)", marginBottom: "1.8rem" }}>
            Notre <span style={{ color: "#F5C842" }}>histoire</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem", color: "rgba(var(--text-rgb),0.75)", fontSize: "1.08rem", lineHeight: 1.8 }}>
            <p>
              Tout commence avec <strong style={{ color: "var(--text)" }}>Florian</strong>, ingénieur en
              automatisation. Au sein d&apos;une ETI, il déploie des automatisations qui font gagner
              des centaines d&apos;heures aux équipes et transforment leur façon de travailler.
            </p>
            <p>
              En échangeant avec <strong style={{ color: "var(--text)" }}>son oncle</strong>, artisan,
              le constat est sans appel : les professionnels du bâtiment croulent sous la paperasse,
              les devis, les relances et la saisie administrative — sans aucun des outils dont
              bénéficient les grandes structures.
            </p>
            <p>
              De cette réflexion naît <strong style={{ color: "#F5C842" }}>Floxia</strong> : amener
              l&apos;automatisation et l&apos;intelligence artificielle, éprouvées en entreprise, aux
              artisans et aux PME du bâtiment. Aujourd&apos;hui, Floxia grandit dans ce domaine avec une
              mission claire — rendre aux artisans le temps qu&apos;ils consacrent à l&apos;administratif.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission & valeurs */}
      <section style={{ padding: "clamp(3rem,6vh,5rem) 6vw", maxWidth: "72rem", margin: "0 auto" }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "var(--text)", marginBottom: "0.6rem", textAlign: "center" }}>
          Mission & <span style={{ color: "#F5C842" }}>valeurs</span>
        </motion.h2>
        <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} style={{ textAlign: "center", color: "rgba(var(--text-rgb),0.6)", marginBottom: "3rem", fontSize: "1.05rem" }}>
          Redonner du temps aux artisans pour qu&apos;ils se concentrent sur leur métier.
        </motion.p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.25rem" }}>
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              style={{
                background: "rgba(var(--surface-rgb),0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(var(--surface-rgb),0.08)",
                borderRadius: "1.25rem",
                padding: "1.8rem",
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: "rgba(245,200,66,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.1rem" }}>
                <v.icon size={22} color="#F5C842" />
              </div>
              <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.1rem", color: "var(--text)", marginBottom: "0.6rem" }}>{v.title}</h3>
              <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: "0.92rem", lineHeight: 1.6 }}>{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chiffres clés */}
      <section style={{ padding: "clamp(3rem,6vh,5rem) 6vw", maxWidth: "72rem", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.25rem" }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              style={{ textAlign: "center", padding: "1.5rem 1rem" }}
            >
              <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2.2rem,4vw,3rem)", color: "#F5C842", lineHeight: 1 }}>{s.value}</div>
              <div style={{ marginTop: "0.6rem", color: "rgba(var(--text-rgb),0.65)", fontSize: "0.9rem", lineHeight: 1.4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* L'équipe */}
      <section style={{ padding: "clamp(3rem,6vh,5rem) 6vw", maxWidth: "60rem", margin: "0 auto" }}>
        <motion.h2 {...fadeUp} style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.6rem)", color: "var(--text)", marginBottom: "0.6rem", textAlign: "center" }}>
          L&apos;<span style={{ color: "#F5C842" }}>équipe</span>
        </motion.h2>
        <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} style={{ textAlign: "center", color: "rgba(var(--text-rgb),0.6)", marginBottom: "3rem", fontSize: "1.05rem" }}>
          Une équipe à taille humaine, proche de ses clients.
        </motion.p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              style={{
                background: "rgba(var(--surface-rgb),0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(var(--surface-rgb),0.08)",
                borderRadius: "1.25rem",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(245,200,66,0.1)", border: "1px solid rgba(245,200,66,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem" }}>
                <m.icon size={28} color="#F5C842" />
              </div>
              <div style={{ color: "#F5C842", fontSize: "0.72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{m.role}</div>
              <h3 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.2rem", color: "var(--text)", marginBottom: "0.7rem" }}>{m.name}</h3>
              <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: "0.92rem", lineHeight: 1.6 }}>{m.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
