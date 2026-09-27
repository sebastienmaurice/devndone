<!-- Filet d'ancrage : ligne + segment orange. `plain` retire le segment. -->
<script lang="ts">
	let { plain = false }: { plain?: boolean } = $props();
</script>

<hr class="rule" class:rule--plain={plain} />
