<!--
	Cartes de réalisations : visuel du projet avec pastille numérotée, secteur et lieu, nom, texte
	court, technologies en pastilles bleu océan, lien « Voir le projet ». Chaque carte mène à
	l'étude de cas (/realisations/<slug>/). Trois colonnes en grand écran.
	`featured` : la première carte occupe toute la largeur, visuel à gauche (page Réalisations) ;
	la dernière aussi quand elle resterait seule sur sa ligne.
	Visuels : src/lib/assets/projets/<image>.jpg (vraies présentations des projets, recadrées).
-->
<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import { projects } from '$lib/content/realisations';
	import Icon from '../brand/Icon.svelte';

	type Props = {
		limit?: number;
		/** Slugs à afficher (réalisations liées) */
		only?: readonly string[];
		/** Première carte en grand (pleine largeur) */
		featured?: boolean;
		headingLevel?: 2 | 3 | 4;
	};

	let { limit, only, featured = false, headingLevel = 3 }: Props = $props();

	const pictures = import.meta.glob<Picture>('/src/lib/assets/projets/*.jpg', {
		eager: true,
		query: { enhanced: true },
		import: 'default'
	});
	const pictureOf = (image: string) => pictures[`/src/lib/assets/projets/${image}.jpg`];

	const list = $derived(only ? projects.filter((p) => only.includes(p.slug)) : projects);
	const shown = $derived(limit ? list.slice(0, limit) : list);
	// Numéro d'ordre dans le portfolio complet (stable d'une page à l'autre)
	const numOf = (slug: string) =>
		String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, '0');
</script>

<ul class="projects" class:projects--featured={featured} role="list">
	{#each shown as p, i (p.slug)}
		{@const big = featured && (i === 0 || (i === shown.length - 1 && (shown.length - 1) % 3 === 1))}
		{@const meta = [p.details?.sector, p.details?.location?.replace(/, France$/, '')].filter(
			Boolean
		)}
		<li class:project-item--big={big}>
			<a class="project" class:project--big={big} href="/realisations/{p.slug}/">
				<span class="project__media">
					{#if pictureOf(p.image)}
						<enhanced:img
							src={pictureOf(p.image)}
							alt="Aperçu du site {p.name}"
							sizes={big
								? '(min-width: 1100px) 760px, 100vw'
								: '(min-width: 1100px) 420px, (min-width: 640px) 50vw, 100vw'}
							loading={big ? undefined : 'lazy'}
						/>
					{/if}
				</span>
				<span class="project__body">
					<span class="project__num" aria-hidden="true">{numOf(p.slug)}</span>
					{#if meta.length}
						<span class="project__meta">{meta.join(' · ')}</span>
					{/if}
					<svelte:element this={`h${headingLevel}`} class="project__name">{p.name}</svelte:element>
					<span class="project__text">{big ? (p.details?.summary ?? p.text) : p.text}</span>
					<span class="project__tags">
						<span class="sr-only">Technologies : </span>
						{#each p.stack.split(' · ') as t (t)}<span class="project__tag">{t}</span>{/each}
					</span>
					<span class="project__cta">Voir le projet <Icon name="arrow-right" size="sm" /></span>
				</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.projects {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 1000px) {
		.projects {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	.project-item--big {
		grid-column: 1 / -1;
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
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	/* Carte en grand : visuel à gauche, texte à droite */
	@media (min-width: 900px) {
		.project--big {
			grid-template-rows: none;
			grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		}
		.project--big .project__media {
			aspect-ratio: auto;
			min-height: 100%;
			border-bottom: 0;
			border-right: 1px solid var(--line);
		}
		/* Colonne plus haute que 2:1 : image entière, jamais rognée */
		.project--big .project__media :global(img) {
			object-fit: contain;
		}
		.project--big .project__body {
			justify-content: center;
			padding: var(--space-7) var(--space-6);
		}
		.project--big .project__tags {
			margin-top: 0;
		}
		/* Carte en grand : la pastille reste dans la colonne de texte */
		.project--big .project__num {
			margin-top: 0;
		}
		.project--big .project__name {
			font-size: var(--text-h2);
		}
		.project--big .project__text {
			font-size: var(--text-body);
		}
	}
	/* Survol (référence du site) : soulèvement, contour orange, titre orange, zoom de l'image */
	.project:hover,
	.project:focus-visible {
		transform: translateY(-6px);
		box-shadow: var(--shadow-card-hover);
		border-color: var(--accent-deco);
	}
	.project:hover .project__name,
	.project:focus-visible .project__name {
		color: var(--accent-deco);
	}
	.project:hover .project__num,
	.project:focus-visible .project__num {
		background: var(--text);
	}
	.project:hover .project__cta :global(.icon),
	.project:focus-visible .project__cta :global(.icon) {
		transform: translateX(4px);
	}
	/* Ratio des visuels de projets : 2:1 (format source 1774 × 887 px) */
	.project__media {
		position: relative;
		display: block;
		aspect-ratio: 1774 / 887;
		overflow: hidden;
		background: var(--surface-sunk);
		border-bottom: 1px solid var(--line);
	}
	.project__media :global(picture) {
		display: block;
		height: 100%;
	}
	.project__media :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--duration-scene) var(--ease-out);
	}
	.project:hover .project__media :global(img) {
		transform: scale(1.05);
	}
	/* Pastille numérotée de référence (Lilita One blanc sur orange), à cheval sur le bord du visuel
	   pour ne rien masquer de la présentation */
	.project__num {
		position: relative;
		z-index: 1;
		margin-top: calc(-1 * (var(--space-5) + 1.375rem));
		border: 3px solid var(--surface);
		box-sizing: content-box;
		align-self: flex-start;
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: var(--action);
		color: var(--surface);
		font-family: var(--font-display);
		font-weight: var(--weight-display);
		font-size: 1.25rem;
		line-height: 1;
		box-shadow: var(--shadow-card);
		transition: background-color var(--duration-reveal) var(--ease-out);
	}
	/* Colonne : les technologies et le lien restent en bas de carte */
	.project__body {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-5);
	}
	.project__meta {
		font-size: var(--text-label);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-subtle);
	}
	.project__name {
		margin: 0;
		font-size: var(--text-h3);
		letter-spacing: 0.005em;
		transition: color var(--duration-reveal) var(--ease-out);
	}
	.project__text {
		font-size: var(--text-body-sm);
		line-height: 1.55;
		color: var(--text-muted);
	}
	/* Technologies : pastilles bleu océan à 8 % (comme les délais des cartes tarif) */
	.project__tags {
		display: flex;
		align-items: flex-start;
		margin-top: auto;
		flex-wrap: wrap;
		gap: var(--space-2);
	}
	.project__tag {
		padding: 0.15rem var(--space-3);
		border-radius: 999px;
		background: color-mix(in srgb, var(--action-alt-text) 8%, var(--surface));
		color: var(--action-alt-text);
		font-size: var(--text-caption);
		font-weight: var(--weight-bold);
	}
	.project__cta {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding-top: var(--space-3);
		border-top: 1px solid var(--line);
		color: var(--action-alt-text);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-bold);
	}
	.project__cta :global(.icon) {
		transition: transform var(--duration-reveal) var(--ease-out);
	}
	@media (prefers-reduced-motion: reduce) {
		.project:hover,
		.project:focus-visible {
			transform: none;
		}
		.project:hover .project__media :global(img),
		.project:hover .project__cta :global(.icon) {
			transform: none;
		}
	}
</style>
