/**
 * Exemple « Applications & logiciels » : logiciel de gestion d'affaires pour enseignistes,
 * en cours de développement. Présenté de façon anonyme (décision de Sébastien du 20/10/2026) :
 * aucun client, aucun partenaire nommé.
 * Source : dossier « Logiciel Enseigne » de Sébastien (principe, étapes, exemple conceptuel).
 * « Zen & Beauté » est un commerce fictif ; images illustratives, dimensions indicatives.
 */
/** Page dédiée au logiciel */
export const logicielPage = {
	path: '/services/applications/logiciel-gestion-affaires-enseignistes/',
	seoTitle: "Logiciel de gestion d'affaires pour enseignistes (en développement)",
	description:
		'Un logiciel pour enseignistes qui relie relevé de site, chiffrage, proposition visuelle, devis, décision du client et fiche atelier dans un seul dossier par affaire.'
} as const;

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

/**
 * Compléments tirés du dossier de présentation (« business case signalétique »), en version
 * générique : ni client, ni tarif, ni cadre contractuel propre à un prospect.
 */

/** Cartes de la section « Projets » de la page Applications & logiciels */
export const applicationsProjectsIntro = {
	eyebrow: 'Applications & logiciels',
	title: 'Des outils métier, conçus avec ceux qui les utilisent.',
	accent: 'conçus avec ceux qui les utilisent'
} as const;

/** Carte d'appel de la page Applications, à la place des deux cartes « Projet à venir » (option A
 *  validée par Sébastien le 24/10/2026). Lien : formulaire de contact. */
export const applicationsCta = {
	title: 'Votre outil métier',
	text: "Un outil interne, un logiciel métier ou une application web pour votre activité ? Chaque besoin s'étudie au cas par cas, après un premier échange."
} as const;

/** Les 4 idées clés du logiciel */
export const logicielPillars = [
	{
		title: 'Un dossier unique par affaire',
		text: "Les informations de l'affaire sont rassemblées dans un seul dossier, de la demande initiale à la préparation de la fabrication. Le dossier distingue ce qui est confirmé, ce qui reste une hypothèse et ce qui manque."
	},
	{
		title: 'Un chiffrage qui se rejoue',
		text: "Le prix se construit ligne par ligne, avec les règles propres à chaque entreprise, et peut se rejouer à l'identique. Si une donnée change, le calcul et le devis le signalent."
	},
	{
		title: 'Des versions datées et traçables',
		text: 'Chaque devis, chaque maquette garde son auteur, sa date et la décision du client sur une version précise. On retrouve ce qui a été décidé, et quand.'
	},
	{
		title: "L'IA au service du métier",
		text: "L'IA peut accélérer la proposition visuelle. Le professionnel garde le relevé, la validation et les documents de fabrication."
	}
] as const;

/** Le parcours d'une affaire, en 5 phases */
export const logicielPhases = [
	{
		title: "Cadrer l'affaire",
		steps: ['Demande', 'Qualification', 'Relevé de site', 'Étude et conformité'],
		text: 'Un dossier ouvert dès le premier contact, des informations marquées confirmées ou hypothèses, la liste des manques et des questions au client.',
		output: 'Dossier qualifié : informations, cotes, contraintes'
	},
	{
		title: 'Concevoir et chiffrer',
		steps: ['Proposition visuelle', 'Fournisseurs', 'Chiffrage'],
		text: 'Des demandes de prix préparées depuis le dossier, un calcul rejouable, une proposition visuelle assistée par IA et rattachée au dossier.',
		output: 'Calcul traçable et proposition rattachée au dossier'
	},
	{
		title: 'Proposer et faire décider',
		steps: ['Devis', 'Maquette et décision'],
		text: 'Des devis versionnés, avec validité et alerte si une donnée change. La décision du client porte sur une version précise de la maquette.',
		output: 'Version validée, datée, avec son auteur'
	},
	{
		title: 'Préparer la fabrication',
		steps: ['BAT et signature', 'Fiche atelier'],
		text: 'Un BAT préparé depuis la version validée et signé par le client. Une fiche atelier avec schéma coté et fichiers de découpe.',
		output: 'Dossier de production : cotes, matières, couleurs, fichiers'
	},
	{
		title: 'Réaliser et encaisser',
		steps: ['Planning et pose', 'Réception', 'Facturation', 'Paiement'],
		text: 'Un planning des équipes, un procès-verbal de réception, une facture liée au devis validé et le suivi des encaissements.',
		output: 'Affaire close, facturée, encaissée'
	}
] as const;

/** Ce que cela apporte */
export const logicielBenefits = [
	{
		title: "À l'entreprise",
		items: [
			'Moins de ressaisies et de reprises',
			'Une proposition prête plus vite',
			'Un atelier qui reçoit un dossier complet'
		]
	},
	{
		title: 'Aux équipes',
		items: [
			'Des dossiers de niveau homogène',
			'Des délais et des points de blocage visibles',
			'Chaque équipe garde ses règles et ses données'
		]
	},
	{
		title: 'Au client final',
		items: [
			'Il visualise son futur commerce',
			"Il comprend ce qu'il valide",
			'Il retrouve ce qui a été décidé'
		]
	}
] as const;

/** Mises en situation (images : src/lib/assets/logiciel/) */
export const logicielGallery = [
	{ caption: 'Relevé de façade et cotes en réalité augmentée, sur tablette' },
	{ caption: "Plan d'enseigne, couleurs RAL et documents dans l'interface" },
	{ caption: 'Prise de mesures de la façade et des vitrages' },
	{ caption: 'Plan technique partagé avec le client' }
] as const;
