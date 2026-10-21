/**
 * Catalogue des prestations : source unique des prix, périmètres, pages d'offre et maintenance.
 * Catalogue validé par Sébastien le 21/10/2026 : prestations au forfait, maintenance facultative.
 * Les abonnements de création sur 24 mois sont abandonnés.
 *
 * TVA : franchise en base (auto-entrepreneur). Les prix affichés sont les prix payés par le client,
 * sans TVA ni mention « HT » ; mention légale : « TVA non applicable, art. 293 B du CGI ».
 * Les plafonds de jours sont des limites de travail, jamais des délais calendaires garantis.
 * Ne rien ajouter (garantie, délai, quota, outil) sans validation de Sébastien.
 */

/** Mention TVA affichée près des prix (franchise en base) */
export const vatNotice = 'TVA non applicable, art. 293 B du CGI.';

/** Modalités de paiement proposées, à formaliser dans les devis et les CGV */
export const paymentTerms = {
	staged:
		'50 % à la commande, 30 % à une étape intermédiaire définie au devis (par exemple la validation de la maquette), 20 % avant la mise en ligne.',
	upfront: 'Paiement à la commande.'
} as const;

/** Rubrique de rattachement d'une offre (pages /services/<universe>/<slug>/) */
export type OfferUniverse = 'web' | 'automatisation';

export type Offer = {
	slug: string;
	universe: OfferUniverse;
	/** Groupe sur la page Tarifs */
	group: 'creation' | 'ponctuel';
	name: string;
	/** Coupure du nom sur les cartes, quand la répartition automatique ne donne pas deux lignes */
	cardLines?: readonly [string, string];
	price: {
		amount: string;
		/** « À partir de » : prix confirmé après cadrage */
		from?: boolean;
		unit?: '/ jour';
	};
	/** Pastille de la carte : limite de travail ou mode de chiffrage */
	badge: string;
	/** Texte court de la carte */
	summary: string;
	payment: keyof typeof paymentTerms;
	seoTitle: string;
	description: string;
	/** En-tête de la page d'offre */
	title: string;
	accent?: string;
	lede: string;
	/** Besoin auquel répond la prestation */
	need: string;
	includes: readonly string[];
	excludes: readonly string[];
	steps: readonly { title: string; text: string }[];
	/** Durée de travail et conditions */
	duration: string;
	clientProvides: readonly string[];
	/** Prestations complémentaires, sur devis */
	extras: readonly string[];
	faq: readonly { q: string; a: string }[];
	/** Réalisations directement liées à l'offre (slugs de content/realisations.ts) */
	projects?: readonly string[];
};

/** Réponses communes aux pages d'offre (informations validées) */
const faqDomain = {
	q: 'Le nom de domaine est-il compris ?',
	a: "Non. Le nom de domaine est facturé séparément. L'hébergement, les licences premium et les services tiers ne sont pas compris non plus, sauf mention explicite au devis."
};
const faqOverrun = {
	q: 'Et si mon projet dépasse le forfait ?',
	a: "Le travail supplémentaire fait l'objet d'un devis complémentaire, accepté avant toute exécution. Rien n'est facturé sans votre accord."
};
const faqVat = {
	q: 'Les prix sont-ils HT ou TTC ?',
	a: "Les prix affichés sont ceux que vous payez : Dev'n Done applique la franchise en base de TVA (TVA non applicable, art. 293 B du CGI)."
};
const faqPaymentStaged = {
	q: 'Comment se passe le paiement ?',
	a: paymentTerms.staged + ' Les échéances sont précisées dans le devis.'
};

