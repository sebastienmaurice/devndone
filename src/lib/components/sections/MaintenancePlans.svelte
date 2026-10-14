<!--
	Grille de maintenance WordPress (content/tarifs.ts). GRILLE DE TEST : textes et montants
	du site en ligne, à ne pas modifier sans validation.
-->
<script lang="ts">
	import { links } from '$lib/content/studio';
	import { maintenanceIntro, maintenancePlans } from '$lib/content/tarifs';
	import Badge from '../ui/Badge.svelte';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';
	import PriceRow from '../ui/PriceRow.svelte';

	let { headingLevel = 3 }: { headingLevel?: 2 | 3 | 4 } = $props();
</script>

<ul class="auto-grid plans" role="list">
	{#each maintenancePlans as plan (plan.name)}
		<Card as="li" featured={plan.recommended}>
			<div class="offer__head">
				<svelte:element this={`h${headingLevel}`} class="t-h3">{plan.name}</svelte:element>
				{#if plan.recommended}<Badge tone="accent">Recommandé</Badge>{/if}
			</div>
			<p class="t-body-sm t-muted">{plan.target}</p>
			<p class="offer__price">
				<span class="offer__amount">{plan.price}</span>
				<span class="offer__unit">HT / mois</span>
			</p>
			<div>
				{#each plan.rows as row (row.label)}
					<PriceRow label={row.label} value={row.value} />
				{/each}
			</div>
			<Button
				href={links.calendly}
				variant={plan.recommended ? 'primary' : 'secondary'}
				icon="arrow-up-right"
				block>En parler</Button
			>
		</Card>
	{/each}
</ul>
<p class="t-body-sm t-muted t-measure">{maintenanceIntro.note}</p>

<style>
	.plans {
		--auto-min: 17rem;
		align-items: start;
	}
	/* Valeurs longues (« Quotidienne, externalisée ») : retour à la ligne dans les cartes étroites */
	.plans :global(.price-row__value) {
		white-space: normal;
		text-align: right;
	}
</style>
