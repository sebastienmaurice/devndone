<!--
	Avis clients Malt (content/studio.ts), cités à l'identique. `limit` pour n'en montrer qu'une partie,
	`only` pour choisir des avis précis (identifiants `id` des avis), `mission` pour indiquer sous la
	signature la mission concernée (étude de cas liée à l'avis), quand elle est documentée.
-->
<script lang="ts">
	import { projects } from '$lib/content/realisations';
	import { reviews, type Review } from '$lib/content/studio';

	let {
		limit,
		only,
		mission = false
	}: { limit?: number; only?: readonly Review['id'][]; mission?: boolean } = $props();

	/** Étude de cas du client qui a laissé l'avis (texte des réalisations, pas du client) */
	const projectOf = (r: Review) => projects.find((p) => p.slug === r.project);

	const picked = $derived(only ? reviews.filter((r) => only.includes(r.id)) : reviews);
	const shown = $derived(limit ? picked.slice(0, limit) : picked);
</script>

<ul class="auto-grid reviews" role="list">
	{#each shown as r (r.author)}
		<li class="card">
			<figure class="review">
				<blockquote><p class="t-body-lg">« {r.quote} »</p></blockquote>
				<figcaption class="t-body-sm t-muted">
					{r.author}
					{#if mission && projectOf(r)}
						<span class="review__mission"
							>Mission : <a class="link" href="/realisations/{r.project}/"
								>{projectOf(r)?.seoTitle}</a
							></span
						>
					{/if}
				</figcaption>
			</figure>
		</li>
	{/each}
</ul>

<style>
	.reviews {
		--auto-min: 17rem;
	}
	/* Survol (référence du site) : soulèvement, contour orange */
	.reviews > :global(.card) {
		transition:
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	.reviews > :global(.card):hover {
		transform: translateY(-6px);
		box-shadow: var(--shadow-card-hover);
		border-color: var(--accent-deco);
	}
	@media (prefers-reduced-motion: reduce) {
		.reviews > :global(.card):hover {
			transform: none;
		}
	}

	.review {
		display: grid;
		gap: var(--space-4);
		height: 100%;
		grid-template-rows: 1fr auto;
	}
	.review__mission {
		display: block;
		margin-top: var(--space-1);
	}
	figcaption {
		padding-top: var(--space-4);
		border-top: var(--border-hair) solid var(--line);
	}
</style>