export const offers: readonly Offer[] = [
	{
		slug: 'landing-page',
		universe: 'web',
		group: 'creation',
		name: 'Landing page',
		cardLines: ['Landing', 'page'],
		price: { amount: '1 750 €' },
		badge: '5 jours de travail au plus',
		summary:
			'Une page sur mesure pour un objectif précis : prise de contact, demande de devis, lancement de service ou campagne.',
		payment: 'staged',
		seoTitle: 'Landing page WordPress sur mesure : 1 750 €',
		description:
			'Landing page WordPress conçue pour un objectif précis : cadrage, design sur mesure, intégration responsive, formulaire simple et SEO de base. Forfait de 1 750 €.',
		title: 'Une landing page conçue pour un seul objectif',
		accent: 'un seul objectif',
		lede: "Une page unique, pensée autour de l'action que vous attendez du visiteur : vous contacter, demander un devis, découvrir un nouveau service ou répondre à une campagne.",
		need: "Une campagne, un nouveau service ou un salon arrive, et votre site actuel ne permet pas de présenter cette offre seule, avec un appel à l'action clair.",
		includes: [
			"Cadrage de l'objectif et de la structure de la page",
			'Conception visuelle sur mesure',
			'Intégration responsive sous WordPress',
			'Formulaire simple, si nécessaire',
			'SEO on-page de base et vérifications avant livraison',
			'Un cycle de retours consolidés',
			"Jusqu'à 5 jours de travail"
		],
		excludes: [
			'Rédaction complète des textes',
			"Création d'identité visuelle (logo, charte)",
			'Fonctionnalités complexes et intégration de services tiers',
			'Nom de domaine, hébergement et licences premium'
		],
		steps: [
			{ title: 'Cadrage', text: 'Objectif, public, message et structure de la page.' },
			{ title: 'Devis et acompte', text: 'Le périmètre est écrit ; 50 % à la commande.' },
			{ title: 'Conception', text: 'Proposition visuelle, puis intégration WordPress.' },
			{
				title: 'Retours et mise en ligne',
				text: 'Un cycle de retours consolidés, vérifications, mise en ligne.'
			}
		],
		duration:
			'5 jours de travail au plus. Le calendrier dépend de la réception de vos contenus et de vos retours : il est fixé ensemble au devis.',
		clientProvides: [
			'Les textes de la page, ou leurs éléments principaux',
			'Les images et le logo',
			'Les accès nécessaires (WordPress, nom de domaine, hébergement)'
		],
		extras: ['Rédaction des textes', 'Pages supplémentaires', 'Maintenance mensuelle'],
		faq: [faqDomain, faqOverrun, faqPaymentStaged, faqVat]
	},
	{
		slug: 'site-vitrine-wordpress',
		universe: 'web',
		group: 'creation',
		name: 'Site vitrine WordPress',
		price: { amount: '3 500 €' },
		badge: '10 jours de travail au plus',
		summary:
			"Jusqu'à 5 pages pour présenter votre activité, conçues et intégrées sous WordPress, avec formulaire de contact et SEO de base.",
		payment: 'staged',
		seoTitle: "Site vitrine WordPress jusqu'à 5 pages : 3 500 €",
		description:
			"Site vitrine WordPress jusqu'à 5 pages : design, intégration responsive, formulaire de contact, SEO de base et mise en ligne. Forfait de 3 500 €.",
		title: "Un site vitrine WordPress clair, jusqu'à 5 pages",
		accent: "jusqu'à 5 pages",
		lede: 'Un site pour présenter votre activité, vos services et vos coordonnées, que vous pouvez mettre à jour vous-même. Le périmètre est fixé avant de commencer, le prix aussi.',
		need: "Vous n'avez pas encore de site, ou votre présence se limite à une page de réseau social : vos clients ne trouvent pas facilement ce que vous faites ni comment vous joindre.",
		includes: [
			"Jusqu'à 5 pages",
			'Conception visuelle et intégration WordPress responsive',
			'Formulaire de contact et intégrations simples',
			'SEO on-page de base',
			'Contrôles techniques et mise en ligne',
			'Un cycle de retours consolidés',
			"Jusqu'à 10 jours de travail"
		],
		excludes: [
			'Rédaction des textes et production des photos',
			"Création d'identité visuelle (logo, charte)",
			'Pages au-delà de 5, fonctionnalités avancées',
			'Nom de domaine, hébergement et licences premium'
		],
		steps: [
			{ title: 'Cadrage', text: 'Pages, contenus, direction graphique validée en amont.' },
			{ title: 'Devis et acompte', text: 'Le périmètre est écrit ; 50 % à la commande.' },
			{ title: 'Conception', text: 'Maquette validée (30 %), puis intégration WordPress.' },
			{
				title: 'Retours et mise en ligne',
				text: 'Un cycle de retours consolidés, contrôles ; 20 % avant la mise en ligne.'
			}
		],
		duration:
			"10 jours de travail au plus. Ce n'est pas un délai de livraison : le calendrier dépend de la réception de vos contenus et de vos validations, et il est fixé ensemble au devis.",
		clientProvides: [
			'Les textes de chaque page',
			'Les photos, le logo et les informations pratiques (horaires, adresse, coordonnées)',
			"La validation de la direction graphique avant l'intégration",
			'Les accès nécessaires (nom de domaine, hébergement)'
		],
		extras: [
			'Pages supplémentaires',
			'Rédaction des textes',
			'Fonctionnalités avancées (réservation, espace client…)',
			'Maintenance mensuelle'
		],
		faq: [
			{
				q: 'Pourrai-je modifier mon site moi-même ?',
				a: "Oui, le site est construit sous WordPress : vous pouvez mettre à jour vos textes et vos images depuis l'administration."
			},
			{
				q: "Je n'ai pas encore mes textes : est-ce un problème ?",
				a: "Les textes, photos et informations sont fournis par vous. Le travail avance à mesure qu'ils arrivent ; la rédaction peut être chiffrée à part si besoin."
			},
			faqDomain,
			faqOverrun,
			faqPaymentStaged,
			faqVat
		],
		projects: ['petit-chateau-vercourt']
	},
	{
		slug: 'refonte-site-wordpress',
		universe: 'web',
		group: 'creation',
		name: 'Refonte WordPress',
		price: { amount: '4 900 €', from: true },
		badge: 'Prix confirmé après cadrage',
		summary:
			"Analyse de l'existant, refonte de la structure et de l'interface, reprise des contenus et redirections prévues au devis.",
		payment: 'staged',
		seoTitle: 'Refonte de site WordPress : à partir de 4 900 €',
		description:
			"Refonte de site WordPress : analyse de l'existant, nouvelle structure, reprise des contenus, migrations et redirections au devis. À partir de 4 900 €.",
		title: 'Refondre votre site WordPress sans repartir de zéro',
		accent: 'sans repartir de zéro',
		lede: 'Votre site existe, mais il a vieilli, il est lent ou difficile à faire évoluer. La refonte part de ce qui fonctionne déjà et de ce qui doit changer, après un diagnostic.',
		need: 'Un site daté, lent sur mobile ou difficile à mettre à jour, qui ne reflète plus votre activité et dont vous ne voulez pas perdre le référencement.',
		includes: [
			"Analyse initiale de l'existant",
			"Refonte de la structure et de l'interface",
			'Reprise des contenus définis au devis',
			'Intégration responsive sous WordPress',
			'Migrations et redirections prévues au périmètre',
			'Contrôles avant mise en ligne'
		],
		excludes: [
			'Pages et contenus non listés au devis',
			'Corrections et allers-retours illimités',
			'Développements spécifiques non prévus au cadrage',
			'Nom de domaine, hébergement et licences premium'
		],
		steps: [
			{ title: 'Diagnostic', text: 'Analyse du site actuel : structure, contenus, technique.' },
			{
				title: 'Cadrage et devis',
				text: 'Pages, contenus repris, redirections : le prix est confirmé.'
			},
			{ title: 'Refonte', text: 'Maquette validée, puis intégration et reprise des contenus.' },
			{ title: 'Contrôles et mise en ligne', text: 'Redirections, vérifications, bascule.' }
		],
		duration:
			'La durée de travail dépend du périmètre : elle est estimée au diagnostic et écrite dans le devis.',
		clientProvides: [
			"Les accès au site actuel et à l'hébergement",
			'La liste des pages et contenus à conserver, à modifier ou à supprimer',
			'Les nouveaux textes et visuels, le cas échéant'
		],
		extras: [
			'Pages ou fonctionnalités supplémentaires',
			'Rédaction ou réécriture des contenus',
			'Maintenance mensuelle'
		],
		faq: [
			{
				q: 'Pourquoi un prix « à partir de » ?',
				a: 'Chaque site existant est différent : nombre de pages, contenus à reprendre, redirections. Le prix final est confirmé après le diagnostic, avant tout engagement.'
			},
			faqDomain,
			faqOverrun,
			faqPaymentStaged,
			faqVat
		],
		projects: ['palimpseste-urbain', 'gsti', 'pano-signservice', 'harmony-valse']
	},
	{
		slug: 'boutique-woocommerce',
		universe: 'web',
		group: 'creation',
		name: 'Boutique WooCommerce',
		price: { amount: '6 500 €', from: true },
		badge: 'Prix confirmé après cadrage',
		summary:
			"Une boutique standard jusqu'à 15 produits simples : paiement, livraison simple, panier et commande testés.",
		payment: 'staged',
		seoTitle: 'Boutique WooCommerce : à partir de 6 500 €',
		description:
			"Création de boutique WooCommerce standard : jusqu'à 15 produits simples, un moyen de paiement, livraison simple, parcours d'achat testé. À partir de 6 500 €.",
		title: 'Une boutique WooCommerce prête à vendre',
		accent: 'prête à vendre',
		lede: "Une boutique standard, configurée et testée de la fiche produit jusqu'à l'email de confirmation. Le prix final est confirmé après cadrage.",
		need: 'Vous voulez vendre en ligne un catalogue simple, avec un paiement et une livraison fiables, sans partir sur une solution surdimensionnée.',
		includes: [
			'Configuration de WooCommerce',
			"Jusqu'à 15 fiches produits simples, avec données et images fournies",
			"Configuration d'un moyen de paiement",
			'Règles de livraison simples',
			'Pages de boutique, panier et commande',
			"Tests du parcours d'achat et des emails standards",
			'Mise en ligne et vérifications responsive'
		],
		excludes: [
			'Connexion à un ERP ou à un logiciel de gestion',
			'Abonnements et produits récurrents',
			'Règles logistiques complexes',
			'Imports massifs et produits complexes en grand nombre',
			'Développements spécifiques',
			'Nom de domaine, hébergement et licences premium'
		],
		steps: [
			{ title: 'Cadrage', text: 'Catalogue, paiement, livraison : le prix est confirmé.' },
			{ title: 'Devis et acompte', text: 'Le périmètre est écrit ; 50 % à la commande.' },
			{ title: 'Construction', text: 'Boutique, fiches produits, paiement et livraison.' },
			{
				title: 'Tests et mise en ligne',
				text: 'Commande test de bout en bout, emails, mise en ligne.'
			}
		],
		duration:
			"La durée de travail est estimée au cadrage et écrite dans le devis. Elle dépend aussi de l'ouverture de votre compte de paiement et de la réception des fiches produits.",
		clientProvides: [
			'Les données des produits (noms, descriptions, prix) et leurs images',
			'Le compte du moyen de paiement choisi, ouvert à votre nom',
			'Vos règles de livraison et vos conditions générales de vente',
			'Les accès nécessaires (nom de domaine, hébergement)'
		],
		extras: [
			'Produits supplémentaires ou variables',
			'Moyens de paiement ou de livraison supplémentaires',
			'Maintenance mensuelle'
		],
		faq: [
			{
				q: 'Pourquoi un prix « à partir de » ?',
				a: "Le catalogue, la livraison et le paiement varient d'une boutique à l'autre. Le prix final est confirmé après cadrage, avant tout engagement."
			},
			faqDomain,
			faqOverrun,
			faqPaymentStaged,
			faqVat
		],
		projects: ['harmony-valse', 'pano-signservice']
	},
	{
		slug: 'sprint-wordpress-woocommerce',
		universe: 'web',
		group: 'ponctuel',
		name: 'Sprint WordPress / WooCommerce',
		cardLines: ['Sprint WordPress', '/ WooCommerce'],
		price: { amount: '350 €', unit: '/ jour' },
		badge: 'Demi-journée à 175 €, sur devis',
		summary:
			'Une intervention ponctuelle pour corriger ou faire évoluer un site WordPress ou WooCommerce existant, à la journée ou à la demi-journée.',
		payment: 'upfront',
		seoTitle: 'Intervention WordPress et WooCommerce : 350 € par jour',
		description:
			'Sprint WordPress ou WooCommerce : diagnostic, devis, intervention ciblée sur un site existant. 350 € par jour, 175 € la demi-journée pour une intervention courte.',
		title: 'Un problème ou une évolution sur votre site WordPress ?',
		accent: 'votre site WordPress',
		lede: 'Une intervention ciblée, chiffrée en jours ou en demi-journées après un diagnostic, pour régler un problème précis ou faire évoluer un site existant.',
		need: 'Votre site fonctionne, mais quelque chose bloque ou manque : une erreur, une extension en conflit, une section à ajouter, un réglage WooCommerce à revoir.',
		includes: [
			'Échange et diagnostic de la demande',
			'Devis en jours ou en demi-journées, validé avant de commencer',
			'Intervention ciblée sur le périmètre du devis',
			"Votre accord avant tout dépassement de l'estimation",
			'Compte rendu de ce qui a été fait'
		],
		excludes: [
			'Refonte complète du site',
			'Développement complexe',
			'Demandes hors du périmètre validé au devis'
		],
		steps: [
			{ title: 'Échange', text: "Vous décrivez le problème ou l'évolution souhaitée." },
			{
				title: 'Diagnostic et devis',
				text: 'Périmètre et durée estimée (jours ou demi-journées) écrits au devis.'
			},
			{ title: 'Validation et paiement', text: 'Le devis est accepté et réglé à la commande.' },
			{ title: 'Intervention', text: 'Travail sur le périmètre validé, puis compte rendu.' }
		],
		duration:
			'La durée est estimée au diagnostic, en jours ou en demi-journées, et fixée dans le devis. Si le travail doit dépasser cette estimation, je vous demande votre accord avant de continuer.',
		clientProvides: [
			"Une description du problème ou de l'évolution souhaitée",
			'Les accès nécessaires (administration WordPress, hébergement)'
		],
		extras: ['Maintenance mensuelle', 'Audit technique complet du site'],
		faq: [
			{
				q: 'Quel type de demande convient à un sprint ?',
				a: "Une demande précise sur un site existant : corriger une erreur, résoudre un conflit d'extensions, ajouter une section ou ajuster un réglage WooCommerce. Une refonte complète relève d'un autre forfait."
			},
			{
				q: 'Peut-on commander une demi-journée ?',
				a: 'Oui, pour une intervention courte, clairement définie et acceptée avant le démarrage : 175 €. Toutes les demandes ne tiennent pas en une demi-journée : la durée est estimée au diagnostic, et un travail plus long est chiffré en jours.'
			},
			{
				q: 'Comment se passe le paiement ?',
				a:
					paymentTerms.upfront +
					" Le montant correspond à la durée écrite au devis. Pour une mission de sous-traitance confiée par une agence, la facturation suit les modalités et l'échéance fixées au devis ou au contrat."
			},
			faqVat
		]
	},
	{
		slug: 'audit-technique-wordpress',
		universe: 'web',
		group: 'ponctuel',
		name: 'Audit technique WordPress',
		price: { amount: '490 €' },
		badge: 'Environ 1 jour de travail',
		summary:
			"Un diagnostic de l'état technique de votre site, avec des recommandations classées par priorité. Les corrections ne sont pas comprises.",
		payment: 'upfront',
		seoTitle: 'Audit technique de site WordPress : 490 €',
		description:
			"Audit technique WordPress d'environ une journée : extensions, performance, SEO technique de base, sécurité et sauvegardes de base, recommandations priorisées. 490 €.",
		title: 'Savoir où en est votre site WordPress',
		accent: 'votre site WordPress',
		lede: "Un diagnostic d'environ une journée pour savoir ce qui ralentit, fragilise ou pénalise votre site, et par quoi commencer.",
		need: "Votre site est lent, affiche des erreurs ou n'a pas été entretenu depuis longtemps, et vous ne savez pas par où commencer.",
		includes: [
			'État général du site et de ses extensions',
			'Performance et Core Web Vitals',
			'SEO technique de base',
			'Affichage responsive et erreurs visibles',
			'Sauvegardes et sécurité de base',
			'Synthèse écrite avec recommandations priorisées',
			'Courte restitution'
		],
		excludes: ['La correction des problèmes détectés', "L'audit de contenu ou de stratégie SEO"],
		steps: [
			{ title: 'Commande', text: 'Paiement à la commande et transmission des accès.' },
			{ title: 'Analyse', text: 'Environ une journée de diagnostic technique.' },
			{ title: 'Synthèse', text: 'Constats et recommandations, classés par priorité.' },
			{ title: 'Restitution', text: 'Un court échange pour parcourir les priorités.' }
		],
		duration: 'Environ une journée de travail. La date de remise est fixée à la commande.',
		clientProvides: ['Un accès administrateur au site', "Si possible, un accès à l'hébergement"],
		extras: ['Corrections, sous forme de sprint', 'Maintenance mensuelle'],
		faq: [
			{
				q: 'Les problèmes trouvés sont-ils corrigés ?',
				a: "Non. L'audit établit un diagnostic et des priorités. Les corrections peuvent ensuite être chiffrées, par exemple sous forme de sprint."
			},
			{ q: 'Comment se passe le paiement ?', a: paymentTerms.upfront },
			faqVat
		]
	},
	{
		slug: 'audit-automatisation',
		universe: 'automatisation',
		group: 'ponctuel',
		name: 'Audit automatisation',
		price: { amount: '390 €' },
		badge: 'Environ 1 jour de travail',
		summary:
			"L'analyse d'un processus défini et des pistes d'automatisation priorisées. Aucune automatisation n'est développée dans ce forfait.",
		payment: 'upfront',
		seoTitle: "Audit d'automatisation de processus : 390 €",
		description:
			"Audit automatisation : analyse d'un processus métier défini, tâches répétitives, pistes d'automatisation priorisées, synthèse écrite et restitution. 390 €.",
		title: "Repérer ce qui peut s'automatiser",
		accent: 'automatiser',
		lede: "Une analyse d'un processus précis de votre activité pour identifier les tâches répétitives et les automatisations qui valent la peine d'être mises en place.",
		need: 'Une tâche revient chaque semaine (relances, saisies, copier-coller entre outils) et vous vous demandez si elle pourrait se faire toute seule.',
		includes: [
			"Analyse d'un processus métier défini",
			'Repérage des tâches répétitives',
			"Pistes d'automatisation identifiées et hiérarchisées",
			'Recommandations concrètes',
			'Synthèse écrite et courte restitution'
		],
		excludes: [
			"Le développement ou la mise en production d'automatisations",
			"L'analyse de plusieurs processus dans le même forfait"
		],
		steps: [
			{ title: 'Commande', text: 'Le processus à analyser est défini ; paiement à la commande.' },
			{ title: 'Échange', text: 'Vous décrivez le processus et les outils utilisés.' },
			{ title: 'Analyse', text: 'Tâches répétitives, pistes, priorités.' },
			{ title: 'Restitution', text: 'Synthèse écrite et court échange.' }
		],
		duration: 'Environ une journée de travail. La date de remise est fixée à la commande.',
		clientProvides: [
			'La description du processus et des outils utilisés',
			"Un moment d'échange pour le parcourir ensemble"
		],
		extras: ['Mise en place des automatisations, sur devis séparé'],
		faq: [
			{
				q: 'Les automatisations sont-elles mises en place ?',
				a: "Non. L'audit livre des recommandations priorisées. Toute mise en œuvre fait l'objet d'un devis séparé."
			},
			{ q: 'Comment se passe le paiement ?', a: paymentTerms.upfront },
			faqVat
		]
	}
];

