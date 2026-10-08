import type { Metadata } from "next";

export const SITE_URL = "https://www.cirrion.eu";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_ID = `${SITE_URL}/#software`;
export const PRODUCT_IMAGE = `${SITE_URL}/dashboard-cirrion.jpg`;
export const organizationReference = {
  "@type": "Organization", "@id": ORGANIZATION_ID, name: "Cirrion", url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
};

/** Page titles own their brand; every sharing card describes the actual page. */
export function pageMetadata(input: Metadata): Metadata {
  const raw = typeof input.title === "string"
    ? input.title
    : input.title && ("absolute" in input.title ? input.title.absolute : input.title.default);
  if (!raw) return input;
  const title = /\bcirrion\b/i.test(raw) ? raw : `${raw} | Cirrion`;
  const canonical = input.alternates?.canonical;
  const url = typeof canonical === "string" ? new URL(canonical, SITE_URL).href
    : canonical instanceof URL ? canonical.href : input.openGraph?.url;
  return {
    ...input,
    title: { absolute: title },
    openGraph: {
      type: "website", locale: "fr_FR", siteName: "Cirrion",
      images: [{ url: PRODUCT_IMAGE, alt: "Tableau de bord Cirrion" }],
      ...input.openGraph,
      title: input.openGraph?.title ?? title,
      description: input.openGraph?.description ?? input.description ?? undefined,
      url,
    },
    twitter: {
      card: "summary_large_image", images: [PRODUCT_IMAGE], ...input.twitter,
      title: input.twitter?.title ?? title,
      description: input.twitter?.description ?? input.description ?? undefined,
    },
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Public identity already displayed by the site; no invented reviews or prices. */
export const identityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": ORGANIZATION_ID,
      name: "Cirrion", alternateName: "CirrionOS", url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
      image: PRODUCT_IMAGE,
      description: "Logiciel de devis, facturation et gestion pour artisans du bâtiment et TPE de services, accessible depuis WhatsApp et l’application web.",
      founder: { "@id": `${SITE_URL}/#founder` },
      areaServed: { "@type": "Country", name: "France" },
      address: { "@type": "PostalAddress", addressLocality: "Caen", addressRegion: "Normandie", addressCountry: "FR" },
      contactPoint: { "@type": "ContactPoint", contactType: "sales", url: "https://calendly.com/cirrion-pro/30min", availableLanguage: "fr" },
      sameAs: ["https://www.linkedin.com/in/cirrion-pro-9360333aa", "https://www.instagram.com/floxia.pro"],
    },
    {
      "@type": "Person", "@id": `${SITE_URL}/#founder`,
      name: "Florian Gagnebien", jobTitle: "Fondateur de Cirrion",
      url: `${SITE_URL}/qui-sommes-nous`, worksFor: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "WebSite", "@id": WEBSITE_ID, name: "Cirrion", url: SITE_URL,
      inLanguage: "fr-FR", publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

/** The software is described on its product page, rather than every article. */
export const softwareJsonLd = {
  "@context": "https://schema.org", "@type": "SoftwareApplication", "@id": SOFTWARE_ID,
  name: "Cirrion", url: `${SITE_URL}/`, image: PRODUCT_IMAGE,
  applicationCategory: "BusinessApplication", operatingSystem: "Web",
  inLanguage: "fr-FR", publisher: { "@id": ORGANIZATION_ID },
  description: "Logiciel de devis et facturation pour artisans et entreprises du bâtiment. Création de devis depuis WhatsApp ou l’application web, suivi des chantiers et relances.",
  featureList: ["Devis depuis WhatsApp", "Modèles de devis réutilisables", "Facturation", "Relances", "Suivi des chantiers et des équipes"],
};
