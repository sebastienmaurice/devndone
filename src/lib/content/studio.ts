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
	/** Texte fourni par Sébastien le 20/10/2026 */
	text: "Je suis Sébastien Maurice, développeur web indépendant avec plus de 20 ans d'expérience dans le web, du design à l'intégration, en passant par WordPress, WooCommerce et PrestaShop. Formé au développement full stack, je conçois des sites et des solutions web adaptés aux besoins des professionnels. Je travaille avec des TPE, artisans et PME, avec un devis clair et un délai annoncé."
} as const;

/** Section « La mascotte » de la page À propos : texte fourni par Sébastien le 20/10/2026 */
export const aboutMascot = {
	eyebrow: 'La mascotte',
	title: "Le sérieux n'oblige pas à se prendre au sérieux.",
	accent: 'se prendre au sérieux',
	paragraphs: [
		"Chez Dev'n Done, c'est un renard qui vous accueille, pas une énième photo de développeur devant son écran. Une mascotte à l'image de mon approche : accessible, curieuse et tournée vers les solutions.",
		"Derrière le personnage, plus de 20 ans d'expérience dans le web, des compétences techniques solides et un seul objectif : concrétiser vos projets."
	],
	cta: 'Découvrir mes prestations'
} as const;

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
