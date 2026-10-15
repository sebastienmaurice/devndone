<!--
	Cadre d'appareil plat (charte v1.2, 11.D) pour une vraie capture de site livré.
	L'image se passe en enfant (enhanced:img ou img), avec un alt qui nomme le site et la page.
	Sans enfant, l'écran reste vide : jamais de capture inventée.

	<Device kind="laptop"><enhanced:img src="…" alt="Harmony Valse, page d'accueil" /></Device>
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { kind?: 'laptop' | 'phone'; children?: Snippet };

	let { kind = 'laptop', children }: Props = $props();
</script>

<figure class="device device--{kind}">
	<span class="device__screen">{@render children?.()}</span>
</figure>
