<!--
	Étapes de méthode numérotées « 01 / 04 ». `current` met une étape en évidence.
-->
<script lang="ts" module>
	export type StepItem = { title: string; text: string };
</script>

<script lang="ts">
	type Props = { items: readonly StepItem[]; current?: number; headingLevel?: 2 | 3 | 4 };

	let { items, current, headingLevel = 3 }: Props = $props();

	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<ol class="steps" style:--step-total={`"${pad(items.length)}"`}>
	{#each items as step, i (step.title)}
		<li
			class="step"
			class:is-current={current === i}
			aria-current={current === i ? 'step' : undefined}
		>
			<span class="sr-only">Étape {i + 1} sur {items.length} :</span>
			<svelte:element this={`h${headingLevel}`} class="t-h3">{step.title}</svelte:element>
			<p>{step.text}</p>
		</li>
	{/each}
</ol>
