<!--
	Avis clients Malt (content/studio.ts), cités à l'identique. `limit` pour n'en montrer qu'une partie,
	`only` pour choisir des avis précis (identifiants `id` des avis), `mission` pour indiquer sous la
	signature la mission concernée (étude de cas liée à l'avis), quand elle est documentée.

	Cartes d'avis (16/11/2026) : grand guillemet orange en Lilita One, pastille de la source (avis Malt,
	recommandation Malt ou avis Google), citation,
	puis signature avec initiales en médaillon. La signature n'est pas réécrite : elle est seulement
	coupée à la première virgule (nom en gras, fonction et entreprise en dessous). Dans une liste d'au
	moins trois avis, la carte du milieu passe en Bleu nuit pour rythmer la rangée.
-->
<script lang="ts">
	import { projects } from '$lib/content/realisations';
	import { reviews, reviewSources, type Review } from '$lib/content/studio';

	let {
		limit,
		only,
		mission = false
	}: { limit?: number; only?: readonly Review['id'][]; mission?: boolean } = $props();

	/** Étude de cas du client qui a laissé l'avis (texte des réalisations, pas du client) */
	const projectOf = (r: Review) => projects.find((p) => p.slug === r.project);

	const picked = $derived(only ? reviews.filter((r) => only.includes(r.id)) : reviews);
	const shown = $derived(limit ? picked.slice(0, limit) : picked);

	/** Signature coupée à la première virgule : « Ryad Asselah » / « Directeur, Palimpseste Urbain » */
	const nameOf = (r: Review) => r.author.split(',')[0].trim();
	const roleOf = (r: Review) => r.author.split(',').slice(1).join(',').trim();
	/** Initiales du nom (médaillon décoratif, masqué aux lecteurs d'écran) */
	const initialsOf = (r: Review) =>
		nameOf(r)
			.split(/\s+/)
			.map((w) => w[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
</script>

<ul class="auto-grid reviews" role="list">
	{#each shown as r, i (r.author)}
		<li class="card review-card" class:surface-night={shown.length >= 3 && i === 1}>
			<figure class="review">
				<span class="review__mark" aria-hidden="true">«</span>
				<span class="review__source">{reviewSources[r.source]}</span>
				<blockquote><p>« {r.quote} »</p></blockquote>
				<figcaption>
					<span class="review__avatar" aria-hidden="true">{initialsOf(r)}</span>
					<span class="review__who">
						<strong class="review__name">{nameOf(r)}</strong>
						{#if roleOf(r)}<span class="review__role">{roleOf(r)}</span>{/if}
						{#if mission && projectOf(r)}
							<span class="review__mission"
								>Mission : <a class="link" href="/realisations/{r.project}/"
									>{projectOf(r)?.seoTitle}</a
								></span
							>
						{/if}
					</span>
				</figcaption>
			</figure>
		</li>
	{/each}
</ul>

<style>
	.reviews {
		--auto-min: 17rem;
	}
	/* La figure occupe toute la carte : les signatures s'alignent en bas d'une carte à l'autre */
	.review-card {
		align-content: stretch;
		overflow: hidden;
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		transition:
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	.review {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr auto;
		gap: var(--space-5);
		height: 100%;
		margin: 0;
	}
	/* Guillemet décoratif en grand, en haut à gauche */
	.review__mark {
		font-family: var(--font-display);
		font-weight: var(--weight-display);
		font-size: 5.5rem;
		line-height: 0.6;
		color: var(--action);
		transform-origin: left top;
		transition: transform var(--duration-scene) var(--ease-out);
	}
	.review__source {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.25rem var(--space-3);
		border-radius: 999px;
		background: var(--tag-bg);
		font-size: var(--text-caption);
		font-weight: var(--weight-bold);
		color: var(--tag-text);
	}
	blockquote {
		margin: 0;
	}
	blockquote p {
		margin: 0;
		font-size: var(--text-body-lg);
		font-weight: var(--weight-medium);
		line-height: var(--leading-body-lg);
		color: var(--text);
		text-wrap: pretty;
		/* Retours à la ligne de l'original conservés (citation exacte) */
		white-space: pre-line;
	}
	figcaption {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding-top: var(--space-4);
		border-top: 1px dashed var(--line-strong);
	}
	.review__avatar {
		flex: none;
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: var(--action);
		font-weight: var(--weight-extrabold);
		font-size: var(--text-body-sm);
		letter-spacing: 0.02em;
		color: var(--on-action);
	}
	.review__who {
		display: grid;
		gap: 2px;
		min-width: 0;
		font-size: var(--text-body-sm);
	}
	.review__name {
		font-weight: var(--weight-bold);
		color: var(--text);
	}
	.review__role {
		color: var(--text-muted);
	}
	.review__mission {
		margin-top: var(--space-1);
		color: var(--text-muted);
	}

	/* Survol : la carte se soulève, contour orange, le guillemet bascule légèrement */
	@media (hover: hover) {
		.review-card:hover {
			transform: translateY(-6px);
			box-shadow: var(--shadow-card-hover);
			border-color: var(--accent-deco);
		}
		.review-card:hover .review__mark {
			transform: rotate(-8deg) scale(1.1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.review-card,
		.review__mark {
			transform: none !important;
		}
	}
</style>
