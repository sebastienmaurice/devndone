/**
 * Illustrations des missions de la page Agences (section « Ce que vous pouvez déléguer »), fournies
 * par Sébastien le 24/10/2026. Fond blanc, comme la carte. Clés : `id` des missions
 * (content/agences.ts, agencesTasks). Images décoratives : le titre de la carte porte le sens.
 */
import type { Picture } from 'vite-imagetools';
import integration from './icone-integration-wordpress-elementor.jpg?enhanced';
import woocommerce from './icone-renfort-woocommerce-boutique-en-ligne.jpg?enhanced';
import corrections from './icone-corrections-evolutions-site-wordpress.jpg?enhanced';
import frontEnd from './icone-responsive-integration-front-end.jpg?enhanced';

export const missionVisuals: Record<string, Picture> = {
	integration,
	woocommerce,
	corrections,
	'front-end': frontEnd
};
