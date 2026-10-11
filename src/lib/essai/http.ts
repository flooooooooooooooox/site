import { ConfigError } from "./identity";
import { StoreUnavailableError } from "./store";

export const NO_STORE = { "Cache-Control": "no-store" } as const;

export function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...NO_STORE, ...extra },
  });
}

export const fail = (status: number, code: string, error: string, extra: Record<string, string> = {}) =>
  json({ ok: false, code, error }, status, extra);

export const UNAVAILABLE = "L'essai gratuit est momentanément indisponible. Réessayez dans quelques minutes, ou demandez votre devis Cirrion.";

/** Une requete d'un autre site ne doit pas pouvoir consommer l'essai d'un visiteur. */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // appels hors navigateur : pas d'en-tete Origin
  try {
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Pannes de configuration ou de stockage : on ferme l'essai plutot que de l'ouvrir sans limite. */
export function isUnavailable(err: unknown): boolean {
  return err instanceof ConfigError || err instanceof StoreUnavailableError;
}
