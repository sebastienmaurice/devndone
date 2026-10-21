// Recopie le CSS du design system (source de vérité) dans le site, puis le formate.
//   npm run ds:sync
// Règle : on ne modifie JAMAIS src/lib/styles/{tokens,base,layout,components}.css à la main.
// On modifie D:\DEV'n DONE\DESIGN\brand\design-system\css\, on vérifie la doc, puis on synchronise.

import { copyFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, '..', 'DESIGN', 'brand', 'design-system', 'css');
const target = join(root, 'src', 'lib', 'styles');
const files = ['tokens.css', 'base.css', 'layout.css', 'components.css'];

if (!existsSync(source)) {
	console.error(`✕ Design system introuvable : ${source}`);
	process.exit(1);
}

for (const f of files) {
	copyFileSync(join(source, f), join(target, f));
	console.log(`ds:sync ${f}`);
}
execSync(`npx prettier --write ${files.map((f) => `"src/lib/styles/${f}"`).join(' ')}`, {
	cwd: root,
	stdio: 'ignore'
});
console.log('✓ Styles synchronisés avec le design system.');
