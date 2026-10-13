import { ESSAI } from "@/lib/essai/config";
import { checkAudio } from "@/lib/essai/audio";
import { missingFields, sanitizeDevis } from "@/lib/essai/devis";
import { fail, isUnavailable, json, sameOrigin, UNAVAILABLE } from "@/lib/essai/http";
import {
  clientIp, ipHash, issueToken, newVisitorId, readCookie, verifyVisitor, visitorCookieHeader,
} from "@/lib/essai/identity";
import { extractDevis, extractWithRules, transcribe } from "@/lib/essai/mistral";
import { burstAllowed, reserve } from "@/lib/essai/quota";
import { getStore } from "@/lib/essai/store";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Deux entrees, meme quota :
 *  - audio (multipart) : transcription Mistral Voxtral puis extraction ;
 *  - texte (JSON {transcript}) : dictee du navigateur, deja transcrite chez le visiteur.
 *    Pas de transcription payante ; extraction Mistral si la cle existe, sinon parseur a regles.
 *
 * Voix -> devis. Ordre voulu, du moins cher au plus cher :
 *   origine -> rafale -> taille -> lecture -> controle audio -> RESERVATION du quota
 *   -> transcription (payante) -> extraction (payante) -> consommation du quota.
 * Rien de payant n'est appele tant que la reservation n'est pas acquise.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail(403, "origine", "Requête refusée.");
  const texteMode = (req.headers.get("content-type") ?? "").includes("application/json");
  const hasKey = Boolean(process.env.MISTRAL_API_KEY);
  if (!texteMode && !hasKey) {
    console.error("[essai] MISTRAL_API_KEY absente : essai audio ferme");
    return fail(503, "indisponible", UNAVAILABLE);
  }

  try {
    const store = getStore();
    const iph = ipHash(clientIp(req.headers));
    const known = verifyVisitor(readCookie(req.headers));
    const cid = known ?? newVisitorId();
    const cookie: Record<string, string> = known ? {} : { "Set-Cookie": visitorCookieHeader(cid) };

    // 1. Rafale : avant meme de lire le corps.
    if (!(await burstAllowed(store, iph))) {
      return fail(429, "rafale", "Trop de demandes en peu de temps. Patientez une minute.", cookie);
    }

    // 2. Taille annoncee, avant de lire quoi que ce soit.
    const declared = Number(req.headers.get("content-length") ?? 0);
    if (texteMode) {
      if (declared > ESSAI.maxTranscriptChars * 4 + 2000) {
        return fail(413, "trop-long", "Le texte est trop long. Dictez moins d'1 minute 30.", cookie);
      }
    } else if (declared > ESSAI.maxAudioBytes + 200_000) {
      return fail(413, "trop-gros", "Le fichier est trop lourd. Enregistrez un message de moins d'1 minute 30.", cookie);
    }

    // 3. Lecture et controle de l'entree (gratuit).
    let bytes = new Uint8Array(0);
    let kind = "webm";
    let transcript = "";
    if (texteMode) {
      let raw: unknown;
      try { raw = (await req.json())?.transcript; } catch { return fail(400, "requete", "Envoi illisible. Réessayez.", cookie); }
      if (typeof raw !== "string") return fail(400, "vide", "Aucun texte reçu.", cookie);
      transcript = raw.replace(/\s+/g, " ").trim();
      if (transcript.length > ESSAI.maxTranscriptChars) {
        return fail(413, "trop-long", "Le texte est trop long. Dictez moins d'1 minute 30.", cookie);
      }
      if (transcript.replace(/\s/g, "").length < 8) {
        return fail(422, "inaudible", "Nous n'avons presque rien reçu. Dictez les travaux et leur prix, puis réessayez.", cookie);
      }
    } else {
      let form: FormData;
      try { form = await req.formData(); } catch { return fail(400, "requete", "Envoi illisible. Réessayez.", cookie); }
      const file = form.get("audio");
      if (!(file instanceof Blob)) return fail(400, "vide", "Aucun audio reçu.", cookie);
      bytes = new Uint8Array(await file.arrayBuffer());
      const audio = checkAudio(bytes);
      if (!audio.ok) return fail(audio.code === "trop-gros" ? 413 : 422, audio.code, audio.message, cookie);
      kind = audio.info.kind;
    }

    // 4. Reservation du quota : c'est ici, et pas avant, qu'un essai est engage.
    const r = await reserve(store, cid, iph);
    if (!r.ok) return fail(r.status, r.code, r.message, cookie);

    // 5. Transcription (audio seulement) puis extraction.
    if (!texteMode) {
      try {
        transcript = await transcribe(bytes, kind);
      } catch (err) {
        await r.fail();
        console.error("[essai] transcription KO :", err instanceof Error ? err.message : err);
        return fail(502, "transcription", "Nous n'avons pas pu écouter l'enregistrement. Réessayez dans un instant.", cookie);
      }
      if (transcript.replace(/\s/g, "").length < 8) {
        await r.fail();
        return fail(422, "inaudible", "Nous n'avons pas compris l'enregistrement. Parlez plus près du micro, dans un endroit calme, puis réessayez.", cookie);
      }
    }

    let extracted;
    try {
      extracted = hasKey ? await extractDevis(transcript) : { devis: extractWithRules(transcript), engine: "regles" as const };
    } catch (err) {
      await r.fail();
      console.error("[essai] extraction KO :", err instanceof Error ? err.message : err);
      return fail(502, "extraction", "Nous n'avons pas pu préparer le devis. Réessayez dans un instant.", cookie);
    }
    const devis = sanitizeDevis(extracted.devis);

    // 6. Rien d'exploitable : on rend la place (pas les tentatives).
    if (devis.lignes.length === 0 && !devis.objet && !devis.client) {
      await r.fail();
      return fail(422, "incomprehensible", "Nous n'avons pas trouvé de prestation dans votre message. Citez les travaux et leur prix, par exemple « remplacement du chauffe-eau, 450 euros ».", cookie);
    }

    // 7. Succes : l'essai est consomme, le jeton de telechargement est emis.
    await r.complete();
    const { token } = issueToken(cid);
    return json({ ok: true, transcript, devis, missing: missingFields(devis), token, engine: extracted.engine }, 200, cookie);
  } catch (err) {
    if (isUnavailable(err)) {
      console.error("[essai] indisponible :", err instanceof Error ? err.message : err);
      return fail(503, "indisponible", UNAVAILABLE);
    }
    console.error("[essai] erreur :", err instanceof Error ? err.message : err);
    return fail(500, "erreur", "Une erreur est survenue. Réessayez dans un instant.");
  }
}
