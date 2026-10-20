/**
 * Exemple « Applications & logiciels » : logiciel de gestion d'affaires pour enseignistes,
 * en cours de développement. Présenté de façon anonyme (décision de Sébastien du 20/10/2026) :
 * aucun client, aucun partenaire nommé.
 * Source : dossier « Logiciel Enseigne » de Sébastien (principe, étapes, exemple conceptuel).
 * « Zen & Beauté » est un commerce fictif ; images illustratives, dimensions indicatives.
 */
export const logicielIntro = {
	eyebrow: 'Exemple en cours de développement',
	title: "Un logiciel de gestion d'affaires pour enseignistes",
	accent: 'pour enseignistes',
	lede: 'Relier le relevé de site, le chiffrage, la proposition visuelle, le devis, la validation du client et la fiche atelier : un seul dossier par affaire, de la première demande à la fabrication.'
} as const;

/** La chaîne d'une affaire, dans l'ordre */
export const logicielChain = [
	'Relevé',
	'Chiffrage',
	'Proposition visuelle',
	'Devis',
	'Décision client',
	'Fiche atelier'
] as const;

/** Exemple conceptuel en 4 étapes (images : src/lib/assets/logiciel/0X-*.jpg) */
export const logicielSteps = [
	{
		title: 'Le commerce nu',
		text: 'Le professionnel photographie le local. Le support existant est repéré et rattaché au dossier.'
	},
	{
		title: 'Les emplacements cotés',
		text: 'Enseigne de façade, potence double face, vitrophanies et porte reçoivent chacune leur dimension.'
	},
	{
		title: 'La proposition visuelle',
		text: 'Lettrage en relief, potence et vitrophanie, avec le logo et la palette du client. Le client se prononce sur une version précise.'
	},
	{
		title: 'La fiche technique atelier',
		text: "Schéma coté, couleurs, polices et fichiers vectoriels : ce que l'atelier doit savoir pour fabriquer."
	}
] as const;

/** Principes du logiciel */
export const logicielPrinciples = [
	{ title: 'Rejouable', text: "Un calcul doit pouvoir se refaire à l'identique." },
	{ title: 'Versionné', text: 'Chaque devis garde sa date et son auteur.' },
	{ title: 'Traçable', text: 'On retrouve les versions et les décisions prises.' },
	{ title: 'Adaptable', text: 'Des règles de chiffrage propres à chaque entreprise.' }
] as const;

export const logicielNote =
	'Logiciel en cours de développement. Exemple conceptuel : « Zen & Beauté » est un commerce fictif, les images sont illustratives et les dimensions indicatives.';
