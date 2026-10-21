<!--
	Cartes d'offre (content/tarifs.ts) : pastille (limite de travail ou mode de chiffrage), nom, prix
	(composant PriceTag : libellé « Forfait », « À partir de », « Tarif journalier » ou « Prix unique »), illustration,
	puis « Découvrir l'offre » (page détaillée) et « En parler » (prise de rendez-vous).
	`only` : slugs à afficher (pages de services) ; `group` : création ou interventions ponctuelles.
	Prix affichés sans « HT » : franchise en base de TVA.
	Illustration de la mascotte (assets/tarifs/visuels.ts) : au repos, la carte montre l'illustration ;
	au survol (carte orange), l'illustration laisse la place au résumé. Sans survol possible
	(écrans tactiles), les deux restent affichés l'un sous l'autre.
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
			<div class="package__price"><PriceTag {...priceParts(offer)} /></div>
			<div class="package__swap">
				{#if visual}
					<div class="package__visual">
						<enhanced:img
							src={visual.src}
							alt={visual.alt}
							sizes="(min-width: 1100px) 300px, (min-width: 640px) 45vw, 90vw"
							loading="lazy"
						/>
					</div>
				{/if}
				<p class="package__text">{offer.summary}</p>
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
	.packages {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.package {
		display: grid;
		/* Lignes partagées avec les cartes voisines (subgrid) : pastille, nom, prix, illustration et
		   liens restent alignés d'une carte à l'autre, quelle que soit la longueur du nom */
		grid-row: span 5;
		grid-template-rows: subgrid;
		align-items: start;
		gap: var(--space-2);
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		scroll-margin-top: 110px;
		transition:
			background-color var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			transform var(--duration-reveal) var(--ease-out);
	}
	/* Survol : la carte passe à l'orange, tout le contenu en Bleu nuit (8.24 : 1), prix en blanc */
	.package:hover,
	.package:focus-within {
		transform: translateY(-6px);
		background: var(--action);
		border-color: var(--action);
		box-shadow: var(--shadow-card-hover);
	}
	.package:hover :is(.package__delay, .package__name, .package__text),
	.package:focus-within :is(.package__delay, .package__name, .package__text) {
		color: var(--on-action);
	}
	/* Prix en Bleu nuit sur l'orange (8.24 : 1) */
	.package:hover .package__price,
	.package:focus-within .package__price {
		--price-color: var(--on-action);
		--price-muted: var(--on-action);
		border-color: var(--on-action);
	}
	.package:hover :is(.package__cta, .package__talk),
	.package:focus-within :is(.package__cta, .package__talk) {
		color: var(--on-action);
	}
	@media (prefers-reduced-motion: reduce) {
		.package {
			transition-property: background-color, border-color, box-shadow;
		}
		.package:hover,
		.package:focus-within {
			transform: none;
		}
	}
	/* Délai en pastille (essai) : bleu océan très clair (--tag-bg) sur la carte, texte Bleu nuit, icône bleu océan */
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
		color: var(--tag-text);
	}
	/* Nom en grand, réparti sur deux lignes équilibrées pour un rythme régulier d'une carte à l'autre */
	.package__name {
		max-width: 11ch;
		margin: var(--space-2) 0 0;
		font-size: clamp(1.75rem, 1.55rem + 0.4vw, 2rem);
		line-height: 1.05;
		text-wrap: balance;
	}
	/* Coupure imposée par les données : pas de limite de largeur */
	.package__name--lines {
		max-width: none;
	}
	/* Prix (variante B) : filet au-dessus, libellé constant, montant en Bleu nuit (PriceTag) */
	.package__price {
		align-self: end;
		margin-top: var(--space-2);
		padding-top: var(--space-3);
		border-top: 1px solid var(--line);
		transition: border-color var(--duration-reveal) var(--ease-out);
	}
	.package__text {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	/* Illustration (fond blanc fondu dans la carte) puis description */
	/* Calé en bas de la carte, juste au-dessus du lien : les illustrations s'alignent d'une carte à l'autre */
	.package__swap {
		align-self: end;
		display: grid;
		gap: var(--space-3);
		align-items: center;
	}
	.package__visual {
		aspect-ratio: 919 / 754;
		margin-inline: calc(-1 * var(--space-2));
	}
	.package__visual :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
		/* Effacement rapide : le fond blanc de l'image ne doit pas se voir sur l'orange */
		transition:
			opacity var(--duration-micro) var(--ease-out),
			transform var(--duration-reveal) var(--ease-out);
	}
	/* Écrans à survol : illustration et description dans la même case ; au survol, l'illustration
	   s'efface (son fond blanc ne doit pas apparaître sur l'orange) et la description apparaît */
	@media (hover: hover) {
		.package--visual .package__swap > :global(*) {
			grid-area: 1 / 1;
		}
		.package--visual .package__text {
			opacity: 0;
			transform: translateY(8px);
			transition:
				opacity var(--duration-reveal) var(--ease-out),
				transform var(--duration-reveal) var(--ease-out);
		}
		.package--visual:hover .package__text,
		.package--visual:focus-within .package__text {
			opacity: 1;
			transform: none;
		}
		.package--visual:hover .package__visual :global(img),
		.package--visual:focus-within .package__visual :global(img) {
			opacity: 0;
			transform: scale(0.96);
		}
	}
	.package__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2) var(--space-4);
		margin-top: var(--space-3);
		padding-top: var(--space-3);
		border-top: 1px solid var(--line);
	}
	.package__talk {
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
		color: var(--text-muted);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
