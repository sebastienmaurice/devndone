<!--
	Les quatre univers (content/services.ts) en cartes à image (design system v1.1) : fonds alternés
	(Night, Orange, surface du contexte, Night : une seule carte orange), visuel dans une forme
	organique, texte, domaines en liste à coches. Le visuel attend les poses de la mascotte
	(brand/mascotte-banque-de-poses.md, poses 2 à 5) : en attendant, une grande tuile d'icône.
	`href` : toute la carte devient un lien, avec le bouton rond décoratif.
-->
<script lang="ts">
	import { universes } from '$lib/content/services';
	import Icon, { type IconName } from '../brand/Icon.svelte';

	type Props = { headingLevel?: 2 | 3 | 4; href?: string };

	let { headingLevel = 3, href }: Props = $props();

	const icon: Record<string, IconName> = {
		web: 'site',
		design: 'palette',
		automatisation: 'workflow',
		'full-stack': 'code'
	};
	const surfaces = ['surface-night', 'surface-orange', '', 'surface-night'];
</script>

<ul class="auto-grid universes" role="list">
	{#each universes as u, i (u.id)}
		<li class="media-card {surfaces[i % surfaces.length]}" class:media-card--static={!href}>
			<svelte:element this={href ? 'a' : 'div'} class="media-card__body" {href}>
				<div class="media-card__media media-card__media--organic universe__media">
					<span class="universe__tile"><Icon name={icon[u.id] ?? 'sparkles'} /></span>
				</div>
				<div class="media-card__text">
					<svelte:element this={`h${headingLevel}`} class="t-h3" id="univers-{u.id}"
						>{u.title}</svelte:element
					>
					<p>{u.text}</p>
					<ul class="check-list" role="list" aria-label="Domaines : {u.title}">
						{#each u.tags as tag (tag)}
							<li><Icon name="check" />{tag}</li>
						{/each}
					</ul>
				</div>
			</svelte:element>
			{#if href}
				<span class="media-card__go" aria-hidden="true"><Icon name="arrow-up-right" /></span>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.universes {
		--auto-min: 16rem;
	}
	.universe__media {
		display: grid;
		place-items: center;
		background: color-mix(in srgb, var(--text) 6%, transparent);
	}
	.universe__tile {
		display: grid;
		place-items: center;
		width: 40%;
		aspect-ratio: 1;
		border-radius: var(--radius-tile);
		background: var(--bg);
		color: var(--action-alt-text);
	}
	.universe__tile :global(.icon) {
		width: 45%;
		height: 45%;
		stroke-width: 1.5;
	}
	:global(.surface-orange) .universe__tile {
		color: var(--text);
	}
</style>
