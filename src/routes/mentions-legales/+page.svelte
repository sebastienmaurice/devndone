<!--
	Mentions légales : mêmes textes que mentions-legales.html du site en ligne (content/legal.ts).
	Ajouts validés : adresse de l'hébergeur GitHub, Inc. et données INPI (SIRET, registre, APE, TVA).
	En-tête commun des pages internes (PageIntro : fil d'Ariane, surtitre, titre).
-->
<script lang="ts">
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
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

<PageIntro
	label="Informations légales"
	heading="Mentions légales"
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Mentions légales' }]}
/>

<section class="section section--tight" aria-label="Mentions légales">
	<div class="container">
		<div class="stack stack--lg t-measure">
			<section class="stack stack--sm" aria-labelledby="l-editeur">
				<h2 class="t-h3" id="l-editeur">Éditeur du site</h2>
				<p>{p.intro}</p>
				<dl class="spec-list">
					<dt>SIREN</dt>
					<dd>{p.siren}</dd>
					<dt>SIRET</dt>
					<dd>{p.siret}</dd>
					<dt>Registre</dt>
					<dd>{p.registration}</dd>
					<dt>Code APE</dt>
					<dd>{p.ape}</dd>
					<dt>TVA</dt>
					<dd>{p.vat}</dd>
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
