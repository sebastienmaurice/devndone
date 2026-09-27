<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { legal } from '$lib/content/legal';
	import { site } from '$lib/config/site';

	const p = legal.publisher;
	const h = legal.host;
</script>

<Seo
	title="Mentions légales"
	path="/mentions-legales/"
	description="Mentions légales du site devndone.com : éditeur, hébergeur, propriété intellectuelle."
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
				<dl class="spec-list">
					<dt>Éditeur</dt>
					<dd>{p.name}</dd>
					<dt>Nom commercial</dt>
					<dd>{p.tradeName}</dd>
					<dt>Statut</dt>
					<dd>{p.status}</dd>
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
					<dt>Email</dt>
					<dd><a class="link" href="mailto:{p.email}">{p.email}</a></dd>
					{#if p.phone}<dt>Téléphone</dt>
						<dd><a class="link" href="tel:{p.phone.replace(/\s/g, '')}">{p.phone}</a></dd>{/if}
					<dt>Publication</dt>
					<dd>{p.publicationDirector}, directeur de la publication</dd>
				</dl>
			</section>

			<section class="stack stack--sm" aria-labelledby="l-hebergeur">
				<h2 class="t-h3" id="l-hebergeur">Hébergement</h2>
				<p>
					Le site est hébergé par {h.name}, {h.address} —
					<a class="link" href={h.website} rel="noopener">{h.website.replace('https://', '')}</a>.
				</p>
			</section>

			<section class="stack stack--sm" aria-labelledby="l-pi">
				<h2 class="t-h3" id="l-pi">Propriété intellectuelle</h2>
				<p>
					Le logotype {site.wordmark}, la mascotte, les textes et les visuels de ce site sont la
					propriété de l'éditeur. Toute reproduction, même partielle, est soumise à autorisation
					préalable.
				</p>
			</section>

			<section class="stack stack--sm" aria-labelledby="l-donnees">
				<h2 class="t-h3" id="l-donnees">Données personnelles et cookies</h2>
				<p>
					Ce site ne dépose aucun cookie de mesure d'audience ou de publicité et ne collecte aucune
					donnée personnelle à ce jour. Les journaux techniques du serveur sont gérés par
					l'hébergeur.
				</p>
			</section>

			<p class="t-caption">
				Dernière mise à jour : {new Date(legal.updatedAt).toLocaleDateString('fr-FR')}
			</p>
		</div>
	</div>
</section>
