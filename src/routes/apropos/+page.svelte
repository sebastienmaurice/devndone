<!--
	À propos : présentation (texte du site en ligne) avec la photo de Sébastien (mascotte en
	arrière-plan), méthode de travail (process), avis clients
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
	import { aboutIntro, links, reviewsIntro } from '$lib/content/studio';
	import portrait from '$lib/assets/photos/sebastien-maurice-developpeur-web-caudry-mascotte.jpg?enhanced&w=1200;720;360';
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
				alt="Sébastien Maurice, fondateur de Dev'n Done, avec Dev, la mascotte, en arrière-plan"
				sizes="(min-width: 1100px) 480px, 80vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
</PageIntro>

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
		max-width: 30rem;
		margin-inline: auto;
		aspect-ratio: 1122 / 1292;
	}
	.portrait :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	@media (max-width: 1099px) {
		.portrait {
			max-width: 22rem;
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
