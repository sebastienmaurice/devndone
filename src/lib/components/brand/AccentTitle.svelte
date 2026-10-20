<!--
	Titre bicolore (charte v2.2) : le texte en Night, le ou les passages `accent` en orange vif
	#FF8A00 (sur tous les fonds sauf le bandeau Orange) via la classe .accent-word du design system.
	Un passage absent du texte est ignoré ; sans passage trouvé, le titre reste d'une seule couleur.

	<h2><AccentTitle text="5 expertises. Un même objectif : votre projet." accent={['5 expertises', 'votre projet']} /></h2>
-->
<script lang="ts">
	type Props = { text: string; accent?: string | readonly string[] };

	let { text, accent }: Props = $props();

	/** Découpe du titre en morceaux, chacun marqué « en orange » ou non, dans l'ordre du texte */
	const parts = $derived.by(() => {
		const words = (typeof accent === 'string' ? [accent] : (accent ?? [])).filter(Boolean);
		const out: { value: string; accent: boolean }[] = [];
		let rest = text;
		while (rest) {
			let best = -1;
			let word = '';
			for (const w of words) {
				const at = rest.indexOf(w);
				if (at >= 0 && (best < 0 || at < best)) {
					best = at;
					word = w;
				}
			}
			if (best < 0) {
				out.push({ value: rest, accent: false });
				break;
			}
			if (best > 0) out.push({ value: rest.slice(0, best), accent: false });
			out.push({ value: word, accent: true });
			rest = rest.slice(best + word.length);
		}
		return out;
	});
</script>

{#each parts as part, i (i)}{#if part.accent}<span class="accent-word">{part.value}</span
		>{:else}{part.value}{/if}{/each}
