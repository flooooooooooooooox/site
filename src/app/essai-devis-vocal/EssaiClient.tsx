"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { emptyDevis, euros, MAX_LIGNES, missingFields, MISSING_MESSAGES, totaux, type Devis, type Tva } from "@/lib/essai/devis";

const MAX_SECONDS = 90;
const MAX_BYTES = 3_500_000;
const TVA_CHOICES: { value: Exclude<Tva, "">; label: string; hint: string }[] = [
  { value: "20", label: "20 %", hint: "taux normal" },
  { value: "10", label: "10 %", hint: "rénovation" },
  { value: "5.5", label: "5,5 %", hint: "travaux d'énergie" },
  { value: "0", label: "0 %", hint: "franchise en base" },
];

type Step = "verification" | "indisponible" | "deja" | "pret" | "enregistrement" | "ecoute" | "dictee" | "envoi" | "verif";

/* Dictee du navigateur (Web Speech API) : Google sur Chrome/Android, Apple sur Safari.
   Types minimaux : ils ne sont pas dans lib.dom de facon portable. */
type SpeechResultList = ArrayLike<ArrayLike<{ transcript: string }>>;
type Speech = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((e: { results: SpeechResultList }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; stop(): void;
};
function speechCtor(): (new () => Speech) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Speech; webkitSpeechRecognition?: new () => Speech };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
const MAX_CHARS = 3000;
const FREE_QUOTES = 5; // doit rester egal a ESSAI.perCookie (config serveur) : le serveur reste seul juge.

function pickMime(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  return ["audio/webm;codecs=opus", "audio/mp4", "audio/ogg;codecs=opus", "audio/webm"].find((m) => MediaRecorder.isTypeSupported(m));
}

