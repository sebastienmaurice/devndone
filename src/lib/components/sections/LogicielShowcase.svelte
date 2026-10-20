<!--
	Présentation du logiciel de gestion d'affaires pour enseignistes (en développement), sur la page
	« Applications & logiciels ». Présenté de façon anonyme : ni client ni prospect nommé.
	Ordre : chaîne d'une affaire, 4 idées clés, exemple conceptuel en 4 étapes (commerce fictif
	« Zen & Beauté »), mises en situation, parcours en 5 phases, ce que cela apporte, principes,
	mention de statut. Textes : content/logiciel.ts. Images : $lib/assets/logiciel/.
-->
<script lang="ts">
	import {
		logicielBenefits,
		logicielChain,
		logicielGallery,
		logicielIntro,
		logicielNote,
		logicielPhases,
		logicielPillars,
		logicielPrinciples,
		logicielSteps
	} from '$lib/content/logiciel';
	import commerce from '$lib/assets/logiciel/logiciel-enseigniste-releve-facade-commerce.jpg?enhanced&w=1200;720;360';
	import cotes from '$lib/assets/logiciel/logiciel-enseigniste-emplacements-enseigne-cotes.jpg?enhanced&w=1200;720;360';
	import proposition from '$lib/assets/logiciel/logiciel-enseigniste-proposition-visuelle-enseigne.jpg?enhanced&w=1200;720;360';
	import fiche from '$lib/assets/logiciel/logiciel-enseigniste-fiche-technique-atelier.jpg?enhanced&w=1200;720;360';
	import realite from '$lib/assets/logiciel/logiciel-enseigniste-releve-realite-augmentee.jpg?enhanced&w=1200;720;360';
	import interfacePlan from '$lib/assets/logiciel/logiciel-enseigniste-interface-plan-enseigne.jpg?enhanced&w=1200;720;360';
	import mesures from '$lib/assets/logiciel/logiciel-enseigniste-mesures-facade-tablette.jpg?enhanced&w=1200;720;360';
	import planTechnique from '$lib/assets/logiciel/logiciel-enseigniste-plan-technique-tablette.jpg?enhanced&w=1200;720;360';
	import AccentTitle from '../brand/AccentTitle.svelte';
	import Icon from '../brand/Icon.svelte';
	import SectionLabel from '../brand/SectionLabel.svelte';

	const images = [commerce, cotes, proposition, fiche];
	const gallery = [realite, interfacePlan, mesures, planTechnique];
	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<section class="section" aria-labelledby="logiciel-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label={logicielIntro.eyebrow} />
			<h2 class="t-h2 logiciel-title" id="logiciel-title">
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

		<!-- Les 4 idées clés -->
		<ul class="pillars" role="list">
			{#each logicielPillars as p (p.title)}
				<li class="pillar">
					<h3 class="pillar__title">{p.title}</h3>
					<p>{p.text}</p>
				</li>
			{/each}
		</ul>

		<!-- Exemple conceptuel en 4 étapes -->
		<div class="stack stack--sm">
			<h3 class="sub-title">Un exemple, de la façade nue au dossier prêt à produire</h3>
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
						<h4 class="example__title">{step.title}</h4>
						<p class="example__text">{step.text}</p>
					</li>
				{/each}
			</ol>
		</div>

		<!-- Mises en situation -->
		<div class="stack stack--sm">
			<h3 class="sub-title">Sur le terrain, sur tablette</h3>
			<ul class="gallery" role="list">
				{#each logicielGallery as g, i (g.caption)}
					<li>
						<figure class="gallery__item">
							<span class="gallery__media">
								<enhanced:img
									src={gallery[i]}
									alt={g.caption}
									sizes="(min-width: 1100px) 600px, 92vw"
									loading="lazy"
								/>
							</span>
							<figcaption>{g.caption}</figcaption>
						</figure>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Parcours en 5 phases -->
		<div class="stack stack--sm">
			<h3 class="sub-title">Du premier contact à l'encaissement, un seul dossier</h3>
			<ol class="phases" role="list">
				{#each logicielPhases as phase, i (phase.title)}
					<li class="phase">
						<p class="phase__label">Phase {i + 1}</p>
						<h4 class="phase__title">{phase.title}</h4>
						<ul class="phase__steps" role="list">
							{#each phase.steps as st (st)}<li>{st}</li>{/each}
						</ul>
						<p class="phase__text">{phase.text}</p>
						<p class="phase__output">
							<Icon name="arrow-right" size="sm" /><span
								><strong>Transmis :</strong> {phase.output}</span
							>
						</p>
					</li>
				{/each}
			</ol>
		</div>

		<!-- Ce que cela apporte -->
		<div class="stack stack--sm">
			<h3 class="sub-title">Ce que cela apporte</h3>
			<ul class="benefits" role="list">
				{#each logicielBenefits as b (b.title)}
					<li class="benefit">
						<h4 class="benefit__title">{b.title}</h4>
						<ul role="list">
							{#each b.items as it (it)}
								<li><span class="benefit__check"><Icon name="check" size="sm" /></span>{it}</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</div>

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
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		margin-inline: var(--space-2);
		border-radius: 50%;
		background: var(--action);
		color: var(--surface);
		font-family: var(--font-display);
		font-weight: var(--weight-display);
		font-size: 1.25rem;
		line-height: 1;
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
	/* Ancre « Découvrir le projet » : le titre ne passe pas sous l'en-tête fixe */
	.logiciel-title {
		scroll-margin-top: 7rem;
	}
	.sub-title {
		margin: 0;
		font-size: clamp(1.375rem, 1.2rem + 0.8vw, 1.875rem);
	}
	/* 4 idées clés */
	.pillars {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 1100px) {
		.pillars {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
	.pillar {
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-top: 4px solid var(--accent-deco);
		border-radius: var(--radius-card);
	}
	.pillar__title {
		margin: 0 0 var(--space-2);
		font-size: 1.25rem;
	}
	.pillar p {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	/* Mises en situation : 2 colonnes */
	.gallery {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: minmax(0, 1fr);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 768px) {
		.gallery {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.gallery__item {
		margin: 0;
	}
	.gallery__media {
		display: block;
		overflow: hidden;
		aspect-ratio: 3 / 2;
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.gallery__media :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--duration-reveal) var(--ease-out);
	}
	.gallery__item:hover .gallery__media :global(img) {
		transform: scale(1.04);
	}
	.gallery figcaption {
		margin-top: var(--space-2);
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	/* Parcours en 5 phases */
	.phases {
		display: grid;
		gap: var(--space-4);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 1100px) {
		.phases {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
	}
	.phase {
		display: grid;
		grid-template-rows: auto auto auto 1fr auto;
		gap: var(--space-2);
		padding: var(--space-4);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.phase__label {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-caption);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--accent-text);
	}
	.phase__title {
		margin: 0;
		font-size: 1.2rem;
	}
	.phase__steps {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.phase__steps li {
		padding: 0.1rem var(--space-2);
		border-radius: 999px;
		background: var(--surface-sunk);
		font-size: var(--text-caption);
		font-weight: var(--weight-semibold);
	}
	.phase__text {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.phase__output {
		display: flex;
		align-items: flex-start;
		gap: var(--space-2);
		margin: 0;
		padding-top: var(--space-2);
		border-top: 1px solid var(--line);
		font-size: var(--text-caption);
	}
	.phase__output :global(.icon) {
		flex: none;
		color: var(--accent-deco);
	}
	/* Ce que cela apporte */
	.benefits {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.benefit {
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
	}
	.benefit__title {
		margin: 0 0 var(--space-3);
		font-size: 1.25rem;
	}
	.benefit ul {
		display: grid;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: var(--text-body-sm);
	}
	.benefit li {
		display: flex;
		align-items: flex-start;
		gap: var(--space-2);
	}
	.benefit__check {
		display: inline-flex;
		flex: none;
		color: var(--accent-deco);
	}
	@media (prefers-reduced-motion: reduce) {
		.gallery__item:hover .gallery__media :global(img) {
			transform: none;
		}
	}
</style>
