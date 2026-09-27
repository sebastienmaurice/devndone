<!--
	Fil d'Ariane visible + données structurées BreadcrumbList.
	Le dernier élément est la page courante (sans lien).
-->
<script lang="ts">
	import { absoluteUrl } from '$lib/config/site';

	type Crumb = { label: string; href?: string };

	let { items }: { items: readonly Crumb[] } = $props();

	const jsonLd = $derived(
		`<script type="application/ld+json">${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: items.map((c, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: c.label,
				...(c.href ? { item: absoluteUrl(c.href) } : {})
			}))
		}).replace(/</g, '\\u003c')}</` + 'script>'
	);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON sérialisé et échappé -->
	{@html jsonLd}
</svelte:head>

<nav aria-label="Fil d'Ariane">
	<ol class="breadcrumb">
		{#each items as crumb, i (crumb.label)}
			<li>
				{#if crumb.href && i < items.length - 1}
					<a href={crumb.href}>{crumb.label}</a>
				{:else}
					<span aria-current="page">{crumb.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
