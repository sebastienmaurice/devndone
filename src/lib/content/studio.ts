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
	linkedin: 'https://www.linkedin.com/in/sebastien-maurice/',
	/** Réseaux de Dev'n Done, transmis par Sébastien le 16/11/2026 */
	facebook: 'https://www.facebook.com/profile.php?id=61596153557412',
	instagram: 'https://www.instagram.com/devndone.fr/',
	tiktok: 'https://www.tiktok.com/@devndone.com'
} as const;

/** Réseaux sociaux affichés (pied de page, page Contact) : trois comptes Dev'n Done et le LinkedIn de
 *  Sébastien, relié à Dev'n Done. Liens sortants seulement, aucun widget tiers. */
export type Social = {
	id: 'facebook' | 'instagram' | 'tiktok' | 'linkedin';
	label: string;
	/** Compte, pour le nom accessible du lien */
	account: string;
	href: string;
};
export const socials: readonly Social[] = [
	{ id: 'facebook', label: 'Facebook', account: "page Dev'n Done", href: links.facebook },
	{ id: 'instagram', label: 'Instagram', account: '@devndone.fr', href: links.instagram },
	{ id: 'tiktok', label: 'TikTok', account: '@devndone.com', href: links.tiktok },
	{ id: 'linkedin', label: 'LinkedIn', account: 'Sébastien Maurice', href: links.linkedin }
];

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
	/** Texte validé le 24/10/2026, positionnement précisé le 16/11/2026 : studio indépendant aux
	 *  expertises plurielles (full stack, WordPress et WooCommerce, automatisation, identité visuelle).
	 *  Voix de marque (22/10/2026) : troisième personne, sans « je » ni « nous ». « Plus de 20 ans
	 *  d'expérience professionnelle » confirmé par Sébastien (expérience globale, pas seulement WordPress). */
	text: "Dev'n Done est un studio indépendant de développement web et de solutions numériques, fondé par Sébastien Maurice, avec plus de 20 ans d'expérience professionnelle, du design à l'intégration. Il intervient sur plusieurs domaines : développement full stack et applications sur mesure, WordPress et WooCommerce, automatisation des processus et intégrations, identité visuelle et direction artistique. Pour les entreprises comme en renfort des agences web. Sa méthode reste simple : un cadrage précis avant de commencer, un devis clair, un délai annoncé, puis une validation à chaque étape importante. Vous échangez directement avec la personne qui réalise le projet, sans intermédiaire."
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

/**
 * Parcours de Sébastien (page À propos), faits validés par lui les 16 et 24/11/2026.
 * Règle : l'expérience professionnelle (plus de 20 ans, du design à l'intégration) est distincte de
 * la formation Full Stack récente. Jamais « 20 ans de programmation ». Aucune date de formation ni
 * de création, aucun autre outil ou certification sans confirmation.
 */
export const aboutPath = {
	eyebrow: 'Parcours',
	title: "Du design à l'intégration, puis le développement Full Stack",
	accent: 'développement Full Stack',
	text: "Sébastien Maurice cumule plus de 20 ans d'expérience professionnelle, du design à l'intégration. Il a ensuite suivi la formation Full Stack d'O'clock, en développement web et web mobile, et obtenu le titre professionnel de niveau 5.",
	steps: [
		{
			icon: 'briefcase',
			title: 'Expérience professionnelle',
			text: "Plus de 20 ans, du design à l'intégration."
		},
		{
			icon: 'code',
			title: 'Formation Full Stack',
			text: "O'clock, développement web et web mobile. Titre professionnel de niveau 5."
		},
		{ icon: 'trophy', title: 'Certification', text: 'TOSA WordPress, 2023.' }
	],
	toolsLabel: 'Technologies utilisées',
	tools: ['JavaScript', 'Node.js', 'PostgreSQL', 'WordPress', 'WooCommerce']
} as const;

/**
 * Témoignages publiés sur Malt (avis notés et recommandations) et sur Google, relevés par Sébastien
 * le 16/11/2026 (captures de son profil Malt et de la fiche Google Dev'n Done).
 * Règle : citations mot pour mot. Un texte long est cité en extrait exact, la coupure étant marquée
 * « […] ». Seules les apostrophes sont harmonisées avec le site. Ne jamais reformuler ni corriger.
 * `id` : repère interne pour choisir un témoignage selon la page ; `project` : étude de cas du même
 * client ; `source` : avis noté Malt, recommandation Malt ou avis Google (pastille de la carte).
 * Non utilisée : la recommandation d'un « Ancien utilisateur » (CEO), sans nom ni entreprise.
 */
export type Review = {
	id:
		| 'harmony-valse'
		| 'petit-chateau-vercourt'
		| 'gsti'
		| 'palimpseste-urbain'
		| 'hache'
		| 'pierre-pointeau'
		| 'eloustick';
	quote: string;
	/** Signature : « Nom, fonction ou entreprise » (coupée à la première virgule à l'affichage) */
	author: string;
	source: 'malt-avis' | 'malt-recommandation' | 'google';
	project?: string;
};

/** Libellé de la pastille de chaque source */
export const reviewSources: Record<Review['source'], string> = {
	'malt-avis': 'Avis Malt',
	'malt-recommandation': 'Recommandation Malt',
	google: 'Avis Google'
};

export const reviewsIntro = {
	eyebrow: 'Avis clients',
	title: "Ce qu'en disent les clients",
	accent: 'les clients',
	lede: 'Avis et recommandations publiés sur Malt et sur Google.',
	more: 'Voir tous les avis sur Malt'
} as const;

