// GitHub Pages sert le fichier 404.html de la racine du site pour toute URL inconnue.
// SvelteKit prérend la page 404 dans build/404/index.html (trailingSlash: 'always') :
// on la recopie en build/404.html après le build. Les chemins sont absolus
// (paths.relative: false), la copie fonctionne donc à n'importe quelle profondeur d'URL.

import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const build = join(dirname(fileURLToPath(import.meta.url)), '..', 'build');
const source = join(build, '404', 'index.html');

if (!existsSync(source)) {
	console.error('✕ build/404/index.html introuvable : le build a-t-il échoué ?');
	process.exit(1);
}
copyFileSync(source, join(build, '404.html'));
console.log('✓ build/404.html créé à partir de build/404/index.html');
