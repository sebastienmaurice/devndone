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
};

export const servicesIntro = {
	eyebrow: 'Nos expertises',
	title: 'Quatre univers. Un même objectif : votre projet.',
	lede: "Web, design, automatisation et développement sur mesure. Une seule vision, du premier brief jusqu'à la mise en ligne."
} as const;

export const universes: readonly Universe[] = [
	{
		id: 'web',
		title: 'Web',
		text: 'Sites vitrine, boutiques en ligne, refontes et optimisation SEO, avec une maintenance en abonnement pour garder votre site à jour et protégé.',
		tags: ['Création', 'Refonte', 'WooCommerce', 'SEO', 'Maintenance']
	},
	{
		id: 'design',
		title: 'Design',
		text: 'Identité visuelle, direction artistique, images IA et mockups : une esthétique cohérente pour marquer les esprits.',
		tags: ['Identité visuelle', 'Direction artistique', 'Images IA', 'Mockups']
	},
	{
		id: 'automatisation',
		title: 'Automatisation',
		text: 'Et si cette tâche pouvait se faire toute seule ? Audit des processus, automatisation ciblée ou complète.',
		tags: ['Audit', 'Automatisation ciblée', 'Make · Zapier']
	},
	{
		id: 'full-stack',
		title: 'Full Stack',
		text: 'Quand WordPress ne suffit plus : applications, API, espaces clients et outils métier sur mesure.',
		tags: ['Svelte', 'Node.js', 'PostgreSQL', 'API']
	}
];

export const processIntro = {
	eyebrow: 'Mon process',
	title: "De l'idée à la mise en ligne, en toute confiance."
} as const;

export const processSteps = [
	{ title: 'Comprendre', text: 'On échange sur vos besoins et vos objectifs.' },
	{ title: 'Concevoir', text: 'Je vous propose une solution sur mesure.' },
	{ title: 'Développer', text: 'Le design prend vie, le code fait le reste.' },
	{ title: 'Livrer', text: "On teste, on ajuste, et c'est en ligne !" }
] as const;
