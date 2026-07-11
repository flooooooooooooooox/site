import type { Metadata } from "next";
import TradeLanding from "@/components/sections/TradeLanding";

export const metadata: Metadata = {
  title: "Logiciel devis couvreur WhatsApp — Floxia | ERP IA Bâtiment",
  description:
    "Logiciel de devis et facturation pour couvreurs et charpentiers. Créez vos devis toiture depuis WhatsApp ou sur l'application Floxia ERP : couverture, zinguerie, isolation, e-facturation 2026.",
  keywords: ["logiciel devis couvreur", "devis couvreur WhatsApp", "logiciel couverture toiture", "ERP couvreur charpentier", "devis toiture"],
  openGraph: {
    title: "Logiciel devis couvreur — Floxia",
    description: "Devis toiture depuis WhatsApp ou sur l'application Floxia ERP. Couverture, zinguerie, isolation — TVA 5,5/10/20% au choix.",
    url: "https://floxia.fr/artisans/couvreur",
  },
  alternates: { canonical: "https://floxia.fr/artisans/couvreur" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://floxia.fr" },
    { "@type": "ListItem", position: 2, name: "Artisans", item: "https://floxia.fr/artisans" },
    { "@type": "ListItem", position: 3, name: "Couvreur", item: "https://floxia.fr/artisans/couvreur" },
  ],
};

export default function Couvreur() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <TradeLanding
        trade="couvreur"
        badge="Couverture & Charpente"
        title="Logiciel de devis et facturation pour couvreurs"
        subtitle="Devis toiture depuis WhatsApp ou sur l'application Floxia ERP."
        intro="Couvreur, charpentier ou zingueur : vos chantiers exigent de la réactivité, avec des interventions souvent urgentes après un sinistre. Floxia vous permet de générer un devis toiture par message vocal depuis WhatsApp, ou via des pré-modèles IA sur l'application, avec vos prix du catalogue et la TVA de votre choix."
        features={[
          { title: "Devis toiture par vocal", desc: "Dictez les ouvrages — tuiles, ardoises, zinguerie, isolation — et recevez le devis PDF en 3 min avec vos prix du catalogue." },
          { title: "Pré-modèles de devis sur l'app", desc: "Sur l'application Floxia ERP, des pré-modèles de devis couverture prêts à personnaliser pour vos chantiers complexes." },
          { title: "Devis d'urgence rapide", desc: "Après une tempête ou une fuite, générez un devis sur place en quelques minutes pour rassurer le client." },
          { title: "TVA rénovation au choix", desc: "5,5% pour l'isolation de toiture, 10% en rénovation, 20% pour le neuf. Vous choisissez le taux sur chaque ligne, Floxia l'applique sur le devis." },
          { title: "Relances & garantie décennale", desc: "Relances automatiques et suivi des garanties sur vos travaux de couverture." },
          { title: "Photos chantier & PV", desc: "Collecte de photos avant/après depuis WhatsApp et PV de réception automatisé." },
        ]}
        useCases={[
          "Réfection complète d'une toiture 120m² : devis avec dépose, charpente, couverture tuiles, zinguerie — généré par vocal en sortie de visite.",
          "Isolation de combles par l'extérieur (sarking) : devis TVA 5,5% prêt en quelques minutes sur l'application.",
          "Intervention d'urgence après tempête : devis de bâchage et réparation envoyé sur place au client par WhatsApp.",
          "Pose de gouttières en zinc : devis détaillé, fournitures et finitions comprises.",
        ]}
        closing="De la petite réparation à la réfection complète, Floxia accélère vos devis de couverture et de charpente. Vous répondez plus vite aux clients, surtout en situation d'urgence où la réactivité fait la différence."
        relatedTrades={[
          { label: "Maçon", href: "/artisans/macon" },
          { label: "Menuisier", href: "/artisans/menuisier" },
          { label: "Plaquiste", href: "/artisans/plaquiste" },
        ]}
      />
    </>
  );
}
