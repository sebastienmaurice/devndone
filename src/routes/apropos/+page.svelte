<!--
	À propos : présentation (texte du site en ligne), méthode de travail (process), avis clients
	réels publiés sur Malt (cités à l'identique). Aucune valeur ni chiffre ajouté.
-->
<script lang="ts">
	import { LinkArrow, Seo } from '$lib/components';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import { aboutIntro, links, reviewsIntro } from '$lib/content/studio';
</script>

<Seo
	title="À propos"
	path="/apropos/"
	description="Sébastien Maurice, indépendant à Caudry : un seul interlocuteur, du brief à la mise en ligne, pour les TPE, artisans et PME."
/>

<PageIntro
	label={aboutIntro.eyebrow}
	heading={aboutIntro.title}
	lede={aboutIntro.text}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'À propos' }]}
/>

<section class="section section--tight band" aria-labelledby="process-title">
	<div class="container">
		<ProcessRow />
	</div>
</section>

<section class="section section--tight" aria-labelledby="avis-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label={reviewsIntro.eyebrow} />
			<h2 class="t-h2" id="avis-title">{reviewsIntro.title}</h2>
			<p class="note">{reviewsIntro.lede}</p>
		</header>
		<ReviewList />
		<p><LinkArrow href={links.malt}>{reviewsIntro.more}</LinkArrow></p>
	</div>
</section>

<ContactBlock />

<style>
	.note {
		margin: 0;
		color: var(--text-muted);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
</style>
