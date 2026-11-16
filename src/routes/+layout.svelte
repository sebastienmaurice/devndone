<script lang="ts">
	import '$lib/styles/index.css';
	import { afterNavigate } from '$app/navigation';
	import { revealPage } from '$lib/actions/reveal';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';

	let { children } = $props();
	let main: HTMLElement;
	let stopReveal: (() => void) | undefined;

	// Pas de balayage entre les pages (retiré le 16/11/2026) : la seule transition est l'entrée de
	// l'en-tête de page (PageIntro, hero de l'accueil), pour éviter deux mouvements à la suite.

	// Apparition au défilement des blocs de chaque nouvelle page
	afterNavigate(() => {
		stopReveal?.();
		stopReveal = revealPage(main);
	});
</script>

<a class="skip-link" href="#contenu">Aller au contenu</a>

<SiteHeader />

<main id="contenu" tabindex="-1" bind:this={main}>
	{@render children()}
</main>

<SiteFooter />

<style>
	main:focus {
		outline: none;
	}
</style>
