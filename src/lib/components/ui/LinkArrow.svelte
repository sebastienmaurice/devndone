<!--
	Lien autonome qui fait avancer la lecture : « Explorer → ».
	Un lien externe prend la flèche ↗, s'ouvre dans un nouvel onglet et l'annonce.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '../brand/Icon.svelte';

	type Props = { href: string; children: Snippet };

	let { href, children }: Props = $props();

	const external = $derived(/^https?:\/\//.test(href));
</script>

<a
	class="link-arrow"
	{href}
	rel={external ? 'noopener' : undefined}
	target={external ? '_blank' : undefined}
>
	{@render children()}
	<Icon name={external ? 'arrow-up-right' : 'arrow-right'} />
	{#if external}<span class="sr-only">(nouvel onglet)</span>{/if}
</a>
