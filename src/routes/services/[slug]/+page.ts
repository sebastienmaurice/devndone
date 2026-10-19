// Une page par expertise, générée au build depuis content/services.ts.
import { error } from '@sveltejs/kit';
import { universes } from '$lib/content/services';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => universes.map((u) => ({ slug: u.id }));

export const load: PageLoad = ({ params }) => {
	const index = universes.findIndex((u) => u.id === params.slug);
	if (index < 0) error(404, 'Expertise introuvable');
	return { universe: universes[index], index };
};