/** Prix affiché (composant PriceTag) : libellé constant, montant sans « € », unité éventuelle */
export const priceParts = (o: Offer) => ({
	label: o.price.from
		? 'À partir de'
		: o.price.unit
			? 'Tarif journalier'
			: o.group === 'creation'
				? 'Forfait'
				: 'Prix unique',
	value: o.price.amount.replace(/\s*€$/, ''),
	unit: o.price.unit
});

/** Adresse de la page d'une offre */
export const offerPath = (o: Pick<Offer, 'universe' | 'slug'>) =>
	`/services/${o.universe}/${o.slug}/` as const;

export const offersIntro = {
	title: 'Des forfaits clairs pour votre site WordPress',
	accent: 'forfaits clairs',
	lede: 'Chaque prestation a un prix, un périmètre et une limite de travail définis avant de commencer. Les prix affichés sont ceux que vous payez.',
	creationTitle: 'Créer ou refondre votre site',
	ponctuelTitle: 'Interventions et audits',
	/** Encart « Un projet sur mesure » des pages de service */
	customNote:
		'Identité visuelle, SEO, automatisation, développement sur mesure : chiffrés après un premier échange.'
} as const;

/**
 * Guide « quelle offre pour votre situation » (page Tarifs). Chaque situation reprend le besoin
 * décrit sur la page de l'offre (champ `need`) : rien de nouveau n'est promis ici.
 */
