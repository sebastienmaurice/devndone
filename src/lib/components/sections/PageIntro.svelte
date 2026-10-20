<!--
	En-tête des pages internes (direction de la maquette du 19/10/2026) : fil d'Ariane, surtitre à
	trait orange, titre H1, chapô, actions facultatives. `aside` : visuel à droite en grand écran.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import AccentTitle from '../brand/AccentTitle.svelte';
	import SectionLabel from '../brand/SectionLabel.svelte';
	import Breadcrumb from '../ui/Breadcrumb.svelte';

	type Props = {
		label: string;
		/** Titre texte (sinon `title` en snippet) */
		heading?: string;
		/** Passage du titre en orange (titre bicolore) */
		accent?: string | readonly string[];
		lede?: string;
		crumbs?: readonly { label: string; href?: string }[];
		title?: Snippet;
		actions?: Snippet;
		aside?: Snippet;
	};

	let { label, heading, accent, lede, crumbs, title, actions, aside }: Props = $props();
</script>

<section class="page-intro" aria-labelledby="page-title">
	<div class="container page-intro__grid" class:page-intro__grid--aside={!!aside}>
		<div class="page-intro__text">
			{#if crumbs}<Breadcrumb items={crumbs} />{/if}
			<SectionLabel {label} />
			<h1 class="t-h1" id="page-title">
				{#if title}{@render title()}{:else if heading}<AccentTitle text={heading} {accent} />{/if}
			</h1>
			{#if lede}<p class="page-intro__lede">{lede}</p>{/if}
			{#if actions}<div class="page-intro__actions">{@render actions()}</div>{/if}
		</div>
		{#if aside}<div class="page-intro__aside">{@render aside()}</div>{/if}
	</div>
</section>

<style>
	.page-intro {
		padding-block: clamp(var(--space-6), 5vw, var(--space-9))
			clamp(var(--space-6), 4vw, var(--space-8));
	}
	/* Entrée au chargement (CSS seul) : textes en cascade, visuel qui monte */
	.page-intro__text > :global(*) {
		animation: intro-rise 620ms var(--ease-out) both;
	}
	.page-intro__text > :global(:nth-child(2)) {
		animation-delay: 80ms;
	}
	.page-intro__text > :global(:nth-child(3)) {
		animation-delay: 160ms;
	}
	.page-intro__text > :global(:nth-child(4)) {
		animation-delay: 260ms;
	}
	.page-intro__text > :global(:nth-child(n + 5)) {
		animation-delay: 360ms;
	}
	/* Visuel : on anime l'image elle-même, pas son conteneur. Un conteneur animé (transform,
	   opacité) isole l'image, et son fond blanc ne se fond plus dans l'Ivoire (mix-blend-mode) */
	.page-intro__aside :global(:is(img, ul)) {
		animation: intro-visual 900ms var(--ease-out) 200ms both;
	}
	@keyframes intro-rise {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
	}
	@keyframes intro-visual {
		from {
			opacity: 0;
			transform: translateY(40px) scale(0.95);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.page-intro__text > :global(*),
		.page-intro__aside :global(:is(img, ul)) {
			animation: none;
		}
	}
	.page-intro__grid {
		display: grid;
		gap: var(--space-7);
		align-items: center;
	}
	@media (min-width: 1100px) {
		.page-intro__grid--aside {
			grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
		}
	}
	.page-intro__text {
		display: grid;
		gap: var(--space-4);
		justify-items: start;
	}
	.page-intro__text .t-h1 {
		max-width: 18em;
		text-wrap: balance;
	}
	.page-intro__lede {
		max-width: 40rem;
		margin: 0;
		font-size: var(--text-body-lg);
		line-height: var(--leading-body-lg);
		color: var(--text-muted);
	}
	.page-intro__actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-top: var(--space-2);
	}
</style>
