import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis chauffagiste WhatsApp — Floxia | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour chauffagistes. Créez vos devis chauffage depuis WhatsApp ou sur l'application Floxia ERP : pompe à chaleur, chaudière, RGE, e-facturation 2026.",
  keywords: ["logiciel devis chauffagiste", "devis chauffagiste WhatsApp", "logiciel chauffage", "ERP chauffagiste", "devis pompe à chaleur RGE"],
  openGraph: {
    title: "Logiciel devis chauffagiste — Floxia",
    description: "Devis chauffage depuis WhatsApp ou sur l'application Floxia ERP. Pompe à chaleur, chaudière, RGE — TVA et aides automatiques.",
    url: "https://floxia.fr/artisans/chauffagiste",
  },
  alternates: { canonical: "https://floxia.fr/artisans/chauffagiste" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://floxia.fr/artisans" },
    { "@type": "ListItem", position: 3, name: "Chauffagiste", item: "https://floxia.fr/artisans/chauffagiste" },
  ],
};

export default function Chauffagiste() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <TradeLanding
        trade="chauffagiste"
        badge="Chauffage & Énergie"
        title="Logiciel de devis et facturation pour chauffagistes"
        subtitle="Devis chauffage depuis WhatsApp ou sur l'application Floxia ERP."
        intro="Chauffagiste ou installateur RGE : vos devis impliquent des équipements coûteux, des aides à l'énergie et un formalisme strict (RGE, MaPrimeRénov', CEE). Floxia génère vos devis chauffage par message vocal depuis WhatsApp, ou via des pré-modèles IA sur l'application, en gérant la TVA réduite et les attestations."
        features={[
          { title: "Devis chauffage par vocal", desc: "Dictez l'installation — pompe à chaleur, chaudière, radiateurs — et recevez le devis PDF en 3 min depuis WhatsApp." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Floxia ERP, des pré-modèles de devis chauffage prêts à personnaliser, avec les équipements courants." },
          { title: "TVA 5,5% économies d'énergie", desc: "Application automatique de la TVA réduite pour les travaux d'amélioration énergétique éligibles." },
          { title: "Attestations RGE & aides", desc: "Documentation pour MaPrimeRénov', CEE et attestations TVA réduite générées avec le devis." },
          { title: "Relances & contrats d'entretien", desc: "Relances automatiques et rappels d'entretien annuel des installations." },
          { title: "Signature & PV de réception", desc: "Signature électronique et PV de mise en service générés automatiquement." },
        ]}
        useCases={[
          "Installation d'une pompe à chaleur air/eau : devis avec TVA 5,5%, attestation RGE et estimation des aides, généré par vocal.",
          "Remplacement de chaudière par une chaudière à condensation : devis créé sur l'application avec un pré-modèle, documentation CEE incluse.",
          "Contrat d'entretien annuel : Floxia rappelle automatiquement les échéances et génère les factures récurrentes.",
          "Dépannage chauffage en urgence : devis envoyé sur place au client par WhatsApp.",
        ]}
        closing="Floxia gère la complexité réglementaire du chauffage — RGE, TVA réduite, aides à l'énergie — pour que vous vous concentriez sur l'installation. Vos devis sont conformes et prêts en quelques minutes."
        relatedTrades={[
          { label: "Plombier", href: "/artisans/plombier" },
          { label: "Électricien", href: "/artisans/electricien" },
          { label: "Couvreur", href: "/artisans/couvreur" },
        ]}
      />
    </>
  );
}
