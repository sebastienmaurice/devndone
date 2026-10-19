<!--
	Titre bicolore (charte v2.2) : le texte en Night, le passage `accent` en orange (orange encre
	sur Ivoire, orange sur Night) via la classe .accent-word du design system.
	Si `accent` est absent ou introuvable, le titre s'affiche d'une seule couleur.

	<h2><AccentTitle text="Quatre univers. Un même objectif : votre projet." accent="votre projet" /></h2>
-->
<script lang="ts">
	let { text, accent }: { text: string; accent?: string } = $props();

	const at = $derived(accent ? text.indexOf(accent) : -1);
</script>

{#if accent && at >= 0}{text.slice(0, at)}<span class="accent-word">{accent}</span>{text.slice(
		at + accent.length
	)}{:else}{text}{/if}
