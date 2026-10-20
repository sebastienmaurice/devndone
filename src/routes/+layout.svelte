<script lang="ts">
	import '$lib/styles/index.css';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { revealPage } from '$lib/actions/reveal';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';

	let { children } = $props();
	let main: HTMLElement;
	let stopReveal: (() => void) | undefined;

	const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Transition entre les pages (View Transitions API) : l'ancienne page s'efface vers le haut, la
	// nouvelle se dévoile en balayage de bas en haut ; l'en-tête reste en place. Sans prise en charge
	// par le navigateur, ou si l'utilisateur réduit les animations, la navigation reste instantanée.
	onNavigate((navigation) => {
		if (!document.startViewTransition || reducedMotion()) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

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
	/* L'en-tête ne participe pas au balayage */
	:global(.site-header) {
		view-transition-name: site-header;
	}
	:global(::view-transition-old(root)) {
		animation: page-out 280ms var(--ease-inout) both;
	}
	:global(::view-transition-new(root)) {
		animation: page-in 640ms var(--ease-out) both;
	}
	@keyframes -global-page-out {
		to {
			opacity: 0;
			transform: translateY(-24px);
		}
	}
	@keyframes -global-page-in {
		from {
			clip-path: inset(100% 0 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}
</style>
