import { absoluteUrl, isStaging } from '$lib/config/site';

// Généré au build : production autorise l'indexation, staging l'interdit.
export const prerender = true;

export function GET() {
	const body = isStaging
		? 'User-agent: *\nDisallow: /\n'
		: `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;

	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
