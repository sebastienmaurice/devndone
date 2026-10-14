<!--
	Forfaits à prix fermé (content/tarifs.ts), textes et montants du site en ligne.
-->
<script lang="ts">
	import { packages, packagesIntro } from '$lib/content/tarifs';
	import Card from '../ui/Card.svelte';

	let { headingLevel = 3 }: { headingLevel?: 2 | 3 | 4 } = $props();
</script>

<ul class="auto-grid packages" role="list">
	{#each packages as pack (pack.name)}
		<Card as="li">
			<p class="t-tech t-accent">{pack.delay}</p>
			<svelte:element this={`h${headingLevel}`} class="t-h3">{pack.name}</svelte:element>
			<p class="offer__price">
				<span class="offer__amount">{pack.price}</span>
				<span class="offer__unit">HT</span>
			</p>
			<p>{pack.text}</p>
		</Card>
	{/each}
</ul>
<p class="t-body-sm t-muted t-measure">{packagesIntro.note}</p>

<style>
	.packages {
		--auto-min: 17rem;
	}
</style>
