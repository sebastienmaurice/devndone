/**
 * Tarifs (tous HT).
 * Sites : abonnements mensuels, grille validée par Sébastien le 20/10/2026 après comparaison des
 * offres en abonnement autour de Cambrai (PYJE, CB06, Novatech Web) et des moyennes nationales.
 * Engagement 24 mois ; le site appartient au client à la fin de l'engagement.
 * Audits : paiement unique (source : page provisoire, dépôt devndone, section #tarifs).
 *
 * La grille de maintenance est une GRILLE DE TEST, à valider par les premiers appels de
 * prospection : ne pas la présenter comme définitive, ne rien y ajouter sans validation.
 */
export type MaintenancePlan = {
	name: string;
	target: string;
	price: string;
	rows: readonly { label: string; value: string }[];
	recommended?: boolean;
};

export type Package = {
	name: string;
	price: string;
	/** Périodicité affichée après le prix */
	period: '/ mois HT' | 'HT, paiement unique';
	delay: string;
	text: string;
};

export const maintenanceIntro = {
	title: 'Maintenance de votre site WordPress existant',
	accent: 'site WordPress existant',
	lede: 'Votre site est déjà en ligne ? Mises à jour, sauvegardes et surveillance : il reste à jour et protégé, sans que vous ayez à y penser. Trois niveaux, sans engagement de durée.',
	note: "Le détail complet de chaque formule (analyses de sécurité, corrections incluses, rapports) est précisé lors de l'échange. Au-delà du temps de correction inclus, toute intervention est chiffrée à l'avance. Tarifs hors taxes."
} as const;

export const maintenancePlans: readonly MaintenancePlan[] = [
	{
		name: 'Essentiel',
		target: 'Site vitrine à faible trafic',
		price: '79 €',
		rows: [
			{ label: 'Mises à jour WordPress, thème et plugins', value: 'Mensuelles' },
			{ label: 'Sauvegarde', value: 'Mensuelle' },
			{ label: 'Surveillance de disponibilité', value: 'Basique' },
			{ label: 'Délai de réponse', value: '48 h' }
		]
	},
	{
		name: 'Confort',
		target: 'Site actif',
		price: '129 €',
		recommended: true,
		rows: [
			{ label: 'Mises à jour WordPress, thème et plugins', value: 'Mensuelles' },
			{ label: 'Sauvegarde', value: 'Hebdomadaire' },
			{ label: 'Surveillance de disponibilité', value: 'Basique' },
			{ label: 'Délai de réponse', value: '24 h' }
		]
	},
	{
		name: 'Sérénité',
		target: 'Site marchand ou générateur de contacts',
		price: '219 €',
		rows: [
			{ label: 'Mises à jour WordPress, thème et plugins', value: 'Prioritaires' },
			{ label: 'Sauvegarde', value: 'Quotidienne, externalisée' },
			{ label: 'Surveillance de disponibilité', value: 'Avancée avec alertes' },
			{ label: 'Délai de réponse', value: '4 h ouvrées' }
		]
	}
];

export const packagesIntro = {
	title: 'Votre site en abonnement mensuel',
	accent: 'abonnement mensuel',
	lede: 'Création, hébergement et maintenance réunis dans un abonnement mensuel. Engagement de 24 mois ; à la fin, le site vous appartient.',
	note: 'Les audits sont facturés en une fois. Identité visuelle, SEO, automatisation, développement sur mesure : chiffrés après un premier échange.',
	/** Encart « Un projet sur mesure » des pages de service */
	customNote:
		'Identité visuelle, SEO, automatisation, développement sur mesure : chiffrés après un premier échange.'
} as const;

export const packages: readonly Package[] = [
	{
		name: 'Landing page',
		price: '69 €',
		period: '/ mois HT',
		delay: 'Livré en 5 jours',
		text: "Une page conçue sur mesure à partir d'une maquette Figma, optimisée Core Web Vitals, SEO on-page. Hébergement et maintenance Essentiel inclus."
	},
	{
		name: 'Site vitrine',
		price: '99 €',
		period: '/ mois HT',
		delay: 'Livré en 7 jours',
		text: "Site responsive jusqu'à 5 pages, formulaire de contact, Google Maps, SEO on-page essentiel. Hébergement, nom de domaine et maintenance inclus."
	},
	{
		name: 'Site pro et refonte PME',
		price: '149 €',
		period: '/ mois HT',
		delay: 'Livré en 15 jours',
		text: "Jusqu'à 8 pages, maquette Figma incluse, intégration Elementor Pro, migration de l'existant. Hébergement et maintenance Confort inclus."
	},
	{
		name: 'Boutique WooCommerce',
		price: '219 €',
		period: '/ mois HT',
		delay: 'Livré en 12 jours',
		text: "Boutique jusqu'à 15 produits, paiement Stripe ou PayPal, livraison, tunnel de commande testé de bout en bout. Hébergement et maintenance Confort inclus."
	},
	{
		name: 'Audit technique WordPress',
		price: '490 €',
		period: 'HT, paiement unique',
		delay: 'Livré en 48 h',
		text: 'Rapport PDF de 10 à 15 pages : score PageSpeed et Core Web Vitals, analyse SEO technique, recommandations classées par priorité.'
	},
	{
		name: 'Audit automatisation',
		price: '290 €',
		period: 'HT, paiement unique',
		delay: 'Livré en 5 jours',
		text: 'Cartographie de vos tâches répétitives et 3 automatisations priorisées, avec rapport et session de restitution.'
	}
];
