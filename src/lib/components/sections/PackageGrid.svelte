<!--
	Forfaits à prix fermé (content/tarifs.ts), cartes blanches de la maquette du 19/10/2026 :
	délai, nom, prix, contenu, lien de prise de rendez-vous. `only` : liste des noms à afficher
	(pages de services). La carte « Boutique WooCommerce » porte l'ancre #woocommerce.
	Textes et montants du site en ligne, inchangés.
	Illustration de la mascotte (assets/tarifs/visuels.ts) : au repos, la carte montre l'illustration ;
	au survol (carte orange), l'illustration laisse la place à la description. Sans survol possible
	(écrans tactiles), les deux restent affichées l'une sous l'autre.
-->
<script lang="ts">
	import { links } from '$lib/content/studio';
	import { packages } from '$lib/content/tarifs';
	import { packageVisuals } from '$lib/assets/tarifs/visuels';
	import Icon from '../brand/Icon.svelte';

	type Props = { only?: readonly string[]; headingLevel?: 2 | 3 | 4 };

	let { only, headingLevel = 3 }: Props = $props();

	const shown = $derived(only ? packages.filter((p) => only.includes(p.name)) : packages);
	const anchor = (name: string) => (name === 'Boutique WooCommerce' ? 'woocommerce' : undefined);
</script>

<ul class="packages" role="list">
	{#each shown as pack (pack.name)}
		{@const visual = packageVisuals[pack.name]}
		<li class="package" class:package--visual={!!visual} id={anchor(pack.name)}>
			<p class="package__delay"><Icon name="clock" size="sm" />{pack.delay}</p>
			<svelte:element this={`h${headingLevel}`} class="package__name">{pack.name}</svelte:element>
			<p class="package__price">{pack.price} <span>{pack.period}</span></p>
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
				<p class="package__text">{pack.text}</p>
			</div>
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
	.package:hover :is(.package__delay, .package__name, .package__text, .package__price span),
	.package:focus-within :is(.package__delay, .package__name, .package__text, .package__price span) {
		color: var(--on-action);
	}
	.package:hover .package__price,
	.package:focus-within .package__price {
		color: var(--surface);
	}
	.package:hover :global(.package__cta),
	.package:focus-within :global(.package__cta) {
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
	.package__name {
		margin: var(--space-2) 0 0;
		font-size: var(--text-h3);
	}
	/* Prix en Lilita One, orange ; la périodicité reste en texte courant */
	.package__price {
		margin: 0;
		font-family: var(--font-display);
		font-weight: var(--weight-display);
		font-size: var(--text-h2);
		letter-spacing: 0.005em;
		line-height: 1.1;
		color: var(--accent-deco);
		transition: color var(--duration-reveal) var(--ease-out);
	}
	.package__price span {
		font-family: var(--font-ui);
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
	/* Illustration (fond blanc fondu dans la carte) puis description */
	.package__swap {
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
	.package__cta {
		margin-top: var(--space-3);
	}
</style>
