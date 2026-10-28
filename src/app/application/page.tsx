import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "Cirrion — Application de gestion administrative et préparation comptable",
  description:
    "Application Cirrion pour artisans et petites entreprises : devis, factures, relances, dépenses et suivi de l'activité. Découvrez la gestion administrative et la préparation comptable.",
  alternates: { canonical: "https://www.cirrion.eu/application" },
});

export default function ApplicationPage() {
  return (
    <main
      style={{
        maxWidth: "44rem",
        margin: "0 auto",
        padding: "8rem 6vw 5rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-nunito)",
          fontWeight: 900,
          fontSize: "2.6rem",
          color: "var(--text)",
          marginBottom: "1.5rem",
        }}
      >
        Cirrion
      </h1>

      <p style={{ color: "rgba(var(--text-rgb),0.8)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        Cirrion est une application de gestion destinée aux artisans, aux indépendants et aux petites entreprises.
        Son objectif : créer vos devis et vos factures, les envoyer à vos clients et automatiser
        le suivi de votre activité, afin de réduire le temps que vous passez sur l&apos;administratif.
      </p>

      <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.3rem", color: "var(--text)", marginBottom: "0.8rem" }}>
        Ce que fait l&apos;application Cirrion
      </h2>
      <ul style={{ color: "rgba(var(--text-rgb),0.75)", fontSize: "1rem", lineHeight: 1.9, paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
        <li>Création de devis et de factures professionnels (y compris depuis un message vocal WhatsApp).</li>
        <li>Envoi automatique de vos devis, factures et e-mails professionnels à vos clients par e-mail, via votre compte Gmail, en votre nom.</li>
        <li>Relances automatiques des devis non signés et des factures impayées.</li>
        <li>Regroupement de vos e-mails professionnels par conversation, classement par catégories et préparation de réponses que vous relisez avant de les envoyer, dans le ton que vous choisissez.</li>
        <li>Fiche de chaque client : devis, factures archivées, documents et notes que vous y ajoutez (par exemple un code d&apos;immeuble).</li>
        <li>Signature électronique des devis.</li>
        <li>Suivi de vos chantiers, de vos dépenses et de votre chiffre d&apos;affaires.</li>
        <li>Préparation des informations nécessaires au suivi comptable, selon le périmètre défini dans votre accompagnement.</li>
      </ul>

      <h2 style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.3rem", color: "var(--text)", marginBottom: "0.8rem" }}>
        Utilisation de votre compte Google
      </h2>
      <p style={{ color: "rgba(var(--text-rgb),0.75)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
        Cirrion se connecte à votre compte Gmail pour envoyer, en votre nom, les documents que vous créez
        dans l&apos;application (devis, factures, e-mails professionnels et relances), et pour afficher vos
        e-mails professionnels sous forme de conversations, les classer par catégories et préparer des réponses.
        Aucune réponse ne part sans que vous l&apos;ayez validée. Vos données ne servent qu&apos;au fonctionnement
        du service, conformément à notre politique de confidentialité.
      </p>

      <p style={{ margin: "1.5rem 0", lineHeight: 1.8 }}><Link href="/gestion-comptabilite" style={{ color: "#2455D6" }}>Comprendre la gestion et la comptabilité avec Cirrion</Link></p>

      <p style={{ color: "rgba(var(--text-rgb),0.6)", fontSize: "0.95rem", lineHeight: 1.8 }}>
        <Link href="/politique-de-confidentialite" style={{ color: "#2455D6", textDecoration: "underline" }}>
          Politique de confidentialité
        </Link>
        {" · "}
        <Link href="/mentions-legales" style={{ color: "#2455D6", textDecoration: "underline" }}>
          Mentions légales
        </Link>
        {" · "}
        <Link href="/" style={{ color: "#2455D6", textDecoration: "underline" }}>
          Découvrir Cirrion
        </Link>
      </p>
    </main>
  );
}
