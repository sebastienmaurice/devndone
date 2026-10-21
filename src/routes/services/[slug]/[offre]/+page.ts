// Une page par offre (content/tarifs.ts), rattachée à sa rubrique : /services/<rubrique>/<offre>/.
// Les routes fixes (logiciel pour enseignistes, maintenance WordPress) restent prioritaires.
import { error } from '@sveltejs/kit';
import { universes } from '$lib/content/services';
import { offers } from '$lib/content/tarifs';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	offers.map((o) => ({ slug: o.universe, offre: o.slug }));

export const load: PageLoad = ({ params }) => {
	const offer = offers.find((o) => o.universe === params.slug && o.slug === params.offre);
	const universe = universes.find((u) => u.id === params.slug);
	if (!offer || !universe) error(404, 'Offre introuvable');
	return { offer, universe };
};
