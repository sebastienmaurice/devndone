<script lang="ts">
	import { Badge, Button, Card, PriceRow, Section, SectionHead, Seo } from '$lib/components';
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import { links } from '$lib/content/studio';
	import { maintenanceIntro, maintenancePlans, packages, packagesIntro } from '$lib/content/tarifs';
</script>

<Seo
	title="Tarifs"
	path="/tarifs/"
	description="Maintenance WordPress en abonnement et forfaits à prix fermé : audit, lancement de site, landing page, refonte, boutique WooCommerce, audit automatisation."
/>

<Section labelledby="maintenance-title">
	<div class="stack stack--lg">
		<SectionHead
			id="maintenance-title"
			level={1}
			eyebrow="Tarifs"
			title={maintenanceIntro.title}
			lede={maintenanceIntro.lede}
		/>

		<ul class="auto-grid plans" role="list">
			{#each maintenancePlans as plan (plan.name)}
				<Card as="li" featured={plan.recommended}>
					<div class="offer__head">
						<h2 class="t-h3">{plan.name}</h2>
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
	</div>
</Section>

<Section surface="ivory" labelledby="forfaits-title">
	<div class="stack stack--lg">
		<SectionHead id="forfaits-title" title={packagesIntro.title} lede={packagesIntro.lede} />

		<ul class="auto-grid packages" role="list">
			{#each packages as pack (pack.name)}
				<Card as="li">
					<p class="t-tech">{pack.delay}</p>
					<h3 class="t-h3">{pack.name}</h3>
					<p class="offer__price">
						<span class="offer__amount">{pack.price}</span>
						<span class="offer__unit">HT</span>
					</p>
					<p>{pack.text}</p>
				</Card>
			{/each}
		</ul>

		<p class="t-body-sm t-muted t-measure">{packagesIntro.note}</p>
	</div>
</Section>

<ContactCta />

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
	.packages {
		--auto-min: 17rem;
	}
</style>
