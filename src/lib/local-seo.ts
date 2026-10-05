import type { Ville } from "./villes";

// Targeted copy overrides keep experiments independent from the shared city template.
const overrides: Record<string, { title: string; description: string; heading: string; introduction: string }> = {
  nice: {
    title: "Logiciel devis et factures Alpes-Maritimes (06) | Cirrion",
    description: "Artisans à Nice et dans les Alpes-Maritimes : créez vos devis et factures avec Cirrion, depuis WhatsApp ou l’application. Découvrez le logiciel en démo.",
    heading: "Logiciel de devis et factures à Nice et dans les Alpes-Maritimes",
    introduction: "Vous gérez une entreprise du bâtiment à Nice ou dans les Alpes-Maritimes (06) ? Cirrion réunit vos devis et votre facturation dans un logiciel en ligne, accessible depuis le chantier comme au bureau. Créez vos documents depuis WhatsApp ou utilisez vos modèles dans l’application Cirrion ERP.",
  },
};

export function getCitySeo(ville: Ville) {
  return overrides[ville.slug] ?? null;
}
