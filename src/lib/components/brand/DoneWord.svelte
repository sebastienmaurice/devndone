<!--
	Mot « DONE » de la marque : image en relief orange (check dans le O, soulignement), placée dans
	la ligne du titre parent, dont elle prend la taille (hauteur 1,5 em, calée sur la ligne de base).
	Lu « Done. » par les lecteurs d'écran.

	<h1>Des projets pensés pour être <DoneWord sizes="(min-width: 1100px) 340px, 220px" /></h1>
-->
<script lang="ts">
	import doneImage from '$lib/assets/brand/done-3d.png?enhanced&w=640;320';

	let { sizes = '(min-width: 1100px) 300px, 200px' }: { sizes?: string } = $props();
</script>

<span class="done"><enhanced:img class="done__img" src={doneImage} alt="Done." {sizes} /></span>

<style>
	.done {
		white-space: nowrap;
	}
	/* <picture> est en bloc dans la feuille de base : ici il suit le texte */
	.done :global(picture) {
		display: inline;
	}
	.done :global(.done__img) {
		display: inline-block;
		width: auto;
		height: 1.5em;
		margin-left: 0.04em;
		vertical-align: -0.42em;
	}
</style>
