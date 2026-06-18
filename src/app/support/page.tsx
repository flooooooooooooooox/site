import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Support — Floxia",
  description: "Besoin d'aide ? Contactez le support Floxia.",
};

export default function Support() {
  return (
    <main>
      <LegalPage
        badge="Aide"
        title="Support"
        updated="18 juin 2026"
        blocks={[
          {
            heading: "Une question, un besoin d'aide ?",
            body: [
              "Notre équipe est à votre écoute pour vous accompagner dans la prise en main de Floxia et répondre à toutes vos questions.",
            ],
          },
          {
            heading: "Par e-mail",
            body: ["Écrivez-nous à contact@floxia.fr — nous répondons sous 24h ouvrées."],
          },
          {
            heading: "Réserver un échange",
            body: [
              "Vous préférez en parler de vive voix ? Réservez une démo ou un échange gratuit de 30 minutes depuis le bouton « Réserver une démo » en haut de page.",
            ],
          },
        ]}
      />
    </main>
  );
}
