/**
 * Accroche de l'accueil, à propos, avis clients et contact.
 * Source : page provisoire (dépôt devndone, index.html, sections hero, #avis, #apropos, #contact).
 *
 * Les avis sont de vrais avis publiés sur le profil Malt : ne jamais en ajouter,
 * en retirer un mot ni en reformuler sans source.
 */
import { legal } from './legal';

export const links = {
	calendly: 'https://calendly.com/sebastienmaurice/prise-de-contact',
	malt: 'https://www.malt.fr/profile/semauri',
	linkedin: 'https://www.linkedin.com/in/sebastien-maurice/',
	email: `mailto:${legal.publisher.email}`
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
	text: "Je suis Sébastien Maurice, indépendant à Caudry. J'ai 15 ans d'expérience du design et de l'intégration web (WordPress, WooCommerce, PrestaShop), complétés par une formation au développement full stack (Titre Professionnel Développeur Web et Web Mobile, O'Clock, 2026). Je travaille avec des TPE, artisans et PME, avec un devis clair et un délai annoncé."
} as const;

/**
 * Parcours (page À propos). Source : base de carrière de Sébastien (CV, faits fixes : dates,
 * structures, villes, périmètres), relevée le 20/10/2026. Ne rien ajouter sans validation.
 */
export const aboutStory = {
	eyebrow: 'Mon parcours',
	title: 'Du design au code, 15 ans de projets web',
	accent: '15 ans de projets web',
	paragraphs: [
		"Graphiste de formation (licence de design graphique, puis Master 2 en infographie et multimédia à l'Université Paris VIII), j'ai créé en 2009 ma première agence à Caudry : identités visuelles, sites web, boutique en ligne et signalétique.",
		"J'ai ensuite dirigé un pôle web et infographie, piloté pendant 4 ans le web et l'e-commerce d'une PME industrielle de Caudry, dirigé une agence d'enseigne et de signalétique, puis travaillé en indépendant. En 2026, j'ai complété ce parcours par le Titre professionnel Développeur Web et Web Mobile (O'Clock).",
		"Dev'n Done réunit ces deux métiers : le regard du designer et les compétences du développeur, avec un seul interlocuteur du premier échange à la mise en ligne."
	]
} as const;

export type Milestone = { period: string; role: string; place: string; text: string };

export const aboutTimeline: readonly Milestone[] = [
	{
		period: '2009 - 2015',
		role: "Fondateur et directeur d'agence",
		place: 'Eloustick, Caudry',
		text: 'Agence de communication visuelle, e-commerce et signalétique : identités visuelles, sites web, boutique PrestaShop gérée en autonomie.'
	},
	{
		period: '2014 - 2015',
		role: 'Responsable du pôle web et infographie',
		place: 'Thymep, Ligny-en-Cambrésis',
		text: "Encadrement d'une équipe de 6 personnes, sites WordPress, création graphique, print et signalétique."
	},
	{
		period: '2016 - 2020',
		role: 'Responsable web et e-commerce',
		place: "Alternativ' Uniforme, Caudry",
		text: 'Sites WordPress et PrestaShop, e-commerce B2B, direction artistique, SEO et maintenance.'
	},
	{
		period: '2021 - 2022',
		role: "Responsable d'agence enseigne et signalétique",
		place: "PANO Sign'Service, Dechy",
		text: "Pilotage commercial et production de l'agence, coordination web et communication."
	},
	{
		period: '2022 - 2025',
		role: 'Indépendant',
		place: 'Agence HOZ, Caudry',
		text: 'Projets web, intégration front-end depuis Figma, Core Web Vitals, communication visuelle et print.'
	},
	{
		period: '2026',
		role: 'Titre professionnel Développeur Web et Web Mobile',
		place: "O'Clock",
		text: 'JavaScript, Svelte, Node.js, Express, API REST, PostgreSQL. Projet : Ciné Délices, application full stack.'
	}
];

export type Review = { quote: string; author: string };

export const reviewsIntro = {
	eyebrow: 'Avis clients',
	title: "Ce qu'en disent mes clients",
	accent: 'mes clients',
	lede: 'Avis publiés sur mon profil Malt.',
	more: 'Voir tous les avis sur Malt'
} as const;

export const reviews: readonly Review[] = [
	{
		quote:
			'Un travail extraordinaire. Il a parfaitement intégré les enjeux de notre communication, force de proposition sur les textes et les graphiques.',
		author: 'Ryad Asselah, Directeur, Palimpseste Urbain'
	},
	{
		quote: 'Efficace, professionnelle, respecte les délais demandés. Je le recommande à 100 %.',
		author: 'Virginie, SARL GSTI (pièces détachées industrielles)'
	},
	{
		quote: "Rapide, précis, efficace... je te recontacte dès que j'ai un nouveau besoin.",
		author: 'Eric Havard, Gérant, Hache'
	}
];

export const contactIntro = {
	eyebrow: 'Contact',
	/** Le mot « Done. » est mis en forme par la page */
	title: 'Un projet en tête ? On le rend',
	/** Première ligne du titre du bloc contact (la seconde est « On le rend DONE. ») */
	question: 'Un projet en tête ?',
	lede: '15 minutes pour faire le point sur votre projet et définir la bonne approche, sans engagement.',
	cta: 'Parlons de votre projet',
	email: 'Écrire un email'
} as const;

export const hero = {
	eyebrow: 'Un studio digital indépendant qui conçoit, développe et livre des solutions web.',
	keywords: 'WordPress · WooCommerce · Automatisation · Identité · Full Stack',
	ctaServices: 'Découvrir mes services',
	ctaCall: 'Réserver 15 min'
} as const;

/** Bandeau sous les réalisations ; le mot « Done. » est mis en forme par le composant */
export const ctaBand = {
	text: 'Un autre projet en tête ? On le rend',
	cta: 'Parlons de votre projet'
} as const;
