<script lang="ts">
	import { site } from '$lib/config/site';
	import { legalPages } from '$lib/content/pages';
	import Logo from '../brand/Logo.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="container">
		<div class="site-footer__grid">
			<div class="stack">
				<span class="logo logo--footer"
					><Logo variant="horizontal" height={36} alt={site.wordmark} /></span
				>
				<p class="t-body-sm t-muted t-measure">{site.description}</p>
				<p class="tagline">
					{#each site.tagline as word, i (word)}{#if i > 0}<span class="slash" aria-hidden="true"
								>/</span
							>{/if}{word}{/each}
				</p>
			</div>
		</div>
		<div class="site-footer__bottom">
			<span>© {year} {site.name}</span>
			{#if legalPages.length}
				<ul class="cluster" role="list">
					{#each legalPages as item (item.path)}
						<li><a class="link" href={item.path}>{item.label}</a></li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</footer>
