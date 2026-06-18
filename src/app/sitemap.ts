import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://floxia.fr";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/qui-sommes-nous`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ressources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/ressources/devis-depuis-whatsapp`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ressources/logiciel-erp-batiment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ressources/automatisation-artisan-batiment`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
