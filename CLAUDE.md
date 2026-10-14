# Dev'n Done : site vitrine (devndone.com)

Site vitrine de Dev'n Done (nom commercial de Sébastien Maurice, entrepreneur individuel). Page unique en HTML et CSS statiques, hébergée sur GitHub Pages avec le domaine `devndone.com`.

## Règles de travail (à respecter systématiquement)

- Langue : français partout (contenu, commentaires, messages de commit, échanges).
- Ponctuation : jamais de tiret cadratin (—). Utiliser la virgule, les deux-points ou les parenthèses.
- Git : après chaque modification validée, committer ET pousser sur `main`, sans attendre une demande explicite.
- Messages de commit : en français, à l'impératif ou au passé court, sans jamais faire apparaître le mot « Claude » (ni `Co-Authored-By`, ni mention dans le texte).
- Vérité : ne rien inventer (chiffres, avis, références clients, délais). Si une information manque, le signaler au lieu de deviner.
- Avant de modifier une section, regarder le rendu actuel (local puis en ligne), pas seulement le code.

## Déploiement

- Hébergement : GitHub Pages, branche `main`, racine `/`. Un push déclenche le déploiement (compter 1 à 3 minutes).
- Domaine : `devndone.com`, déclaré par le fichier `CNAME` à la racine. **Ne jamais supprimer ni modifier ce fichier.**
- DNS (chez Hostinger) : 4 enregistrements A et 4 AAAA de GitHub Pages sur `@`, CNAME `www` vers `sebastienmaurice.github.io`, plus un TXT de vérification `_github-pages-challenge-sebastienmaurice`. Ne pas y toucher sans raison.
- HTTPS : « Enforce HTTPS » est activé dans Settings > Pages. Le domaine est vérifié dans le compte GitHub (verified domains).
- Le portfolio personnel `sebastienmaurice.github.io` est un dépôt distinct : ne pas le mélanger avec celui-ci.

## Structure du dépôt (à plat, volontairement)

```
index.html               page unique : hero, services, process, réalisations, tarifs, avis, à propos, contact
mentions-legales.html    mentions légales (noindex)
CNAME                    devndone.com
tokens.css               tokens du design system (couleurs, typo, espacement, formes, mouvement)
base.css                 reset, typographie, focus, accessibilité
layout.css               conteneur, section, grille 4/8/12 colonnes, piles
components.css           boutons, cartes, badges, offres, formulaires, navigation, pied de page
*.woff2                  polices auto-hébergées
logo.svg, favicon.svg    logo blanc horizontal et favicon (SVG officiels)
logo-mascotte.webp       visuel du hero (mascotte + logotype, fond Night)
og.jpg                   image de partage 1200x630
```

Les CSS sont des copies du design system : ne les éditer qu'en cohérence avec la source (voir ci-dessous). Le CSS propre à la page est dans le `<style>` de `index.html`.

## Source de vérité de la marque

Sur le poste de Sébastien :

- Charte graphique : `D:\DEV'n DONE\brand\brand-guidelines.html`
- Design system : `D:\DEV'n DONE\brand\design-system\` (`index.html` pour la documentation, `README.md` pour les règles)
- Logos SVG : `D:\DEV'n DONE\Graphique\Logotype\DEV'n DONE Design System\`
- Mascotte : `D:\DEV'n DONE\Graphique\mascotte\` (scènes sur fond clair, inutilisables telles quelles sur fond sombre)
- Maquettes cibles du site : `D:\DEV'n DONE\Graphique\Site web\` (`Hero devndone.png`, `realisations devndone.png`, `services devndone.png`, `services devndone2.png`)

### Règles du design system à appliquer

1. Un composant ne lit que les variables sémantiques (`--text`, `--action`, `--line`, `--surface`...), jamais `--dnd-*` ni un code hexadécimal en dur.
2. Le fond se déclare sur la section avec un contexte : `.surface-night` (défaut), `.surface-raised`, `.surface-ivory`, `.surface-orange`. Chaque contexte redéfinit le jeu complet de variables.
3. Tout nouveau composant se teste dans les 4 contextes et aux largeurs 390 / 768 / 1440 px.
4. Couleurs de marque verrouillées : Night `#0A0D11`, Night surélevé `#11171F`, Ivoire `#FAFAF8`, Orange `#FF8A00`, Menthe `#00E5B8`.
5. Typographie : Lilita One (titres, avec le point final orange des accroches « Done. »), Plus Jakarta Sans (interface), IBM Plex Mono (technique).
6. Élévation par la surface, pas par l'ombre. Une seule ombre, réservée aux calques flottants.

