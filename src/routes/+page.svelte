<!--
	Accueil, d'après la maquette « Landing page Dev'n Done et renard orange » (19/10/2026) :
	hero (slogan manuscrit, titre « DONE. », mascotte), expertises, process, réalisations, contact.
	Tarifs, avis et présentation détaillée vivent sur leurs pages (/tarifs/, /apropos/).
	Textes : $lib/content.
-->
<script lang="ts">
	import { Button, Seo } from '$lib/components';
	import HandNote from '$lib/components/brand/HandNote.svelte';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import DoneWord from '$lib/components/brand/DoneWord.svelte';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import ExpertiseCards from '$lib/components/sections/ExpertiseCards.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import heroImage from '$lib/assets/mascotte/mascotte-renard-developpeur-wordpress-elementor.png?enhanced&w=1120;720;480&quality=40';
	import { realisationsIntro } from '$lib/content/realisations';
	import { heroSlogan, servicesIntro } from '$lib/content/services';
	import { hero, homePaths, links } from '$lib/content/studio';
	import pathAgences from '$lib/assets/mascotte/mascotte-renard-agence-web-partenariat-poignee-de-main.jpg?enhanced&w=640;320';
	import pathEntreprises from '$lib/assets/mascotte/mascotte-renard-projet-site-web-presentation-client.jpg?enhanced&w=640;320';
	import { site, absoluteUrl } from '$lib/config/site';

	const keywords = hero.keywords.split(' · ');

	// Mascotte de chaque parcours du bloc d'orientation (fond blanc, comme la carte)
	const pathVisuals = {
		agences: {
			src: pathAgences,
			alt: "Dev, la mascotte, serre la main d'une professionnelle devant une maquette de page web"
		},
		entreprises: {
			src: pathEntreprises,
			alt: 'Dev, la mascotte, présente un site web sur son ordinateur portable à une cliente'
		}
	};

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: site.wordmark,
		url: site.url,
		logo: absoluteUrl('/icon-512.png'),
		image: absoluteUrl(site.ogImage),
		description: site.description,
		slogan: site.tagline.join(' / '),
		areaServed: 'FR',
		// Coordonnées : celles des mentions légales (publication validée par Sébastien)
		telephone: '+33 6 20 84 78 01',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '1 rue Blaise Pascal',
			postalCode: '59540',
			addressLocality: 'Caudry',
			addressCountry: 'FR'
		},
		founder: { '@type': 'Person', name: 'Sébastien Maurice' },
		sameAs: [links.malt, links.linkedin]
	};
</script>

<Seo path="/" ogTitle={site.ogTitle} ogDescription={site.ogDescription} {jsonLd} />

<!-- Hero -->
<section class="hero" aria-labelledby="hero-title">
	<div class="container hero__grid">
		<div class="hero__text">
			<HandNote lines={heroSlogan} />
			<h1 class="hero__title" id="hero-title">
				<span class="hero__line">Des projets</span>
				<span class="hero__line">pensés pour</span>
				<span class="hero__line">être <DoneWord sizes="(min-width: 1100px) 340px, 220px" /></span>
			</h1>
			<p class="hero__lede">{hero.lede}</p>
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
				alt="Dev, la mascotte renard de Dev'n Done, assis avec son ordinateur portable entre un écran de code JavaScript et une interface WordPress avec Elementor, entouré des icônes WordPress, Elementor, WooCommerce, Automatisation, Identité et Full Stack"
				sizes="(min-width: 1100px) 640px, 92vw"
				fetchpriority="high"
			/>
		</div>
	</div>
</section>

