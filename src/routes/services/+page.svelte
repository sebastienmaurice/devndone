<!--
	Vue d'ensemble des expertises : les quatre univers, le process, l'appel au contact.
-->
<script lang="ts">
	import { Button, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import ExpertiseCards from '$lib/components/sections/ExpertiseCards.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import { servicesIntro } from '$lib/content/services';
	import { hero, links } from '$lib/content/studio';
</script>

<Seo
	title="Services"
	path="/services/"
	description="Web, design, automatisation et développement full stack : quatre univers, une seule vision, du premier brief jusqu'à la mise en ligne."
/>

<PageIntro
	label={servicesIntro.eyebrow}
	heading={servicesIntro.title}
	lede={servicesIntro.lede}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Services' }]}
>
	{#snippet actions()}
		<Button href="/contact/" icon="arrow-right">Parlons de votre projet</Button>
		<Button href={links.calendly} variant="secondary"><Icon name="calendar" />{hero.ctaCall}</Button
		>
	{/snippet}
</PageIntro>

<section class="section section--tight" aria-label="Les quatre expertises">
	<div class="container">
		<ExpertiseCards headingLevel={2} />
	</div>
</section>

<section class="section section--tight band" aria-labelledby="process-title">
	<div class="container">
		<ProcessRow />
	</div>
</section>

<ContactBlock />

<style>
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
</style>
