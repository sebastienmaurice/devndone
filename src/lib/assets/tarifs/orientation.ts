/**
 * Icônes du guide « Quelle offre pour votre situation ? » (page Tarifs), choix de Sébastien le
 * 24/10/2026 : des icônes dédiées plutôt que les mascottes, déjà présentes sur les cartes d'offre
 * de la même page. Fond blanc : elles sont posées dans un médaillon blanc, qui reste blanc quand
 * la tuile passe en Bleu nuit au survol. Clés : `slug` des offres (content/tarifs.ts,
 * offersGuide) et `maintenance`. Images décoratives : le texte de la tuile porte le sens.
 */
import type { Picture } from 'vite-imagetools';
import vitrine from './orientation/icone-site-vitrine-wordpress-localisation.jpg?enhanced';
import landing from './orientation/icone-landing-page-campagne-objectif.jpg?enhanced';
import refonte from './orientation/icone-refonte-site-wordpress-avant-apres.jpg?enhanced';
import auditWp from './orientation/icone-audit-technique-wordpress-performance.jpg?enhanced';
import auditAuto from './orientation/icone-audit-automatisation-processus.jpg?enhanced';
import boutique from '../agences/icone-renfort-woocommerce-boutique-en-ligne.jpg?enhanced';
import sprint from '../agences/icone-corrections-evolutions-site-wordpress.jpg?enhanced';
import maintenance from '../maintenance/icone-maintenance-technique-wordpress.jpg?enhanced';

export const guideVisuals: Record<string, Picture> = {
	'site-vitrine-wordpress': vitrine,
	'landing-page': landing,
	'refonte-site-wordpress': refonte,
	'boutique-woocommerce': boutique,
	'sprint-wordpress-woocommerce': sprint,
	'audit-technique-wordpress': auditWp,
	'audit-automatisation': auditAuto,
	maintenance
};
