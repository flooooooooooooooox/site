import type { Metadata } from "next";
import Link from "next/link";
import PointageSection from "@/components/sections/PointageSection";

export const metadata: Metadata = {
  title: "Logiciel de pointage et preuve de passage pour sous-traitants — Cirrion",
  description:
    "Pointage sur site par QR code et géolocalisation, check-list obligatoire, photos horodatées prises dans l'application, clôture bloquée si l'intervention est incomplète. Vos clients suivent le travail en temps réel. Hébergé en France.",
  keywords: [
    "logiciel pointage sous-traitant",
    "preuve de passage",
    "logiciel pointage nettoyage",
    "contrôle qualité sous-traitant",
    "QR code pointage chantier",
    "pointage géolocalisé salarié",
    "check-list intervention nettoyage",
    "application contrôle prestation",
    "rapport d'intervention automatique",
    "suivi intervention temps réel client",
    "logiciel entreprise de nettoyage",
    "preuve de réalisation prestation",
    "anti-litige prestation nettoyage",
  ],
  openGraph: {
    title: "Pointage et preuve de passage pour sous-traitants — Cirrion",
    description:
      "Aucune intervention ne se clôture sans preuve de passage ni preuve de réalisation. QR code, géolocalisation, photos horodatées, suivi client en temps réel.",
    url: "https://www.cirrion.eu/pointage-preuve-de-passage",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pointage et preuve de passage — Cirrion",
    description: "QR code, géolocalisation, check-list bloquante, photos horodatées, suivi client en direct.",
  },
  alternates: { canonical: "https://www.cirrion.eu/pointage-preuve-de-passage" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pointage & preuve de passage",
      item: "https://www.cirrion.eu/pointage-preuve-de-passage",
    },
  ],
};

const moduleJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cirrion — Pointage & preuve de passage",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Contrôle qualité et suivi d'interventions",
  operatingSystem: "Web, iOS, Android",
  url: "https://www.cirrion.eu/pointage-preuve-de-passage",
  inLanguage: "fr-FR",
  countriesSupported: "FR",
  description:
    "Module de pointage sur site et de preuve de passage pour les entreprises qui font intervenir des sous-traitants : QR code ou code à 8 chiffres, contrôle de la géolocalisation, check-list paramétrable par site, photos horodatées prises dans l'application, blocage de la clôture si l'intervention est incomplète, espace client en temps réel.",
  featureList: [
    "Pointage par QR code ou code à 8 chiffres",
    "Vérification de la géolocalisation contre un périmètre défini",
    "Check-list de missions et sous-missions paramétrable par site",
    "Photos imposées depuis l'appareil photo de l'application",
    "Classement automatique des photos par client, prestation et objet",
    "Signalement d'anomalies avec photo et commentaire",
    "Clôture impossible tant que l'intervention est incomplète",
    "Alerte automatique en cas de retard ou d'intervention non commencée",
    "Espace client avec suivi en temps réel et rapport téléchargeable",
    "Onglet Cours : vidéos, images et fiches écrites déposées par l'administrateur pour ses équipes",
  ],
  offers: {
    "@type": "Offer",
    name: "PME Premium",
    price: "349",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  },
  provider: { "@type": "Organization", name: "Cirrion", url: "https://www.cirrion.eu" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment prouver qu'un sous-traitant est bien passé sur un site ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'intervenant scanne un QR code posé sur le site, ou saisit le code à 8 chiffres qui lui correspond. L'application vérifie en même temps sa géolocalisation contre le périmètre défini par l'administrateur pour ce site. La date, l'heure, l'identité et le chantier sont enregistrés automatiquement, et le pointage ne démarre pas si les conditions ne sont pas réunies.",
      },
    },
    {
      "@type": "Question",
      name: "Un sous-traitant peut-il envoyer d'anciennes photos depuis sa galerie ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Les photos doivent être prises depuis l'appareil photo de l'application : l'accès à la galerie du téléphone est bloqué. Chaque cliché est horodaté et classé automatiquement par client, prestation et objet, puis devient visible par le client sans attendre la fin de l'intervention.",
      },
    },
    {
      "@type": "Question",
      name: "Que se passe-t-il si la check-list n'est pas terminée ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'intervention ne peut pas être clôturée. L'application vérifie que toutes les tâches obligatoires sont validées, que toutes les photos attendues sont présentes, que le QR code ou le code du site a été utilisé et que la position GPS est conforme. S'il manque une condition, la validation reste impossible.",
      },
    },
    {
      "@type": "Question",
      name: "Que voit le client final ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le client dispose de son propre espace en ligne où il suit l'avancement de l'intervention en temps réel, consulte les photos au fur et à mesure, télécharge le rapport d'intervention et peut signaler un problème. L'historique complet reste consultable et exportable.",
      },
    },
    {
      "@type": "Question",
      name: "Le sous-traitant est-il géolocalisé en permanence ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. La position n'est relevée qu'au moment du pointage, pour vérifier la présence sur le site de l'intervention. Il n'y a pas de suivi des déplacements entre deux chantiers. Les données sont hébergées en France et conservées conformément au RGPD.",
      },
    },
  ],
};

const CIBLES = [
  {
    titre: "Entreprises de nettoyage",
    texte:
      "Bureaux, parties communes, sanitaires : la preuve de passage sécurise vos contrats et coupe court aux réclamations « personne n'est venu ».",
  },
  {
    titre: "Sociétés de services multi-sites",
    texte:
      "Chaque site a son QR code, son périmètre et sa propre check-list. Vous pilotez toutes les interventions depuis un seul tableau de bord.",
  },
  {
    titre: "Entreprises du bâtiment avec sous-traitants",
    texte:
      "Suivez les passages sur vos chantiers, récupérez les photos horodatées et gardez une trace de chaque anomalie signalée.",
  },
];

