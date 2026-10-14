/**
 * Registre des pages publiques. Il alimente la navigation, le pied de page
 * et le sitemap : une page n'apparaît nulle part tant qu'elle n'est pas ici.
 *
 * Toujours un slash final (trailingSlash: 'always'), jamais d'accent dans l'URL.
 */
export type PageEntry = {
	path: `/${string}`;
	label: string;
	/** Affichée dans la navigation principale */
	nav?: boolean;
	/** Affichée dans le pied de page, colonne légale */
	legal?: boolean;
	/** Incluse dans sitemap.xml */
	sitemap: boolean;
	priority?: number;
};

export const pages: PageEntry[] = [
	{ path: '/', label: 'Accueil', sitemap: true, priority: 1 }, // le logo ramène à l'accueil
	{ path: '/services/', label: 'Services', nav: true, sitemap: true, priority: 0.9 },
	{ path: '/realisations/', label: 'Réalisations', nav: true, sitemap: true, priority: 0.8 },
	{ path: '/tarifs/', label: 'Tarifs', nav: true, sitemap: true, priority: 0.8 },
	{ path: '/a-propos/', label: 'À propos', nav: true, sitemap: true, priority: 0.6 },
	{ path: '/contact/', label: 'Contact', nav: true, sitemap: true, priority: 0.7 },
	{
		path: '/mentions-legales/',
		label: 'Mentions légales',
		legal: true,
		sitemap: true,
		priority: 0.2
	}
];

export const navPages = pages.filter((p) => p.nav);
export const legalPages = pages.filter((p) => p.legal);
export const sitemapPages = pages.filter((p) => p.sitemap);
