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
 * - `closing` : texte et carte d'appel vers l'offre de dépannage.
 */
export type ArticleSectionKind = 'flow' | 'quote' | 'checklist' | 'steps' | 'closing';

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
};

export const ressourcesPage = {
	path: '/ressources/',
	seoTitle: 'Ressources : guides pratiques WordPress et WooCommerce',
	description:
		"Des explications courtes sur des problèmes WordPress et WooCommerce concrets, avec leurs sources : formulaire qui n'envoie plus, e-mails qui n'arrivent pas.",
	label: 'Ressources',
	title: 'Guides pratiques WordPress et WooCommerce',
	accent: 'Guides pratiques',
	lede: 'Des explications courtes sur des problèmes concrets, avec les sources citées en bas de chaque page.'
} as const;

export const articles: readonly Article[] = [
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
