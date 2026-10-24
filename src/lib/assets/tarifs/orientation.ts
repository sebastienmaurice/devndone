/**
 * Icônes du guide « Quelle offre pour votre situation ? » (page Tarifs), choix de Sébastien le
 * 24/10/2026 : des icônes dédiées plutôt que les mascottes, déjà présentes sur les cartes d'offre
 * de la même page. Fond blanc (fondu par multiply dans la tuile). Clés : `slug` des offres
 * (content/tarifs.ts, offersGuide) et `maintenance`. Images décoratives : le texte porte le sens.
 *
 * À recevoir de Sébastien : site vitrine, landing page, refonte, audit technique, audit
 * automatisation. Sans icône, la tuile s'affiche sans visuel.
 */
import type { Picture } from 'vite-imagetools';
import boutique from '../agences/icone-renfort-woocommerce-boutique-en-ligne.jpg?enhanced';
import sprint from '../agences/icone-corrections-evolutions-site-wordpress.jpg?enhanced';
import maintenance from '../maintenance/icone-maintenance-technique-wordpress.jpg?enhanced';

export const guideVisuals: Record<string, Picture> = {
	'boutique-woocommerce': boutique,
	'sprint-wordpress-woocommerce': sprint,
	maintenance
};
