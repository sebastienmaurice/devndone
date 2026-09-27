<!--
	En-tête du site : logo horizontal dès 640 px, compact en dessous.
	La navigation n'apparaît que lorsque des pages y sont inscrites (content/pages.ts).
-->
<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { navPages } from '$lib/content/pages';
	import Logo from '../brand/Logo.svelte';

	let open = $state(false);
	let toggle: HTMLButtonElement | undefined = $state();

	const isCurrent = (path: string) => page.url.pathname === path;

	function close(returnFocus = false) {
		open = false;
		if (returnFocus) toggle?.focus();
	}

	afterNavigate(() => close());
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && open && close(true)} />

<header class="site-header">
	<div class="container site-header__inner">
		<a class="logo logo--header" href="/" aria-label="Dev'n Done — accueil">
			<Logo variant="horizontal" alt="" />
		</a>
		<a class="logo logo--compact" href="/" aria-label="Dev'n Done — accueil">
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
		{/if}
	</div>
</header>

{#if navPages.length}
	<nav class="mobile-nav" id="mobile-nav" aria-label="Navigation principale" hidden={!open}>
		<ul class="mobile-nav__list">
			{#each navPages as item (item.path)}
				<li>
					<a href={item.path} aria-current={isCurrent(item.path) ? 'page' : undefined}
						>{item.label}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
