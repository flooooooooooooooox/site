/**
 * Quota de l'essai : un devis par navigateur, quelques-uns par connexion.
 *
 * Principe : RESERVER avant de payer. Chaque garde est une operation atomique
 * (SET NX ou INCR) dont on lit le resultat, jamais « lire puis ecrire ». Dix
 * requetes simultanees voient donc dix valeurs differentes et au plus
 * `perIp` passent.
 *
 * Ordre (le plus bon marche et le plus precis d'abord) :
 *  1. verrou du navigateur      — un seul envoi en cours par visiteur
 *  2. essai deja consomme       — message « deja utilise »
 *  3. tentatives du navigateur  — borne les boucles d'erreurs, jamais remboursees
 *  4. tentatives de la connexion
 *  5. place sur la connexion    — remboursee si l'essai echoue
 *  6. plafond global du jour    — coupe-circuit de cout
 */
import { ESSAI } from "./config";
import type { Store } from "./store";

export type DenyCode =
  | "deja-utilise"
  | "en-cours"
  | "trop-de-tentatives"
  | "connexion"
  | "sature";

export const DENY_MESSAGES: Record<DenyCode, { status: number; message: string }> = {
  "deja-utilise": {
    status: 403,
    message: "Vous avez déjà utilisé votre essai gratuit. Pour aller plus loin, demandez votre devis Cirrion.",
  },
  "en-cours": {
    status: 409,
    message: "Un envoi est déjà en cours. Patientez quelques secondes.",
  },
  "trop-de-tentatives": {
    status: 429,
    message: "Trop d'essais sans résultat pour aujourd'hui. Réessayez plus tard, ou demandez votre devis Cirrion.",
  },
  connexion: {
    status: 403,
    message: "L'essai gratuit a déjà été utilisé plusieurs fois depuis cette connexion. Demandez votre devis Cirrion pour continuer.",
  },
  sature: {
    status: 503,
    message: "L'essai gratuit est très demandé aujourd'hui. Revenez demain, ou demandez votre devis Cirrion.",
  },
};

export type Reservation =
  | { ok: true; complete(): Promise<void>; fail(): Promise<void> }
  | { ok: false; code: DenyCode; status: number; message: string };

const day = (now: number) => new Date(now).toISOString().slice(0, 10);
const deny = (code: DenyCode): Reservation => ({ ok: false, code, ...DENY_MESSAGES[code] });

const k = {
  visitor: (cid: string) => `essai:v:${cid}`,
  attempts: (cid: string) => `essai:att:${cid}`,
  ip: (iph: string) => `essai:ip:${iph}`,
  ipAttempts: (iph: string, now: number) => `essai:ipatt:${iph}:${day(now)}`,
  global: (now: number) => `essai:day:${day(now)}`,
  burst: (iph: string, now: number) => `essai:rl:${iph}:${Math.floor(now / 60_000)}`,
};

/** Lecture seule, pour afficher ou masquer l'enregistreur. N'ecrit rien. */
export async function peek(
  store: Store,
  cid: string | null,
  iph: string,
): Promise<"disponible" | "deja-utilise" | "connexion"> {
  if (cid && (await store.get(k.visitor(cid))) === "done") return "deja-utilise";
  const n = Number((await store.get(k.ip(iph))) ?? 0);
  return n >= ESSAI.perIp ? "connexion" : "disponible";
}

/** Anti-rafale, a appeler en tout premier (avant meme de lire le corps). */
export async function burstAllowed(store: Store, iph: string, now = Date.now()): Promise<boolean> {
  return (await store.incr(k.burst(iph, now), 90)) <= ESSAI.burstPerMinute;
}

export async function reserve(store: Store, cid: string, iph: string, now = Date.now()): Promise<Reservation> {
  const vKey = k.visitor(cid);

  // 1. Verrou : un seul envoi a la fois pour ce navigateur.
  if (!(await store.setNx(vKey, "pending", ESSAI.lockSeconds))) {
    return deny((await store.get(vKey)) === "done" ? "deja-utilise" : "en-cours");
  }
  const unlock = () => store.del(vKey);

  try {
    // 3. Tentatives du navigateur (non remboursables).
    if ((await store.incr(k.attempts(cid), 30 * 24 * 3600)) > ESSAI.attemptsPerCookie) {
      await unlock();
      return deny("trop-de-tentatives");
    }
    // 4. Tentatives de la connexion, par jour (non remboursables).
    if ((await store.incr(k.ipAttempts(iph, now), 2 * 24 * 3600)) > ESSAI.attemptsPerIpPerDay) {
      await unlock();
      return deny("trop-de-tentatives");
    }
    // 5. Une place sur la connexion : reservation atomique, remboursee si echec.
    const ipKey = k.ip(iph);
    if ((await store.incr(ipKey, ESSAI.perIpWindowSeconds)) > ESSAI.perIp) {
      await store.decr(ipKey);
      await unlock();
      return deny("connexion");
    }
    // 6. Plafond global du jour.
    const gKey = k.global(now);
    if ((await store.incr(gKey, 2 * 24 * 3600)) > ESSAI.dailyCap) {
      await store.decr(gKey);
      await store.decr(ipKey);
      await unlock();
      return deny("sature");
    }

    let settled = false;
    return {
      ok: true,
      // Succes : l'essai est consomme pour ce navigateur, pour de bon.
      async complete() {
        if (settled) return;
        settled = true;
        await store.set(vKey, "done", ESSAI.cookieMaxAgeSeconds);
      },
      // Echec (rien d'exploitable) : on rend la place, mais pas les tentatives.
      async fail() {
        if (settled) return;
        settled = true;
        await store.decr(ipKey);
        await store.decr(gKey);
        await unlock();
      },
    };
  } catch (err) {
    // Panne du stockage en cours de route : on libere le verrou si possible.
    await unlock().catch(() => {});
    throw err;
  }
}

/** Telechargements de PDF autorises pour un jeton. */
export async function pdfAllowed(store: Store, jti: string): Promise<boolean> {
  return (await store.incr(`essai:pdf:${jti}`, 2 * 3600)) <= ESSAI.pdfPerToken;
}