export const offersGuide = {
	title: 'Quelle offre pour votre situation ?',
	accent: 'votre situation',
	rows: [
		{ situation: "Vous n'avez pas encore de site", slug: 'site-vitrine-wordpress' },
		{ situation: 'Une campagne, un service ou un salon à mettre en avant', slug: 'landing-page' },
		{
			situation: 'Votre site a vieilli, il est lent ou difficile à mettre à jour',
			slug: 'refonte-site-wordpress'
		},
		{ situation: 'Vous voulez vendre en ligne un catalogue simple', slug: 'boutique-woocommerce' },
		{
			situation: 'Un problème précis ou une évolution sur un site existant',
			slug: 'sprint-wordpress-woocommerce'
		},
		{
			situation: 'Vous ne savez pas par où commencer avec votre site',
			slug: 'audit-technique-wordpress'
		},
		{ situation: 'Une tâche répétitive revient chaque semaine', slug: 'audit-automatisation' }
	],
	maintenance: 'Garder votre site à jour chaque mois',
	agencies: 'Vous êtes une agence web et cherchez un renfort ?'
} as const;

/** En-tête de la grille sur la page Automatisation : une seule offre, l'audit */
export const offersIntroAutomatisation = {
	title: 'Commencer par un audit',
	accent: 'un audit',
	lede: "Avant de développer quoi que ce soit, l'audit repère ce qui vaut la peine d'être automatisé dans un processus précis. Le prix affiché est celui que vous payez."
} as const;

