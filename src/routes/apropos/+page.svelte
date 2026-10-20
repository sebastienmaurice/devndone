<!--
	À propos : présentation (texte du site en ligne) avec la photo de Sébastien (mascotte en
	arrière-plan), la mascotte comme visage de la marque (content/studio.ts, aboutMascot), méthode
	de travail (process), avis clients
	réels publiés sur Malt (cités à l'identique). Aucune valeur ni chiffre ajouté.
-->
<script lang="ts">
	import { LinkArrow, Seo } from '$lib/components';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import { aboutIntro, aboutMascot, links, reviewsIntro } from '$lib/content/studio';
	import mascot from '$lib/assets/mascotte/mascotte-renard-dev-n-done-developpeur-wordpress-code.jpg?enhanced&w=1200;720;360';
	import portrait from '$lib/assets/photos/sebastien-maurice-fondateur-dev-n-done-avec-mascotte.jpg?enhanced&w=1200;720;360';
</script>

<Seo
	title="À propos : Sébastien Maurice, développeur WordPress à Caudry"
	path="/apropos/"
	description="Sébastien Maurice, indépendant à Caudry : un seul interlocuteur, du brief à la mise en ligne, pour les TPE, artisans et PME."
/>

<PageIntro
	label={aboutIntro.eyebrow}
	heading={aboutIntro.title}
	accent={aboutIntro.accent}
	lede={aboutIntro.text}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'À propos' }]}
>
	{#snippet aside()}
		<div class="portrait">
			<enhanced:img
				src={portrait}
				alt="Sébastien Maurice, fondateur de Dev'n Done, avec Dev, la mascotte, bras croisés en arrière-plan"
				sizes="(min-width: 1100px) 560px, 92vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
</PageIntro>

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
		<ReviewList />
		<p><LinkArrow href={links.malt}>{reviewsIntro.more}</LinkArrow></p>
	</div>
</section>

<ContactBlock />

<style>
	/* Photo sur fond blanc : multiply la fond dans l'Ivoire de la page */
	.portrait {
		max-width: 36rem;
		margin-inline: auto;
		aspect-ratio: 1246 / 957;
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
	.note {
		margin: 0;
		color: var(--text-muted);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
</style>
