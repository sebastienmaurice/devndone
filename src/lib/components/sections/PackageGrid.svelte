<!--
	Cartes d'offre (content/tarifs.ts), même structure pour toutes : pastille (limite de travail ou
	mode de chiffrage), nom, description courte, filet, prix (composant PriceTag : libellé
	« Forfait », « À partir de », « Tarif journalier » ou « Prix unique ») à gauche et illustration de
	la mascotte à droite dans une zone dédiée, puis « Découvrir l'offre » (page détaillée) et
	« En parler » (prise de rendez-vous).
	`only` : slugs à afficher (pages de services) ; `group` : création ou interventions ponctuelles.
	Prix affichés sans « HT » : franchise en base de TVA.
	Grille (refonte du 24/10/2026) : 3 colonnes pour 3 ou 6 offres, 2 colonnes pour 2 ou 4 offres
	(pas de carte seule sur sa rangée), une carte de largeur limitée pour une offre unique.
	Survol : la carte reste blanche (filet orange, légère élévation, flèche qui glisse) ; plus de
	fond orange intégral.
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
	// Nombre de colonnes sur grand écran, choisi pour ne jamais laisser une carte seule sur sa rangée
	const layout = $derived(
		shown.length === 1 ? 'single' : shown.length % 3 === 0 || shown.length >= 5 ? 'thirds' : 'pairs'
	);
</script>

<ul class="packages packages--{layout}" role="list">
	{#each shown as offer (offer.slug)}
		{@const visual = offerVisuals[offer.slug]}
		<li class="package">
			<p class="package__delay"><Icon name="clock" size="sm" />{offer.badge}</p>
			<svelte:element
				this={`h${headingLevel}`}
				class="package__name"
				class:package__name--lines={!!offer.cardLines}
				>{#if offer.cardLines}{offer.cardLines[0] + ' '}<br />{offer
						.cardLines[1]}{:else}{offer.name}{/if}</svelte:element
			>
			<p class="package__text">{offer.summary}</p>
			<div class="package__body" class:package__body--visual={!!visual}>
				<div class="package__price"><PriceTag {...priceParts(offer)} /></div>
				{#if visual}
					<div class="package__visual">
						<enhanced:img
							src={visual.src}
							alt={visual.alt}
							sizes="(min-width: 1100px) 240px, (min-width: 720px) 280px, 60vw"
							loading="lazy"
						/>
					</div>
				{/if}
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
	/* Une colonne sur mobile, deux sur tablette, trois sur grand écran (3 ou 6 offres) */
	.packages {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: minmax(0, 1fr);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 720px) {
		.packages:not(.packages--single) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (min-width: 1100px) {
		.packages.packages--thirds {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	.packages--single {
		grid-template-columns: minmax(0, 30rem);
	}
	.package {
		/* Requêtes de conteneur : prix et illustration côte à côte quand la carte est assez large */
		container-type: inline-size;
		display: grid;
		/* Lignes partagées avec les cartes voisines (subgrid) : pastille, nom, description, prix et
		   liens restent alignés d'une carte à l'autre, quelle que soit la longueur des textes */
		grid-row: span 5;
		grid-template-rows: subgrid;
		align-items: start;
		gap: var(--space-3);
		padding: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		scroll-margin-top: 110px;
		transition:
			border-color var(--duration-base) var(--ease-out),
			box-shadow var(--duration-base) var(--ease-out),
			transform var(--duration-base) var(--ease-out);
	}
	/* Survol et focus clavier : la carte reste blanche, filet orange et légère élévation */
	.package:focus-within {
		border-color: var(--action);
		box-shadow: var(--shadow-card-hover);
	}
	@media (hover: hover) {
		.package:hover {
			transform: translateY(-4px);
			border-color: var(--action);
			box-shadow: var(--shadow-card-hover);
		}
		.package:hover .package__cta :global(svg) {
			transform: translateX(4px);
		}
		.package:hover .package__visual :global(img) {
			transform: scale(1.03);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.package {
			transition-property: border-color, box-shadow;
		}
		.package:hover {
			transform: none;
		}
		.package:hover .package__visual :global(img) {
			transform: none;
		}
	}
	/* Délai en pastille : bleu océan très clair (--tag-bg), texte Bleu nuit, icône bleu océan */
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
	/* Nom en grand, réparti sur deux lignes équilibrées pour un rythme régulier d'une carte à l'autre */
	.package__name {
		max-width: 11ch;
		margin: var(--space-1) 0 0;
		font-size: clamp(1.75rem, 1.55rem + 0.4vw, 2rem);
		line-height: 1.05;
		text-wrap: balance;
	}
	/* Coupure imposée par les données : pas de limite de largeur */
	.package__name--lines {
		max-width: none;
	}
	.package__text {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	/* Prix puis illustration, sous un filet ; calés en bas de leur ligne pour que les prix et les
	   mascottes s'alignent d'une carte à l'autre */
	.package__body {
		align-self: end;
		display: grid;
		gap: var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--line);
	}
	/* Zone dédiée à la mascotte : même proportion pour toutes les illustrations (919 × 754, fond
	   blanc fondu dans la carte), jamais sous le texte */
	.package__visual {
		justify-self: center;
		width: min(100%, 16rem);
		aspect-ratio: 919 / 754;
	}
	.package__visual :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
		transition: transform var(--duration-base) var(--ease-out);
	}
	/* Carte assez large : prix à gauche (en haut), mascotte à droite */
	@container (min-width: 20rem) {
		.package__body--visual {
			/* Part fixe pour la mascotte : même taille dans toutes les cartes, quel que soit le prix */
			grid-template-columns: minmax(0, 1fr) 55%;
			gap: var(--space-3);
			align-items: start;
		}
		.package__body--visual .package__visual {
			justify-self: end;
			width: min(100%, 17rem);
		}
	}
	.package__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2) var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--line);
	}
	.package__talk {
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
		color: var(--text-muted);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.package__talk:hover {
		color: var(--text);
	}
</style>
