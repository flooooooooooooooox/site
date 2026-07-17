import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Floxia — ERP IA pour artisans du bâtiment",
    short_name: "Floxia",
    description:
      "Créez vos devis et factures depuis WhatsApp ou sur l'application Floxia ERP. Logiciel IA pour artisans et PME du bâtiment.",
    start_url: "/",
    display: "standalone",
    background_color: "#05080D",
    theme_color: "#2455D6",
    lang: "fr",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
