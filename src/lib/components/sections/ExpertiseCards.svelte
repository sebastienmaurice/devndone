<!--
	Les quatre expertises (maquette du 19/10/2026) : cartes blanches homogènes, mascotte de
	l'expertise, numéro orange, titre, description, flèche. Chaque carte mène à la page du service
	(toute la carte est le lien). 4 colonnes en grand écran, 2 en tablette, 1 sur petit mobile.
	Données : content/services.ts. Mascottes : $lib/assets/mascotte/expertise-*.jpg (fond blanc,
	posé sur la carte blanche).
-->
<script lang="ts">
	import { universes } from '$lib/content/services';
	import web from '$lib/assets/mascotte/expertise-web.jpg?enhanced';
	import design from '$lib/assets/mascotte/expertise-design.jpg?enhanced';
	import automatisation from '$lib/assets/mascotte/expertise-automatisation.jpg?enhanced';
	import fullStack from '$lib/assets/mascotte/expertise-fullstack.jpg?enhanced';
	import Icon from '../brand/Icon.svelte';

	let { headingLevel = 3 }: { headingLevel?: 2 | 3 | 4 } = $props();

	const mascots: Record<string, { src: typeof web; alt: string }> = {
		web: { src: web, alt: 'Dev, la mascotte, pouce levé devant son ordinateur portable' },
		design: { src: design, alt: 'Dev, la mascotte, pensif, dessinant sur un carnet' },
		automatisation: {
			src: automatisation,
			alt: 'Dev, la mascotte, réglant une machine à engrenages'
		},
		'full-stack': {
			src: fullStack,
			alt: "Dev, la mascotte, au bureau devant un écran, entouré de schémas d'application"
		}
	};

	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<ul class="expertises" role="list">
	{#each universes as u, i (u.id)}
		<li>
			<a class="expertise" href={u.path}>
				{#if mascots[u.id]}
					<span class="expertise__mascot">
						<enhanced:img
							src={mascots[u.id].src}
							alt={mascots[u.id].alt}
							sizes="(min-width: 1100px) 220px, 200px"
							loading="lazy"
						/>
					</span>
				{/if}
				<span class="expertise__num" aria-hidden="true">{pad(i)}</span>
				<svelte:element this={`h${headingLevel}`} class="t-h3 expertise__title"
					>{u.title}</svelte:element
				>
				<p class="expertise__text">{u.text}</p>
				<span class="expertise__go"
					><span class="sr-only">Découvrir l'expertise {u.title}</span><Icon
						name="arrow-right"
					/></span
				>
			</a>
		</li>
	{/each}
</ul>

<style>
	.expertises {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 1100px) {
		.expertises {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
	.expertise {
		display: grid;
		grid-template-rows: auto auto auto 1fr auto;
		gap: var(--space-2);
		height: 100%;
		padding: var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		color: var(--text);
		text-decoration: none;
		transition:
			transform var(--duration-base) var(--ease-out),
			box-shadow var(--duration-base) var(--ease-out),
			border-color var(--duration-base) var(--ease-out);
	}
	.expertise:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-card-hover);
		border-color: var(--line-strong);
	}
	/* Fond blanc de l'image fondu dans la carte (multiply : le blanc disparaît) */
	.expertise__mascot {
		justify-self: center;
		width: min(100%, 200px);
		margin-bottom: var(--space-2);
	}
	.expertise__mascot :global(img) {
		display: block;
		width: 100%;
		height: auto;
		mix-blend-mode: multiply;
	}
	.expertise__num {
		font-size: var(--text-h3);
		font-weight: var(--weight-extrabold);
		line-height: 1;
		color: var(--accent-deco);
	}
	.expertise__title {
		font-size: clamp(1.5rem, 1.35rem + 0.65vw, 2rem);
	}
	.expertise__text {
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.expertise__go {
		justify-self: end;
		margin-top: var(--space-4);
		color: var(--accent-deco);
		transition: transform var(--duration-base) var(--ease-out);
	}
	.expertise:hover .expertise__go {
		transform: translateX(4px);
	}
</style>
