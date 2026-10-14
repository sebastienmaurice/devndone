<!--
	En-tête du site, d'après le design system (17 / Navigation) :
	- logo horizontal dès 640 px, compact en dessous ; le logo ramène à l'accueil ;
	- menu complet dès 1024 px, bouton d'action dès 1200 px (.nav__cta) ;
	- en dessous de 1024 px, bouton Menu et panneau plein écran à grands titres numérotés.
	La navigation vient de content/pages.ts (6 entrées maximum).
-->
<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { navPages } from '$lib/content/pages';
	import { contactIntro, links } from '$lib/content/studio';
	import Button from '../ui/Button.svelte';
	import Logo from '../brand/Logo.svelte';

	let open = $state(false);
	let toggle: HTMLButtonElement | undefined = $state();

	const isCurrent = (path: string) => page.url.pathname === path;

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

	// Le panneau n'existe que sous 1024 px : on le ferme si la fenêtre s'élargit
	$effect(() => {
		const desktop = window.matchMedia('(min-width: 1024px)');
		const onChange = () => desktop.matches && close();
		desktop.addEventListener('change', onChange);
		return () => desktop.removeEventListener('change', onChange);
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && open && close(true)} />

<header class="site-header">
	<div class="container site-header__inner">
		<a class="logo logo--header" href="/" aria-label="Dev'n Done, accueil">
			<Logo variant="horizontal" alt="" />
		</a>
		<a class="logo logo--compact" href="/" aria-label="Dev'n Done, accueil">
			<Logo variant="compact" alt="" />
		</a>

		{#if navPages.length}
			<nav class="nav" aria-label="Navigation principale">
				<ul class="nav__list">
					{#each navPages as item (item.path)}
						<li>
							<a
								class="nav__link"
								href={item.path}
								aria-current={isCurrent(item.path) ? 'page' : undefined}>{item.label}</a
							>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="cluster">
				<Button href={links.calendly} size="sm" class="nav__cta">{contactIntro.cta}</Button>
				<button
					bind:this={toggle}
					class="nav-toggle"
					type="button"
					aria-expanded={open}
					aria-controls="mobile-nav"
					onclick={() => (open = !open)}
				>
					<span class="nav-toggle__bars" aria-hidden="true"><i></i><i></i></span>
					Menu
				</button>
			</div>
		{/if}
	</div>
</header>

{#if navPages.length}
	<nav class="mobile-nav" id="mobile-nav" aria-label="Navigation principale" hidden={!open}>
		<ul class="mobile-nav__list">
			{#each navPages as item (item.path)}
				<li>
					<a
						href={item.path}
						onclick={() => close()}
						aria-current={isCurrent(item.path) ? 'page' : undefined}>{item.label}</a
					>
				</li>
			{/each}
		</ul>
		<Button href={links.calendly} block>{contactIntro.cta}</Button>
	</nav>
{/if}
