<!--
	Forfait tarifaire : titre, prix, inclusions, action.
	Les montants viennent du contenu (catalogue), jamais écrits dans un composant.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Badge from './Badge.svelte';

	type Props = {
		title: string;
		/** Montant affiché tel quel, ex. « 990 € » */
		price: string;
		/** Précision du prix, ex. « HT · 7 jours » */
		unit?: string;
		features?: readonly string[];
		/** Mise en avant (bordure orange + badge) */
		highlight?: string;
		headingLevel?: 2 | 3 | 4;
		/** Emplacement du bouton d'action */
		action?: Snippet;
	};

	let { title, price, unit, features = [], highlight, headingLevel = 3, action }: Props = $props();
</script>

<article class="card offer" class:offer--featured={!!highlight}>
	<div class="offer__head">
		<svelte:element this={`h${headingLevel}`} class="t-h3">{title}</svelte:element>
		{#if highlight}<Badge tone="accent">{highlight}</Badge>{/if}
	</div>
	<p class="offer__price">
		<span class="offer__amount">{price}</span>
		{#if unit}<span class="offer__unit">{unit}</span>{/if}
	</p>
	{#if features.length}
		<ul class="offer__list">
			{#each features as feature (feature)}<li>{feature}</li>{/each}
		</ul>
	{/if}
	{@render action?.()}
</article>
