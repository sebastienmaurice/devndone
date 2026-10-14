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

export const aboutIntro = {
	eyebrow: 'À propos',
	title: 'Un seul interlocuteur, du brief à la mise en ligne.',
	text: "Je suis Sébastien Maurice, indépendant à Caudry. J'ai 15 ans d'expérience du design et de l'intégration web (WordPress, WooCommerce, PrestaShop), complétés par une formation au développement full stack (Titre Professionnel Développeur Web et Web Mobile, O'Clock, 2026). Je travaille avec des TPE, artisans et PME, avec un devis clair et un délai annoncé."
} as const;

export type Review = { quote: string; author: string };

export const reviewsIntro = {
	eyebrow: 'Avis clients',
	title: "Ce qu'en disent mes clients",
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
	title: 'Un projet en tête ? On le rend',
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
