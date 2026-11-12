/**
 * Ressources : articles pratiques sur des problèmes WordPress et WooCommerce concrets.
 * Règles : aucun chiffre, aucun résultat client, aucune expérience personnelle revendiquée sans
 * validation de Sébastien ; toute affirmation technique renvoie à une source lue et citée en bas
 * d'article. Pas de tiret cadratin. Prix et conditions du dépannage : repris de content/tarifs.ts
 * (offre Sprint), sans promesse de résultat.
 * Imports relatifs uniquement : ce fichier est aussi lu par vite.config.ts via content/pages.ts.
 */

/**
 * Mise en page d'une section d'article (la page choisit le gabarit selon `kind`) :
 * - `flow` : texte et schéma en étapes (liste `flow`) ;
 * - `quote` : bandeau sombre avec une phrase mise en avant (`quote`) et le texte ;
 * - `checklist` : liste de contrôles en cartes (`list`) ;
 * - `steps` : étapes numérotées en cartes (`steps`) ;
 * - `case` : retour d'expérience en carte (cas vécu, anonymisé, faits fournis par Sébastien) ;
 * - `closing` : texte et carte d'appel vers l'offre de dépannage.
 */
export type ArticleSectionKind = 'flow' | 'quote' | 'checklist' | 'steps' | 'case' | 'closing';

export type ArticleSection = {
	/** Ancre de la section (sommaire) */
	id: string;
	/** Libellé court du sommaire */
	nav: string;
	title: string;
	kind: ArticleSectionKind;
	/** Paragraphes de texte brut */
	paragraphs?: readonly string[];
	/** Schéma `flow` : étapes dans l'ordre, avec une précision facultative */
	flow?: readonly { label: string; note?: string }[];
	/** Phrase mise en avant (`quote`), reformulation d'une source citée */
	quote?: string;
	/** Source de la phrase mise en avant */
	quoteSource?: string;
	/** Liste de contrôles (`checklist`) */
	list?: readonly string[];
	/** Étapes numérotées (`steps`) */
	steps?: readonly { title: string; text: string }[];
};

export type ArticleSource = {
	label: string;
	url: string;
	/** Ce que la source établit, en une phrase */
	note: string;
};

export type Article = {
	slug: string;
	/** Titre de la page (H1) */
	title: string;
	/** Mot ou groupe de mots affiché en orange dans le titre */
	accent?: string;
	/** Titre SEO, sans le nom du site */
	seoTitle: string;
	description: string;
	/** Chapô : le symptôme décrit dans les termes du lecteur */
	lede: string;
	/** Dates ISO (AAAA-MM-JJ) : publication et dernière modification */
	published: string;
	modified: string;
	sections: readonly ArticleSection[];
	sources: readonly ArticleSource[];
	/** Date de consultation des sources (affichée) */
	sourcesChecked: string;
	/** Sujets abordés (pastilles de la page Ressources), uniquement des termes présents dans l'article */
	tags: readonly string[];
	/** Mascotte de l'en-tête et de la carte du hub (par défaut : la loupe) */
	visual?: 'loupe' | 'guides';
	/** Carte de la section finale : dépannage (par défaut) ou simple contact */
	cta?: 'sprint' | 'contact';
	/** Mention discrète sous la signature (contexte du projet, outils utilisés) */
	note?: string;
};

export const ressourcesPage = {
	path: '/ressources/',
	seoTitle: 'Ressources : guides pratiques WordPress et WooCommerce',
	description:
		"Des guides pratiques sur WordPress, WooCommerce et le développement web, avec leurs sources : formulaire qui n'envoie plus, retours d'expérience sur des projets réels.",
	label: 'Ressources',
	title: 'Guides pratiques WordPress et WooCommerce',
	accent: 'Guides pratiques',
	lede: 'Des explications courtes sur des problèmes concrets, avec les sources citées en bas de chaque page.'
} as const;