/**
 * Notes publiques : profil Malt (https://www.malt.fr/profile/semauri), 5,0 sur 3 évaluations, et
 * fiche Google Dev'n Done, 5/5 sur 1 avis (relevé du 16/11/2026). À mettre à jour à chaque nouvel avis.
 */
export const maltRating = { score: '5/5', count: 3, checked: '16/11/2026' } as const;
export const googleRating = { score: '5/5', count: 1, checked: '16/11/2026' } as const;
/** Phrase de note affichée sous les titres « Ce qu'en disent les clients » */
export const ratingNote = `Note de ${maltRating.score} sur ${maltRating.count} avis Malt et de ${googleRating.score} sur Google.`;

export const reviews: readonly Review[] = [
	{
		// Avis Malt du 08/09/2026, mission « Designer UX/UI, refonte de site internet »
		id: 'harmony-valse',
		project: 'harmony-valse',
		source: 'malt-avis',
		quote:
			"Très satisfait du travail de Sébastien sur l'évolution de mon site internet. Il possède de très bonnes compétences en design et UX/UI, avec une vraie créativité et un excellent sens du détail. […] Je le recommande avec plaisir et n'hésiterai pas à retravailler avec lui sur de futurs projets.",
		author: 'Yves-Marie, Harmony Valse'
	},
	{
		// Avis Malt du 18/07/2024
		id: 'petit-chateau-vercourt',
		project: 'petit-chateau-vercourt',
		source: 'malt-avis',
		quote:
			"On était très heureux de travailler avec Sébastien, il était rapide et efficace, cela se remarque qu'il a beaucoup d'expérience dans ce domaine. Grand merci !",
		author: 'Alexia, Petit Château Vercourt'
	},
	{
		// Avis Malt du 23/11/2023 (retours à la ligne de l'original conservés)
		id: 'gsti',
		project: 'gsti',
		source: 'malt-avis',
		quote:
			"Sébastien a été à la hauteur de ce que l'on recherchait ! une personne efficace, professionnelle, qui respecte le délais demandé\nContact facile\nje le recommande à 100%",
		author: 'Virginie, SARL GSTI (pièces détachées industrielles)'
	},
	{
		// Recommandation Malt du 31/05/2024
		id: 'palimpseste-urbain',
		project: 'palimpseste-urbain',
		source: 'malt-recommandation',
		quote:
			"Pour la refonte de notre site pour une agence d'architectes-urbanistes, Sébastien a fait un travail extraordinaire. […] Il s'est également adapté à nos exigences et à notre planning. […] je peux dire que c'est un professionnel hors pair.",
		author: 'Ryad Asselah, Directeur, Palimpseste Urbain'
	},
	{
		// Recommandation Malt du 17/04/2024 (retours à la ligne de l'original conservés)
		id: 'hache',
		source: 'malt-recommandation',
		quote:
			"Grand merci Sébastien pour ton excellent travail\nrapide, précis, efficace...\nJe te recontacte dès que j'ai un nouveau besoin.",
		author: 'Eric Havard, Gérant, Hache'
	},
	{
		// Avis Google, novembre 2026 (aussi auteur d'une recommandation Malt du 09/11/2026)
		id: 'pierre-pointeau',
		source: 'google',
		quote:
			"Excellent développeur. Et le mieux, c'est sa conscience professionnelle : proactif, réactif, et ne lâche rien jusqu'à ce que tout soit parfait. Franchement, je recommande.",
		author: 'Pierre Pointeau, Photographe'
	},
	{
		// Recommandation Malt du 18/09/2023, signée « Gérant d'entreprise chez eLoustick »
		id: 'eloustick',
		source: 'malt-recommandation',
		quote:
			"Sébastien a su identifier mes besoins spécifiques en un seul rdv. Quelques échanges mails plus tard pour l'aspect technique, la refonte de mon site correspond pleinement à la vision numérique que je m'en faisais. Professionnel, réactif, fort de proposition, créatif et efficace …",
		author: "eLoustick, Gérant d'entreprise"
	}
];

export const contactIntro = {
	eyebrow: 'Contact',
	/** Première ligne du titre du bloc contact (la seconde est « On le rend DONE. ») */
	question: 'Un projet en tête ?',
	/** Variante du titre de la page Contact pour les agences (/contact/?type=agence) */
	agencyQuestion: 'Un besoin de renfort ?',
	lede: '15 minutes avec Sébastien pour faire le point sur votre projet et définir la bonne approche, sans engagement.',
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
			/** Repère de prix en « ticket » (PriceTag) : tarifs validés (content/tarifs.ts, content/agences.ts) */
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
			title: 'Vous avez un projet web',
			text: "Site vitrine, refonte, boutique en ligne, automatisation ou outil sur mesure : un forfait quand c'est possible, un devis étudié sinon, toujours avec un périmètre écrit.",
			/** La landing page (1 750 €) est le forfait de création le moins cher du catalogue ;
			 *  Sprint : 350 € par jour (content/tarifs.ts) */
			priceTag: { label: 'Forfaits à partir de', value: '1 750', note: 'Sprint à 350 € par jour' },
			links: [
				{ label: 'Les services', href: '/services/' },
				{ label: 'Les tarifs', href: '/tarifs/' }
			]
		}
	]
} as const;

export const hero = {
	/** Positionnement validé par Sébastien le 16/11/2026 : studio web et solutions digitales,
	 *  signature officielle « Studio Web & Solutions Digitales » (surtitre du H1) */
	kicker: 'Studio Web & Solutions Digitales',
	lede: "Studio indépendant, Dev'n Done conçoit et développe vos solutions numériques, du site web à l'application sur mesure. Un seul interlocuteur, du premier échange à la mise en ligne.",
	ctaServices: 'Découvrir les services',
	ctaCall: 'Réserver 15 min'
} as const;
