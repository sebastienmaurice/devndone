<!--
	Formules de maintenance WordPress (content/tarifs.ts), facultatives. Prix sans « HT » (franchise
	en base de TVA). Chaque carte porte l'ancre de sa formule (#essentiel, #confort, #serenite) ;
	`detailLink` : lien « Voir le détail » vers la page Maintenance (Tarifs, page Web).
	Textes et montants à ne pas modifier sans validation.
	Présentation alignée sur les cartes tarif : cartes blanches de même hauteur, prix en Lilita One
	orange, prestations en liste cochée (rond orange, libellé, puis valeur en gras), bouton en bas.
	La formule recommandée porte un bandeau orange en tête et un contour orange.
-->
<script lang="ts">
	import { links } from '$lib/content/studio';
	import { maintenancePage, maintenancePlans, maintenanceRules } from '$lib/content/tarifs';
	import Icon from '../brand/Icon.svelte';
	import PriceTag from '../ui/PriceTag.svelte';
	import Button from '../ui/Button.svelte';

	type Props = {
		headingLevel?: 2 | 3 | 4;
		/** Lien vers la page Maintenance détaillée */
		detailLink?: boolean;
		/** Règles communes sous les cartes */
		rules?: boolean;
	};

	let { headingLevel = 3, detailLink = false, rules = false }: Props = $props();
</script>

<ul class="plans" role="list">
	{#each maintenancePlans as plan (plan.name)}
		<li class="plan" class:plan--featured={plan.recommended} id={detailLink ? undefined : plan.id}>
			{#if plan.recommended}<p class="plan__ribbon">Recommandé</p>{/if}
			<div class="plan__head">
				<svelte:element this={`h${headingLevel}`} class="plan__name">{plan.name}</svelte:element>
				<p class="plan__target">{plan.target}</p>
			</div>
			<div class="plan__price">
				<PriceTag label="Par mois" value={plan.price.replace(/\s*€$/, '')} />
			</div>
			<ul class="plan__rows" role="list">
				{#each plan.rows as row (row.label)}
					<li>
						<span class="plan__check"><Icon name="check" size="sm" /></span>
						<span class="plan__row">
							<span class="plan__label">{row.label}</span>
							<strong class="plan__value">{row.value}</strong>
						</span>
					</li>
				{/each}
			</ul>
			<div class="plan__actions">
				{#if detailLink}
					<a class="link-arrow" href="{maintenancePage.path}#{plan.id}"
						>Voir le détail<Icon name="arrow-right" /><span class="sr-only">
							: formule {plan.name}</span
						></a
					>
				{/if}
				<Button
					href={links.calendly}
					variant={plan.recommended ? 'primary' : 'secondary'}
					icon="arrow-up-right"
					block>En parler</Button
				>
			</div>
		</li>
	{/each}
</ul>
{#if rules}
	<ul class="plan-rules" role="list">
		{#each maintenanceRules as rule (rule)}
			<li><Icon name="info" size="sm" />{rule}</li>
		{/each}
	</ul>
{/if}

<style>
	.plan__actions {
		display: grid;
		gap: var(--space-3);
		justify-items: start;
	}
	.plan__actions :global(.btn) {
		justify-self: stretch;
	}
	.plan {
		scroll-margin-top: 110px;
	}
	/* Règles communes : petite liste sous les cartes */
	.plan-rules {
		display: grid;
		gap: var(--space-2);
		max-width: 52rem;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.plan-rules li {
		display: flex;
		gap: var(--space-2);
		align-items: flex-start;
	}
	.plan-rules :global(.icon) {
		flex: none;
		margin-top: 3px;
		color: var(--tag-text);
	}
	.plans {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 1000px) {
		.plans {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	/* Cartes de même hauteur : la liste prend la place restante, le bouton reste en bas */
	.plan {
		position: relative;
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		gap: var(--space-4);
		padding: var(--space-6) var(--space-5) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		transition:
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	.plan:hover,
	.plan:focus-within {
		transform: translateY(-6px);
		box-shadow: var(--shadow-card-hover);
		border-color: var(--accent-deco);
	}
	.plan--featured {
		border: 2px solid var(--accent-deco);
	}
	/* Bandeau « Recommandé » posé sur le bord haut de la carte */
	.plan__ribbon {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
		margin: 0;
		padding: 0.2rem var(--space-4);
		border-radius: 999px;
		background: var(--action);
		color: var(--on-action);
		font-size: var(--text-caption);
		font-weight: var(--weight-bold);
		white-space: nowrap;
	}
	.plan__head {
		display: grid;
		gap: var(--space-1);
	}
	.plan__name {
		margin: 0;
		font-size: var(--text-h3);
	}
	.plan__target {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	/* Prix en Lilita One orange, comme les cartes tarif ; la périodicité en texte courant */
	/* Prix (variante B, composant PriceTag) séparé des prestations par un filet */
	.plan__price {
		padding-bottom: var(--space-4);
		border-bottom: 1px solid var(--line);
	}
	/* Prestations : coche, libellé, valeur en gras dessous (lisible même en carte étroite) */
	.plan__rows {
		display: grid;
		align-content: start;
		gap: var(--space-3);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.plan__rows li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
	}
	.plan__check {
		display: grid;
		place-items: center;
		flex: none;
		width: 22px;
		height: 22px;
		margin-top: 2px;
		border-radius: 50%;
		background: var(--action);
		color: var(--on-action);
	}
	.plan__row {
		display: grid;
		gap: 0.1rem;
	}
	.plan__label {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
		line-height: 1.35;
	}
	.plan__value {
		font-size: var(--text-body-sm);
		font-weight: var(--weight-bold);
		color: var(--text);
	}
	@media (prefers-reduced-motion: reduce) {
		.plan {
			transition-property: box-shadow, border-color;
		}
		.plan:hover,
		.plan:focus-within {
			transform: none;
		}
	}
</style>
