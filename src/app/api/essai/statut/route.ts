import { clientIp, ipHash, readCookie, verifyVisitor } from "@/lib/essai/identity";
import { json, isUnavailable } from "@/lib/essai/http";
import { peek } from "@/lib/essai/quota";
import { getStore } from "@/lib/essai/store";

export const runtime = "nodejs";

/** Lecture seule : l'essai est-il disponible pour ce visiteur ? N'ecrit rien et ne consomme rien. */
export async function GET(req: Request) {
  if (!process.env.MISTRAL_API_KEY) return json({ available: false, reason: "indisponible" });
  try {
    const cid = verifyVisitor(readCookie(req.headers));
    const state = await peek(getStore(), cid, ipHash(clientIp(req.headers)));
    return json(state === "disponible" ? { available: true } : { available: false, reason: state });
  } catch (err) {
    if (isUnavailable(err)) return json({ available: false, reason: "indisponible" });
    console.error("[essai/statut]", err instanceof Error ? err.message : err);
    return json({ available: false, reason: "indisponible" });
  }
}
