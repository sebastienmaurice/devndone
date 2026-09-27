<!--
	Surtitre : « 02 / Services ». Le numéro (ou mot fort) en gras, le slash orange.
	<Eyebrow lead="02" label="Services" rule />
-->
<script lang="ts">
	type Props = {
		/** Partie mise en avant, avant le slash */
		lead?: string;
		label: string;
		/** Filet horizontal jusqu'au bord */
		rule?: boolean;
		as?: 'p' | 'span';
	};

	let { lead, label, rule = false, as = 'p' }: Props = $props();
</script>

<svelte:element this={as} class="eyebrow" class:eyebrow--rule={rule}>
	{#if lead}<b>{lead}</b><span class="slash" aria-hidden="true">/</span>{/if}{label}
</svelte:element>
