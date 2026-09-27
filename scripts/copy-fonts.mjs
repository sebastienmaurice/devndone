// Copie les polices de marque (sous-ensemble latin, woff2) depuis les paquets
// @fontsource vers static/fonts/. À relancer uniquement après une mise à jour
// des paquets : `npm run fonts`.
//
// Pourquoi une copie plutôt qu'un import CSS des paquets : on ne publie que les
// 5 fichiers utiles (pas les sous-ensembles cyrillique, vietnamien…), avec des
// URL stables qui permettent le <link rel="preload">.

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'static', 'fonts');
const nm = join(root, 'node_modules');

const files = [
	['@fontsource/lilita-one/files/lilita-one-latin-400-normal.woff2', 'lilita-one-400.woff2'],
	[
		'@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2',
		'plus-jakarta-sans-var.woff2'
	],
	[
		'@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',
		'ibm-plex-mono-400.woff2'
	],
	[
		'@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2',
		'ibm-plex-mono-500.woff2'
	],
	[
		'@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-600-normal.woff2',
		'ibm-plex-mono-600.woff2'
	]
];

mkdirSync(out, { recursive: true });
for (const [from, to] of files) {
	copyFileSync(join(nm, from), join(out, to));
	console.log(`fonts: ${to}`);
}
