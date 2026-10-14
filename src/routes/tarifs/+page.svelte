<script lang="ts">
	import { Section, SectionHead, Seo } from '$lib/components';
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import MaintenancePlans from '$lib/components/sections/MaintenancePlans.svelte';
	import PackageGrid from '$lib/components/sections/PackageGrid.svelte';
	import { maintenanceIntro, packagesIntro } from '$lib/content/tarifs';
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
		<MaintenancePlans headingLevel={2} />
	</div>
</Section>

<Section surface="raised" labelledby="forfaits-title">
	<div class="stack stack--lg">
		<SectionHead id="forfaits-title" title={packagesIntro.title} lede={packagesIntro.lede} />
		<PackageGrid />
	</div>
</Section>

<ContactCta />
