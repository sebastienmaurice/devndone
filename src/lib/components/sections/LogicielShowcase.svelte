<!--
	Exemple de la page « Applications & logiciels » : logiciel de gestion d'affaires pour
	enseignistes, en cours de développement, présenté de façon anonyme. Chaîne d'une affaire,
	exemple conceptuel en 4 étapes (commerce fictif « Zen & Beauté »), principes, mention de statut.
	Textes : content/logiciel.ts. Images : $lib/assets/logiciel/ (illustrations 3:2).
-->
<script lang="ts">
	import {
		logicielChain,
		logicielIntro,
		logicielNote,
		logicielPrinciples,
		logicielSteps
	} from '$lib/content/logiciel';
	import commerce from '$lib/assets/logiciel/01-commerce-nu.jpg?enhanced&w=1200;720;360';
	import cotes from '$lib/assets/logiciel/02-emplacements-cotes.jpg?enhanced&w=1200;720;360';
	import proposition from '$lib/assets/logiciel/03-proposition-visuelle.jpg?enhanced&w=1200;720;360';
	import fiche from '$lib/assets/logiciel/04-fiche-atelier.jpg?enhanced&w=1200;720;360';
	import AccentTitle from '../brand/AccentTitle.svelte';
	import Icon from '../brand/Icon.svelte';
	import SectionLabel from '../brand/SectionLabel.svelte';

	const images = [commerce, cotes, proposition, fiche];
	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<section class="section" aria-labelledby="logiciel-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label={logicielIntro.eyebrow} />
			<h2 class="t-h2" id="logiciel-title">
				<AccentTitle text={logicielIntro.title} accent={logicielIntro.accent} />
			</h2>
			<p class="lede">{logicielIntro.lede}</p>
		</header>

		<ol class="chain" aria-label="Les étapes d'une affaire">
			{#each logicielChain as step, i (step)}
				<li>
					{#if i > 0}<span class="chain__arrow" aria-hidden="true"
							><Icon name="arrow-right" size="sm" /></span
						>{/if}
					<span class="chain__step">{step}</span>
				</li>
			{/each}
		</ol>

		<ol class="example" role="list">
			{#each logicielSteps as step, i (step.title)}
				<li class="example__step">
					<span class="example__media">
						<enhanced:img
							src={images[i]}
							alt="Exemple conceptuel, étape {i +
								1} : {step.title.toLowerCase()} (commerce fictif Zen & Beauté)"
							sizes="(min-width: 1100px) 300px, (min-width: 640px) 45vw, 92vw"
							loading="lazy"
						/>
					</span>
					<span class="example__num" aria-hidden="true">{pad(i)}</span>
					<h3 class="example__title">{step.title}</h3>
					<p class="example__text">{step.text}</p>
				</li>
			{/each}
		</ol>

		<ul class="principles" role="list">
			{#each logicielPrinciples as p (p.title)}
				<li>
					<span class="principles__check"><Icon name="check" size="sm" /></span>
					<span><strong>{p.title}</strong> {p.text}</span>
				</li>
			{/each}
		</ul>

		<p class="note"><Icon name="info" size="sm" />{logicielNote}</p>
	</div>
</section>

<style>
	.lede {
		max-width: 44rem;
		margin: 0;
		color: var(--text-muted);
	}
	/* Chaîne d'une affaire : pastilles reliées par des flèches */
	.chain {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.chain li {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}
	.chain__step {
		padding: var(--space-1) var(--space-4);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 999px;
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
	}
	.chain__arrow {
		display: inline-flex;
		color: var(--accent-deco);
	}
	/* Exemple en 4 étapes : cartes blanches, illustration 3:2 */
	.example {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 1100px) {
		.example {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
	.example__step {
		display: grid;
		grid-template-rows: auto auto auto 1fr;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-3) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.example__media {
		display: block;
		overflow: hidden;
		aspect-ratio: 3 / 2;
		margin-bottom: var(--space-2);
		border-radius: calc(var(--radius-card) - var(--space-2));
	}
	.example__media :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.example__num {
		padding-inline: var(--space-2);
		font-size: var(--text-h3);
		font-weight: var(--weight-extrabold);
		line-height: 1;
		color: var(--accent-deco);
	}
	.example__title {
		margin: 0;
		padding-inline: var(--space-2);
		font-size: 1.25rem;
	}
	.example__text {
		margin: 0;
		padding-inline: var(--space-2);
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	/* Principes : 4 colonnes en grand écran */
	.principles {
		display: grid;
		gap: var(--space-4) var(--col-gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--text-body-sm);
	}
	.principles li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
	}
	.principles__check {
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		flex: none;
		border-radius: 50%;
		background: var(--action);
		color: var(--on-action);
	}
	.note {
		display: flex;
		align-items: flex-start;
		gap: var(--space-2);
		margin: 0;
		font-size: var(--text-caption);
		color: var(--text-muted);
	}
</style>
