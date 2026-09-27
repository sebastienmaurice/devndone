<!--
	En-tête de section : surtitre + titre Lilita + chapô.
	<SectionHead id="services-title" lead="01" eyebrow="Expertises" title="Quatre univers." lede="…" />
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Eyebrow from '../brand/Eyebrow.svelte';

	type Props = {
		/** id du titre, à reprendre dans <Section labelledby> */
		id?: string;
		lead?: string;
		eyebrow?: string;
		title: string;
		/** Niveau sémantique du titre */
		level?: 1 | 2 | 3;
		/** Taille visuelle, indépendante du niveau */
		size?: 'display' | 'h1' | 'h2';
		lede?: string;
		/** Contenu riche à la place de `title` (ex. avec <Stroke>) */
		titleContent?: Snippet;
		children?: Snippet;
	};

	let {
		id,
		lead,
		eyebrow,
		title,
		level = 2,
		size = 'h1',
		lede,
		titleContent,
		children
	}: Props = $props();
</script>

<header class="section-head">
	{#if eyebrow}<Eyebrow {lead} label={eyebrow} rule />{/if}
	<svelte:element this={`h${level}`} {id} class="t-{size}">
		{#if titleContent}{@render titleContent()}{:else}{title}{/if}
	</svelte:element>
	{#if lede}<p>{lede}</p>{/if}
	{@render children?.()}
</header>
