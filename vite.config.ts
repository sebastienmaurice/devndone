import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		// Doit précéder sveltekit() : génère AVIF / WebP / srcset au build
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Site 100 % statique pour l'hébergement mutualisé Hostinger :
			// chaque URL devient un vrai fichier HTML dans build/.
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined, // pas de SPA : aucune page rendue côté client uniquement
				precompress: false, // LiteSpeed compresse à la volée
				strict: true // le build échoue si une page ne peut pas être prérendue
			}),

			paths: {
				// Chemins absolus (/_app/…) : indispensable pour la page 404 servie
				// par Apache sur n'importe quelle URL profonde.
				relative: false
			},

			prerender: {
				handleHttpError: 'fail', // un lien interne cassé fait échouer le build
				handleMissingId: 'fail',
				// Pages non liées depuis la navigation, à générer quand même
				entries: ['*', '/404/', '/sitemap.xml', '/robots.txt']
			},

			// En-tête CSP injecté en <meta> avec les empreintes des scripts de SvelteKit.
			// Pas de 'unsafe-inline' pour les scripts ; frame-ancestors est posé dans .htaccess
			// (non supporté en <meta>).
			csp: {
				mode: 'hash',
				directives: {
					'default-src': ['self'],
					'script-src': ['self'],
					'style-src': ['self', 'unsafe-inline'],
					'img-src': ['self', 'data:'],
					'font-src': ['self'],
					'connect-src': ['self'],
					'form-action': ['self'],
					'base-uri': ['self'],
					'object-src': ['none']
				}
			}
		})
	]
});
