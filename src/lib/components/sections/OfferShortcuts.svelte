<!--
	Accès directs aux offres (content/tarifs.ts), pour l'accueil et la page Services (maillage
	interne, 11/11/2026) : titre repris de `offersIntro`, une carte lien par offre (pictogramme, nom, pastille,
	résumé et prix du catalogue en PriceTag), mention de TVA et lien vers /tarifs/. Aucun texte nouveau :
	noms, pastilles et prix viennent du catalogue. Prix sans « HT » (franchise en base de TVA).
-->
<script lang="ts">
	import AccentTitle from '../brand/AccentTitle.svelte';
	import Icon, { type IconName } from '../brand/Icon.svelte';
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

	/** Pictogramme de chaque offre (présentation seulement, icônes Lucide du composant Icon) */
	const icons: Record<string, IconName> = {
		'landing-page': 'target',
		'site-vitrine-wordpress': 'globe',
		'refonte-site-wordpress': 'sparkles',
		'boutique-woocommerce': 'cart',
		'sprint-wordpress-woocommerce': 'bug',
		'audit-technique-wordpress': 'search',
		'audit-automatisation': 'workflow'
	};
	const iconOf = (slug: string): IconName => icons[slug] ?? 'arrow-right';

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
		{#each shown as offer, i (offer.slug)}
			<li>
				<a class="offer" href={offerPath(offer)}>
					<span class="offer__top" aria-hidden="true">
						<span class="offer__icon"><Icon name={iconOf(offer.slug)} /></span>
						<span class="offer__index">{String(i + 1).padStart(2, '0')}</span>
					</span>
					<h3 class="offer__name">{offer.name}</h3>
					<span class="offer__badge"><Icon name="clock" size="sm" />{offer.badge}</span>
					<span class="offer__summary">{offer.summary}</span>
					<span class="offer__foot">
						<PriceTag {...priceParts(offer)} />
						<span class="offer__go" aria-hidden="true"><Icon name="arrow-right" /></span>
					</span>
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
	/* Carte d'offre (16/11/2026) : pictogramme et numéro, nom, pastille, résumé du catalogue, puis
	   pied avec le prix et un bouton rond. Au survol : la carte se soulève, un filet orange se
	   dessine en haut, le pictogramme et le bouton passent en orange. */
	.offer {
		position: relative;
		display: grid;
		grid-template-rows: auto auto auto 1fr auto;
		gap: var(--space-3);
		height: 100%;
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		color: var(--text);
		text-decoration: none;
		overflow: hidden;
		transition:
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	.offer::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 4px;
		background: var(--action);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--duration-scene) var(--ease-out);
	}
	.offer__top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: var(--space-2);
	}
	.offer__icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius-tile);
		background: var(--tag-bg);
		color: var(--tag-text);
		transition:
			background-color var(--duration-reveal) var(--ease-out),
			color var(--duration-reveal) var(--ease-out),
			transform var(--duration-reveal) var(--ease-out);
	}
	/* Numéro d'ordre en grand, en filigrane (Lilita One, couleur de filet) */
	.offer__index {
		font-family: var(--font-display);
		font-weight: var(--weight-display);
		font-size: 2.75rem;
		line-height: 0.8;
		color: var(--line-strong);
		opacity: 0.45;
		transition:
			color var(--duration-reveal) var(--ease-out),
			opacity var(--duration-reveal) var(--ease-out);
	}
	.offer__name {
		margin: 0;
		font-size: clamp(1.375rem, 1.25rem + 0.4vw, 1.625rem);
		line-height: 1.1;
		text-wrap: balance;
	}
	.offer__badge {
		justify-self: start;
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 0.3rem var(--space-3) 0.3rem var(--space-2);
		border-radius: 999px;
		background: var(--tag-bg);
		font-size: var(--text-caption);
		font-weight: var(--weight-bold);
		color: var(--text);
	}
	.offer__badge :global(.icon) {
		flex: none;
		color: var(--tag-text);
	}
	/* Résumé du catalogue repris en entier, sans troncature */
	.offer__summary {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.offer__foot {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-3);
		margin-top: var(--space-2);
		padding-top: var(--space-4);
		border-top: 1px dashed var(--line-strong);
	}
	.offer__go {
		flex: none;
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		border: 1px solid var(--line-strong);
		color: var(--text);
		transition:
			background-color var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out),
			transform var(--duration-reveal) var(--ease-out);
	}
	.offer__go :global(svg) {
		transition: transform var(--duration-reveal) var(--ease-out);
	}
	.offer:is(:hover, :focus-visible) {
		transform: translateY(-6px);
		border-color: var(--action);
		box-shadow: var(--shadow-card-hover);
	}
	.offer:is(:hover, :focus-visible)::before {
		transform: scaleX(1);
	}
	.offer:is(:hover, :focus-visible) .offer__icon {
		background: var(--action);
		color: var(--text);
		transform: rotate(-6deg);
	}
	.offer:is(:hover, :focus-visible) .offer__index {
		color: var(--accent-deco);
		opacity: 1;
	}
	.offer:is(:hover, :focus-visible) .offer__go {
		background: var(--action);
		border-color: var(--action);
	}
	.offer:is(:hover, :focus-visible) .offer__go :global(svg) {
		transform: translateX(3px) rotate(-45deg);
	}
	@media (prefers-reduced-motion: reduce) {
		.offer,
		.offer__icon,
		.offer__go :global(svg) {
			transform: none !important;
		}
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
