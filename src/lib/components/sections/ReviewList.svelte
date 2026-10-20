<!--
	Avis clients Malt (content/studio.ts), cités à l'identique. `limit` pour n'en montrer qu'une partie.
-->
<script lang="ts">
	import { reviews } from '$lib/content/studio';

	let { limit }: { limit?: number } = $props();

	const shown = $derived(limit ? reviews.slice(0, limit) : reviews);
</script>

<ul class="auto-grid reviews" role="list">
	{#each shown as r (r.author)}
		<li class="card">
			<figure class="review">
				<blockquote><p class="t-body-lg">« {r.quote} »</p></blockquote>
				<figcaption class="t-body-sm t-muted">{r.author}</figcaption>
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
	figcaption {
		padding-top: var(--space-4);
		border-top: var(--border-hair) solid var(--line);
	}
</style>
