<!--
	Projets de la page « Applications & logiciels », sur le modèle de la section « Mon process » :
	surtitre et titre (passage orange souligné), mascotte à gauche, cartes à droite. Première carte :
	le logiciel de gestion d'affaires pour enseignistes (en développement), qui mène à sa présentation
	sur sa page dédiée ; la seconde invite à présenter un besoin d'outil métier (contact).
	Textes : content/logiciel.ts. Mascotte : pose « ordinateur portable à la main ».
-->
<script lang="ts">
	import {
		applicationsProjectsIntro as intro,
		applicationsCta as cta,
		logicielIntro,
		logicielPage
	} from '$lib/content/logiciel';
	import mascotte from '$lib/assets/mascotte/mascotte-renard-applications-ordinateur-portable.jpg?enhanced&w=720;360';
	import visuel from '$lib/assets/logiciel/logiciel-enseigniste-releve-realite-augmentee.jpg?enhanced&w=720;360';
	import AccentTitle from '../brand/AccentTitle.svelte';
	import Icon from '../brand/Icon.svelte';
	import SectionLabel from '../brand/SectionLabel.svelte';
	import { contactIntro } from '$lib/content/studio';
</script>

<div class="apps">
	<div class="apps__intro">
		<SectionLabel label={intro.eyebrow} />
		<h2 class="t-h2 apps__title" id="apps-projects-title">
			<AccentTitle text={intro.title} accent={intro.accent} />
		</h2>
	</div>

	<div class="apps__mascot">
		<enhanced:img
			src={mascotte}
			alt="Dev, la mascotte, debout, son ordinateur portable à la main, pointe du doigt les projets"
			sizes="(min-width: 640px) 352px, 80vw"
			loading="lazy"
		/>
	</div>

	<ul class="apps__cards" role="list">
		<li>
			<a class="app-card" href={logicielPage.path}>
				<span class="app-card__media">
					<enhanced:img
						src={visuel}
						alt="Relevé de façade en réalité augmentée sur tablette, avec les cotes de l'enseigne"
						sizes="(min-width: 1100px) 320px, (min-width: 640px) 45vw, 92vw"
						loading="lazy"
					/>
				</span>
				<span class="app-card__badge">{logicielIntro.eyebrow}</span>
				<h3 class="app-card__title">{logicielIntro.title}</h3>
				<p class="app-card__text">
					Relevé, chiffrage, proposition visuelle, devis, décision du client et fiche atelier : un
					seul dossier par affaire.
				</p>
				<span class="app-card__go">Découvrir le projet<Icon name="arrow-right" size="sm" /></span>
			</a>
		</li>
		<li>
			<a class="app-card app-card--cta" href="/contact/">
				<span class="app-card__icon"><Icon name="layers" /></span>
				<h3 class="app-card__title">{cta.title}</h3>
				<p class="app-card__text">{cta.text}</p>
				<span class="app-card__go">{contactIntro.cta}<Icon name="arrow-right" size="sm" /></span>
			</a>
		</li>
	</ul>
</div>

<style>
	.apps {
		display: grid;
		gap: var(--space-6);
	}
	@media (min-width: 1100px) {
		/* Comme « Mon process » : titre en haut à gauche, mascotte dessous, cartes à droite */
		.apps {
			grid-template-columns: minmax(0, 4fr) minmax(0, 9fr);
			grid-template-areas:
				'intro intro'
				'mascot cards';
			column-gap: var(--space-5);
			row-gap: var(--space-7);
			align-items: end;
		}
		.apps__intro {
			grid-area: intro;
		}
		.apps__mascot {
			grid-area: mascot;
		}
		.apps__cards {
			grid-area: cards;
			align-self: center;
		}
	}
	.apps__intro {
		display: grid;
		gap: var(--space-4);
		justify-items: start;
	}
	.apps__title {
		max-width: 14em;
		margin: 0;
	}
	.apps__title :global(.accent-word) {
		position: relative;
	}
	/* Pose en pied (portrait), mise en avant à gauche des cartes */
	.apps__mascot {
		justify-self: center;
		width: min(100%, 22rem);
	}
	.apps__mascot :global(img) {
		display: block;
		width: 100%;
		height: auto;
		mix-blend-mode: multiply;
	}
	.apps__cards {
		display: grid;
		gap: var(--space-4);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 1100px) {
		.apps__cards {
			grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
			gap: var(--space-5);
		}
	}
	.apps__cards > li {
		display: grid;
	}
	.app-card {
		display: grid;
		grid-template-rows: auto auto auto 1fr auto;
		gap: var(--space-2);
		padding: var(--space-4) var(--space-4) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		color: var(--text);
		text-decoration: none;
		transition:
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	/* Survol (comme les autres cartes du site) : soulèvement, contour et titre orange, zoom */
	a.app-card:hover,
	a.app-card:focus-visible {
		transform: translateY(-6px);
		box-shadow: var(--shadow-card-hover);
		border-color: var(--accent-deco);
	}
	a.app-card:focus-visible {
		outline: var(--focus-ring);
		outline-offset: var(--focus-offset);
	}
	.app-card__media {
		display: block;
		overflow: hidden;
		aspect-ratio: 3 / 2;
		margin-bottom: var(--space-2);
		border-radius: calc(var(--radius-card) - var(--space-2));
	}
	.app-card__media :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--duration-reveal) var(--ease-out);
	}
	a.app-card:hover .app-card__media :global(img),
	a.app-card:focus-visible .app-card__media :global(img) {
		transform: scale(1.06);
	}
	.app-card__badge {
		justify-self: start;
		padding: 0.15rem var(--space-3);
		border-radius: 999px;
		background: var(--action);
		color: var(--on-action);
		font-size: var(--text-caption);
		font-weight: var(--weight-bold);
	}
	.app-card__title {
		margin: var(--space-1) 0 0;
		font-size: 1.375rem;
		transition: color var(--duration-reveal) var(--ease-out);
	}
	a.app-card:hover .app-card__title,
	a.app-card:focus-visible .app-card__title {
		color: var(--accent-deco);
	}
	.app-card__text {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.app-card__go {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		margin-top: var(--space-2);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-bold);
		color: var(--action-alt-text);
	}
	/* Carte d'appel « Votre outil métier » : même carte cliquable que le logiciel, avec une tuile
	   d'icône à la place du visuel ; le lien reste calé en bas */
	.app-card--cta {
		grid-template-rows: auto auto 1fr auto;
		align-content: start;
		padding: var(--space-5);
	}
	.app-card__icon {
		display: grid;
		place-items: center;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		background: var(--surface-sunk);
		color: var(--accent-deco);
	}
	@media (prefers-reduced-motion: reduce) {
		.app-card,
		.app-card__media :global(img) {
			transition-property: border-color, box-shadow, color;
		}
		a.app-card:hover,
		a.app-card:focus-visible,
		a.app-card:hover .app-card__media :global(img) {
			transform: none;
		}
	}
</style>
