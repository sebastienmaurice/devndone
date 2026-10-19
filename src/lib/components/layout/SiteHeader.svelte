<!--
	En-tête du site (maquette du 19/10/2026) : logo officiel à gauche, les pages du site au centre
	séparées par des slashs orange, bouton « Parlons de votre projet » à droite. Fond Ivoire, collant.
	Sous 1100 px : logo, bouton Menu et panneau plein écran.
	Navigation : content/pages.ts (headerNav, mobileNav).
-->
<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { headerNav, mobileNav } from '$lib/content/pages';
	import { contactIntro } from '$lib/content/studio';
	import Button from '../ui/Button.svelte';
	import Logo from '../brand/Logo.svelte';

	let open = $state(false);
	let toggle: HTMLButtonElement | undefined = $state();

	// Actif sur la page et ses sous-pages ; l'accueil seulement sur « / »
	const isCurrent = (match: string) =>
		match === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(match);

	function close(returnFocus = false) {
		open = false;
		if (returnFocus) toggle?.focus();
	}

	afterNavigate(() => close());

	// Panneau ouvert : la page derrière ne défile plus
	$effect(() => {
		document.documentElement.style.overflow = open ? 'hidden' : '';
		return () => {
			document.documentElement.style.overflow = '';
		};
	});

	// Le panneau n'existe que sous 1100 px : on le ferme si la fenêtre s'élargit
	$effect(() => {
		const wide = window.matchMedia('(min-width: 1100px)');
		const onChange = () => wide.matches && close();
		wide.addEventListener('change', onChange);
		return () => wide.removeEventListener('change', onChange);
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && open && close(true)} />

<header class="site-header header">
	<div class="container header__inner">
		<a class="header__logo" href="/" aria-label="Dev'n Done, accueil">
			<Logo variant="compact" tone="night" alt="" height={52} />
		</a>

		<nav class="header__nav" aria-label="Navigation principale">
			<ul>
				{#each headerNav as item, i (item.href)}
					<li>
						{#if i > 0}<span class="header__slash" aria-hidden="true">/</span>{/if}
						<a href={item.href} aria-current={isCurrent(item.match) ? 'page' : undefined}
							>{item.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="header__actions">
			<Button href="/contact/" icon="arrow-right" class="header__cta">{contactIntro.cta}</Button>
			<button
				bind:this={toggle}
				class="header__toggle"
				type="button"
				aria-expanded={open}
				aria-controls="mobile-nav"
				onclick={() => (open = !open)}
			>
				<span class="header__bars" aria-hidden="true"><i></i><i></i></span>
				Menu
			</button>
		</div>
	</div>
</header>

<nav class="mobile-nav surface-night" id="mobile-nav" aria-label="Menu" hidden={!open}>
	<ul class="mobile-nav__list">
		{#each mobileNav as item (item.href)}
			<li>
				<a
					href={item.href}
					onclick={() => close()}
					aria-current={isCurrent(item.match) ? 'page' : undefined}>{item.label}</a
				>
			</li>
		{/each}
	</ul>
	<Button href="/contact/" icon="arrow-right" block>{contactIntro.cta}</Button>
</nav>

<style>
	.header {
		background: color-mix(in srgb, var(--bg) 92%, transparent);
		border-bottom: 1px solid transparent;
	}
	.header__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-5);
		min-height: 88px;
	}
	.header__logo {
		display: inline-flex;
		flex: none;
	}

	.header__nav {
		display: none;
	}
	.header__nav ul {
		display: flex;
		align-items: center;
		gap: 0;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.header__nav li {
		display: flex;
		align-items: center;
	}
	.header__nav a {
		position: relative;
		padding: var(--space-2) 0;
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
		color: var(--text);
		text-decoration: none;
	}
	.header__nav a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		border-radius: 2px;
		background: var(--accent-deco);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--duration-reveal) var(--ease-out);
	}
	.header__nav a:hover::after,
	.header__nav a[aria-current='page']::after {
		transform: scaleX(1);
	}
	.header__slash {
		padding-inline: clamp(var(--space-3), 1.4vw, var(--space-5));
		color: var(--accent-deco);
		font-weight: var(--weight-bold);
	}

	.header__actions {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}
	.header__actions :global(.header__cta) {
		display: none;
	}

	.header__toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		min-height: 44px;
		padding: 0 var(--space-4);
		background: none;
		border: 1px solid var(--line-strong);
		border-radius: var(--radius-btn);
		font-family: var(--font-ui);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-bold);
		color: var(--text);
		cursor: pointer;
	}
	.header__bars {
		display: grid;
		gap: 4px;
		width: 16px;
	}
	.header__bars i {
		height: 2px;
		background: var(--text);
		transition: transform var(--duration-base) var(--ease-out);
	}
	.header__bars i:first-child {
		background: var(--accent-deco);
		width: 70%;
	}
	.header__toggle[aria-expanded='true'] .header__bars i:first-child {
		width: 100%;
		transform: translateY(3px) rotate(45deg);
	}
	.header__toggle[aria-expanded='true'] .header__bars i:last-child {
		transform: translateY(-3px) rotate(-45deg);
	}

	@media (min-width: 640px) {
		.header__actions :global(.header__cta) {
			display: inline-flex;
		}
	}
	@media (min-width: 1100px) {
		.header__nav {
			display: block;
		}
		.header__toggle {
			display: none;
		}
	}
	@media (max-width: 639px) {
		.header__inner {
			min-height: 72px;
		}
	}

	/* Panneau mobile : sous le header, plein écran, sur fond Night */
	.mobile-nav {
		inset: 88px 0 0 0;
		background: var(--bg);
		color: var(--text);
	}
	@media (max-width: 639px) {
		.mobile-nav {
			inset: 72px 0 0 0;
		}
	}
</style>
