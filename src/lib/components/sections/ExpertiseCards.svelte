<!--
	Les expertises (maquettes du 19 et du 20/10/2026) : quatre cartes blanches homogènes, mascotte de
	l'expertise, numéro orange, titre, description, flèche. Chaque carte mène à la page du service
	(toute la carte est le lien). 4 colonnes en grand écran, 2 en tablette, 1 sur petit mobile.
	Données : content/services.ts. Mascottes : $lib/assets/mascotte/expertises.ts (illustrations 3:2,
	fond blanc posé sur la carte blanche), reprises dans l'en-tête de chaque page de service.
	Sous les cartes : l'expertise complémentaire (Full Stack) en bandeau orange pleine largeur,
	mascotte détourée qui déborde du haut du bandeau, bouton vers sa page.
-->
<script lang="ts">
	import { expertiseMascots as mascots } from '$lib/assets/mascotte/expertises';
	import { universes } from '$lib/content/services';
	import Icon from '../brand/Icon.svelte';
	import Button from '../ui/Button.svelte';

	let { headingLevel = 3 }: { headingLevel?: 2 | 3 | 4 } = $props();

	const cards = universes.filter((u) => !u.complementary);
	const extras = universes.filter((u) => u.complementary);

	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<ul class="expertises" role="list">
	{#each cards as u, i (u.id)}
		<li>
			<a class="expertise" href={u.path}>
				{#if mascots[u.id]}
					<span class="expertise__mascot">
						<enhanced:img
							src={mascots[u.id].src}
							alt={mascots[u.id].alt}
							sizes="(min-width: 1100px) 300px, (min-width: 640px) 45vw, 90vw"
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

{#each extras as u, j (u.id)}
	<div class="extra surface-orange">
		<div class="extra__text">
			<p class="extra__label">{pad(cards.length + j)} · Expertise complémentaire</p>
			<svelte:element this={`h${headingLevel}`} class="extra__title">{u.title}</svelte:element>
			<p class="extra__lede">{u.text}</p>
			<ul class="extra__tags" role="list">
				{#each u.tags as tag (tag)}<li>{tag}</li>{/each}
			</ul>
			<Button href={u.path} icon="arrow-right"
				>Découvrir l'expertise<span class="sr-only"> {u.title}</span></Button
			>
		</div>
		{#if mascots[u.id]}
			<div class="extra__visual">
				<enhanced:img
					src={mascots[u.id].src}
					alt={mascots[u.id].alt}
					sizes="(min-width: 900px) 640px, 92vw"
					loading="lazy"
				/>
			</div>
		{/if}
	</div>
{/each}

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
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	/* Survol et focus clavier : la carte se soulève, le contour passe à l'orange */
	.expertise:hover,
	.expertise:focus-visible {
		transform: translateY(-6px);
		box-shadow: var(--shadow-card-hover);
		border-color: var(--accent-deco);
	}
	.expertise:focus-visible {
		outline: var(--focus-ring);
		outline-offset: var(--focus-offset);
	}
	/* Fond blanc de l'image fondu dans la carte (multiply : le blanc disparaît) */
	/* Illustrations au format 3:2, sur toute la largeur de la carte */
	.expertise__mascot {
		display: block;
		width: 100%;
		aspect-ratio: 3 / 2;
		margin-bottom: var(--space-2);
		/* Le zoom reste dans le cadre de l'image */
		overflow: hidden;
	}
	.expertise__mascot :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
		transition: transform var(--duration-reveal) var(--ease-out);
	}
	.expertise:hover .expertise__mascot :global(img),
	.expertise:focus-visible .expertise__mascot :global(img) {
		transform: scale(1.1);
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
		transition: transform var(--duration-reveal) var(--ease-out);
	}
	.expertise:hover .expertise__go,
	.expertise:focus-visible .expertise__go {
		transform: translateX(5px);
	}
	/* Mouvement réduit : seuls le contour et l'ombre changent */
	@media (prefers-reduced-motion: reduce) {
		.expertise,
		.expertise__mascot :global(img),
		.expertise__go {
			transition-property: border-color, box-shadow;
		}
		.expertise:hover,
		.expertise:focus-visible,
		.expertise:hover .expertise__mascot :global(img),
		.expertise:focus-visible .expertise__mascot :global(img),
		.expertise:hover .expertise__go,
		.expertise:focus-visible .expertise__go {
			transform: none;
		}
	}
	/* Bandeau orange de l'expertise complémentaire (un seul bandeau Orange par page) */
	.extra {
		position: relative;
		display: grid;
		gap: var(--space-5);
		margin-top: calc(var(--col-gap) + var(--space-6));
		padding: var(--space-6) var(--space-5) 0;
		background: var(--bg);
		color: var(--text);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.extra__text {
		display: grid;
		gap: var(--space-2);
		justify-items: start;
	}
	.extra__label {
		margin: 0;
		font-size: var(--text-label);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
	}
	.extra__title {
		margin: 0;
		font-size: var(--text-h2);
		line-height: 1;
	}
	.extra__lede {
		max-width: 26rem;
		margin: 0;
	}
	.extra__tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0 0 var(--space-2);
		padding: 0;
		list-style: none;
	}
	.extra__tags li {
		padding: 0.15rem var(--space-4);
		border: 1.5px solid var(--line-strong);
		border-radius: 999px;
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
	}
	/* Petits écrans : l'illustration détourée sous le texte, posée sur le bord bas */
	.extra__visual {
		margin-inline: calc(-1 * var(--space-5));
	}
	.extra__visual :global(img) {
		display: block;
		width: 100%;
		height: auto;
	}
	/* Tablette et petit écran de bureau : illustration limitée en largeur, alignée à droite */
	@media (min-width: 768px) {
		.extra__visual {
			justify-self: end;
			width: min(100% + var(--space-5), 46rem);
			margin-right: calc(-1 * var(--space-5));
		}
	}
	/* 1400 px et plus : le texte fixe la hauteur du bandeau ; l'illustration, calée en bas à droite,
	   est un peu plus haute que lui et dépasse donc du bord haut (maquette du 20/10/2026).
	   En dessous, l'image très large passerait sous le texte : elle reste sous le texte. */
	@media (min-width: 1400px) {
		.extra {
			grid-template-columns: minmax(0, 22rem);
			padding: var(--space-5) var(--space-7);
		}
		.extra__tags {
			margin: 0;
		}
		.extra__visual {
			position: absolute;
			right: 0;
			bottom: 0;
			width: auto;
			height: calc(100% + 1.75rem);
			margin: 0;
		}
		.extra__visual :global(picture),
		.extra__visual :global(img) {
			width: auto;
			height: 100%;
		}
	}
</style>
