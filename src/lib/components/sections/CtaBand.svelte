<!--
	Bandeau « Un autre projet en tête ? On le rend Done. » sous les réalisations
	(texte et bouton du site en ligne, mise en page d'après la maquette « réalisations »).
-->
<script lang="ts">
	import { ctaBand, links } from '$lib/content/studio';
	import Button from '../ui/Button.svelte';
</script>

<div class="card cta-band">
	<img src="/favicon.svg" alt="" width="56" height="56" />
	<p class="t-h2">{ctaBand.text} Done<span class="t-dot">.</span></p>
	<Button href={links.calendly} icon="arrow-up-right">{ctaBand.cta}</Button>
</div>

<style>
	.cta-band {
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
