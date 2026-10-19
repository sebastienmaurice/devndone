/**
 * Les quatre univers et le process.
 * Source : page provisoire (dépôt devndone, index.html, sections #services et #process).
 * Textes repris tels quels : ne rien ajouter sans validation.
 */
export type Universe = {
	id: string;
	title: string;
	text: string;
	tags: readonly string[];
	/** Page dédiée : /services/<id>/ */
	path: `/services/${string}/`;
	/** Libellé court (header, pied de page) */
	navLabel: string;
	/** Icône Lucide (nom du composant Icon) */
	icon: 'globe' | 'pen' | 'settings' | 'code';
	/** Forfaits liés (noms de content/tarifs.ts) */
	packages: readonly string[];
	/** La maintenance WordPress en abonnement s'applique à cet univers */
	maintenance?: boolean;
};

export const servicesIntro = {
	eyebrow: 'Notre expertise',
	title: 'Quatre univers. Un même objectif : votre projet.',
	accent: 'votre projet',
	lede: "Web, design, automatisation et développement sur mesure. Une seule vision, du premier brief jusqu'à la mise en ligne."
} as const;

export const universes: readonly Universe[] = [
	{
		id: 'web',
		title: 'Web',
		text: 'Sites vitrine, boutiques en ligne, refontes et optimisation SEO, avec une maintenance en abonnement pour garder votre site à jour et protégé.',
		tags: ['Création', 'Refonte', 'WooCommerce', 'SEO', 'Maintenance'],
		path: '/services/web/',
		navLabel: 'Web',
		icon: 'globe',
		packages: [
			'Audit technique WordPress',
			'Lancement site WordPress',
			'Landing page WordPress',
			'Refonte WordPress PME',
			'Boutique WooCommerce'
		],
		maintenance: true
	},
	{
		id: 'design',
		title: 'Design',
		text: 'Identité visuelle, direction artistique, images IA et mockups : une esthétique cohérente pour marquer les esprits.',
		tags: ['Identité visuelle', 'Direction artistique', 'Images IA', 'Mockups'],
		path: '/services/design/',
		navLabel: 'Identité',
		icon: 'pen',
		packages: []
	},
	{
		id: 'automatisation',
		title: 'Automatisation',
		text: 'Et si cette tâche pouvait se faire toute seule ? Audit des processus, automatisation ciblée ou complète.',
		tags: ['Audit', 'Automatisation ciblée', 'Make · Zapier'],
		path: '/services/automatisation/',
		navLabel: 'Automatisation',
		icon: 'settings',
		packages: ['Audit automatisation']
	},
	{
		id: 'full-stack',
		title: 'Full Stack',
		text: 'Quand WordPress ne suffit plus : applications, API, espaces clients et outils métier sur mesure.',
		tags: ['Svelte', 'Node.js', 'PostgreSQL', 'API'],
		path: '/services/full-stack/',
		navLabel: 'Full Stack',
		icon: 'code',
		packages: []
	}
];

export const processIntro = {
	eyebrow: 'Mon process',
	title: "De l'idée à la mise en ligne, en toute confiance.",
	accent: 'en toute confiance'
} as const;

export const processSteps = [
	{ title: 'Comprendre', text: 'On échange sur vos besoins et vos objectifs.', icon: 'message' },
	{ title: 'Concevoir', text: 'Je vous propose une solution sur mesure.', icon: 'lightbulb' },
	{ title: 'Développer', text: 'Le design prend vie, le code fait le reste.', icon: 'code' },
	{ title: 'Livrer', text: "On teste, on ajuste, et c'est en ligne !", icon: 'rocket' }
] as const;

/** Slogan manuscrit du hero (maquette du 19/10/2026) */
export const heroSlogan = 'Des solutions sur mesure pour faire décoller vos idées';
