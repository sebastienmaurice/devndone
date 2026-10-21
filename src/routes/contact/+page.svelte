<!--
	Contact. Site 100 % statique (GitHub Pages).
	ENVOI DIRECT (si `contactForm.accessKey` est renseignée, content/studio.ts) : le message part
	vers Web3Forms, qui le transmet par email (domaine autorisé dans `connect-src`, vite.config.ts).
	SANS CLÉ, OU SI L'ENVOI ÉCHOUE : le formulaire ouvre la messagerie du visiteur avec le message
	prérempli (mailto). Repli : « Copier le message » ; si le presse-papiers est refusé, le message s'affiche pour une
	copie manuelle.
	L'adresse email n'est pas affichée sur la page (choix de Sébastien, 20/10/2026) : elle ne
	figure que dans les mentions légales, où la LCEN l'impose.
	La page /confidentialite/ décrit l'un ou l'autre fonctionnement selon la même clé.
	En-tête : la mascotte au smartphone, à droite en grand écran.
-->
<script lang="ts">
	import { Button, Check, Field, Honeypot, Notice, Seo } from '$lib/components';
	import DoneWord from '$lib/components/brand/DoneWord.svelte';
	import Icon from '$lib/components/brand/Icon.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import { legal } from '$lib/content/legal';
	import { contactForm, contactIntro, hero, links } from '$lib/content/studio';
	import mascot from '$lib/assets/mascotte/mascotte-renard-contact-smartphone-messages.jpg?enhanced&w=1200;720;360';
	import { universes } from '$lib/content/services';

	let name = $state('');
	let email = $state('');
	let company = $state('');
	let projectType = $state('');
	let message = $state('');
	let consent = $state(false);
	let trap = $state('');
	let submitted = $state(false);
	let status = $state<'idle' | 'sending' | 'sent' | 'failed' | 'opened' | 'error'>('idle');
	/** Envoi direct depuis le site (Web3Forms) ; sinon, préparation dans la messagerie */
	const direct = !!contactForm.accessKey;
	let mailto = '';
	/** Message préparé (destinataire, objet, corps), réutilisé par « Copier le message » */
	let prepared = $state('');
	let copied = $state(false);
	let copyFailed = $state(false);
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		try {
			await navigator.clipboard.writeText(prepared);
			copied = true;
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = false), 2500);
		} catch {
			// Presse-papiers indisponible : le message s'affiche pour une copie manuelle
			copyFailed = true;
		}
	}

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

	function openMail() {
		window.location.href = mailto;
		status = 'opened';
	}

	async function send(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'sending') return;
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
		prepared = `À : ${legal.publisher.email}\nObjet : ${subject}\n\n${body}`;
		copyFailed = false;
		mailto = `mailto:${legal.publisher.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		if (!direct) return openMail();

		status = 'sending';
		try {
			const response = await fetch(contactForm.endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify({
					access_key: contactForm.accessKey,
					subject: `[devndone.com] ${subject}`,
					from_name: 'devndone.com',
					// `email` : adresse de réponse de l'email reçu
					email: email.trim(),
					Nom: name.trim(),
					Entreprise: company.trim() || '(non renseignée)',
					'Type de projet': projectType || '(non renseigné)',
					Message: message.trim()
				})
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok || !result.success) throw new Error(result.message ?? response.status);
			status = 'sent';
			submitted = false;
			name = email = company = projectType = message = '';
			consent = false;
		} catch {
			status = 'failed';
		}
	}
</script>

<Seo
	title="Contact : parlons de votre projet web"
	path="/contact/"
	description="15 minutes pour faire le point sur votre projet et définir la bonne approche, sans engagement. Prise de rendez-vous en ligne ou formulaire de contact."
/>

<PageIntro
	label={contactIntro.eyebrow}
	lede={contactIntro.lede}
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Contact' }]}
>
	{#snippet title()}{contactIntro.question} On le rend <DoneWord />{/snippet}
	{#snippet aside()}
		<div class="mascot">
			<enhanced:img
				src={mascot}
				alt="Dev, la mascotte, lève le pouce, smartphone en main, entouré de bulles email, message et téléphone"
				sizes="(min-width: 1100px) 520px, 92vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
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

			<Button type="submit" icon="arrow-right" size="lg" busy={status === 'sending'}
				>{direct ? 'Envoyer mon message' : 'Préparer mon message'}</Button
			>

			{#if status === 'sent'}
				<Notice tone="success" live title="Message envoyé, merci !">
					Je vous réponds rapidement, à l'adresse indiquée. Pour aller plus vite, vous pouvez aussi
					réserver un créneau de 15 minutes.
				</Notice>
			{:else if status === 'opened' || status === 'failed'}
				{#if status === 'failed'}
					<Notice tone="error" live title="L'envoi n'a pas abouti.">
						Votre message n'est pas perdu : envoyez-le depuis votre messagerie.
					</Notice>
				{:else}
					<Notice tone="success" live title="Votre messagerie s'ouvre.">
						Le message est prérempli : il ne reste qu'à l'envoyer.
					</Notice>
				{/if}
				<!-- Repli : envoi impossible ou messagerie absente (webmail, ordinateur partagé) -->
				<div class="fallback">
					<p class="fallback__title">
						{status === 'failed' ? 'Envoyer autrement' : "Rien ne s'est ouvert ?"}
					</p>
					<p class="fallback__text">
						Copiez le message (l'adresse de destination est incluse), puis collez-le dans votre
						messagerie habituelle (Gmail, Outlook…).
					</p>
					<div class="fallback__actions">
						{#if status === 'failed'}
							<Button icon="mail" onclick={openMail}>Ouvrir ma messagerie</Button>
						{/if}
						<Button variant="secondary" icon="copy" onclick={copy}
							>{copied ? 'Message copié' : 'Copier le message'}</Button
						>
					</div>
					{#if copyFailed}
						<label class="fallback__manual">
							<span>Sélectionnez le texte ci-dessous et copiez-le :</span>
							<textarea readonly rows="8" value={prepared}></textarea>
						</label>
					{/if}
				</div>
			{:else if status === 'error'}
				<Notice tone="error" live title="Quelques champs sont à compléter.">
					Corrigez les champs signalés, puis réessayez.
				</Notice>
			{/if}
			<p class="contact-form__info">
				<Icon name="info" size="sm" />
				{#if direct}
					<span
						>Votre message m'est transmis par email via le service Web3Forms, qui ne le conserve pas
						(<a class="link" href="/confidentialite/">confidentialité</a>).</span
					>
				{:else}
					<span
						>Comment ça marche : le bouton ouvre votre messagerie avec le message déjà rédigé, il ne
						reste qu'à l'envoyer. Le site ne transmet ni ne conserve aucune donnée.</span
					>
				{/if}
			</p>
			<noscript>
				<p>
					Sans JavaScript, le formulaire ne peut pas être envoyé : réservez un créneau avec le
					bouton « Réserver 15 min ».
				</p>
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
					<a href={links.linkedin} target="_blank" rel="noopener"
						><span class="contact-links__icon"><Icon name="arrow-up-right" /></span><span
							class="contact-links__text"
							><span class="contact-links__label">Réseau</span>LinkedIn<span class="sr-only">
								(nouvel onglet)</span
							></span
						></a
					>
				</li>
				<li>
					<a href={links.malt} target="_blank" rel="noopener"
						><span class="contact-links__icon"><Icon name="arrow-up-right" /></span><span
							class="contact-links__text"
							><span class="contact-links__label">Profil freelance et avis</span>Malt<span
								class="sr-only"
							>
								(nouvel onglet)</span
							></span
						></a
					>
				</li>
			</ul>
		</aside>
	</div>
</section>

<style>
	/* Mascotte sur fond blanc : multiply la fond dans l'Ivoire de la page */
	.mascot {
		max-width: 34rem;
		margin-inline: auto;
		aspect-ratio: 1343 / 1086;
	}
	.mascot :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	@media (max-width: 1099px) {
		.mascot {
			max-width: 22rem;
		}
	}
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
	/* Moyens de contact : cartes à tuile d'icône, survol de référence */
	.contact-links li {
		position: relative;
	}
	.contact-links a {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-4) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		color: var(--text);
		font-weight: var(--weight-bold);
		text-decoration: none;
		overflow-wrap: anywhere;
		transition:
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	.contact-links a:hover,
	.contact-links a:focus-visible {
		transform: translateY(-3px);
		box-shadow: var(--shadow-card-hover);
		border-color: var(--accent-deco);
	}
	.contact-links__icon {
		display: grid;
		place-items: center;
		flex: none;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: color-mix(in srgb, var(--action) 14%, var(--surface));
		color: var(--accent-deco);
		transition:
			background-color var(--duration-reveal) var(--ease-out),
			color var(--duration-reveal) var(--ease-out);
	}
	.contact-links a:hover .contact-links__icon,
	.contact-links a:focus-visible .contact-links__icon {
		background: var(--action);
		color: var(--on-action);
	}
	.contact-links__text {
		display: grid;
		gap: 0.1rem;
		min-width: 0;
	}
	.contact-links__label {
		font-size: var(--text-label);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-subtle);
	}
	/* Repli quand la messagerie ne s'ouvre pas */
	.fallback {
		display: grid;
		gap: var(--space-3);
		padding: var(--space-5);
		background: color-mix(in srgb, var(--action-alt-text) 8%, var(--surface));
		border-radius: var(--radius-card);
	}
	.fallback__title {
		margin: 0;
		font-weight: var(--weight-bold);
	}
	.fallback__text {
		margin: 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
		overflow-wrap: anywhere;
	}
	.fallback__actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}
	.fallback__manual {
		display: grid;
		gap: var(--space-2);
		font-size: var(--text-body-sm);
	}
	.fallback__manual textarea {
		width: 100%;
		padding: var(--space-3);
		border: 1px solid var(--field-border);
		border-radius: var(--radius-card);
		background: var(--surface);
		color: var(--text);
		font: inherit;
		font-size: var(--text-body-sm);
	}
	@media (prefers-reduced-motion: reduce) {
		.contact-links a:hover,
		.contact-links a:focus-visible {
			transform: none;
		}
	}
</style>
