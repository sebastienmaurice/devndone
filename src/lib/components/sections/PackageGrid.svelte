<!--
	Forfaits à prix fermé (content/tarifs.ts), cartes blanches de la maquette du 19/10/2026 :
	délai, nom, prix, contenu, lien de prise de rendez-vous. `only` : liste des noms à afficher
	(pages de services). La carte « Boutique WooCommerce » porte l'ancre #woocommerce.
	Textes et montants du site en ligne, inchangés.
-->
<script lang="ts">
	import { links } from '$lib/content/studio';
	import { packages } from '$lib/content/tarifs';
	import Icon from '../brand/Icon.svelte';

	type Props = { only?: readonly string[]; headingLevel?: 2 | 3 | 4 };

	let { only, headingLevel = 3 }: Props = $props();

	const shown = $derived(only ? packages.filter((p) => only.includes(p.name)) : packages);
	const anchor = (name: string) => (name === 'Boutique WooCommerce' ? 'woocommerce' : undefined);
</script>

<ul class="packages" role="list">
	{#each shown as pack (pack.name)}
		<li class="package" id={anchor(pack.name)}>
			<p class="package__delay"><Icon name="clock" size="sm" />{pack.delay}</p>
			<svelte:element this={`h${headingLevel}`} class="package__name">{pack.name}</svelte:element>
			<p class="package__price">{pack.price} <span>HT</span></p>
			<p class="package__text">{pack.text}</p>
			<a class="link-arrow package__cta" href={links.calendly} target="_blank" rel="noopener"
				>En parler<Icon name="arrow-up-right" /><span class="sr-only"
					>: {pack.name} (prise de rendez-vous, nouvel onglet)</span
				></a
			>
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
		grid-template-rows: auto auto auto 1fr auto;
		gap: var(--space-2);
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		scroll-margin-top: 110px;
	}
	.package__delay {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		margin: 0;
		font-size: var(--text-caption);
		font-weight: var(--weight-bold);
		color: var(--text-muted);
	}
	.package__name {
		margin: var(--space-2) 0 0;
		font-size: var(--text-h3);
	}
	.package__price {
		margin: 0;
		font-size: var(--text-h2);
		font-weight: var(--weight-extrabold);
		letter-spacing: -0.03em;
		line-height: 1.1;
	}
	.package__price span {
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
		letter-spacing: 0;
		color: var(--text-muted);
	}
	.package__text {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.package__cta {
		margin-top: var(--space-3);
	}
</style>
