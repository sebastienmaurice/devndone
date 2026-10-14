<!--
	Les quatre univers (content/services.ts), d'après la maquette « services » :
	numéro cerclé, titre, texte, mots-clés. Sans couleur d'univers (hors charte, non validées)
	et sans lien par carte (il n'existe pas de page par univers).
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
			<div class="universe__head">
				<span class="num-circle" aria-hidden="true">{pad(i)}</span>
				<svelte:element this={`h${headingLevel}`} class="t-h3" id="univers-{u.id}"
					>{u.title}</svelte:element
				>
			</div>
			<p>{u.text}</p>
			<ul class="cluster cluster--sm universe__tags" role="list" aria-label="Domaines : {u.title}">
				{#each u.tags as tag (tag)}<li><Badge>{tag}</Badge></li>{/each}
			</ul>
		</Card>
	{/each}
</ul>

<style>
	.universes {
		--auto-min: 15rem;
	}
	.universes > :global(li) {
		grid-template-rows: auto 1fr auto;
	}
	.universe__head {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}
	.num-circle {
		display: inline-grid;
		place-items: center;
		flex: none;
		width: 2.75rem;
		height: 2.75rem;
		border: var(--border-hair) solid var(--accent-deco);
		border-radius: 50%;
		font-family: var(--font-mono);
		font-size: var(--text-body-sm);
		color: var(--accent-text);
	}
	.universe__tags {
		align-self: end;
	}
</style>
