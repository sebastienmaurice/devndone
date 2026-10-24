<!--
	Politique de confidentialité : uniquement des faits vérifiables sur le fonctionnement du site.
	Le premier paragraphe reprend le texte des mentions légales du site en ligne (content/legal.ts).
	Le paragraphe « Formulaire de contact » suit le mode d'envoi (content/studio.ts, contactForm).
	À mettre à jour si un outil de mesure ou un autre service est ajouté.
-->
<script lang="ts">
	import { Seo } from '$lib/components';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import { legal } from '$lib/content/legal';
	import { contactForm, links } from '$lib/content/studio';
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
			{#if contactForm.accessKey}
				<!-- Source : FAQ Web3Forms (docs.web3forms.com), relevée le 20/10/2026 -->
				<p>
					Les informations saisies dans le formulaire de la page Contact (nom, email, entreprise,
					type de demande, adresse du site actuel, échéance souhaitée, message et, pour une demande
					d'agence, type de mission, marque blanche et lien vers vos documents) sont transmises à
					Dev'n Done par email via le service <a
						class="link"
						href="https://web3forms.com/"
						target="_blank"
						rel="noopener">Web3Forms<span class="sr-only"> (nouvel onglet)</span></a
					>, dont les serveurs sont situés aux États-Unis. Selon Web3Forms, les messages ne sont pas
					conservés : ils sont seulement transmis ; ses journaux techniques sont effacés
					périodiquement. Le site lui-même ne conserve aucune information. Vos données ne servent
					qu'à répondre à votre demande.
				</p>
			{:else}
				<p>
					Le formulaire de la page Contact ne transmet rien au site : il prépare un email dans votre
					propre messagerie, que vous choisissez d'envoyer ou non. Aucune information n'est
					conservée par le site.
				</p>
			{/if}
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
				<a class="link" href="/contact/">formulaire de contact</a>. Voir aussi les
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
