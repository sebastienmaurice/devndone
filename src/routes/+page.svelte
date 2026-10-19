<!--
	Accueil, d'après la maquette « Landing page Dev'n Done et renard orange » (19/10/2026) :
	hero (slogan manuscrit, titre « DONE. », mascotte), expertises, process, réalisations, contact.
	Tarifs, avis et présentation détaillée vivent sur leurs pages (/tarifs/, /apropos/).
	Textes : $lib/content.
-->
<script lang="ts">
	import { Button, Seo } from '$lib/components';
	import DoneWord from '$lib/components/brand/DoneWord.svelte';
	import HandNote from '$lib/components/brand/HandNote.svelte';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import ExpertiseCards from '$lib/components/sections/ExpertiseCards.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import heroImage from '$lib/assets/mascotte/hero-renard-developpeur.png?enhanced&w=1120;720;480';
	import { realisationsIntro } from '$lib/content/realisations';
	import { heroSlogan, servicesIntro } from '$lib/content/services';
	import { hero, links } from '$lib/content/studio';
	import { site, absoluteUrl } from '$lib/config/site';

	const keywords = hero.keywords.split(' · ');

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
<section class="hero" aria-labelledby="hero-title">
	<div class="container hero__grid">
		<div class="hero__text">
			<HandNote>{heroSlogan}</HandNote>
			<h1 class="hero__title" id="hero-title">
				Des projets pensés pour être <DoneWord />
			</h1>
			<p class="hero__keywords">
				{#each keywords as word, i (word)}{#if i > 0}<span class="hero__slash" aria-hidden="true"
							>/</span
						>{/if}<span>{word}</span>{/each}
			</p>
			<div class="hero__ctas">
				<Button href="/services/" icon="arrow-right" size="lg">{hero.ctaServices}</Button>
				<Button href={links.calendly} variant="secondary" size="lg"
					><Icon name="calendar" />{hero.ctaCall}</Button
				>
			</div>
		</div>
		<div class="hero__visual">
			<enhanced:img
				src={heroImage}
				alt="Dev, la mascotte renard de Dev'n Done, en sweat à capuche, assis avec son ordinateur portable, entre un écran de code JavaScript et une interface de site WordPress avec Elementor"
				sizes="(min-width: 1100px) 640px, 92vw"
				fetchpriority="high"
			/>
		</div>
	</div>
</section>

<!-- Expertises -->
<section class="section home-expertise" aria-labelledby="univers-title">
	<div class="container">
		<header class="center-head">
			<SectionLabel label={servicesIntro.eyebrow} align="center" />
			<h2 class="t-h2" id="univers-title">{servicesIntro.title}</h2>
			<p>{servicesIntro.lede}</p>
		</header>
		<ExpertiseCards />
	</div>
</section>

<!-- Process -->
<section class="section section--tight home-process" aria-labelledby="process-title">
	<div class="container">
		<ProcessRow />
	</div>
</section>

<!-- Réalisations -->
<section class="section home-projects" aria-labelledby="projets-title">
	<div class="container">
		<header class="split-head">
			<div class="split-head__text">
				<SectionLabel label={realisationsIntro.eyebrow} />
				<h2 class="t-h2" id="projets-title">{realisationsIntro.title}</h2>
				<p>{realisationsIntro.lede}</p>
			</div>
			<Button href="/contact/" variant="secondary" icon="arrow-right"
				>Un autre projet en tête ?</Button
			>
		</header>
		<ProjectGrid limit={6} compact />
		<p class="home-projects__all">
			<a class="link-arrow" href="/realisations/"
				>Toutes les réalisations <Icon name="arrow-right" /></a
			>
		</p>
	</div>
</section>

<!-- Contact -->
<ContactBlock id="contact" />

<style>
	/* ---------------------------------------------------------------- Hero */
	.hero {
		padding-block: clamp(var(--space-6), 4vw, var(--space-8))
			clamp(var(--space-7), 5vw, var(--space-9));
		overflow: clip;
	}
	.hero__grid {
		display: grid;
		gap: var(--space-6);
		align-items: center;
	}
	@media (min-width: 1100px) {
		.hero__grid {
			grid-template-columns: minmax(0, 46fr) minmax(0, 54fr);
			gap: var(--space-5);
		}
	}
	.hero__text {
		display: grid;
		gap: var(--space-5);
		justify-items: start;
	}
	.hero__title {
		margin: var(--space-4) 0 var(--space-5);
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(2.75rem, 2rem + 3.6vw, 5.25rem);
		line-height: 0.98;
		letter-spacing: -0.005em;
		color: var(--text);
		text-wrap: balance;
	}
	.hero__keywords {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-1) 0;
		margin: 0;
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
	}
	.hero__slash {
		padding-inline: var(--space-3);
		color: var(--accent-deco);
		font-weight: var(--weight-bold);
	}
	.hero__ctas {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-top: var(--space-2);
	}
	.hero__ctas :global(.btn .icon:first-child) {
		width: 20px;
		height: 20px;
	}
	.hero__visual {
		position: relative;
		justify-self: center;
		width: min(100%, 680px);
	}
	@media (min-width: 1100px) {
		.hero__visual {
			margin-right: calc(-1 * var(--space-6));
		}
	}
	/* Image entière, sans fondu ni contour */
	.hero__visual :global(img) {
		display: block;
		width: 100%;
		height: auto;
	}

	/* ------------------------------------------------------- En-têtes de section */
	.center-head {
		display: grid;
		justify-items: center;
		gap: var(--space-3);
		max-width: 64rem;
		margin: 0 auto clamp(var(--space-7), 5vw, var(--space-8));
		text-align: center;
	}
	.center-head p {
		max-width: 40rem;
		margin: 0;
		color: var(--text-muted);
	}
	.split-head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-5);
		margin-bottom: var(--space-7);
	}
	.split-head__text {
		display: grid;
		gap: var(--space-3);
		justify-items: start;
	}
	.split-head__text p {
		margin: 0;
		color: var(--text-muted);
	}

	/* ------------------------------------------------------------- Sections */
	.home-expertise {
		padding-top: var(--space-6);
	}
	.home-process {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
	.home-projects__all {
		margin: var(--space-6) 0 0;
		text-align: right;
	}
</style>
