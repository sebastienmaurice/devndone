<!--
	Accueil : même contenu et même ordre que la page en ligne (index.html, branche main),
	mis en page avec le design system d'après les maquettes (../Graphique/Site web/).
	Textes : $lib/content. Ancres identiques à la page en ligne (#services, #process…).
-->
<script lang="ts">
	import { Button, LinkArrow, Section, SectionHead, Seo, Stroke } from '$lib/components';
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
	import CtaBand from '$lib/components/sections/CtaBand.svelte';
	import MaintenancePlans from '$lib/components/sections/MaintenancePlans.svelte';
	import PackageGrid from '$lib/components/sections/PackageGrid.svelte';
	import ProcessBand from '$lib/components/sections/ProcessBand.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import UniverseGrid from '$lib/components/sections/UniverseGrid.svelte';
	import { realisationsIntro } from '$lib/content/realisations';
	import { servicesIntro } from '$lib/content/services';
	import { aboutIntro, hero, links, reviewsIntro } from '$lib/content/studio';
	import { maintenanceIntro, packagesIntro } from '$lib/content/tarifs';
	import { site, absoluteUrl } from '$lib/config/site';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: site.wordmark,
		url: site.url,
		logo: absoluteUrl('/icon-512.png'),
		image: absoluteUrl(site.ogImage),
		description: site.description,
		slogan: site.tagline.join(' / '),
		areaServed: 'FR'
	};
</script>

<Seo path="/" ogTitle={site.ogTitle} ogDescription={site.ogDescription} {jsonLd} />

<!-- Hero -->
<Section id="top" labelledby="hero-title" class="hero">
	<div class="hero__grid">
		<div class="hero__content">
			<p class="t-body-lg t-muted hero__kicker">{hero.eyebrow}</p>
			<h1 class="t-h1" id="hero-title">
				Des projets pensés pour être <span class="t-accent hero__done"><Stroke>Done.</Stroke></span>
			</h1>
			<p class="t-tech">{hero.keywords}</p>
			<div class="cluster">
				<Button href="#services" icon="arrow-right" size="lg">{hero.ctaServices}</Button>
				<Button href={links.calendly} variant="secondary" icon="arrow-up-right" size="lg"
					>{hero.ctaCall}</Button
				>
			</div>
		</div>
		<div class="hero__visual">
			<enhanced:img
				src="$lib/assets/brand/logo-mascotte.webp"
				alt="Dev, la mascotte de Dev'n Done, pouce levé au-dessus du logo"
				sizes="(min-width: 1024px) 50vw, 100vw"
				fetchpriority="high"
			/>
		</div>
	</div>
</Section>

<!-- Quatre univers -->
<Section id="services" labelledby="univers-title">
	<div class="stack stack--lg">
		<SectionHead
			id="univers-title"
			eyebrow={servicesIntro.eyebrow}
			title={servicesIntro.title}
			lede={servicesIntro.lede}
		>
			{#snippet titleContent()}
				Quatre univers. Un même objectif : votre <span class="t-accent">projet.</span>
			{/snippet}
		</SectionHead>
		<UniverseGrid />
	</div>
</Section>

<!-- Process -->
<Section id="process" labelledby="process-title" tight>
	<ProcessBand />
</Section>

<!-- Réalisations -->
<Section id="realisations" surface="raised" labelledby="projets-title">
	<div class="stack stack--lg">
		<SectionHead
			id="projets-title"
			lead="02"
			eyebrow={realisationsIntro.eyebrow}
			title={realisationsIntro.title}
			lede={realisationsIntro.lede}
		>
			{#snippet titleContent()}
				Des projets qui sont vraiment <span class="t-accent">Done.</span>
			{/snippet}
		</SectionHead>
		<ProjectGrid />
		<CtaBand />
	</div>
</Section>

<!-- Tarifs -->
<Section id="tarifs" labelledby="maintenance-title">
	<div class="stack stack--lg">
		<SectionHead
			id="maintenance-title"
			eyebrow="Tarifs"
			title={maintenanceIntro.title}
			lede={maintenanceIntro.lede}
		/>
		<MaintenancePlans />
		<div class="stack stack--lg forfaits">
			<SectionHead id="forfaits-title" title={packagesIntro.title} lede={packagesIntro.lede} />
			<PackageGrid />
		</div>
	</div>
</Section>

<!-- Avis -->
<Section id="avis" surface="ivory" labelledby="avis-title">
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

<!-- À propos -->
<Section id="apropos" labelledby="apropos-title">
	<SectionHead id="apropos-title" eyebrow={aboutIntro.eyebrow} title={aboutIntro.title}>
		<p class="t-body-lg t-measure">{aboutIntro.text}</p>
	</SectionHead>
</Section>

<!-- Contact -->
<ContactCta id="contact" full />

<style>
	:global(.hero.section) {
		padding-block: clamp(var(--space-7), 8vw, var(--space-10));
	}

	.hero__grid {
		display: grid;
		gap: var(--space-7);
		align-items: center;
	}
	@media (min-width: 1024px) {
		.hero__grid {
			grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		}
	}

	.hero__content {
		display: grid;
		gap: var(--space-6);
		justify-items: start;
	}

	.hero__kicker {
		max-width: 32ch;
	}

	h1 {
		max-width: 13ch;
	}

	/* « Done. » orange et légèrement incliné, comme sur la page en ligne */
	.hero__done {
		display: inline-block;
		transform: rotate(-2deg);
	}

	.hero__visual :global(img) {
		width: 100%;
		height: auto;
	}

	.forfaits {
		margin-top: var(--space-8);
	}
</style>
