/**
 * Tarifs (tous HT).
 * Source : page provisoire (dépôt devndone, index.html, section #tarifs).
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
	delay: string;
	text: string;
};

export const maintenanceIntro = {
	title: 'Maintenance WordPress en abonnement',
	lede: 'Mises à jour, sauvegardes et surveillance : votre site reste à jour et protégé, sans que vous ayez à y penser. Trois niveaux, sans engagement de durée.',
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
	title: 'Audit, création et refonte',
	lede: "Des forfaits à prix fermé, avec un contenu et un délai annoncés à l'avance. 50 % à la signature, le solde à la livraison.",
	note: 'Identité visuelle, SEO, automatisation, développement sur mesure : chiffrés après un premier échange.'
} as const;

export const packages: readonly Package[] = [
	{
		name: 'Audit technique WordPress',
		price: '490 €',
		delay: 'Livré en 48 h',
		text: 'Rapport PDF de 10 à 15 pages : score PageSpeed et Core Web Vitals, analyse SEO technique, recommandations classées par priorité.'
	},
	{
		name: 'Lancement site WordPress',
		price: '990 €',
		delay: 'Livré en 7 jours',
		text: "Site responsive jusqu'à 5 pages, formulaire de contact, Google Maps, SEO on-page essentiel, hébergement et nom de domaine configurés."
	},
	{
		name: 'Landing page WordPress',
		price: '1 200 €',
		delay: 'Livré en 5 jours',
		text: "Une page conçue sur mesure à partir d'une maquette Figma, optimisée Core Web Vitals, SEO on-page inclus."
	},
	{
		name: 'Refonte WordPress PME',
		price: '2 800 €',
		delay: 'Livré en 15 jours',
		text: "Jusqu'à 8 pages, maquette Figma incluse, intégration Elementor Pro, migration et configuration de l'hébergement."
	},
	{
		name: 'Boutique WooCommerce',
		price: '2 200 €',
		delay: 'Livré en 12 jours',
		text: "Boutique complète jusqu'à 15 produits, paiement Stripe ou PayPal, livraison, tunnel de commande testé de bout en bout."
	},
	{
		name: 'Audit automatisation',
		price: '290 €',
		delay: 'Livré en 5 jours',
		text: 'Cartographie de vos tâches répétitives et 3 automatisations priorisées, avec rapport et session de restitution.'
	}
];
