import type { MetadataRoute } from "next";
import { VILLES } from "@/lib/villes";
import { METIERS } from "@/lib/metiers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.cirrion.eu";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/qui-sommes-nous`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/comparatif`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/roi`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/entreprise-nettoyage`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/pointage-preuve-de-passage`, changeFrequency: "monthly", priority: 0.85 },
    // Ressources (blog)
    { url: `${base}/ressources`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/ressources/pourquoi-jai-cree-cirrion`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ressources/automatiser-facturation-avant-2026`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ressources/devis-depuis-whatsapp`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/modele-devis-batiment`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/logiciel-erp-batiment`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/automatisation-artisan-batiment`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/relances-devis-artisan`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ressources/facturation-electronique-2026`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/tarif-horaire-artisan-batiment`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/ressources/tva-travaux-renovation`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/logiciel-auto-entrepreneur-batiment`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/devis-signe-valeur-legale`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/acompte-devis-artisan`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/ressources/logiciel-devis-gratuit-artisan`, changeFrequency: "monthly", priority: 0.75 },
    // Pages par métier
    { url: `${base}/artisans`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/artisans/electricien`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/plombier`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/chauffagiste`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/macon`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/peintre`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/menuisier`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/couvreur`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/carreleur`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/artisans/plaquiste`, changeFrequency: "monthly", priority: 0.8 },
    // Alternatives / comparatifs
    { url: `${base}/alternatives`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/alternatives/cirrion-vs-obat`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/alternatives/alternative-batigest`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/alternatives/alternative-sage`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/alternatives/alternative-ebp`, changeFrequency: "monthly", priority: 0.75 },
    // Page B2B / entreprises
    { url: `${base}/logiciel-gestion-entreprise-batiment`, changeFrequency: "monthly", priority: 0.85 },
    // Brand / presse
    { url: `${base}/presse`, changeFrequency: "monthly", priority: 0.75 },
    // Pages villes (index)
    { url: `${base}/logiciel-batiment`, changeFrequency: "monthly", priority: 0.8 },
    // Page index devis par métier × ville
    { url: `${base}/logiciel-devis`, changeFrequency: "monthly", priority: 0.82 },
    // Serrurier (ajouté aux artisans)
    { url: `${base}/artisans/serrurier`, changeFrequency: "monthly", priority: 0.8 },
    // Pages légales — indexables, signal de confiance (E-E-A-T)
    { url: `${base}/mentions-legales`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politique-de-confidentialite`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cgv`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const villePages: MetadataRoute.Sitemap = VILLES.map((v) => ({
    url: `${base}/logiciel-batiment/${v.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const matrixPages: MetadataRoute.Sitemap = METIERS.flatMap((m) =>
    VILLES.map((v) => ({
      url: `${base}/logiciel-devis/${m.slug}/${v.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }))
  );

  return [...staticPages, ...villePages, ...matrixPages];
}
