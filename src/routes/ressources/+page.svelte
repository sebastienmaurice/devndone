<!--
	Ressources : liste des articles pratiques (content/ressources.ts). Pas dans le menu principal ;
	accès par le pied de page et par les liens des pages d'offre concernées.
-->
<script lang="ts">
	import { Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import { articlePath, articles, ressourcesPage } from '$lib/content/ressources';

	const dateFr = (iso: string) =>
		new Date(iso).toLocaleDateString('fr-FR', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: 'UTC'
		});
</script>

<Seo
	title={ressourcesPage.seoTitle}
	path={ressourcesPage.path}
	description={ressourcesPage.description}
/>

<PageIntro
	label={ressourcesPage.label}
	heading={ressourcesPage.title}
	accent={ressourcesPage.accent}
	lede={ressourcesPage.lede}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Ressources' }]}
/>

<section class="section section--tight" aria-label="Articles">
	<div class="container">
		<ul class="articles" role="list">
			{#each articles as article (article.slug)}
				<li>
					<a class="article" href={articlePath(article.slug)}>
						<span class="article__date">Publié le {dateFr(article.published)}</span>
						<h2 class="article__title">{article.title}</h2>
						<span class="article__lede">{article.description}</span>
						<span class="article__go" aria-hidden="true"><Icon name="arrow-right" /></span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<ContactBlock />

<style>
	.articles {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: minmax(0, 1fr);
		max-width: 46rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.article {
		position: relative;
		display: grid;
		gap: var(--space-2);
		padding: var(--space-5) var(--space-6) var(--space-5) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		color: var(--text);
		text-decoration: none;
		transition: border-color var(--duration-base) var(--ease-out);
	}
	.article:hover {
		border-color: var(--action);
	}
	.article__date {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.article__title {
		margin: 0;
		font-size: clamp(1.375rem, 1.25rem + 0.4vw, 1.625rem);
		line-height: 1.15;
		text-wrap: balance;
	}
	.article__lede {
		color: var(--text-muted);
	}
	.article__go {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		color: var(--action-alt-text);
	}
</style>
