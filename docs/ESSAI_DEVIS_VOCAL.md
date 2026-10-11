# Essai gratuit : devis vocal

Page publique `/essai-devis-vocal`. Un visiteur dicte un chantier, Cirrion prépare le devis,
il le corrige et le télécharge en PDF. Pas de compte. Rien n'est envoyé à un client, aucun
workflow WhatsApp n'est déclenché.

## Parcours

1. Enregistrement dans le navigateur (90 s max) ou import d'un fichier audio.
2. `POST /api/essai/preparer` : contrôle de l'audio, réservation du quota, transcription, extraction.
3. Le visiteur corrige les champs. Le taux de TVA n'est **jamais** présélectionné.
4. `POST /api/essai/pdf` : PDF généré côté serveur (aucun appel payant).
5. Proposition de découvrir l'offre (`/devis`, rendez-vous Calendly).

`GET /api/essai/statut` est en lecture seule : il sert à masquer l'enregistreur si l'essai est déjà utilisé.

## Moteur réutilisé

Repris de l'ERP (`flooooooooooooooox/floxia-nextjs`, route `app/api/devis/voice`) :

| Étape | ERP | Ici |
|---|---|---|
| Voix → texte | Mistral Voxtral (`voxtral-small-latest`), repli faster-whisper (`STT_URL`, LAN) | Voxtral. **Pas de repli** : le service du LAN n'est pas joignable depuis Vercel |
| Texte → champs | Mistral small, JSON strict (`lib/devis/voice-parse-ai.ts`) | Même prompt, réduit aux champs d'un devis d'essai |
| Secours | Parseur à règles (`lib/devis/voice-parse.ts`) | Copie telle quelle : `src/lib/essai/voice-parse-rules.ts` |
| PDF | Service `pdf-service` (PDF Factur-X), appelé depuis n8n | **Non réutilisé** : service inaccessible d'ici. PDF d'essai avec `pdf-lib`, **mis en page à l'image du devis de production** (bandeau, encadrés, TVA/TTC par ligne, totaux, signatures). Tout ce qui est propre à l'entreprise (SIRET, assurance, CG, rétractation) reste « à compléter » : aucun texte juridique n'est inventé |

Le vocal **WhatsApp** de production n'est pas dans le dépôt : il passe par des workflows n8n
(exports JSON posés sur la machine de Florian, credentials sur les instances). Le moteur de
dictée de l'ERP est la seule implémentation lisible ; elle est supposée équivalente.

## Variables d'environnement (serveur uniquement)

À définir dans Vercel, pour **Preview** (et Production le moment venu). Jamais de préfixe `NEXT_PUBLIC_`.

| Variable | Rôle | Obligatoire |
|---|---|---|
| `MISTRAL_API_KEY` | Transcription et extraction | oui |
| `ESSAI_SECRET` | Signe le cookie et les jetons, et hache les IP. 32+ caractères aléatoires | oui |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | Stockage partagé du quota (ou `KV_REST_API_URL` + `KV_REST_API_TOKEN`) | oui |
| `ESSAI_DAILY_CAP` | Plafond de devis préparés par jour (défaut 200) | non |
| `ESSAI_PER_IP` | Essais autorisés par connexion sur 30 jours (défaut 3) | non |
| `MISTRAL_DEVIS_MODEL`, `MISTRAL_STT_MODEL` | Modèles (défauts : `mistral-small-latest`, `voxtral-small-latest`) | non |

Fail-closed : sans clé Mistral, sans secret ou sans Redis, l'essai répond « indisponible ».
Il ne retombe jamais sur un compteur en mémoire ni sur une génération factice.
`ESSAI_STORE=memory` et `MISTRAL_SERVER_URL` n'existent que hors production (développement, tests).

## Protection contre l'abus

Chaque garde est une opération atomique Redis (`SET NX`, `INCR`), jamais « lire puis écrire » :

1. **Verrou par navigateur** : un seul envoi en cours (expire seul après 120 s).
2. **Cookie signé** : un devis réussi par navigateur.
3. **Empreinte d'IP** (HMAC, l'IP n'est pas stockée ; IPv6 réduite au /64) : 3 essais par connexion sur 30 jours.
4. **Tentatives** : 3 par navigateur, 10 par connexion et par jour, réussies ou non (jamais remboursées).
5. **Anti-rafale** : 8 requêtes par minute et par connexion.
6. **Plafond global** : 200 devis par jour. Borne la facture quoi qu'il arrive.

Un échec (audio inaudible, panne Mistral, rien de compréhensible) rend la place mais pas les tentatives.
Tout est vérifié **avant** le premier appel payant : taille annoncée, format reconnu à sa signature,
durée lue dans le fichier (WAV, MP4/M4A, OGG Opus, WebM avec durée, MP3 estimé) ou, si le conteneur
ne la donne pas (enregistrement Chrome/Safari), taille bornée à 1,8 Mo.

### Limites réelles (ce que cette protection ne fait pas)

- **Contournable** : navigation privée + changement de connexion (4G/Wi-Fi, VPN) donnent un nouvel essai.
  Le plafond global et la limite de tentatives bornent le coût, pas l'abus lui-même.
- **Connexions partagées** (bureau, 4G d'un opérateur, foyer) : plusieurs personnes partagent le quota de
  3 essais. Après 3, les suivantes voient « essai déjà utilisé depuis cette connexion » alors qu'elles ne l'ont pas fait.
  C'est le prix d'un blocage par IP ; `ESSAI_PER_IP` le règle.
- **IP lue dans `x-real-ip` / `x-forwarded-for`** : fiable sur Vercel, qui les écrase. Derrière un autre proxy
  qui ne le ferait pas, un visiteur pourrait inventer son IP.
- **Pas de captcha.** À ajouter (Turnstile) si l'essai est attaqué.
- **Durée MP3 estimée** à débit constant ; un MP3 à débit variable peut être sous-estimé (la borne de taille s'applique quand même).
- Un Redis en panne ou mal configuré **ferme** l'essai plutôt que de l'ouvrir.

## Données

Ni l'audio ni la transcription ne sont stockés. Le serveur ne garde que des compteurs (clé = identifiant aléatoire
ou empreinte d'IP). Le devis corrigé est renvoyé par le navigateur pour être mis en page, puis oublié.
Les journaux ne contiennent aucun contenu de vocal. Les appels partent chez Mistral (UE) : à mentionner dans la politique de confidentialité.

## Tests

```
npm test
```

84 tests : audio, identité, quota (dont requêtes simultanées et mutations vérifiées), modèle de devis,
PDF, et parcours complet des routes avec un **faux serveur Mistral** local. Ce faux serveur permet de
compter les appels payants ; il ne prouve rien sur la qualité de la vraie transcription.
