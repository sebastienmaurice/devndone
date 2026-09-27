<!--
	Case à cocher ou bouton radio natif, recoloré par le design system.
	<Check name="consent" bind:checked required>J'accepte…</Check>
	<Check type="radio" name="budget" value="small" bind:group={budget}>&lt; 2 000 €</Check>
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		name: string;
		type?: 'checkbox' | 'radio';
		value?: string;
		checked?: boolean;
		group?: string;
		required?: boolean;
		disabled?: boolean;
		children: Snippet;
	};

	let {
		name,
		type = 'checkbox',
		value = 'on',
		checked = $bindable(false),
		group = $bindable(),
		required = false,
		disabled = false,
		children
	}: Props = $props();
</script>

<label class="check">
	{#if type === 'radio'}
		<input type="radio" {name} {value} {required} {disabled} bind:group />
	{:else}
		<input type="checkbox" {name} {value} {required} {disabled} bind:checked />
	{/if}
	<span>{@render children()}</span>
</label>
