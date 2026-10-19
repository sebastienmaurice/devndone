<!--
	Les quatre expertises (maquette du 19/10/2026) : cartes blanches homogènes, icône, numéro orange,
	titre, description, flèche. Chaque carte mène à la page du service (toute la carte est le lien).
	4 colonnes en grand écran, 2 en tablette, 1 sur petit mobile. Données : content/services.ts.
-->
<script lang="ts">
	import { universes } from '$lib/content/services';
	import Icon from '../brand/Icon.svelte';

	let { headingLevel = 3 }: { headingLevel?: 2 | 3 | 4 } = $props();

	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<ul class="expertises" role="list">
	{#each universes as u, i (u.id)}
		<li>
			<a class="expertise" href={u.path}>
				<span class="expertise__icon"><Icon name={u.icon} /></span>
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
		padding: var(--space-6) var(--space-5) var(--space-5);
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
	.expertise__icon {
		display: grid;
		place-items: center;
		width: 64px;
		height: 64px;
		margin-bottom: var(--space-4);
		border-radius: 18px;
		background: var(--surface-sunk);
		color: var(--text);
	}
	.expertise__icon :global(.icon) {
		width: 34px;
		height: 34px;
		stroke-width: 1.75;
	}
	.expertise__num {
		font-size: var(--text-h3);
		font-weight: var(--weight-extrabold);
		line-height: 1;
		color: var(--accent-deco);
	}
	.expertise__title {
		font-size: clamp(1.375rem, 1.25rem + 0.556vw, 1.75rem);
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
