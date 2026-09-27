# DEV'n DONE — site officiel

Site de [devndone.com](https://devndone.com) : SvelteKit + TypeScript, **100 % statique**,
hébergé sur un mutualisé Hostinger (offre Single). Aucun serveur Node, aucune base de
données, aucun Docker en production : `npm run build` produit des fichiers HTML / CSS / JS
que l'on envoie tels quels.

```text
Code source → npm run build → build/ (HTML, CSS, JS, images) → upload → public_html/ → devndone.com
```

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
Il est généré en dev et en staging, **jamais en production**, et toujours en `noindex`.

## 3. Build et vérification

```bash
npm run release            # check + lint + build production + contrôle du build
npm run release:staging    # idem, en mode staging
```

Ou étape par étape :

```bash
npm run build              # production → build/
npm run check:build        # contrôle du dossier build/
npm run preview            # sert build/ sur http://localhost:4173
```

**`npm run check:build` doit afficher ✓ avant tout déploiement.** Il vérifie :

- **le code source** : aucun `+page.server`, aucune form action, aucun endpoint non prérendu, aucune variable d'environnement privée ;
- **le build** : les fichiers indispensables sont présents (pages, 404, sitemap, robots, `.htaccess`, polices, icônes) ;
- **la sécurité** : aucune source map, aucun `.env`, aucune chaîne qui ressemble à une clé secrète ;
- **l'indexation** : en production, pas de `noindex` et plus aucun « À COMPLÉTER » (mentions légales) ; en staging, `noindex` partout et `robots.txt` bloquant ;
- **les routes internes** : `/design-system/` ne doit jamais apparaître dans un build de production.

### Modes

| Commande                | Mode       | Indexation                                    |
| ----------------------- | ---------- | --------------------------------------------- |
| `npm run build`         | production | autorisée, sitemap déclaré dans `robots.txt`  |
| `npm run build:staging` | staging    | `noindex` sur toutes les pages, `Disallow: /` |

Il n'y a **aucune variable d'environnement à configurer** en V1. Le mode est lu via
`import.meta.env.MODE` (voir `src/lib/config/site.ts`). En interne, `vite.config.ts` le transmet
au processus de prérendu par `DND_BUILD_MODE`, car ce processus recharge la configuration sans
l'option `--mode`.

> Règle absolue : aucune clé secrète dans ce dépôt ni dans le site. Tout ce qui est construit
> finit dans du JavaScript public. Un service qui a besoin d'une clé (CRM, IA, email) passe par
> un service externe qui la conserve côté serveur.

---

## 4. Déploiement sur Hostinger

### Ce qu'il faut envoyer

Le **contenu** du dossier `build/`, et non le dossier lui-même, va dans `public_html/`.

```text
build/                         →  public_html/
├── .htaccess                  →  .htaccess        (fichier caché : à ne pas oublier)
├── index.html                 →  index.html
├── 404/ mentions-legales/     →  …
├── _app/                      →  _app/            (JS / CSS / images hashés)
├── fonts/ brand/ og/          →  …
└── sitemap.xml robots.txt …   →  …
```

### Procédure

1. `npm run release`, et le contrôle doit afficher ✓.
2. Se connecter en **SFTP/FTP**. Les identifiants sont dans hPanel → Sites → devndone.com → Fichiers → Comptes FTP. Un client comme FileZilla ou l'extension SFTP de VS Code convient.
3. Au premier déploiement, supprimer le fichier d'accueil par défaut d'Hostinger (`default.php` ou `index.php`) dans `public_html/`.
4. Envoyer `_app/` **en premier**, puis tout le reste. Un visiteur ne peut ainsi jamais recevoir une page qui pointe vers des fichiers pas encore arrivés.
5. Vérifier que `.htaccess` est bien présent. Dans FileZilla, afficher les fichiers cachés (Serveur → Forcer l'affichage des fichiers cachés).
6. Si le cache LiteSpeed ou le CDN Hostinger est activé, le purger dans hPanel.

Variante sans client FTP : zipper le contenu de `build/`, l'envoyer avec le gestionnaire de fichiers
de hPanel, puis l'extraire dans `public_html/`.

Les anciens fichiers de `_app/immutable/` peuvent rester sur le serveur : ils sont inoffensifs.
On les nettoie de temps en temps.

### Domaine, HTTPS et www

- Le domaine est chez Hostinger, les DNS pointent vers l'hébergement.
- **SSL** : hPanel → Sécurité → SSL, installer le certificat pour `devndone.com` **et** `www.devndone.com`.
- **URL canonique : `https://devndone.com`**, sans www. `.htaccess` redirige en 301 :
  - `http://` vers `https://` ;
  - `www.devndone.com` vers `devndone.com`.
- **HSTS** : une fois HTTPS vérifié sur les deux hôtes, décommenter la ligne `Strict-Transport-Security` dans `static/.htaccess`, puis redéployer.

### Staging (recommandé avant chaque mise en production)

1. hPanel → Domaines → Sous-domaines : créer `staging.devndone.com`. Hostinger crée un dossier dédié.
2. `npm run release:staging`, puis envoyer le contenu de `build/` dans ce dossier.
3. Vérifier le site sur `https://staging.devndone.com`. Il n'est pas indexé : `noindex` et `robots.txt` bloquant.
4. Reconstruire en **production** (`npm run release`) avant d'envoyer sur `public_html/`. Un build de staging ne doit jamais partir en production, et le contrôle l'empêche.

### Après la mise en ligne

- Google Search Console : déclarer `https://devndone.com` et soumettre `https://devndone.com/sitemap.xml`.
- Vérifier une URL inconnue (ex. `/test-404/`). Elle doit afficher la page 404 avec un code HTTP 404.

---

## 5. Structure du projet

```text
├── scripts/
│   ├── check-build.mjs        Contrôle source + build avant déploiement
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
│   │   │   └── pages/         NotFound
│   │   ├── config/site.ts     Nom, URL canonique, description, mode staging
│   │   ├── content/           Données : pages.ts (nav + sitemap), legal.ts
│   │   └── styles/            Copie du design system (NE PAS éditer : npm run ds:sync) + fonts.css
│   └── routes/
│       ├── +layout.ts         prerender = true · trailingSlash = 'always'
│       ├── +page.svelte       Accueil (version d'attente, phase 1)
│       ├── 404/               Page 404 statique, servie par .htaccess
│       ├── design-system/     Banc d'essai des composants (dev + staging uniquement)
│       ├── mentions-legales/
│       ├── sitemap.xml/       Généré au build depuis content/pages.ts
│       └── robots.txt/        Généré au build selon le mode
├── static/                    Copié tel quel : .htaccess, polices, logos, icônes, manifest, og/
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
| `trailingSlash: 'always'`   | `/page/` devient `page/index.html`, servi nativement par Apache / LiteSpeed sans réécriture    |
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
- [ ] Vérifier les informations d'Hostinger (hébergeur) dans le même fichier.
- [ ] Activer HSTS après validation du SSL.

## 7. Feuille de route

| Phase | Contenu                                                              | État               |
| ----- | -------------------------------------------------------------------- | ------------------ |
| 1     | Socle, design system intégré, SEO technique, 404, déploiement        | ✓                  |
| 2     | Composants Svelte du design system, banc d'essai, action reveal      | ✓                  |
| 3     | Header : navigation complète et CTA (dès que les pages existent)     | à venir            |
| 4     | Pages : services, tarifs, réalisations, méthode, à propos            | à venir            |
| 5     | Contact : abstraction de formulaire + transport (webhook)            | décision à prendre |
| 6–7   | Réalisations, démos interactives                                     | à venir            |
| 8     | Recette : Lighthouse, accessibilité, navigateurs, mise en production | à venir            |
