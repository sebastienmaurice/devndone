<!--
	Cartes de réalisations (content/realisations.ts). Chaque carte est un seul lien vers le
	site du projet, ouvert dans un nouvel onglet. `limit` pour n'en montrer qu'une partie.
-->
<script lang="ts">
	import { projects } from '$lib/content/realisations';
	import Icon from '../brand/Icon.svelte';

	let { limit, headingLevel = 3 }: { limit?: number; headingLevel?: 2 | 3 | 4 } = $props();

	const shown = $derived(limit ? projects.slice(0, limit) : projects);
	const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');
</script>

<ul class="auto-grid projects" role="list">
	{#each shown as p (p.name)}
		<li>
			<a class="card card--link project" href={p.url} target="_blank" rel="noopener">
				<p class="t-tech">{p.stack}</p>
				<svelte:element this={`h${headingLevel}`} class="t-h3">{p.name}</svelte:element>
				<p class="t-muted">{p.text}</p>
				<span class="link-arrow project__host"
					>{host(p.url)}<Icon name="arrow-up-right" /><span class="sr-only">(nouvel onglet)</span
					></span
				>
			</a>
		</li>
	{/each}
</ul>

<style>
	.projects {
		--auto-min: 17rem;
	}
	.project {
		height: 100%;
		grid-template-rows: auto auto 1fr auto;
	}
</style>
