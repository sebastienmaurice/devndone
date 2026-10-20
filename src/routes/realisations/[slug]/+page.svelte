<!--
	Étude de cas. Structure réutilisable : présentation, problématique, prestations, technologies,
	visuel, résultat, CTA. Chaque section n'apparaît que si l'information réelle existe dans
	content/realisations.ts (`details`) : rien n'est inventé. Les projets sans fiche complète
	affichent leur présentation, leurs technologies et leur visuel.
-->
<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import { Button, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import { projects } from '$lib/content/realisations';

	let { data } = $props();

	const p = $derived(data.project);
	const d = $derived(p.details);
	const technologies = $derived(p.stack.split(' · '));

	const pictures = import.meta.glob<Picture>('/src/lib/assets/projets/*.jpg', {
		eager: true,
		query: { enhanced: true },
		import: 'default'
	});
	const picture = $derived(pictures[`/src/lib/assets/projets/${p.image}.jpg`]);

	const host = $derived(new URL(p.url).hostname.replace(/^www\./, ''));
	const others = $derived(
		projects
			.filter((x) => x.slug !== p.slug)
			.slice(0, 3)
			.map((x) => x.slug)
	);
</script>

<Seo title={p.seoTitle} path="/realisations/{p.slug}/" description={p.description ?? p.text} />

<PageIntro
	label={p.stack}
	heading={p.name}
	lede={d?.summary ?? p.text}
	crumbs={[
		{ label: 'Accueil', href: '/' },
		{ label: 'Réalisations', href: '/realisations/' },
		{ label: p.name }
	]}
>
	{#snippet actions()}
		<Button href={p.url} icon="arrow-up-right">Voir le site {host}</Button>
		{#if d?.malt}
			<Button href={d.malt} variant="secondary" icon="arrow-up-right"
				>Fiche du projet sur Malt</Button
			>
		{/if}
	{/snippet}
</PageIntro>

<section class="section section--tight" aria-label="Aperçu du projet">
	<div class="container">
		<figure class="visual">
			{#if picture}
				<enhanced:img
					src={picture}
					alt="Aperçu du site {p.name} sur ordinateur et mobile"
					sizes="(min-width: 1320px) 1320px, 100vw"
				/>
			{/if}
		</figure>
	</div>
</section>

<section class="section section--tight" aria-labelledby="fiche-title">
	<div class="container case">
		<div class="case__main stack stack--lg">
			<h2 class="sr-only" id="fiche-title">Fiche du projet</h2>

			<div class="stack stack--sm">
				<SectionLabel label="Présentation" />
				<p class="case__lead">{p.text}</p>
			</div>

			{#if d?.context}
				<div class="stack stack--sm">
					<SectionLabel label="Problématique" />
					<p>{d.context}</p>
				</div>
			{/if}

			{#if d?.interventions?.length}
				<div class="stack stack--sm">
					<SectionLabel label="Prestations réalisées" />
					<ul class="checks" role="list">
						{#each d.interventions as item (item)}
							<li><span class="checks__icon"><Icon name="check" size="sm" /></span>{item}</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if d?.result}
				<div class="stack stack--sm">
					<SectionLabel label="Résultat" />
					<p>{d.result}</p>
				</div>
			{/if}
		</div>

		<aside class="case__aside" aria-label="En bref">
			<dl class="facts">
				{#if d?.sector}<dt>Secteur</dt>
					<dd>{d.sector}</dd>{/if}
				{#if d?.period}<dt>Période</dt>
					<dd>{d.period}</dd>{/if}
				{#if d?.location}<dt>Lieu</dt>
					<dd>{d.location}</dd>{/if}
				<dt>Technologies</dt>
				<dd>
					<ul class="tags" role="list">
						{#each technologies as t (t)}<li>{t}</li>{/each}
					</ul>
				</dd>
				<dt>Site</dt>
				<dd>
					<a class="link" href={p.url} target="_blank" rel="noopener"
						>{host}<span class="sr-only"> (nouvel onglet)</span></a
					>
				</dd>
			</dl>
		</aside>
	</div>
</section>

<section class="section section--tight band" aria-labelledby="others-title">
	<div class="container stack stack--lg">
		<h2 class="t-h3" id="others-title">D'autres réalisations</h2>
		<ProjectGrid only={others} />
	</div>
</section>

<ContactBlock />

<style>
	.visual {
		margin: 0;
		overflow: hidden;
		border: 1px solid var(--line);
		border-radius: calc(var(--radius-card) * 1.4);
		box-shadow: var(--shadow-card);
		background: var(--surface-sunk);
	}
	/* Ratio des visuels de projets : 2:1 (format source 1774 × 887 px) */
	.visual :global(picture) {
		display: block;
		aspect-ratio: 1774 / 887;
	}
	.visual :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		/* Image entière, jamais rognée : un visuel hors 2:1 laisse des marges */
		object-fit: contain;
	}
	.case {
		display: grid;
		gap: var(--space-7);
	}
	@media (min-width: 1000px) {
		.case {
			grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
			align-items: start;
		}
	}
	.case__main p {
		margin: 0;
		max-width: 42rem;
		color: var(--text-muted);
	}
	.case__main .case__lead {
		font-size: var(--text-body-lg);
		color: var(--text);
	}
	.checks {
		display: grid;
		gap: var(--space-3);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.checks li {
		display: flex;
		gap: var(--space-3);
		align-items: flex-start;
	}
	.checks__icon {
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
	.case__aside {
		padding: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.facts {
		display: grid;
		gap: var(--space-2);
		margin: 0;
	}
	.facts dt {
		margin-top: var(--space-3);
		font-size: var(--text-label);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-subtle);
	}
	.facts dt:first-child {
		margin-top: 0;
	}
	.facts dd {
		margin: 0;
		font-weight: var(--weight-semibold);
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
		padding: 2px var(--space-3);
		border: 1px solid var(--line);
		border-radius: var(--radius-btn);
		font-size: var(--text-body-sm);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
</style>
