<!--
	Contenu de la page 404, partagé entre la page statique /404/ (servie par Apache)
	et +error.svelte (erreurs pendant la navigation côté client).
-->
<script lang="ts">
	import Seo from '../seo/Seo.svelte';
	import Section from '../layout/Section.svelte';
	import SectionHead from '../layout/SectionHead.svelte';
	import Button from '../ui/Button.svelte';
</script>

<Seo title="Page introuvable" path="/404/" noindex />

<Section labelledby="nf-title" class="not-found">
	<SectionHead
		id="nf-title"
		level={1}
		lead="Erreur 404"
		eyebrow="Page introuvable"
		title="Cette page n'est pas encore Done."
		lede="L'adresse a peut-être changé, ou la page n'existe pas. Dev a vérifié : rien à cet endroit."
	>
		<div class="cluster"><Button href="/" icon="arrow-right">Retour à l'accueil</Button></div>
	</SectionHead>
</Section>

<style>
	:global(.not-found) {
		min-height: 60vh;
		display: grid;
		align-items: center;
	}
</style>
