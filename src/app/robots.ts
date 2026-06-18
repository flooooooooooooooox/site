import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cgv", "/mentions-legales", "/politique-de-confidentialite", "/support"],
    },
    sitemap: "https://floxia.fr/sitemap.xml",
  };
}
