import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://floxia.fr";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/qui-sommes-nous`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Ressources (blog)
    { url: `${base}/ressources`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/ressources/devis-depuis-whatsapp`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/modele-devis-batiment`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/logiciel-erp-batiment`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/automatisation-artisan-batiment`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/relances-devis-artisan`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ressources/facturation-electronique-2026`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    // Pages par métier
    { url: `${base}/artisans`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/artisans/electricien`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/plombier`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/macon`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/peintre`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
