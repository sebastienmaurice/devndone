/**
 * Page « Agences » (/agences/) : renfort et sous-traitance WordPress / WooCommerce.
 * Cadre validé par Sébastien le 21/10/2026 : activité indépendante sans équipe, tarif de
 * référence 350 € par jour, demi-journée à 175 € pour une intervention courte et cadrée,
 * marque blanche possible selon la mission, paiement sur facture avec une échéance fixée au
 * devis ou au contrat (aucun paiement à la commande imposé, aucun délai chiffré inventé).
 *
 * Compétences citées : seulement celles que montrent les réalisations (content/realisations.ts) :
 * WordPress et Elementor (7 projets), WooCommerce (GSTI, Maxilou, PANO, Harmony Valse),
 * résolution d'erreurs serveur (Harmony Valse), migration (GSTI, Palimpseste Urbain),
 * performance (Palimpseste Urbain, Alternativ' Uniforme), JavaScript (Ciné Délices).
 * Volontairement absents tant qu'ils ne sont pas confirmés : Gutenberg, ACF, Divi, Figma, Svelte.
 * Les réalisations sont des projets menés en direct : ne jamais les présenter comme de la
 * sous-traitance. Aucun délai de réponse, aucune disponibilité chiffrée, aucune référence d'agence.
 */
export const agencesPage = {
	path: '/agences/',
	seoTitle: 'Sous-traitance WordPress et WooCommerce pour agences web',
	description:
		'Développeur WordPress et WooCommerce indépendant en renfort pour les agences web : intégration, évolutions, corrections et front-end, marque blanche possible.',
	label: 'Agences web',
	title: 'Un développeur WordPress en renfort pour votre agence',
	accent: 'en renfort',
	lede: 'Un pic de charge, une boutique WooCommerce à terminer, un site client qui plante : vous me confiez une partie précise du projet, sur un périmètre écrit avant de commencer.',
	cta: "Discuter d'un besoin de renfort",
	/** Lien du formulaire avec le type de demande prérempli (voir contact/+page.svelte) */
	contactHref: '/contact/?type=agence'
} as const;

/** Ce qu'une agence peut confier, d'après les réalisations */
export const agencesTasks = [
	{
		icon: 'site',
		title: 'Intégration WordPress',
		text: "Monter des pages ou un site complet à partir de votre maquette et de votre charte. Mes projets sont construits avec Elementor ; pour un autre outil, on en parle avant de s'engager."
	},
	{
		icon: 'cart',
		title: 'Renfort WooCommerce',
		text: "Configurer une boutique, intégrer un catalogue, régler paiement et livraison, mettre en place une demande de devis ou faire évoluer un parcours d'achat existant."
	},
	{
		icon: 'bug',
		title: 'Corrections et évolutions',
		text: "Résoudre une erreur serveur, un conflit d'extensions ou un bug d'affichage, ajouter une section ou une fonctionnalité sur un site déjà en ligne."
	},
	{
		icon: 'code',
		title: 'Responsive et front-end',
		text: "Reprendre l'affichage mobile, intégrer des éléments en HTML, CSS et JavaScript, alléger les pages qui chargent trop lentement."
	}
] as const;

/** Cadre de travail : uniquement des points validés */
export const agencesFrame = [
	{
		label: 'Tarif de référence',
		value:
			'350 € par jour, ou 175 € la demi-journée pour une intervention courte, clairement définie et acceptée avant le démarrage. La durée estimée est écrite au devis ; si elle doit être dépassée, je vous demande votre accord avant de continuer.'
	},
	{
		label: 'Facturation',
		value:
			'Sur facture, avec une échéance fixée au devis ou au contrat, selon la mission. Aucun paiement à la commande imposé.'
	},
	{
		label: 'Marque blanche',
		value: 'Possible, selon la mission et les modalités convenues ensemble.'
	},
	{
		label: 'Interlocuteur',
		value:
			"Vous échangez avec la personne qui fait le travail. Dev'n Done n'a pas d'équipe : la charge que je peux prendre se décide mission par mission."
	},
	{
		label: 'Fin de mission',
		value: 'Un compte rendu de ce qui a été fait.'
	}
] as const;

export const agencesSteps = [
	{
		title: 'Vous décrivez la mission',
		text: 'Le contexte, la maquette ou le site existant, ce qui est attendu et votre échéance.'
	},
	{
		title: 'On fixe le cadre',
		text: 'Périmètre, durée en jours ou en demi-journées, échéance de facturation, marque blanche ou non : tout est écrit au devis.'
	},
	{
		title: "J'interviens",
		text: 'Sur le périmètre validé, avec les accès que vous me transmettez.'
	},
	{
		title: 'Je vous rends compte',
		text: 'Ce qui a été fait, ce qui reste éventuellement à prévoir.'
	}
] as const;

/** Projets menés en direct, choisis pour le type de travail qu'une agence peut confier */
export const agencesProjects = ['gsti', 'harmony-valse', 'palimpseste-urbain'] as const;

export const agencesProjectsNote =
	"Ces projets ont été réalisés en direct pour leurs clients, pas en sous-traitance. Ils montrent le type de travail que je peux prendre en charge pour vous : migration vers WooCommerce, résolution d'erreurs serveur, refonte et performance.";

export const agencesFaq = [
	{
		q: 'Travaillez-vous en marque blanche ?',
		a: "Oui, quand la mission s'y prête. Les modalités (contact avec votre client, mention du travail) sont convenues ensemble au devis."
	},
	{
		q: 'Combien coûte une intervention ?',
		a: 'Le tarif de référence est de 350 € par jour. Une demi-journée à 175 € est possible pour une intervention courte, clairement définie et acceptée avant le démarrage. La durée est estimée avant de commencer et écrite au devis. TVA non applicable, art. 293 B du CGI.'
	},
	{
		q: 'Comment se passe la facturation ?',
		a: "Sur facture, avec une échéance définie au préalable dans le devis ou le contrat. Aucun paiement à la commande n'est imposé."
	},
	{
		q: 'Êtes-vous disponible rapidement ?',
		a: 'Cela dépend des missions en cours. Décrivez-moi votre besoin : je vous dis si je peux le prendre, et à partir de quand.'
	},
	{
		q: 'Avez-vous une équipe ?',
		a: "Non. Dev'n Done est une activité indépendante : je réalise moi-même le travail que vous me confiez."
	}
] as const;
