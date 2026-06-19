export interface Ville {
  slug: string;
  nom: string;
  region: string;
  prepo: string; // "à", "au", "aux" — pour "Floxia {prepo} {nom}"
  contexte: string; // contexte local unique (anti-doublon SEO)
  zones: string; // départements / agglomération
}

export const VILLES: Ville[] = [
  {
    slug: "paris",
    nom: "Paris",
    region: "Île-de-France",
    prepo: "à",
    contexte:
      "À Paris, les artisans du bâtiment interviennent surtout en rénovation d'appartements haussmanniens, copropriétés et locaux commerciaux. Les contraintes de stationnement, d'accès et de copropriété rendent chaque minute administrative précieuse — créer un devis depuis WhatsApp sur le chantier change la donne.",
    zones: "Paris (75) et toute la petite couronne : Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94).",
  },
  {
    slug: "lyon",
    nom: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    prepo: "à",
    contexte:
      "À Lyon et dans la métropole, les artisans jonglent entre rénovation dans le Vieux-Lyon, constructions neuves à la Confluence et chantiers en périphérie. Floxia permet de générer un devis entre deux interventions, sans repasser par le bureau.",
    zones: "Métropole de Lyon et Rhône (69), avec extension possible sur l'Ain (01) et l'Isère (38).",
  },
  {
    slug: "marseille",
    nom: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    prepo: "à",
    contexte:
      "À Marseille, entre rénovation dans les quartiers anciens, villas sur la côte et copropriétés, les artisans ont besoin de réactivité. Un devis envoyé par WhatsApp dans l'heure fait souvent la différence face à la concurrence.",
    zones: "Marseille et les Bouches-du-Rhône (13), de l'Estaque à Aubagne.",
  },
  {
    slug: "toulouse",
    nom: "Toulouse",
    region: "Occitanie",
    prepo: "à",
    contexte:
      "À Toulouse, la croissance démographique soutient une forte demande en construction neuve et rénovation énergétique. Floxia aide les artisans à suivre ce rythme en automatisant devis, relances et facturation.",
    zones: "Toulouse Métropole et Haute-Garonne (31).",
  },
  {
    slug: "bordeaux",
    nom: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    prepo: "à",
    contexte:
      "À Bordeaux, la rénovation du bâti ancien en pierre et la construction neuve en périphérie cohabitent. Les artisans bordelais utilisent Floxia pour produire des devis détaillés sans y passer leurs soirées.",
    zones: "Bordeaux Métropole et Gironde (33).",
  },
  {
    slug: "lille",
    nom: "Lille",
    region: "Hauts-de-France",
    prepo: "à",
    contexte:
      "À Lille et dans la métropole, la rénovation des maisons de ville en brique et l'amélioration énergétique sont au cœur de l'activité. Floxia gère automatiquement la TVA réduite et les attestations liées aux travaux d'isolation.",
    zones: "Métropole Européenne de Lille et Nord (59).",
  },
  {
    slug: "nantes",
    nom: "Nantes",
    region: "Pays de la Loire",
    prepo: "à",
    contexte:
      "À Nantes, le dynamisme immobilier alimente une forte demande en travaux. Les artisans nantais s'appuient sur Floxia pour répondre vite aux demandes de devis et ne plus laisser filer de chantiers.",
    zones: "Nantes Métropole et Loire-Atlantique (44).",
  },
  {
    slug: "nice",
    nom: "Nice",
    region: "Provence-Alpes-Côte d'Azur",
    prepo: "à",
    contexte:
      "À Nice, entre rénovation de standing, résidences secondaires et copropriétés, les artisans ont besoin de devis soignés et rapides. Floxia produit des documents professionnels en quelques minutes.",
    zones: "Nice et les Alpes-Maritimes (06).",
  },
  {
    slug: "strasbourg",
    nom: "Strasbourg",
    region: "Grand Est",
    prepo: "à",
    contexte:
      "À Strasbourg, la rénovation du patrimoine alsacien et les exigences thermiques renforcées structurent l'activité du bâtiment. Floxia accompagne les artisans sur la conformité et la rapidité des devis.",
    zones: "Eurométropole de Strasbourg et Bas-Rhin (67).",
  },
  {
    slug: "montpellier",
    nom: "Montpellier",
    region: "Occitanie",
    prepo: "à",
    contexte:
      "À Montpellier, l'une des villes les plus dynamiques de France, la construction neuve bat son plein. Les artisans utilisent Floxia pour absorber le volume de demandes sans sacrifier la qualité de leurs devis.",
    zones: "Montpellier Méditerranée Métropole et Hérault (34).",
  },
  {
    slug: "rennes",
    nom: "Rennes",
    region: "Bretagne",
    prepo: "à",
    contexte:
      "À Rennes, la croissance urbaine et la rénovation énergétique soutiennent l'activité du bâtiment. Floxia permet aux artisans rennais de gérer devis et relances depuis le terrain, par WhatsApp.",
    zones: "Rennes Métropole et Ille-et-Vilaine (35).",
  },
  {
    slug: "grenoble",
    nom: "Grenoble",
    region: "Auvergne-Rhône-Alpes",
    prepo: "à",
    contexte:
      "À Grenoble, la rénovation thermique est une priorité dans une ville pionnière de la transition énergétique. Floxia gère automatiquement la TVA réduite et les attestations des travaux d'amélioration énergétique.",
    zones: "Grenoble-Alpes Métropole et Isère (38).",
  },
];

export function getVille(slug: string): Ville | undefined {
  return VILLES.find((v) => v.slug === slug);
}
