<!--
	Process en 4 étapes (maquette du 19/10/2026) : titre à gauche, étapes à droite avec icône,
	numéro orange, titre et texte, reliées par des flèches discrètes. Vertical sur mobile.
	Données : content/services.ts (processIntro, processSteps).
-->
<script lang="ts">
	import AccentTitle from '../brand/AccentTitle.svelte';
	import { processIntro, processSteps } from '$lib/content/services';
	import Icon from '../brand/Icon.svelte';
	import SectionLabel from '../brand/SectionLabel.svelte';

	let { level = 2 }: { level?: 1 | 2 } = $props();

	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<div class="process">
	<div class="process__intro">
		<SectionLabel label={processIntro.eyebrow} />
		<svelte:element this={`h${level}`} class="t-h2" id="process-title"
			><AccentTitle text={processIntro.title} accent={processIntro.accent} /></svelte:element
		>
	</div>
	<ol class="process__steps">
		{#each processSteps as step, i (step.title)}
			<li class="step-item">
				<span class="step-item__icon"><Icon name={step.icon} /></span>
				<span class="step-item__num" aria-hidden="true">{pad(i)}</span>
				<div class="step-item__body">
					<h3 class="step-item__title">{step.title}</h3>
					<p>{step.text}</p>
				</div>
				{#if i < processSteps.length - 1}
					<span class="step-item__arrow" aria-hidden="true"><Icon name="arrow-right" /></span>
				{/if}
			</li>
		{/each}
	</ol>
</div>

<style>
	.process {
		display: grid;
		gap: var(--space-7);
	}
	@media (min-width: 1100px) {
		.process {
			grid-template-columns: minmax(0, 5fr) minmax(0, 8fr);
			gap: var(--space-8);
			align-items: center;
		}
	}
	.process__intro :global(.t-h2) {
		font-size: clamp(1.625rem, 1.333rem + 1.296vw, 2.5rem);
	}
	.process__intro {
		display: grid;
		gap: var(--space-4);
		justify-items: start;
	}
	.process__steps {
		display: grid;
		gap: var(--space-6);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 720px) {
		.process__steps {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
	.step-item {
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: var(--space-3);
		row-gap: var(--space-2);
		align-items: start;
	}
	@media (min-width: 720px) {
		.step-item {
			grid-template-columns: 1fr;
		}
	}
	.step-item__icon {
		grid-row: span 2;
		color: var(--text);
	}
	.step-item__icon :global(.icon) {
		width: 36px;
		height: 36px;
		stroke-width: 1.6;
	}
	@media (min-width: 720px) {
		.step-item__icon {
			grid-row: auto;
		}
	}
	.step-item__num {
		font-size: var(--text-body-sm);
		font-weight: var(--weight-extrabold);
		color: var(--accent-deco);
	}
	.step-item__title {
		margin: 0 0 var(--space-1);
		font-size: 1.25rem;
		letter-spacing: 0.005em;
	}
	.step-item__body p {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.step-item__arrow {
		display: none;
	}
	@media (min-width: 720px) {
		.step-item__arrow {
			display: block;
			position: absolute;
			top: 8px;
			right: calc(-1 * var(--space-6) + 4px);
			color: var(--line-strong);
		}
		.step-item__arrow :global(.icon) {
			width: 20px;
			height: 20px;
		}
	}
</style>
