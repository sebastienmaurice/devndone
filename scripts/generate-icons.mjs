// Génère les icônes PNG et l'image de partage à partir des assets de marque.
// À relancer si le monogramme ou le visuel mascotte change : `npm run icons`.
// sharp est déjà présent (dépendance de @sveltejs/enhanced-img).

import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const statik = join(root, 'static');

const NIGHT = '#0A0D11';
const NIGHT_RAISED = '#11171F';

const monogram = readFileSync(join(statik, 'favicon.svg'));

// Icônes d'application : le monogramme rendu en haute densité, aplati sur Night élevé
// (iOS n'accepte pas la transparence et applique son propre arrondi).
for (const [name, size] of [
	['apple-touch-icon.png', 180],
	['icon-192.png', 192],
	['icon-512.png', 512]
]) {
	await sharp(monogram, { density: 384 })
		.resize(size, size)
		.flatten({ background: NIGHT_RAISED })
		.png({ compressionLevel: 9 })
		.toFile(join(statik, name));
	console.log(`icons: ${name}`);
}

// Image de partage Open Graph 1200 × 630 : visuel mascotte (fond Night exact)
// centré sur un aplat Night.
const kv = join(root, 'src/lib/assets/brand/mascotte-renard-dev-n-done-fond-nuit.png');
const kvResized = await sharp(kv).resize({ width: 1200 }).toBuffer();
const { height: kvHeight = 0 } = await sharp(kvResized).metadata();

await sharp({ create: { width: 1200, height: 630, channels: 3, background: NIGHT } })
	.composite([{ input: kvResized, top: Math.round((630 - kvHeight) / 2), left: 0 }])
	.jpeg({ quality: 86, mozjpeg: true })
	.toFile(join(statik, 'og', 'dev-n-done-studio-digital-wordpress.jpg'));
console.log('icons: og/dev-n-done-studio-digital-wordpress.jpg');
