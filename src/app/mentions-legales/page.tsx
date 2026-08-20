import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales — Cirrion",
  description: "Mentions légales du site Cirrion.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.cirrion.eu/mentions-legales" },
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
              "Le présent site est édité par Florian Gagnebien — EI, exerçant sous le nom commercial « Cirrion ».",
              "Forme juridique : entrepreneur individuel, relevant du régime de la micro-entreprise.",
              "Adresse de l'établissement : 108 rue de Falaise, 14000 Caen, France.",
              "SIREN : 108 915 943 — SIRET : 108 915 943 00014 — Code APE : 8211Z.",
              "Immatriculation au Registre national des entreprises (RNE) le 20 août 2026.",
              "TVA : non applicable, article 293 B du Code général des impôts (franchise en base).",
              "Contact : contact@cirrion.eu — 06 33 79 05 42.",
            ],
          },
          {
            heading: "Directeur de la publication",
            body: [
              "Le directeur de la publication est Florian Gagnebien, entrepreneur individuel.",
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
