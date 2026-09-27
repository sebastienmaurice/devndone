<!--
	Suite de mots séparés par le slash de marque : DÉVELOPPER / PILOTER / LIVRER.
	Par défaut, la signature officielle du site.
-->
<script lang="ts">
	import { site } from '$lib/config/site';

	type Props = { words?: readonly string[]; class?: string };

	let { words = site.tagline, class: className = '' }: Props = $props();
</script>

<p class="tagline {className}">
	{#each words as word, i (word)}{#if i > 0}<span class="slash" aria-hidden="true">/</span
			>{/if}{word}{/each}
</p>