<!-- Orientation : un parcours pour les agences, un pour les entreprises -->
<section class="section section--tight home-paths" aria-labelledby="paths-title">
	<div class="container">
		<header class="center-head center-head--tight">
			<SectionLabel label={homePaths.eyebrow} align="center" />
			<h2 class="t-h2" id="paths-title">
				<AccentTitle text={homePaths.title} accent={homePaths.accent} />
			</h2>
		</header>
		<ul class="paths" role="list">
			{#each homePaths.paths as p (p.id)}
				<li class="path">
					<enhanced:img
						class="path__visual"
						src={pathVisuals[p.id].src}
						alt={pathVisuals[p.id].alt}
						sizes="(min-width: 1100px) 220px, (min-width: 768px) 240px, 200px"
						loading="lazy"
					/>
					<div class="path__body">
						<h3 class="path__title">{p.title}</h3>
						<p>{p.text}</p>
						<p class="path__links">
							{#each p.links as l (l.href)}
								<a class="link-arrow" href={l.href}>{l.label} <Icon name="arrow-right" /></a>
							{/each}
						</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Expertises -->
<section class="section home-expertise" aria-labelledby="univers-title">
	<div class="container">
		<header class="center-head">
			<SectionLabel label={servicesIntro.eyebrow} align="center" />
			<h2 class="t-h2" id="univers-title">
				<AccentTitle text={servicesIntro.title} accent={servicesIntro.accent} />
			</h2>
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
				<h2 class="t-h2" id="projets-title">{realisationsIntro.titleStart} <DoneWord /></h2>
				<p>{realisationsIntro.lede}</p>
			</div>
			<Button href="/contact/" variant="secondary" icon="arrow-right"
				>Un autre projet en tête ?</Button
			>
		</header>
		<ProjectGrid limit={6} />
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
		margin: var(--space-4) 0 var(--space-2);
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(2.75rem, 2rem + 3.6vw, 5.25rem);
		line-height: 0.98;
		letter-spacing: -0.005em;
		color: var(--text);
		text-wrap: balance;
	}
	/* Trois lignes fixes : « être » et DONE restent ensemble sur la dernière */
	.hero__line {
		display: block;
		white-space: nowrap;
	}
	.hero__lede {
		max-width: 34rem;
		margin: 0;
		font-size: var(--text-body-lg);
		color: var(--text-muted);
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

	/* Entrée du hero (au chargement, CSS seul) : note manuscrite, titre ligne par ligne, mot DONE
	   qui apparaît d'un coup, mots-clés et boutons, puis le visuel qui monte et flotte doucement */
	.hero__text > :global(.hand-note) {
		animation: hero-rise 640ms var(--ease-out) 80ms both;
	}
	.hero__line {
		animation: hero-line 760ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
	}
	.hero__line:nth-child(1) {
		animation-delay: 200ms;
	}
	.hero__line:nth-child(2) {
		animation-delay: 330ms;
	}
	.hero__line:nth-child(3) {
		animation-delay: 460ms;
	}
	.hero__line :global(.done) {
		display: inline-block;
		animation: hero-pop 720ms cubic-bezier(0.34, 1.56, 0.64, 1) 900ms both;
	}
	.hero__lede,
	.hero__keywords {
		animation: hero-rise 640ms var(--ease-out) 760ms both;
	}
	.hero__ctas {
		animation: hero-rise 640ms var(--ease-out) 880ms both;
	}
	.hero__visual {
		animation: hero-visual 1000ms var(--ease-out) 300ms both;
	}
	.hero__visual :global(img) {
		animation: hero-float 6s ease-in-out 1.6s infinite;
	}
	@keyframes hero-rise {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
	}
	@keyframes hero-line {
		from {
			opacity: 0;
			transform: translateY(0.6em);
			filter: blur(6px);
		}
	}
	@keyframes hero-pop {
		0% {
			opacity: 0;
			transform: scale(0.5) rotate(-8deg);
		}
		100% {
			opacity: 1;
			transform: none;
		}
	}
	@keyframes hero-visual {
		from {
			opacity: 0;
			transform: translateY(48px) scale(0.94);
		}
	}
	@keyframes hero-float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-12px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero__text > :global(.hand-note),
		.hero__line,
		.hero__line :global(.done),
		.hero__lede,
		.hero__keywords,
		.hero__ctas,
		.hero__visual,
		.hero__visual :global(img) {
			animation: none;
		}
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

	.center-head--tight {
		margin-bottom: var(--space-7);
	}

	/* ----------------------------------------------------------- Orientation */
	.home-paths {
		border-top: 1px solid var(--line);
	}
	.paths {
		display: grid;
		gap: var(--col-gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	/* Deux cartes côte à côte en grand écran ; une par ligne en dessous, pour garder
	   la mascotte à gauche du texte dès la tablette */
	@media (min-width: 1100px) {
		.paths {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.path {
		display: grid;
		gap: var(--space-4);
		align-items: center;
		padding: clamp(var(--space-5), 3vw, var(--space-6));
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	/* Mascotte à gauche, contenu à droite ; empilés sur téléphone */
	@media (min-width: 600px) {
		.path {
			grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
			gap: var(--space-5);
		}
	}
	.path__visual {
		display: block;
		width: 100%;
		max-width: 15rem;
		height: auto;
		aspect-ratio: 1;
		justify-self: center;
		/* Arrondi léger : adoucit les éléments du décor coupés au bord de l'image */
		border-radius: var(--radius-md);
	}
	.path__body {
		display: grid;
		gap: var(--space-3);
		align-content: center;
	}
	.path__title {
		margin: 0;
		font-size: var(--text-h3);
	}
	.path p {
		margin: 0;
		color: var(--text-muted);
	}
	.path .path__links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-5);
		margin-top: var(--space-2);
	}

	/* ------------------------------------------------------------- Sections */
	.home-expertise {
		padding-top: var(--space-6);
	}
	/* Fond Ivoire : les cartes blanches du process s'en détachent */
	.home-process {
		border-block: 1px solid var(--line);
	}
	.home-projects__all {
		margin: var(--space-6) 0 0;
		text-align: right;
	}
</style>
