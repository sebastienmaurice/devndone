<!--
	Forfaits à prix fermé (content/tarifs.ts), en cartes à image (design system v1.1) : visuel dans une
	forme organique (tuile d'icône en attendant les poses de la mascotte), délai, nom, prix, contenu.
	Chaque carte mène à la prise de rendez-vous (nouvel onglet) ; le bouton rond est décoratif.
	Textes et montants du site en ligne, inchangés.
-->
<script lang="ts">
	import { links } from '$lib/content/studio';
	import { packages, packagesIntro } from '$lib/content/tarifs';
	import Icon, { type IconName } from '../brand/Icon.svelte';

	let { headingLevel = 3 }: { headingLevel?: 2 | 3 | 4 } = $props();

	const icon: Record<string, IconName> = {
		'Audit technique WordPress': 'search',
		'Lancement site WordPress': 'rocket',
		'Landing page WordPress': 'site',
		'Refonte WordPress PME': 'layers',
		'Boutique WooCommerce': 'cart',
		'Audit automatisation': 'workflow'
	};
</script>

<ul class="auto-grid packages" role="list">
	{#each packages as pack (pack.name)}
		<li class="media-card">
			<a class="media-card__body" href={links.calendly} target="_blank" rel="noopener">
				<div class="media-card__media media-card__media--organic package__media">
					<span class="package__tile"><Icon name={icon[pack.name] ?? 'sparkles'} /></span>
				</div>
				<div class="media-card__text">
					<p class="t-tech">{pack.delay}</p>
					<svelte:element this={`h${headingLevel}`} class="t-h3">{pack.name}</svelte:element>
					<p class="offer__price">
						<span class="offer__amount">{pack.price}</span>
						<span class="offer__unit">HT</span>
					</p>
					<p>{pack.text}</p>
					<span class="sr-only">Prendre rendez-vous (nouvel onglet)</span>
				</div>
			</a>
			<span class="media-card__go" aria-hidden="true"><Icon name="arrow-up-right" /></span>
		</li>
	{/each}
</ul>
<p class="t-body-sm t-muted t-measure">{packagesIntro.note}</p>

<style>
	.packages {
		--auto-min: 18rem;
	}
	.package__media {
		display: grid;
		place-items: center;
		aspect-ratio: 16 / 9;
		background: color-mix(in srgb, var(--text) 6%, transparent);
	}
	.package__tile {
		display: grid;
		place-items: center;
		width: 28%;
		aspect-ratio: 1;
		border-radius: var(--radius-tile);
		background: var(--bg);
		color: var(--action-alt-text);
	}
	.package__tile :global(.icon) {
		width: 45%;
		height: 45%;
		stroke-width: 1.5;
	}
</style>
