<!--
	Métadonnées d'une page : titre, description, canonical, Open Graph, Twitter, JSON-LD.
	À placer une fois par page. En build staging, toute page passe en noindex.
-->
<script lang="ts">
	import { site, isStaging, absoluteUrl } from '$lib/config/site';

	type Props = {
		/** Titre de la page, sans le nom du site (ajouté automatiquement) */
		title?: string;
		description?: string;
		/** Chemin canonique de la page, avec slash final */
		path: string;
		image?: string;
		imageAlt?: string;
		type?: 'website' | 'article';
		noindex?: boolean;
		/** Données structurées schema.org, sérialisées en JSON-LD */
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
	};

	let {
		title,
		description = site.description,
		path,
		image = site.ogImage,
		imageAlt = site.ogImageAlt,
		type = 'website',
		noindex = false,
		jsonLd
	}: Props = $props();

	const fullTitle = $derived(
		title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline.join(' / ')}`
	);
	const canonical = $derived(absoluteUrl(path));
	const imageUrl = $derived(absoluteUrl(image));
	const robots = $derived(isStaging || noindex ? 'noindex, nofollow' : 'index, follow');

	// « < » échappé pour qu'aucune chaîne ne puisse fermer la balise <script>
	const jsonLdHtml = $derived(
		jsonLd
			? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</` +
					'script>'
			: ''
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={robots} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content={site.locale} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON sérialisé et échappé ci-dessus -->
	{@html jsonLdHtml}
</svelte:head>
