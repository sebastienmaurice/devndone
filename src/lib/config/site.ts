/**
 * Source unique des informations globales du site.
 * Aucune valeur ici n'est secrète : tout finit dans le HTML public.
 */
export const site = {
	name: "Dev'n Done",
	wordmark: "Dev'n Done",
	/** URL canonique de production (sans www, sans slash final) */
	url: 'https://devndone.com',
	lang: 'fr',
	locale: 'fr_FR',
	tagline: ['Développer', 'Piloter', 'Livrer'],
	// Titre, description et Open Graph de l'accueil : studio web et solutions digitales
	// (positionnement validé le 16/11/2026)
	homeTitle: "Dev'n Done : studio web, WordPress et solutions digitales",
	description:
		'Studio web indépendant : sites et applications sur mesure, WordPress et WooCommerce, automatisation, identité visuelle, avec un interlocuteur unique.',
	ogTitle: "Dev'n Done · Des projets pensés pour être Done.",
	ogDescription:
		'Studio web indépendant : sites et applications sur mesure, WordPress et WooCommerce, automatisation, identité visuelle.',
	themeColor: '#0A0D11',
	ogImage: '/og/dev-n-done-studio-digital-wordpress.jpg',
	ogImageAlt:
		"Dev, la mascotte Dev'n Done, derrière le lettrage Dev'n Done, avec la signature Développer / Piloter / Livrer"
} as const;

/** Identifiant de l'entreprise dans les données structurées (JSON-LD) : relie l'entreprise, le
 *  site, la personne et les services d'une page à l'autre */
export const organizationId = `${site.url}/#organisation`;

/** Transforme un chemin interne en URL absolue canonique. */
export function absoluteUrl(path: string): string {
	return new URL(path, site.url).href;
}
