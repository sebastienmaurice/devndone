<!--
	À propos : présentation (recentrée sur WordPress et WooCommerce le 21/10/2026) avec la photo de Sébastien (mascotte en
	arrière-plan), la mascotte comme visage de la marque (content/studio.ts, aboutMascot), méthode
	de travail (process), avis clients.
	Parcours (content/studio.ts, aboutPath) : faits validés par Sébastien, expérience professionnelle
	distincte de la formation Full Stack ; avis clients
	réels publiés sur Malt (cités à l'identique). Aucune valeur ni chiffre ajouté.
-->
<script lang="ts">
	import { Button, LinkArrow, Seo } from '$lib/components';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import IconTile from '$lib/components/ui/IconTile.svelte';
	import {
		aboutIntro,
		aboutMascot,
		aboutPath,
		contactIntro,
		links,
		reviewsIntro
	} from '$lib/content/studio';
	import mascot from '$lib/assets/mascotte/mascotte-renard-dev-n-done-developpeur-wordpress-code.jpg?enhanced&w=1200;720;360';
	import portrait from '$lib/assets/photos/sebastien-maurice-fondateur-dev-n-done-assis-avec-mascotte.webp?enhanced&w=1200;720;360';
	import { absoluteUrl, organizationId } from '$lib/config/site';

	// Données structurées Person : uniquement des informations publiées sur le site
	const personLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${absoluteUrl('/apropos/')}#sebastien-maurice`,
		name: 'Sébastien Maurice',
		jobTitle: "Fondateur de Dev'n Done",
		url: absoluteUrl('/apropos/'),
		worksFor: { '@id': organizationId },
		knowsAbout: [...aboutPath.tools, 'Intégration front-end'],
		hasCredential: [
			{
				'@type': 'EducationalOccupationalCredential',
				name: 'Certification TOSA WordPress',
				credentialCategory: 'certification',
				dateCreated: '2023'
			},
			{
				'@type': 'EducationalOccupationalCredential',
				name: "Titre professionnel de niveau 5, formation Full Stack O'clock (développement web et web mobile)",
				credentialCategory: 'titre professionnel'
			}
		],
		sameAs: [links.malt, links.linkedin]
	};
</script>

<Seo
	title="À propos de Dev'n Done et de Sébastien Maurice"
	path="/apropos/"
	description="Dev'n Done, studio indépendant de Sébastien Maurice : développement full stack, WordPress et WooCommerce, automatisation, identité visuelle."
	jsonLd={personLd}
/>

<PageIntro
	label={aboutIntro.eyebrow}
	heading={aboutIntro.title}
	accent={aboutIntro.accent}
	lede={aboutIntro.text}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'À propos' }]}
