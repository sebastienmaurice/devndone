<!--
	Mentions légales : mêmes textes que mentions-legales.html du site en ligne (content/legal.ts).
	Seul ajout validé : l'adresse de l'hébergeur GitHub, Inc.
-->
<script lang="ts">
	import Seo from '$lib/components/seo/Seo.svelte';
	import { legal } from '$lib/content/legal';

	const p = legal.publisher;
	const h = legal.host;
</script>

<Seo
	title="Mentions légales"
	path="/mentions-legales/"
	description="Mentions légales du site devndone.com : éditeur, hébergeur, données personnelles, propriété intellectuelle."
/>

<section class="section surface-ivory" aria-labelledby="legal-title">
	<div class="container">
		<header class="section-head">
			<p class="eyebrow eyebrow--rule">
				<b>Informations</b><span class="slash" aria-hidden="true">/</span>Légal
			</p>
			<h1 class="t-h1" id="legal-title">Mentions légales</h1>
		</header>

		<div class="stack stack--lg t-measure">
			<section class="stack stack--sm" aria-labelledby="l-editeur">
				<h2 class="t-h3" id="l-editeur">Éditeur du site</h2>
				<p>{p.intro}</p>
				<dl class="spec-list">
					<dt>SIREN</dt>
					<dd>{p.siren}</dd>
					<dt>Adresse</dt>
					<dd>{p.address}</dd>
					<dt>Téléphone</dt>
					<dd><a class="link" href="tel:{p.phone.replace(/\s/g, '')}">{p.phone}</a></dd>
					<dt>Email</dt>
					<dd><a class="link" href="mailto:{p.email}">{p.email}</a></dd>
				</dl>
				<p>Directeur de la publication : {p.publicationDirector}.</p>
			</section>

			<section class="stack stack--sm" aria-labelledby="l-hebergeur">
				<h2 class="t-h3" id="l-hebergeur">Hébergement</h2>
				<p>
					Ce site est hébergé par GitHub Pages ({h.name}, {h.address},
					<a class="link" href={h.website} rel="noopener">{h.website.replace('https://', '')}</a>).
				</p>
			</section>

			<section class="stack stack--sm" aria-labelledby="l-donnees">
				<h2 class="t-h3" id="l-donnees">Données personnelles et cookies</h2>
				<p>{legal.privacy}</p>
			</section>

			<section class="stack stack--sm" aria-labelledby="l-pi">
				<h2 class="t-h3" id="l-pi">Propriété intellectuelle</h2>
				<p>{legal.intellectualProperty}</p>
			</section>

			<p><a class="link" href="/">Retour à l'accueil</a></p>
		</div>
	</div>
</section>
