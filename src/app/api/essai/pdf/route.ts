import { missingFields, MISSING_MESSAGES, sanitizeDevis } from "@/lib/essai/devis";
import { fail, isUnavailable, NO_STORE, sameOrigin, UNAVAILABLE } from "@/lib/essai/http";
import { readCookie, verifyToken, verifyVisitor } from "@/lib/essai/identity";
import { buildDevisPdf, pdfFileName } from "@/lib/essai/pdf";
import { pdfAllowed } from "@/lib/essai/quota";
import { getStore } from "@/lib/essai/store";

export const runtime = "nodejs";

/**
 * PDF du devis corrige par le visiteur. Aucun appel payant ici : seul le jeton
 * emis apres une preparation reussie ouvre l'acces, et il est limite en nombre.
 * Le devis n'est stocke nulle part : le navigateur le renvoie, on le met en page.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail(403, "origine", "Requête refusée.");
  try {
    const raw = await req.text();
    if (raw.length > 60_000) return fail(413, "trop-gros", "Devis trop volumineux.");
    let body: { token?: unknown; devis?: unknown };
    try { body = JSON.parse(raw); } catch { return fail(400, "requete", "Requête illisible."); }

    const cid = verifyVisitor(readCookie(req.headers));
    const tok = cid ? verifyToken(body.token, cid) : null;
    if (!tok) return fail(403, "jeton", "Cette session a expiré. Refaites un enregistrement depuis la page d'essai.");

    const devis = sanitizeDevis(body.devis);
    const missing = missingFields(devis);
    if (missing.length) return fail(422, "incomplet", MISSING_MESSAGES[missing[0]]);

    if (!(await pdfAllowed(getStore(), tok.jti))) {
      return fail(429, "limite-pdf", "Vous avez atteint le nombre de téléchargements autorisés pour cet essai.");
    }

    const pdf = await buildDevisPdf(devis);
    return new Response(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfFileName(devis)}"`,
        ...NO_STORE,
      },
    });
  } catch (err) {
    if (isUnavailable(err)) return fail(503, "indisponible", UNAVAILABLE);
    console.error("[essai/pdf]", err instanceof Error ? err.message : err);
    return fail(500, "erreur", "Le PDF n'a pas pu être créé. Réessayez.");
  }
}
