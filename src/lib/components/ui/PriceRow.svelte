<!-- Ligne tarifaire à points de conduite : libellé ……… valeur -->
<script lang="ts">
	let { label, value }: { label: string; value: string } = $props();
</script>

<div class="price-row">
	<span class="price-row__label">{label}</span>
	<span class="price-row__leader" aria-hidden="true"></span>
	<span class="price-row__value">{value}</span>
</div>
