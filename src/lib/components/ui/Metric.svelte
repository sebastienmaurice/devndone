<!-- Chiffre clé : valeur Lilita + libellé. -->
<script lang="ts">
	let { value, label }: { value: string; label: string } = $props();
</script>

<p class="metric">
	<span class="metric__value">{value}</span>
	<span class="metric__label">{label}</span>
</p>
