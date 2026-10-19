/**
 * Réalisations.
 * Sources : page provisoire (dépôt devndone, index.html, section #realisations) et, pour
 * Harmony Valse, la fiche transmise par Sébastien le 14/10/2026 (portfolio Malt).
 * Fiches (`details`) de GSTI, Palimpseste Urbain, Maxilou, Petit Château Vercourt et
 * Alternativ' Uniforme : expériences publiques du profil Malt (relevées le 19/10/2026).
 * Ciné Délices : étude de cas https://sebastienmaurice.github.io/cine-delices.html (19/10/2026).
 * Lieu du Petit Château Vercourt : adresse donnée par Sébastien (1 rue de l'Église, 80120 Vercourt).
 * Visuels : présentations complètes 1774 × 887 px (D:/GRAPHIQUE/MALT - GRAPISTE.COM/Web/CMS retenus
 * et visuels transmis par Sébastien le 19/10/2026).
 * Textes et liens repris tels quels : ne rien ajouter sans validation.
 */
export type ProjectDetails = {
	subtitle: string;
	sector?: string;
	period?: string;
	location?: string;
	skills?: readonly string[];
	summary: string;
	context?: string;
	interventions: readonly string[];
	result: string;
	/** Fiche du projet sur le portfolio Malt */
	malt?: string;
};

export type Project = {
	/** Étude de cas : /realisations/<slug>/ */
	slug: string;
	name: string;
	stack: string;
	text: string;
	url: string;
	/** Visuel de présentation : src/lib/assets/projets/<image>.jpg (1774 × 887 px) */
	image: string;
	/** Fiche complète, pour une future page projet (non affichée dans les cartes) */
	details?: ProjectDetails;
};

export const realisationsIntro = {
	eyebrow: 'Réalisations',
	title: 'Des projets qui sont vraiment Done.',
	/** Début du titre, affiché suivi du mot DONE en image */
	titleStart: 'Des projets qui sont vraiment',
	lede: "Des projets concrets pour de vrais besoins, tels qu'ils existent aujourd'hui."
} as const;

