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
	// Titre, description et Open Graph de l'accueil : ceux du site en ligne (index.html, branche main)
	homeTitle: "Dev'n Done · Studio digital indépendant · WordPress, design, automatisation",
	description:
		'Studio digital indépendant : sites WordPress au forfait, maintenance, identité visuelle, automatisation et développement sur mesure pour TPE, artisans et PME.',
	ogTitle: "Dev'n Done · Des projets pensés pour être Done.",
	ogDescription: 'Un studio digital indépendant qui conçoit, développe et livre des solutions web.',
	themeColor: '#0A0D11',
	ogImage: '/og/dev-n-done-studio-digital-wordpress.jpg',
	ogImageAlt:
		"Dev, la mascotte DEV'n DONE, derrière le lettrage Dev'n Done, avec la signature Développer / Piloter / Livrer"
} as const;

/** Transforme un chemin interne en URL absolue canonique. */
export function absoluteUrl(path: string): string {
	return new URL(path, site.url).href;
}
