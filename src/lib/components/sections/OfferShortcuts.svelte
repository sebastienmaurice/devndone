<!--
	Accès directs aux offres (content/tarifs.ts), pour l'accueil et la page Services (maillage
	interne, 11/11/2026) : titre repris de `offersIntro`, une carte lien par offre (nom, pastille
	du catalogue, prix en PriceTag), mention de TVA et lien vers /tarifs/. Aucun texte nouveau :
	noms, pastilles et prix viennent du catalogue. Prix sans « HT » (franchise en base de TVA).
-->
<script lang="ts">
	import AccentTitle from '../brand/AccentTitle.svelte';
	import Icon from '../brand/Icon.svelte';
	import SectionLabel from '../brand/SectionLabel.svelte';
	import LinkArrow from '../ui/LinkArrow.svelte';
	import PriceTag from '../ui/PriceTag.svelte';
	import {
		offerPath,
		offers,
		offersIntro,
		priceParts,
		vatNotice,
		type Offer
	} from '$lib/content/tarifs';

	type Props = {
		/** Slugs des offres à afficher, dans l'ordre */
		only: readonly string[];
		/** Identifiant du titre (aria-labelledby de la section) */
		titleId?: string;
	};

	let { only, titleId = 'forfaits-title' }: Props = $props();

	const shown = $derived(
		only.map((slug) => offers.find((o) => o.slug === slug)).filter((o): o is Offer => !!o)
	);
</script>

<div class="offers">
	<header class="offers__head">
		<SectionLabel label="Tarifs" align="center" />
		<h2 class="t-h2" id={titleId}>
			<AccentTitle text={offersIntro.title} accent={offersIntro.accent} />
		</h2>
		<p>{offersIntro.lede}</p>
	</header>

	<ul class="offers__list" role="list">
		{#each shown as offer (offer.slug)}
			<li>
				<a class="offer" href={offerPath(offer)}>
					<h3 class="offer__name">{offer.name}</h3>
					<span class="offer__badge">{offer.badge}</span>
					<PriceTag {...priceParts(offer)} />
					<span class="offer__go" aria-hidden="true"><Icon name="arrow-right" /></span>
				</a>
			</li>
		{/each}
	</ul>

	<p class="offers__note">{vatNotice}</p>
	<p class="offers__all"><LinkArrow href="/tarifs/">Voir tous les tarifs</LinkArrow></p>
</div>

<style>
	.offers__head {
		display: grid;
		justify-items: center;
		gap: var(--space-3);
		max-width: 64rem;
		margin: 0 auto var(--space-7);
		text-align: center;
	}
	.offers__head p {
		max-width: 40rem;
		margin: 0;
		color: var(--text-muted);
	}
	.offers__list {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: minmax(0, 1fr);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 640px) {
		.offers__list {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (min-width: 1024px) {
		.offers__list {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	.offer {
		position: relative;
		display: grid;
		gap: var(--space-2);
		align-content: start;
		height: 100%;
		padding: var(--space-5) var(--space-4);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		color: var(--text);
		text-decoration: none;
		transition: border-color var(--duration-base) var(--ease-out);
	}
	.offer:hover {
		border-color: var(--action);
	}
	.offer__name {
		margin: 0;
		padding-right: var(--space-6);
		font-size: clamp(1.375rem, 1.25rem + 0.4vw, 1.625rem);
		line-height: 1.1;
		text-wrap: balance;
	}
	.offer__badge {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.offer__go {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		color: var(--action-alt-text);
	}
	.offers__note {
		margin: var(--space-4) 0 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
		text-align: center;
	}
	.offers__all {
		margin: var(--space-3) 0 0;
		text-align: center;
		font-weight: var(--weight-semibold);
	}
</style>
