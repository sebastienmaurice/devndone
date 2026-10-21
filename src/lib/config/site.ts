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
	// Titre, description et Open Graph de l'accueil : spécialité WordPress / WooCommerce, deux publics
	// (entreprises en direct, agences web en renfort), décidé par Sébastien le 21/10/2026
	homeTitle: "Dev'n Done · Développeur WordPress et WooCommerce indépendant",
	description:
		'Développeur WordPress et WooCommerce indépendant : création, refonte et évolution de sites pour les entreprises, renfort technique pour les agences web.',
	ogTitle: "Dev'n Done · Des projets pensés pour être Done.",
	ogDescription:
		'Développeur WordPress et WooCommerce indépendant, pour les entreprises et en renfort des agences web.',
	themeColor: '#0A0D11',
	ogImage: '/og/dev-n-done-studio-digital-wordpress.jpg',
	ogImageAlt:
		"Dev, la mascotte DEV'n DONE, derrière le lettrage Dev'n Done, avec la signature Développer / Piloter / Livrer"
} as const;

/** Transforme un chemin interne en URL absolue canonique. */
export function absoluteUrl(path: string): string {
	return new URL(path, site.url).href;
}
