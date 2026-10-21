<!--
	Page détaillée d'une offre (content/tarifs.ts) : en-tête avec prix et illustration, besoin et
	contenu inclus, exclusions et éléments à fournir, déroulement, durée et paiement, options sur
	devis, questions fréquentes, réalisations directement liées (seulement si elles existent),
	autres offres de la rubrique, bloc contact.
	Prix sans « HT » : franchise en base de TVA (mention affichée près du prix).
-->
<script lang="ts">
	import { Button, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import Accordion from '$lib/components/ui/Accordion.svelte';
	import { offerVisuals } from '$lib/assets/tarifs/visuels';
	import { hero, links } from '$lib/content/studio';
	import PriceTag from '$lib/components/ui/PriceTag.svelte';
	import { offerPath, offers, paymentTerms, priceParts, vatNotice } from '$lib/content/tarifs';

	let { data } = $props();

	const o = $derived(data.offer);
	const u = $derived(data.universe);
	const visual = $derived(offerVisuals[o.slug]);
	const siblings = $derived(offers.filter((x) => x.universe === o.universe && x.slug !== o.slug));
	const faq = $derived(o.faq.map((f) => ({ question: f.q, answer: f.a })));
</script>

<Seo title={o.seoTitle} path={offerPath(o)} description={o.description} />

<PageIntro
	label={o.name}
	heading={o.title}
	accent={o.accent}
	lede={o.lede}
	crumbs={[
		{ label: 'Accueil', href: '/' },
		{ label: 'Services', href: '/services/' },
		{ label: u.title, href: u.path },
		{ label: o.name }
	]}
>
	{#snippet actions()}
		<div class="price">
			<PriceTag {...priceParts(o)} size="hero" />
			<span class="price__note">{o.badge} · {vatNotice}</span>
		</div>
		<Button href="/contact/" icon="arrow-right">Parlons de votre projet</Button>
		<Button href={links.calendly} variant="secondary"><Icon name="calendar" />{hero.ctaCall}</Button
		>
	{/snippet}
	{#snippet aside()}
		{#if visual}
			<div class="visual">
				<enhanced:img
					src={visual.src}
					alt={visual.alt}
					sizes="(min-width: 1100px) 520px, 90vw"
					fetchpriority="high"
				/>
			</div>
		{/if}
	{/snippet}
</PageIntro>

<!-- Besoin et contenu inclus -->
<section class="section section--tight band" aria-labelledby="inclus-title">
	<div class="container split">
		<div class="stack">
			<SectionLabel label="Le besoin" />
			<p class="lead">{o.need}</p>
		</div>
		<div class="box">
			<h2 class="box__title" id="inclus-title">Ce qui est inclus</h2>
			<ul class="checks" role="list">
				{#each o.includes as item (item)}
					<li><span class="checks__icon"><Icon name="check" size="sm" /></span>{item}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- Exclusions et éléments à fournir -->
<section class="section section--tight" aria-label="Limites et prérequis">
	<div class="container duo">
		<div class="box">
			<h2 class="box__title">Ce qui n'est pas inclus</h2>
			<ul class="minus" role="list">
				{#each o.excludes as item (item)}
					<li><span class="minus__icon"><Icon name="close" size="sm" /></span>{item}</li>
				{/each}
			</ul>
		</div>
		<div class="box">
			<h2 class="box__title">Ce que vous fournissez</h2>
			<ul class="checks checks--ocean" role="list">
				{#each o.clientProvides as item (item)}
					<li><span class="checks__icon"><Icon name="arrow-right" size="sm" /></span>{item}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- Déroulement -->
<section class="section section--tight band" aria-labelledby="deroulement-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Déroulement" />
			<h2 class="t-h2" id="deroulement-title">De la prise de contact à la livraison</h2>
		</header>
		<ol class="flow" role="list">
			{#each o.steps as step, i (step.title)}
				<li class="flow__step">
					<span class="flow__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					<h3 class="flow__title">{step.title}</h3>
					<p>{step.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- Durée, paiement, options -->
<section class="section section--tight" aria-label="Durée, paiement et options">
	<div class="container trio">
		<div class="box">
			<h2 class="box__title"><Icon name="clock" /> Durée</h2>
			<p>{o.duration}</p>
		</div>
		<div class="box">
			<h2 class="box__title"><Icon name="calendar" /> Paiement</h2>
			<p>{paymentTerms[o.payment]} Conditions précisées au devis.</p>
			<p class="small">{vatNotice}</p>
		</div>
		<div class="box">
			<h2 class="box__title"><Icon name="plus" /> Sur devis</h2>
			<ul class="tags" role="list">
				{#each o.extras as extra (extra)}<li>{extra}</li>{/each}
			</ul>
		</div>
	</div>
</section>

<!-- Questions fréquentes -->
<section class="section section--tight band" aria-labelledby="faq-title">
	<div class="container stack stack--lg faq">
		<header class="stack stack--sm">
			<SectionLabel label="Questions fréquentes" />
			<h2 class="t-h2" id="faq-title">Avant de vous lancer</h2>
		</header>
		<Accordion items={faq} />
	</div>
</section>

{#if o.projects?.length}
	<section class="section section--tight" aria-labelledby="projets-title">
		<div class="container stack stack--lg">
			<header class="stack stack--sm">
				<SectionLabel label="Réalisations" />
				<h2 class="t-h2" id="projets-title">Des projets de ce type déjà livrés</h2>
			</header>
			<ProjectGrid only={o.projects} />
		</div>
	</section>
{/if}

<section class="section section--tight" aria-labelledby="autres-title">
	<div class="container">
		<h2 class="t-h3" id="autres-title">Les autres offres {u.title}</h2>
		<ul class="others" role="list">
			{#each siblings as s (s.slug)}
				<li><a class="other" href={offerPath(s)}>{s.name}<Icon name="arrow-right" /></a></li>
			{/each}
			<li>
				<a class="other other--all" href="/tarifs/">Tous les tarifs<Icon name="arrow-right" /></a>
			</li>
		</ul>
	</div>
</section>

<ContactBlock />

<style>
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
	/* Prix dans l'en-tête : pleine ligne au-dessus des boutons */
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
	/* Illustration sur fond blanc : multiply la fond dans l'Ivoire de la page */
	.visual {
		max-width: 32rem;
		margin-inline: auto;
		aspect-ratio: 919 / 754;
	}
	.visual :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	/* Mises en page */
	.split,
	.duo,
	.trio {
		display: grid;
		gap: var(--space-6);
		align-items: start;
	}
	@media (min-width: 900px) {
		.split {
			grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
			gap: var(--space-8);
		}
		.duo {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.trio {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	.lead {
		margin: 0;
		font-size: var(--text-body-lg);
	}
	.box {
		display: grid;
		gap: var(--space-4);
		align-content: start;
		height: 100%;
		padding: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.box p {
		margin: 0;
		color: var(--text-muted);
	}
	.box .small {
		font-size: var(--text-body-sm);
	}
	.box__title {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin: 0;
		font-size: var(--text-h3);
	}
	.box__title :global(.icon) {
		color: var(--accent-deco);
	}
	/* Listes : coches orange (inclus), croix discrètes (exclus), flèches bleu océan (à fournir) */
	.checks,
	.minus {
		display: grid;
		gap: var(--space-3);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.checks li,
	.minus li {
		display: flex;
		gap: var(--space-3);
		align-items: flex-start;
	}
	.checks__icon,
	.minus__icon {
		display: grid;
		place-items: center;
		flex: none;
		width: 22px;
		height: 22px;
		margin-top: 2px;
		border-radius: 50%;
		background: var(--action);
		color: var(--on-action);
	}
	.checks--ocean .checks__icon {
		background: var(--tag-bg);
		color: var(--tag-text);
	}
	.minus li {
		color: var(--text-muted);
	}
	.minus__icon {
		background: var(--surface-sunk);
		color: var(--text-muted);
	}
	/* Déroulement : cartes à pastille numérotée (référence du site) */
	.flow {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.flow__step {
		display: grid;
		gap: var(--space-2);
		align-content: start;
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.flow__num {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		margin-bottom: var(--space-2);
		border-radius: 50%;
		background: var(--action);
		color: var(--surface);
		font-family: var(--font-display);
		font-weight: var(--weight-display);
		font-size: 1.25rem;
		line-height: 1;
	}
	.flow__title {
		margin: 0;
		font-size: 1.25rem;
	}
	.flow__step p {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.tags li {
		padding: 0.2rem var(--space-3);
		border-radius: 999px;
		background: var(--tag-bg);
		color: var(--tag-text);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-bold);
	}
	.faq {
		max-width: 52rem;
	}
	/* Autres offres : pastilles-liens */
	.others {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin: var(--space-5) 0 0;
		padding: 0;
		list-style: none;
	}
	.other {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-btn);
		color: var(--text);
		font-weight: var(--weight-bold);
		text-decoration: none;
		transition: border-color var(--duration-base) var(--ease-out);
	}
	.other:hover {
		border-color: var(--accent-deco);
	}
	.other :global(.icon) {
		width: 18px;
		height: 18px;
		color: var(--accent-deco);
	}
	.other--all {
		color: var(--action-alt-text);
	}
</style>
