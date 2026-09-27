<!--
	FAQ en <details> natifs : accessibles au clavier, sans JavaScript.
	`schema` publie aussi les questions en données structurées FAQPage.
-->
<script lang="ts" module>
	export type AccordionItem = { question: string; answer: string };
</script>

<script lang="ts">
	type Props = {
		items: readonly AccordionItem[];
		/** Index de l'élément ouvert au chargement */
		open?: number;
		schema?: boolean;
	};

	let { items, open, schema = false }: Props = $props();

	const jsonLd = $derived(
		schema
			? `<script type="application/ld+json">${JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'FAQPage',
					mainEntity: items.map((i) => ({
						'@type': 'Question',
						name: i.question,
						acceptedAnswer: { '@type': 'Answer', text: i.answer }
					}))
				}).replace(/</g, '\\u003c')}</` + 'script>'
			: ''
	);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON sérialisé et échappé -->
	{@html jsonLd}
</svelte:head>

<div class="accordion">
	{#each items as item, i (item.question)}
		<details open={open === i}>
			<summary>{item.question}</summary>
			<div class="accordion__body"><p>{item.answer}</p></div>
		</details>
	{/each}
</div>
