<script lang="ts">
	import { Section, SectionHead, Seo } from '$lib/components';
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import ProcessBand from '$lib/components/sections/ProcessBand.svelte';
	import UniverseGrid from '$lib/components/sections/UniverseGrid.svelte';
	import { servicesIntro } from '$lib/content/services';
</script>

<Seo
	title="Services"
	path="/services/"
	description="Web, design, automatisation et développement full stack : quatre univers, une seule vision, du premier brief jusqu'à la mise en ligne."
/>

<Section labelledby="services-title">
	<div class="stack stack--lg">
		<SectionHead
			id="services-title"
			level={1}
			eyebrow={servicesIntro.eyebrow}
			title={servicesIntro.title}
			lede={servicesIntro.lede}
		/>
		<UniverseGrid headingLevel={2} />
	</div>
</Section>

<Section labelledby="process-title" tight>
	<ProcessBand />
</Section>

<ContactCta />
