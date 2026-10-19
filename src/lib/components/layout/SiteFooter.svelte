<!--
	Pied de page partagé : logo et signature, colonnes Expertises, Studio et Contact (liens déjà
	publiés), puis la mention du site en ligne et les pages légales. Colonnes : content/pages.ts.
-->
<script lang="ts">
	import { site } from '$lib/config/site';
	import { legal } from '$lib/content/legal';
	import { footerPages } from '$lib/content/pages';
	import { contactIntro, links } from '$lib/content/studio';
	import Icon from '../brand/Icon.svelte';
	import Logo from '../brand/Logo.svelte';

	const year = new Date().getFullYear();

	const contactLinks = [
		{ label: contactIntro.cta, href: '/contact/', external: false },
		{ label: 'Réserver 15 min', href: links.calendly, external: true },
		{ label: legal.publisher.email, href: links.email, external: false },
		{ label: 'LinkedIn', href: links.linkedin, external: true },
		{ label: 'Malt', href: links.malt, external: true }
	];
	const columns = [
		{ id: 'footer-expertises', title: 'Expertises', items: footerPages('expertises') },
		{ id: 'footer-studio', title: 'Studio', items: footerPages('studio') }
	];
</script>

<footer class="site-footer footer">
	<div class="container">
		<div class="footer__grid">
			<div class="stack footer__brand">
				<a href="/" aria-label="Dev'n Done, accueil"
					><Logo variant="horizontal" tone="night" height={36} alt="" /></a
				>
				<p class="tagline">
					{#each site.tagline as word, i (word)}{#if i > 0}<span class="slash" aria-hidden="true"
								>/</span
							>{/if}{word}{/each}
				</p>
			</div>

			{#each columns as col (col.id)}
				<nav aria-labelledby={col.id}>
					<p class="site-footer__title" id={col.id}>{col.title}</p>
					<ul>
						{#each col.items as item (item.path)}
							<li><a href={item.path}>{item.label}</a></li>
						{/each}
					</ul>
				</nav>
			{/each}

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
			<ul class="cluster" role="list">
				{#each footerPages('legal') as item (item.path)}
					<li><a class="link" href={item.path}>{item.label}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</footer>

<style>
	.footer__grid {
		display: grid;
		gap: var(--space-7);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr));
	}
	@media (min-width: 1024px) {
		.footer__grid {
			grid-template-columns: 4fr 2fr 2fr 3fr;
		}
	}
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
