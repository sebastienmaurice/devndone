<!--
	Les quatre univers (content/services.ts) en liste éditoriale du design system
	(FeatureList : numéro mono, titre, texte, filet), avec leurs mots-clés en badges neutres.
-->
<script lang="ts">
	import { universes } from '$lib/content/services';
	import Badge from '../ui/Badge.svelte';
	import FeatureList, { type FeatureItem } from '../ui/FeatureList.svelte';

	let { headingLevel = 3 }: { headingLevel?: 2 | 3 | 4 } = $props();

	const tagsOf = (item: FeatureItem) => universes.find((u) => u.title === item.title)?.tags ?? [];
</script>

<FeatureList items={universes} {headingLevel}>
	{#snippet extra(item)}
		<ul class="cluster cluster--sm" role="list" aria-label="Domaines : {item.title}">
			{#each tagsOf(item) as tag (tag)}<li><Badge>{tag}</Badge></li>{/each}
		</ul>
	{/snippet}
</FeatureList>
