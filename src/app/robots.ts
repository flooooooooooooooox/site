import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cgv", "/support"],
    },
    sitemap: "https://florianai.fr/sitemap.xml",
  };
}
