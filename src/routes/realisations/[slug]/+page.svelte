<!--
	Étude de cas. Structure réutilisable : en-tête, visuel dans un cadre de navigateur, chiffres clés
	(secteur, période, lieu, site), présentation, problématique, prestations en cartes cochées,
	résultat, fiche technique en colonne, navigation précédent / suivant, autres réalisations, CTA.
	Chaque bloc n'apparaît que si l'information réelle existe dans content/realisations.ts
	(`details`) : rien n'est inventé.
-->
<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import { Button, LinkArrow, Seo } from '$lib/components';
	import Icon, { type IconName } from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import { projects } from '$lib/content/realisations';
	import { links, reviews } from '$lib/content/studio';
	import { offerPath, offers } from '$lib/content/tarifs';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';

	let { data } = $props();

	const p = $derived(data.project);
	// Avis Malt du même client, s'il existe (correspondance déclarée dans content/studio.ts)
	const review = $derived(reviews.find((r) => r.project === p.slug));
	// Offres illustrées par ce projet : uniquement les correspondances déclarées dans le catalogue
	// (content/tarifs.ts, champ `projects` de chaque offre), sans rattachement ajouté ici
	const relatedOffers = $derived(offers.filter((o) => o.projects?.includes(p.slug)));
	const d = $derived(p.details);
	const technologies = $derived(p.stack.split(' · '));

	const pictures = import.meta.glob<Picture>('/src/lib/assets/projets/*.jpg', {
		eager: true,
		query: { enhanced: true },
		import: 'default'
	});
	const picture = $derived(pictures[`/src/lib/assets/projets/${p.image}.jpg`]);

	const host = $derived(new URL(p.url).hostname.replace(/^www\./, ''));
	const index = $derived(projects.findIndex((x) => x.slug === p.slug));
	const num = $derived(String(index + 1).padStart(2, '0'));
	// Navigation circulaire dans le portfolio
	const prev = $derived(projects[(index - 1 + projects.length) % projects.length]);
	const next = $derived(projects[(index + 1) % projects.length]);
	const others = $derived(
		projects
			.filter((x) => x.slug !== p.slug && x.slug !== prev.slug && x.slug !== next.slug)
			.slice(0, 3)
			.map((x) => x.slug)
	);

	const facts = $derived(
		[
			{ icon: 'briefcase', label: 'Secteur', value: d?.sector },
			{ icon: 'calendar', label: 'Période', value: d?.period },
			{ icon: 'map-pin', label: 'Lieu', value: d?.location }
		].filter((f): f is { icon: IconName; label: string; value: string } => !!f.value)
	);
</script>

<Seo title={p.seoTitle} path="/realisations/{p.slug}/" description={p.description ?? p.text} />

<PageIntro
	label="Réalisation {num}"
	heading={p.name}
	lede={d?.summary ?? p.text}
	crumbs={[
		{ label: 'Accueil', href: '/' },
		{ label: 'Réalisations', href: '/realisations/' },
		{ label: p.name }
	]}
