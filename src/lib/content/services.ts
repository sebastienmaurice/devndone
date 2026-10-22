/**
 * Les univers (quatre cartes + une expertise complémentaire en bandeau) et le process.
 * Source : page provisoire (dépôt devndone, index.html, sections #services et #process).
 * « Applications & logiciels » et le bandeau « Full Stack » : maquette de Sébastien du 20/10/2026.
 * Textes repris tels quels : ne rien ajouter sans validation.
 */
export type Universe = {
	id: string;
	title: string;
	text: string;
	tags: readonly string[];
	/** Page dédiée : /services/<id>/ */
	path: `/services/${string}/`;
	/** Icône Lucide (nom du composant Icon) */
	icon: 'globe' | 'pen' | 'settings' | 'code' | 'layers';
	/** La maintenance WordPress (facultative, mensuelle) s'applique à cet univers */
	maintenance?: boolean;
	/** Titre de la page pour les moteurs de recherche (sans « · Dev'n Done ») */
	seoTitle: string;
	/** Description pour les moteurs de recherche (sinon `text`) */
	description?: string;
	/** Expertise complémentaire : bandeau orange sous les cartes, pas une carte */
	complementary?: boolean;
};

/** Recentrage du 21/10/2026 : WordPress et WooCommerce d'abord, les autres expertises en complément */
export const servicesIntro = {
	eyebrow: 'Expertises',
	title: "WordPress et WooCommerce d'abord",
	accent: 'WordPress et WooCommerce',
	lede: "Créer, refondre et faire évoluer des sites WordPress et des boutiques WooCommerce : c'est le cœur de mon travail. Le design, l'automatisation et le développement sur mesure viennent en complément, quand un projet en a besoin."
} as const;

export const universes: readonly Universe[] = [
	{
		id: 'web',
		title: 'Web',
		text: 'Sites vitrine, boutiques en ligne, refontes et optimisation SEO, avec une maintenance mensuelle facultative pour garder votre site à jour.',
		tags: ['Création', 'Refonte', 'WooCommerce', 'SEO', 'Maintenance'],
		seoTitle: 'Création et refonte de sites WordPress, maintenance',
		path: '/services/web/',
		icon: 'globe',
		maintenance: true
	},
	{
		id: 'design',
		title: 'Design',
		text: 'Identité visuelle, direction artistique, images IA et mockups : une esthétique cohérente pour marquer les esprits.',
		tags: ['Identité visuelle', 'Direction artistique', 'Images IA', 'Mockups'],
		description:
			'Identité visuelle, direction artistique, images IA et mockups : une esthétique cohérente pour marquer les esprits. Studio digital indépendant à Caudry.',
		seoTitle: 'Identité visuelle et direction artistique',
		path: '/services/design/',
		icon: 'pen'
	},
	{
		id: 'automatisation',
		title: 'Automatisation',
		text: 'Et si cette tâche pouvait se faire toute seule ? Audit des processus, automatisation ciblée ou complète.',
		tags: ['Audit', 'Automatisation ciblée', 'Make · Zapier'],
		description:
			'Et si cette tâche pouvait se faire toute seule ? Audit des processus, automatisation ciblée ou complète avec Make ou Zapier. Studio indépendant à Caudry.',
		seoTitle: 'Automatisation des processus avec Make et Zapier',
		path: '/services/automatisation/',
		icon: 'settings'
	},
	{
		id: 'applications',
		title: 'Applications & logiciels',
		text: 'Des applications métier, espaces clients, outils sur mesure et interfaces applicatives.',
		tags: [
			'Applications métier',
			'Espaces clients',
			'Outils sur mesure',
			'Interfaces applicatives'
		],
		description:
			"Applications métier, espaces clients, outils sur mesure et interfaces applicatives. Exemple en développement : un logiciel de gestion d'affaires pour enseignistes.",
		seoTitle: 'Applications métier et logiciels sur mesure',
		path: '/services/applications/',
		icon: 'layers'
	},
	{
		id: 'full-stack',
		title: 'Full Stack',
		text: 'Du front-end au back-end, une solution complète pour votre projet.',
		tags: ['Interfaces', 'API', 'Back-end'],
		description:
			'Du front-end au back-end, une solution complète pour votre projet : interfaces, API et back-end en JavaScript, Node.js, Express et PostgreSQL.',
		seoTitle: 'Développement full stack : interfaces, API, back-end',
		path: '/services/full-stack/',
		icon: 'code',
		complementary: true
	}
];

export const processIntro = {
	eyebrow: 'Mon process',
	title: "De l'idée à la mise en ligne, étape par étape.",
	accent: 'étape par étape'
} as const;

export const processSteps = [
	{ title: 'Comprendre', text: 'On échange sur vos besoins et vos objectifs.', icon: 'message' },
	{ title: 'Concevoir', text: 'Je vous propose une solution sur mesure.', icon: 'lightbulb' },
	{ title: 'Développer', text: 'Le design prend vie, le code fait le reste.', icon: 'code' },
	{ title: 'Livrer', text: "On teste, on ajuste, et c'est en ligne !", icon: 'rocket' }
] as const;

/** Slogan de marque (accueil, note manuscrite ; pied de page, sur une ligne), en deux lignes fixes.
 *  Formulation exacte choisie par Sébastien le 21/10/2026. */
export const heroSlogan = ['WordPress, WooCommerce', 'et du travail bien fini'] as const;
