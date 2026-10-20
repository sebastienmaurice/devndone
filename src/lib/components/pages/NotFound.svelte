<!--
	Contenu de la page 404, partagé entre la page statique /404/ (servie par GitHub Pages)
	et +error.svelte (erreurs pendant la navigation côté client).
	En-tête commun des pages internes (PageIntro), mot DONE en image comme sur le reste du site.
	Visuel : la mascotte tient un panneau « 404 … Retour à l'accueil » ; une zone cliquable posée
	sur le panneau (coordonnées en % de l'image 1448 × 1086) ramène à l'accueil.
-->
<script lang="ts">
	import mascot from '$lib/assets/mascotte/mascotte-renard-erreur-404-page-introuvable.jpg?enhanced&w=1200;720;360';
	import DoneWord from '../brand/DoneWord.svelte';
	import Seo from '../seo/Seo.svelte';
	import PageIntro from '../sections/PageIntro.svelte';
	import Button from '../ui/Button.svelte';
</script>

<Seo title="Page introuvable" path="/404/" noindex />

<div class="not-found">
	<PageIntro
		label="Erreur 404 · Page introuvable"
		lede="L'adresse a peut-être changé, ou la page n'existe pas. Dev a vérifié : rien à cet endroit."
	>
		{#snippet title()}Cette page n'est pas encore <DoneWord />{/snippet}
		{#snippet actions()}
			<Button href="/" icon="arrow-right">Retour à l'accueil</Button>
			<Button href="/services/" variant="secondary">Voir les services</Button>
		{/snippet}
		{#snippet aside()}
			<div class="visual">
				<enhanced:img
					src={mascot}
					alt="Dev, la mascotte, assis à côté d'un cône de chantier, se gratte la tête en tenant un panneau « 404 : Oups ! Cette page n'existe pas (ou plus). Retour à l'accueil »"
					sizes="(min-width: 1100px) 560px, 92vw"
					fetchpriority="high"
				/>
				<a class="visual__sign" href="/" aria-label="Retour à l'accueil"></a>
			</div>
		{/snippet}
	</PageIntro>
</div>

<style>
	.not-found {
		min-height: 60vh;
		display: grid;
		align-items: center;
	}
	/* Illustration sur fond blanc : multiply la fond dans l'Ivoire de la page */
	.visual {
		position: relative;
		max-width: 36rem;
		margin-inline: auto;
		aspect-ratio: 1448 / 1086;
	}
	.visual :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	/* Zone cliquable sur le panneau (légèrement incliné, comme lui) */
	.visual__sign {
		position: absolute;
		left: 51%;
		top: 48%;
		width: 27.5%;
		height: 37.5%;
		border-radius: 8% / 6%;
		transform: rotate(-1.5deg);
		transition: box-shadow var(--duration-reveal) var(--ease-out);
	}
	.visual__sign:hover,
	.visual__sign:focus-visible {
		box-shadow:
			0 0 0 3px var(--action),
			0 12px 32px color-mix(in srgb, var(--action) 35%, transparent);
	}
	.visual__sign:focus-visible {
		outline: none;
	}
</style>