export const articles: readonly Article[] = [
	{
		slug: 'identite-visuelle-cine-delices',
		title: "Trop sombre ? Ce que les retours m'ont appris sur le design de Ciné Délices",
		accent: 'Trop sombre ?',
		seoTitle: "Design de Ciné Délices : l'identité visuelle d'un site de cinéma et de cuisine",
		description:
			"Palette, typographies, cadres animés, pages créateurs : comment j'ai conçu l'identité visuelle de Ciné Délices et ce que les retours m'ont appris.",
		lede: "Un site de recettes inspirées du cinéma, un fond bleu nuit, de l'or, des cadres de profil animés. Voici comment l'identité visuelle de Ciné Délices a été construite, et ce que j'ai décidé de ne pas faire quand des visiteurs ont trouvé le site trop sombre.",
		published: '2026-11-12',
		modified: '2026-11-12',
		sourcesChecked: '12 novembre 2026',
		visual: 'guides',
		cta: 'contact',
		note: "Ciné Délices est un projet de formation (titre professionnel DWWM) mené en équipe de 3 et développé avec l'aide de Claude. Les illustrations des cadres et des fonds ont été générées avec des outils d'IA, puis détourées et optimisées. Mon rôle : le front-end et la direction artistique.",
		tags: [
			'Direction artistique',
			'Palette de couleurs',
			'Typographie',
			'Canvas',
			'color-mix',
			'Accessibilité'
		],
		sections: [
			{
				id: 'identite',
				nav: "D'un thème à une identité",
				title: "Partir d'un thème, y ajouter de la gourmandise",
				kind: 'flow',
				paragraphs: [
					"Ciné Délices relie des films et des séries à des recettes de cuisine, et chaque membre peut y publier. Sur ce projet, j'ai pris en charge le front-end et la direction artistique : l'idée était qu'une page du site soit aussi immersive qu'un générique de film.",
					"L'identité s'est construite par couches successives, du thème jusqu'aux pages sur mesure, sans framework CSS : les feuilles de style sont écrites à la main. Ce choix est assumé, mais il a un coût, qu'on retrouve plus bas avec la question du mode clair."
				],
				flow: [
					{ label: 'Un thème', note: 'Le cinéma, auquel on ajoute la cuisine' },
					{ label: 'Une palette', note: 'Bleu nuit et or, avec le rouge néon du logo' },
					{
						label: 'Des polices',
						note: "Une pour l'affiche, une pour le texte, deux pour les titres"
					},
					{
						label: 'Une ambiance de salle',
						note: 'Étoiles, halos de projecteur, motifs de pellicule, sections qui apparaissent au défilement'
					},
					{
						label: 'Des cadres de profil animés',
						note: 'Débloqués par niveau, un thème de film chacun'
					},
					{ label: 'Des pages sur mesure', note: 'Un thème de couleurs par créateur' }
				]
			},
			{
				id: 'lisible',
				nav: 'Sombre mais lisible',
				title: 'Un fond sombre, mais lisible',
				kind: 'quote',
				quote:
					"Le texte courant doit offrir un contraste d'au moins 4,5 pour 1 avec son fond, pour respecter le niveau AA des règles d'accessibilité.",
				quoteSource: "WCAG 2.1, critère 1.4.3, reformulé (page citée en bas d'article)",
				paragraphs: [
					"Les variables CSS du site posent le fond bleu nuit #142234, des cartes en #0f1e30 et des titres en or #e3b148. Le code garde la trace d'un arbitrage : le fond a été éclairci de 3 % par rapport à la valeur d'origine, parce qu'il se lisait mieux sur des écrans non calibrés. L'or est décrit dans le code comme « ambré, moins saturé, luxe cinéma ».",
					"Côté typographie, le site charge quatre polices : Playfair Display pour les titres éditoriaux, Bebas Neue pour les grands titres d'affiche, Cinzel pour les petits titres, les boutons et la navigation, Lato pour le texte courant.",
					"Un audit d'accessibilité automatique (axe-core) est branché dans les tests, et les couleurs des textes ont fait l'objet de comparaisons de variantes. Je n'ai en revanche pas mesuré de ratios de contraste précis, donc je n'en cite pas : c'est un contrôle que je ferais avec un outil dédié avant de m'engager sur un chiffre."
				]
			},
			{
				id: 'cadres',
				nav: 'Les cadres animés',
				title: 'Les cadres de profil animés',
				kind: 'checklist',
				paragraphs: [
					"C'est la partie la plus visible du site : chaque membre peut équiper un cadre autour de son avatar, débloqué selon sa progression."
				],
				list: [
					'Cinq cadres animés dessinés sur un élément canvas (Sherlock Holmes, Matrix, Indiana Jones, Harry Potter et le cadre Ciné Délices), chacun avec son propre système de particules : sort de baguette, pluie de code, poussière, étincelles.',
					'Un sixième cadre, Doctor Strange, réalisé uniquement en CSS.',
					"Un moteur d'animation d'environ 800 lignes de JavaScript : une classe par thème, et un chef d'orchestre commun.",
					'Douze fonds de bannière associés aux cadres, choisis selon une priorité : bannière personnalisée approuvée, puis variante choisie, puis fond du cadre équipé, puis fond par défaut.',
					"Une préférence « réduire les animations » respectée par le carrousel des publications, mais pas encore par la page CinéPass : c'est un chantier d'accessibilité à venir."
				]
			},
			{
				id: 'createurs',
				nav: 'Un thème par créateur',
				title: 'Une page sur mesure par créateur : une couleur, tout le reste calculé',
				kind: 'steps',
				steps: [
					{
						title: 'Une seule couleur principale',
						text: 'Le créateur choisit une couleur. Les teintes, bordures et survols de sa page se calculent en CSS avec color-mix(), à partir de cette seule valeur. La fonction mélange des couleurs dans un espace colorimétrique donné ; elle est disponible dans les navigateurs depuis mai 2023.'
					},
					{
						title: "Un héros et un cadre qui s'ajuste",
						text: "La page reprend le décor et le slogan du créateur. Son cadre sur mesure trouve tout seul où placer l'avatar : le serveur analyse le canal transparent de l'image pour repérer le centre et le diamètre du trou."
					},
					{
						title: 'Une bannière de publications',
						text: 'En bas de page, une bannière présente ses douze publications les plus populaires sur deux rails qui défilent en sens inverse, avec des flèches, une pause au survol et le respect de la préférence « réduire les animations ».'
					},
					{
						title: 'Des retours, un ajustement',
						text: 'Le créateur peut choisir son fond parmi des visuels validés et modifier sa bio, son slogan et son lien depuis un bouton « Personnaliser mon profil » à ses couleurs. Les itérations (héros sombre ou rose, hauteur de la bannière, bouton, pastille « Créatrice Partenaire ») ont chacune répondu à un retour précis.'
					}
				]
			},
			{
				id: 'trop-sombre',
				nav: 'Trop sombre ?',
				title: 'Des visiteurs ont trouvé le site trop sombre',
				kind: 'case',
				paragraphs: [
					"Des retours d'utilisateurs ont fait ressortir deux choses : le site paraissait trop foncé, et l'or, volontairement peu saturé, semblait terne à côté d'un rose très saturé comme celui d'une créatrice partenaire. Ce sont des retours oraux, sans mesure : je n'ai aucun chiffre de satisfaction à vous donner.",
					"J'ai décidé de ne pas refaire le site en mode clair. La raison est technique : la variable du bleu nuit n'est utilisée que dans une minorité des déclarations, la plupart des couleurs sombres étant écrites en dur dans des feuilles de style très volumineuses. Un mode clair aurait demandé de reprendre le site page par page, pour un gain incertain.",
					"Les pistes légères retenues si le retour revient : éclaircir un cran les surfaces, intercaler des sections claires, et proposer un réglage « ambiance claire » par créateur. Savoir dire « ça n'en vaut pas le coup », arguments techniques à l'appui, fait aussi partie du travail."
				]
			},
			{
				id: 'conclusion',
				nav: 'Ce que ça apprend',
				title: 'Un design vivant se construit avec les retours',
				kind: 'closing',
				paragraphs: [
					"Ce que je retiens de Ciné Délices : une identité forte se pose vite, mais elle ne vaut que si elle reste lisible et qu'on sait la faire évoluer. La vraie compétence, c'est de choisir quels retours intégrer et lesquels laisser de côté, en connaissant le coût de chaque changement.",
					"Si votre projet demande autre chose qu'un thème standard, parlons-en : j'explique ce qui est faisable et à quel prix, avant de m'engager."
				]
			}
		],
		sources: [
			{
				label: 'Ciné Délices : feuille de style publique (base.css)',
				url: 'https://cinedelices.com/css/base.css',
				note: 'Les valeurs #142234, #0f1e30 et #e3b148 et leurs commentaires, tels que le site les publie.'
			},
			{
				label: 'W3C, WCAG 2.1 : Contraste (minimum), critère 1.4.3',
				url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html',
				note: "Ratio d'au moins 4,5 pour 1 pour le texte courant au niveau AA, 3 pour 1 pour le grand texte."
			},
			{
				label: 'MDN, color-mix()',
				url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix',
				note: 'Mélange de couleurs dans un espace colorimétrique donné ; disponible dans les navigateurs depuis mai 2023. Page en anglais.'
			},
			{
				label: 'MDN, prefers-reduced-motion',
				url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',
				note: "Détecte la préférence de l'utilisateur pour la réduction des mouvements non essentiels. Page en anglais."
			},
			{
				label: 'MDN, API Canvas',
				url: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API',
				note: "Dessin de graphismes et d'animations en JavaScript avec l'élément canvas. Page en anglais."
			}
		]
	},
	{
		slug: 'formulaire-wordpress-qui-n-envoie-plus',
		title: "Formulaire WordPress qui n'envoie plus : comprendre et corriger",
		accent: "n'envoie plus",
		seoTitle: "Formulaire WordPress qui n'envoie plus : causes et corrections",
		description:
			'Le formulaire de votre site WordPress dit « message envoyé » mais vous ne recevez rien ? Les causes possibles, ce que vous pouvez vérifier et la correction durable.',
		lede: "Le formulaire affiche « message envoyé », mais rien n'arrive dans votre boîte de réception. Voici pourquoi cela se produit, ce que vous pouvez vérifier vous-même et comment corriger durablement.",
		published: '2026-11-11',
		modified: '2026-11-11',
		sourcesChecked: '11 novembre 2026',
		tags: ['WordPress', 'Formulaire de contact', 'E-mails', 'SMTP', 'SPF', 'DKIM', 'DMARC'],
		sections: [
			{
				id: 'chemin',
				nav: "Le chemin d'un e-mail",
				title: 'Ce que fait WordPress quand un formulaire envoie un message',
				kind: 'flow',
				paragraphs: [
					"Par défaut, WordPress n'envoie pas lui-même les e-mails. Sa fonction wp_mail() demande à la bibliothèque PHPMailer d'utiliser la fonction mail() de PHP, qui suppose la présence, sur le serveur, d'un programme d'envoi compatible sendmail.",
					"Sans ce programme correctement configuré, le message n'est pas envoyé, sauf si l'on configure un serveur SMTP distant. Autrement dit, l'envoi dépend de l'hébergement du site, pas seulement du formulaire. La documentation officielle de WordPress précise que cela fonctionne en général sans difficulté sur un hébergement managé."
				],
				flow: [
					{ label: 'Votre formulaire', note: 'Le visiteur clique sur « Envoyer »' },
					{ label: 'wp_mail()', note: "La fonction d'envoi de WordPress" },
					{ label: 'PHPMailer', note: 'La bibliothèque utilisée par WordPress' },
					{ label: 'mail() de PHP', note: 'Le réglage par défaut' },
					{
						label: "Serveur d'hébergement",
						note: "Un programme d'envoi compatible sendmail y est requis"
					},
					{
						label: 'Boîte de réception',
						note: 'Ou dossier des indésirables, si le message est refusé ou mal authentifié'
					}
				]
			},
			{
				id: 'pourquoi',
				nav: "Pourquoi il n'arrive pas",
				title: 'Pourquoi un message envoyé peut ne jamais arriver',
				kind: 'quote',
				quote:
					'Un formulaire de contact qui envoie des messages automatiquement est un expéditeur de votre domaine.',
				quoteSource: "Aide de Google, reformulée (page citée en bas d'article)",
				paragraphs: [
					"Un message parti du site peut être refusé ou classé en indésirable par la messagerie qui le reçoit. D'après l'aide de Google, la cause est souvent la façon dont le formulaire authentifie ses e-mails : ce n'est en général pas le formulaire lui-même qui est en cause, mais l'envoi du message.",
					'Trois mécanismes reviennent : SPF, le relais SMTP et DKIM. Le formulaire doit donc être déclaré comme un expéditeur de votre domaine dans la configuration de celui-ci.',
					"La documentation WordPress ajoute deux points : l'adresse d'expéditeur par défaut est de la forme wordpress@votre-domaine, et il est conseillé d'utiliser une adresse réelle de votre domaine. Elle présente la mise en place des enregistrements SPF, DKIM et DMARC comme une étape essentielle pour que les messages arrivent."
				]
			},
			{
				id: 'verifier',
				nav: 'À vérifier soi-même',
				title: 'Ce que vous pouvez vérifier vous-même',
				kind: 'checklist',
				paragraphs: ['Quelques contrôles simples, sans toucher au code :'],
				list: [
					'Le dossier des indésirables (spam) de la boîte qui doit recevoir les messages.',
					"L'adresse de destination configurée dans le formulaire (une faute de frappe suffit).",
					"L'adresse d'expéditeur du formulaire : une adresse de votre propre domaine est préférable, selon la documentation WordPress.",
					"Si votre messagerie est Google Workspace et que vous en êtes administrateur : la recherche dans le journal des e-mails. L'aide de Google cite par exemple une erreur « 550-5.7.26 Unauthenticated email », qui peut signaler une configuration SPF incomplète."
				]
			},
			{
				id: 'correction',
				nav: 'La correction durable',
				title: 'La correction durable : un envoi authentifié',
				kind: 'steps',
				steps: [
					{
						title: 'Un envoi par un service tiers',
						text: "Pour que l'envoi ne dépende plus du serveur d'hébergement, on fait passer les messages par un service d'envoi tiers, via un relais SMTP. La documentation WordPress décrit plusieurs façons de le faire, dont les extensions SMTP : elles remplacent les réglages d'envoi de wp_mail() et transmettent le message par un service tiers. L'aide de Google cite l'extension WP Mail SMTP pour les formulaires Contact Form 7."
					},
					{
						title: 'Un domaine correctement déclaré',
						text: "Cette étape ne suffit pas seule. La documentation WordPress insiste sur les enregistrements SPF, DKIM et DMARC du domaine, et l'aide de Google demande de les compléter auprès du fournisseur du service d'envoi. Les identifiants SMTP se vérifient chez ce fournisseur, pas dans la console de la messagerie."
					}
				]
			},
			{
				id: 'cas',
				nav: 'Un cas rencontré',
				title: 'Rencontré pendant une migration',
				kind: 'case',
				paragraphs: [
					"Lors d'une mission de migration d'un site WordPress pour un concepteur-rédacteur et photographe indépendant, le formulaire de contact ne livrait déjà aucun message au début de la mission. J'ai créé un compte d'envoi SMTP dédié chez l'hébergeur de messagerie du client et configuré l'extension WP Mail SMTP. Un test réel a confirmé que les messages arrivaient à l'adresse du site.",
					"Une limite, qui illustre le propos : un test vers une adresse Gmail externe échouait toujours, alors que SPF, DKIM et DMARC étaient valides et que l'adresse IP d'envoi était propre sur les listes noires pertinentes. La cause exacte n'a pas été identifiée, et le client a choisi de reprendre ce point lui-même."
				]
			},
			{
				id: 'diagnostic',
				nav: 'Sans regarder votre site',
				title: 'Ce que je ne peux pas vous dire sans regarder votre site',
				kind: 'closing',
				paragraphs: [
					'La cause dépend de votre hébergement, de votre domaine et de la façon dont le formulaire est configuré. Aucune règle générale ne permet de la deviner : elle se trouve en diagnostiquant le site.',
					"Si vous préférez me confier ce diagnostic, c'est le rôle de l'offre de dépannage : un diagnostic, un devis, puis une intervention ciblée sur un site WordPress ou WooCommerce existant. Elle est facturée 175 € la demi-journée pour une intervention courte et définie, 350 € la journée. Si la cause demande plus de temps, je vous le signale et vous décidez : rien n'est facturé au-delà sans votre accord écrit."
				]
			}
		],
		sources: [
			{
				label: 'WordPress.org, Advanced Administration Handbook : Mail',
				url: 'https://developer.wordpress.org/advanced-administration/wordpress/mail/',
				note: "Fonctionnement par défaut de wp_mail(), PHPMailer et mail(), relais SMTP, extensions SMTP, adresse d'expéditeur, SPF, DKIM et DMARC."
			},
			{
				label: 'Google Workspace, Troubleshoot Gmail not getting contact form messages',
				url: 'https://knowledge.workspace.google.com/admin/support/troubleshooting/troubleshoot-gmail-not-getting-contact-form-messages',
				note: 'Cause fréquente (authentification des e-mails du formulaire), SPF, relais SMTP, DKIM, journal des e-mails, cas de Contact Form 7. Page en anglais.'
			}
		]
	}
];

/** Article d'un slug (null si le slug est inconnu) */
export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug) ?? null;
export const articlePath = (slug: string) => `/ressources/${slug}/` as const;
