// Un article par entrée de content/ressources.ts, généré au build.
import { error } from '@sveltejs/kit';
import { articles } from '$lib/content/ressources';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => articles.map((a) => ({ slug: a.slug }));

export const load: PageLoad = ({ params }) => {
	const article = articles.find((a) => a.slug === params.slug);
	if (!article) error(404, 'Article introuvable');
	return { article };
};
