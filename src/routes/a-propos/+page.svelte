<script lang="ts">
	import { LinkArrow, Section, SectionHead, Seo } from '$lib/components';
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import { aboutIntro, links, reviewsIntro } from '$lib/content/studio';
</script>

<Seo
	title="À propos"
	path="/a-propos/"
	description="Sébastien Maurice, indépendant à Caudry : un seul interlocuteur, du brief à la mise en ligne, pour les TPE, artisans et PME."
/>

<Section labelledby="apropos-title">
	<SectionHead id="apropos-title" level={1} eyebrow={aboutIntro.eyebrow} title={aboutIntro.title}>
		<p class="t-body-lg t-measure">{aboutIntro.text}</p>
	</SectionHead>
</Section>

<Section surface="ivory" labelledby="avis-title">
	<div class="stack stack--lg">
		<SectionHead
			id="avis-title"
			eyebrow={reviewsIntro.eyebrow}
			title={reviewsIntro.title}
			lede={reviewsIntro.lede}
		/>
		<ReviewList />
		<p><LinkArrow href={links.malt}>{reviewsIntro.more}</LinkArrow></p>
	</div>
</Section>

<ContactCta />
