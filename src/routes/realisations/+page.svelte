<script lang="ts">
	import { Section, SectionHead, Seo } from '$lib/components';
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import CtaBand from '$lib/components/sections/CtaBand.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import { realisationsIntro } from '$lib/content/realisations';
</script>

<Seo
	title="Réalisations"
	path="/realisations/"
	description="Sites WordPress, boutiques WooCommerce et application full stack : des projets concrets pour de vrais besoins, tels qu'ils existent aujourd'hui."
/>

<Section labelledby="realisations-title">
	<div class="stack stack--lg">
		<SectionHead
			id="realisations-title"
			level={1}
			size="display"
			eyebrow={realisationsIntro.eyebrow}
			title={realisationsIntro.title}
			lede={realisationsIntro.lede}
		>
			{#snippet titleContent()}
				Des projets qui sont vraiment <span class="accent-word">Done.</span>
			{/snippet}
		</SectionHead>
		<ProjectGrid headingLevel={2} />
	</div>
</Section>

<CtaBand />

<ContactCta />
