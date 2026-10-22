<!--
	Vue d'ensemble des expertises : les cinq expertises, l'accès aux tarifs et au renfort agences,
	le process, les avis Malt (cités à l'identique), l'appel au contact.
-->
<script lang="ts">
	import { Button, LinkArrow, Seo } from '$lib/components';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import ExpertiseCards from '$lib/components/sections/ExpertiseCards.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import { servicesIntro } from '$lib/content/services';
	import { hero, links, maltRating, reviewsIntro } from '$lib/content/studio';
</script>

<Seo
	title="Services WordPress et WooCommerce"
	path="/services/"
	description="Création, refonte et évolution de sites WordPress et WooCommerce, renfort pour les agences web. En complément : design, automatisation, applications et full stack."
/>

<PageIntro
	label={servicesIntro.eyebrow}
	heading={servicesIntro.title}
	accent={servicesIntro.accent}
	lede={servicesIntro.lede}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Services' }]}
>
	{#snippet actions()}
		<Button href="/contact/" icon="arrow-right">Parlons de votre projet</Button>
		<Button href={links.calendly} variant="secondary"><Icon name="calendar" />{hero.ctaCall}</Button
		>
	{/snippet}
</PageIntro>

<section class="section section--tight" aria-label="Les expertises">
	<div class="container">
		<ExpertiseCards headingLevel={2} />
		<ul class="shortcuts" role="list">
			<li>
				Les prix et le périmètre de chaque offre : <LinkArrow href="/tarifs/"
					>Voir les tarifs</LinkArrow
				>
			</li>
			<li>
				Vous êtes une agence web ? <LinkArrow href="/agences/"
					>Le renfort WordPress et WooCommerce</LinkArrow
				>
			</li>
		</ul>
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
			<p class="note">
				Note de {maltRating.score} sur {maltRating.count} avis publiés sur mon profil Malt.
			</p>
		</header>
		<ReviewList />
		<p><LinkArrow href={links.malt}>{reviewsIntro.more}</LinkArrow></p>
	</div>
</section>

<ContactBlock />

<style>
	/* Raccourcis sous les cartes : tarifs, renfort agences */
	.shortcuts {
		display: grid;
		gap: var(--space-2);
		margin: var(--space-6) 0 0;
		padding: 0;
		list-style: none;
		font-weight: var(--weight-semibold);
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
