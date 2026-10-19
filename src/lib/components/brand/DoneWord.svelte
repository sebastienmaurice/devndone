<!--
	Mot « DONE. » de la marque (maquette du 19/10/2026) : orange, check intégré dans le O comme dans
	le logo, léger relief et soulignement dessiné à la main. Taille héritée du titre parent.
	Lu « Done. » par les lecteurs d'écran ; les glyphes décoratifs sont masqués.

	<h1>Des projets pensés pour être <DoneWord /></h1>
-->
<script lang="ts">
	type Props = { underline?: boolean };

	let { underline = true }: Props = $props();
</script>

<span class="done"
	><span class="sr-only">Done.</span><span class="done__glyphs" aria-hidden="true"
		>D<span class="done__o"
			>O<svg class="done__check" viewBox="0 0 40 40"><path d="M9 21.5l8 8L32 12" /></svg></span
		>NE<span class="done__dot">.</span></span
	>{#if underline}<svg
			class="done__underline"
			viewBox="0 0 300 18"
			preserveAspectRatio="none"
			aria-hidden="true"><path d="M3 13 C 70 4, 170 2, 297 7 C 190 6, 90 10, 3 16 Z" /></svg
		>{/if}</span
>

<style>
	.done {
		position: relative;
		display: inline-block;
		white-space: nowrap;
		padding-bottom: 0.12em;
	}
	.done__glyphs {
		display: inline-block;
		color: var(--accent-deco);
		/* Relief : ombre portée pleine dans l'orange encre du contexte */
		text-shadow: 0.03em 0.045em 0 var(--accent-text);
		letter-spacing: -0.01em;
		transform: rotate(-2deg);
	}
	.done__o {
		position: relative;
		display: inline-block;
	}
	.done__check {
		position: absolute;
		left: 50%;
		top: 52%;
		width: 0.42em;
		height: 0.42em;
		transform: translate(-50%, -50%);
		fill: none;
		stroke: var(--text);
		stroke-width: 7;
		stroke-linecap: round;
		stroke-linejoin: round;
		overflow: visible;
	}
	.done__underline {
		position: absolute;
		left: 2%;
		right: 0;
		bottom: -0.04em;
		width: 98%;
		height: 0.16em;
		fill: var(--accent-deco);
	}
</style>
