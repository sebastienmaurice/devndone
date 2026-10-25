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
	// Titre, description et Open Graph de l'accueil : développement web, WordPress et WooCommerce en
	// spécialité, voix de marque à la troisième personne (22/10/2026)
	homeTitle: "Dev'n Done · Développement web, WordPress et WooCommerce",
	description:
		"Dev'n Done crée, refond et optimise des sites web, de la maquette à l'intégration front-end, avec une spécialité WordPress et WooCommerce.",
	ogTitle: "Dev'n Done · Des projets pensés pour être Done.",
	ogDescription:
		'Développement web, design et solutions sur mesure, avec une spécialité WordPress et WooCommerce.',
	themeColor: '#0A0D11',
	ogImage: '/og/dev-n-done-studio-digital-wordpress.jpg',
	ogImageAlt:
		"Dev, la mascotte DEV'n DONE, derrière le lettrage Dev'n Done, avec la signature Développer / Piloter / Livrer"
} as const;

/** Identifiant de l'entreprise dans les données structurées (JSON-LD) : relie l'entreprise, le
 *  site, la personne et les services d'une page à l'autre */
export const organizationId = `${site.url}/#organisation`;

/** Transforme un chemin interne en URL absolue canonique. */
export function absoluteUrl(path: string): string {
	return new URL(path, site.url).href;
}
