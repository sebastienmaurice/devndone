/**
 * Source unique des informations globales du site.
 * Aucune valeur ici n'est secrète : tout finit dans le HTML public.
 */
export const site = {
	name: "DEV'n DONE",
	wordmark: "Dev'n Done",
	/** URL canonique de production (sans www, sans slash final) */
	url: 'https://devndone.com',
	lang: 'fr',
	locale: 'fr_FR',
	tagline: ['Développer', 'Piloter', 'Livrer'],
	description:
		"Studio digital indépendant : conception, développement, automatisation et maintenance d'outils numériques sur mesure.",
	themeColor: '#0A0D11',
	ogImage: '/og/og-default.jpg',
	ogImageAlt:
		"Dev, la mascotte DEV'n DONE, derrière le lettrage Dev'n Done — Développer / Piloter / Livrer"
} as const;

/** Transforme un chemin interne en URL absolue canonique. */
export function absoluteUrl(path: string): string {
	return new URL(path, site.url).href;
}
