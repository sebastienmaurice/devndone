# DEV'n DONE : site officiel

Site de [devndone.com](https://devndone.com) : SvelteKit + TypeScript, **100 % statique**,
hébergé gratuitement sur **GitHub Pages** (dépôt public `sebastienmaurice/devndone`).
Aucun serveur Node, aucune base de données : `npm run build` produit des fichiers
HTML / CSS / JS, qu'un workflow GitHub Actions publie tels quels.

```text
push sur main → GitHub Actions (npm ci, npm run release) → archive build/ → GitHub Pages → devndone.com
```

Hostinger ne fournit que le nom de domaine et sa zone DNS : il n'y a pas d'hébergement chez lui.

Références de marque, dans le dossier parent :

- Charte graphique : `../brand/brand-guidelines.html`
- Design system : `../brand/design-system/index.html` (source des fichiers `src/lib/styles/`)

---

## 1. Installation

Prérequis : Node.js ≥ 20 et npm.

```bash
npm install
```

## 2. Développement local

```bash
npm run dev
```

Le site est servi sur <http://localhost:5173>, avec rechargement à chaud.

| Commande          | Rôle                                                   |
| ----------------- | ------------------------------------------------------ |
| `npm run check`   | Vérification TypeScript et Svelte                      |
| `npm run lint`    | Prettier + ESLint                                      |
| `npm run format`  | Formate tout le code                                   |
| `npm run fonts`   | Recopie les polices depuis `node_modules`              |
| `npm run icons`   | Régénère les icônes PNG et l'image de partage          |
| `npm run ds:sync` | Recopie le CSS du design system dans `src/lib/styles/` |

Le banc d'essai des composants est sur <http://localhost:5173/design-system/>.
Il n'existe qu'en dev : il n'est **jamais généré au build**, et il est toujours en `noindex`.

## 3. Build et vérification

```bash
npm run release            # check + lint + build + contrôle du build
```

Ou étape par étape :

```bash
npm run build              # build/ (vite build, puis copie de la page 404 en build/404.html)
npm run check:build        # contrôle du dossier build/
npm run preview            # sert build/ sur http://localhost:4173
```

**`npm run check:build` doit afficher ✓ avant tout déploiement.** Le workflow GitHub Actions
lance `npm run release` : un contrôle en échec bloque la publication. Il vérifie :

- **le code source** : aucun `+page.server`, aucune form action, aucun endpoint non prérendu, aucune variable d'environnement privée ;
- **le build** : les fichiers indispensables sont présents (pages, `404.html`, sitemap, robots, `CNAME`, `.nojekyll`, polices, icônes), et `CNAME` contient exactement `devndone.com` ;
- **la sécurité** : aucune source map, aucun `.env`, aucune chaîne qui ressemble à une clé secrète ;
- **l'indexation** : pas de `noindex` sur les pages publiques (seule la 404 en a un), plus aucun « À COMPLÉTER » (mentions légales), `robots.txt` ouvert ;
- **les routes internes** : `/design-system/` ne doit jamais apparaître dans le build.

Il n'y a **aucune variable d'environnement à configurer**, ni en local ni dans GitHub Actions.

> Règle absolue : aucune clé secrète dans ce dépôt ni dans le site. Le dépôt est public, et
> tout ce qui est construit finit dans du JavaScript public. Un service qui a besoin d'une clé
> (CRM, IA, email) passe par un service externe qui la conserve côté serveur.

---

## 4. Déploiement sur GitHub Pages

### Le workflow

`.github/workflows/deploy.yml`, déclenché à chaque push sur `main` ou `refonte`, et à la demande
(onglet Actions, « Run workflow ») :

1. **build** (toutes les branches) : `npm ci`, `npm run release`, puis envoi de `build/` comme
   archive Pages (`actions/upload-pages-artifact`, avec les fichiers cachés pour garder `.nojekyll`).
2. **deploy** (uniquement sur `main`) : publication de l'archive (`actions/deploy-pages`).

Un push sur `refonte` ne publie donc rien : il sert à vérifier que le build passe sur GitHub.
Les actions utilisées et les permissions `pages: write` / `id-token: write` suivent la
[documentation des workflows Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

### Ce que GitHub Pages fait, et ne fait pas

| Sujet               | Comportement                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gratuité            | Le plan GitHub Free inclut « GitHub Pages in public repositories » ([plans GitHub](https://docs.github.com/en/get-started/learning-about-github/githubs-plans)). Le dépôt doit donc rester public.                                                                                                                                                                                                                 |
| Limites             | Site publié de 1 Go au plus, bande passante « soft » de 100 Go par mois, déploiement interrompu au-delà de 10 minutes ([limites](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)).                                                                                                                                                                                         |
| Page 404            | GitHub Pages affiche le fichier `404.html` du site pour les pages inexistantes ([page 404 personnalisée](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)). La documentation ne précise pas le code HTTP renvoyé : **je ne peux pas le confirmer**, à contrôler en ligne (voir « Après la mise en ligne »).                               |
| `CNAME`             | « If you are publishing from a custom GitHub Actions workflow, no `CNAME` file is created, and any existing `CNAME` file is ignored and is not required. » Le domaine se règle dans Settings > Pages ([domaine personnalisé](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)). `static/CNAME` est gardé par sécurité. |
| `.nojekyll`         | Désactive Jekyll, qui ignore les dossiers commençant par `_` comme `_app/` ([blog GitHub](https://github.blog/news-insights/the-library/bypassing-jekyll-on-github-pages/)). La documentation de `adapter-static` le recommande. Avec un workflow personnalisé, la documentation GitHub ne dit pas si Jekyll intervient : le fichier est gardé par précaution.                                                     |
| HTTPS               | « Enforce HTTPS » redirige toutes les requêtes HTTP vers HTTPS ([HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)).                                                                                                                                                                                                                           |
| `www`               | Avec `devndone.com` comme domaine personnalisé et les bons DNS, `www.devndone.com` redirige vers `devndone.com` ([domaine personnalisé](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)).                                                                                                                             |
| En-têtes HTTP, HSTS | La documentation ne décrit aucun moyen de poser ses propres en-têtes (pas de `.htaccess`). Quels en-têtes GitHub Pages ajoute de lui-même, HSTS compris : **je ne peux pas le confirmer**, à relever en ligne dans les outils de développement. La CSP reste injectée en `<meta>` par SvelteKit ; `frame-ancestors` n'est pas déclaré, car il est ignoré en `<meta>`.                                              |
| Chemins             | Le site est servi à la racine du domaine personnalisé : `paths.base` reste vide.                                                                                                                                                                                                                                                                                                                                   |

### Bascule de la page provisoire vers ce site (une seule fois)

Aujourd'hui, `devndone.com` sert la page provisoire publiée **depuis la branche `main`**
(source « Deploy from a branch »). Le nouveau site vit sur la branche `refonte`.
**Ne rien faire de ce qui suit sans décision explicite de Sébastien** : ces étapes changent le site en ligne.

1. Vérifier sur `refonte` que le dernier run du workflow est vert (onglet Actions).
2. **Changer la source d'abord** : Settings > Pages > Build and deployment > Source :
   « GitHub Actions » ([procédure officielle](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)).
3. **Puis fusionner** `refonte` dans `main` et pousser. Le push sur `main` lance le workflow,
   dont le job `deploy` publie le nouveau site.

   Les deux branches n'ont aucun historique commun, et `main` contient les fichiers de la page
   provisoire à la racine (`index.html`, `*.css`, polices, `CLAUDE.md`...). Une fusion simple
   les garderait et créerait des conflits. Méthode proposée : sur `refonte`, enregistrer
   l'historique de `main` sans reprendre ses fichiers, puis avancer `main` sur `refonte` :

   ```bash
   git fetch origin
   git switch refonte
   git merge -s ours --allow-unrelated-histories origin/main -m "Remplace la page provisoire par le site SvelteKit"
   git push origin refonte
   git push origin refonte:main
   ```

   Le dernier `push` est une avance rapide (aucun historique de `main` n'est perdu) : c'est lui
   qui déclenche la publication.

4. **Vérifier** :
   - le run du workflow est vert et le job `deploy` affiche l'URL du site ;
   - https://devndone.com/ affiche le nouveau site, ainsi que `/mentions-legales/` ;
   - Settings > Pages : le domaine personnalisé est toujours `devndone.com` et « Enforce HTTPS » toujours coché ;
   - les contrôles de « Après la mise en ligne », ci-dessous.

**Entre les étapes 2 et 3** (source déjà sur « GitHub Actions », aucun déploiement par Actions
encore fait), la documentation officielle ne dit pas si la page provisoire reste en ligne, ni si le
domaine personnalisé et « Enforce HTTPS » sont conservés : **je ne peux pas le confirmer**. Par
prudence, enchaîner les étapes 2 et 3 sans attendre, puis contrôler le site aussitôt.

La documentation recommande aussi d'ajouter une règle de protection à l'environnement
`github-pages` pour que seule la branche par défaut puisse y déployer.

**Retour arrière** : la page provisoire reste dans l'historique de `main` (commit
`8a21ded`). Remettre ses fichiers à la racine de `main`, puis repasser la source sur
« Deploy from a branch », branche `main`, dossier `/`.

Relevé du 14 octobre 2026 sur la **page provisoire** (publiée depuis une branche, avec `curl -I`) :
`http://devndone.com/` et `https://www.devndone.com/` répondent 301 vers `https://devndone.com/`,
une URL inconnue répond 404, et aucun en-tête `Strict-Transport-Security`, `X-Frame-Options`,
`X-Content-Type-Options` ni `Content-Security-Policy` n'est envoyé. Rien ne garantit que ce soit
identique après la bascule : refaire le relevé.

### Après la mise en ligne

- Ouvrir une URL inconnue (ex. `https://devndone.com/test-404/`) : la page 404 doit s'afficher.
  Relever le code HTTP dans les outils de développement (onglet Réseau) : il doit être 404.
- Relever les en-têtes de réponse de `https://devndone.com/` (HSTS, etc.) et noter ici ce que GitHub Pages envoie.
- Google Search Console : déclarer `https://devndone.com` et soumettre `https://devndone.com/sitemap.xml`.

---

## 5. Structure du projet

```text
├── .github/workflows/
│   └── deploy.yml             Build + contrôle sur chaque push, publication Pages depuis main
├── scripts/
│   ├── check-build.mjs        Contrôle source + build avant déploiement
│   ├── copy-404.mjs           build/404/index.html → build/404.html (page 404 de GitHub Pages)
│   ├── copy-fonts.mjs         Polices → static/fonts (sous-ensemble latin)
│   ├── generate-icons.mjs     Icônes PNG + image Open Graph (sharp)
│   └── sync-design-system.mjs Design system → src/lib/styles (npm run ds:sync)
├── src/
│   ├── app.html               Gabarit HTML (lang, préchargement des polices, icônes)
│   ├── lib/
│   │   ├── assets/brand/      Images traitées au build (AVIF / WebP / srcset)
│   │   ├── actions/reveal.ts  Apparition au défilement (use:reveal)
│   │   ├── components/        Importés via `$lib/components` (index.ts)
│   │   │   ├── layout/        Section, SectionHead, SiteHeader, SiteFooter
│   │   │   ├── brand/         Logo, Icon, Eyebrow, Tagline, Stroke, Rule, SlashBand
│   │   │   ├── ui/            Button, LinkArrow, Badge, Status, Notice, Card, Offer, PriceRow,
│   │   │   │                  FeatureList, Steps, Metric, Terminal, SpecList, Accordion, Breadcrumb
│   │   │   ├── form/          Field, Check, Honeypot
│   │   │   ├── seo/           Seo
│   │   │   ├── sections/      Blocs de page : UniverseGrid, ProjectGrid, ReviewList, ContactCta
│   │   │   └── pages/         NotFound
│   │   ├── config/site.ts     Nom, URL canonique, description
│   │   ├── content/           Données : pages.ts (nav + sitemap), legal.ts, services.ts,
│   │   │                      realisations.ts, tarifs.ts, studio.ts (textes de la page provisoire)
│   │   └── styles/            Copie du design system (NE PAS éditer : npm run ds:sync) + fonts.css
│   └── routes/
│       ├── +layout.ts         prerender = true · trailingSlash = 'always'
│       ├── +page.svelte       Accueil
│       ├── services/ realisations/ tarifs/ a-propos/ contact/
│       ├── 404/               Page 404 statique, recopiée en 404.html
│       ├── design-system/     Banc d'essai des composants (dev uniquement)
│       ├── mentions-legales/
│       ├── sitemap.xml/       Généré au build depuis content/pages.ts
│       └── robots.txt/        Généré au build (indexation autorisée)
├── static/                    Copié tel quel : CNAME, .nojekyll, polices, logos, icônes, manifest, og/
└── vite.config.ts             Configuration SvelteKit (adapter-static, CSP, prérendu strict)
```

### Composants

```svelte
<script lang="ts">
	import { Section, SectionHead, FeatureList, Button } from '$lib/components';
</script>

<Section surface="ivory" labelledby="expertises">
	<SectionHead id="expertises" lead="01" eyebrow="Expertises" title="Quatre univers." />
	<FeatureList items={services} />
	<Button href="/contact/" icon="arrow-right">Parlons de votre projet</Button>
</Section>
```

- La **surface** se déclare sur `<Section>` : boutons, liens, badges, champs s'y accordent seuls.
- Les composants appliquent les classes du design system. Leur CSS reste global
  (`src/lib/styles/components.css`) pour ne jamais diverger de la documentation.
- Une évolution visuelle se fait **d'abord dans le design system**
  (`../brand/design-system/`), puis `npm run ds:sync`.
- Tout nouveau composant s'ajoute au banc d'essai `/design-system/`, dans les 4 surfaces.

### Ajouter une page

1. Créer `src/routes/ma-page/+page.svelte` avec un composant `<Seo title="…" path="/ma-page/" />`.
2. L'inscrire dans `src/lib/content/pages.ts`, ce qui l'ajoute à la navigation et au sitemap.
3. `npm run release`. Le build échoue si un lien interne est cassé.

### Choix techniques

| Choix                       | Raison                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `adapter-static` + `strict` | Aucune page ne peut dépendre d'un serveur ; le build échoue sinon                              |
| `trailingSlash: 'always'`   | `/page/` devient `page/index.html`, servi tel quel par GitHub Pages                            |
| `paths.relative: false`     | La 404 fonctionne sur n'importe quelle URL profonde                                            |
| CSP `mode: 'hash'`          | Politique de sécurité stricte en `<meta>`, sans `unsafe-inline` pour les scripts               |
| `@sveltejs/enhanced-img`    | AVIF / WebP / srcset au build : visuel mascotte de 335 Ko → 7 à 21 Ko                          |
| `@fontsource/*` (dev)       | Polices OFL versionnées, recopiées en woff2 latin (≈ 83 Ko au total), sans Google Fonts (RGPD) |
| Aucune librairie UI / CSS   | Le design system est en CSS natif                                                              |

---

## 6. À compléter avant la mise en production

- [x] `src/lib/content/legal.ts` : éditeur, statut, SIRET, email, téléphone, directeur de la publication.
- [ ] **Adresse** : l'adresse du domicile n'est volontairement pas publiée. La LCEN en demande une
      pour un entrepreneur individuel : renseigner une domiciliation ou une boîte postale dans
      `legal.ts` (le contrôle émet un avertissement tant qu'elle manque).
- [x] **Hébergeur** : GitHub, Inc. dans `legal.ts` (coordonnées de la GitHub General Privacy Statement).
- [ ] Relever en ligne les en-têtes envoyés par GitHub Pages (HSTS compris) et le code HTTP de la 404.

## 7. Feuille de route

| Phase | Contenu                                                                     | État    |
| ----- | --------------------------------------------------------------------------- | ------- |
| 1     | Socle, design system intégré, SEO technique, 404, déploiement               | ✓       |
| 2     | Composants Svelte du design system, banc d'essai, action reveal             | ✓       |
| 3     | Header : navigation complète et CTA (dès que les pages existent)            | à venir |
| 4     | Pages : services (avec le process), réalisations, tarifs, à propos, contact | ✓       |
| 5     | Contact : lien Calendly et email, sans formulaire (lancement)               | décidé  |
| 6–7   | Réalisations, démos interactives                                            | à venir |
| 8     | Recette : Lighthouse, accessibilité, navigateurs, mise en production        | à venir |
