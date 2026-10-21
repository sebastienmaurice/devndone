<!--
	Vue d'ensemble des expertises : les cinq expertises, le process, l'appel au contact.
-->
<script lang="ts">
	import { Button, LinkArrow, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import ExpertiseCards from '$lib/components/sections/ExpertiseCards.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import { servicesIntro } from '$lib/content/services';
	import { hero, links } from '$lib/content/studio';
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
		<p class="agencies">
			Vous êtes une agence web ? <LinkArrow href="/agences/"
				>Le renfort WordPress et WooCommerce</LinkArrow
			>
		</p>
	</div>
</section>

<section class="section section--tight band" aria-labelledby="process-title">
	<div class="container">
		<ProcessRow />
	</div>
</section>

<ContactBlock />

<style>
	.agencies {
		margin: var(--space-6) 0 0;
		font-weight: var(--weight-semibold);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
</style>
