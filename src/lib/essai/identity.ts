/**
 * Qui est le visiteur ? Deux indices, aucun parfait :
 *  - un cookie signe, propre au navigateur ;
 *  - une empreinte (hash) de l'IP, partagee par tous ceux qui sortent par la meme connexion.
 *
 * L'IP n'est jamais stockee en clair : seul un HMAC tronque l'est.
 */
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { COOKIE_NAME, ESSAI } from "./config";

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

function secret(): string {
  const s = process.env.ESSAI_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV !== "production") return "dev-secret-not-for-production";
  throw new ConfigError("ESSAI_SECRET manquant ou trop court (16 caracteres minimum)");
}

const hmac = (label: string, value: string) =>
  createHmac("sha256", secret()).update(`${label}:${value}`).digest("hex");

/* ----- IP ----- */

/** IPv6 : on garde le /64 (un abonne en possede des milliards). IPv4 : l'adresse entiere. */
export function normalizeIp(raw: string): string {
  const ip = raw.trim().replace(/^\[|\]$/g, "").split("%")[0].toLowerCase();
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return mapped[1];
  if (!ip.includes(":")) return ip;
  const [head, tail = ""] = ip.split("::");
  const h = head ? head.split(":") : [];
  const t = tail ? tail.split(":") : [];
  const full = ip.includes("::") ? [...h, ...Array(Math.max(0, 8 - h.length - t.length)).fill("0"), ...t] : h;
  return full.slice(0, 4).map((x) => x.padStart(4, "0")).join(":");
}

/**
 * Sur Vercel, x-real-ip / x-forwarded-for sont poses par la plateforme et ne
 * peuvent pas etre forges par le visiteur. Ailleurs, derriere un proxy qui ne
 * les ecrase pas, un visiteur pourrait les inventer : voir docs/ESSAI_DEVIS_VOCAL.md.
 */
export function clientIp(headers: Headers): string | null {
  const real = headers.get("x-real-ip") || headers.get("x-vercel-forwarded-for");
  const fwd = headers.get("x-forwarded-for")?.split(",")[0];
  const raw = real || fwd;
  return raw ? normalizeIp(raw) : null;
}

export function ipHash(ip: string | null): string {
  // Sans IP lisible, tous les visiteurs partageraient le meme compteur : on prefere
  // une empreinte fixe « inconnue » (limite stricte) a l'absence de limite.
  return hmac("ip", ip ?? "inconnue").slice(0, 32);
}

/* ----- Cookie ----- */

export function newVisitorId(): string {
  return randomBytes(16).toString("hex");
}

export function signVisitor(id: string): string {
  return `${id}.${hmac("cookie", id).slice(0, 32)}`;
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function verifyVisitor(value: string | undefined | null): string | null {
  if (!value) return null;
  const [id, sig] = value.split(".");
  if (!id || !sig || !/^[0-9a-f]{32}$/.test(id)) return null;
  return safeEqual(sig, hmac("cookie", id).slice(0, 32)) ? id : null;
}

export function readCookie(headers: Headers, name = COOKIE_NAME): string | undefined {
  const raw = headers.get("cookie");
  if (!raw) return undefined;
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return undefined;
}

export function visitorCookieHeader(id: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${encodeURIComponent(signVisitor(id))}; Path=/; Max-Age=${ESSAI.cookieMaxAgeSeconds}; HttpOnly; SameSite=Lax${secure}`;
}

/* ----- Jeton de telechargement (PDF) ----- */

export function issueToken(visitorId: string, now = Date.now()): { token: string; jti: string } {
  const jti = randomBytes(8).toString("hex");
  const exp = Math.floor(now / 1000) + ESSAI.tokenSeconds;
  const body = `${visitorId}.${jti}.${exp}`;
  return { token: `${body}.${hmac("token", body).slice(0, 32)}`, jti };
}

export function verifyToken(token: unknown, visitorId: string, now = Date.now()): { jti: string } | null {
  if (typeof token !== "string" || token.length > 200) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [vid, jti, exp, sig] = parts;
  if (vid !== visitorId || !/^[0-9a-f]{16}$/.test(jti) || !/^\d+$/.test(exp)) return null;
  if (!safeEqual(sig, hmac("token", `${vid}.${jti}.${exp}`).slice(0, 32))) return null;
  if (Number(exp) * 1000 < now) return null;
  return { jti };
}
