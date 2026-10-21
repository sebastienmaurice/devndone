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
import { logicielPage } from './logiciel';
import { maintenancePage, offerPath, offers } from './tarifs';
import { agencesPage } from './agences';

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

/** Menu principal : les pages du site (le logo ramène à l'accueil). Une entrée est active sur sa
 *  page et sur ses sous-pages (ex. /services/web/ active « Services »). */
export const headerNav: NavItem[] = [
	{ label: 'Services', href: '/services/', match: '/services/' },
	{ label: 'Agences', href: agencesPage.path, match: agencesPage.path },
	{ label: 'Réalisations', href: '/realisations/', match: '/realisations/' },
	{ label: 'Tarifs', href: '/tarifs/', match: '/tarifs/' },
	{ label: 'À propos', href: '/apropos/', match: '/apropos/' },
	{ label: 'Contact', href: '/contact/', match: '/contact/' }
];

export const pages: PageEntry[] = [
	{ path: '/', label: 'Accueil', sitemap: true, priority: 1 },
	{ path: '/services/', label: 'Services', footer: 'studio', sitemap: true, priority: 0.9 },
	{ path: agencesPage.path, label: 'Agences', footer: 'studio', sitemap: true, priority: 0.8 },
	...universes.map((u): PageEntry => ({
		path: u.path,
		label: u.title,
		footer: 'expertises',
		sitemap: true,
		priority: 0.8
	})),
	// Pages d'offre (catalogue au forfait) et maintenance, rattachées à leur rubrique
	...offers.map((o): PageEntry => ({
		path: offerPath(o),
		label: o.name,
		sitemap: true,
		priority: 0.7
	})),
	{ path: maintenancePage.path, label: 'Maintenance WordPress', sitemap: true, priority: 0.7 },
	{ path: logicielPage.path, label: 'Logiciel pour enseignistes', sitemap: true, priority: 0.6 },
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

/** Menu mobile : l'accueil puis les mêmes pages que le menu principal */
export const mobileNav: NavItem[] = [{ label: 'Accueil', href: '/', match: '/' }, ...headerNav];

export const footerPages = (column: NonNullable<PageEntry['footer']>) =>
	pages.filter((p) => p.footer === column);
export const sitemapPages = pages.filter((p) => p.sitemap);
