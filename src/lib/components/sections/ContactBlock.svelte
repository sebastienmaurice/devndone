<!--
	Bloc contact (maquette du 19/10/2026) : panneau Night arrondi, mascotte (sourire malicieux, pouce levé)
	à gauche, titre « Un projet en tête ? On le rend DONE. », texte, bouton orange vers /contact/,
	petits traits d'énergie orange et menthe. Textes : content/studio.ts.
-->
<script lang="ts">
	import { contactIntro } from '$lib/content/studio';
	import mascotte from '$lib/assets/mascotte/mascotte-renard-dev-n-done-pouce-leve.png?enhanced';
	import DoneWord from '../brand/DoneWord.svelte';
	import Icon from '../brand/Icon.svelte';
	import Button from '../ui/Button.svelte';

	type Props = { level?: 1 | 2; id?: string };

	let { level = 2, id }: Props = $props();
</script>

<section {id} class="contact-wrap" aria-labelledby="contact-title">
	<div class="container">
		<div class="contact surface-night">
			<div class="contact__mascot">
				<enhanced:img
					src={mascotte}
					alt="Dev, la mascotte Dev'n Done, en sweat à capuche, sourire malicieux et pouce levé"
					sizes="240px"
					loading="lazy"
				/>
			</div>

			<div class="contact__text">
				<p class="contact__label">{contactIntro.eyebrow}</p>
				<svelte:element this={`h${level}`} class="t-h2" id="contact-title">
					{contactIntro.question}<br /><span class="contact__done">On le rend <DoneWord /></span>
				</svelte:element>
				<p class="contact__lede">{contactIntro.lede}</p>
			</div>

			<div class="contact__action">
				<svg class="contact__spark contact__spark--a" viewBox="0 0 24 24" aria-hidden="true"
					><path d="M3 8 L13 4 M3 16 L15 15 M6 21 L14 19" /></svg
				>
				<Button href="/contact/" size="lg" icon="arrow-right"
					><Icon name="calendar" />{contactIntro.cta}</Button
				>
				<svg class="contact__spark contact__spark--b" viewBox="0 0 24 24" aria-hidden="true"
					><path d="M21 8 L11 4 M21 16 L9 15 M18 21 L10 19" /></svg
				>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-wrap {
		padding-block: var(--space-8) var(--section-y);
	}
	.contact {
		position: relative;
		display: grid;
		gap: var(--space-6);
		align-items: center;
		padding: var(--space-7) var(--space-6);
		background: var(--bg);
		color: var(--text);
		border-radius: calc(var(--radius-card) * 1.5);
	}
	@media (min-width: 900px) {
		.contact {
			grid-template-columns: 220px minmax(0, 1fr) auto;
			padding: var(--space-6) var(--space-8) var(--space-6) var(--space-6);
		}
	}
	.contact__mascot {
		width: min(220px, 60%);
		overflow: hidden;
		border-radius: calc(var(--radius-card) * 1.2);
	}
	.contact__mascot :global(img) {
		display: block;
		width: 100%;
		height: auto;
	}
	@media (min-width: 900px) {
		.contact__mascot {
			width: 100%;
			margin-block: calc(-1 * var(--space-8)) 0;
		}
	}
	.contact__text {
		display: grid;
		gap: var(--space-3);
	}
	.contact__label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		margin: 0;
		font-size: var(--text-label);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--accent-text);
	}
	.contact__label::before,
	.contact__label::after {
		content: '';
		width: 1.25rem;
		height: 2px;
		background: var(--accent-deco);
	}
	.contact__done {
		white-space: nowrap;
	}
	.contact__lede {
		margin: 0;
		max-width: 34em;
		color: var(--text-muted);
	}
	.contact > * {
		min-width: 0;
	}
	.contact__action {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}
	.contact__action :global(.btn .icon:first-child) {
		width: 20px;
		height: 20px;
	}
	.contact__spark {
		width: 28px;
		height: 28px;
		flex: none;
		fill: none;
		stroke-width: 2.4;
		stroke-linecap: round;
	}
	/* Mobile : pas de traits décoratifs, le bouton peut passer sur deux lignes */
	@media (max-width: 599px) {
		.contact {
			padding-inline: var(--space-5);
		}
		.contact__spark {
			display: none;
		}
		.contact__action :global(.btn) {
			white-space: normal;
			text-align: left;
			padding-block: var(--space-3);
		}
	}
	.contact__spark--a {
		stroke: var(--action-alt);
	}
	.contact__spark--b {
		stroke: var(--accent-deco);
	}
</style>
