<!--
	État d'un élément. Le libellé est obligatoire : l'information n'est jamais portée
	par la couleur seule. `live` pulse (une fois par écran au maximum).
-->
<script lang="ts" module>
	export type StatusState = 'live' | 'done' | 'progress' | 'todo' | 'error';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { state: StatusState; as?: 'span' | 'p'; children: Snippet };

	let { state, as = 'span', children }: Props = $props();
</script>

<svelte:element this={as} class="status status--{state}">{@render children()}</svelte:element>
