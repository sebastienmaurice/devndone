<!--
	Process en 4 étapes (maquette « De l'idée à la mise en ligne » du 20/10/2026) : surtitre et
	titre (passage orange souligné à la main), mascotte au bureau à gauche, 4 cartes blanches
	à droite (illustration 3D, pastille numérotée orange, titre, texte) reliées par un trait orange.
	Tablette : 2 × 2 sous la mascotte ; mobile : une colonne. Données : content/services.ts
	(processIntro, processSteps). Illustrations : $lib/assets/process/ et la mascotte (fond blanc,
	fondue dans le fond par multiply).
-->
<script lang="ts">
	import AccentTitle from '../brand/AccentTitle.svelte';
	import SectionLabel from '../brand/SectionLabel.svelte';
	import { processIntro, processSteps } from '$lib/content/services';
	import mascotte from '$lib/assets/mascotte/process-renard-bureau.jpg?enhanced&w=1200;720;360';
	import comprendre from '$lib/assets/process/etape-1.jpg?enhanced&w=720;360';
	import concevoir from '$lib/assets/process/etape-2.jpg?enhanced&w=720;360';
	import developper from '$lib/assets/process/etape-3.jpg?enhanced&w=720;360';
	import livrer from '$lib/assets/process/etape-4.jpg?enhanced&w=720;360';

	let { level = 2 }: { level?: 1 | 2 } = $props();

	const icons = [comprendre, concevoir, developper, livrer];
	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<div class="process">
	<div class="process__intro">
		<SectionLabel label={processIntro.eyebrow} />
		<svelte:element this={`h${level}`} class="t-h2 process__title" id="process-title"
			><AccentTitle text={processIntro.title} accent={processIntro.accent} /></svelte:element
		>
	</div>

	<div class="process__mascot">
		<enhanced:img
			src={mascotte}
			alt="Dev, la mascotte, à son bureau devant son ordinateur portable, montre la suite du process"
			sizes="(min-width: 1100px) 380px, (min-width: 640px) 360px, 80vw"
			loading="lazy"
		/>
	</div>

	<ol class="process__steps">
		{#each processSteps as step, i (step.title)}
			<li class="process-card">
				<span class="process-card__icon">
					<enhanced:img
						src={icons[i]}
						alt=""
						sizes="(min-width: 1100px) 180px, (min-width: 640px) 40vw, 80vw"
						loading="lazy"
					/>
				</span>
				<span class="process-card__num" aria-hidden="true">{pad(i)}</span>
				<h3 class="process-card__title">{step.title}</h3>
				<p class="process-card__text">{step.text}</p>
			</li>
		{/each}
	</ol>
</div>

<style>
	.process {
		display: grid;
		gap: var(--space-6);
	}
	@media (min-width: 1100px) {
		/* Titre en haut à gauche, mascotte dessous ; les 4 cartes occupent la droite */
		.process {
			grid-template-columns: minmax(0, 4fr) minmax(0, 9fr);
			grid-template-areas:
				'intro intro'
				'mascot steps';
			column-gap: var(--space-5);
			row-gap: var(--space-4);
			align-items: end;
		}
		.process__intro {
			grid-area: intro;
		}
		.process__mascot {
			grid-area: mascot;
		}
		.process__steps {
			grid-area: steps;
			align-self: center;
		}
	}
	.process__intro {
		display: grid;
		gap: var(--space-4);
		justify-items: start;
	}
	.process__title {
		max-width: 16em;
		margin: 0;
	}
	/* Passage orange souligné d'un trait dessiné, comme sur la maquette */
	.process__title :global(.accent-word) {
		position: relative;
		white-space: nowrap;
	}
	.process__title :global(.accent-word)::after {
		content: '';
		position: absolute;
		left: 0.05em;
		right: 0.1em;
		bottom: -0.12em;
		height: 0.09em;
		border-radius: 999px;
		background: var(--accent-deco);
		transform: rotate(-1.2deg);
	}
	/* Mascotte sur fond blanc : multiply la fond dans le fond de la section */
	.process__mascot {
		justify-self: center;
		width: min(100%, 24rem);
	}
	.process__mascot :global(img) {
		display: block;
		width: 100%;
		height: auto;
		mix-blend-mode: multiply;
	}
	.process__steps {
		display: grid;
		gap: var(--space-4);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 1100px) {
		.process__steps {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: var(--space-5);
		}
	}
	.process-card {
		position: relative;
		display: grid;
		grid-template-rows: auto auto auto 1fr;
		gap: var(--space-2);
		padding: var(--space-4) var(--space-5) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	/* Grand écran : petit trait orange qui relie une carte à la suivante */
	@media (min-width: 1100px) {
		.process-card:not(:last-child)::after {
			content: '';
			position: absolute;
			top: 30%;
			right: calc(-1 * var(--space-5));
			width: var(--space-5);
			height: 4px;
			border-radius: 999px;
			background: var(--accent-deco);
		}
	}
	.process-card__icon {
		display: block;
		aspect-ratio: 528 / 478;
		margin-inline: auto;
		width: min(100%, 11rem);
	}
	.process-card__icon :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	.process-card__num {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: var(--action);
		color: var(--on-action);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-extrabold);
	}
	.process-card__title {
		margin: var(--space-1) 0 0;
		font-size: 1.375rem;
	}
	.process-card__text {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
</style>
