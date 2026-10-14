<!--
	Accueil : accroche de la page provisoire, puis un aperçu de chaque page
	(univers, réalisations, avis) et l'appel au contact. Textes : $lib/content.
-->
<script lang="ts">
	import { Button, LinkArrow, Section, SectionHead, Seo, SlashBand, Stroke } from '$lib/components';
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import UniverseGrid from '$lib/components/sections/UniverseGrid.svelte';
	import { realisationsIntro } from '$lib/content/realisations';
	import { servicesIntro } from '$lib/content/services';
	import { hero, links, reviewsIntro } from '$lib/content/studio';
	import { site, absoluteUrl } from '$lib/config/site';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: site.name,
		url: site.url,
		logo: absoluteUrl('/icon-512.png'),
		image: absoluteUrl(site.ogImage),
		description: site.description,
		slogan: site.tagline.join(' / '),
		areaServed: 'FR',
		knowsAbout: [
			'Développement web',
			'WordPress',
			'WooCommerce',
			'SvelteKit',
			'Automatisation',
			'Identité visuelle'
		]
	};
</script>

<Seo path="/" {jsonLd} />

<Section labelledby="hero-title" class="hero">
	<SlashBand right="7%" />
	<div class="hero__content">
		<p class="t-body-lg t-muted t-measure">{hero.eyebrow}</p>
		<h1 class="t-display" id="hero-title">
			Des projets pensés pour être <Stroke>Done<span class="t-dot">.</span></Stroke>
		</h1>
		<p class="t-tech">{hero.keywords}</p>
		<div class="cluster">
			<Button href="/services/" icon="arrow-right" size="lg">{hero.ctaServices}</Button>
			<Button href={links.calendly} variant="secondary" icon="arrow-up-right" size="lg"
				>{hero.ctaCall}</Button
			>
		</div>
	</div>
</Section>

<Section flush bleed label="Visuel de marque" class="key-visual">
	<enhanced:img
		src="$lib/assets/brand/key-visual-mascotte-night.png"
		alt="Dev, la mascotte DEV'n DONE, lève le pouce derrière le lettrage Dev'n Done, avec la signature Développer / Piloter / Livrer"
		sizes="(min-width: 1536px) 1536px, 100vw"
	/>
</Section>

<Section surface="raised" labelledby="univers-title">
	<div class="stack stack--lg">
		<SectionHead
			id="univers-title"
			eyebrow={servicesIntro.eyebrow}
			title={servicesIntro.title}
			lede={servicesIntro.lede}
		/>
		<UniverseGrid />
		<p><LinkArrow href="/services/">Découvrir mes services</LinkArrow></p>
	</div>
</Section>

<Section labelledby="projets-title">
	<div class="stack stack--lg">
		<SectionHead
			id="projets-title"
			eyebrow={realisationsIntro.eyebrow}
			title={realisationsIntro.title}
			lede={realisationsIntro.lede}
		/>
		<ProjectGrid limit={3} />
		<p><LinkArrow href="/realisations/">Réalisations</LinkArrow></p>
	</div>
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

<style>
	:global(.hero.section) {
		padding-block: clamp(var(--space-8), 12vw, var(--space-11));
	}

	.hero__content {
		position: relative;
		z-index: 1;
		display: grid;
		gap: var(--space-6);
		justify-items: start;
	}

	h1 {
		max-width: 11ch;
	}

	:global(.key-visual) {
		display: grid;
		justify-items: center;
	}

	:global(.key-visual img) {
		width: 100%;
		max-width: 1536px;
		height: auto;
	}
</style>