/** Conditions communes (page Tarifs) */
export const offersConditions = {
	title: 'Comment se passe une commande',
	steps: [
		'Un premier échange pour comprendre le besoin.',
		'Un devis qui fixe le périmètre, le prix et les échéances.',
		'Pour les créations et refontes : 50 % à la commande, 30 % à une étape intermédiaire définie au devis, 20 % avant la mise en ligne. Pour les audits et les sprints commandés par une entreprise : paiement à la commande.',
		'Pour une mission de sous-traitance confiée par une agence : facturation avec une échéance définie au devis ou au contrat.',
		"Tout travail hors périmètre fait l'objet d'un devis complémentaire, accepté avant son exécution."
	],
	excludedTitle: 'Facturés séparément',
	excluded: [
		'Nom de domaine',
		'Hébergement',
		'Licences premium et services tiers',
		'Rédaction des textes et production de contenus'
	],
	customTitle: 'Sur devis',
	custom: [
		'Identité visuelle',
		'SEO avancé',
		"Mise en place d'automatisations",
		'Développement sur mesure et applications'
	]
} as const;

/** Maintenance WordPress : facultative, mensuelle, sur un site existant ou livré */
export type MaintenancePlan = {
	id: 'essentiel' | 'confort' | 'serenite';
	name: string;
	target: string;
	price: string;
	rows: readonly { label: string; value: string }[];
	recommended?: boolean;
};

