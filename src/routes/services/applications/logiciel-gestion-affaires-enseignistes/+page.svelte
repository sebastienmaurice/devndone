<!--
	Page dédiée au logiciel de gestion d'affaires pour enseignistes (en développement), accessible
	depuis la carte de la page « Applications & logiciels ». Présenté de façon anonyme.
	Textes : content/logiciel.ts.
-->
<script lang="ts">
	import { Button, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import LogicielShowcase from '$lib/components/sections/LogicielShowcase.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import visuel from '$lib/assets/logiciel/logiciel-enseigniste-releve-realite-augmentee.jpg?enhanced&w=1200;720;360';
	import { logicielIntro, logicielPage } from '$lib/content/logiciel';
	import { hero, links } from '$lib/content/studio';
</script>

<Seo
	title={logicielPage.seoTitle}
	path={logicielPage.path}
	description={logicielPage.description}
/>

<PageIntro
	label={logicielIntro.eyebrow}
	heading={logicielIntro.title}
	accent={logicielIntro.accent}
	lede={logicielIntro.lede}
	crumbs={[
		{ label: 'Accueil', href: '/' },
		{ label: 'Services', href: '/services/' },
		{ label: 'Applications & logiciels', href: '/services/applications/' },
		{ label: 'Logiciel pour enseignistes' }
	]}
>
	{#snippet actions()}
		<Button href="/contact/" icon="arrow-right">Parlons de votre projet</Button>
		<Button href={links.calendly} variant="secondary"><Icon name="calendar" />{hero.ctaCall}</Button
		>
	{/snippet}
	{#snippet aside()}
		<div class="visual">
			<enhanced:img
				src={visuel}
				alt="Relevé de façade en réalité augmentée sur tablette, avec les cotes de l'enseigne"
				sizes="(min-width: 1100px) 560px, 92vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
</PageIntro>

<LogicielShowcase showHeader={false} />

<ContactBlock />

<style>
	.visual {
		overflow: hidden;
		aspect-ratio: 3 / 2;
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.visual :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
