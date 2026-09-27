<!--
	Section de page : déclare son contexte de surface, son rythme vertical et son conteneur.
	Tous les composants à l'intérieur s'accordent seuls au fond choisi.

	<Section surface="ivory" labelledby="services-title">…</Section>
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		surface?: 'night' | 'raised' | 'ivory' | 'orange';
		/** Rythme vertical réduit (bandeaux, transitions) */
		tight?: boolean;
		/** Sans padding vertical (visuel pleine largeur) */
		flush?: boolean;
		/** Sans .container interne (contenu pleine largeur) */
		bleed?: boolean;
		id?: string;
		/** id du titre de la section, pour aria-labelledby */
		labelledby?: string;
		label?: string;
		class?: string;
		children: Snippet;
	};

	let {
		surface = 'night',
		tight = false,
		flush = false,
		bleed = false,
		id,
		labelledby,
		label,
		class: className = '',
		children
	}: Props = $props();
</script>

<section
	{id}
	class="surface-{surface} {className}"
	class:section={!flush}
	class:section--tight={tight && !flush}
	aria-labelledby={labelledby}
	aria-label={labelledby ? undefined : label}
>
	{#if bleed}
		{@render children()}
	{:else}
		<div class="container">
			{@render children()}
		</div>
	{/if}
</section>

<style>
	section {
		position: relative;
		overflow: clip;
	}
</style>
