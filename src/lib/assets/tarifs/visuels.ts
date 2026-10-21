/**
 * Illustrations de la mascotte pour les cartes tarif (association choisie par Sébastien le
 * 21/10/2026). Fond blanc pur : fondues dans la carte blanche, affichées au repos seulement
 * (au survol, la carte passe à l'orange et montre la description). Clés : `name` des forfaits
 * (content/tarifs.ts).
 */
import type { Picture } from 'vite-imagetools';
import landing from './mascotte-renard-tarif-landing-page-performance.jpg?enhanced&w=640;320';
import vitrine from './mascotte-renard-tarif-site-vitrine-localisation.jpg?enhanced&w=640;320';
import refonte from './mascotte-renard-tarif-site-pro-refonte-responsive.jpg?enhanced&w=640;320';
import boutique from './mascotte-renard-tarif-boutique-woocommerce-mobile.jpg?enhanced&w=640;320';
import auditWp from './mascotte-renard-tarif-audit-technique-wordpress.jpg?enhanced&w=640;320';
import auditAuto from './mascotte-renard-tarif-audit-automatisation-processus.jpg?enhanced&w=640;320';

export const packageVisuals: Record<string, { src: Picture; alt: string }> = {
	'Landing page': {
		src: landing,
		alt: 'Dev, la mascotte, sur son portable devant une maquette de page web et un compteur de performance'
	},
	'Site vitrine': {
		src: vitrine,
		alt: 'Dev, la mascotte, présente une page web avec ses icônes de contact et une carte de localisation'
	},
	'Site pro et refonte PME': {
		src: refonte,
		alt: 'Dev, la mascotte, travaille sur une maquette de site et sa version mobile'
	},
	'Boutique WooCommerce': {
		src: boutique,
		alt: "Dev, la mascotte, un sac de courses à la main, à côté d'une fiche produit sur smartphone"
	},
	'Audit technique WordPress': {
		src: auditWp,
		alt: 'Dev, la mascotte, examine à la loupe un compteur de performance, des statistiques et un rapport WordPress'
	},
	'Audit automatisation': {
		src: auditAuto,
		alt: "Dev, la mascotte, montre un enchaînement d'automatisations relié par des engrenages"
	}
};
