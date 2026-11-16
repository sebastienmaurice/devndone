/**
 * Les univers (quatre cartes + le développement sur mesure en bandeau) et le process.
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
	/** H1 de la page dédiée, quand `title` (menu, fil d'Ariane, cartes) est trop court pour la page */
	heading?: string;
	/** Passage du H1 en orange (titre bicolore) */
	headingAccent?: string;
	/** Titre de la page pour les moteurs de recherche (sans « · Dev'n Done ») */
	seoTitle: string;
	/** Description pour les moteurs de recherche (sinon `text`) */
	description?: string;
	/** Mise en avant en bandeau orange sous les cartes (pas une carte) : développement sur mesure */
	complementary?: boolean;
};

/** Positionnement précisé le 16/11/2026 : expertises plurielles, WordPress et WooCommerce en font partie
 *  sans définir à eux seuls l'activité (remplace le positionnement du 22/10/2026).
 *  Voix de marque : Dev'n Done à la troisième personne. */
export const servicesIntro = {
	eyebrow: 'Expertises',
	title: 'Cinq expertises autour du web',
	accent: 'autour du web',
	lede: 'Développement full stack et applications sur mesure, WordPress et WooCommerce, automatisation des processus, identité visuelle : chaque projet mobilise les expertises dont il a besoin.'
} as const;

export const universes: readonly Universe[] = [
	{
		id: 'web',
		title: 'Web',
		/** H1 validé par Sébastien le 24/10/2026 (audit SEO) */
		heading: 'Création et refonte de sites WordPress et WooCommerce',
		headingAccent: 'WordPress et WooCommerce',
		text: 'Sites vitrine, boutiques en ligne, refontes et optimisation SEO, avec une maintenance mensuelle facultative pour garder votre site à jour.',
		tags: ['Création', 'Refonte', 'WooCommerce', 'SEO', 'Maintenance'],
		seoTitle: 'Création et refonte de sites WordPress, maintenance',
		path: '/services/web/',
		icon: 'globe',
		maintenance: true
	},
	{
		id: 'design',
		/** H1 = titre SEO validé (audit SEO du 16/11/2026), nom court en surtitre */
		headingAccent: 'direction artistique',
		title: 'Design',
		text: 'Identité visuelle, direction artistique, images IA et mockups : une esthétique cohérente pour marquer les esprits.',
		tags: ['Identité visuelle', 'Direction artistique', 'Images IA', 'Mockups'],
		description:
			'Identité visuelle, direction artistique, images IA et mockups : une esthétique cohérente pour marquer les esprits.',
		seoTitle: 'Identité visuelle et direction artistique',
		path: '/services/design/',
		icon: 'pen'
	},
	{
		id: 'automatisation',
		/** H1 = titre SEO validé (audit SEO du 16/11/2026), nom court en surtitre */
		headingAccent: 'Make et Zapier',
		title: 'Automatisation',
		text: 'Et si cette tâche pouvait se faire toute seule ? Audit des processus, automatisation ciblée ou complète.',
		tags: ['Audit', 'Automatisation ciblée', 'Make · Zapier'],
		description:
			'Et si cette tâche pouvait se faire toute seule ? Audit des processus, automatisation ciblée ou complète avec Make ou Zapier.',
		seoTitle: 'Automatisation des processus avec Make et Zapier',
		path: '/services/automatisation/',
		icon: 'settings'
	},
	{
		id: 'applications',
		/** H1 = titre SEO validé (audit SEO du 16/11/2026), nom court en surtitre */
		headingAccent: 'sur mesure',
		title: 'Applications & logiciels',
		text: 'Outils métier et applications web sur mesure, étudiés au cas par cas. Un logiciel pour enseignistes est en cours de développement.',
		tags: ['Outils sur mesure', 'Applications web', 'Étude au cas par cas'],
		description:
			"Outils métier et applications web sur mesure, étudiés au cas par cas. Exemple en développement : un logiciel de gestion d'affaires pour enseignistes.",
		seoTitle: 'Applications métier et logiciels sur mesure',
		path: '/services/applications/',
		icon: 'layers'
	},
	{
		id: 'full-stack',
		/** H1 = titre SEO validé (audit SEO du 16/11/2026), nom court en surtitre */
		headingAccent: 'interfaces, API, back-end',
		title: 'Full Stack',
		text: 'Interfaces, API et back-end : des applications web conçues sur mesure.',
		tags: ['Interfaces', 'API', 'Back-end'],
		description:
			'Interfaces, API et back-end en JavaScript, Node.js, Express et PostgreSQL : des applications web conçues sur mesure, étudiées au cas par cas.',
		seoTitle: 'Développement full stack : interfaces, API, back-end',
		path: '/services/full-stack/',
		icon: 'code',
		complementary: true
	}
];

export const processIntro = {
	eyebrow: 'La méthode',
	title: "De l'idée à la mise en ligne, étape par étape.",
	accent: 'étape par étape'
} as const;

export const processSteps = [
	{ title: 'Comprendre', text: 'Un échange sur vos besoins et vos objectifs.', icon: 'message' },
	{ title: 'Concevoir', text: 'Une solution sur mesure, proposée et chiffrée.', icon: 'lightbulb' },
	{ title: 'Développer', text: 'Le design prend vie, le code fait le reste.', icon: 'code' },
	{ title: 'Livrer', text: 'Tests, ajustements, puis mise en ligne.', icon: 'rocket' }
] as const;

/** Slogan de marque (accueil, note manuscrite ; pied de page, sur une ligne), en deux lignes fixes.
 *  Formulation choisie par Sébastien le 22/10/2026 (positionnement élargi au développement web). */
export const heroSlogan = ['Du web bien conçu.', 'Du travail bien fait.'] as const;
