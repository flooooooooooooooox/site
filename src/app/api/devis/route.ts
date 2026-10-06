// Envoie la demande de devis par e-mail via l'API Resend.
// Configuration (variables d'environnement, jamais dans le code) :
//   RESEND_API_KEY     la cle API Resend (re_...)
//   DEVIS_TO_EMAIL     l'adresse qui recoit les demandes
//   DEVIS_FROM_EMAIL   l'expediteur, sur un domaine verifie dans Resend
//                      (defaut : onboarding@resend.dev, pour tester)

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\r/g, "").trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Champ piege : invisible pour un humain, rempli par les robots.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const company = clean(body.company, 160);
  const trade = clean(body.trade, 80);
  const size = clean(body.size, 80);
  const message = clean(body.message, 4000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Nom, e-mail valide et message sont requis." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DEVIS_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("RESEND_API_KEY ou DEVIS_TO_EMAIL manquant");
    return Response.json({ error: "Le formulaire n'est pas encore configuré." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Nom", name], ["E-mail", email], ["Téléphone", phone], ["Entreprise", company],
    ["Métier", trade], ["Taille de l'équipe", size],
  ];
  const html =
    `<h2>Nouvelle demande de devis Cirrion</h2><table cellpadding="6">` +
    rows.filter(([, v]) => v).map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join("") +
    `</table><p style="white-space:pre-wrap">${esc(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.DEVIS_FROM_EMAIL || "Cirrion <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Demande de devis — ${name}${company ? ` (${company})` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend", res.status, await res.text());
    return Response.json({ error: "L'envoi a échoué, réessayez dans un instant." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