export default function EssaiClient() {
  const [step, setStep] = useState<Step>("verification");
  const [reason, setReason] = useState<"deja-utilise" | "connexion" | "indisponible">("indisponible");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [clip, setClip] = useState<{ blob: Blob; url: string } | null>(null);
  const [devis, setDevis] = useState<Devis>(emptyDevis());
  const [transcript, setTranscript] = useState("");
  const [token, setToken] = useState("");
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [audioOk, setAudioOk] = useState(true);
  const [speechOk, setSpeechOk] = useState(false);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [viaBrowser, setViaBrowser] = useState(false);
  const [left, setLeft] = useState(FREE_QUOTES);

  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const speech = useRef<Speech | null>(null);
  const wantListen = useRef(false);
  const base = useRef("");
  const textRef = useRef("");

  /* Disponibilite : lecture seule, rien n'est consomme. */
  useEffect(() => {
    let alive = true;
    fetch("/api/essai/statut", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: { available: boolean; audio?: boolean; remaining?: number; reason?: "deja-utilise" | "connexion" | "indisponible" }) => {
        if (!alive) return;
        setAudioOk(j.audio !== false);
        if (typeof j.remaining === "number") setLeft(j.remaining);
        setSpeechOk(speechCtor() !== null);
        if (j.available) setStep("pret");
        else { setReason(j.reason ?? "indisponible"); setStep(j.reason === "indisponible" || !j.reason ? "indisponible" : "deja"); }
      })
      .catch(() => alive && setStep("indisponible"));
    return () => { alive = false; };
  }, []);

  const stopTimer = () => { if (timer.current) clearInterval(timer.current); timer.current = null; };
  const releaseMic = () => { stream.current?.getTracks().forEach((t) => t.stop()); stream.current = null; };
  useEffect(() => () => { stopTimer(); releaseMic(); wantListen.current = false; speech.current?.stop(); }, []);
  useEffect(() => () => { if (clip) URL.revokeObjectURL(clip.url); }, [clip]);
  useEffect(() => () => { if (pdfUrl) URL.revokeObjectURL(pdfUrl); }, [pdfUrl]);

  const stop = useCallback(() => {
    stopTimer();
    if (recorder.current && recorder.current.state !== "inactive") recorder.current.stop();
  }, []);

  async function start() {
    setError("");
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Votre navigateur ne permet pas d'enregistrer ici. Importez plutôt un fichier audio.");
      return;
    }
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch {
      setError("Le micro n'est pas autorisé. Autorisez-le dans votre navigateur, ou importez un fichier audio.");
      return;
    }
    const mime = pickMime();
    // 32 kbit/s suffisent pour la voix et gardent 90 s tres en dessous de la limite d'envoi.
    const rec = new MediaRecorder(stream.current, { ...(mime ? { mimeType: mime } : {}), audioBitsPerSecond: 32000 });
    chunks.current = [];
    rec.ondataavailable = (e) => { if (e.data.size) chunks.current.push(e.data); };
    rec.onstop = () => {
      releaseMic();
      const blob = new Blob(chunks.current, { type: rec.mimeType || mime || "audio/webm" });
      if (blob.size < 1000) { setError("Rien n'a été enregistré. Réessayez."); setStep("pret"); return; }
      setClip({ blob, url: URL.createObjectURL(blob) });
      setStep("ecoute");
    };
    recorder.current = rec;
    rec.start(1000);
    setSeconds(0);
    setStep("enregistrement");
    const t0 = Date.now();
    timer.current = setInterval(() => {
      const s = Math.floor((Date.now() - t0) / 1000);
      setSeconds(s);
      if (s >= MAX_SECONDS) stop();
    }, 250);
  }

  function importFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setError("");
    if (f.size > MAX_BYTES) { setError("Ce fichier est trop lourd (3,5 Mo maximum, environ 1 minute 30)."); return; }
    setClip({ blob: f, url: URL.createObjectURL(f) });
    setStep("ecoute");
  }

  async function submit(init: RequestInit, back: Step, browser: boolean) {
    setError("");
    setStep("envoi");
    try {
      const res = await fetch("/api/essai/preparer", { method: "POST", ...init });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) {
        const code = j.code as string | undefined;
        if (code === "deja-utilise" || code === "connexion") { setReason(code === "connexion" ? "connexion" : "deja-utilise"); setStep("deja"); return; }
        setError(j.error || "Une erreur est survenue. Réessayez.");
        setStep(code === "indisponible" ? "indisponible" : back);
        return;
      }
      setDevis({ ...emptyDevis(), ...j.devis });
      setTranscript(j.transcript || "");
      setViaBrowser(browser);
      if (typeof j.remaining === "number") setLeft(j.remaining);
      setToken(j.token);
      setStep("verif");
    } catch {
      setError("La connexion a été coupée. Vérifiez votre réseau et réessayez.");
      setStep(back);
    }
  }

  function send() {
    if (!clip) return;
    const form = new FormData();
    form.set("audio", clip.blob, "essai");
    void submit({ body: form }, "ecoute", false);
  }

  function sendText() {
    wantListen.current = false;
    speech.current?.stop();
    stopTimer();
    setListening(false);
    void submit({ headers: { "Content-Type": "application/json" }, body: JSON.stringify({ transcript: text }) }, "dictee", true);
  }

  /* ----- Dictee du navigateur ----- */
  const updateText = (v: string) => { textRef.current = v; setText(v); };
  function stopDictation() {
    wantListen.current = false;
    stopTimer();
    speech.current?.stop();
    setListening(false);
  }
  function startDictation() {
    setError("");
    const Ctor = speechCtor();
    if (!Ctor) { setError("Votre navigateur ne propose pas la dictée. Essayez avec Chrome ou Safari."); return; }
    const rec = new Ctor();
    rec.lang = "fr-FR";
    rec.continuous = true;
    rec.interimResults = true;
    base.current = textRef.current;
    rec.onresult = (e) => {
      const live = Array.from(e.results).map((r) => r[0]?.transcript ?? "").join(" ").replace(/\s+/g, " ").trim();
      updateText(`${base.current} ${live}`.trim().slice(0, MAX_CHARS));
    };
    rec.onerror = (e) => {
      if (e.error === "no-speech" || e.error === "aborted") return;
      wantListen.current = false;
      stopTimer();
      setListening(false);
      setError(
        e.error === "not-allowed" || e.error === "service-not-allowed"
          ? "Le micro n'est pas autorisé. Autorisez-le dans votre navigateur, puis réessayez."
          : e.error === "network"
            ? "La dictée du navigateur n'a pas pu joindre son service. Vérifiez votre réseau."
            : "La dictée n'a pas fonctionné. Réessayez, ou écrivez votre devis dans la zone de texte.",
      );
    };
    // Le navigateur coupe la dictée apres un silence : on la relance tant que le visiteur n'a pas termine.
    rec.onend = () => {
      if (!wantListen.current) return;
      base.current = textRef.current;
      try { rec.start(); } catch { wantListen.current = false; stopTimer(); setListening(false); }
    };
    speech.current = rec;
    wantListen.current = true;
    try { rec.start(); } catch { setError("La dictée n'a pas pu démarrer. Réessayez."); wantListen.current = false; return; }
    setListening(true);
    setSeconds(0);
    setStep("dictee");
    const t0 = Date.now();
    timer.current = setInterval(() => {
      const sec = Math.floor((Date.now() - t0) / 1000);
      setSeconds(sec);
      if (sec >= MAX_SECONDS) stopDictation();
    }, 250);
  }

  /* Nouveau devis : tout est remis a zero, le serveur compte les devis restants. */
  function another() {
    stopDictation();
    updateText("");
    setClip(null);
    setDevis(emptyDevis());
    setTranscript("");
    setToken("");
    setPdfUrl("");
    setDownloaded(false);
    setShowMissing(false);
    setViaBrowser(false);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep(left > 0 ? "pret" : "deja");
  }

  function again() {
    stopDictation();
    updateText("");
    setClip(null);
    setError("");
    setStep("pret");
  }

  /* ----- Edition ----- */
  const set = <K extends keyof Devis>(k: K, v: Devis[K]) => setDevis((d) => ({ ...d, [k]: v }));
  const setLigne = (i: number, patch: Partial<Devis["lignes"][number]>) =>
    setDevis((d) => ({ ...d, lignes: d.lignes.map((l, k) => (k === i ? { ...l, ...patch } : l)) }));
  const missing = missingFields(devis);
  const t = totaux(devis);

  async function download() {
    if (missing.length) { setShowMissing(true); return; }
    setPdfBusy(true);
    setError("");
    try {
      const res = await fetch("/api/essai/pdf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, devis }) });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error || "Le PDF n'a pas pu être créé. Réessayez.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      const name = /filename="([^"]+)"/.exec(res.headers.get("content-disposition") || "")?.[1] || "devis-essai.pdf";
      const a = document.createElement("a");
      a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setDownloaded(true);
    } catch {
      setError("Le téléchargement a échoué. Vérifiez votre réseau et réessayez.");
    } finally {
      setPdfBusy(false);
    }
  }

  const mm = String(Math.floor(seconds / 60)).padStart(1, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="es-root">
      {step === "verification" && <div className="es-card es-center" role="status">Un instant…</div>}

      {step === "indisponible" && (
        <div className="es-card es-center">
          <h2>L&apos;essai est momentanément indisponible</h2>
          <p>Revenez dans quelques minutes. En attendant, vous pouvez demander votre devis Cirrion.</p>
          <Offer />
        </div>
      )}

      {step === "deja" && (
        <div className="es-card es-center">
          <h2>{reason === "connexion" ? "Devis gratuits épuisés sur cette connexion" : "Vos devis gratuits sont utilisés"}</h2>
          <p>{reason === "connexion"
            ? "Plusieurs visiteurs ont déjà fait des devis depuis cette connexion (réseau d'entreprise ou téléphone partagé). Pour continuer, demandez votre devis Cirrion."
            : `Vous avez fait vos ${FREE_QUOTES} devis gratuits. Pour aller plus loin, découvrez l'offre Cirrion.`}</p>
          <Offer />
        </div>
      )}

      {(step === "pret" || step === "enregistrement" || step === "ecoute" || step === "dictee" || step === "envoi") && (
        <div className="es-card">
          <ol className="es-steps" aria-label="Étapes">
            <li className="on">1 · Dictez</li><li>2 · Vérifiez</li><li>3 · Téléchargez</li>
          </ol>

          {left < FREE_QUOTES && step === "pret" && (
            <p className="es-note es-left" role="status">Il vous reste {left} devis gratuit{left > 1 ? "s" : ""} sur {FREE_QUOTES}.</p>
          )}
          <p className="es-tip">
            Dites <strong>pour qui</strong>, <strong>quels travaux</strong>, <strong>le prix de chaque prestation</strong> et <strong>le taux de TVA</strong>.
          </p>
          <p className="es-example">« Devis pour Madame Durand, 12 rue de la Paix à Caen. Remplacement du tableau électrique : un tableau à 450 euros, six heures de main-d&apos;œuvre à 55 euros. TVA 10 %. »</p>

          {step === "pret" && audioOk && (
            <div className="es-actions">
              <button type="button" className="es-big" onClick={start}>
                <span className="es-dot" aria-hidden /> Enregistrer ma voix
              </button>
              <label className="es-file">
                ou importer un fichier audio
                <input type="file" accept="audio/*,.m4a,.mp3,.wav,.ogg,.webm" onChange={importFile} />
              </label>
              {speechOk && (
                <button type="button" className="es-link" onClick={startDictation}>ou dicter en direct (dictée gratuite du navigateur)</button>
              )}
              <p className="es-note">Jusqu&apos;à 1 min 30 · le fichier est analysé puis supprimé, nous ne le conservons pas.</p>
            </div>
          )}

          {step === "pret" && !audioOk && (
            <div className="es-actions">
              {speechOk ? (
                <button type="button" className="es-big" onClick={startDictation}>
                  <span className="es-dot" aria-hidden /> Dicter mon devis
                </button>
              ) : (
                <p className="es-warn" role="status">Votre navigateur ne propose pas la dictée. Ouvrez cette page avec Chrome ou Safari.</p>
              )}
              <p className="es-note">Jusqu&apos;à 1 min 30 · rien n&apos;est conservé.</p>
            </div>
          )}

          {step === "dictee" && (
            <div className="es-actions">
              {listening ? (
                <>
                  <div className="es-rec" role="status"><span className="es-pulse" aria-hidden /> Je vous écoute… <b>{mm}:{ss}</b> / 1:30</div>
                  <button type="button" className="es-big es-stop" onClick={stopDictation}>Terminer la dictée</button>
                </>
              ) : (
                <button type="button" className="es-link" onClick={startDictation}>🎙 Reprendre la dictée</button>
              )}
              <label className="es-text">Votre texte (corrigez-le si besoin)
                <textarea
                  value={text}
                  maxLength={MAX_CHARS}
                  rows={5}
                  onChange={(e) => updateText(e.target.value)}
                  placeholder="Votre dictée apparaît ici…"
                />
              </label>
              <button type="button" className="es-big" onClick={sendText} disabled={text.replace(/\s/g, "").length < 8}>Préparer mon devis</button>
              <button type="button" className="es-link" onClick={again}>Recommencer</button>
              <p className="es-note es-quality">
                Dictée gratuite du navigateur (Google sur Chrome et Android, Apple sur Safari) : « moins précise que la vraie transcription Cirrion ».
                Relisez bien les chiffres. Votre voix est traitée par le service de votre navigateur, pas conservée par Cirrion.
              </p>
            </div>
          )}

          {step === "enregistrement" && (
            <div className="es-actions" role="status">
              <div className="es-rec"><span className="es-pulse" aria-hidden /> Enregistrement… <b>{mm}:{ss}</b> / 1:30</div>
              <button type="button" className="es-big es-stop" onClick={stop}>Terminer l&apos;enregistrement</button>
            </div>
          )}

          {step === "ecoute" && clip && (
            <div className="es-actions">
              <audio controls src={clip.url} className="es-audio" />
              <button type="button" className="es-big" onClick={send}>Préparer mon devis</button>
              <button type="button" className="es-link" onClick={again}>Recommencer</button>
            </div>
          )}

          {step === "envoi" && (
            <div className="es-actions es-center" role="status" aria-live="polite">
              <span className="es-spin" aria-hidden />
              <p><b>{text && !clip ? "Cirrion prépare votre devis…" : "Cirrion écoute votre message et prépare le devis…"}</b><br />Cela prend 10 à 20 secondes.</p>
            </div>
          )}

          {error && <p className="es-error" role="alert">{error}</p>}
        </div>
      )}

      {step === "verif" && (
        <>
          <div className="es-card">
            <ol className="es-steps" aria-label="Étapes">
              <li>1 · Dictez</li><li className="on">2 · Vérifiez</li><li className={downloaded ? "on" : ""}>3 · Téléchargez</li>
            </ol>
            <h2 className="es-h">Vérifiez et corrigez votre devis</h2>

            {transcript && (
              <details className="es-transcript">
                <summary>Ce que nous avons entendu</summary>
                <p>« {transcript} »</p>
              </details>
            )}
            {viaBrowser && (
              <p className="es-note es-left">La dictée du navigateur est « moins précise que la vraie transcription Cirrion » : vérifiez chaque nom et chaque montant.</p>
            )}

            <div className="es-grid">
              <label>Client<input value={devis.client} onChange={(e) => set("client", e.target.value)} autoComplete="off" /></label>
              <label>Adresse du client<input value={devis.adresse} onChange={(e) => set("adresse", e.target.value)} autoComplete="off" /></label>
            </div>
            <label className="es-full">Objet des travaux<input value={devis.objet} onChange={(e) => set("objet", e.target.value)} autoComplete="off" /></label>

            <h3 className="es-sub">Prestations</h3>
            {devis.lignes.length === 0 && <p className="es-warn">Aucune prestation n&apos;a été trouvée : ajoutez-en une.</p>}
            <ul className="es-lines">
              {devis.lignes.map((l, i) => (
                <li key={i} className={l.prix === null ? "need" : ""}>
                  <label className="es-des">Désignation
                    <input value={l.designation} onChange={(e) => setLigne(i, { designation: e.target.value })} />
                  </label>
                  <label>Qté
                    <input inputMode="decimal" value={String(l.quantite)} onChange={(e) => setLigne(i, { quantite: Number(e.target.value.replace(",", ".")) > 0 ? Number(e.target.value.replace(",", ".")) : 1 })} />
                  </label>
                  <label>Prix HT (€)
                    <input
                      inputMode="decimal"
                      placeholder="à indiquer"
                      value={l.prix === null ? "" : String(l.prix)}
                      onChange={(e) => {
                        const v = e.target.value.replace(",", ".");
                        setLigne(i, { prix: v === "" || Number.isNaN(Number(v)) ? null : Number(v) });
                      }}
                    />
                  </label>
                  <span className="es-total">{l.prix === null ? "—" : euros(t.lignes[i])}</span>
                  <button type="button" className="es-x" aria-label={`Supprimer la prestation ${i + 1}`} onClick={() => setDevis((d) => ({ ...d, lignes: d.lignes.filter((_, k) => k !== i) }))}>×</button>
                </li>
              ))}
            </ul>
            {devis.lignes.length < MAX_LIGNES && (
              <button type="button" className="es-add" onClick={() => setDevis((d) => ({ ...d, lignes: [...d.lignes, { designation: "", quantite: 1, prix: null }] }))}>
                + Ajouter une prestation
              </button>
            )}

            <fieldset className={`es-tva ${!devis.tva && (showMissing || devis.lignes.length) ? "need" : ""}`}>
              <legend>Taux de TVA {!devis.tva && <em>— à choisir</em>}</legend>
              <div role="radiogroup" aria-label="Taux de TVA">
                {TVA_CHOICES.map((c) => (
                  <label key={c.value} className={devis.tva === c.value ? "on" : ""}>
                    <input type="radio" name="tva" checked={devis.tva === c.value} onChange={() => set("tva", c.value)} />
                    <b>{c.label}</b><small>{c.hint}</small>
                  </label>
                ))}
              </div>
              {!devis.tva && <p className="es-hint">Nous ne devinons pas la TVA : elle dépend de vos travaux et de votre situation.</p>}
            </fieldset>

            <div className="es-sums" aria-live="polite">
              <div><span>Total HT</span><b>{euros(t.ht)}</b></div>
              <div><span>TVA{devis.tva ? ` ${devis.tva.replace(".", ",")} %` : ""}</span><b>{devis.tva ? euros(t.tva) : "—"}</b></div>
              <div className="ttc"><span>Total TTC</span><b>{devis.tva ? euros(t.ttc) : "—"}</b></div>
            </div>

            <details className="es-more">
              <summary>Vos mentions légales d&apos;entreprise (facultatif)</summary>
              <p className="es-note es-left">Ce que vous indiquez ici apparaît sur le devis. Sinon, le PDF affiche « à compléter » : nous ne devinons rien. Rien n&apos;est conservé.</p>
              <div className="es-grid">
                <label>Votre entreprise<input value={devis.entreprise} onChange={(e) => set("entreprise", e.target.value)} autoComplete="organization" /></label>
                <label>SIRET<input value={devis.siret} onChange={(e) => set("siret", e.target.value)} inputMode="numeric" placeholder="14 chiffres" /></label>
                <label>Adresse de l&apos;entreprise<input value={devis.adresse_entreprise} onChange={(e) => set("adresse_entreprise", e.target.value)} autoComplete="street-address" /></label>
                <label>N° de TVA intracommunautaire<input value={devis.tva_intra} onChange={(e) => set("tva_intra", e.target.value)} placeholder={devis.tva === "0" ? "inutile en franchise de TVA" : "FR…"} disabled={devis.tva === "0"} /></label>
                <label>Téléphone<input value={devis.tel_entreprise} onChange={(e) => set("tel_entreprise", e.target.value)} inputMode="tel" autoComplete="tel" /></label>
                <label>E-mail<input value={devis.email_entreprise} onChange={(e) => set("email_entreprise", e.target.value)} inputMode="email" autoComplete="email" /></label>
              </div>
              <label className="es-full">Assurance décennale et RC Pro<input value={devis.assurance} onChange={(e) => set("assurance", e.target.value)} placeholder="assureur, n° de contrat, zone de garantie" /></label>
              <div className="es-grid">
                <label>Tribunal compétent en cas de litige<input value={devis.tribunal} onChange={(e) => set("tribunal", e.target.value)} placeholder="ex. tribunal judiciaire de Caen" /></label>
                <label>Médiateur de la consommation<input value={devis.mediateur} onChange={(e) => set("mediateur", e.target.value)} placeholder="nom et site du médiateur" /></label>
              </div>
              <label className="es-full">Modes de paiement acceptés<input value={devis.modes_paiement} onChange={(e) => set("modes_paiement", e.target.value)} placeholder="ex. chèque, virement, carte bancaire" /></label>
            </details>

            <details className="es-more">
              <summary>Ajouter d&apos;autres informations (facultatif)</summary>
              <div className="es-grid">
                <label>Téléphone du client<input value={devis.telephone} onChange={(e) => set("telephone", e.target.value)} inputMode="tel" /></label>
                <label>E-mail du client<input value={devis.email} onChange={(e) => set("email", e.target.value)} inputMode="email" /></label>
                <label>Lieu des travaux<input value={devis.adresse_chantier} onChange={(e) => set("adresse_chantier", e.target.value)} /></label>
              </div>
              <label className="es-full">Conditions de paiement<input value={devis.conditions} onChange={(e) => set("conditions", e.target.value)} placeholder="ex. acompte de 30 % à la commande" /></label>
            </details>

            {showMissing && missing.length > 0 && (
              <ul className="es-error" role="alert">{missing.map((m) => <li key={m}>{MISSING_MESSAGES[m]}</li>)}</ul>
            )}
            {error && <p className="es-error" role="alert">{error}</p>}

            <button type="button" className={`es-big${missing.length ? " es-incomplete" : ""}`} onClick={download} disabled={pdfBusy}>
              {pdfBusy ? "Création du PDF…" : "Télécharger mon devis en PDF"}
            </button>
            {pdfUrl && (
              <p className="es-note">Le téléchargement ne démarre pas ? <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Ouvrir le PDF</a>.</p>
            )}
            <p className="es-note">Devis d&apos;essai : les mentions légales (SIREN, assurance, conditions de vente) restent à compléter. Il n&apos;est envoyé à personne.</p>
          </div>

          <div className="es-card es-offer">
            <h2>{downloaded ? "Votre devis est prêt. Et la suite ?" : "Ce devis n'est que le début"}</h2>
            <p>
              Avec Cirrion, un seul abonnement couvre votre gestion et votre comptabilité : devis et factures, relances des impayés,
              planning et pointage de vos équipes, TVA, paie et bilan de fin d&apos;année. L&apos;objectif : que vous n&apos;ayez plus à gérer un comptable à part.
            </p>
            <Offer />
            {left > 0 ? (
              <button type="button" className="es-link" onClick={another}>
                Faire un autre devis gratuit ({left} restant{left > 1 ? "s" : ""})
              </button>
            ) : (
              <p className="es-note">Vous avez fait vos {FREE_QUOTES} devis gratuits.</p>
            )}
          </div>
        </>
      )}

      <style>{CSS}</style>
    </div>
  );
}

