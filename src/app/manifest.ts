import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cirrion — ERP IA pour artisans du bâtiment",
    short_name: "Cirrion",
    description:
      "Créez vos devis et factures depuis WhatsApp ou sur l'application Cirrion ERP. Logiciel IA pour artisans et PME du bâtiment.",
    start_url: "/",
    display: "standalone",
    background_color: "#EFF4FF",
    theme_color: "#2455D6",
    lang: "fr",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
    ],
  };
}
