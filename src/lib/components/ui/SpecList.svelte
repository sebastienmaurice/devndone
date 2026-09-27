<!-- Fiche technique : paires clé / valeur en mono. -->
<script lang="ts">
	type Props = { items: readonly { key: string; value: string }[] };

	let { items }: Props = $props();
</script>

<dl class="spec-list">
	{#each items as item (item.key)}
		<dt>{item.key}</dt>
		<dd>{item.value}</dd>
	{/each}
</dl>
