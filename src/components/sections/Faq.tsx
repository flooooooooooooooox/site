"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Comment Floxia s'intègre avec WhatsApp ?",
    a: "Floxia se connecte à votre numéro WhatsApp Business existant via l'API officielle Meta. Aucune application supplémentaire à installer — vous utilisez WhatsApp comme d'habitude, et Floxia traite les devis et factures en arrière-plan.",
  },
  {
    q: "En combien de temps est généré un devis ?",
    a: "En moins de 3 minutes. Vous décrivez le chantier par message vocal ou texte depuis WhatsApp, et Floxia génère automatiquement le devis PDF avec votre logo, vos tarifs et la bonne TVA (5,5%, 10% ou 20% selon le type de travaux).",
  },
  {
    q: "Floxia gère-t-il la facturation électronique 2026 ?",
    a: "Oui, nativement. Floxia est conforme à la réglementation e-facturation et e-reporting 2026 obligatoire pour toutes les entreprises françaises. Chaque facture est générée au bon format sans action supplémentaire de votre part.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Vos données sont chiffrées à l'aide de plusieurs clés de cryptage et hébergées sur nos propres serveurs en France. Conformité RGPD native — vos données ne sont jamais revendues à des tiers.",
  },
  {
    q: "Puis-je utiliser Floxia depuis mon téléphone sur chantier ?",
    a: "C'est exactement pour ça que Floxia a été conçu. Tout fonctionne depuis WhatsApp sur votre téléphone — vous n'avez pas besoin d'ouvrir un ordinateur pour créer un devis, envoyer une facture ou consulter l'état d'un chantier.",
  },
  {
    q: "Combien coûte Floxia ?",
    a: "Floxia propose trois formules à partir de 49€/mois, avec un setup unique. Consultez la section Tarifs sur la page d'accueil pour le détail complet des offres Essentiel, Artisan Pro et PME Premium.",
  },
  {
    q: "Floxia fonctionne-t-il pour tous les corps de métier du bâtiment ?",
    a: "Oui — électriciens, plombiers, maçons, peintres, menuisiers, carreleurs, couvreurs... Floxia comprend le vocabulaire et les spécificités de chaque métier : TVA par type de travaux, attestations CERFA, gestion des avenants.",
  },
  {
    q: "Floxia fonctionne-t-il hors connexion ?",
    a: "L'application web nécessite une connexion. Sur chantier, les données sont synchronisées dès le retour en ligne. WhatsApp fonctionne en 4G/5G, donc vous pouvez créer des devis même dans des zones à faible couverture.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "transparent", padding: "6rem 0" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 6vw" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span
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
              marginBottom: "1.2rem",
            }}
          >
            FAQ
          </span>
          <h2
            className="font-black text-[clamp(2rem,4vw,3rem)]"
            style={{ fontFamily: "var(--font-nunito)", color: "var(--text)" }}
          >
            Questions{" "}
            <span style={{ color: "#F5C842" }}>fréquentes</span>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                style={{
                  background: isOpen ? "rgba(245,200,66,0.04)" : "rgba(var(--surface-rgb),0.03)",
                  border: isOpen ? "1px solid rgba(245,200,66,0.2)" : "1px solid rgba(var(--surface-rgb),0.07)",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  transition: "border-color 0.3s, background 0.3s",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.2rem 1.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "1rem",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      color: isOpen ? "#F5C842" : "var(--text)",
                      fontWeight: 600,
                      fontSize: ".95rem",
                      lineHeight: 1.4,
                      transition: "color 0.3s",
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ flexShrink: 0 }}
                  >
                    <ChevronDown size={18} color={isOpen ? "#F5C842" : "rgba(var(--text-rgb),0.4)"} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          padding: "0 1.5rem 1.4rem",
                          color: "rgba(var(--text-rgb),0.65)",
                          fontSize: ".88rem",
                          lineHeight: 1.7,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
