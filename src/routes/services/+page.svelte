<script lang="ts">
	import { Section, SectionHead, Seo, Steps } from '$lib/components';
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import UniverseCards from '$lib/components/sections/UniverseCards.svelte';
	import { processIntro, processSteps, servicesIntro } from '$lib/content/services';
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
		<UniverseCards headingLevel={2} />
	</div>
</Section>

<Section surface="raised" labelledby="process-title">
	<SectionHead id="process-title" eyebrow={processIntro.eyebrow} title={processIntro.title} />
	<Steps items={processSteps} />
</Section>

<ContactCta />
