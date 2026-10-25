/**
 * Accroche de l'accueil, à propos, avis clients et contact.
 * Source : page provisoire (dépôt devndone, index.html, sections hero, #avis, #apropos, #contact).
 *
 * Les avis sont de vrais avis publiés sur le profil Malt : ne jamais en ajouter,
 * en retirer un mot ni en reformuler sans source.
 */
export const links = {
	calendly: 'https://calendly.com/sebastienmaurice/prise-de-contact',
	malt: 'https://www.malt.fr/profile/semauri',
	linkedin: 'https://www.linkedin.com/in/sebastien-maurice/'
} as const;

/**
 * Formulaire de contact : envoi direct via Web3Forms (https://web3forms.com), choisi le 20/10/2026.
 * Offre gratuite : 250 envois par mois. D'après la FAQ Web3Forms, les messages ne sont pas stockés
 * (transmis par email), les serveurs sont aux États-Unis (US-East) et la clé d'accès n'est pas un
 * secret : elle permet seulement d'envoyer un message vers l'adresse de Sébastien.
 * Clé vide : le formulaire prépare un email dans la messagerie du visiteur (mailto).
 */
export const contactForm: { endpoint: string; accessKey: string } = {
	endpoint: 'https://api.web3forms.com/submit',
	accessKey: 'ff35290e-c90e-42e9-aecd-7de5b34768db'
};

export const aboutIntro = {
	eyebrow: 'À propos',
	title: 'Un seul interlocuteur, du brief à la mise en ligne.',
	accent: 'Un seul interlocuteur',
	/** Texte validé le 24/10/2026 (audit SEO : identité de développeur web indépendant).
	 *  Voix de marque (22/10/2026) : troisième personne, sans « je » ni « nous ». « Plus de 20 ans
	 *  d'expérience professionnelle » confirmé par Sébastien (expérience globale, pas seulement WordPress). */
	text: "Dev'n Done est l'activité de Sébastien Maurice, développeur web indépendant, avec plus de 20 ans d'expérience professionnelle, du design à l'intégration. Sa spécialité : WordPress et WooCommerce, pour les entreprises comme en renfort des agences web. Sa méthode reste simple : un cadrage précis avant de commencer, un devis clair, un délai annoncé, puis une validation à chaque étape importante. Vous échangez directement avec la personne qui réalise le projet, sans intermédiaire."
} as const;

/** Section « La mascotte » de la page À propos : texte fourni par Sébastien le 20/10/2026 */
export const aboutMascot = {
	eyebrow: 'La mascotte',
	title: "Le sérieux n'oblige pas à se prendre au sérieux.",
	accent: 'se prendre au sérieux',
	paragraphs: [
		"Chez Dev'n Done, c'est un renard qui vous accueille, pas une énième photo de développeur devant son écran. Une mascotte à l'image de l'approche de Dev'n Done : accessible, curieuse et tournée vers les solutions.",
		"Derrière le personnage, plus de 20 ans d'expérience professionnelle, des compétences techniques solides et un seul objectif : concrétiser vos projets."
	],
	cta: 'Découvrir les prestations'
} as const;

/** `id` : repère interne pour choisir un avis selon la page ; `project` : étude de cas du même
 *  client (correspondance vérifiable par le nom de l'entreprise dans la signature) */
export type Review = {
	id: 'palimpseste-urbain' | 'gsti' | 'hache';
	quote: string;
	author: string;
	project?: string;
};

export const reviewsIntro = {
	eyebrow: 'Avis clients',
	title: "Ce qu'en disent les clients",
	accent: 'les clients',
	lede: 'Avis publiés sur le profil Malt de Sébastien Maurice.',
	more: 'Voir tous les avis sur Malt'
} as const;

/**
 * Note publique du profil Malt, relevée sur https://www.malt.fr/profile/semauri le 22/10/2026 :
 * 5 sur 5, 3 avis. À mettre à jour si elle change (nouveaux avis).
 */
export const maltRating = { score: '5/5', count: 3, checked: '22/10/2026' } as const;

export const reviews: readonly Review[] = [
	{
		id: 'palimpseste-urbain',
		project: 'palimpseste-urbain',
		quote:
			'Un travail extraordinaire. Il a parfaitement intégré les enjeux de notre communication, force de proposition sur les textes et les graphiques.',
		author: 'Ryad Asselah, Directeur, Palimpseste Urbain'
	},
	{
		id: 'gsti',
		project: 'gsti',
		quote: 'Efficace, professionnelle, respecte les délais demandés. Je le recommande à 100 %.',
		author: 'Virginie, SARL GSTI (pièces détachées industrielles)'
	},
	{
		id: 'hache',
		quote: "Rapide, précis, efficace... je te recontacte dès que j'ai un nouveau besoin.",
		author: 'Eric Havard, Gérant, Hache'
	}
];

export const contactIntro = {
	eyebrow: 'Contact',
	/** Première ligne du titre du bloc contact (la seconde est « On le rend DONE. ») */
	question: 'Un projet en tête ?',
	/** Variante du titre de la page Contact pour les agences (/contact/?type=agence) */
	agencyQuestion: 'Un besoin de renfort ?',
	lede: '15 minutes pour faire le point sur votre projet et définir la bonne approche, sans engagement.',
	cta: 'Discuter de votre projet'
} as const;

/** Bloc d'orientation de l'accueil : un parcours par public (21/10/2026). Illustrations : une
 *  mascotte par parcours, associée par `id` dans la page d'accueil (22/10/2026). */
export const homePaths = {
	eyebrow: 'Par où commencer',
	title: 'Agence ou entreprise, voici votre parcours',
	accent: 'votre parcours',
	paths: [
		{
			id: 'agences',
			title: 'Vous êtes une agence web',
			text: "Un renfort WordPress, WooCommerce ou front-end sur un projet en cours : une partie définie du projet, en marque blanche si la mission s'y prête.",
			/** Repère de prix : tarifs validés (content/tarifs.ts, content/agences.ts) */
			price: '350 € par jour, demi-journée à 175 €',
			/** Même repère, mis en scène au survol de la carte (composant PriceTag) */
			priceTag: {
				label: 'Tarif journalier',
				value: '350',
				unit: '/ jour',
				note: 'Demi-journée à 175 €'
			},
			links: [{ label: 'Le renfort pour les agences', href: '/agences/' }]
		},
		{
			id: 'entreprises',
			title: 'Vous avez un projet de site',
			text: 'Landing page, site vitrine, refonte ou boutique WooCommerce : des forfaits dont le périmètre est écrit au devis.',
			/** La landing page (1 750 €) est le forfait de création le moins cher du catalogue ;
			 *  Sprint : 350 € par jour (content/tarifs.ts) */
			price: 'Forfaits à partir de 1 750 € · Sprint à 350 € par jour',
			priceTag: { label: 'Forfaits à partir de', value: '1 750', note: 'Sprint à 350 € par jour' },
			links: [
				{ label: 'Les prestations WordPress', href: '/services/web/' },
				{ label: 'Les tarifs', href: '/tarifs/' }
			]
		}
	]
} as const;

export const hero = {
	/** Le métier dès le premier écran, voix de marque (22/10/2026) */
	lede: "Dev'n Done crée et fait évoluer des sites web : développement, intégration front-end, spécialité WordPress et WooCommerce. Pour les entreprises comme en renfort des agences.",
	keywords: 'Front-end · WordPress · WooCommerce',
	ctaServices: 'Découvrir les services',
	ctaCall: 'Réserver 15 min'
} as const;
