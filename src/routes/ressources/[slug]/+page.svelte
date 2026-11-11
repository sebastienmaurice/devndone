<!--
	Article de la rubrique Ressources (content/ressources.ts). Mise en page par type de section :
	en-tête avec la mascotte (fond blanc fondu en multiply), sommaire en pastilles, schéma du trajet
	d'un e-mail (flow), bandeau sombre avec phrase mise en avant (quote), contrôles en cartes
	(checklist), étapes numérotées (steps), carte d'appel vers l'offre de dépannage (closing), sources
	en cartes. Prix et conditions du dépannage : catalogue (content/tarifs.ts).
	Données structurées BlogPosting : auteur et éditeur déjà déclarés sur le site.
-->
<script lang="ts">
	import { Button, LinkArrow, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import mascot from '$lib/assets/mascotte/mascotte-renard-dev-n-done-formulaire-message-envoye-loupe.webp?enhanced&w=720;360';
	import { absoluteUrl, organizationId } from '$lib/config/site';
	import { articlePath } from '$lib/content/ressources';
	import { offerPath, offers } from '$lib/content/tarifs';

	let { data } = $props();

	const a = $derived(data.article);
	const sprint = offers.find((o) => o.slug === 'sprint-wordpress-woocommerce');

	const dateFr = (iso: string) =>
		new Date(iso).toLocaleDateString('fr-FR', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: 'UTC'
		});

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: a.title,
		description: a.description,
		datePublished: a.published,
		dateModified: a.modified,
		inLanguage: 'fr-FR',
		mainEntityOfPage: absoluteUrl(articlePath(a.slug)),
		author: { '@id': `${absoluteUrl('/apropos/')}#sebastien-maurice` },
		publisher: { '@id': organizationId }
	});
</script>

<Seo
	title={a.seoTitle}
	path={articlePath(a.slug)}
	description={a.description}
	type="article"
	{jsonLd}
/>

<PageIntro
	label="Ressources"
	heading={a.title}
	accent={a.accent}
	lede={a.lede}
	crumbs={[
		{ label: 'Accueil', href: '/' },
		{ label: 'Ressources', href: '/ressources/' },
		{ label: a.title }
	]}
