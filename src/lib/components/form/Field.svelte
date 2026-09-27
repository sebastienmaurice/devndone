<!--
	Champ de formulaire complet : libellé visible, aide, erreur, liaisons ARIA automatiques.
	`as` choisit input / textarea / select. La valeur est liable : bind:value.

	<Field label="Email" name="email" type="email" autocomplete="email" required bind:value error={errors.email} />
-->
<script lang="ts">
	import type { HTMLInputTypeAttribute, FullAutoFill } from 'svelte/elements';

	type Option = { value: string; label: string };

	type Props = {
		label: string;
		name: string;
		as?: 'input' | 'textarea' | 'select';
		type?: HTMLInputTypeAttribute;
		value?: string;
		options?: readonly Option[];
		required?: boolean;
		/** Affiche « facultatif » à côté du libellé */
		optional?: boolean;
		hint?: string;
		/** Message d'erreur : rend le champ invalide et l'annonce */
		error?: string;
		autocomplete?: FullAutoFill;
		placeholder?: string;
		disabled?: boolean;
		rows?: number;
		maxlength?: number;
	};

	let {
		label,
		name,
		as = 'input',
		type = 'text',
		value = $bindable(''),
		options = [],
		required = false,
		optional = false,
		hint,
		error,
		autocomplete,
		placeholder,
		disabled = false,
		rows = 6,
		maxlength
	}: Props = $props();

	const uid = $props.id();
	const id = `f-${uid}`;
	const hintId = `${id}-hint`;
	const errorId = `${id}-error`;
	const describedby = $derived(
		[hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
	);
</script>

<div class="field" class:field--invalid={!!error}>
	<label class="field__label" for={id}>
		{label}{#if required}<span class="req" aria-hidden="true">*</span>{/if}{#if optional}<span
				class="opt">facultatif</span
			>{/if}
	</label>
	{#if hint}<p class="field__hint" id={hintId}>{hint}</p>{/if}

	{#if as === 'textarea'}
		<textarea
			class="textarea"
			{id}
			{name}
			{required}
			{placeholder}
			{disabled}
			{rows}
			{maxlength}
			{autocomplete}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={describedby}></textarea>
	{:else if as === 'select'}
		<select
			class="select"
			{id}
			{name}
			{required}
			{disabled}
			{autocomplete}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={describedby}
		>
			{#each options as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	{:else}
		<input
			class="input"
			{id}
			{name}
			{type}
			{required}
			{placeholder}
			{disabled}
			{maxlength}
			{autocomplete}
			bind:value
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={describedby}
		/>
	{/if}

	{#if error}<p class="field__error" id={errorId}>{error}</p>{/if}
</div>
