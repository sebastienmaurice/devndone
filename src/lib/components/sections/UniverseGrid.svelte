<!--
	Les quatre univers (content/services.ts) : numéro, titre, texte, mots-clés.
	Sans lien par carte : il n'existe pas encore de page par univers.
-->
<script lang="ts">
	import { universes } from '$lib/content/services';
	import Badge from '../ui/Badge.svelte';
	import Card from '../ui/Card.svelte';

	let { headingLevel = 3 }: { headingLevel?: 2 | 3 | 4 } = $props();

	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<ul class="auto-grid universes" role="list">
	{#each universes as u, i (u.id)}
		<Card as="li">
			<p class="t-tech universe__num" aria-hidden="true">{pad(i)} /</p>
			<svelte:element this={`h${headingLevel}`} class="t-h3" id="univers-{u.id}"
				>{u.title}</svelte:element
			>
			<p>{u.text}</p>
			<ul class="cluster cluster--sm" role="list" aria-label="Domaines : {u.title}">
				{#each u.tags as tag (tag)}<li><Badge>{tag}</Badge></li>{/each}
			</ul>
		</Card>
	{/each}
</ul>

<style>
	.universes {
		--auto-min: 15rem;
	}
	.universe__num {
		color: var(--accent-text);
	}
</style>
