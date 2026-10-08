"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Comment faire un devis avec Cirrion ?",
    a: "De deux façons. Sur WhatsApp : vous dictez le chantier dans un vocal, ou vous l'écrivez, et le devis en PDF est prêt en moins de 3 minutes. Ou sur ordinateur, avec l'application Cirrion (ce qu'on appelle un ERP : le logiciel qui range tout votre administratif au même endroit). Vous y reprenez vos propres modèles de devis et vous les ajustez en quelques clics. Vous choisissez ce qui vous arrange.",
  },
  {
    q: "Peut-on faire un devis sur ordinateur, sans passer par WhatsApp ?",
    a: "Oui. Sur ordinateur, vous créez vos modèles de devis une fois, adaptés à votre métier, puis il ne reste qu'à changer les quantités et les prix. Ce n'est pas du vocal : tout se fait à l'écran, avec vos prix et vos modèles déjà enregistrés.",
  },
  {
    q: "Comment ça marche avec WhatsApp ?",
    a: "Cirrion se branche sur le numéro WhatsApp Business que vous avez déjà, par le canal officiel de WhatsApp. Rien de plus à installer : vous utilisez WhatsApp comme d'habitude, et Cirrion s'occupe des devis et des factures derrière. Vous pouvez aussi tout faire sur ordinateur.",
  },
  {
    q: "Combien de temps pour un devis ?",
    a: "Moins de 3 minutes depuis WhatsApp : vous décrivez le chantier, et le devis sort avec votre logo, vos prix et la bonne TVA (5,5 %, 10 % ou 20 %). Sur ordinateur c'est encore plus rapide, grâce à vos modèles.",
  },
  {
    q: "Et la facture électronique obligatoire ?",
    a: "Elle est en place depuis le 1er septembre 2026 : toutes les entreprises doivent pouvoir recevoir des factures électroniques. Les grandes entreprises les envoient aussi depuis cette date. Pour les petites entreprises et les artisans, l'obligation d'envoyer ces factures commence le 1er septembre 2027. Cirrion prépare vos factures pour ça, et elles partent par une plateforme agréée par l'administration.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Oui. Elles sont chiffrées et hébergées sur nos serveurs, en France. Elles ne sont jamais revendues, et vous les récupérez quand vous voulez.",
  },
  {
    q: "Je peux m'en servir depuis mon téléphone, sur le chantier ?",
    a: "Oui. Sur le terrain, tout se fait depuis WhatsApp sur votre téléphone : faire un devis, envoyer une facture, voir un chantier. Pas besoin d'ouvrir un ordinateur. Au bureau, l'application vous donne la vue d'ensemble, avec vos modèles de devis et votre tableau de bord.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Il n'y a qu'une seule offre : le logiciel et la comptabilité sont compris, sans option à cocher. Le prix dépend de votre activité et de la taille de votre équipe. Demandez votre devis : on vous répond sous 24 h avec un prix précis.",
  },
  {
    q: "Ça marche pour tous les métiers du bâtiment ?",
    a: "Oui : électriciens, plombiers, maçons, peintres, menuisiers, carreleurs, couvreurs… Cirrion connaît le vocabulaire de chaque métier et sait quelle TVA appliquer selon les travaux. Vous gardez vos propres modèles de devis, adaptés au vôtre.",
  },
  {
    q: "Et si je n'ai pas de réseau sur le chantier ?",
    a: "Il faut une connexion pour envoyer un vocal ou ouvrir l'application. WhatsApp passe en 4G ou 5G, même quand le réseau est faible. Vous pouvez donc faire un devis presque partout.",
  },
  {
    q: "Comment je dicte un devis sur WhatsApp ?",
    a: "Vous envoyez un vocal comme à un collègue : « devis pour Mme Durand, remplacement du tableau électrique, 6 heures de main-d'œuvre, environ 400 euros de matériel ». Cirrion écoute, repère les prestations, met la bonne TVA et sort le devis en PDF avec votre logo, en moins de 3 minutes. Vous vérifiez, et il part chez le client pour signature.",
  },
  {
    q: "Quel est le meilleur logiciel de devis pour un artisan ?",
    a: "Ça dépend de votre façon de travailler. Si vous êtes surtout sur chantier et que vous voulez faire un devis sans ouvrir d'ordinateur, un outil qu'on pilote avec WhatsApp comme Cirrion est le plus pratique. Si vous avez un bureau d'études et des métrés compliqués, un logiciel comme Obat ou Batigest reste bien. Dans tous les cas, vérifiez qu'il est prêt pour la facture électronique obligatoire.",
  },
  {
    q: "Quelle intelligence artificielle derrière, et mes données partent-elles à l'étranger ?",
    a: "Non, elles restent en Europe. Cirrion utilise Mistral AI, une intelligence artificielle française, pour comprendre ce que vous dites, et ElevenLabs pour la voix. Tout est hébergé en France, sur nos serveurs. Vos prix, vos clients et vos marges ne passent pas par des serveurs hors Union européenne.",
  },
  {
    q: "Comment je passe d'Obat, Batigest ou EBP à Cirrion ?",
    a: "En trois temps, et on le fait avec vous : on récupère votre liste de clients et vos prix, on règle vos taux de TVA et vos modèles de devis, puis on branche votre WhatsApp et votre banque. Vous ne repartez pas de zéro et vous ne retapez rien.",
  },
  {
    q: "Est-ce que Cirrion remplace mon comptable ?",
    a: "Oui, pour le quotidien. L'abonnement couvre toute votre comptabilité : vos tickets et factures sont photographiés et rangés, votre banque est rapprochée de vos factures, la TVA est préparée et envoyée aux impôts, les fiches de paie sont faites avec OpenPaye, et le bilan de fin d'année est signé par Clementine, un cabinet d'expertise comptable inscrit à l'Ordre. La loi réserve cette signature à un professionnel inscrit, et nous ne prétendons pas le contraire. Vous payez un seul abonnement, sans honoraires en plus au moment du bilan, et le Copilote Cirrion répond à vos questions sur vos chiffres à toute heure.",
  },
  {
    q: "Combien de temps je gagne vraiment ?",
    a: "Pour un artisan qui fait une quinzaine de devis et de factures par mois, la paperasse prend en général 8 à 12 heures par mois : saisies, relances, classement, impayés. Avec Cirrion, l'essentiel se fait sans vous. Ce n'est pas que la paperasse disparaît, c'est qu'elle n'a plus besoin de vous.",
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
