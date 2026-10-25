/**
 * Mentions légales (obligatoires en France : LCEN, art. 6-III et art. 19).
 * Sources : synthèse du Guichet unique INPI, formalité J00274978378 (validée le 26/08/2026),
 * et mentions-legales.html du site en ligne (branche main du dépôt devndone), dont les textes
 * affichés sont repris tels quels. Adresse et téléphone : publication validée par Sébastien.
 *
 * Tout champ contenant « À COMPLÉTER » fait échouer `npm run check:build`
 * en mode production : le site ne peut pas être publié sans ces informations.
 */
export const legal = {
	publisher: {
		name: 'Sébastien Maurice',
		tradeName: "DEV'n DONE",
		status: 'Entrepreneur individuel (micro-entreprise)',
		siret: '517 849 733 00020',
		registration: 'Immatriculé au Registre national des entreprises (RNE)',
		ape: '6201Z, programmation informatique',
		vat: 'TVA non applicable, art. 293 B du CGI',
		siren: '517 849 733',
		/** Phrase d'identification affichée en tête des mentions (texte du site en ligne) */
		intro:
			"Dev'n Done, nom commercial de Sébastien Maurice, entrepreneur individuel (EI), micro-entreprise.",
		address: '1 rue Blaise Pascal, 59540 Caudry, France.',
		email: 'contact@devndone.com',
		phone: '06 20 84 78 01',
		publicationDirector: 'Sébastien Maurice'
	},
	host: {
		// Site publié sur GitHub Pages. Raison sociale et adresse : section « Contacting GitHub »
		// de la GitHub General Privacy Statement (docs.github.com/en/site-policy), relevées le 14/10/2026.
		name: 'GitHub, Inc.',
		address: '88 Colin P. Kelly Jr. St., San Francisco, CA 94107, États-Unis',
		website: 'https://github.com'
	},
	/** Textes du site en ligne, repris tels quels */
	privacy:
		"Ce site ne dépose pas de cookie et ne collecte aucune donnée personnelle par lui-même. La prise de rendez-vous passe par le service Calendly, soumis à sa propre politique de confidentialité. Si vous m'écrivez par email, vos informations ne servent qu'à répondre à votre demande.",
	intellectualProperty:
		"Les contenus de ce site (textes, visuels, mise en page) sont la propriété de Dev'n Done, sauf mention contraire. Les sites et marques cités appartiennent à leurs propriétaires respectifs.",
	updatedAt: '2026-10-14'
} as const;
