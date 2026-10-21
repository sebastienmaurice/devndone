<!--
	Prix d'une offre (variante B validée le 21/10/2026) : libellé constant en capitales au-dessus
	(« Forfait », « À partir de », « Tarif journalier », « Prix unique », « Par mois »), montant en
	Plus Jakarta Sans ExtraBold bleu nuit, chiffres à chasse fixe, « € » plus petit, unité éventuelle.
	Couleurs pilotables par le parent (survol d'une carte orange) : --price-color, --price-muted.
	`size` : `card` (cartes) ou `hero` (en-tête des pages d'offre).
-->
<script lang="ts">
	type Props = {
		label: string;
		/** Montant sans le symbole « € » */
		value: string;
		unit?: string;
		size?: 'card' | 'hero';
	};

	let { label, value, unit, size = 'card' }: Props = $props();
</script>

<p class="price price--{size}">
	<span class="price__label">{label}</span>
	<span class="price__amount"
		>{value}<span class="price__currency">€</span>{#if unit}<span class="price__unit">
				{unit}</span
			>{/if}</span
	>
</p>

<style>
	.price {
		display: grid;
		gap: 2px;
		margin: 0;
	}
	.price__label {
		font-size: var(--text-label);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--price-muted, var(--text-subtle));
		transition: color var(--duration-reveal) var(--ease-out);
	}
	.price__amount {
		font-family: var(--font-ui);
		font-weight: var(--weight-extrabold);
		font-size: clamp(1.875rem, 1.6rem + 0.8vw, 2.25rem);
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.02em;
		line-height: 1.05;
		white-space: nowrap;
		color: var(--price-color, var(--text));
		transition: color var(--duration-reveal) var(--ease-out);
	}
	.price--hero .price__amount {
		font-size: clamp(2.25rem, 1.8rem + 1.6vw, 3.25rem);
	}
	.price__currency {
		margin-left: 0.12em;
		font-size: 0.6em;
		font-weight: var(--weight-bold);
	}
	.price__unit {
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
		letter-spacing: 0;
		color: var(--price-muted, var(--text-muted));
	}
</style>
