/**
 * Icônes de la maintenance WordPress, fournies par Sébastien le 24/10/2026 (fond blanc, comme la
 * carte). Clés : `id` des formules (content/tarifs.ts, maintenancePlans). Images décoratives : le
 * nom de la formule porte le sens.
 * `maintenanceVisual` : visuel d'en-tête de la page Maintenance WordPress.
 */
import type { Picture } from 'vite-imagetools';
import essentiel from './icone-maintenance-essentiel-mises-a-jour-wordpress.jpg?enhanced';
import confort from './icone-maintenance-confort-securite-wordpress.jpg?enhanced';
import serenite from './icone-maintenance-serenite-protection-site-wordpress.jpg?enhanced';
import technique from './icone-maintenance-technique-wordpress.jpg?enhanced';

export const planVisuals: Record<string, Picture> = { essentiel, confort, serenite };

export const maintenanceVisual = {
	src: technique,
	alt: "Mallette de serveur, tournevis et coche verte : la maintenance technique d'un site WordPress"
};
