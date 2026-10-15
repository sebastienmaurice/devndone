<!--
	Annotation manuscrite (charte v1.2, 11.C) : une par écran, deux lignes au maximum,
	jamais une information essentielle. `decorative` la masque aux lecteurs d'écran
	quand elle répète un contenu voisin. La flèche est toujours décorative.

	<Annotation arrow="right">Ton co-pilote de projets</Annotation>
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		/** Flèche vers le sujet : à droite (défaut), à gauche (inclinaison inversée) ou aucune */
		arrow?: 'right' | 'left' | 'none';
		decorative?: boolean;
		as?: 'p' | 'span';
		class?: string;
		children: Snippet;
	};

	let {
		arrow = 'right',
		decorative = false,
		as = 'p',
		class: className = '',
		children
	}: Props = $props();
</script>

<svelte:element
	this={as}
	class="annotation {className}"
	class:annotation--flip={arrow === 'left'}
	aria-hidden={decorative ? 'true' : undefined}
>
	{@render children()}
	{#if arrow === 'right'}
		<svg class="annotation__arrow" viewBox="0 0 44 32" aria-hidden="true"
			><path d="M2 6c14-4 30 2 36 18M38 24l-7-2M38 24l1-7" /></svg
		>
	{:else if arrow === 'left'}
		<svg class="annotation__arrow" viewBox="0 0 44 32" aria-hidden="true"
			><path d="M42 6C28 2 12 8 6 24M6 24l7-2M6 24l-1-7" /></svg
		>
	{/if}
</svelte:element>
