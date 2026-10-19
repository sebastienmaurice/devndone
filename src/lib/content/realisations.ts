/**
 * Réalisations.
 * Sources : page provisoire (dépôt devndone, index.html, section #realisations) et, pour
 * Harmony Valse, la fiche transmise par Sébastien le 14/10/2026 (portfolio Malt).
 * Visuels : D:/GRAPHIQUE/MALT - GRAPISTE.COM/Web/CMS retenus, recadrés sur la zone des écrans
 * (sans les textes ni les encarts « avis client » des compositions).
 * Textes et liens repris tels quels : ne rien ajouter sans validation.
 */
export type ProjectDetails = {
	subtitle: string;
	sector: string;
	period: string;
	location: string;
	skills: readonly string[];
	summary: string;
	context: string;
	interventions: readonly string[];
	result: string;
	/** Fiche du projet sur le portfolio Malt */
	malt: string;
};

export type Project = {
	/** Étude de cas : /realisations/<slug>/ */
	slug: string;
	name: string;
	stack: string;
	text: string;
	url: string;
	/** Visuel de présentation : src/lib/assets/projets/<image>.jpg (recadré sur les écrans) */
	image: string;
	/** Fiche complète, pour une future page projet (non affichée dans les cartes) */
	details?: ProjectDetails;
};

export const realisationsIntro = {
	eyebrow: 'Réalisations',
	title: 'Des projets qui sont vraiment Done.',
	lede: "Des projets concrets pour de vrais besoins, tels qu'ils existent aujourd'hui."
} as const;

export const projects: readonly Project[] = [
	{
		slug: 'palimpseste-urbain',
		name: 'Palimpseste Urbain',
		stack: 'WordPress · Elementor Pro · SEO',
		text: "Agence d'architecture et d'urbanisme. Refonte WordPress, direction artistique, SEO.",
		url: 'https://www.palimpseste-urbain.com/',
		image: 'palimpseste-urbain'
	},
	{
		slug: 'gsti',
		name: 'GSTI',
		stack: 'Wix → WordPress · WooCommerce',
		text: 'Migration de Wix vers WordPress et WooCommerce. Catalogue B2B et devis en ligne.',
		url: 'https://gsti62.com/',
		image: 'gsti'
	},
	{
		slug: 'cine-delices',
		name: 'Ciné Délices',
		stack: 'Svelte · Node.js · PostgreSQL',
		text: 'Application full stack de recettes inspirées du cinéma.',
		url: 'https://sebastienmaurice.github.io/cine-delices.html',
		image: 'cine-delices'
	},
	{
		slug: 'maxilou',
		name: 'Maxilou',
		stack: 'WordPress · Catalogue · Devis',
		text: 'Location de matériel BTP et espaces verts. Catalogue par catégories et devis en ligne.',
		url: 'https://maxilou.fr/',
		image: 'maxilou'
	},
	{
		slug: 'petit-chateau-vercourt',
		name: 'Petit Château Vercourt',
		stack: 'WordPress · Réservation · FR/EN',
		text: "Chambres d'hôtes en Picardie. Réservation en ligne, versions française et anglaise.",
		url: 'https://www.petitchateauvercourt.com/',
		image: 'petit-chateau-vercourt'
	},
	{
		slug: 'pano-signservice',
		name: "PANO Sign'Service",
		stack: 'WordPress · Elementor · E-commerce',
		text: 'Refonte WordPress Elementor. Vitrine et e-commerce de signalétique.',
		url: 'https://www.pano-douai.fr/',
		image: 'pano-douai'
	},
	{
		slug: 'harmony-valse',
		name: 'Harmony Valse',
		stack: 'WordPress · Elementor · WooCommerce',
		text: 'Cours de valse à Paris. Refonte WordPress Elementor & WooCommerce : réservation et boutique en ligne.',
		url: 'https://harmonyvalse.com/',
		image: 'harmony-valse',
		details: {
			subtitle: 'Refonte WordPress Elementor & WooCommerce - réservation et boutique en ligne',
			sector: 'Divertissements & loisirs',
			period: 'août 2026 - septembre 2026',
			location: 'Paris, France',
			skills: [
				'Refonte WordPress',
				'WooCommerce',
				'Elementor',
				'Développeur WordPress',
				'Optimisation UX/UI',
				'Intégration WordPress'
			],
			summary:
				"Refonte technique et visuelle du site WordPress d'une école de valse à Paris, avec réservation de cours, ateliers et soirées ainsi qu'une boutique en ligne.",
			context:
				"Le site rencontrait des erreurs serveur bloquantes avec Elementor et plusieurs problèmes d'expérience sur mobile.",
			interventions: [
				'Refonte visuelle et intégration sous WordPress / Elementor',
				"Diagnostic et résolution d'erreurs serveur 500 liées à Elementor, PHP et à la gestion mémoire",
				'Refonte sur mesure du menu mobile et du panier',
				'Mise en place et optimisation de la boutique WooCommerce',
				"Amélioration du parcours d'achat et de réservation",
				"Optimisation responsive avec tests jusqu'à 320 px",
				"Intégration d'un planning interactif en ligne",
				"Création d'un formulaire de candidature multi-étapes",
				'Nettoyage et allègement des extensions'
			],
			result:
				'Site WordPress stabilisé et modernisé, avec une expérience mobile améliorée et un parcours plus fluide pour les réservations et les achats en ligne.',
			malt: 'https://www.malt.fr/profile/semauri#portfolio-item-6aa6e41f57d26cc7c4d117ed'
		}
	}
];
