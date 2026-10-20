<!--
	Contact. Site 100 % statique (GitHub Pages) : aucun serveur ne reçoit le formulaire.
	ENVOI ACTUEL : après validation, le formulaire ouvre la messagerie du visiteur avec le message
	prérempli (lien mailto). Le site ne transmet ni ne stocke aucune donnée.
	BRANCHEMENT FUTUR (service externe type Formspree / Web3Forms) : remplacer `send()` par un
	appel au service, ajouter son domaine à `connect-src` / `form-action` dans vite.config.ts,
	et mettre à jour la page /confidentialite/ (nouveau destinataire des données).
-->
<script lang="ts">
	import { Button, Check, Field, Honeypot, Notice, Seo } from '$lib/components';
	import DoneWord from '$lib/components/brand/DoneWord.svelte';
	import Icon from '$lib/components/brand/Icon.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import { legal } from '$lib/content/legal';
	import { contactIntro, hero, links } from '$lib/content/studio';
	import { universes } from '$lib/content/services';

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let projectType = $state('');
	let message = $state('');
	let consent = $state(false);
	let trap = $state('');
	let submitted = $state(false);
	let status = $state<'idle' | 'opened' | 'error'>('idle');

	const types = [
		{ value: '', label: 'Choisir…' },
		...universes.map((u) => ({ value: u.title, label: u.title })),
		{ value: 'Je ne sais pas encore', label: 'Je ne sais pas encore' }
	];

	const errors = $derived({
		name: name.trim() ? undefined : 'Indiquez votre nom.',
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
			? undefined
			: 'Adresse incomplète. Exemple : nom@domaine.fr',
		message:
			message.trim().length >= 10
				? undefined
				: 'Décrivez votre besoin en quelques mots (10 caractères au moins).',
		consent: consent ? undefined : 'Cochez cette case pour continuer.'
	});
	const show = (key: keyof typeof errors) => (submitted ? errors[key] : undefined);

	function send(event: SubmitEvent) {
		event.preventDefault();
		submitted = true;
		if (trap) return; // champ piège rempli : envoi ignoré
		if (Object.values(errors).some(Boolean)) {
			status = 'error';
			return;
		}
		const subject = `Projet${projectType ? ` ${projectType}` : ''} : ${name.trim()}`;
		const lines = [`Nom : ${name.trim()}`, `Email : ${email.trim()}`];
		if (company.trim()) lines.push(`Entreprise : ${company.trim()}`);
		if (projectType) lines.push(`Type de projet : ${projectType}`);
		const body = [...lines, '', message.trim()].join('\n');
		window.location.href = `mailto:${legal.publisher.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		status = 'opened';
	}
</script>

<Seo
	title="Contact : parlons de votre projet web"
	path="/contact/"
	description="15 minutes pour faire le point sur votre projet et définir la bonne approche, sans engagement. Prise de rendez-vous en ligne, formulaire ou email."
/>

<PageIntro
	label={contactIntro.eyebrow}
	lede={contactIntro.lede}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Contact' }]}
>
	{#snippet title()}{contactIntro.question} On le rend <DoneWord />{/snippet}
</PageIntro>

<section class="section section--tight" aria-label="Formulaire et prise de rendez-vous">
	<div class="container contact-page">
		<form class="form contact-form" novalidate onsubmit={send}>
			<h2 class="t-h3">Parlez-moi de votre projet</h2>
			<div class="contact-form__row">
				<Field
					label="Nom"
					name="name"
					autocomplete="name"
					required
					bind:value={name}
					error={show('name')}
				/>
				<Field
					label="Email"
					name="email"
					type="email"
					autocomplete="email"
					required
					bind:value={email}
					error={show('email')}
				/>
			</div>
			<div class="contact-form__row">
				<Field
					label="Entreprise"
					name="company"
					autocomplete="organization"
					optional
					bind:value={company}
				/>
				<Field
					label="Type de projet"
					name="type"
					as="select"
					options={types}
					optional
					bind:value={projectType}
				/>
			</div>
			<Field
				label="Votre besoin"
				name="message"
				as="textarea"
				required
				hint="Quelques lignes suffisent : on en parle ensuite ensemble."
				bind:value={message}
				error={show('message')}
				maxlength={4000}
			/>
			<Check name="consent" required bind:checked={consent}>
				J'accepte que ces informations servent uniquement à répondre à ma demande (<a
					class="link"
					href="/confidentialite/">confidentialité</a
				>).
			</Check>
			{#if show('consent')}<p class="field__error">{errors.consent}</p>{/if}
			<Honeypot bind:value={trap} />

			<Button type="submit" icon="arrow-right" size="lg">Préparer mon message</Button>

			{#if status === 'opened'}
				<Notice tone="success" live title="Votre messagerie s'ouvre.">
					Le message est prérempli : il ne reste qu'à l'envoyer. Rien ne s'ouvre ? Écrivez
					directement à <a class="link" href={links.email}>{legal.publisher.email}</a>.
				</Notice>
			{:else if status === 'error'}
				<Notice tone="error" live title="Quelques champs sont à compléter.">
					Corrigez les champs signalés, puis réessayez.
				</Notice>
			{/if}
			<p class="contact-form__info">
				<Icon name="info" size="sm" />
				L'envoi direct depuis le site n'est pas encore activé : ce formulaire prépare un email dans votre
				messagerie. Le site ne conserve aucune donnée.
			</p>
			<noscript>
				<p>Sans JavaScript, écrivez directement à {legal.publisher.email}.</p>
			</noscript>
		</form>

		<aside class="contact-side" aria-label="Autres moyens de contact">
			<div class="contact-card contact-card--main surface-night">
				<Icon name="calendar" />
				<h2 class="t-h3">Réserver 15 minutes</h2>
				<p>Choisissez un créneau : on fait le point sur votre projet, sans engagement.</p>
				<Button href={links.calendly} icon="arrow-up-right" block>{hero.ctaCall}</Button>
			</div>
			<ul class="contact-links" role="list">
				<li>
					<a href={links.email}><Icon name="mail" />{legal.publisher.email}</a>
				</li>
				<li>
					<a href={links.linkedin} target="_blank" rel="noopener"
						><Icon name="arrow-up-right" />LinkedIn<span class="sr-only"> (nouvel onglet)</span></a
					>
				</li>
				<li>
					<a href={links.malt} target="_blank" rel="noopener"
						><Icon name="arrow-up-right" />Malt<span class="sr-only"> (nouvel onglet)</span></a
					>
				</li>
			</ul>
		</aside>
	</div>
</section>

<style>
	.contact-page {
		display: grid;
		gap: var(--space-7);
		align-items: start;
	}
	.contact-page > * {
		min-width: 0;
	}
	@media (min-width: 1000px) {
		.contact-page {
			grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
		}
	}
	.contact-form {
		padding: clamp(var(--space-5), 3vw, var(--space-7));
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	@media (max-width: 399px) {
		.contact-form {
			padding: var(--space-4);
		}
		.contact-form :global(.btn) {
			white-space: normal;
		}
	}
	.contact-form__row {
		display: grid;
		gap: var(--space-5);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
	}
	.contact-form :global(.btn) {
		justify-self: start;
	}
	.contact-form__info {
		display: flex;
		gap: var(--space-2);
		align-items: flex-start;
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
	}
	.contact-side {
		display: grid;
		gap: var(--space-5);
	}
	.contact-card {
		display: grid;
		gap: var(--space-3);
		padding: var(--space-6);
		background: var(--bg);
		color: var(--text);
		border-radius: var(--radius-card);
	}
	.contact-card p {
		margin: 0;
		color: var(--text-muted);
	}
	.contact-card > :global(.icon) {
		color: var(--action-alt);
	}
	.contact-links {
		display: grid;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.contact-links a {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		color: var(--text);
		font-weight: var(--weight-semibold);
		text-decoration: none;
		overflow-wrap: anywhere;
	}
	.contact-links a:hover {
		border-color: var(--line-strong);
	}
	.contact-links :global(.icon) {
		color: var(--accent-deco);
	}
</style>
