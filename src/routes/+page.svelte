<!--
	Accueil — version phase 1 (socle) : page d'attente de marque, publiable telle quelle.
	Elle sera remplacée par l'accueil complet en phase 4.
-->
<script lang="ts">
	import { Eyebrow, Section, Seo, SlashBand, Status, Stroke } from '$lib/components';
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
		<Eyebrow lead="Studio digital" label="Indépendant" />
		<h1 class="t-display" id="hero-title">
			Des projets pensés pour être <Stroke>Done<span class="t-dot">.</span></Stroke>
		</h1>
		<p class="t-body-lg t-muted t-measure">
			On conçoit, développe, automatise et maintient les outils numériques dont votre activité a
			réellement besoin.
		</p>
		<Status state="progress" as="p">Le site complet arrive bientôt</Status>
	</div>
</Section>

<Section flush bleed label="Visuel de marque" class="key-visual">
	<enhanced:img
		src="$lib/assets/brand/key-visual-mascotte-night.png"
		alt="Dev, la mascotte DEV'n DONE, lève le pouce derrière le lettrage Dev'n Done, avec la signature Développer / Piloter / Livrer"
		sizes="(min-width: 1536px) 1536px, 100vw"
	/>
</Section>

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
