/**
 * Limites de l'essai gratuit du devis vocal. Tout est ici pour qu'un reglage
 * ne demande jamais de chercher dans le code.
 */

const int = (name: string, fallback: number) => {
  const n = Number(process.env[name]);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
};

export const ESSAI = {
  /** Corps de requete maximal accepte par Vercel : 4,5 Mo, multipart compris. */
  maxAudioBytes: 3_500_000,
  /** Quand la duree ne peut pas etre lue dans le fichier, on borne la taille. */
  maxAudioBytesUnknownDuration: 1_800_000,
  maxAudioSeconds: 90,
  minAudioSeconds: 2,
  /** Marge pour les durees arrondies par les conteneurs. */
  durationToleranceSeconds: 3,

  /** Devis gratuits par navigateur (cookie)... */
  perCookie: int("ESSAI_PER_VISITOR", 2),
  /** ...et au plus N par connexion (soit quelques visiteurs) : une entreprise ou une 4G partagee ne doit pas bloquer tout le monde. */
  perIp: int("ESSAI_PER_IP", 6),
  perIpWindowSeconds: 30 * 24 * 3600,
  /** Appels payants autorises par navigateur, reussis ou non : borne les boucles d'erreurs. */
  attemptsPerCookie: 6,
  attemptsPerIpPerDay: 15,
  /** Rafale : tous les appels de l'essai confondus. */
  burstPerMinute: 8,
  /** Coupe-circuit global : plafond de devis prepares par jour, pour borner la facture. */
  dailyCap: int("ESSAI_DAILY_CAP", 200),

  /** Verrou d'un envoi en cours : couvre la duree maximale d'une fonction. */
  lockSeconds: 120,
  cookieMaxAgeSeconds: 400 * 24 * 3600,
  tokenSeconds: 3600,
  pdfPerToken: 8,

  /** Dictee du navigateur : le texte arrive deja transcrit, on en borne la longueur (~90 s de parole). */
  maxTranscriptChars: 3000,

  transcribeTimeoutMs: 40_000,
  extractTimeoutMs: 20_000,
} as const;

export const COOKIE_NAME = "cirrion_essai";
