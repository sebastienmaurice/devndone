<!--
	Accueil — version phase 1 (socle) : page d'attente de marque, publiable telle quelle.
	Elle sera remplacée par l'accueil complet en phase 4.
-->
<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
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

<section class="section hero" aria-labelledby="hero-title">
	<span class="slash-band" aria-hidden="true"></span>
	<div class="container hero__content">
		<p class="eyebrow">
			<b>Studio digital</b><span class="slash" aria-hidden="true">/</span>Indépendant
		</p>
		<h1 class="t-display" id="hero-title">
			Des projets pensés pour être <span class="stroke"
				>Done<span class="t-dot">.</span><svg
					viewBox="0 0 300 14"
					preserveAspectRatio="none"
					aria-hidden="true"
					><path d="M2 11 C 80 3, 200 1, 298 6 C 200 5, 90 8, 2 13 Z" fill="currentColor" /></svg
				></span
			>
		</h1>
		<p class="t-body-lg t-muted t-measure">
			On conçoit, développe, automatise et maintient les outils numériques dont votre activité a
			réellement besoin.
		</p>
		<p class="status status--progress">Le site complet arrive bientôt</p>
	</div>
</section>

<section class="key-visual" aria-label="Visuel de marque">
	<enhanced:img
		src="$lib/assets/brand/key-visual-mascotte-night.png"
		alt="Dev, la mascotte DEV'n DONE, lève le pouce derrière le lettrage Dev'n Done, avec la signature Développer / Piloter / Livrer"
		sizes="(min-width: 1536px) 1536px, 100vw"
	/>
</section>

<style>
	.hero {
		overflow: clip;
		--band-right: 7%;
		padding-block: clamp(var(--space-8), 12vw, var(--space-11));
	}

	.hero__content {
		position: relative;
		z-index: 1;
		display: grid;
		gap: var(--space-6);
		justify-items: start;
	}

	.hero h1 {
		max-width: 11ch;
	}

	.key-visual {
		display: grid;
		justify-items: center;
		background: var(--dnd-night);
	}

	.key-visual :global(img) {
		width: 100%;
		max-width: 1536px;
		height: auto;
	}
</style>
