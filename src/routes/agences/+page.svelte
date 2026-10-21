<!--
	Agences web : renfort et sous-traitance WordPress / WooCommerce (content/agences.ts).
	Ce que l'agence peut confier, cadre de travail, démarrage, projets menés en direct (présentés
	comme tels), avis Malt, questions fréquentes, renvoi vers les prestations pour les entreprises.
	Le bouton principal ouvre le formulaire de contact avec le type « agence » prérempli.
	Illustration : pose existante réutilisée provisoirement (même visuel que le Sprint).
-->
<script lang="ts">
	import { Button, LinkArrow, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import Accordion from '$lib/components/ui/Accordion.svelte';
	import visual from '$lib/assets/mascotte/mascotte-renard-dev-n-done-developpeur-wordpress-code.jpg?enhanced&w=1200;720;360';
	import {
		agencesFaq,
		agencesFrame,
		agencesPage,
		agencesProjects,
		agencesProjectsNote,
		agencesSteps,
		agencesTasks
	} from '$lib/content/agences';
	import { hero, links, reviewsIntro } from '$lib/content/studio';
	import { vatNotice } from '$lib/content/tarifs';

	const faq = agencesFaq.map((f) => ({ question: f.q, answer: f.a }));
</script>

<Seo title={agencesPage.seoTitle} path={agencesPage.path} description={agencesPage.description} />

<PageIntro
	label={agencesPage.label}
	heading={agencesPage.title}
	accent={agencesPage.accent}
	lede={agencesPage.lede}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Agences' }]}
>
	{#snippet actions()}
		<Button href={agencesPage.contactHref} icon="arrow-right">{agencesPage.cta}</Button>
		<Button href={links.calendly} variant="secondary"><Icon name="calendar" />{hero.ctaCall}</Button
		>
	{/snippet}
	{#snippet aside()}
		<div class="visual">
			<enhanced:img
				src={visual}
				alt="Dev, la mascotte, assis en tailleur avec son portable, entre une fenêtre de code et un site WordPress"
				sizes="(min-width: 1100px) 520px, 90vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
</PageIntro>

<!-- Ce que l'agence peut confier -->
<section class="section section--tight band" aria-labelledby="missions-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Missions" />
			<h2 class="t-h2" id="missions-title">
				<AccentTitle text="Ce que vous pouvez me confier" accent="me confier" />
			</h2>
		</header>
		<ul class="tasks" role="list">
			{#each agencesTasks as task (task.title)}
				<li class="task">
					<span class="task__icon"><Icon name={task.icon} /></span>
					<h3 class="task__title">{task.title}</h3>
					<p>{task.text}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Cadre de travail -->
<section class="section section--tight" aria-labelledby="cadre-title">
	<div class="container split">
		<header class="stack stack--sm">
			<SectionLabel label="Le cadre" />
			<h2 class="t-h2" id="cadre-title">
				<AccentTitle text="Comment on travaille ensemble" accent="ensemble" />
			</h2>
			<p class="muted">
				Chaque mission a un périmètre et une estimation écrits avant de commencer. Ce qui dépasse
				fait l'objet d'un nouveau devis, accepté avant d'être réalisé.
			</p>
		</header>
		<div class="box">
			<dl class="frame">
				{#each agencesFrame as row (row.label)}
					<div class="frame__row">
						<dt>{row.label}</dt>
						<dd>{row.value}</dd>
					</div>
				{/each}
			</dl>
			<p class="small">{vatNotice}</p>
		</div>
	</div>
</section>

<!-- Démarrage -->
<section class="section section--tight band" aria-labelledby="demarrer-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Démarrer" />
			<h2 class="t-h2" id="demarrer-title">De votre demande au compte rendu</h2>
		</header>
		<ol class="flow" role="list">
			{#each agencesSteps as step, i (step.title)}
				<li class="flow__step">
					<span class="flow__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					<h3 class="flow__title">{step.title}</h3>
					<p>{step.text}</p>
				</li>
			{/each}
		</ol>
		<div class="cta-row">
			<Button href={agencesPage.contactHref} icon="arrow-right">{agencesPage.cta}</Button>
		</div>
	</div>
</section>

<!-- Projets menés en direct -->
<section class="section section--tight" aria-labelledby="projets-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Réalisations" />
			<h2 class="t-h2" id="projets-title">Le type de travail que je peux reprendre</h2>
			<p class="muted note">{agencesProjectsNote}</p>
		</header>
		<ProjectGrid only={agencesProjects} />
		<p><LinkArrow href="/realisations/">Toutes les réalisations</LinkArrow></p>
	</div>
</section>

<!-- Avis Malt (clients directs) -->
<section class="section section--tight band" aria-labelledby="avis-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label={reviewsIntro.eyebrow} />
			<h2 class="t-h2" id="avis-title">
				<AccentTitle text={reviewsIntro.title} accent={reviewsIntro.accent} />
			</h2>
			<p class="muted">{reviewsIntro.lede}</p>
		</header>
		<ReviewList />
		<p><LinkArrow href={links.malt}>{reviewsIntro.more}</LinkArrow></p>
	</div>
</section>

<!-- Questions fréquentes -->
<section class="section section--tight" aria-labelledby="faq-title">
	<div class="container stack stack--lg faq">
		<header class="stack stack--sm">
			<SectionLabel label="Questions fréquentes" />
			<h2 class="t-h2" id="faq-title">Avant de me confier une mission</h2>
		</header>
		<Accordion items={faq} />
	</div>
</section>

<!-- Renvoi vers le parcours entreprises -->
<section class="section section--tight band" aria-labelledby="entreprises-title">
	<div class="container">
		<h2 class="t-h3" id="entreprises-title">Vous n'êtes pas une agence ?</h2>
		<p class="muted">
			Pour créer, refondre ou faire évoluer le site de votre entreprise, les prestations sont
			décrites sur des pages dédiées, avec leur prix et leur périmètre.
		</p>
		<ul class="others" role="list">
			<li>
				<a class="other" href="/services/web/"
					>Les prestations WordPress<Icon name="arrow-right" /></a
				>
			</li>
			<li><a class="other" href="/tarifs/">Les tarifs<Icon name="arrow-right" /></a></li>
		</ul>
	</div>
</section>

<ContactBlock />

<style>
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
	/* Illustration sur fond blanc : multiply la fond dans l'Ivoire de la page */
	.visual {
		max-width: 32rem;
		margin-inline: auto;
	}
	.visual :global(img) {
		display: block;
		width: 100%;
		height: auto;
		mix-blend-mode: multiply;
	}
	.muted {
		margin: 0;
		color: var(--text-muted);
	}
	.note {
		max-width: 46rem;
	}
	/* Missions : cartes à tuile d'icône */
	.tasks {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.task {
		display: grid;
		gap: var(--space-3);
		align-content: start;
		padding: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.task__icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius-card);
		background: var(--tag-bg);
		color: var(--tag-text);
	}
	.task__title {
		margin: 0;
		font-size: 1.375rem;
	}
	.task p {
		margin: 0;
		color: var(--text-muted);
	}
	/* Cadre : texte à gauche, liste à droite */
	.split {
		display: grid;
		gap: var(--space-6);
		align-items: start;
	}
	@media (min-width: 900px) {
		.split {
			grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
			gap: var(--space-8);
		}
	}
	.box {
		display: grid;
		gap: var(--space-4);
		padding: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.box .small {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.frame {
		display: grid;
		margin: 0;
	}
	.frame__row {
		display: grid;
		gap: var(--space-1);
		padding-block: var(--space-4);
		border-bottom: 1px solid var(--line);
	}
	.frame__row:first-child {
		padding-top: 0;
	}
	@media (min-width: 600px) {
		.frame__row {
			grid-template-columns: 11rem minmax(0, 1fr);
			gap: var(--space-4);
		}
	}
	.frame dt {
		font-weight: var(--weight-bold);
	}
	.frame dd {
		margin: 0;
		color: var(--text-muted);
	}
	/* Démarrage : cartes à pastille numérotée (même rendu que le déroulement des offres) */
	.flow {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.flow__step {
		display: grid;
		gap: var(--space-2);
		align-content: start;
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.flow__num {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		margin-bottom: var(--space-2);
		border-radius: 50%;
		background: var(--action);
		color: var(--surface);
		font-family: var(--font-display);
		font-weight: var(--weight-display);
		font-size: 1.25rem;
		line-height: 1;
	}
	.flow__title {
		margin: 0;
		font-size: 1.25rem;
	}
	.flow__step p {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
	}
	.faq {
		max-width: 52rem;
	}
	/* Renvoi entreprises : pastilles-liens (comme les autres offres) */
	.others {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin: var(--space-5) 0 0;
		padding: 0;
		list-style: none;
	}
	.other {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-btn);
		color: var(--text);
		font-weight: var(--weight-bold);
		text-decoration: none;
		transition: border-color var(--duration-base) var(--ease-out);
	}
	.other:hover {
		border-color: var(--accent-deco);
	}
	.other :global(.icon) {
		width: 18px;
		height: 18px;
		color: var(--accent-deco);
	}
</style>
