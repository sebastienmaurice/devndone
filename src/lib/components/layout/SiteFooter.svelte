<!--
	Pied de page, d'après le design system (17 / Navigation) : logo et signature,
	colonne « Studio » (pages du menu), colonne « Contact » (liens déjà publiés sur le site),
	puis la mention du site en ligne et les liens légaux.
-->
<script lang="ts">
	import { site } from '$lib/config/site';
	import { legal } from '$lib/content/legal';
	import { legalPages, navPages } from '$lib/content/pages';
	import { contactIntro, links } from '$lib/content/studio';
	import Icon from '../brand/Icon.svelte';
	import Logo from '../brand/Logo.svelte';

	const year = new Date().getFullYear();

	const contactLinks = [
		{ label: contactIntro.cta, href: links.calendly, external: true },
		{ label: legal.publisher.email, href: links.email, external: false },
		{ label: 'LinkedIn', href: links.linkedin, external: true },
		{ label: 'Malt', href: links.malt, external: true }
	];
</script>

<footer class="site-footer">
	<div class="container">
		<div class="site-footer__grid">
			<div class="stack">
				<a class="logo logo--footer" href="/" aria-label="Dev'n Done, accueil"
					><Logo variant="horizontal" height={36} alt="" /></a
				>
				<p class="tagline">
					{#each site.tagline as word, i (word)}{#if i > 0}<span class="slash" aria-hidden="true"
								>/</span
							>{/if}{word}{/each}
				</p>
			</div>

			{#if navPages.length}
				<nav aria-labelledby="footer-studio">
					<p class="site-footer__title" id="footer-studio">Studio</p>
					<ul>
						{#each navPages as item (item.path)}
							<li><a href={item.path}>{item.label}</a></li>
						{/each}
					</ul>
				</nav>
			{/if}

			<div>
				<p class="site-footer__title" id="footer-contact">Contact</p>
				<ul aria-labelledby="footer-contact">
					{#each contactLinks as item (item.href)}
						<li>
							{#if item.external}
								<a class="external" href={item.href} target="_blank" rel="noopener"
									>{item.label}
									<Icon name="arrow-up-right" /><span class="sr-only">(nouvel onglet)</span></a
								>
							{:else}
								<a href={item.href}>{item.label}</a>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="site-footer__bottom">
			<!-- Même mention que le pied de page du site en ligne -->
			<span
				>© {year} Dev'n Done · {legal.publisher.name}, entrepreneur individuel · SIREN {legal
					.publisher.siren} · Caudry (59)</span
			>
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

<style>
	/* Flèche des liens externes sur la même ligne que le libellé */
	.external {
		display: inline-flex;
		align-items: center;
		gap: var(--space-1);
	}
	.external :global(.icon) {
		width: 0.875em;
		height: 0.875em;
	}
</style>
