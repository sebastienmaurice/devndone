<!--
	Article de la rubrique Ressources (content/ressources.ts) : en-tête, sections de texte, appel
	vers l'offre de dépannage (prix et conditions du catalogue), sources citées, bloc contact.
	Données structurées BlogPosting : auteur et éditeur déjà déclarés sur le site.
-->
<script lang="ts">
	import { LinkArrow, Seo } from '$lib/components';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
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
/>

<section class="section section--tight" aria-label="Article">
	<div class="container">
		<div class="stack stack--lg text">
			<p class="meta">
				Par Sébastien Maurice · Publié le {dateFr(a.published)}
				{#if a.modified !== a.published}· Mis à jour le {dateFr(a.modified)}{/if}
			</p>

			{#each a.sections as s, i (s.title)}
				<section class="stack stack--sm" aria-labelledby="s-{i}">
					<h2 class="t-h3" id="s-{i}">{s.title}</h2>
					{#each s.paragraphs ?? [] as p, j (j)}
						<p>{p}</p>
					{/each}
					{#if s.list}
						<ul class="bullets">
							{#each s.list as item, k (k)}
								<li>{item}</li>
							{/each}
						</ul>
					{/if}
					{#if s.after}<p>{s.after}</p>{/if}
				</section>
			{/each}

			{#if sprint}
				<section class="callout stack stack--sm" aria-labelledby="s-offre">
					<h2 class="t-h3" id="s-offre">Un problème sur votre site ?</h2>
					<p>
						Diagnostic, devis, puis intervention ciblée sur un site WordPress ou WooCommerce
						existant.
					</p>
					<p class="callout__links">
						<LinkArrow href={offerPath(sprint)}>Le dépannage WordPress et WooCommerce</LinkArrow>
						<LinkArrow href="/contact/?offre={sprint.slug}">{sprint.cta}</LinkArrow>
					</p>
				</section>
			{/if}

			<section class="stack stack--sm" aria-labelledby="s-sources">
				<h2 class="t-h3" id="s-sources">Sources</h2>
				<p>Pages consultées le {a.sourcesChecked}.</p>
				<ul class="sources">
					{#each a.sources as src (src.url)}
						<li>
							<a class="link" href={src.url} target="_blank" rel="noopener"
								>{src.label}<span class="sr-only"> (nouvel onglet)</span></a
							>
							<span class="sources__note">{src.note}</span>
						</li>
					{/each}
				</ul>
			</section>

			<p><LinkArrow href="/ressources/">Toutes les ressources</LinkArrow></p>
		</div>
	</div>
</section>

<ContactBlock />

<style>
	.text {
		max-width: 46rem;
	}
	.text p {
		margin: 0;
	}
	.meta {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.stack p {
		color: var(--text-muted);
	}
	.bullets,
	.sources {
		display: grid;
		gap: var(--space-2);
		margin: 0;
		padding-left: var(--space-5);
		color: var(--text-muted);
	}
	.sources {
		list-style: none;
		padding-left: 0;
		gap: var(--space-3);
	}
	.sources li {
		display: grid;
		gap: var(--space-1);
	}
	.sources__note {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.callout {
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.callout__links {
		display: grid;
		gap: var(--space-2);
		font-weight: var(--weight-semibold);
	}
</style>
