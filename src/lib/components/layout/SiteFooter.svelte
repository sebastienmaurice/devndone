<!--
	Pied de page partagé, sur fond blanc (filet orange en tête) : logo, slogan manuscrit et signature,
	colonnes Expertises, Studio et Contact (liens déjà publiés), puis la mention du
	site en ligne, les pages légales et le retour en haut de page. Colonnes : content/pages.ts.
-->
<script lang="ts">
	import { site } from '$lib/config/site';
	import { legal } from '$lib/content/legal';
	import { footerPages } from '$lib/content/pages';
	import { heroSlogan } from '$lib/content/services';
	import { contactIntro, links } from '$lib/content/studio';
	import Icon from '../brand/Icon.svelte';
	import Logo from '../brand/Logo.svelte';

	const year = new Date().getFullYear();

	const contactLinks = [
		{ label: contactIntro.cta, href: '/contact/', external: false },
		{ label: 'Réserver 15 min', href: links.calendly, external: true },
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
			<div class="footer__brand">
				<a href="/" aria-label="Dev'n Done, accueil"
					><Logo variant="horizontal" tone="night" height={40} alt="" /></a
				>
				<p class="footer__slogan">{heroSlogan.join(' ')}</p>
				<p class="footer__tagline">
					{#each site.tagline as word, i (word)}{#if i > 0}<span
								class="footer__slash"
								aria-hidden="true">/</span
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
			<ul class="footer__legal" role="list">
				{#each footerPages('legal') as item (item.path)}
					<li><a href={item.path}>{item.label}</a></li>
				{/each}
				<li>
					<a class="footer__top" href="#contenu"
						>Haut de page <span class="footer__top-icon" aria-hidden="true"
							><Icon name="arrow-right" /></span
						></a
					>
				</li>
			</ul>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		position: relative;
		overflow: hidden;
		background: var(--surface);
		color: var(--text);
		border-top: 0;
		padding-top: var(--space-8);
	}
	/* Filet orange en tête du pied de page */
	.site-footer::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 4px;
		background: var(--action);
	}

	/* Slogan manuscrit (Caveat), comme sur l'accueil */
	.footer__slogan {
		margin: 0;
		max-width: 20ch;
		font-family: var(--font-hand);
		font-weight: var(--weight-medium);
		font-size: clamp(1.5rem, 1.3rem + 0.8vw, 2rem);
		line-height: 1.1;
		transform: rotate(-2deg);
		transform-origin: left center;
	}
	/* Mobile et tablette : marque sur toute la largeur, puis colonnes de liens deux par deux */
	.footer__grid {
		display: grid;
		gap: var(--space-7) var(--space-5);
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.footer__brand {
		grid-column: 1 / -1;
	}
	@media (min-width: 640px) {
		.footer__grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	@media (min-width: 1024px) {
		.footer__grid {
			grid-template-columns: 4fr 2fr 2fr 3fr;
		}
		.footer__brand {
			grid-column: auto;
		}
	}
	.footer__brand {
		display: grid;
		align-content: start;
		gap: var(--space-4);
	}
	.footer__tagline {
		margin: 0;
		font-size: var(--text-label);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.footer__slash {
		padding-inline: var(--space-2);
		color: var(--accent-deco);
	}
	/* Titres de colonne : surtitre orange, comme le reste du site */
	.site-footer .site-footer__title {
		color: var(--accent-text);
	}
	/* Liens : soulignement orange qui se dessine au survol */
	.site-footer ul a {
		background: linear-gradient(var(--accent-deco), var(--accent-deco)) left bottom / 0 2px
			no-repeat;
		padding-bottom: 2px;
		transition:
			color var(--duration-base) var(--ease-out),
			background-size var(--duration-reveal) var(--ease-out);
	}
	.site-footer ul a:hover,
	.site-footer ul a:focus-visible {
		color: var(--text);
		background-size: 100% 2px;
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

	.footer__legal {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2) var(--space-5);
		font-size: var(--text-caption);
	}
	.footer__top {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}
	.footer__top-icon {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 1px solid var(--line-strong);
		border-radius: 50%;
		transition:
			background-color var(--duration-base) var(--ease-out),
			border-color var(--duration-base) var(--ease-out),
			color var(--duration-base) var(--ease-out);
	}
	.footer__top-icon :global(.icon) {
		width: 14px;
		height: 14px;
		transform: rotate(-90deg);
	}
	.footer__top:hover .footer__top-icon,
	.footer__top:focus-visible .footer__top-icon {
		background: var(--action);
		border-color: var(--action);
		color: var(--on-action);
	}
</style>
