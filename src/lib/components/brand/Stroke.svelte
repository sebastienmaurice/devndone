<!--
	Trait de signature sous un mot. Un seul par écran (règle de la charte).
	<h1>Des projets pensés pour être <Stroke>Done<span class="t-dot">.</span></Stroke></h1>
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<span class="stroke"
	>{@render children()}<svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true"
		><path d="M2 11 C 80 3, 200 1, 298 6 C 200 5, 90 8, 2 13 Z" fill="currentColor" /></svg
	></span
>
