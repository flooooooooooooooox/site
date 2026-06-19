export interface Metier {
  slug: string;
  nom: string; // "électricien"
  label: string; // "Électricien"
  determinant: string; // "l'électricien" / "le plombier"
  pluriel: string; // "électriciens"
  domaine: string; // "l'électricité du bâtiment"
  prestations: string[];
  tva: string;
  contexte: string; // angle unique métier
}

export const METIERS: Metier[] = [
  {
    slug: "electricien",
    nom: "électricien",
    label: "Électricien",
    determinant: "l'électricien",
    pluriel: "électriciens",
    domaine: "l'électricité du bâtiment",
    prestations: ["tableau électrique", "mise aux normes NF C 15-100", "domotique", "borne de recharge VE"],
    tva: "5,5% pour la rénovation énergétique, 10% en rénovation classique, 20% pour le neuf",
    contexte: "Entre mise aux normes, dépannage et installation domotique, l'électricien doit produire des devis précis avec les bonnes références.",
  },
  {
    slug: "plombier",
    nom: "plombier",
    label: "Plombier",
    determinant: "le plombier",
    pluriel: "plombiers",
    domaine: "la plomberie",
    prestations: ["rénovation de salle de bain", "remplacement de chauffe-eau", "réseau d'eau", "sanitaires"],
    tva: "5,5% pour les équipements d'économie d'énergie, 10% en rénovation, 20% pour le neuf",
    contexte: "Du dépannage d'urgence à la rénovation complète, le plombier jongle entre interventions rapides et chantiers longs.",
  },
  {
    slug: "chauffagiste",
    nom: "chauffagiste",
    label: "Chauffagiste",
    determinant: "le chauffagiste",
    pluriel: "chauffagistes",
    domaine: "le chauffage",
    prestations: ["pompe à chaleur", "chaudière à condensation", "radiateurs", "contrat d'entretien"],
    tva: "5,5% pour les travaux d'amélioration énergétique éligibles, 10% en rénovation, 20% pour le neuf",
    contexte: "Avec les aides à l'énergie (MaPrimeRénov', CEE) et les obligations RGE, le chauffagiste doit gérer un formalisme strict.",
  },
  {
    slug: "macon",
    nom: "maçon",
    label: "Maçon",
    determinant: "le maçon",
    pluriel: "maçons",
    domaine: "la maçonnerie et le gros œuvre",
    prestations: ["fondations", "élévation de murs", "ravalement", "extension"],
    tva: "10% en rénovation sur existant, 20% pour le neuf, 5,5% pour l'isolation",
    contexte: "Les chantiers de gros œuvre impliquent une facturation à l'avancement et la gestion de plusieurs corps de métier.",
  },
  {
    slug: "peintre",
    nom: "peintre",
    label: "Peintre en bâtiment",
    determinant: "le peintre",
    pluriel: "peintres",
    domaine: "la peinture en bâtiment",
    prestations: ["préparation des supports", "peinture au m²", "ravalement de façade", "revêtements muraux"],
    tva: "10% pour la rénovation intérieure et le ravalement, 20% pour le neuf",
    contexte: "Le devis du peintre se calcule au m², avec une préparation des supports souvent déterminante pour le prix.",
  },
  {
    slug: "menuisier",
    nom: "menuisier",
    label: "Menuisier",
    determinant: "le menuisier",
    pluriel: "menuisiers",
    domaine: "la menuiserie et l'agencement",
    prestations: ["fenêtres", "portes", "agencement sur mesure", "escaliers"],
    tva: "5,5% pour les menuiseries d'isolation, 10% en rénovation, 20% pour le neuf",
    contexte: "Entre fourniture et pose, bois, aluminium ou PVC, le menuisier doit distinguer chaque ligne avec la bonne TVA.",
  },
  {
    slug: "couvreur",
    nom: "couvreur",
    label: "Couvreur",
    determinant: "le couvreur",
    pluriel: "couvreurs",
    domaine: "la couverture et la charpente",
    prestations: ["couverture tuiles ou ardoises", "zinguerie", "charpente", "isolation de toiture"],
    tva: "5,5% pour l'isolation de toiture, 10% en rénovation, 20% pour le neuf",
    contexte: "Souvent sollicité en urgence après un sinistre, le couvreur doit pouvoir établir un devis très rapidement.",
  },
  {
    slug: "carreleur",
    nom: "carreleur",
    label: "Carreleur",
    determinant: "le carreleur",
    pluriel: "carreleurs",
    domaine: "le carrelage et les revêtements",
    prestations: ["carrelage de sol", "faïence murale", "terrasse", "mosaïque"],
    tva: "10% en rénovation, 20% pour le neuf",
    contexte: "Le devis du carreleur mêle calcul des surfaces au m² et part importante de fourniture (carrelage, colle, joints).",
  },
  {
    slug: "plaquiste",
    nom: "plaquiste",
    label: "Plaquiste",
    determinant: "le plaquiste",
    pluriel: "plaquistes",
    domaine: "la plâtrerie et l'isolation",
    prestations: ["cloisons", "doublage", "faux plafonds", "isolation intérieure"],
    tva: "5,5% pour l'isolation thermique, 10% en rénovation, 20% pour le neuf",
    contexte: "Le plaquiste calcule ses devis au m² de cloison et de plafond, avec une part d'isolation souvent éligible à la TVA réduite.",
  },
  {
    slug: "serrurier",
    nom: "serrurier",
    label: "Serrurier-métallier",
    determinant: "le serrurier",
    pluriel: "serruriers",
    domaine: "la serrurerie et la métallerie",
    prestations: ["portes blindées", "garde-corps", "portails", "ouvrages métalliques sur mesure"],
    tva: "10% en rénovation, 20% pour le neuf et la métallerie sur mesure",
    contexte: "Entre dépannage d'urgence et ouvrages métalliques sur mesure, le serrurier-métallier doit chiffrer vite et juste.",
  },
];

export function getMetier(slug: string): Metier | undefined {
  return METIERS.find((m) => m.slug === slug);
}