>
	{#snippet actions()}
		<Button href="/contact/" icon="arrow-right">{contactIntro.cta}</Button>
		<Button href="/realisations/" variant="secondary" icon="arrow-right"
			>Voir les réalisations</Button
		>
	{/snippet}
	{#snippet aside()}
		<div class="portrait">
			<enhanced:img
				src={portrait}
				alt="Sébastien Maurice, fondateur de Dev'n Done, assis en tailleur, avec Dev, la mascotte, qui fait le signe de la victoire derrière lui"
				sizes="(min-width: 1100px) 560px, 92vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
</PageIntro>

<section class="section section--tight" aria-labelledby="parcours-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm path-head">
			<SectionLabel label={aboutPath.eyebrow} />
			<h2 class="t-h2" id="parcours-title">
				<AccentTitle text={aboutPath.title} accent={aboutPath.accent} />
			</h2>
			<p class="path-lead">{aboutPath.text}</p>
		</header>
		<ol class="path" role="list">
			{#each aboutPath.steps as step (step.title)}
				<li class="path__card">
					<IconTile name={step.icon} />
					<h3 class="path__title">{step.title}</h3>
					<p>{step.text}</p>
				</li>
			{/each}
		</ol>
		<div class="path-tools">
			<p class="path-tools__label">{aboutPath.toolsLabel}</p>
			<ul class="path-tools__list" role="list">
				{#each aboutPath.tools as tool (tool)}
					<li class="path-tools__tag">{tool}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<section class="section section--tight" aria-labelledby="mascotte-title">
	<div class="container mascot-story">
		<div class="mascot-story__visual">
			<enhanced:img
				src={mascot}
				alt="Dev, la mascotte, assis en tailleur avec son ordinateur portable, entre une fenêtre de code JavaScript et un site WordPress Elementor"
				sizes="(min-width: 1000px) 560px, 92vw"
				loading="lazy"
			/>
		</div>
		<div class="mascot-story__text">
			<SectionLabel label={aboutMascot.eyebrow} />
			<h2 class="t-h2" id="mascotte-title">
				<AccentTitle text={aboutMascot.title} accent={aboutMascot.accent} />
			</h2>
			{#each aboutMascot.paragraphs as p, i (i)}
				<p class:mascot-story__lead={i === 0}>{p}</p>
			{/each}
			<p><LinkArrow href="/services/">{aboutMascot.cta}</LinkArrow></p>
		</div>
	</div>
</section>

<section class="section section--tight band" aria-labelledby="process-title">
	<div class="container">
		<ProcessRow />
	</div>
</section>

<section class="section section--tight" aria-labelledby="avis-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label={reviewsIntro.eyebrow} />
			<h2 class="t-h2" id="avis-title">
				<AccentTitle text={reviewsIntro.title} accent={reviewsIntro.accent} />
			</h2>
			<p class="note">{reviewsIntro.lede}</p>
		</header>
		<!-- Trois témoignages différents de ceux de l'accueil -->
		<ReviewList only={['palimpseste-urbain', 'eloustick', 'petit-chateau-vercourt']} />
		<p><LinkArrow href={links.malt}>{reviewsIntro.more}</LinkArrow></p>
	</div>
</section>

<ContactBlock />

<style>
	/* Photo sur fond blanc : multiply la fond dans l'Ivoire de la page */
	.portrait {
		max-width: 35rem;
		margin-inline: auto;
		aspect-ratio: 1 / 1;
	}
	.portrait :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	/* La mascotte : illustration à gauche, texte à droite en grand écran */
	.mascot-story {
		display: grid;
		gap: var(--space-7);
		align-items: center;
	}
	@media (min-width: 1000px) {
		.mascot-story {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
	}
	.mascot-story__visual {
		max-width: 36rem;
		aspect-ratio: 1016 / 816;
	}
	.mascot-story__visual :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	.mascot-story__text {
		display: grid;
		gap: var(--space-4);
		justify-items: start;
	}
	.mascot-story__text p {
		margin: 0;
		max-width: 36rem;
		color: var(--text-muted);
	}
	.mascot-story__text .mascot-story__lead {
		font-size: var(--text-body-lg);
		color: var(--text);
	}
	@media (max-width: 1099px) {
		.portrait {
			max-width: 28rem;
		}
	}
	/* Parcours : trois cartes blanches à ombre légère, puis les technologies en pastilles */
	.path-head {
		max-width: 48rem;
	}
	.path-lead {
		margin: 0;
		font-size: var(--text-body-lg);
		color: var(--text);
	}
	.path {
		display: grid;
		gap: var(--space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 768px) {
		.path {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	.path__card {
		display: grid;
		align-content: start;
		gap: var(--space-3);
		padding: var(--space-5);
		border-radius: var(--radius-card);
		background: var(--surface);
		box-shadow: var(--shadow-card);
	}
	.path__title {
		margin: 0;
		font-size: var(--text-h3);
	}
	.path__card p {
		margin: 0;
		color: var(--text-muted);
	}
	.path-tools {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-3);
	}
	.path-tools__label {
		margin: 0;
		font-weight: var(--weight-semibold);
	}
	.path-tools__list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.path-tools__tag {
		padding: 0.15rem var(--space-3);
		border-radius: 999px;
		background: var(--tag-bg);
		color: var(--tag-text);
		font-size: var(--text-caption);
		font-weight: var(--weight-bold);
	}
	.note {
		margin: 0;
		color: var(--text-muted);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
</style>
