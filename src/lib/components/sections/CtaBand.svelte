<!--
	Bandeau « Un autre projet en tête ? On le rend Done. » (texte et bouton du site en ligne).
	Section Orange pleine largeur : le seul bandeau orange de la page (charte v1.2, 11.A).
	Titre bicolore : « Done. » surligné en Night (charte v1.2, mot accent).
-->
<script lang="ts">
	import { ctaBand, links } from '$lib/content/studio';
	import Section from '../layout/Section.svelte';
	import Button from '../ui/Button.svelte';
</script>

<Section surface="orange" tight label="Prise de rendez-vous">
	<div class="cta-band">
		<img src="/favicon.svg" alt="" width="64" height="64" />
		<p class="t-h2">{ctaBand.text} <span class="accent-word">Done.</span></p>
		<Button href={links.calendly} icon="arrow-up-right" size="lg">{ctaBand.cta}</Button>
	</div>
</Section>

<style>
	.cta-band {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: var(--space-5);
	}
	.cta-band :global(.btn) {
		grid-column: 1 / -1;
		justify-self: start;
	}
	@media (min-width: 900px) {
		.cta-band {
			grid-template-columns: auto 1fr auto;
		}
		.cta-band :global(.btn) {
			grid-column: auto;
		}
	}
	img {
		border-radius: var(--radius-md);
	}
</style>
