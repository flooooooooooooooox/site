import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Cirrion",
  description: "Politique de confidentialité et traitement des données personnelles chez Cirrion.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.cirrion.eu/politique-de-confidentialite" },
};

export default function Confidentialite() {
  return (
    <main>
      <LegalPage
        badge="Confidentialité"
        title="Politique de confidentialité"
        updated="18 juin 2026"
        blocks={[
          {
            heading: "Notre engagement",
            body: [
              "Cirrion accorde une importance particulière à la protection de vos données personnelles, dans le respect du Règlement Général sur la Protection des Données (RGPD).",
              "Vos données sont chiffrées à l'aide de plusieurs clés de cryptage et hébergées sur nos propres serveurs, en France.",
            ],
          },
          {
            heading: "Données collectées",
            body: [
              "Nous collectons uniquement les données nécessaires au fonctionnement du service : informations de compte, données de facturation, ainsi que les documents et échanges que vous traitez via Cirrion (devis, factures, messages).",
            ],
          },
          {
            heading: "Utilisation des données",
            body: [
              "Vos données sont utilisées exclusivement pour fournir et améliorer le service Cirrion. Elles ne sont jamais revendues à des tiers.",
            ],
          },
          {
            heading: "Conservation",
            body: [
              "Vos données sont conservées pendant la durée de votre abonnement, puis supprimées ou anonymisées dans les délais légaux applicables, sauf obligation légale de conservation.",
            ],
          },
          {
            heading: "Vos droits",
            body: [
              "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données.",
              "Pour exercer ces droits, contactez-nous via le formulaire de réservation de démo accessible depuis le bouton « Réserver une démo » en haut de page.",
            ],
          },
          {
            heading: "Cookies",
            body: [
              "Le site peut utiliser des cookies strictement nécessaires à son fonctionnement et, le cas échéant, à la mesure d'audience. Vous pouvez configurer votre navigateur pour les refuser.",
            ],
          },
        ]}
      />
    </main>
  );
}
