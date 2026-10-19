<!--
	Slogan manuscrit (Caveat, charte v1.2) : incliné, souligné à la main en orange, avec deux traits
	d'énergie en bout de ligne comme sur la maquette. Une note par écran, jamais une information
	essentielle.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<p class="hand-note">
	<span class="hand-note__text"
		>{@render children()}<svg class="hand-note__spark" viewBox="0 0 24 24" aria-hidden="true"
			><path d="M4 9 L14 4 M6 15 L18 13" /></svg
		></span
	>
	<svg class="hand-note__line" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true"
		><path d="M2 8 C 80 3, 190 2, 298 6" /></svg
	>
</p>

<style>
	.hand-note {
		position: relative;
		display: inline-block;
		max-width: 24ch;
		margin: 0;
		padding-bottom: 0.4em;
		font-family: var(--font-hand);
		font-weight: var(--weight-medium);
		font-size: clamp(1.375rem, 1.208rem + 0.741vw, 1.875rem);
		line-height: 1.15;
		color: var(--text);
		transform: rotate(-4deg);
		transform-origin: left bottom;
	}
	/* Collés au dernier mot (et non au bord de la boîte) */
	.hand-note__spark {
		display: inline-block;
		margin-left: 0.2em;
		vertical-align: 0.35em;
		width: 0.9em;
		height: 0.9em;
		fill: none;
		stroke: var(--accent-deco);
		stroke-width: 2.4;
		stroke-linecap: round;
	}
	.hand-note__line {
		position: absolute;
		left: 0.2em;
		bottom: 0;
		width: 80%;
		height: 0.32em;
		fill: none;
		stroke: var(--accent-deco);
		stroke-width: 3;
		stroke-linecap: round;
	}
</style>