>
	{#snippet aside()}
		<div class="portrait">
			<enhanced:img
				src={mascot}
				alt="Dev, la mascotte de Dev'n Done, perplexe, une loupe à la main devant une fenêtre « Message envoyé » et une enveloppe qui n'arrive pas"
				sizes="(min-width: 1100px) 480px, 92vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
</PageIntro>

<!-- Signature et sommaire -->
<section class="section section--tight toc-section" aria-label="Sommaire de l'article">
	<div class="container toc">
		<p class="toc__meta">
			Par Sébastien Maurice · Publié le {dateFr(a.published)}
			{#if a.modified !== a.published}· Mis à jour le {dateFr(a.modified)}{/if}
		</p>
		<nav aria-label="Dans cet article">
			<ul class="toc__list" role="list">
				{#each a.sections as s (s.id)}
					<li><a class="toc__pill" href="#{s.id}">{s.nav}</a></li>
				{/each}
				<li><a class="toc__pill" href="#sources">Sources</a></li>
			</ul>
		</nav>
	</div>
</section>

{#each a.sections as s (s.id)}
	{#if s.kind === 'flow'}
		<!-- Texte à gauche, schéma du trajet de l'e-mail à droite -->
		<section class="section section--tight anchor" id={s.id} aria-labelledby="{s.id}-title">
			<div class="container split">
				<div class="split__text stack stack--sm">
					<SectionLabel label="1 · {s.nav}" />
					<h2 class="t-h2" id="{s.id}-title">{s.title}</h2>
					{#each s.paragraphs ?? [] as p, j (j)}
						<p class="lead-text" class:lead-text--first={j === 0}>{p}</p>
					{/each}
				</div>
				<ol class="flow" aria-label="Trajet d'un e-mail envoyé par WordPress">
					{#each s.flow ?? [] as step, k (k)}
						<li class="flow__step" class:flow__step--end={k === (s.flow?.length ?? 0) - 1}>
							<span class="flow__node" aria-hidden="true">
								{#if k === (s.flow?.length ?? 0) - 1}<Icon name="mail" size="sm" />{:else}{k +
										1}{/if}
							</span>
							<span class="flow__body">
								<span class="flow__label">{step.label}</span>
								{#if step.note}<span class="flow__note">{step.note}</span>{/if}
							</span>
						</li>
					{/each}
				</ol>
			</div>
		</section>
	{:else if s.kind === 'quote'}
		<!-- Bandeau sombre : phrase mise en avant et texte -->
		<section class="section section--tight anchor" id={s.id} aria-labelledby="{s.id}-title">
			<div class="container">
				<div class="night surface-night">
					<div class="night__quote">
						<SectionLabel label="2 · {s.nav}" />
						<h2 class="t-h3 night__title" id="{s.id}-title">{s.title}</h2>
						<blockquote class="pull">
							<p>{s.quote}</p>
							{#if s.quoteSource}<footer class="pull__src">{s.quoteSource}</footer>{/if}
						</blockquote>
					</div>
					<div class="night__text stack stack--sm">
						{#each s.paragraphs ?? [] as p, j (j)}
							<p>{p}</p>
						{/each}
					</div>
				</div>
			</div>
		</section>
	{:else if s.kind === 'checklist'}
		<!-- Contrôles en cartes -->
		<section class="section section--tight band anchor" id={s.id} aria-labelledby="{s.id}-title">
			<div class="container stack stack--lg">
				<header class="stack stack--sm head">
					<SectionLabel label="3 · {s.nav}" />
					<h2 class="t-h2" id="{s.id}-title">{s.title}</h2>
					{#each s.paragraphs ?? [] as p, j (j)}
						<p class="lead-text">{p}</p>
					{/each}
				</header>
				<ul class="guide-checks" role="list">
					{#each s.list ?? [] as item, k (k)}
						<li class="guide-check">
							<span class="guide-check__icon" aria-hidden="true"
								><Icon name="check" size="sm" /></span
							>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{:else if s.kind === 'steps'}
		<!-- Étapes numérotées -->
		<section class="section section--tight anchor" id={s.id} aria-labelledby="{s.id}-title">
			<div class="container stack stack--lg">
				<header class="stack stack--sm head">
					<SectionLabel label="4 · {s.nav}" />
					<h2 class="t-h2" id="{s.id}-title">{s.title}</h2>
				</header>
				<ol class="guide-steps" role="list">
					{#each s.steps ?? [] as step, k (k)}
						<li class="guide-step">
							<span class="guide-step__num" aria-hidden="true">{k + 1}</span>
							<h3 class="guide-step__title t-h3">{step.title}</h3>
							<p>{step.text}</p>
						</li>
					{/each}
				</ol>
			</div>
		</section>
	{:else if s.kind === 'case'}
		<!-- Retour d'expérience : carte avec filet orange -->
		<section class="section section--tight anchor" id={s.id} aria-labelledby="{s.id}-title">
			<div class="container">
				<div class="guide-case">
					<span class="guide-case__icon" aria-hidden="true"><Icon name="lightbulb" /></span>
					<div class="guide-case__body stack stack--sm">
						<SectionLabel label="Retour d'expérience" />
						<h2 class="t-h3" id="{s.id}-title">{s.title}</h2>
						{#each s.paragraphs ?? [] as p, j (j)}
							<p>{p}</p>
						{/each}
					</div>
				</div>
			</div>
		</section>
	{:else if s.kind === 'closing'}
		<!-- Texte et carte d'appel vers l'offre de dépannage -->
		<section class="section section--tight band anchor" id={s.id} aria-labelledby="{s.id}-title">
			<div class="container split split--closing">
				<div class="split__text stack stack--sm">
					<SectionLabel label="5 · {s.nav}" />
					<h2 class="t-h2" id="{s.id}-title">{s.title}</h2>
					{#each s.paragraphs ?? [] as p, j (j)}
						<p class="lead-text" class:lead-text--first={j === 0}>{p}</p>
					{/each}
				</div>
				{#if sprint}
					<aside class="guide-offer surface-night" aria-labelledby="{s.id}-offer">
						<h3 class="t-h3" id="{s.id}-offer">Un problème sur votre site ?</h3>
						<p>
							Diagnostic, devis, puis intervention ciblée sur un site WordPress ou WooCommerce
							existant.
						</p>
						<p class="guide-offer__badge">{sprint.badge}</p>
						<div class="guide-offer__actions">
							<Button href="/contact/?offre={sprint.slug}" icon="arrow-right">{sprint.cta}</Button>
							<LinkArrow href={offerPath(sprint)}>Le dépannage WordPress et WooCommerce</LinkArrow>
						</div>
					</aside>
				{/if}
			</div>
		</section>
	{/if}
{/each}

<!-- Sources -->
<section class="section section--tight anchor" id="sources" aria-labelledby="sources-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm head">
			<SectionLabel label="Sources" />
			<h2 class="t-h2" id="sources-title">D'où viennent ces informations</h2>
			<p class="lead-text">Pages consultées le {a.sourcesChecked}.</p>
		</header>
		<ul class="sources" role="list">
			{#each a.sources as src (src.url)}
				<li class="source">
					<a class="source__link" href={src.url} target="_blank" rel="noopener">
						<span class="source__label">{src.label}</span>
						<span class="sr-only"> (nouvel onglet)</span>
						<Icon name="arrow-up-right" size="sm" />
					</a>
					<span class="source__note">{src.note}</span>
				</li>
			{/each}
		</ul>
		<p><LinkArrow href="/ressources/">Toutes les ressources</LinkArrow></p>
	</div>
</section>

<ContactBlock />

<style>
	/* Mascotte : fond blanc fondu dans l'Ivoire de la page */
	.portrait {
		max-width: 28rem;
		margin-inline: auto;
		aspect-ratio: 1 / 1;
	}
	.portrait :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}

	/* Signature et sommaire en pastilles */
	.toc-section {
		padding-top: 0;
	}
	.toc {
		display: grid;
		gap: var(--space-3);
	}
	.toc__meta {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.toc__list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.toc__pill {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		background: var(--tag-bg);
		color: var(--tag-text);
		border-radius: 999px;
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
		text-decoration: none;
		transition: background-color var(--duration-base) var(--ease-out);
	}
	.toc__pill:hover {
		background: var(--surface);
		box-shadow: inset 0 0 0 1px var(--line);
	}

	/* Sections : ancres sous l'en-tête fixe, bandes blanches alternées */
	.anchor {
		scroll-margin-top: 110px;
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
	.head {
		max-width: 46rem;
	}
	.lead-text {
		margin: 0;
		color: var(--text-muted);
		max-width: 46rem;
	}
	.lead-text--first {
		font-size: var(--text-body-lg);
		color: var(--text);
	}

	/* Deux colonnes : texte et schéma, ou texte et carte */
	.split {
		display: grid;
		gap: var(--space-7);
		align-items: center;
	}
	@media (min-width: 1000px) {
		.split {
			grid-template-columns: minmax(0, 1fr) minmax(0, 26rem);
			gap: var(--space-8);
		}
		.split--closing {
			align-items: start;
		}
	}

	/* Schéma du trajet : liste verticale reliée par un filet */
	.flow {
		position: relative;
		display: grid;
		gap: 0;
		margin: 0;
		padding: var(--space-5);
		list-style: none;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.flow__step {
		position: relative;
		display: grid;
		grid-template-columns: 2.25rem minmax(0, 1fr);
		gap: var(--space-3);
		padding-bottom: var(--space-4);
	}
	.flow__step:last-child {
		padding-bottom: 0;
	}
	/* Filet entre deux nœuds */
	.flow__step:not(:last-child)::before {
		content: '';
		position: absolute;
		left: calc(1.125rem - 1px);
		top: 2.25rem;
		bottom: 0;
		width: 2px;
		background: var(--line);
	}
	.flow__node {
		position: relative;
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		background: var(--action);
		color: var(--action-text, var(--text));
		font-weight: var(--weight-extrabold);
		font-size: var(--text-body-sm);
	}
	.flow__step--end .flow__node {
		background: var(--text);
		color: var(--bg);
	}
	.flow__body {
		display: grid;
		gap: 2px;
		padding-top: 2px;
	}
	.flow__label {
		font-weight: var(--weight-bold);
	}
	.flow__note {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}

	/* Bandeau sombre : phrase mise en avant */
	.night {
		display: grid;
		gap: var(--space-7);
		padding: clamp(var(--space-6), 4vw, var(--space-8));
		border-radius: var(--radius-card);
	}
	.night__quote {
		display: grid;
		gap: var(--space-4);
		align-content: start;
	}
	.night__title {
		margin: 0;
	}
	.pull {
		position: relative;
		margin: var(--space-3) 0 0;
		padding-left: var(--space-5);
		border-left: 4px solid var(--action);
	}
	.pull p {
		margin: 0;
		font-family: var(--font-display, inherit);
		font-size: clamp(1.5rem, 1.25rem + 1vw, 2.125rem);
		line-height: 1.2;
		text-wrap: balance;
	}
	.pull__src {
		margin-top: var(--space-3);
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.night__text p {
		margin: 0;
		color: var(--text-muted);
	}
	@media (min-width: 1000px) {
		.night {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			gap: var(--space-8);
			align-items: center;
		}
	}

	/* Contrôles en cartes */
	.guide-checks {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: minmax(0, 1fr);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 720px) {
		.guide-checks {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.guide-check {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr);
		gap: var(--space-3);
		align-items: start;
		padding: var(--space-5);
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		color: var(--text);
	}
	.guide-check__icon {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: var(--action);
		color: var(--action-text, var(--text));
	}

	/* Étapes numérotées */
	.guide-steps {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: minmax(0, 1fr);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 900px) {
		.guide-steps {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.guide-step {
		position: relative;
		display: grid;
		gap: var(--space-3);
		align-content: start;
		padding: var(--space-6) var(--space-5) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.guide-step__num {
		font-size: 3.5rem;
		line-height: 1;
		font-weight: var(--weight-extrabold);
		color: var(--action);
	}
	.guide-step__title {
		margin: 0;
	}
	.guide-step p {
		margin: 0;
		color: var(--text-muted);
	}

	/* Retour d'expérience */
	.guide-case {
		display: grid;
		gap: var(--space-4);
		padding: var(--space-6) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-left: 6px solid var(--action);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.guide-case__icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: var(--tag-bg);
		color: var(--tag-text);
	}
	.guide-case__body :global(p) {
		margin: 0;
		color: var(--text-muted);
		max-width: 52rem;
	}
	.guide-case__body :global(p:first-of-type) {
		color: var(--text);
	}
	@media (min-width: 720px) {
		.guide-case {
			grid-template-columns: 3rem minmax(0, 1fr);
			gap: var(--space-5);
			padding: var(--space-6);
		}
	}

	/* Carte d'appel vers l'offre */
	.guide-offer {
		display: grid;
		gap: var(--space-3);
		padding: var(--space-6);
		border-radius: var(--radius-card);
	}
	.guide-offer h3 {
		margin: 0;
	}
	.guide-offer p {
		margin: 0;
		color: var(--text-muted);
	}
	.guide-offer .guide-offer__badge {
		color: var(--action);
		font-weight: var(--weight-bold);
	}
	.guide-offer__actions {
		display: grid;
		gap: var(--space-3);
		justify-items: start;
		margin-top: var(--space-2);
	}

	/* Sources */
	.sources {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: minmax(0, 1fr);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 720px) {
		.sources {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.source {
		display: grid;
		gap: var(--space-2);
		align-content: start;
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.source__link {
		display: inline-flex;
		align-items: flex-start;
		gap: var(--space-2);
		color: var(--action-alt-text);
		font-weight: var(--weight-bold);
		text-decoration: none;
	}
	.source__link:hover .source__label {
		text-decoration: underline;
	}
	.source__note {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}

	@media (prefers-reduced-motion: no-preference) {
		.guide-check,
		.guide-step,
		.source {
			transition:
				transform var(--duration-base) var(--ease-out),
				border-color var(--duration-base) var(--ease-out);
		}
		.guide-check:hover,
		.guide-step:hover,
		.source:hover {
			transform: translateY(-3px);
			border-color: var(--action);
		}
	}
</style>
