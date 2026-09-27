<!--
	Étiquette mono. `tech` (mint) pour une technologie, `neutral` pour une catégorie,
	`accent` pour une mise en avant, `solid` pour un état live sur Night.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { tone?: 'neutral' | 'tech' | 'accent' | 'solid'; children: Snippet };

	let { tone = 'neutral', children }: Props = $props();
</script>

<span
	class="badge"
	class:badge--tech={tone === 'tech'}
	class:badge--accent={tone === 'accent'}
	class:badge--solid={tone === 'solid'}>{@render children()}</span
>
