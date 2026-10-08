# SEO et lisibilité pour les moteurs de réponse

Cette mise à jour du 6 octobre 2026 part des pages et requêtes effectivement observées dans Search Console. Les données du compte restent dans les rapports privés ; elles ne sont pas publiées dans ce dépôt. Le design et les URL canoniques existantes sont conservés.

## Changements

- Chaque page possède un titre absolu avec une seule occurrence de la marque. Les cartes sociales utilisent son URL canonique, son titre et sa description, avec l’image du produit en secours.
- Un seul graphe d’identité décrit l’organisation, le fondateur et le site. Les articles et services utilisent les mêmes identifiants. Le produit principal est décrit sur l’accueil ; la page pointage conserve le balisage propre à son module. Les anciens balisages Product sans prix et SearchAction sans recherche réelle ont été retirés ; aucun prix ni avis n’est inventé.
- L’accueil conserve son titre visible, son titre SEO et ses titres de partage. La page peintre, la page gestion bâtiment et le guide ERP ont des titres plus précis. Les deux pages commerciales proposent des réponses visibles dans le HTML, avec les mêmes réponses dans FAQPage, et des liens vers les guides pertinents.
- Le guide ERP remplace les estimations et comparaisons non sourcées par des critères vérifiables. Son calendrier de facturation est relié à la DGFiP ; sa date de publication initiale reste inchangée et sa mise à jour est affichée.
- Deux anciennes URL mal orthographiées de l’article du fondateur redirigent vers la page existante. Le sitemap inclut aussi la page application et conserve la page support en dehors de l’indexation ; lastModified indique seulement les modifications de contenu datées.
- llms.txt propose des liens vers les pages réelles et une description concise du produit. C’est un index facultatif, sans promesse d’utilisation par Google ou les assistants.
- Le comparatif possède un titre principal H1 sans changement visuel, et le calculateur ROI ne répète plus la marque dans son titre.

## Vérification

Avec Node.js 22.18 ou plus récent :

```sh
node --test scripts/seo.test.mjs
npx tsc --noEmit
npm run build
node scripts/verify-seo.mjs
node scripts/verify-seo.mjs --base https://www.cirrion.eu
```

La dernière commande vérifie les pages ciblées publiées, le sitemap et les redirections. La commande sans --base contrôle le HTML de toutes les pages produites par le build. Elle vérifie les URL, titres, données structurées et la présence réelle des réponses, plutôt que seulement les objets de configuration.

## Mesure

Conserver la date de publication, la version Git et une fenêtre Search Console complète de 28 jours avant la modification. Comparer avec 28 jours complets après publication, en tenant compte du délai de remontée des données et des différences de volume, saisonnalité et composition des requêtes. Les clics, impressions, CTR et positions sont des observations ; une variation ne prouve pas à elle seule que cette modification en est la cause.

Les données Web de Search Console ne mesurent pas séparément les citations de ChatGPT, Perplexity ou Bing. Aucun gain de trafic ni citation par une IA n’est annoncé au moment de publier. Le contrôle du sitemap confirme sa soumission, pas l’indexation de toutes ses pages.

## Références

- [Google : fonctionnalités IA et site web](https://developers.google.com/search/docs/appearance/ai-features) : les principes SEO habituels s’appliquent ; aucun fichier ou balisage spécial n’est requis pour ces fonctionnalités.
- [Google : règles des données structurées](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) : le balisage doit correspondre au contenu visible et ne garantit pas un résultat enrichi.
- [Google : balisage Article](https://developers.google.com/search/docs/appearance/structured-data/article).
- [DGFiP : calendrier de facturation électronique](https://www.impots.gouv.fr/professionnel/questions/partir-de-quand-suis-je-concerne-par-la-reforme-de-la-facturation).

Les pages métier et ville générées restent publiées. Leur réécriture ou suppression demanderait une analyse distincte des contenus et des signaux d’indexation.

## Intégration du 8 octobre 2026

Les corrections sont intégrées sur la version actuelle du dépôt. Le formulaire de demande de devis, les CTA, la navigation et la mémorisation du logo d’introduction ajoutés depuis la première livraison sont conservés. La page devis garde son contenu et utilise les mêmes métadonnées cohérentes que les autres pages. La vérification contrôle aussi cette route et la conservation exacte du titre visible et du titre SEO de l’accueil. Aucune page de ville n’est supprimée.
