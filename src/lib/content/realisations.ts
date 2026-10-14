/**
 * Réalisations.
 * Source : page provisoire (dépôt devndone, index.html, section #realisations).
 * Textes et liens repris tels quels : ne rien ajouter sans validation.
 */
export type Project = {
	name: string;
	stack: string;
	text: string;
	url: string;
};

export const realisationsIntro = {
	eyebrow: 'Réalisations',
	title: 'Des projets qui sont vraiment Done.',
	lede: "Des projets concrets pour de vrais besoins, tels qu'ils existent aujourd'hui."
} as const;

export const projects: readonly Project[] = [
	{
		name: 'Palimpseste Urbain',
		stack: 'WordPress · Elementor Pro · SEO',
		text: "Agence d'architecture et d'urbanisme. Refonte WordPress, direction artistique, SEO.",
		url: 'https://www.palimpseste-urbain.com/'
	},
	{
		name: 'GSTI',
		stack: 'Wix → WordPress · WooCommerce',
		text: 'Migration de Wix vers WordPress et WooCommerce. Catalogue B2B et devis en ligne.',
		url: 'https://gsti62.com/'
	},
	{
		name: 'Ciné Délices',
		stack: 'Svelte · Node.js · PostgreSQL',
		text: 'Application full stack de recettes inspirées du cinéma.',
		url: 'https://sebastienmaurice.github.io/cine-delices.html'
	},
	{
		name: 'Maxilou',
		stack: 'WordPress · Catalogue · Devis',
		text: 'Location de matériel BTP et espaces verts. Catalogue par catégories et devis en ligne.',
		url: 'https://maxilou.fr/'
	},
	{
		name: 'Petit Château Vercourt',
		stack: 'WordPress · Réservation · FR/EN',
		text: "Chambres d'hôtes en Picardie. Réservation en ligne, versions française et anglaise.",
		url: 'https://www.petitchateauvercourt.com/'
	},
	{
		name: "PANO Sign'Service",
		stack: 'WordPress · Elementor · E-commerce',
		text: 'Refonte WordPress Elementor. Vitrine et e-commerce de signalétique.',
		url: 'https://www.pano-douai.fr/'
	}
];