function Offer() {
  return (
    <div className="es-offer-actions">
      <Link href="/devis" className="es-big">Découvrir l&apos;offre Cirrion</Link>
      <a href="https://calendly.com/cirrion-pro/30min" target="_blank" rel="noopener noreferrer" className="es-link">ou réserver un appel de 30 min</a>
    </div>
  );
}

const CSS = `
.es-root { display: flex; flex-direction: column; gap: 1.25rem; }
.es-card { background: rgba(255,255,255,0.88); border: 1px solid rgba(36,85,214,0.12); border-radius: 1.4rem; padding: clamp(1.1rem,4vw,2rem); box-shadow: 0 24px 50px -34px rgba(36,85,214,0.4); display: flex; flex-direction: column; gap: 1rem; }
.es-center { align-items: center; text-align: center; }
.es-card h2 { font-family: var(--font-nunito); font-weight: 900; font-size: clamp(1.25rem,3.4vw,1.6rem); color: var(--text); line-height: 1.2; text-wrap: balance; }
.es-card p { color: rgba(var(--text-rgb),0.7); line-height: 1.6; }
.es-steps { list-style: none; display: flex; gap: .4rem; flex-wrap: wrap; padding: 0; }
.es-steps li { font-size: .74rem; font-weight: 700; padding: .3rem .7rem; border-radius: 999px; background: rgba(var(--text-rgb),0.06); color: rgba(var(--text-rgb),0.5); }
.es-steps li.on { background: rgba(36,85,214,0.12); color: #2455D6; }
.es-tip { font-size: 1rem; }
.es-example { font-size: .88rem; font-style: italic; padding: .8rem 1rem; border-left: 3px solid #2455D6; background: rgba(36,85,214,0.05); border-radius: 0 .75rem .75rem 0; }
.es-actions { display: flex; flex-direction: column; gap: .9rem; align-items: stretch; }
.es-big { display: inline-flex; align-items: center; justify-content: center; gap: .6rem; min-height: 56px; padding: .9rem 1.6rem; border-radius: 999px; border: 0; cursor: pointer; background: linear-gradient(135deg,#2A5FE0,#1C46BE); color: #fff; font: inherit; font-weight: 800; font-size: 1.05rem; text-decoration: none; box-shadow: 0 12px 24px -14px rgba(36,85,214,.9); transition: transform .2s ease; }
.es-big:hover { transform: translateY(-1px); }
.es-big:disabled { opacity: .6; cursor: wait; }
.es-incomplete { background: linear-gradient(135deg,#6f8fe0,#5876c8); box-shadow: none; }
.es-stop { background: linear-gradient(135deg,#E5484D,#C92A30); box-shadow: 0 12px 24px -14px rgba(201,42,48,.9); }
.es-dot { width: 12px; height: 12px; border-radius: 50%; background: #ff5a5f; box-shadow: 0 0 0 3px rgba(255,255,255,.35); }
.es-file { align-self: center; color: #2455D6; font-weight: 700; font-size: .92rem; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; padding: .6rem; }
.es-file input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.es-link { background: none; border: 0; color: #2455D6; font: inherit; font-weight: 700; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; padding: .6rem; align-self: center; }
.es-note { font-size: .78rem; color: rgba(var(--text-rgb),0.5) !important; text-align: center; }
.es-note a { color: #2455D6; font-weight: 700; }
.es-rec { display: flex; align-items: center; justify-content: center; gap: .6rem; font-size: 1.05rem; color: var(--text); }
.es-rec b { font-variant-numeric: tabular-nums; }
.es-pulse { width: 12px; height: 12px; border-radius: 50%; background: #E5484D; animation: esPulse 1s ease-in-out infinite; }
@keyframes esPulse { 50% { transform: scale(1.5); opacity: .45; } }
.es-spin { width: 38px; height: 38px; border-radius: 50%; border: 4px solid rgba(36,85,214,0.18); border-top-color: #2455D6; animation: esSpin .9s linear infinite; }
@keyframes esSpin { to { transform: rotate(360deg); } }
.es-audio { width: 100%; }
.es-error { color: #B91C1C !important; font-size: .9rem; background: rgba(229,72,77,0.08); border-radius: .75rem; padding: .7rem 1rem; list-style: none; }
.es-warn { color: #92400E !important; font-size: .9rem; }
.es-h { margin-top: .2rem; }
.es-sub { font-family: var(--font-nunito); font-weight: 800; font-size: 1rem; color: var(--text); margin-top: .4rem; }
.es-transcript { font-size: .85rem; color: rgba(var(--text-rgb),0.7); }
.es-transcript summary { cursor: pointer; font-weight: 700; color: #2455D6; }
.es-transcript p { margin-top: .5rem; font-style: italic; }
.es-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; }
.es-root label { display: flex; flex-direction: column; gap: .3rem; font-size: .78rem; font-weight: 700; color: var(--text); }
.es-text textarea { font: inherit; font-weight: 400; font-size: 16px; line-height: 1.5; padding: .7rem .85rem; border-radius: .75rem; border: 1px solid rgba(36,85,214,0.2); background: #fff; color: var(--text); width: 100%; resize: vertical; min-height: 120px; }
.es-text textarea:focus-visible { outline: 2px solid #2455D6; outline-offset: 2px; }
.es-quality { text-align: left; }
.es-root input:not([type="radio"]):not([type="file"]) { font: inherit; font-weight: 400; font-size: 16px; min-height: 48px; padding: .6rem .85rem; border-radius: .75rem; border: 1px solid rgba(36,85,214,0.2); background: #fff; color: var(--text); width: 100%; }
.es-root input:focus-visible, .es-root button:focus-visible, .es-root summary:focus-visible, .es-root a:focus-visible, .es-file:focus-within { outline: 2px solid #2455D6; outline-offset: 2px; }
.es-lines { list-style: none; padding: 0; display: flex; flex-direction: column; gap: .7rem; }
.es-lines li { display: grid; grid-template-columns: 1fr 70px 120px auto 40px; gap: .6rem; align-items: end; padding: .8rem; border-radius: .9rem; background: rgba(36,85,214,0.04); border: 1px solid transparent; }
.es-lines li.need { border-color: rgba(217,119,6,0.55); background: rgba(251,191,36,0.08); }
.es-total { font-weight: 800; color: var(--text); min-height: 48px; display: flex; align-items: center; justify-content: flex-end; font-variant-numeric: tabular-nums; white-space: nowrap; }
.es-x { width: 40px; height: 48px; border: 0; border-radius: .75rem; background: transparent; color: rgba(var(--text-rgb),0.45); font-size: 1.5rem; cursor: pointer; }
.es-add { align-self: flex-start; background: none; border: 1px dashed rgba(36,85,214,0.4); color: #2455D6; font: inherit; font-weight: 700; padding: .7rem 1.1rem; border-radius: 999px; cursor: pointer; min-height: 44px; }
.es-tva { border: 1px solid rgba(36,85,214,0.15); border-radius: 1rem; padding: .9rem; min-inline-size: 0; }
.es-tva.need { border-color: rgba(217,119,6,0.6); background: rgba(251,191,36,0.07); }
.es-tva legend { padding: 0 .4rem; font-weight: 800; font-size: .85rem; color: var(--text); }
.es-tva legend em { color: #B45309; font-style: normal; font-weight: 700; }
.es-tva [role="radiogroup"] { display: grid; grid-template-columns: repeat(4,1fr); gap: .5rem; }
.es-tva label { flex-direction: column; align-items: center; text-align: center; gap: .1rem; padding: .7rem .3rem; border-radius: .8rem; border: 1px solid rgba(36,85,214,0.18); background: #fff; cursor: pointer; min-height: 56px; }
.es-tva label.on { border-color: #2455D6; background: rgba(36,85,214,0.1); box-shadow: inset 0 0 0 1px #2455D6; }
.es-tva label input { position: absolute; opacity: 0; pointer-events: none; }
.es-tva label b { font-size: 1rem; }
.es-tva label small { font-weight: 500; font-size: .66rem; color: rgba(var(--text-rgb),0.55); }
.es-hint { font-size: .8rem; margin-top: .6rem; color: #92400E !important; }
.es-sums { display: flex; flex-direction: column; gap: .35rem; margin-left: auto; width: min(100%, 20rem); }
.es-sums div { display: flex; justify-content: space-between; font-size: .95rem; color: rgba(var(--text-rgb),0.7); font-variant-numeric: tabular-nums; }
.es-sums .ttc { font-size: 1.15rem; color: var(--text); padding-top: .4rem; border-top: 2px solid #2455D6; }
.es-more summary { cursor: pointer; font-weight: 700; color: #2455D6; font-size: .9rem; padding: .4rem 0; }
.es-more .es-grid { margin: .8rem 0; }
.es-more .es-full { margin-bottom: .8rem; }
.es-left { text-align: left; margin-top: .4rem; }
.es-root input:disabled { background: rgba(var(--text-rgb),0.05); color: rgba(var(--text-rgb),0.45); }
.es-offer { background: linear-gradient(160deg, rgba(150,186,255,0.28), rgba(255,255,255,0.9)); }
.es-offer-actions { display: flex; flex-direction: column; gap: .5rem; align-items: stretch; width: 100%; }
@media (max-width: 640px) {
  .es-grid { grid-template-columns: 1fr; }
  .es-lines li { grid-template-columns: 1fr 1fr; }
  .es-lines .es-des { grid-column: 1 / -1; }
  .es-lines .es-total { justify-content: flex-start; }
  .es-lines .es-x { justify-self: end; }
  .es-tva [role="radiogroup"] { grid-template-columns: repeat(2,1fr); }
  .es-sums { width: 100%; }
}
@media (prefers-reduced-motion: reduce) { .es-pulse, .es-spin { animation: none; } .es-big { transition: none; } }
`;
