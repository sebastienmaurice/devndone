<!--
	Champ piège anti-spam : invisible et hors tabulation pour un humain,
	rempli par la plupart des robots. Un envoi avec ce champ non vide est rejeté.
	À combiner avec un délai minimal de saisie côté transport (phase 5).
-->
<script lang="ts">
	let { name = 'website', value = $bindable('') }: { name?: string; value?: string } = $props();
</script>

<div class="hp" aria-hidden="true">
	<label>
		Ne pas remplir ce champ
		<input {name} tabindex="-1" autocomplete="off" bind:value />
	</label>
</div>
