<!--
	Bouton de marque. Avec `href` → lien <a> (navigation), sinon <button> (action).
	Primaire : orange sur Night, Night sur Ivoire / Orange — automatique selon le contexte.

	<Button href="/contact/" icon="arrow-right">Parlons de votre projet</Button>
	<Button variant="secondary" size="sm" onclick={…}>Filtrer</Button>
	<Button variant="alt" href="/realisations/">Voir les réalisations</Button>  (action secondaire Mint)
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon, { type IconName } from '../brand/Icon.svelte';

	type Props = {
		variant?: 'primary' | 'secondary' | 'alt' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		/** Icône placée après le libellé */
		icon?: IconName;
		/** Bouton icône seul : `label` devient obligatoire */
		iconOnly?: boolean;
		label?: string;
		block?: boolean;
		/** Action en cours (envoi de formulaire) */
		busy?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: HTMLButtonAttributes['onclick'];
		class?: string;
		children?: Snippet;
	};

	let {
		variant = 'primary',
		size = 'md',
		href,
		icon,
		iconOnly = false,
		label,
		block = false,
		busy = false,
		disabled = false,
		type = 'button',
		onclick,
		class: className = '',
		children
	}: Props = $props();

	const external = $derived(!!href && /^https?:\/\//.test(href));
	const movingIcon = $derived(icon === 'arrow-right' || icon === 'arrow-up-right');
	const classes = $derived(
		[
			'btn',
			`btn--${variant}`,
			size !== 'md' && `btn--${size}`,
			block && 'btn--block',
			iconOnly && 'btn--icon',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

{#snippet content()}
	{#if !iconOnly}{@render children?.()}{/if}
	{#if icon}
		<Icon
			name={icon}
			class="btn__icon {movingIcon ? 'btn__icon--move' : ''}"
			label={iconOnly ? label : undefined}
		/>
	{/if}
{/snippet}

{#if href && !disabled}
	<a
		class={classes}
		{href}
		aria-label={iconOnly ? label : undefined}
		rel={external ? 'noopener' : undefined}
		target={external ? '_blank' : undefined}
	>
		{@render content()}
		{#if external}<span class="sr-only">(nouvel onglet)</span>{/if}
	</a>
{:else}
	<button
		class={classes}
		{type}
		disabled={disabled || busy}
		aria-busy={busy || undefined}
		aria-label={iconOnly ? label : undefined}
		{onclick}
	>
		{@render content()}
	</button>
{/if}
