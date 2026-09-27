<!--
	Liste éditoriale sans cartes : numéro mono, titre Lilita, texte, filet.
	Remplace la grille de cartes pour présenter des arguments ou des services.
-->
<script lang="ts" module>
	export type FeatureItem = { title: string; text: string; href?: string };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		items: readonly FeatureItem[];
		headingLevel?: 2 | 3 | 4;
		/** Rendu personnalisé du texte (liens, badges…) */
		extra?: Snippet<[FeatureItem, number]>;
	};

	let { items, headingLevel = 3, extra }: Props = $props();

	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<ol class="feature-list">
	{#each items as item, i (item.title)}
		<li class="feature">
			<span class="feature__num" aria-hidden="true">{pad(i)} /</span>
			<div class="feature__body">
				<svelte:element this={`h${headingLevel}`} class="t-h3">
					{#if item.href}<a href={item.href}>{item.title}</a>{:else}{item.title}{/if}
				</svelte:element>
				<div class="stack stack--sm">
					<p>{item.text}</p>
					{@render extra?.(item, i)}
				</div>
			</div>
		</li>
	{/each}
</ol>

<style>
	a {
		text-decoration: none;
	}
	a:hover {
		color: var(--accent-text);
	}
</style>
