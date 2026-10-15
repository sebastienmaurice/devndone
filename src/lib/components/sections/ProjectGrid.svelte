<!--
	Cartes de réalisations (design system v1.1, « carte à image ») : visuel de présentation recadré
	sur les écrans, nom, technologies, texte, bouton rond dans le coin échancré. Chaque carte est un
	seul lien vers le site du projet, ouvert dans un nouvel onglet ; le bouton rond est décoratif.
	Visuels : src/lib/assets/projets/<image>.jpg, convertis en AVIF / WebP au build.
-->
<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import { projects } from '$lib/content/realisations';
	import Icon from '../brand/Icon.svelte';

	let { limit, headingLevel = 3 }: { limit?: number; headingLevel?: 2 | 3 | 4 } = $props();

	const pictures = import.meta.glob<Picture>('/src/lib/assets/projets/*.jpg', {
		eager: true,
		query: { enhanced: true },
		import: 'default'
	});
	const pictureOf = (image: string) => pictures[`/src/lib/assets/projets/${image}.jpg`];

	const shown = $derived(limit ? projects.slice(0, limit) : projects);
	const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');
</script>

<ul class="auto-grid projects" role="list">
	{#each shown as p (p.name)}
		<li class="media-card">
			<a class="media-card__body" href={p.url} target="_blank" rel="noopener">
				<div class="media-card__media">
					{#if pictureOf(p.image)}
						<enhanced:img
							src={pictureOf(p.image)}
							alt="Aperçu du site {p.name} sur ordinateur et mobile"
							sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
							loading="lazy"
						/>
					{/if}
				</div>
				<div class="media-card__text">
					<p class="t-tech">{p.stack}</p>
					<svelte:element this={`h${headingLevel}`} class="t-h3">{p.name}</svelte:element>
					<p>{p.text}</p>
					<p class="t-caption">
						{host(p.url)}<span class="sr-only"> (nouvel onglet)</span>
					</p>
				</div>
			</a>
			<span class="media-card__go" aria-hidden="true"><Icon name="arrow-up-right" /></span>
		</li>
	{/each}
</ul>

<style>
	.projects {
		--auto-min: 19rem;
	}
</style>
