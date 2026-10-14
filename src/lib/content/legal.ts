/**
 * Mentions légales (obligatoires en France — LCEN, art. 6-III et art. 19).
 * Source : synthèse du Guichet unique INPI, formalité J00274978378 (validée le 26/08/2026).
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
		ape: '6201Z — Programmation informatique',
		vat: 'TVA non applicable, art. 293 B du CGI',
		// Adresse du domicile volontairement non publiée. La LCEN (art. 6-III) demande une adresse
		// pour un entrepreneur individuel : renseigner ici une domiciliation d'entreprise ou une boîte
		// postale dès qu'elle existe. Tant que le champ est vide, check:build émet un avertissement.
		address: '' as string,
		email: 'overseb75@gmail.com',
		phone: '+33 6 20 84 78 01',
		publicationDirector: 'Sébastien Maurice'
	},
	host: {
		// Site publié sur GitHub Pages. Raison sociale et adresse : section « Contacting GitHub »
		// de la GitHub General Privacy Statement (docs.github.com/en/site-policy), relevées le 14/10/2026.
		name: 'GitHub, Inc.',
		address: '88 Colin P. Kelly Jr. St., San Francisco, CA 94107, États-Unis',
		website: 'https://github.com'
	},
	updatedAt: '2026-10-14'
} as const;