export const maintenancePage = {
	path: '/services/web/maintenance-wordpress/',
	seoTitle: 'Maintenance WordPress : de 99 € à 229 € par mois',
	description:
		'Maintenance WordPress facultative : mises à jour contrôlées, sauvegardes, petites interventions techniques incluses. Trois formules de 99 € à 229 € par mois.',
	title: 'Un site WordPress à jour et suivi chaque mois',
	accent: 'à jour et suivi',
	lede: "Une maintenance facultative, sans formule imposée à la création : vous choisissez le niveau qui correspond à l'importance de votre site."
} as const;

export const maintenanceIntro = {
	title: 'Maintenance WordPress, si vous le souhaitez',
	accent: 'si vous le souhaitez',
	lede: "Mises à jour, sauvegardes et petites interventions techniques chaque mois. Facultative, pour un site livré par Dev'n Done ou un site existant."
} as const;

/**
 * Formules. Volontairement absents tant que l'outil n'est pas choisi et la procédure validée :
 * surveillance de disponibilité, sauvegardes quotidiennes externalisées, alertes, première
 * réponse sous 4 h (Sérénité). Les valeurs « précisée au devis » en tiennent lieu.
 */
export const maintenancePlans: readonly MaintenancePlan[] = [
	{
		id: 'essentiel',
		name: 'Essentiel',
		target: 'Site vitrine simple',
		price: '99 €',
		rows: [
			{ label: 'Mises à jour WordPress, thème et extensions', value: 'Régulières' },
			{ label: 'Sauvegarde', value: 'Mensuelle' },
			{ label: 'Interventions techniques mineures', value: "Jusqu'à 15 min par mois" },
			{ label: 'Première réponse', value: 'Sous 2 jours ouvrés' }
		]
	},
	{
		id: 'confort',
		name: 'Confort',
		target: 'Site professionnel actif',
		price: '149 €',
		recommended: true,
		rows: [
			{
				label: 'Mises à jour WordPress, thème et extensions',
				value: 'Régulières, avec vérifications'
			},
			{ label: 'Sauvegarde', value: 'Hebdomadaire' },
			{ label: 'Interventions techniques mineures', value: "Jusqu'à 30 min par mois" },
			{ label: 'Première réponse', value: 'Sous 1 jour ouvré' }
		]
	},
	{
		id: 'serenite',
		name: 'Sérénité',
		target: 'Site stratégique ou boutique',
		price: '229 €',
		rows: [
			{
				label: 'Mises à jour WordPress, thème et extensions',
				value: 'Suivi renforcé, avec vérifications'
			},
			{ label: 'Sauvegarde', value: 'Fréquence précisée au devis' },
			{ label: 'Interventions techniques mineures', value: "Jusqu'à 1 h par mois" },
			{ label: 'Première réponse', value: 'Délai précisé au devis' }
		]
	}
];

