<!--
	Tarifs (tous HT), textes et montants du site en ligne. La grille de maintenance est une grille
	de test (voir content/tarifs.ts) : elle n'est pas présentée comme définitive.
-->
<script lang="ts">
	import { Seo } from '$lib/components';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import MaintenancePlans from '$lib/components/sections/MaintenancePlans.svelte';
	import PackageGrid from '$lib/components/sections/PackageGrid.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import { maintenanceIntro, packagesIntro } from '$lib/content/tarifs';
</script>

<Seo
	title="Tarifs : sites WordPress en abonnement mensuel, audits et maintenance"
	path="/tarifs/"
	description="Sites WordPress en abonnement mensuel, création, hébergement et maintenance inclus : landing page, vitrine, refonte PME, boutique WooCommerce. Audits en paiement unique."
/>

<PageIntro
	label="Tarifs"
	heading={packagesIntro.title}
	accent={packagesIntro.accent}
	lede={packagesIntro.lede}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Tarifs' }]}
/>

<section class="section section--tight" aria-label="Forfaits">
	<div class="container stack stack--lg">
		<PackageGrid headingLevel={2} />
		<p class="note">{packagesIntro.note}</p>
	</div>
</section>

<section class="section section--tight band" aria-labelledby="maintenance-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Maintenance" />
			<h2 class="t-h2" id="maintenance-title">
				<AccentTitle text={maintenanceIntro.title} accent={maintenanceIntro.accent} />
			</h2>
			<p class="note">{maintenanceIntro.lede}</p>
		</header>
		<MaintenancePlans />
	</div>
</section>

<ContactBlock />

<style>
	.note {
		margin: 0;
		max-width: 44rem;
		color: var(--text-muted);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
</style>
