<!--
	Slogan manuscrit (Caveat, charte v1.2) : incliné, souligné à la main en orange, avec deux traits
	d'énergie en bout de ligne comme sur la maquette. Une note par écran, jamais une information
	essentielle.
	Lignes fixées par le contenu (`lines`) : le soulignement suit la dernière ligne et les traits
	d'énergie sont collés à son dernier mot, quelle que soit la largeur de l'écran.
-->
<script lang="ts">
	let { lines }: { lines: readonly string[] } = $props();

	const head = $derived(lines.slice(0, -1));
	const last = $derived(lines.at(-1) ?? '');
</script>

<p class="hand-note">
	{#each head as line (line)}<span class="hand-note__row">{line + ' '}</span>{/each}<span
		class="hand-note__row"
		><span class="hand-note__last"
			>{last}<svg
				class="hand-note__line"
				viewBox="0 0 300 12"
				preserveAspectRatio="none"
				aria-hidden="true"><path d="M2 8 C 80 3, 190 2, 298 6" /></svg
			><svg class="hand-note__spark" viewBox="0 0 24 24" aria-hidden="true"
				><path d="M4 9 L14 4 M6 15 L18 13" /></svg
			></span
		></span
	>
</p>

<style>
	.hand-note {
		margin: 0;
		font-family: var(--font-hand);
		font-weight: var(--weight-medium);
		font-size: clamp(1.375rem, 1.208rem + 0.741vw, 1.875rem);
		line-height: 1.15;
		color: var(--text);
		transform: rotate(-4deg);
		transform-origin: left bottom;
	}
	.hand-note__row {
		display: block;
		white-space: nowrap;
	}
	/* Deuxième ligne rapprochée de la première : le soulignement occupe le bas de la ligne */
	.hand-note__row + .hand-note__row {
		margin-top: -0.05em;
	}
	/* Dernière ligne : soulignement sur toute sa largeur (un peu au-delà, comme un trait à main levée) */
	.hand-note__last {
		position: relative;
		display: inline-block;
		padding-bottom: 0.35em;
	}
	.hand-note__line {
		position: absolute;
		left: 0.1em;
		bottom: 0;
		width: calc(100% + 0.3em);
		height: 0.32em;
		fill: none;
		stroke: var(--accent-deco);
		stroke-width: 3;
		stroke-linecap: round;
	}
	/* Traits d'énergie collés au dernier mot, en haut à droite. Hors du flux du texte : ils ne
	   changent pas la hauteur de la ligne (sinon l'écart entre les deux lignes grandit) */
	.hand-note__spark {
		position: absolute;
		left: calc(100% + 0.15em);
		top: -0.1em;
		width: 0.9em;
		height: 0.9em;
		fill: none;
		stroke: var(--accent-deco);
		stroke-width: 2.4;
		stroke-linecap: round;
	}
</style>