/** Règles communes aux trois formules (informations validées) */
export const maintenanceRules = [
	'La maintenance est facultative et facturée chaque mois.',
	"Le temps d'intervention inclus n'est pas reportable d'un mois sur l'autre.",
	"Le délai de première réponse n'est pas un délai de résolution.",
	'Les petites interventions techniques sont incluses dans la limite du temps de votre formule.',
	"Une intervention exceptionnelle ou urgente au-delà de ce temps est chiffrée au cas par cas et acceptée avant d'être réalisée : elle n'est pas facturée d'office à la demi-journée.",
	"Les évolutions (modifications de contenu, nouvelles pages, nouvelles fonctionnalités, refontes) font l'objet d'un devis séparé.",
	"L'hébergement, le nom de domaine, les licences premium et les services tiers sont séparés, sauf mention explicite au devis."
] as const;

export const maintenanceFaq = [
	{
		q: "La maintenance est-elle obligatoire après la création d'un site ?",
		a: 'Non. Elle est facultative : vous pouvez la souscrire à la mise en ligne, plus tard, ou pas du tout.'
	},
	{
		q: 'Que comprennent les interventions techniques mineures ?',
		a: 'De petites interventions liées à la maintenance, dans la limite du temps de votre formule. Les modifications de contenu, nouvelles pages ou nouvelles fonctionnalités sont facturées séparément.'
	},
	{
		q: 'Que se passe-t-il si le temps inclus ne suffit pas ?',
		a: "L'intervention supplémentaire est chiffrée au cas par cas et validée avec vous avant d'être réalisée. Une petite correction n'est pas facturée d'office à la demi-journée."
	},
	faqVat
] as const;
