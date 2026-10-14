<!--
	Cartes de réalisations (content/realisations.ts), d'après la maquette « réalisations » :
	numéro cerclé, nom, technologies, texte. Chaque carte est un seul lien vers le site du projet,
	ouvert dans un nouvel onglet. Pas de capture d'écran tant que les fichiers n'existent pas.
-->
<script lang="ts">
	import { projects } from '$lib/content/realisations';
	import Icon from '../brand/Icon.svelte';

	let { limit, headingLevel = 3 }: { limit?: number; headingLevel?: 2 | 3 | 4 } = $props();

	const shown = $derived(limit ? projects.slice(0, limit) : projects);
	const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');
	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<ul class="auto-grid projects" role="list">
	{#each shown as p, i (p.name)}
		<li>
			<a class="card card--link project" href={p.url} target="_blank" rel="noopener">
				<div class="project__head">
					<span class="num-circle" aria-hidden="true">{pad(i)}</span>
					<div>
						<svelte:element this={`h${headingLevel}`} class="t-h3">{p.name}</svelte:element>
						<p class="t-tech t-muted">{p.stack}</p>
					</div>
				</div>
				<p>{p.text}</p>
				<span class="link-arrow"
					>{host(p.url)}<Icon name="arrow-up-right" /><span class="sr-only">(nouvel onglet)</span
					></span
				>
			</a>
		</li>
	{/each}
</ul>

<style>
	.projects {
		--auto-min: 18rem;
	}
	.project {
		height: 100%;
		grid-template-rows: auto 1fr auto;
	}
	.project__head {
		display: flex;
		align-items: flex-start;
		gap: var(--space-4);
	}
	.num-circle {
		display: inline-grid;
		place-items: center;
		flex: none;
		width: 2.75rem;
		height: 2.75rem;
		border: var(--border-hair) solid var(--accent-deco);
		border-radius: 50%;
		font-family: var(--font-mono);
		font-size: var(--text-body-sm);
		color: var(--accent-text);
	}
</style>
