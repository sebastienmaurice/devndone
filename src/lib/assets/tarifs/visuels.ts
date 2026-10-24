/**
 * Illustrations de la mascotte pour les cartes et les pages d'offre (association choisie par
 * Sébastien le 21/10/2026). Fond blanc pur : fondues dans la carte blanche (PackageGrid), au repos
 * seulement : au survol, la carte passe en Bleu nuit et la mascotte s'efface (fond blanc).
 * Clés : `slug` des offres (content/tarifs.ts) et `maintenance`.
 * Sprint et maintenance : visuels existants réutilisés provisoirement, en attendant des poses
 * dédiées (à proposer à Sébastien avant toute création).
 */
import type { Picture } from 'vite-imagetools';
import landing from './mascotte-renard-tarif-landing-page-performance.jpg?enhanced&w=640;320';
import vitrine from './mascotte-renard-tarif-site-vitrine-localisation.jpg?enhanced&w=640;320';
import refonte from './mascotte-renard-tarif-site-pro-refonte-responsive.jpg?enhanced&w=640;320';
import boutique from './mascotte-renard-tarif-boutique-woocommerce-mobile.jpg?enhanced&w=640;320';
import auditWp from './mascotte-renard-tarif-audit-technique-wordpress.jpg?enhanced&w=640;320';
import auditAuto from './mascotte-renard-tarif-audit-automatisation-processus.jpg?enhanced&w=640;320';
import sprint from '../mascotte/mascotte-renard-dev-n-done-developpeur-wordpress-code.jpg?enhanced&w=640;320';
import maintenance from '../mascotte/mascotte-renard-creation-site-web-wordpress.jpg?enhanced&w=640;320';

export const offerVisuals: Record<string, { src: Picture; alt: string }> = {
	'landing-page': {
		src: landing,
		alt: 'Dev, la mascotte, sur son portable devant une maquette de page web et un compteur de performance'
	},
	'site-vitrine-wordpress': {
		src: vitrine,
		alt: 'Dev, la mascotte, présente une page web avec ses icônes de contact et une carte de localisation'
	},
	'refonte-site-wordpress': {
		src: refonte,
		alt: 'Dev, la mascotte, travaille sur une maquette de site et sa version mobile'
	},
	'boutique-woocommerce': {
		src: boutique,
		alt: "Dev, la mascotte, un sac de courses à la main, à côté d'une fiche produit sur smartphone"
	},
	'audit-technique-wordpress': {
		src: auditWp,
		alt: 'Dev, la mascotte, examine à la loupe un compteur de performance, des statistiques et un rapport WordPress'
	},
	'audit-automatisation': {
		src: auditAuto,
		alt: "Dev, la mascotte, montre un enchaînement d'automatisations relié par des engrenages"
	},
	'sprint-wordpress-woocommerce': {
		src: sprint,
		alt: 'Dev, la mascotte, assis en tailleur avec son portable, entre une fenêtre de code et un site WordPress'
	},
	maintenance: {
		src: maintenance,
		alt: 'Dev, la mascotte, à son bureau, devant un site WordPress affiché sur grand écran'
	}
};
