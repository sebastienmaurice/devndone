<!--
	Mentions légales : mêmes textes que mentions-legales.html du site en ligne (content/legal.ts).
	Ajouts validés : adresse de l'hébergeur GitHub, Inc. et données INPI (SIRET, registre, APE, TVA).
	En-tête commun des pages internes (PageIntro : fil d'Ariane, surtitre, titre).
-->
<script lang="ts">
	import mascot from '$lib/assets/mascotte/mascotte-renard-dev-n-done-mentions-legales-cookies.webp?enhanced&w=720;360';
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
		<div class="stack stack--lg legal">
			<div class="editor">
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
				<div class="mascot">
					<!-- Illustration sur fond blanc : multiply la fond dans l'Ivoire de la page -->
					<enhanced:img
						src={mascot}
						alt="Dev, la mascotte de Dev'n Done, allongé sur un gros livre intitulé « Mentions légales et Cookies »"
						sizes="(min-width: 900px) 352px, 240px"
					/>
				</div>
			</div>

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

<style>
	/* Blocs de texte à la largeur de lecture ; la rangée Éditeur + mascotte peut être plus large */
	.legal > section,
	.legal > p {
		max-width: var(--measure);
	}
	.editor {
		display: grid;
		gap: var(--space-6);
		align-items: center;
	}
	.mascot {
		justify-self: center;
		width: min(15rem, 62vw);
	}
	.mascot :global(img) {
		display: block;
		width: 100%;
		height: auto;
		/* Fond blanc de l'image : multiply le fait disparaître dans l'Ivoire */
		mix-blend-mode: multiply;
	}
	/* À droite du paragraphe Éditeur du site dès que la place le permet */
	@media (min-width: 900px) {
		.editor {
			grid-template-columns: minmax(0, var(--measure)) minmax(0, 1fr);
		}
		.mascot {
			width: min(100%, 22rem);
		}
	}
</style>