export default function PointagePage() {
  return (
    <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(moduleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* En-tête */}
      <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "8rem 6vw 0" }}>
        <span style={{
          display: "inline-block", padding: "5px 16px", borderRadius: "999px",
          border: "1px solid rgba(36,85,214,0.25)", background: "rgba(36,85,214,0.07)",
          color: "#2455D6", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em",
          textTransform: "uppercase", marginBottom: "1.2rem",
        }}>
          Module PME Premium
        </span>
        <h1 style={{
          fontFamily: "var(--font-nunito)", fontWeight: 900,
          fontSize: "clamp(2rem,4.5vw,3.2rem)", color: "var(--text)",
          lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.2rem",
        }}>
          Pointage sur site et <span style={{ color: "#2455D6" }}>preuve de passage</span> pour vos sous-traitants
        </h1>
        <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: "1.08rem", lineHeight: 1.8, maxWidth: "44rem" }}>
          « Personne n&apos;est passé », « le ménage n&apos;a pas été fait » : ces réclamations
          coûtent des contrats, et elles se règlent rarement à l&apos;amiable faute de preuve.
          Cirrion en produit une à chaque intervention — présence vérifiée sur place, tâches
          cochées une par une, photos horodatées prises sur le terrain — et met le tout sous
          les yeux de votre client pendant que le travail se fait.
        </p>
      </div>

      {/* La fenêtre interactive, réutilisée depuis la page d'accueil */}
      <PointageSection />

      {/* Pour qui */}
      <section style={{ maxWidth: "60rem", margin: "0 auto", padding: "clamp(2rem,5vh,4rem) 6vw" }}>
        <h2 style={{
          fontFamily: "var(--font-nunito)", fontWeight: 900,
          fontSize: "clamp(1.5rem,3vw,2.1rem)", color: "var(--text)", marginBottom: "1.8rem",
        }}>
          Pour quelles entreprises ?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
          {CIBLES.map((c) => (
            <div key={c.titre} style={{
              background: "rgba(var(--surface-rgb),0.04)",
              border: "1px solid rgba(var(--surface-rgb),0.08)",
              borderRadius: "1.25rem", padding: "1.6rem",
            }}>
              <h3 style={{
                fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.05rem",
                color: "var(--text)", marginBottom: "0.6rem",
              }}>
                {c.titre}
              </h3>
              <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: "0.92rem", lineHeight: 1.65 }}>
                {c.texte}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Géolocalisation & RGPD */}
      <section style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 6vw clamp(2rem,5vh,4rem)" }}>
        <div style={{
          background: "rgba(36,85,214,0.05)",
          border: "1px solid rgba(36,85,214,0.16)",
          borderRadius: "1.25rem", padding: "1.8rem",
        }}>
          <h2 style={{
            fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.15rem",
            color: "var(--text)", marginBottom: "0.8rem",
          }}>
            Géolocalisation : ponctuelle, jamais continue
          </h2>
          <p style={{ color: "rgba(var(--text-rgb),0.7)", fontSize: "0.95rem", lineHeight: 1.75 }}>
            La position n&apos;est relevée qu&apos;au moment du pointage, uniquement pour vérifier la
            présence sur le site de l&apos;intervention. Aucun suivi des déplacements entre deux
            chantiers n&apos;est effectué. Les données et les photos sont hébergées en France, et
            l&apos;historique reste exportable à tout moment.
          </p>
        </div>
      </section>

      {/* Questions fréquentes */}
      <section style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 6vw clamp(2rem,5vh,4rem)" }}>
        <h2 style={{
          fontFamily: "var(--font-nunito)", fontWeight: 900,
          fontSize: "clamp(1.5rem,3vw,2.1rem)", color: "var(--text)", marginBottom: "1.8rem",
        }}>
          Questions fréquentes
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {faqJsonLd.mainEntity.map((q) => (
            <div key={q.name}>
              <h3 style={{
                fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "1rem",
                color: "var(--text)", marginBottom: "0.5rem",
              }}>
                {q.name}
              </h3>
              <p style={{ color: "rgba(var(--text-rgb),0.68)", fontSize: "0.93rem", lineHeight: 1.75 }}>
                {q.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 6vw clamp(4rem,8vh,6rem)", textAlign: "center" }}>
        <div style={{
          background: "rgba(36,85,214,0.06)", border: "1px solid rgba(36,85,214,0.18)",
          borderRadius: "1.25rem", padding: "2.4rem 2rem",
        }}>
          <h2 style={{
            fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "clamp(1.3rem,2.6vw,1.7rem)",
            color: "var(--text)", marginBottom: "0.8rem",
          }}>
            Voir le module sur vos propres sites
          </h2>
          <p style={{ color: "rgba(var(--text-rgb),0.65)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.6rem" }}>
            30 minutes pour vous montrer le pointage, la check-list et l&apos;espace client en conditions réelles.
          </p>
          <a
            href="https://calendly.com/afele1845/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.95rem 2rem", borderRadius: "0.85rem",
              background: "#2455D6", color: "#FFFFFF", fontWeight: 700,
              fontSize: "0.92rem", textDecoration: "none",
            }}
          >
            Réserver une démo gratuite →
          </a>
          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/comparatif" style={{ color: "#2455D6", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
              Comparer Cirrion aux autres logiciels →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
