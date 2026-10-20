/**
 * Illustrations de la mascotte, une par expertise. Cartes : format 3:2 sur fond blanc ;
 * Full Stack (bandeau orange) : PNG détouré. Utilisées par « Notre expertise » (accueil,
 * /services/) et par l'en-tête de chaque page de service (/services/<id>/).
 * Clés : `id` des univers (content/services.ts).
 */
import type { Picture } from 'vite-imagetools';
import web from './mascotte-renard-creation-site-web-wordpress.jpg?enhanced&w=1200;720;360';
import design from './mascotte-renard-design-identite-visuelle.jpg?enhanced&w=1200;720;360';
import automatisation from './mascotte-renard-automatisation-processus.jpg?enhanced&w=1200;720;360';
import applications from './mascotte-renard-applications-logiciels-metier.jpg?enhanced&w=1200;720;360';
import applicationsHeader from './applications-tableau-de-bord-3d-dev-n-done.jpg?enhanced&w=1388;960;480';
import fullStack from './mascotte-renard-developpeur-full-stack.png?enhanced&w=1200;720;360&quality=40';

export const expertiseMascots: Record<string, { src: Picture; alt: string }> = {
	web: {
		src: web,
		alt: 'Dev, la mascotte, à son bureau, montre un site en cours de création sur grand écran'
	},
	design: {
		src: design,
		alt: "Dev, la mascotte, dessine sur une tablette graphique entouré de planches d'identité visuelle"
	},
	automatisation: {
		src: automatisation,
		alt: 'Dev, la mascotte, relie des applications entre elles dans un flux automatisé'
	},
	applications: {
		src: applications,
		alt: "Dev, la mascotte, montre le tableau de bord d'une application métier sur écran et mobile"
	},
	'full-stack': {
		src: fullStack,
		alt: 'Dev, la mascotte, code sur son portable entre un serveur Node.js, une API et une base de données'
	}
};

/**
 * Visuel d'en-tête propre à une page de service, à la place de la mascotte de la carte
 * (affiché en grand). Sans entrée ici, la page reprend l'illustration de la carte.
 */
export const expertiseHeaderVisuals: Record<string, { src: Picture; alt: string; wide: boolean }> =
	{
		applications: {
			src: applicationsHeader,
			alt: "Interfaces d'applications métier Dev'n Done en 3D : tableau de bord, flux d'automatisation, code, espace client et version mobile",
			wide: true
		}
	};
