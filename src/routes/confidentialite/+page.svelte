<!--
	Politique de confidentialité : uniquement des faits vérifiables sur le fonctionnement du site.
	Le premier paragraphe reprend le texte des mentions légales du site en ligne (content/legal.ts).
	À mettre à jour si un service d'envoi de formulaire ou un outil de mesure est ajouté.
-->
<script lang="ts">
	import { Seo } from '$lib/components';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import { legal } from '$lib/content/legal';
	import { links } from '$lib/content/studio';
</script>

<Seo
	title="Confidentialité"
	path="/confidentialite/"
	description="Données personnelles et cookies sur devndone.com : aucun cookie, aucune collecte par le site lui-même. Prise de rendez-vous via Calendly, échanges par email."
/>

<PageIntro
	label="Informations"
	heading="Confidentialité"
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Confidentialité' }]}
/>

<section class="section section--tight" aria-label="Politique de confidentialité">
	<div class="container stack stack--lg legal-text">
		<section class="stack stack--sm" aria-labelledby="c-principe">
			<h2 class="t-h3" id="c-principe">Données personnelles et cookies</h2>
			<p>{legal.privacy}</p>
		</section>

		<section class="stack stack--sm" aria-labelledby="c-formulaire">
			<h2 class="t-h3" id="c-formulaire">Formulaire de contact</h2>
			<p>
				Le formulaire de la page Contact ne transmet rien au site : il prépare un email dans votre
				propre messagerie, que vous choisissez d'envoyer ou non. Aucune information n'est conservée
				par le site.
			</p>
		</section>

		<section class="stack stack--sm" aria-labelledby="c-tiers">
			<h2 class="t-h3" id="c-tiers">Services tiers</h2>
			<p>
				La prise de rendez-vous passe par <a
					class="link"
					href={links.calendly}
					target="_blank"
					rel="noopener">Calendly<span class="sr-only"> (nouvel onglet)</span></a
				>, soumis à sa propre politique de confidentialité. Les liens vers LinkedIn et Malt mènent à
				ces plateformes, elles aussi soumises à leurs propres politiques.
			</p>
		</section>

		<section class="stack stack--sm" aria-labelledby="c-contact">
			<h2 class="t-h3" id="c-contact">Responsable et contact</h2>
			<p>
				{legal.publisher.name}, {legal.publisher.tradeName}. Pour toute question sur vos données :
				<a class="link" href={links.email}>{legal.publisher.email}</a>. Voir aussi les
				<a class="link" href="/mentions-legales/">mentions légales</a>.
			</p>
		</section>
	</div>
</section>

<style>
	.legal-text {
		max-width: 46rem;
	}
	.legal-text p {
		margin: 0;
		color: var(--text-muted);
	}
</style>
