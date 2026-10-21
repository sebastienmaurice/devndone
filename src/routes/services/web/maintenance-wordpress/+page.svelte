<!--
	Maintenance WordPress : une page pour les trois formules (ancres #essentiel, #confort,
	#serenite), règles communes, questions fréquentes, réalisation liée, bloc contact.
	Contenus : content/tarifs.ts. Aucune garantie ni outil non validé (voir le commentaire des
	formules dans tarifs.ts). Prix sans « HT » : franchise en base de TVA.
-->
<script lang="ts">
	import { Button, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import MaintenancePlans from '$lib/components/sections/MaintenancePlans.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import Accordion from '$lib/components/ui/Accordion.svelte';
	import PriceTag from '$lib/components/ui/PriceTag.svelte';
	import { offerVisuals } from '$lib/assets/tarifs/visuels';
	import { hero, links } from '$lib/content/studio';
	import { maintenanceFaq, maintenancePage, vatNotice } from '$lib/content/tarifs';

	const visual = offerVisuals.maintenance;
	const faq = maintenanceFaq.map((f) => ({ question: f.q, answer: f.a }));
</script>

<Seo
	title={maintenancePage.seoTitle}
	path={maintenancePage.path}
	description={maintenancePage.description}
/>

<PageIntro
	label="Maintenance WordPress"
	heading={maintenancePage.title}
	accent={maintenancePage.accent}
	lede={maintenancePage.lede}
	crumbs={[
		{ label: 'Accueil', href: '/' },
		{ label: 'Services', href: '/services/' },
		{ label: 'Web', href: '/services/web/' },
		{ label: 'Maintenance WordPress' }
	]}
>
	{#snippet actions()}
		<div class="price">
			<PriceTag label="À partir de" value="99" unit="/ mois" size="hero" />
			<span class="price__note">Formules en préparation · {vatNotice}</span>
		</div>
		<Button href="#formules" icon="arrow-right">Comparer les formules</Button>
		<Button href={links.calendly} variant="secondary"><Icon name="calendar" />{hero.ctaCall}</Button
		>
	{/snippet}
	{#snippet aside()}
		<div class="visual">
			<enhanced:img
				src={visual.src}
				alt={visual.alt}
				sizes="(min-width: 1100px) 520px, 90vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
</PageIntro>

<section class="section section--tight band" id="formules" aria-labelledby="formules-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Les formules" />
			<h2 class="t-h2" id="formules-title">
				<AccentTitle text="Trois niveaux, selon votre site" accent="selon votre site" />
			</h2>
		</header>
		<MaintenancePlans headingLevel={3} rules />
	</div>
</section>

<section class="section section--tight" aria-labelledby="faq-title">
	<div class="container stack stack--lg faq">
		<header class="stack stack--sm">
			<SectionLabel label="Questions fréquentes" />
			<h2 class="t-h2" id="faq-title">Avant de souscrire</h2>
		</header>
		<Accordion items={faq} />
	</div>
</section>

<section class="section section--tight band" aria-labelledby="projets-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Réalisation" />
			<h2 class="t-h2" id="projets-title">Un site suivi dans la durée</h2>
		</header>
		<ProjectGrid only={['alternativ-uniforme']} />
	</div>
</section>

<ContactBlock />

<style>
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
	.price {
		display: grid;
		flex-basis: 100%;
		gap: var(--space-1);
		margin-bottom: var(--space-2);
	}
	.price__note {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.visual {
		max-width: 32rem;
		margin-inline: auto;
		aspect-ratio: 3 / 2;
	}
	.visual :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	.faq {
		max-width: 52rem;
	}
</style>
