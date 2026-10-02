"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Comment créer un devis avec Cirrion ?",
    a: "Vous avez deux façons de créer un devis. Depuis WhatsApp : décrivez le chantier par message vocal ou écrit, et Cirrion génère le devis PDF en moins de 3 minutes. Ou directement sur l'application Cirrion ERP : vous réutilisez vos propres modèles de devis que vous personnalisez en quelques clics. À vous de choisir le canal qui vous convient.",
  },
  {
    q: "Peut-on faire un devis directement sur l'application Cirrion ERP ?",
    a: "Oui. En plus de WhatsApp, vous pouvez créer vos devis directement dans l'application web Cirrion ERP. Vous y créez vos propres modèles de devis, adaptés à votre métier, qu'il ne reste plus qu'à ajuster (quantités, prix, prestations). Sur l'application, ce n'est pas du vocal : tout se fait à l'écran, avec votre catalogue de prix et vos modèles enregistrés.",
  },
  {
    q: "Comment Cirrion s'intègre avec WhatsApp ?",
    a: "Cirrion se connecte à votre numéro WhatsApp Business existant via l'API officielle Meta. Aucune application supplémentaire à installer — vous utilisez WhatsApp comme d'habitude, et Cirrion traite les devis et factures en arrière-plan. Vous pouvez aussi tout gérer depuis l'application web Cirrion ERP.",
  },
  {
    q: "En combien de temps est généré un devis ?",
    a: "En moins de 3 minutes depuis WhatsApp : vous décrivez le chantier par vocal ou texte, et Cirrion génère le devis PDF avec votre logo, vos tarifs et la bonne TVA (5,5%, 10% ou 20%). Sur l'application Cirrion ERP, c'est encore plus rapide grâce aux modèles de devis que vous créez.",
  },
  {
    q: "Cirrion gère-t-il la facturation électronique 2026 ?",
    a: "La réforme est entrée en vigueur le 1er septembre 2026 : toutes les entreprises doivent pouvoir recevoir des factures électroniques. Les grandes entreprises et ETI doivent aussi les émettre et transmettre leur e-reporting depuis cette date. Pour les PME et micro-entreprises, dont la majorité des artisans, l'obligation d'émission et d'e-reporting débute le 1er septembre 2027. Cirrion est conçu pour accompagner ces flux de facturation électronique depuis l'application.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Vos données sont chiffrées à l'aide de plusieurs clés de cryptage et hébergées sur nos propres serveurs en France. Conformité RGPD native — vos données ne sont jamais revendues à des tiers.",
  },
  {
    q: "Puis-je utiliser Cirrion depuis mon téléphone sur chantier ?",
    a: "Oui. Sur le terrain, tout fonctionne depuis WhatsApp sur votre téléphone — vous n'avez pas besoin d'ouvrir un ordinateur pour créer un devis, envoyer une facture ou consulter un chantier. Au bureau, l'application Cirrion ERP vous offre une vue complète avec vos modèles de devis et son tableau de bord.",
  },
  {
    q: "Combien coûte Cirrion ?",
    a: "Le tarif est établi sur devis. Cirrion propose trois formules — Essentiel, Artisan Pro et PME Premium — dont le prix dépend de votre activité, du nombre de comptes et des modules retenus. Réservez une démonstration de 30 minutes : vous recevez une proposition chiffrée sous 24 h, sans engagement.",
  },
  {
    q: "Cirrion fonctionne-t-il pour tous les corps de métier du bâtiment ?",
    a: "Oui — électriciens, plombiers, maçons, peintres, menuisiers, carreleurs, couvreurs... Cirrion comprend le vocabulaire et les spécificités de chaque métier : choix de la TVA par type de travaux, gestion des avenants et avoirs. Vous enregistrez dans l'application vos propres modèles de devis, adaptés à votre métier.",
  },
  {
    q: "Cirrion fonctionne-t-il hors connexion ?",
    a: "L'application web et WhatsApp nécessitent une connexion. Sur chantier, les données sont synchronisées dès le retour en ligne. WhatsApp fonctionne en 4G/5G, donc vous pouvez créer des devis même dans des zones à faible couverture.",
  },
  {
    q: "Comment dicter un devis BTP sur WhatsApp ?",
    a: "Envoyez un message vocal à votre numéro WhatsApp Business connecté à Cirrion, en décrivant le chantier comme vous le diriez à un collègue : « devis pour Mme Durand, remplacement tableau électrique, 6 heures de main d'œuvre, environ 400 euros de matériel ». Cirrion transcrit le vocal, identifie les prestations, applique le bon taux de TVA et génère le devis PDF avec votre logo en moins de 3 minutes. Vous le validez, puis il part en signature électronique.",
  },
  {
    q: "Quel est le meilleur logiciel de devis pour un artisan en 2026 ?",
    a: "Cela dépend de votre façon de travailler. Si vous êtes majoritairement sur chantier et que vous voulez créer un devis sans ouvrir d'ordinateur, un outil pilotable par WhatsApp comme Cirrion est le plus adapté. Si vous avez un bureau d'études et des métrés complexes, un logiciel type Obat ou Batigest reste pertinent. Le critère à ne pas négliger en 2026 : la conformité e-facturation, qui devient obligatoire à la réception dès septembre 2026.",
  },
  {
    q: "Quelle IA utilise Cirrion, et mes données partent-elles à l'étranger ?",
    a: "Non, vos données ne quittent pas l'Union européenne. Cirrion s'appuie sur Mistral AI (IA française) pour la compréhension du langage et sur ElevenLabs pour le traitement de la voix. L'hébergement est en France, sur nos propres serveurs, avec chiffrement et conformité RGPD native. Vos prix, vos clients et vos marges ne transitent pas par des serveurs hors UE.",
  },
  {
    q: "Comment passer d'Obat, Batigest ou EBP à Cirrion ?",
    a: "La bascule se fait en trois temps : import de votre base clients et de votre catalogue de prestations, paramétrage de vos taux de TVA et de vos modèles de devis, puis connexion de votre numéro WhatsApp Business et de votre compte bancaire. Le setup est réalisé avec vous — vous n'avez pas à repartir de zéro ni à ressaisir votre historique.",
  },
  {
    q: "Cirrion remplace-t-il mon expert-comptable ?",
    a: "Non, et ce n'est pas l'objectif. Cirrion fait la pré-comptabilité : factures au bon format, justificatifs scannés et classés, rapprochement bancaire automatique via Bridge, export comptable propre. Votre expert-comptable reçoit un dossier déjà en ordre, ce qui réduit son temps de traitement — mais le conseil fiscal et la liasse restent son métier.",
  },
  {
    q: "Combien de temps un artisan gagne-t-il réellement avec Cirrion ?",
    a: "Pour un artisan qui émet une quinzaine de devis et factures par mois, le travail administratif représente généralement entre 8 et 12 heures mensuelles (saisies, relances, classement des justificatifs, suivi des impayés). Une chaîne automatisée de bout en bout en supprime l'essentiel, non pas parce que les tâches disparaissent, mais parce qu'elles n'exigent plus votre présence.",
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

type FaqProps = {
  /** La page /faq n'a pas d'autre titre : la FAQ y porte le h1. */
  headingLevel?: "h1" | "h2";
};

/**
 * Les reponses sont dans le HTML des le premier rendu.
 *
 * L'accordeon precedent montait la reponse seulement apres le clic
 * (`{isOpen && ...}`) : un robot d'indexation, et une IA qui lit la page, n'y
 * voyaient que les questions. `<details>` replie la reponse sans la retirer du
 * document, et le navigateur gere l'ouverture sans etat React.
 */
export default function Faq({ headingLevel = "h2" }: FaqProps) {
  const Heading = headingLevel;

  return (
    <section style={{ background: "transparent", padding: "clamp(3rem, 8vw, 6rem) 0" }}>
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
              border: "1px solid rgba(36,85,214,0.25)",
              background: "rgba(36,85,214,0.07)",
              color: "#2455D6",
              fontSize: ".78rem",
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            FAQ
          </span>
          <Heading
            style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text)", lineHeight: 1.1 }}
          >
            Questions <span style={{ color: "#2455D6" }}>fréquentes</span>
          </Heading>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
            >
              <details className="faq-item">
                <summary className="faq-summary">
                  <span>{faq.q}</span>
                  <ChevronDown className="faq-chevron" size={18} aria-hidden />
                </summary>
                <p className="faq-answer">{faq.a}</p>
              </details>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .faq-item {
          background: rgba(var(--surface-rgb),0.03);
          border: 1px solid rgba(var(--surface-rgb),0.07);
          border-radius: 1rem;
          overflow: hidden;
          transition: border-color .3s, background .3s;
        }
        .faq-item[open] {
          background: rgba(36,85,214,0.04);
          border-color: rgba(36,85,214,0.2);
        }
        .faq-summary {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem;
          cursor: pointer;
          text-align: left;
          gap: 1rem;
          color: var(--text);
          font-weight: 600;
          font-size: .95rem;
          line-height: 1.4;
          list-style: none;
        }
        .faq-summary::-webkit-details-marker { display: none; }
        .faq-item[open] .faq-summary { color: #2455D6; }
        .faq-chevron {
          flex-shrink: 0;
          color: rgba(var(--text-rgb),0.4);
          transition: transform .25s, color .25s;
        }
        .faq-item[open] .faq-chevron {
          color: #2455D6;
          transform: rotate(180deg);
        }
        .faq-answer {
          padding: 0 1.5rem 1.4rem;
          color: rgba(var(--text-rgb),0.65);
          font-size: .88rem;
          line-height: 1.7;
        }
      `}</style>
    </section>
  );
}
