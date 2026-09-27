import { absoluteUrl } from '$lib/config/site';
import { sitemapPages } from '$lib/content/pages';

// Généré une fois au build : fichier statique build/sitemap.xml
export const prerender = true;

export function GET() {
	const urls = sitemapPages
		.map(
			(p) => `  <url>
    <loc>${absoluteUrl(p.path)}</loc>${p.priority !== undefined ? `\n    <priority>${p.priority.toFixed(1)}</priority>` : ''}
  </url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
