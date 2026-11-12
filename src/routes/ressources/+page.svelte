<!--
	Ressources : page d'accueil du blog, en grille de cartes (inspiration : maquette de blog fournie).
	En-tête avec la mascotte à droite du titre (fond blanc fondu en multiply). Carte principale
	pour le dernier guide (mascotte sur fond bleu océan très clair), carte des sujets abordés,
	carte « sources », carte d'appel vers le dépannage (prix et conditions : content/tarifs.ts) et
	carte contact. Aucun article inventé : seules les entrées de content/ressources.ts sont listées.
	Pas dans le menu principal ; accès par le pied de page et les pages d'offre concernées.
-->
<script lang="ts">
	import { Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import heroMascot from '$lib/assets/mascotte/mascotte-renard-dev-n-done-guides-wordpress-woocommerce.webp?enhanced&w=1200;720;360';
	import cardMascot from '$lib/assets/mascotte/mascotte-renard-dev-n-done-formulaire-message-envoye-loupe.webp?enhanced&w=720;360';
	import { articlePath, articles, ressourcesPage } from '$lib/content/ressources';
	import { offerPath, offers } from '$lib/content/tarifs';

	const feature = articles[0];
	const sprint = offers.find((o) => o.slug === 'sprint-wordpress-woocommerce');

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
>
	{#snippet aside()}
		<div class="hero-art">
			<enhanced:img
				src={heroMascot}
				alt="Dev, la mascotte de Dev'n Done, souriant devant son ordinateur portable, entouré des logos WordPress et WooCommerce, de code, d'un téléphone, de livres et d'un graphique"
				sizes="(min-width: 1100px) 560px, 92vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
</PageIntro>

{#if feature}
	<section class="section section--tight" aria-label="Guides">
		<div class="container">
			<div class="bento">
				<!-- Dernier guide : grande carte -->
				<a class="tile tile--feature" href={articlePath(feature.slug)}>
					<div class="tile__visual">
						<enhanced:img
							src={cardMascot}
							alt=""
							sizes="(min-width: 1000px) 340px, (min-width: 640px) 45vw, 90vw"
							loading="lazy"
						/>
						<span class="chip chip--new">Nouveau</span>
					</div>
					<div class="tile__body">
						<p class="tile__meta">Guide · Publié le {dateFr(feature.published)}</p>
						<h2 class="tile__title">{feature.title}</h2>
						<p class="tile__text">{feature.description}</p>
						<span class="tile__go">Lire le guide <Icon name="arrow-right" /></span>
					</div>
				</a>

				<!-- Sujets abordés -->
				<div class="tile tile--tags">
					<h2 class="tile__small">Sujets abordés</h2>
					<ul class="pills" role="list">
						{#each feature.tags as tag (tag)}
							<li class="pill">{tag}</li>
						{/each}
					</ul>
				</div>

				<!-- Sources -->
				<div class="tile tile--night surface-night">
					<span class="tile__icon" aria-hidden="true"><Icon name="check" /></span>
					<h2 class="tile__small">Des sources citées</h2>
					<p>
						Chaque guide renvoie aux pages consultées, avec la date de lecture, pour que vous
						puissiez vérifier par vous-même.
					</p>
				</div>

				<!-- Dépannage -->
				{#if sprint}
					<a class="tile tile--cta" href={offerPath(sprint)}>
						<h2 class="tile__small">Un problème sur votre site ?</h2>
						<p>Diagnostic, devis, puis intervention ciblée sur un site WordPress ou WooCommerce.</p>
						<p class="tile__badge">{sprint.badge}</p>
						<span class="tile__go">Le dépannage <Icon name="arrow-right" /></span>
					</a>
				{/if}

				<!-- Contact -->
				<a class="tile tile--ask" href="/contact/">
					<h2 class="tile__small">Une question, un sujet à traiter ?</h2>
					<p>Écrivez-moi : je réponds directement.</p>
					<span class="tile__go">Me contacter <Icon name="arrow-right" /></span>
				</a>
			</div>
		</div>
	</section>
{/if}

<ContactBlock />

<style>
	/* Mascotte à droite du titre : fond blanc fondu dans l'Ivoire */
	.hero-art {
		max-width: 38rem;
		margin-inline: auto;
		aspect-ratio: 3 / 2;
	}
	.hero-art :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}

	/* Grille de cartes : 1 colonne, 2 dès 640 px, 3 dès 1000 px */
	.bento {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: minmax(0, 1fr);
	}
	@media (min-width: 640px) {
		.bento {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.tile--feature {
			grid-column: 1 / -1;
		}
	}
	@media (min-width: 1000px) {
		.bento {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			grid-template-rows: auto auto auto;
		}
		.tile--feature {
			grid-column: 1 / 3;
			grid-row: 1 / 3;
		}
		.tile--tags {
			grid-column: 3;
			grid-row: 1;
		}
		.tile--night {
			grid-column: 3;
			grid-row: 2;
		}
		.tile--cta {
			grid-column: 1 / 3;
			grid-row: 3;
		}
		.tile--ask {
			grid-column: 3;
			grid-row: 3;
		}
	}

	.tile {
		position: relative;
		display: grid;
		gap: var(--space-3);
		align-content: start;
		padding: var(--space-6);
		border-radius: calc(var(--radius-card) * 2);
		background: var(--surface);
		border: 1px solid var(--line);
		box-shadow: var(--shadow-card);
		color: var(--text);
		text-decoration: none;
	}
	.tile p {
		margin: 0;
	}
	.tile__small {
		margin: 0;
		font-size: clamp(1.375rem, 1.25rem + 0.4vw, 1.625rem);
		line-height: 1.1;
		text-wrap: balance;
	}
	.tile__go {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		margin-top: var(--space-2);
		font-weight: var(--weight-bold);
		font-size: var(--text-body-sm);
	}
	.tile__go :global(svg) {
		transition: transform var(--duration-base) var(--ease-out);
	}
	a.tile:hover .tile__go :global(svg) {
		transform: translateX(4px);
	}

	/* Carte principale : visuel sur fond bleu océan très clair, texte dessous ou à côté */
	.tile--feature {
		padding: 0;
		overflow: hidden;
		gap: 0;
		grid-template-rows: auto 1fr;
	}
	.tile__visual {
		position: relative;
		display: grid;
		place-items: center;
		background: var(--tag-bg);
		padding: var(--space-5);
	}
	.tile__visual :global(img) {
		display: block;
		width: min(100%, 22rem);
		height: auto;
		mix-blend-mode: multiply;
	}
	.chip {
		position: absolute;
		top: var(--space-4);
		left: var(--space-4);
		padding: var(--space-1) var(--space-3);
		border-radius: 999px;
		background: var(--action);
		color: var(--text);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-extrabold);
	}
	.tile__body {
		display: grid;
		gap: var(--space-3);
		align-content: start;
		padding: var(--space-6);
	}
	.tile__meta {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.tile__title {
		margin: 0;
		font-size: clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem);
		line-height: 1.05;
		text-wrap: balance;
	}
	.tile__text {
		color: var(--text-muted);
		max-width: 40rem;
	}

	/* Sujets abordés */
	.tile--tags {
		background: var(--tag-bg);
		border-color: transparent;
		box-shadow: none;
	}
	.pills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.pill {
		padding: var(--space-1) var(--space-3);
		border-radius: 999px;
		background: var(--surface);
		color: var(--tag-text);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
	}

	/* Sources (carte sombre) */
	.tile--night {
		border-color: transparent;
	}
	.tile--night p {
		color: var(--text-muted);
	}
	.tile__icon {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: var(--action);
		color: var(--bg);
	}

	/* Appel vers le dépannage (carte orange) */
	.tile--cta {
		background: var(--action);
		border-color: transparent;
		color: var(--text);
	}
	.tile__badge {
		font-weight: var(--weight-extrabold);
	}

	/* Contact */
	.tile--ask {
		background: var(--bg);
	}
	.tile--ask p {
		color: var(--text-muted);
	}

	/* Cartes principales : desktop, texte à côté du visuel */
	@media (min-width: 640px) {
		.tile--feature {
			grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
			grid-template-rows: none;
		}
	}
	@media (min-width: 1000px) {
		.tile--feature {
			grid-template-columns: 1fr;
			grid-template-rows: auto 1fr;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		a.tile {
			transition:
				transform var(--duration-base) var(--ease-out),
				box-shadow var(--duration-base) var(--ease-out);
		}
		a.tile:hover {
			transform: translateY(-4px);
			box-shadow: var(--shadow-card-hover);
		}
	}
</style>
