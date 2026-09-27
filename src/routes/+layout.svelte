<script lang="ts">
	import '$lib/styles/index.css';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	let { children } = $props();
</script>

<a class="skip-link" href="#contenu">Aller au contenu</a>

<SiteHeader />

<main id="contenu" tabindex="-1">
	{@render children()}
</main>

<SiteFooter />

<style>
	main:focus {
		outline: none;
	}
</style>
