<!--
	Bande diagonale orange à l'angle du slash (−20°). Une par page au maximum,
	toujours derrière le contenu, masquée sous 640 px.
	Le parent doit être en position relative avec overflow: clip.
-->
<script lang="ts">
	type Props = {
		/** Distance au bord droit du parent (ex. '7%') */
		right?: string;
		top?: string;
		bottom?: string;
	};

	let { right, top, bottom }: Props = $props();
</script>

<span
	class="slash-band"
	aria-hidden="true"
	style:--band-right={right}
	style:--band-top={top}
	style:--band-bottom={bottom}
></span>
