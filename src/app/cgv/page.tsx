import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Conditions générales de vente — Cirrion",
  description: "Conditions générales de vente des services Cirrion.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://florianai.fr/cgv" },
};

export default function Cgv() {
  return (
    <main>
      <LegalPage
        badge="Légal"
        title="Conditions générales de vente"
        updated="18 juin 2026"
        blocks={[
          {
            heading: "1. Objet",
            body: [
              "Les présentes conditions générales de vente (CGV) régissent l'accès et l'utilisation des services Cirrion, solution de gestion et d'automatisation destinée aux artisans et PME du bâtiment.",
              "Toute souscription à un abonnement implique l'acceptation pleine et entière des présentes CGV.",
            ],
          },
          {
            heading: "2. Offres et tarifs",
            body: [
              "Cirrion propose plusieurs formules d'abonnement mensuel (Essentiel, Artisan Pro, PME Premium), auxquelles s'ajoutent des frais de mise en service (setup) facturés une seule fois.",
              "Les tarifs en vigueur sont ceux affichés sur le site au moment de la souscription. Ils sont indiqués en euros et hors taxes éventuelles applicables.",
            ],
          },
          {
            heading: "3. Durée et résiliation",
            body: [
              "L'abonnement est souscrit pour une durée initiale, puis reconduit par périodes successives.",
              "La résiliation peut être demandée dans les conditions prévues lors de la souscription. Les frais de mise en service ne sont pas remboursables.",
            ],
          },
          {
            heading: "4. Paiement",
            body: [
              "Le paiement s'effectue par les moyens proposés lors de la souscription. En cas de défaut de paiement, l'accès au service peut être suspendu après mise en demeure restée sans effet.",
            ],
          },
          {
            heading: "5. Responsabilité",
            body: [
              "Cirrion met en œuvre les moyens nécessaires pour assurer la disponibilité et la sécurité du service. La responsabilité de Cirrion ne saurait être engagée en cas de force majeure ou de mauvaise utilisation du service par le client.",
            ],
          },
          {
            heading: "6. Contact",
            body: ["Pour toute question relative aux présentes CGV, vous pouvez nous joindre via le formulaire de réservation de démo accessible depuis le bouton « Réserver une démo » en haut de page."],
          },
        ]}
      />
    </main>
  );
}
