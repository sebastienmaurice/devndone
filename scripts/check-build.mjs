// Contrôle avant déploiement sur GitHub Pages.
//   npm run check:build    → contrôle du dossier build/
//
// 1. Le code source reste compatible avec un hébergement 100 % statique.
// 2. Le dossier build/ contient tout ce qu'il faut, et rien de ce qu'il ne faut pas.
// Code de sortie 1 au moindre échec : bloque un script de déploiement.

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const build = join(root, 'build');

const errors = [];
const warnings = [];
const rel = (p) => relative(root, p).split(sep).join('/');

function walk(dir) {
	const out = [];
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) out.push(...walk(p));
		else out.push(p);
	}
	return out;
}

// ---------------------------------------------------------------------------
// 1. Source : rien qui exige un serveur Node en production
// ---------------------------------------------------------------------------
const srcFiles = walk(src);

for (const f of srcFiles) {
	const name = f.split(sep).pop();
	const code = readFileSync(f, 'utf8');

	if (/^\+(page|layout)\.server\.(ts|js)$/.test(name))
		errors.push(`${rel(f)} : chargement serveur interdit (pas de Node en production)`);
	if (
		/^hooks\.server\.(ts|js)$/.test(name) &&
		/export\s+(const|async function|function)\s+handle\b/.test(code)
	)
		errors.push(`${rel(f)} : hook serveur actif, inopérant sur un site statique`);
	if (/^\+server\.(ts|js)$/.test(name) && !/export\s+const\s+prerender\s*=\s*true/.test(code))
		errors.push(`${rel(f)} : endpoint non prérendu (ajouter export const prerender = true)`);
	if (/\$env\/(static|dynamic)\/private/.test(code))
		errors.push(`${rel(f)} : variable d'environnement privée importée dans le site public`);
	if (/\$env\/dynamic\/public/.test(code))
		errors.push(`${rel(f)} : $env/dynamic est illisible au prérendu`);
	if (/export\s+const\s+actions\b/.test(code))
		errors.push(`${rel(f)} : form actions SvelteKit impossibles sans serveur`);
}

// ---------------------------------------------------------------------------
// 2. Build
// ---------------------------------------------------------------------------
if (!existsSync(build)) {
	console.error('✕ build/ introuvable : lancer npm run build avant.');
	process.exit(1);
}

const required = [
	'index.html',
	'404/index.html',
	'404.html',
	'CNAME',
	'.nojekyll',
	'mentions-legales/index.html',
	'sitemap.xml',
	'robots.txt',
	'favicon.svg',
	'apple-touch-icon.png',
	'site.webmanifest',
	'og/og-default.jpg',
	'fonts/plus-jakarta-sans-var.woff2',
	'fonts/lilita-one-400.woff2',
	'brand/logo-horizontal-ivory.svg'
];
for (const r of required) if (!existsSync(join(build, r))) errors.push(`build/${r} manquant`);

// Domaine personnalisé : avec un déploiement par GitHub Actions, GitHub ignore ce fichier
// (le domaine se règle dans Settings > Pages), mais on le garde juste, par sécurité.
const cname = join(build, 'CNAME');
if (existsSync(cname) && readFileSync(cname, 'utf8').trim() !== 'devndone.com')
	errors.push('build/CNAME : doit contenir exactement devndone.com');

// Routes internes (banc d'essai du design system) : interdites en production
if (existsSync(join(build, 'design-system')))
	errors.push('build/design-system : route interne présente dans le build');

const buildFiles = walk(build);
const secretPatterns = [
	[/sk-[A-Za-z0-9_-]{20,}/, 'clé de type sk-…'],
	[/AKIA[0-9A-Z]{16}/, 'clé AWS'],
	[/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'clé privée'],
	[/xox[baprs]-[A-Za-z0-9-]{10,}/, 'jeton Slack'],
	[/ghp_[A-Za-z0-9]{30,}/, 'jeton GitHub']
];
let totalBytes = 0;

for (const f of buildFiles) {
	const name = rel(f).replace(/^build\//, '');
	const size = statSync(f).size;
	totalBytes += size;

	if (name.endsWith('.map')) errors.push(`${name} : source map publiée`);
	if (/(^|\/)\.env/.test(name)) errors.push(`${name} : fichier d'environnement publié`);
	// Les PNG de repli d'enhanced-img ne sont jamais chargés par un navigateur moderne :
	// on surveille les AVIF / WebP, et les images publiées hors _app/.
	const heavy = /\.(avif|webp)$/.test(name)
		? size > 150 * 1024
		: !name.startsWith('_app/') && /\.(png|jpe?g)$/.test(name) && size > 200 * 1024;
	if (heavy) warnings.push(`${name} : image lourde (${Math.round(size / 1024)} Ko)`);

	if (/\.(html|js|css|json|xml|txt|webmanifest)$/.test(name)) {
		const text = readFileSync(f, 'utf8');
		for (const [re, label] of secretPatterns)
			if (re.test(text)) errors.push(`${name} : ${label} détectée`);

		if (name.endsWith('.html')) {
			const noindex = /<meta name="robots" content="noindex/.test(text);
			const is404 = name === '404/index.html' || name === '404.html';
			if (noindex && !is404) errors.push(`${name} : noindex sur une page publique`);
			if (text.includes('À COMPLÉTER'))
				errors.push(`${name} : contenu « À COMPLÉTER » (mentions légales ?)`);
			if (!/<link rel="canonical"/.test(text)) warnings.push(`${name} : pas de lien canonical`);
		}
	}
}

const legalHtml = join(build, 'mentions-legales/index.html');
if (existsSync(legalHtml) && !readFileSync(legalHtml, 'utf8').includes('<dt>Adresse</dt>'))
	warnings.push(
		'mentions-legales : aucune adresse publiée (LCEN art. 6-III) — prévoir une domiciliation'
	);

const robots = existsSync(join(build, 'robots.txt'))
	? readFileSync(join(build, 'robots.txt'), 'utf8')
	: '';
if (/Disallow: \/\s*$/m.test(robots)) errors.push('robots.txt : le site bloque l’indexation');

// ---------------------------------------------------------------------------
// Rapport
// ---------------------------------------------------------------------------
console.log(`\nDEV'n DONE : contrôle du build`);
console.log(`  ${buildFiles.length} fichiers · ${(totalBytes / 1024).toFixed(0)} Ko au total`);
console.log(`  pages HTML : ${buildFiles.filter((f) => f.endsWith('.html')).length}\n`);

for (const w of warnings) console.log(`  ! ${w}`);
for (const e of errors) console.log(`  ✕ ${e}`);

if (errors.length) {
	console.log(`\n✕ ${errors.length} problème(s) : ne pas déployer.\n`);
	process.exit(1);
}
console.log(`✓ Build prêt : publiable sur GitHub Pages.\n`);
