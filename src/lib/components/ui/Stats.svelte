<!--
	Bandeau de chiffres clés (charte v1.2, 11.D). Uniquement des chiffres vérifiables :
	chaque entrée porte sa source, affichée seulement si `showSource` (utile en recette).

	<Stats items={[{ value: '15', unit: '+', label: "ans d'expérience", source: 'texte À propos' }]} />
-->
<script lang="ts" module>
	export type StatItem = { value: string; unit?: string; label: string; source: string };
</script>

<script lang="ts">
	type Props = { items: readonly StatItem[]; showSource?: boolean };

	let { items, showSource = false }: Props = $props();
</script>

<ul class="stats" role="list">
	{#each items as item (item.label)}
		<li class="metric">
			<span class="metric__value"
				>{item.value}{#if item.unit}<span class="metric__unit">{item.unit}</span>{/if}</span
			>
			<span class="metric__label">{item.label}</span>
			{#if showSource}<span class="metric__source">source : {item.source}</span>{/if}
		</li>
	{/each}
</ul>
