<!--
	Contenu de la page 404, partagé entre la page statique /404/ (servie par Apache)
	et +error.svelte (erreurs pendant la navigation côté client).
-->
<script lang="ts">
	import Seo from './Seo.svelte';
	import Icon from './Icon.svelte';
</script>

<Seo title="Page introuvable" path="/404/" noindex />

<section class="section not-found" aria-labelledby="nf-title">
	<div class="container stack stack--lg">
		<p class="eyebrow eyebrow--rule">
			<b>Erreur 404</b><span class="slash" aria-hidden="true">/</span>Page introuvable
		</p>
		<h1 class="t-h1" id="nf-title">Cette page n'est pas encore Done<span class="t-dot">.</span></h1>
		<p class="t-body-lg t-muted t-measure">
			L'adresse a peut-être changé, ou la page n'existe pas. Dev a vérifié : rien à cet endroit.
		</p>
		<div class="cluster">
			<a class="btn btn--primary" href="/">
				Retour à l'accueil
				<Icon name="arrow-right" class="btn__icon btn__icon--move" />
			</a>
		</div>
	</div>
</section>

<style>
	.not-found {
		min-height: 60vh;
		display: grid;
		align-items: center;
	}
</style>
