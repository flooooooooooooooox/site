import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales — Cirrion",
  description: "Mentions légales du site Cirrion.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://florianai.fr/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <main>
      <LegalPage
        badge="Légal"
        title="Mentions légales"
        updated="18 juin 2026"
        blocks={[
          {
            heading: "Éditeur du site",
            body: [
              "Le présent site est édité par Cirrion.",
              "Raison sociale : Cirrion — [forme juridique à compléter : ex. SAS, EI, micro-entreprise].",
              "Capital social : [montant à compléter, le cas échéant].",
              "Siège social : [adresse complète à compléter].",
              "Immatriculation : SIREN/SIRET [numéro à compléter] — RCS [ville à compléter].",
              "Numéro de TVA intracommunautaire : [à compléter, le cas échéant].",
            ],
          },
          {
            heading: "Directeur de la publication",
            body: [
              "Le directeur de la publication est le représentant légal de Cirrion : Florian [nom à compléter].",
            ],
          },
          {
            heading: "Hébergement",
            body: [
              "Les données et l'application Cirrion sont hébergées sur des serveurs gérés par Cirrion, situés en France.",
              "Le site vitrine est déployé via la plateforme d'hébergement Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis).",
            ],
          },
          {
            heading: "Propriété intellectuelle",
            body: [
              "L'ensemble des éléments du site (textes, logos, marques, visuels, interface) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de Cirrion.",
              "Toute reproduction, représentation ou exploitation, totale ou partielle, sans autorisation préalable écrite, est interdite.",
            ],
          },
          {
            heading: "Données personnelles",
            body: [
              "Le traitement des données personnelles est détaillé dans notre Politique de confidentialité, accessible depuis le pied de page.",
              "Conformément au RGPD, vous disposez de droits d'accès, de rectification et d'effacement de vos données.",
            ],
          },
          {
            heading: "Contact",
            body: [
              "Pour toute demande, utilisez le formulaire de réservation de démo accessible depuis le bouton « Réserver une démo » en haut de page.",
            ],
          },
        ]}
      />
    </main>
  );
}
