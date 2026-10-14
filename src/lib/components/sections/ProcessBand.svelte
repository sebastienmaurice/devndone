<!--
	Process en 4 étapes (content/services.ts), d'après la maquette « Hero » : un bandeau
	avec le titre à gauche et les étapes numérotées à droite.
-->
<script lang="ts">
	import { processIntro, processSteps } from '$lib/content/services';
	import Eyebrow from '../brand/Eyebrow.svelte';

	let { level = 2 }: { level?: 1 | 2 } = $props();

	const pad = (n: number) => String(n + 1).padStart(2, '0');
</script>

<div class="card process">
	<div class="process__intro">
		<Eyebrow label={processIntro.eyebrow} />
		<svelte:element this={`h${level}`} class="t-h2" id="process-title"
			>{processIntro.title}</svelte:element
		>
	</div>
	<ol class="process__steps" role="list">
		{#each processSteps as step, i (step.title)}
			<li>
				<span class="num-circle" aria-hidden="true">{pad(i)}</span>
				<span class="sr-only">Étape {i + 1} sur {processSteps.length} :</span>
				<h3 class="t-h3">{step.title}</h3>
				<p class="t-body-sm t-muted">{step.text}</p>
			</li>
		{/each}
	</ol>
</div>

<style>
	.process {
		gap: var(--space-7);
	}
	@media (min-width: 1024px) {
		.process {
			grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
			align-items: center;
		}
		.process__intro {
			padding-right: var(--space-6);
			border-right: var(--border-hair) solid var(--line);
		}
	}
	.process__intro {
		display: grid;
		gap: var(--space-4);
	}
	.process__steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
		gap: var(--space-6);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.process__steps li {
		display: grid;
		gap: var(--space-3);
		align-content: start;
	}
	.num-circle {
		display: inline-grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border: var(--border-hair) solid var(--accent-deco);
		border-radius: 50%;
		font-family: var(--font-mono);
		font-size: var(--text-body-sm);
		color: var(--accent-text);
	}
</style>
