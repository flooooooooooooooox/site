import type { MetadataRoute } from "next";
import { VILLES } from "@/lib/villes";
import { METIERS } from "@/lib/metiers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://florianai.fr";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/qui-sommes-nous`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/comparatif`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/entreprise-nettoyage`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    // Ressources (blog)
    { url: `${base}/ressources`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/ressources/devis-depuis-whatsapp`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/modele-devis-batiment`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/logiciel-erp-batiment`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/automatisation-artisan-batiment`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/relances-devis-artisan`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ressources/facturation-electronique-2026`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/tarif-horaire-artisan-batiment`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ressources/tva-travaux-renovation`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/logiciel-auto-entrepreneur-batiment`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/devis-signe-valeur-legale`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/acompte-devis-artisan`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/logiciel-devis-gratuit-artisan`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    // Pages par métier
    { url: `${base}/artisans`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/artisans/electricien`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/plombier`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/chauffagiste`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/macon`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/peintre`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/menuisier`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/couvreur`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/carreleur`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/plaquiste`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Alternatives / comparatifs
    { url: `${base}/alternatives`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/alternatives/cirrion-vs-obat`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/alternatives/alternative-batigest`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/alternatives/alternative-sage`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/alternatives/alternative-ebp`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    // Page B2B / entreprises
    { url: `${base}/logiciel-gestion-entreprise-batiment`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    // Brand / presse
    { url: `${base}/presse`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    // Pages villes (index)
    { url: `${base}/logiciel-batiment`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Page index devis par métier × ville
    { url: `${base}/logiciel-devis`, lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    // Serrurier (ajouté aux artisans)
    { url: `${base}/artisans/serrurier`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const villePages: MetadataRoute.Sitemap = VILLES.map((v) => ({
    url: `${base}/logiciel-batiment/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const matrixPages: MetadataRoute.Sitemap = METIERS.flatMap((m) =>
    VILLES.map((v) => ({
      url: `${base}/logiciel-devis/${m.slug}/${v.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }))
  );

  return [...staticPages, ...villePages, ...matrixPages];
}
