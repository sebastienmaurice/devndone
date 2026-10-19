<!--
	Portfolio : toutes les réalisations (content/realisations.ts), chacune menant à son étude de cas.
-->
<script lang="ts">
	import { Seo } from '$lib/components';
	import DoneWord from '$lib/components/brand/DoneWord.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import { realisationsIntro } from '$lib/content/realisations';
</script>

<Seo
	title="Réalisations"
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
		<ProjectGrid headingLevel={2} />
	</div>
</section>

<ContactBlock />
