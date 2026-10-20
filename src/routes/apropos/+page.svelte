<!--
	À propos : présentation (texte du site en ligne) avec la photo de Sébastien (mascotte en arrière-plan),
	parcours (content/studio.ts, faits du CV), méthode de travail (process), avis clients réels publiés
	sur Malt (cités à l'identique). Aucune valeur ni chiffre ajouté.
-->
<script lang="ts">
	import { LinkArrow, Seo } from '$lib/components';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import { aboutIntro, aboutStory, aboutTimeline, links, reviewsIntro } from '$lib/content/studio';
	import portrait from '$lib/assets/photos/sebastien-maurice-developpeur-web-caudry-mascotte.jpg?enhanced&w=1200;720;360';
</script>

<Seo
	title="À propos : Sébastien Maurice, développeur WordPress à Caudry"
	path="/apropos/"
	description="Sébastien Maurice, indépendant à Caudry : un seul interlocuteur, du brief à la mise en ligne, pour les TPE, artisans et PME."
/>

<PageIntro
	label={aboutIntro.eyebrow}
	heading={aboutIntro.title}
	accent={aboutIntro.accent}
	lede={aboutIntro.text}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'À propos' }]}
>
	{#snippet aside()}
		<div class="portrait">
			<enhanced:img
				src={portrait}
				alt="Sébastien Maurice, fondateur de Dev'n Done, avec Dev, la mascotte, en arrière-plan"
				sizes="(min-width: 1100px) 480px, 80vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
</PageIntro>

<section class="section section--tight" aria-labelledby="parcours-title">
	<div class="container story">
		<div class="stack">
			<SectionLabel label={aboutStory.eyebrow} />
			<h2 class="t-h2" id="parcours-title">
				<AccentTitle text={aboutStory.title} accent={aboutStory.accent} />
			</h2>
			{#each aboutStory.paragraphs as p, i (i)}
				<p class:story__lead={i === 0}>{p}</p>
			{/each}
		</div>
		<ol class="timeline" aria-label="Étapes du parcours">
			{#each aboutTimeline as m (m.period + m.role)}
				<li class="milestone">
					<span class="milestone__period">{m.period}</span>
					<h3 class="milestone__role">{m.role}</h3>
					<p class="milestone__place">{m.place}</p>
					<p class="milestone__text">{m.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="section section--tight band" aria-labelledby="process-title">
	<div class="container">
		<ProcessRow />
	</div>
</section>

<section class="section section--tight" aria-labelledby="avis-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label={reviewsIntro.eyebrow} />
			<h2 class="t-h2" id="avis-title">
				<AccentTitle text={reviewsIntro.title} accent={reviewsIntro.accent} />
			</h2>
			<p class="note">{reviewsIntro.lede}</p>
		</header>
		<ReviewList />
		<p><LinkArrow href={links.malt}>{reviewsIntro.more}</LinkArrow></p>
	</div>
</section>

<ContactBlock />

<style>
	/* Photo sur fond blanc : multiply la fond dans l'Ivoire de la page */
	.portrait {
		max-width: 30rem;
		margin-inline: auto;
		aspect-ratio: 1122 / 1292;
	}
	.portrait :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	@media (max-width: 1099px) {
		.portrait {
			max-width: 22rem;
		}
	}
	/* Parcours : récit à gauche, frise à droite en grand écran */
	.story {
		display: grid;
		gap: var(--space-8);
	}
	@media (min-width: 1000px) {
		.story {
			grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
			align-items: start;
		}
		/* Le récit reste visible pendant le défilement de la frise */
		.story > :first-child {
			position: sticky;
			top: 110px;
		}
	}
	.story p {
		margin: 0;
		max-width: 38rem;
		color: var(--text-muted);
	}
	.story .story__lead {
		font-size: var(--text-body-lg);
		color: var(--text);
	}
	/* Frise : filet orange vertical, point orange par étape, cartes blanches */
	.timeline {
		position: relative;
		display: grid;
		gap: var(--space-4);
		margin: 0;
		padding: 0 0 0 var(--space-6);
		list-style: none;
	}
	.timeline::before {
		content: '';
		position: absolute;
		top: var(--space-2);
		bottom: var(--space-2);
		left: 7px;
		width: 2px;
		background: color-mix(in srgb, var(--action) 35%, transparent);
	}
	.milestone {
		position: relative;
		display: grid;
		gap: var(--space-1);
		padding: var(--space-4) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		transition:
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	.milestone::before {
		content: '';
		position: absolute;
		top: 1.35rem;
		left: calc(-1 * var(--space-6) + 1px);
		width: 14px;
		height: 14px;
		border: 3px solid var(--bg);
		border-radius: 50%;
		background: var(--action);
	}
	.milestone:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-card-hover);
		border-color: var(--accent-deco);
	}
	.milestone__period {
		justify-self: start;
		padding: 0.1rem var(--space-3);
		border-radius: 999px;
		background: color-mix(in srgb, var(--action-alt-text) 12%, var(--surface));
		color: var(--action-alt-text);
		font-size: var(--text-caption);
		font-weight: var(--weight-bold);
	}
	.milestone__role {
		margin: var(--space-1) 0 0;
		font-size: 1.25rem;
		transition: color var(--duration-reveal) var(--ease-out);
	}
	.milestone:hover .milestone__role {
		color: var(--accent-deco);
	}
	.story .milestone__place {
		font-size: var(--text-body-sm);
		font-weight: var(--weight-bold);
		color: var(--text);
	}
	.story .milestone__text {
		font-size: var(--text-body-sm);
	}
	@media (prefers-reduced-motion: reduce) {
		.milestone:hover {
			transform: none;
		}
	}
	.note {
		margin: 0;
		color: var(--text-muted);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
</style>
