/**
 * Illustrations de la mascotte, une par expertise (format 3:2, fond blanc).
 * Utilisées par les cartes « Notre expertise » (accueil, /services/) et par l'en-tête
 * de chaque page de service (/services/<id>/). Clés : `id` des univers (content/services.ts).
 */
import type { Picture } from 'vite-imagetools';
import web from './expertise-web.jpg?enhanced&w=1200;720;360';
import design from './expertise-design.jpg?enhanced&w=1200;720;360';
import automatisation from './expertise-automatisation.jpg?enhanced&w=1200;720;360';
import fullStack from './expertise-fullstack.jpg?enhanced&w=1200;720;360';

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
	'full-stack': {
		src: fullStack,
		alt: 'Dev, la mascotte, code sur son portable entre interface, API et base de données'
	}
};
