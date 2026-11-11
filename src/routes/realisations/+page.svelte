<!--
	Portfolio : toutes les réalisations (content/realisations.ts), chacune menant à son étude de cas.
-->
<script lang="ts">
	import { LinkArrow, Seo } from '$lib/components';
	import { logicielIntro, logicielPage } from '$lib/content/logiciel';
	import DoneWord from '$lib/components/brand/DoneWord.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import { realisationsIntro } from '$lib/content/realisations';
</script>

<Seo
	title="Réalisations : sites WordPress, WooCommerce et applications"
	path="/realisations/"
	description="Sites WordPress, boutiques WooCommerce et application full stack : des projets concrets pour de vrais besoins, tels qu'ils existent aujourd'hui."
/>

<PageIntro
	label={realisationsIntro.eyebrow}
	lede={realisationsIntro.lede}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Réalisations' }]}
>
	{#snippet title()}Des projets qui sont vraiment <DoneWord />{/snippet}
</PageIntro>

<section class="section section--tight" aria-label="Projets">
	<div class="container">
		<ProjectGrid headingLevel={2} featured />
		<p class="logiciel-link">
			{logicielIntro.eyebrow} : <LinkArrow href={logicielPage.path}>{logicielIntro.title}</LinkArrow
			>
		</p>
	</div>
</section>

<ContactBlock />

<style>
	/* Lien vers le logiciel pour enseignistes, sous la grille des projets */
	.logiciel-link {
		margin: var(--space-6) 0 0;
		font-weight: var(--weight-semibold);
	}
</style>
