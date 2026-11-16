<!--
	Cartes d'offre (content/tarifs.ts). `only` : slugs à afficher (pages de services) ; `group` :
	création ou interventions ponctuelles. Prix affichés sans « HT » : franchise en base de TVA.

	Tout est visible au repos, sur tous les écrans (audit du 16/11/2026 : le prix ne doit jamais
	dépendre du survol) : pastille, nom, description, mascotte, éléments compris, prix, liens.
	Au survol ou au focus clavier : simple mise en valeur, filet orange, ombre plus marquée,
	« Découvrir l'offre » devient un bouton orange.

	Éléments compris : les trois premières lignes de « Ce qui est compris » (offer.includes) assez
	courtes pour la carte (52 caractères au plus), reprises mot pour mot, sans troncature.

	Grille (24/10/2026) : 1 colonne, 2 dès 640 px, 3 dès 1024 px, 4 dès 1280 px (en dessous, le bouton du survol et « En parler » ne tiennent plus sur une ligne). Colonnes de largeur
	fixe : une rangée incomplète garde des cartes de même largeur que les autres.
-->
<script lang="ts">
	import { links } from '$lib/content/studio';
	import { offerPath, offers, priceParts, type Offer } from '$lib/content/tarifs';
	import PriceTag from '../ui/PriceTag.svelte';
	import { offerVisuals } from '$lib/assets/tarifs/visuels';
	import Icon from '../brand/Icon.svelte';

	type Props = {
		only?: readonly string[];
		group?: Offer['group'];
		headingLevel?: 2 | 3 | 4;
	};

	let { only, group, headingLevel = 3 }: Props = $props();

	const shown = $derived(
		offers.filter((o) => (!only || only.includes(o.slug)) && (!group || o.group === group))
	);

	/** Longueur maximale d'un élément compris affiché sur la carte */
	const featureMax = 52;
	const features = (o: Offer) => o.includes.filter((i) => i.length <= featureMax).slice(0, 3);
</script>

<ul class="packages" role="list">
	{#each shown as offer (offer.slug)}
		{@const visual = offerVisuals[offer.slug]}
		<li class="package" class:package--visual={!!visual}>
			<p class="package__delay"><Icon name="clock" size="sm" />{offer.badge}</p>
			<svelte:element
				this={`h${headingLevel}`}
				class="package__name"
				class:package__name--lines={!!offer.cardLines}
				>{#if offer.cardLines}{offer.cardLines[0] + ' '}<br />{offer
						.cardLines[1]}{:else}{offer.name}{/if}</svelte:element
			>
			<p class="package__text">{offer.summary}</p>
			<div class="package__stage">
				{#if visual}
					<div class="package__visual">
						<enhanced:img
							src={visual.src}
							alt={visual.alt}
							sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
							loading="lazy"
						/>
					</div>
				{/if}
				<div class="package__deal">
					<ul class="package__features" role="list">
						{#each features(offer) as item (item)}
							<li><Icon name="check" size="sm" />{item}</li>
						{/each}
					</ul>
					<div class="package__price"><PriceTag {...priceParts(offer)} size="hero" /></div>
				</div>
			</div>
			<div class="package__actions">
				<a class="link-arrow package__cta" href={offerPath(offer)}
					>Découvrir l'offre<Icon name="arrow-right" /><span class="sr-only">: {offer.name}</span
					></a
				>
				<a class="package__talk" href={links.calendly} target="_blank" rel="noopener"
					>En parler<span class="sr-only">
						: {offer.name} (prise de rendez-vous, nouvel onglet)</span
					></a
				>
			</div>
		</li>
	{/each}
</ul>

<style>
	/* Colonnes de largeur fixe : les cartes d'une rangée incomplète ne s'étirent pas */
	.packages {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: minmax(0, 1fr);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 640px) {
		.packages {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (min-width: 1024px) {
		.packages {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	@media (min-width: 1280px) {
		.packages {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	.package {
		display: grid;
		/* Lignes partagées avec les cartes voisines (subgrid) : pastille, nom, description, zone
		   visuelle et liens restent alignés d'une carte à l'autre */
		grid-row: span 5;
		grid-template-rows: subgrid;
		align-items: start;
		gap: var(--space-3);
		padding: var(--space-5) var(--space-4);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		scroll-margin-top: 110px;
		transition:
			border-color var(--duration-base) var(--ease-out),
			box-shadow var(--duration-base) var(--ease-out);
	}
	/* Délai en pastille : bleu océan très clair, texte Bleu nuit, icône bleu océan */
	.package__delay {
		justify-self: start;
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		margin: 0;
		padding: 0.3rem var(--space-3) 0.3rem var(--space-2);
		border-radius: 999px;
		background: var(--tag-bg);
		font-size: var(--text-caption);
		font-weight: var(--weight-bold);
		color: var(--text);
	}
	.package__delay :global(.icon) {
		flex: none;
		color: var(--tag-text);
	}
	/* Nom en grand, réparti sur deux lignes équilibrées */
	.package__name {
		max-width: 11ch;
		margin: var(--space-1) 0 0;
		font-size: clamp(1.625rem, 1.45rem + 0.4vw, 1.875rem);
		line-height: 1.05;
		text-wrap: balance;
	}
	.package__name--lines {
		max-width: none;
	}
	.package__text {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	/* Zone visuelle : mascotte, puis éléments compris et prix */
	.package__stage {
		align-self: stretch;
		display: grid;
		gap: var(--space-4);
		align-content: start;
	}
	.package__visual {
		justify-self: center;
		width: min(100%, 17rem);
		aspect-ratio: 919 / 754;
	}
	.package__visual :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	.package__deal {
		display: grid;
		gap: var(--space-4);
		align-content: start;
	}
	/* Avec mascotte : éléments compris et prix calés en bas de la zone (partagée par la rangée),
	   pour que les prix soient à la même hauteur d'une carte à l'autre */
	.package--visual .package__stage {
		grid-template-rows: auto 1fr;
	}
	.package--visual .package__deal {
		align-content: end;
	}
	.package__features {
		display: grid;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--text-body-sm);
		color: var(--text);
	}
	.package__features li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-2);
		align-items: start;
	}
	.package__features :global(.icon) {
		margin-top: 0.15em;
		color: var(--accent-text);
	}
	.package__price {
		padding-top: var(--space-3);
		border-top: 1px solid var(--line);
	}
	.package__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
		padding-top: var(--space-4);
		border-top: 1px solid var(--line);
	}
	/* Hauteur constante : le lien a déjà la hauteur du bouton qu'il devient au survol */
	.package__cta {
		min-height: 2.5rem;
		padding-inline: 0;
		border-radius: var(--radius-btn);
		transition:
			background-color var(--duration-base) var(--ease-out),
			color var(--duration-base) var(--ease-out),
			padding var(--duration-base) var(--ease-out);
	}
	.package__talk {
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
		color: var(--text-muted);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	/* Survol et focus clavier : mise en valeur seulement, aucun contenu masqué au repos */
	@media (hover: hover) {
		.package:is(:hover, :focus-within) {
			border-color: var(--action);
			box-shadow: var(--shadow-card-hover);
		}
		.package:is(:hover, :focus-within) .package__cta {
			padding-inline: var(--space-3);
			background: var(--action);
			color: var(--text);
		}
		.package:is(:hover, :focus-within) .package__cta :global(svg) {
			transform: translateX(4px);
		}
	}
</style>
