<!--
	Contenu de la page 404, partagé entre la page statique /404/ (servie par GitHub Pages)
	et +error.svelte (erreurs pendant la navigation côté client).
	En-tête commun des pages internes (PageIntro), mot DONE en image comme sur le reste du site.
-->
<script lang="ts">
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
	</PageIntro>
</div>

<style>
	.not-found {
		min-height: 60vh;
		display: grid;
		align-items: center;
	}
</style>
