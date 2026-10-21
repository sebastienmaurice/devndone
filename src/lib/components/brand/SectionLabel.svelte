<!--
	Surtitre de section (maquette du 19/10/2026) : capitales espacées, petit trait orange.
	`center` : trait sous le libellé (« NOTRE EXPERTISE ») ; `left` : trait avant (trait puis « MON PROCESS »).
-->
<script lang="ts">
	type Props = { label: string; align?: 'center' | 'left'; as?: 'p' | 'span' };

	let { label, align = 'left', as = 'p' }: Props = $props();
</script>

<svelte:element this={as} class="section-label section-label--{align}">{label}</svelte:element>

<style>
	.section-label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		margin: 0;
		font-size: var(--text-label);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text);
	}
	.section-label::before {
		content: '';
		width: 1.75rem;
		height: 2px;
		border-radius: 2px;
		background: var(--accent-deco);
	}
	.section-label--center {
		flex-direction: column-reverse;
		gap: var(--space-2);
	}
	.section-label--center::before {
		width: 1.5rem;
	}
</style>
