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
		// Informations publiques d'Hostinger — à vérifier sur hostinger.fr avant publication
		name: 'Hostinger International Ltd',
		address: '61 Lordou Vironos Street, 6023 Larnaca, Chypre',
		website: 'https://www.hostinger.fr'
	},
	updatedAt: '2026-09-27'
} as const;
