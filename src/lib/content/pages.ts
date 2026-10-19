/**
 * Registre des pages publiques. Il alimente le header, le pied de page, le sitemap et les
 * points d'entrée du prérendu (vite.config.ts) : une page n'apparaît nulle part tant qu'elle
 * n'est pas ici. Les pages de services et les études de cas sont générées depuis les données.
 *
 * Toujours un slash final (trailingSlash: 'always'), jamais d'accent dans l'URL.
 * Imports relatifs uniquement : ce fichier est aussi lu par vite.config.ts (pas d'alias $lib).
 */
import { projects } from './realisations';
import { universes } from './services';

export type PageEntry = {
	path: `/${string}`;
	label: string;
	/** Colonne du pied de page */
	footer?: 'expertises' | 'studio' | 'legal';
	/** Incluse dans sitemap.xml */
	sitemap: boolean;
	priority?: number;
};

export type NavItem = {
	label: string;
	href: string;
	/** Chemin qui rend l'entrée active */ match: string;
};

/** Header (maquette du 19/10/2026) : les cinq expertises, puis le bouton d'action */
export const headerNav: NavItem[] = [
	{ label: 'WordPress', href: '/services/web/', match: '/services/web/' },
	{ label: 'WooCommerce', href: '/services/web/#woocommerce', match: '/services/web/' },
	{
		label: 'Automatisation',
		href: '/services/automatisation/',
		match: '/services/automatisation/'
	},
	{ label: 'Identité', href: '/services/design/', match: '/services/design/' },
	{ label: 'Full Stack', href: '/services/full-stack/', match: '/services/full-stack/' }
];

export const pages: PageEntry[] = [
	{ path: '/', label: 'Accueil', sitemap: true, priority: 1 },
	{ path: '/services/', label: 'Services', footer: 'studio', sitemap: true, priority: 0.9 },
	...universes.map((u): PageEntry => ({
		path: u.path,
		label: u.title,
		footer: 'expertises',
		sitemap: true,
		priority: 0.8
	})),
	{ path: '/realisations/', label: 'Réalisations', footer: 'studio', sitemap: true, priority: 0.8 },
	...projects.map((p): PageEntry => ({
		path: `/realisations/${p.slug}/`,
		label: p.name,
		sitemap: true,
		priority: 0.6
	})),
	{ path: '/tarifs/', label: 'Tarifs', footer: 'studio', sitemap: true, priority: 0.7 },
	{ path: '/apropos/', label: 'À propos', footer: 'studio', sitemap: true, priority: 0.6 },
	{ path: '/contact/', label: 'Contact', footer: 'studio', sitemap: true, priority: 0.7 },
	{
		path: '/mentions-legales/',
		label: 'Mentions légales',
		footer: 'legal',
		sitemap: true,
		priority: 0.2
	},
	{
		path: '/confidentialite/',
		label: 'Confidentialité',
		footer: 'legal',
		sitemap: true,
		priority: 0.2
	}
];

/** Menu mobile : les expertises puis les pages du studio */
export const mobileNav: NavItem[] = [
	...universes.map((u) => ({ label: u.title, href: u.path, match: u.path })),
	...pages
		.filter((p) => p.footer === 'studio' && p.path !== '/services/')
		.map((p) => ({ label: p.label, href: p.path, match: p.path }))
];

export const footerPages = (column: NonNullable<PageEntry['footer']>) =>
	pages.filter((p) => p.footer === column);
export const sitemapPages = pages.filter((p) => p.sitemap);