>
	{#snippet actions()}
		<ul class="intro-tags" role="list" aria-label="Technologies">
			{#each technologies as t (t)}<li>{t}</li>{/each}
		</ul>
		<Button href={p.url} icon="arrow-up-right">Voir le site en ligne</Button>
		{#if d?.malt}
			<Button href={d.malt} variant="secondary" icon="arrow-up-right"
				>Fiche du projet sur Malt</Button
			>
		{/if}
	{/snippet}
	{#snippet aside()}
		{#if facts.length}
			<ul class="facts" role="list">
				{#each facts as f (f.label)}
					<li class="fact">
						<span class="fact__icon"><Icon name={f.icon} /></span>
						<span class="fact__text">
							<span class="fact__label">{f.label}</span>
							<span class="fact__value">{f.value}</span>
						</span>
					</li>
				{/each}
				<li class="fact fact--wide">
					<span class="fact__icon"><Icon name="globe" /></span>
					<span class="fact__text">
						<span class="fact__label">Site en ligne</span>
						<a class="fact__value fact__link" href={p.url} target="_blank" rel="noopener"
							>{host}<span class="sr-only"> (nouvel onglet)</span></a
						>
					</span>
				</li>
			</ul>
		{/if}
	{/snippet}
</PageIntro>

<section class="section section--tight" aria-label="Aperçu du projet">
	<div class="container">
		<!-- Cadre de navigateur décoratif autour de la vraie présentation du projet -->
		<figure class="browser">
			<div class="browser__bar" aria-hidden="true">
				<span class="browser__dots"><i></i><i></i><i></i></span>
				<span class="browser__url">{host}</span>
			</div>
			<div class="browser__screen">
				{#if picture}
					<enhanced:img
						src={picture}
						alt="Aperçu du site {p.name} sur ordinateur et mobile"
						sizes="(min-width: 1320px) 1320px, 100vw"
						fetchpriority="high"
					/>
				{/if}
			</div>
		</figure>
	</div>
</section>

<section class="section section--tight" aria-labelledby="fiche-title">
	<div class="container case">
		<div class="case__main stack stack--lg">
			<h2 class="sr-only" id="fiche-title">Fiche du projet</h2>

			<div class="block stack stack--sm">
				<SectionLabel label="Le projet" />
				{#if d?.subtitle}<h3 class="block__title">{d.subtitle}</h3>{/if}
				<p class="case__lead">{p.text}</p>
			</div>

			{#if d?.context}
				<div class="panel">
					<span class="panel__icon"><Icon name="target" /></span>
					<div class="stack stack--sm">
						<SectionLabel label="Problématique" />
						<p>{d.context}</p>
					</div>
				</div>
			{/if}

			{#if d?.interventions?.length}
				<div class="block stack stack--sm">
					<SectionLabel label="Prestations réalisées" />
					<ul class="tasks" role="list">
						{#each d.interventions as item (item)}
							<li class="task">
								<span class="task__check"><Icon name="check" size="sm" /></span>{item}
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if d?.result}
				<div class="result surface-night">
					<span class="result__icon"><Icon name="trophy" /></span>
					<div class="stack stack--sm">
						<SectionLabel label="Résultat" />
						<p>{d.result}</p>
					</div>
				</div>
			{/if}

			{#if review}
				<!-- Avis Malt laissé par ce client, cité à l'identique -->
				<div class="stack stack--sm client-review">
					<SectionLabel label="L'avis du client" />
					<ReviewList only={[review.id]} />
					<p class="client-review__source">
						Avis publié sur Malt · <a class="link" href={links.malt}>voir le profil</a>
					</p>
				</div>
			{/if}
		</div>

		<aside class="case__aside" aria-label="Fiche technique">
			<h2 class="aside__title">Fiche technique</h2>
			<div class="aside__group">
				<p class="aside__label">Technologies</p>
				<ul class="tags" role="list">
					{#each technologies as t (t)}<li>{t}</li>{/each}
				</ul>
			</div>
			{#if d?.skills?.length}
				<div class="aside__group">
					<p class="aside__label">Compétences mobilisées</p>
					<ul class="skills" role="list">
						{#each d.skills as s (s)}
							<li><span class="skills__check"><Icon name="check" size="sm" /></span>{s}</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if relatedOffers.length}
				<div class="aside__group">
					<p class="aside__label">Offre correspondante :</p>
					<ul class="aside__offers" role="list">
						{#each relatedOffers as o (o.slug)}
							<li><LinkArrow href={offerPath(o)}>{o.name}</LinkArrow></li>
						{/each}
					</ul>
				</div>
			{/if}
			<div class="aside__actions">
				<Button href={p.url} icon="arrow-up-right" block>Voir le site</Button>
				<Button href="/contact/" variant="secondary" icon="arrow-right" block
					>Un projet similaire ?</Button
				>
			</div>
		</aside>
	</div>
</section>

<nav class="section section--tight" aria-label="Autres études de cas">
	<div class="container pager">
		<a class="pager__link" href="/realisations/{prev.slug}/" rel="prev">
			<span class="pager__icon"><Icon name="arrow-left" /></span>
			<span class="pager__text">
				<span class="pager__label">Projet précédent</span>
				<span class="pager__name">{prev.name}</span>
			</span>
		</a>
		<a class="pager__link pager__link--next" href="/realisations/{next.slug}/" rel="next">
			<span class="pager__text">
				<span class="pager__label">Projet suivant</span>
				<span class="pager__name">{next.name}</span>
			</span>
			<span class="pager__icon"><Icon name="arrow-right" /></span>
		</a>
	</div>
</nav>

{#if others.length}
	<section class="section section--tight band" aria-labelledby="others-title">
		<div class="container stack stack--lg">
			<header class="others-head">
				<h2 class="t-h3" id="others-title">D'autres réalisations</h2>
				<a class="link-arrow" href="/realisations/"
					>Toutes les réalisations <Icon name="arrow-right" /></a
				>
			</header>
			<ProjectGrid only={others} />
		</div>
	</section>
{/if}

<ContactBlock />

<style>
	/* Avis du client sous le résultat */
	.client-review {
		margin-top: var(--space-6);
	}
	.client-review__source {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	/* Technologies sous le chapô : pastilles bleu océan très clair (--tag-bg), pleine ligne au-dessus des boutons */
	.intro-tags {
		display: flex;
		flex-basis: 100%;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0 0 var(--space-2);
		padding: 0;
		list-style: none;
	}
	.intro-tags li,
	.tags li {
		padding: 0.2rem var(--space-3);
		border-radius: 999px;
		background: var(--tag-bg);
		color: var(--tag-text);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-bold);
	}

	/* Visuel dans un cadre de navigateur */
	.browser {
		margin: 0;
		overflow: hidden;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: calc(var(--radius-card) * 1.4);
		box-shadow: var(--shadow-card-hover);
	}
	.browser__bar {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-3) var(--space-4);
		border-bottom: 1px solid var(--line);
	}
	.browser__dots {
		display: flex;
		gap: 6px;
	}
	.browser__dots i {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--line-strong);
	}
	.browser__dots i:first-child {
		background: var(--action);
	}
	.browser__url {
		flex: 1;
		max-width: 26rem;
		margin-inline: auto;
		padding: 0.2rem var(--space-4);
		border-radius: 999px;
		background: var(--surface-sunk);
		color: var(--text-muted);
		font-size: var(--text-caption);
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	/* Ratio des visuels de projets : 2:1 (format source 1774 × 887 px) */
	.browser__screen {
		aspect-ratio: 1774 / 887;
		background: var(--surface-sunk);
	}
	.browser__screen :global(picture) {
		display: block;
		height: 100%;
	}
	.browser__screen :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	/* Chiffres clés : cartes à tuile d'icône */
	.facts {
		display: grid;
		gap: var(--space-4);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.fact {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-4) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.fact__icon,
	.panel__icon,
	.result__icon,
	.pager__icon {
		display: grid;
		place-items: center;
		flex: none;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: color-mix(in srgb, var(--action) 14%, var(--surface));
		color: var(--accent-deco);
	}
	.fact__icon :global(.icon),
	.panel__icon :global(.icon),
	.result__icon :global(.icon),
	.pager__icon :global(.icon) {
		width: 22px;
		height: 22px;
	}
	/* Site en ligne : pleine largeur, l'adresse tient sur une ligne */
	.fact--wide {
		grid-column: 1 / -1;
	}
	.fact__text {
		display: grid;
		gap: 0.1rem;
		min-width: 0;
	}
	.fact__label,
	.aside__label,
	.pager__label {
		margin: 0;
		font-size: var(--text-label);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-subtle);
	}
	.fact__value {
		font-weight: var(--weight-bold);
		overflow-wrap: anywhere;
	}
	.fact__link {
		color: var(--action-alt-text);
	}

	/* Corps de l'étude de cas */
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
		max-width: 44rem;
		color: var(--text-muted);
	}
	.block__title {
		margin: 0;
		font-size: var(--text-h3);
	}
	.case__main .case__lead {
		font-size: var(--text-body-lg);
		color: var(--text);
	}
	.panel,
	.result {
		display: flex;
		align-items: flex-start;
		gap: var(--space-5);
		padding: var(--space-6);
		border-radius: var(--radius-card);
	}
	/* Mobile : icône au-dessus du texte, qui garde toute la largeur */
	@media (max-width: 599px) {
		.panel,
		.result {
			flex-direction: column;
			gap: var(--space-4);
			padding: var(--space-5);
		}
	}
	.panel {
		background: var(--surface);
		border: 1px solid var(--line);
		box-shadow: var(--shadow-card);
	}
	/* Résultat : carte Bleu nuit, texte Ivoire */
	.result {
		box-shadow: var(--shadow-card-hover);
	}
	.case__main .result p {
		color: var(--text);
		font-size: var(--text-body-lg);
	}
	.result__icon {
		background: var(--action);
		color: var(--on-action);
	}

	/* Prestations : cartes cochées sur deux colonnes */
	.tasks {
		display: grid;
		gap: var(--space-3);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.task {
		display: flex;
		gap: var(--space-3);
		align-items: flex-start;
		padding: var(--space-4);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
		line-height: 1.45;
		transition:
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	.task:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-card-hover);
		border-color: var(--accent-deco);
	}
	.task__check,
	.skills__check {
		display: grid;
		place-items: center;
		flex: none;
		width: 22px;
		height: 22px;
		margin-top: 1px;
		border-radius: 50%;
		background: var(--action);
		color: var(--on-action);
	}

	/* Fiche technique : carte collante en grand écran */
	.case__aside {
		display: grid;
		gap: var(--space-5);
		padding: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	@media (min-width: 1000px) {
		.case__aside {
			position: sticky;
			top: 110px;
		}
	}
	.aside__title {
		margin: 0;
		padding-bottom: var(--space-4);
		border-bottom: 1px solid var(--line);
		font-size: var(--text-h3);
	}
	.aside__offers {
		display: grid;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.aside__group {
		display: grid;
		gap: var(--space-3);
	}
	.tags,
	.skills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.skills {
		display: grid;
	}
	.skills li {
		display: flex;
		gap: var(--space-3);
		align-items: flex-start;
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
	}
	.aside__actions {
		display: grid;
		gap: var(--space-3);
		padding-top: var(--space-4);
		border-top: 1px solid var(--line);
	}

	/* Navigation précédent / suivant */
	.pager {
		display: grid;
		gap: var(--space-4);
	}
	@media (min-width: 700px) {
		.pager {
			grid-template-columns: 1fr 1fr;
		}
	}
	.pager__link {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		color: var(--text);
		text-decoration: none;
		transition:
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	.pager__link--next {
		justify-content: flex-end;
		text-align: right;
	}
	.pager__link:hover,
	.pager__link:focus-visible {
		transform: translateY(-6px);
		box-shadow: var(--shadow-card-hover);
		border-color: var(--accent-deco);
	}
	.pager__link:hover .pager__icon,
	.pager__link:focus-visible .pager__icon {
		background: var(--action);
		color: var(--on-action);
	}
	.pager__text {
		display: grid;
		gap: 0.1rem;
	}
	.pager__name {
		font-family: var(--font-display);
		font-weight: var(--weight-display);
		font-size: var(--text-h3);
		line-height: 1.15;
		transition: color var(--duration-reveal) var(--ease-out);
	}
	.pager__link:hover .pager__name,
	.pager__link:focus-visible .pager__name {
		color: var(--accent-deco);
	}

	.others-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-3);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
	@media (prefers-reduced-motion: reduce) {
		.task:hover,
		.pager__link:hover,
		.pager__link:focus-visible {
			transform: none;
		}
	}
</style>