### Écarts connus avec la charte (à valider ou corriger)

- Les 4 couleurs d'univers (bleu `#3B9BFF`, orange, menthe, violet `#9B7CFF`) viennent des maquettes, pas de la charte, qui ne définit que l'orange et la menthe.
- La police Caveat (annotations manuscrites des maquettes) n'est pas dans la charte.

## Contraintes impératives

- **Pas de Google Fonts ni de ressource tierce chargée** : les polices sont auto-hébergées. Les mentions légales affirment que le site ne dépose aucun cookie et ne collecte aucune donnée personnelle : toute ressource externe qui transmet l'IP du visiteur contredirait cette phrase. Seul Calendly (lien de prise de rendez-vous) est cité.
- **Données personnelles de l'éditeur** : ne jamais publier de numéro de sécurité sociale, de date ou lieu de naissance, ni de pièce d'identité. Pour les mentions légales, l'article 6-III-1 de la LCEN (loi 2004-575) liste nom, adresse, téléphone et email : le téléphone et l'adresse à publier (professionnels si possible) sont une **décision de Sébastien**, à vérifier sur Légifrance et la fiche Service-Public « Mentions obligatoires sur le site internet d'un entrepreneur individuel ». Ne pas retirer un numéro déjà présent sans son accord.
- **Accessibilité** : lien d'évitement, focus visible, contrastes de la charte, `prefers-reduced-motion` respecté (déjà dans `base.css`).
- **Performance** : images avec `width` et `height`, visuel du hero en WebP, polices en `woff2` avec `font-display: swap`.
- Les avis clients affichés sont de vrais avis Malt : ne jamais en ajouter ni en reformuler sans source.

## Contenu commercial (état actuel)

- Maintenance WordPress en abonnement : Essentiel 79 €, Confort 129 € (recommandé), Sérénité 219 € HT par mois. **Grille de test**, à valider par les premiers appels de prospection : ne pas la présenter comme définitive.
- Forfaits : Audit technique 490 €, Lancement site 990 €, Landing page 1 200 €, Refonte PME 2 800 €, Boutique WooCommerce 2 200 €, Audit automatisation 290 € (tous HT).
- Prise de rendez-vous : https://calendly.com/sebastienmaurice/prise-de-contact
- Mentions : Dev'n Done, entrepreneur individuel, SIREN 517 849 733, Caudry (59).

## Reste à faire

- [ ] Visuel hero « DONE » en pierre avec la mascotte (maquettes), à intégrer dès que le fichier source existe.
- [ ] Mascotte détourée (fond transparent) pour réutiliser les scènes sur fond sombre.
- [ ] Captures d'écran des projets dans les cartes Réalisations.
- [ ] Relire le rendu mobile sur le site en ligne (testé en local uniquement).
- [ ] Décider si les couleurs d'univers et la police Caveat restent hors charte.
- [ ] Suivi SEO : vérifier l'indexation Google de `devndone.com` (Search Console, sitemap, `robots`). Non traité à ce jour : le site n'a ni `sitemap.xml` ni `robots.txt`.
- [ ] Étape suivante possible : passage à SvelteKit (plusieurs pages), prévu par le README du design system. À décider selon le temps disponible.

## Vérifications avant chaque push

1. Ouvrir `index.html` en local et contrôler 390 / 768 / 1440 px (pas de défilement horizontal).
2. Aucun `assets/` ni chemin relatif cassé : les fichiers sont à la racine.
3. Les liens externes (projets, Calendly, Malt, LinkedIn) répondent.
4. Après le push, attendre le déploiement puis contrôler https://devndone.com/ et https://devndone.com/mentions-legales.html.
