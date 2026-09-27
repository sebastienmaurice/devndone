<script lang="ts">
	import { page } from '$app/state';
	import NotFound from '$lib/components/pages/NotFound.svelte';
	import Seo from '$lib/components/seo/Seo.svelte';
</script>

{#if page.status === 404}
	<NotFound />
{:else}
	<Seo title="Erreur" path={page.url.pathname} noindex />
	<section class="section">
		<div class="container stack">
			<p class="eyebrow"><b>Erreur {page.status}</b></p>
			<h1 class="t-h1">Quelque chose s'est mal passé.</h1>
			<p class="t-muted t-measure">Réessayez dans un instant, ou revenez à l'accueil.</p>
			<a class="btn btn--secondary" href="/">Retour à l'accueil</a>
		</div>
	</section>
{/if}
