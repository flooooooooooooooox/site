import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Support — Cirrion",
  description: "Besoin d'aide ? Contactez le support Cirrion.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.cirrion.eu/support" },
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
              "Notre équipe est à votre écoute pour vous accompagner dans la prise en main de Cirrion et répondre à toutes vos questions.",
            ],
          },
          {
            heading: "Réserver un échange",
            body: [
              "Le plus simple : réservez une démo ou un échange gratuit de 30 minutes depuis le bouton « Réserver une démo » en haut de page. Nous prenons le temps de répondre à toutes vos questions.",
            ],
          },
        ]}
      />
    </main>
  );
}