export const projects: readonly Project[] = [
	{
		slug: 'palimpseste-urbain',
		name: 'Palimpseste Urbain',
		stack: 'WordPress · Elementor Pro · SEO',
		text: "Agence d'architecture et d'urbanisme. Refonte WordPress, direction artistique, SEO.",
		url: 'https://www.palimpseste-urbain.com/',
		image: 'palimpseste-urbain',
		details: {
			subtitle: 'Refonte WordPress Elementor - site institutionnel, SEO & performance',
			sector: 'Architecture & urbanisme',
			period: 'mars 2024 - avril 2024',
			location: 'Paris, France',
			skills: [
				'WordPress',
				'Création de site WordPress',
				'Création de site WordPress Elementor',
				'SEO WordPress',
				'Refonte site internet'
			],
			summary:
				"Refonte complète d'un site WordPress pour une agence d'architecture et d'urbanisme, avec des enjeux de visibilité, de performance et de présentation des projets.",
			interventions: [
				'Refonte UX/UI sous WordPress Elementor',
				'Migration serveur et optimisation technique',
				'Optimisation des Core Web Vitals',
				'Structuration SEO des contenus et des projets',
				'Nettoyage de la base de données',
				'Optimisation des performances front-end'
			],
			result:
				'Un site WordPress plus rapide et mieux structuré, avec une présentation plus claire des projets et une administration permettant au client de rester autonome.'
		}
	},
	{
		slug: 'gsti',
		name: 'GSTI',
		stack: 'Wix → WordPress · WooCommerce',
		text: 'Migration de Wix vers WordPress et WooCommerce. Catalogue B2B et devis en ligne.',
		url: 'https://gsti62.com/',
		image: 'gsti',
		details: {
			subtitle: 'Refonte WordPress WooCommerce B2B - Catalogue & système de devis',
			sector: 'Commerce de détail',
			period: 'septembre 2023 - novembre 2023',
			location: 'Bruay-la-Buissière, France',
			skills: [
				'WordPress',
				'WooCommerce Elementor',
				'Refonte WordPress',
				'Catalogue produits',
				'Optimisation performances WordPress'
			],
			summary:
				"Refonte complète d'un site industriel, avec la fusion de deux activités et la création d'un système de devis en ligne.",
			interventions: [
				'Migration Wix vers WordPress',
				'Structuration du catalogue produits B2B',
				'Mise en place du système de devis WooCommerce',
				'Unification de deux entités digitales'
			],
			result:
				'Plateforme centralisée permettant la génération de demandes de devis structurées et une gestion simplifiée.'
		}
	},
	{
		slug: 'cine-delices',
		name: 'Ciné Délices',
		stack: 'JavaScript · Node.js · Express · PostgreSQL',
		text: 'Application full stack de recettes inspirées du cinéma.',
		url: 'https://cinedelices.com/',
		image: 'cine-delices',
		details: {
			subtitle: 'Application web full stack, projet de formation (Titre professionnel DWWM)',
			period: '12 semaines de développement',
			summary:
				"Chaque plat est rattaché au film qui l'a inspiré : affiche, contexte, puis la recette. Développé from scratch par une équipe de 5, sans framework UI côté front.",
			context:
				"Trois tensions à résoudre : un cahier des charges DWWM, une équipe de 5, et l'envie de produire un site qui ne ressemble pas à un exercice.",
			interventions: [
				"Recettes de films : chaque plat rattaché au film qui l'a inspiré",
				'Système de niveaux et de badges qui récompense chaque contribution',
				'Avis et notation avec aperçu avant validation et moyenne recalculée en temps réel',
				'Recherche live de films avec debounce dynamique et annulation des requêtes obsolètes',
				'Direction artistique maison : parallaxe et carrousel codés à la main',
				'Sécurité OWASP Top-10 : Argon2id, Helmet et CSP, rate limiting, JWT en cookie httpOnly, validation Joi'
			],
			result:
				'Site en ligne sur cinedelices.com, hébergé sur Render (Node.js, PostgreSQL managée, déploiement continu depuis GitHub).'
		}
	},
	{
		slug: 'maxilou',
		name: 'Maxilou',
		stack: 'WordPress · Catalogue · Devis',
		text: 'Location de matériel BTP et espaces verts. Catalogue par catégories et devis en ligne.',
		url: 'https://maxilou.fr/',
		image: 'maxilou',
		details: {
			subtitle: 'Site WordPress location matériel - devis en ligne & SEO',
			sector: 'BTP & construction',
			period: "mai 2026 - aujourd'hui",
			location: 'Caudry, France',
			skills: [
				'WordPress',
				'Création de site WordPress',
				'WooCommerce Elementor',
				'SEO WordPress',
				'Catalogue produits'
			],
			summary:
				"Création d'un site WordPress pour une entreprise spécialisée dans la location de matériel pour espaces verts et travaux publics.",
			interventions: [
				'Création et intégration du site sous WordPress',
				'Mise en place du catalogue de produits de location',
				'Intégration et configuration de WooCommerce',
				"Mise en place d'un système de demande de devis avec YITH WooCommerce",
				"Optimisation de l'expérience utilisateur sur les pages produits",
				'Optimisation du référencement local avec Rank Math'
			],
			result:
				"Un site WordPress permettant de présenter le catalogue de matériel et de générer des demandes de devis en ligne, avec une base SEO adaptée à l'activité locale."
		}
	},
	{
		slug: 'petit-chateau-vercourt',
		name: 'Petit Château Vercourt',
		stack: 'WordPress · Réservation · FR/EN',
		text: "Chambres d'hôtes en Picardie. Réservation en ligne, versions française et anglaise.",
		url: 'https://www.petitchateauvercourt.com/',
		image: 'petit-chateau-vercourt',
		details: {
			subtitle: 'Création site WordPress hôtelier - Réservations & SEO local',
			sector: 'Hôtellerie',
			period: 'juin 2024 - juillet 2024',
			location: 'Vercourt (Somme), France',
			skills: [
				'WordPress',
				'Refonte site internet',
				'Elementor',
				'Création de site WordPress Elementor',
				'Site vitrine'
			],
			summary:
				"Création d'un site WordPress pour une chambre d'hôtes haut de gamme, avec un objectif de visibilité et de prise de réservation en ligne.",
			interventions: [
				"Mise en place d'un site vitrine orienté conversion",
				"Intégration d'un système de réservation",
				'Optimisation SEO local et international',
				"Amélioration de la vitesse et de l'expérience utilisateur"
			],
			result:
				'Site opérationnel dès le lancement, avec un système de réservation actif et une visibilité Google améliorée.'
		}
	},
	{
		slug: 'pano-signservice',
		name: "PANO Sign'Service",
		stack: 'WordPress · Elementor · E-commerce',
		text: 'Refonte WordPress Elementor. Vitrine et e-commerce de signalétique.',
		url: 'https://www.pano-douai.fr/',
		image: 'pano-douai'
	},
	{
		slug: 'alternativ-uniforme',
		name: "Alternativ' Uniforme",
		stack: 'WordPress · PrestaShop · E-commerce B2B',
		text: 'PME industrielle de Caudry, personnalisation textile. Sites WordPress et PrestaShop, e-commerce B2B et devis en ligne, sur 4 ans.',
		url: 'https://alternativ-uniforme.fr/',
		image: 'alternativ-uniforme',
		details: {
			subtitle: 'Développement WordPress & E-commerce B2B',
			sector: 'Commerce de détail',
			period: 'février 2016 - janvier 2020',
			location: 'Caudry, France',
			skills: [
				'WordPress',
				'Site vitrine WordPress',
				'Création de site WordPress Elementor',
				'SEO WordPress',
				'Développeur WordPress'
			],
			summary:
				'PME industrielle de Caudry, avec plus de 100 clients B2B et une activité de personnalisation textile à échelle nationale. Gestion complète de la présence web sur 4 ans.',
			interventions: [
				'Création et refonte de sites WordPress et PrestaShop',
				'Développement e-commerce : catalogue produits, fiches produits, tunnel de commande et demande de devis en ligne',
				"Intégration d'une boutique e-commerce au site vitrine",
				'Optimisation SEO technique et performances',
				'Maintenance évolutive et mises à jour régulières'
			],
			result:
				'Sites fonctionnels, performants et autonomes, avec un trafic organique en progression constante sur 4 ans.'
		}
	},
	{
		slug: 'harmony-valse',
		name: 'Harmony Valse',
		stack: 'WordPress · Elementor · WooCommerce',
		text: 'Cours de valse à Paris. Refonte WordPress Elementor & WooCommerce : réservation et boutique en ligne.',
		url: 'https://harmonyvalse.com/',
		image: 'harmony-valse',
		details: {
			subtitle: 'Refonte WordPress Elementor & WooCommerce - réservation et boutique en ligne',
			sector: 'Divertissements & loisirs',
			period: 'août 2026 - septembre 2026',
			location: 'Paris, France',
			skills: [
				'Refonte WordPress',
				'WooCommerce',
				'Elementor',
				'Développeur WordPress',
				'Optimisation UX/UI',
				'Intégration WordPress'
			],
			summary:
				"Refonte technique et visuelle du site WordPress d'une école de valse à Paris, avec réservation de cours, ateliers et soirées ainsi qu'une boutique en ligne.",
			context:
				"Le site rencontrait des erreurs serveur bloquantes avec Elementor et plusieurs problèmes d'expérience sur mobile.",
			interventions: [
				'Refonte visuelle et intégration sous WordPress / Elementor',
				"Diagnostic et résolution d'erreurs serveur 500 liées à Elementor, PHP et à la gestion mémoire",
				'Refonte sur mesure du menu mobile et du panier',
				'Mise en place et optimisation de la boutique WooCommerce',
				"Amélioration du parcours d'achat et de réservation",
				"Optimisation responsive avec tests jusqu'à 320 px",
				"Intégration d'un planning interactif en ligne",
				"Création d'un formulaire de candidature multi-étapes",
				'Nettoyage et allègement des extensions'
			],
			result:
				'Site WordPress stabilisé et modernisé, avec une expérience mobile améliorée et un parcours plus fluide pour les réservations et les achats en ligne.',
			malt: 'https://www.malt.fr/profile/semauri#portfolio-item-6aa6e41f57d26cc7c4d117ed'
		}
	}
];
