<!--
	Carte : uniquement pour REGROUPER (une offre, un projet, un lien vers une page).
	Pour une liste d'arguments, utiliser FeatureList. Avec `href`, toute la carte est
	un seul lien : ne rien y imbriquer de cliquable.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href?: string;
		as?: 'article' | 'div' | 'li';
		featured?: boolean;
		class?: string;
		children: Snippet;
	};

	let { href, as = 'article', featured = false, class: className = '', children }: Props = $props();
</script>

{#if href}
	<a class="card card--link {className}" {href}>{@render children()}</a>
{:else}
	<svelte:element this={as} class="card {className}" class:offer--featured={featured}>
		{@render children()}
	</svelte:element>
{/if}
