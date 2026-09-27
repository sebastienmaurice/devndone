<!--
	Message à filet vertical. `info` (orange), `success` (mint), `error` (rouge fonctionnel).
	`live` annonce le message aux lecteurs d'écran (résultat d'un envoi, par exemple).
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '../brand/Icon.svelte';

	type Props = {
		tone?: 'info' | 'success' | 'error';
		title?: string;
		live?: boolean;
		children: Snippet;
	};

	let { tone = 'info', title, live = false, children }: Props = $props();

	const icon = $derived(tone === 'success' ? 'check' : tone === 'error' ? 'alert' : 'info');
	const role = $derived(live ? (tone === 'error' ? 'alert' : 'status') : undefined);
</script>

<div
	class="notice"
	class:notice--success={tone === 'success'}
	class:notice--error={tone === 'error'}
	{role}
>
	<Icon name={icon} class="notice__icon" />
	<p>
		{#if title}<strong>{title}</strong>
		{/if}{@render children()}
	</p>
</div>
