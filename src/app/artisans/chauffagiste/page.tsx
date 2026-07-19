import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis chauffagiste WhatsApp — Cirrion | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour chauffagistes. Créez vos devis chauffage depuis WhatsApp ou sur l'application Cirrion ERP : pompe à chaleur, chaudière, RGE, e-facturation 2026.",
  keywords: ["logiciel devis chauffagiste", "devis chauffagiste WhatsApp", "logiciel chauffage", "ERP chauffagiste", "devis pompe à chaleur RGE"],
  openGraph: {
    title: "Logiciel devis chauffagiste — Cirrion",
    description: "Devis chauffage depuis WhatsApp ou sur l'application Cirrion ERP. Pompe à chaleur, chaudière, RGE — TVA 5,5/10/20% au choix.",
    url: "https://www.cirrion.eu/artisans/chauffagiste",
  },
  alternates: { canonical: "https://www.cirrion.eu/artisans/chauffagiste" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cirrion.eu" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://www.cirrion.eu/artisans" },
    { "@type": "ListItem", position: 3, name: "Chauffagiste", item: "https://www.cirrion.eu/artisans/chauffagiste" },
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
        subtitle="Devis chauffage depuis WhatsApp ou sur l'application Cirrion ERP."
        intro="Chauffagiste ou installateur RGE : vos devis impliquent des équipements coûteux, des aides à l'énergie et un formalisme strict (RGE, MaPrimeRénov', CEE). Cirrion génère vos devis chauffage par message vocal depuis WhatsApp, ou via des pré-modèles IA sur l'application — et l'assistant vocal IA répond à vos questions sur la TVA réduite, MaPrimeRénov' ou les CEE."
        features={[
          { title: "Devis chauffage par vocal", desc: "Dictez l'installation — pompe à chaleur, chaudière, radiateurs — et recevez le devis PDF en 3 min depuis WhatsApp." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Cirrion ERP, des pré-modèles de devis chauffage prêts à personnaliser, avec les équipements courants." },
          { title: "TVA 5,5% économies d'énergie", desc: "TVA 5,5, 10 ou 20% au choix sur chaque ligne : vous sélectionnez le taux réduit pour les travaux d'amélioration énergétique éligibles." },
          { title: "Assistant vocal IA aides & RGE", desc: "Une question sur MaPrimeRénov', les CEE ou l'attestation TVA réduite ? L'assistant vocal IA de Cirrion vous répond à tout moment." },
          { title: "Relances & contrats d'entretien", desc: "Relances automatiques et rappels d'entretien annuel des installations." },
          { title: "Signature & PV de réception", desc: "Signature électronique et PV de mise en service générés automatiquement." },
        ]}
        useCases={[
          "Installation d'une pompe à chaleur air/eau : devis avec TVA 5,5% généré par vocal, et l'assistant IA répond à vos questions sur les aides.",
          "Remplacement de chaudière par une chaudière à condensation : devis créé sur l'application avec un pré-modèle.",
          "Contrat d'entretien annuel : Cirrion rappelle automatiquement les échéances et génère les factures récurrentes.",
          "Dépannage chauffage en urgence : devis envoyé sur place au client par WhatsApp.",
        ]}
        closing="Cirrion accélère vos devis et son assistant vocal IA répond à vos questions sur le RGE, la TVA réduite et les aides à l'énergie — pour que vous vous concentriez sur l'installation. Vos devis sont prêts en quelques minutes."
        relatedTrades={[
          { label: "Plombier", href: "/artisans/plombier" },
          { label: "Électricien", href: "/artisans/electricien" },
          { label: "Couvreur", href: "/artisans/couvreur" },
        ]}
      />
    </>
  );
}
