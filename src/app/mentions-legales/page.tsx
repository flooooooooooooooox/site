import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales — Floxia",
  description: "Mentions légales du site Floxia.",
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
              "Le présent site est édité par Floxia.",
              "Pour toute question relative aux informations légales (raison sociale, forme juridique, numéro SIREN/SIRET, capital social, adresse du siège), vous pouvez nous joindre via le formulaire de réservation de démo accessible depuis le bouton « Réserver une démo » en haut de page.",
            ],
          },
          {
            heading: "Directeur de la publication",
            body: ["Le directeur de la publication est le représentant légal de Floxia."],
          },
          {
            heading: "Hébergement",
            body: [
              "Les données et l'application Floxia sont hébergées sur des serveurs gérés par Floxia, situés en France.",
              "Le site vitrine est déployé via la plateforme d'hébergement Vercel.",
            ],
          },
          {
            heading: "Propriété intellectuelle",
            body: [
              "L'ensemble des éléments du site (textes, logos, marques, visuels, interface) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de Floxia.",
              "Toute reproduction, représentation ou exploitation, totale ou partielle, sans autorisation préalable écrite, est interdite.",
            ],
          },
          {
            heading: "Contact",
            body: ["Pour toute demande, utilisez le formulaire de réservation de démo accessible depuis le bouton « Réserver une démo » en haut de page."],
          },
        ]}
      />
    </main>
  );
}
