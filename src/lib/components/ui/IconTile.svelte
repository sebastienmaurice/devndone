<!--
	Tuile d'icône (rayon repris du monogramme). `alt` : icône en couleur d'action secondaire
	(Mint sur Night, Mint encre sur Ivoire), pour les univers. Décorative : le titre voisin porte le sens.

	<IconTile name="site" alt large />
-->
<script lang="ts">
	import Icon, { type IconName } from '../brand/Icon.svelte';

	type Props = { name: IconName; alt?: boolean; large?: boolean };

	let { name, alt = false, large = false }: Props = $props();
</script>

<span class="icon-tile" class:icon-tile--alt={alt} class:icon-tile--lg={large}>
	<Icon {name} />
</span>
