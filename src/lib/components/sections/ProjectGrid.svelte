<!--
	Cartes de réalisations (maquette du 19/10/2026) : visuel du projet en haut, technologies en petit,
	nom, texte court. Chaque carte mène à l'étude de cas (/realisations/<slug>/).
	`compact` : six colonnes en grand écran (accueil) ; sinon trois (page Réalisations).
	Visuels : src/lib/assets/projets/<image>.jpg (vraies présentations des projets, recadrées).
-->
<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import { projects } from '$lib/content/realisations';

	type Props = {
		limit?: number;
		/** Slugs à afficher (réalisations liées) */
		only?: readonly string[];
		compact?: boolean;
		headingLevel?: 2 | 3 | 4;
	};

	let { limit, only, compact = false, headingLevel = 3 }: Props = $props();

	const pictures = import.meta.glob<Picture>('/src/lib/assets/projets/*.jpg', {
		eager: true,
		query: { enhanced: true },
		import: 'default'
	});
	const pictureOf = (image: string) => pictures[`/src/lib/assets/projets/${image}.jpg`];

	const list = $derived(only ? projects.filter((p) => only.includes(p.slug)) : projects);
	const shown = $derived(limit ? list.slice(0, limit) : list);
</script>

<ul class="projects" class:projects--compact={compact} role="list">
	{#each shown as p (p.slug)}
		<li>
			<a class="project" href="/realisations/{p.slug}/">
				<span class="project__media">
					{#if pictureOf(p.image)}
						<enhanced:img
							src={pictureOf(p.image)}
							alt="Aperçu du site {p.name}"
							sizes={compact
								? '(min-width: 1100px) 220px, (min-width: 640px) 33vw, 100vw'
								: '(min-width: 1100px) 420px, (min-width: 640px) 50vw, 100vw'}
							loading="lazy"
						/>
					{/if}
				</span>
				<span class="project__body">
					<span class="project__stack">{p.stack}</span>
					<svelte:element this={`h${headingLevel}`} class="project__name">{p.name}</svelte:element>
					<span class="project__text">{p.text}</span>
				</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.projects {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.projects--compact {
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 12.5rem), 1fr));
	}
	@media (min-width: 1100px) {
		.projects--compact {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}
	}
	.project {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
		overflow: hidden;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		color: var(--text);
		text-decoration: none;
		transition:
			transform var(--duration-base) var(--ease-out),
			box-shadow var(--duration-base) var(--ease-out);
	}
	.project:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-card-hover);
	}
	.project__media {
		display: block;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: var(--surface-sunk);
	}
	.projects:not(.projects--compact) .project__media {
		aspect-ratio: 16 / 10;
	}
	.project__media :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--duration-scene) var(--ease-out);
	}
	.project:hover .project__media :global(img) {
		transform: scale(1.04);
	}
	.project__body {
		display: grid;
		align-content: start;
		gap: var(--space-2);
		padding: var(--space-4);
	}
	.project__stack {
		font-size: var(--text-caption);
		color: var(--text-subtle);
	}
	.project__name {
		margin: 0;
		font-size: 1.25rem;
		letter-spacing: 0.005em;
	}
	.projects:not(.projects--compact) .project__name {
		font-size: var(--text-h3);
	}
	.project__text {
		font-size: var(--text-body-sm);
		line-height: 1.5;
		color: var(--text-muted);
	}
	.projects--compact .project__text {
		font-size: 0.8125rem;
	}
</style>
