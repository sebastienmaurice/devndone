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
	// Titre, description et Open Graph de l'accueil : développeur web full stack, sites web,
	// automatisation, WordPress et WooCommerce (positionnement précisé le 16/11/2026)
	homeTitle: "Dev'n Done · Développeur web full stack et WordPress",
	description:
		'Développeur web full stack : création et refonte de sites, automatisation des processus, WordPress et WooCommerce, pour les entreprises et les agences.',
	ogTitle: "Dev'n Done · Des projets pensés pour être Done.",
	ogDescription:
		'Développement full stack, sites web, automatisation des processus, WordPress et WooCommerce.',
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
