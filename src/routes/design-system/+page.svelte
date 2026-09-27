<!--
	Banc d'essai des composants Svelte du design system.
	Généré en dev et en staging uniquement (voir INTERNAL_ROUTES dans vite.config.ts),
	jamais publié en production. Toujours en noindex.
-->
<script lang="ts">
	import {
		Accordion,
		Badge,
		Breadcrumb,
		Button,
		Card,
		Check,
		Eyebrow,
		FeatureList,
		Field,
		Honeypot,
		Icon,
		LinkArrow,
		Logo,
		Metric,
		Notice,
		Offer,
		PriceRow,
		Rule,
		Section,
		SectionHead,
		Seo,
		SlashBand,
		SpecList,
		Status,
		Steps,
		Stroke,
		Tagline,
		Terminal
	} from '$lib/components';
	import { icons, type IconName } from '$lib/components/brand/Icon.svelte';
	import { reveal } from '$lib/actions/reveal';

	const surfaces = ['night', 'raised', 'ivory', 'orange'] as const;
	const iconNames = Object.keys(icons) as IconName[];

	// Démonstration du formulaire : états contrôlés
	let email = $state('camille@');
	let message = $state('');
	let projectType = $state('site');
	let budget = $state('small');
	let consent = $state(true);
	let sending = $state(false);
	const emailError = $derived(
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
			? undefined
			: 'Adresse incomplète. Exemple : nom@domaine.fr'
	);

	function fakeSend() {
		sending = true;
		setTimeout(() => (sending = false), 1500);
	}
</script>

<Seo title="Design system — banc d'essai" path="/design-system/" noindex />

<Section surface="night" labelledby="ds-title">
	<SlashBand right="6%" />
	<SectionHead
		id="ds-title"
		level={1}
		size="display"
		lead="Interne"
		eyebrow="Banc d'essai"
		title="Composants"
		lede="Chaque composant Svelte du design system, avec de vraies props. Page générée en dev et en staging uniquement."
	>
		<Status state="progress" as="p">Hors production · noindex</Status>
	</SectionHead>
</Section>

<!-- ===================================================================== -->
<Section surface="raised" labelledby="brand-t">
	<SectionHead id="brand-t" lead="01" eyebrow="Marque" title="Éléments de marque" size="h2" />
	<div class="grid">
		<div class="col-6 stack">
			<Logo variant="horizontal" />
			<Logo variant="compact" />
			<Tagline />
		</div>
		<div class="col-6 stack">
			<Eyebrow lead="03" label="Automatisation" rule />
			<p class="t-h2">Votre <Stroke>projet<span class="t-dot">.</span></Stroke></p>
			<Rule />
			<Rule plain />
			<div class="cluster">
				{#each iconNames as name (name)}
					<span class="icon-tile" title={name}><Icon {name} /></span>
				{/each}
			</div>
		</div>
	</div>
</Section>

<!-- ===================================================================== -->
{#each surfaces as surface (surface)}
	<Section {surface} labelledby="ctx-{surface}">
		<SectionHead
			id="ctx-{surface}"
			lead="02"
			eyebrow="Contexte"
			title="surface-{surface}"
			size="h2"
			lede="Même code dans les quatre contextes : les couleurs se réaccordent seules."
		/>
		<div class="stack">
			<div class="cluster">
				<Button href="/design-system/" icon="arrow-right">Primaire</Button>
				<Button variant="secondary">Secondaire</Button>
				<Button variant="ghost">Tertiaire</Button>
				<Button size="sm">Petit</Button>
				<Button size="lg">Grand</Button>
				<Button variant="secondary" icon="menu" iconOnly label="Ouvrir le menu" />
				<Button disabled>Désactivé</Button>
				<Button busy>Envoi</Button>
			</div>
			<p>
				Un lien <a class="link" href="/design-system/">dans un paragraphe</a>, puis des liens
				autonomes :
			</p>
			<div class="cluster">
				<LinkArrow href="/design-system/">Explorer</LinkArrow>
				<LinkArrow href="https://svelte.dev">Lien externe</LinkArrow>
			</div>
			{#if surface !== 'orange'}
				<div class="cluster cluster--sm">
					<Badge tone="tech">SvelteKit</Badge>
					<Badge>WordPress</Badge>
					<Badge tone="accent">Nouveau</Badge>
					{#if surface !== 'ivory'}<Badge tone="solid">● live</Badge>{/if}
				</div>
				<div class="cluster">
					<Status state="done">Livré</Status>
					<Status state="progress">En cours</Status>
					<Status state="todo">À venir</Status>
					<Status state="error">Échec</Status>
				</div>
			{/if}
		</div>
	</Section>
{/each}

<!-- ===================================================================== -->
<Section surface="ivory" labelledby="content-t">
	<SectionHead id="content-t" lead="03" eyebrow="Contenu" title="Blocs éditoriaux" size="h2" />
	<div class="stack stack--lg">
		<Breadcrumb
			items={[
				{ label: 'Accueil', href: '/' },
				{ label: 'Services', href: '/design-system/' },
				{ label: 'Automatisation' }
			]}
		/>
		<FeatureList
			items={[
				{ title: 'Web', text: 'Sites vitrines, boutiques, refontes et SEO.' },
				{ title: 'Design & identité', text: 'Identité visuelle, direction artistique, supports.' },
				{
					title: 'Automatisation',
					text: "Audit, workflows, CRM : du temps retrouvé sur l'essentiel."
				}
			]}
		>
			{#snippet extra(item)}
				{#if item.title === 'Automatisation'}
					<div class="cluster cluster--sm">
						<Badge tone="tech">Make</Badge><Badge tone="tech">n8n</Badge>
					</div>
				{/if}
			{/snippet}
		</FeatureList>
		<Steps
			current={1}
			items={[
				{ title: 'Comprendre', text: 'On échange sur vos besoins et vos objectifs.' },
				{ title: 'Concevoir', text: 'On vous propose une solution sur mesure.' },
				{ title: 'Développer', text: 'Le design prend vie, le code fait le reste.' },
				{ title: 'Livrer', text: "On teste, on ajuste, et c'est en ligne." }
			]}
		/>
		<div class="auto-grid" style="--auto-min: 12rem">
			<Metric value="15 ans" label="d'expérience en projets clients" />
			<Metric value="7 j" label="pour un site vitrine en ligne" />
			<Metric value="1" label="interlocuteur, du brief à la livraison" />
		</div>
		<Accordion
			open={0}
			items={[
				{
					question: 'Combien de temps pour un site vitrine ?',
					answer: 'Sept jours ouvrés après validation de la maquette.'
				},
				{
					question: 'Puis-je modifier mon site moi-même ?',
					answer: "Oui, avec une interface d'administration et une prise en main."
				}
			]}
		/>
	</div>
</Section>

<!-- ===================================================================== -->
<Section surface="night" labelledby="offers-t">
	<SectionHead
		id="offers-t"
		lead="04"
		eyebrow="Regroupements"
		title="Cartes & offres"
		size="h2"
		lede="Montants d'exemple : les vrais tarifs viendront du catalogue (phase 4)."
	/>
	<div class="auto-grid" style="--auto-min: 18rem">
		<Offer
			title="Pack Lancement Web"
			price="990 €"
			unit="HT · 7 jours"
			highlight="Le plus choisi"
			features={[
				'Site vitrine jusqu’à 5 pages',
				'Responsive et SEO de base',
				'Mise en ligne incluse'
			]}
		>
			{#snippet action()}<Button href="/design-system/" block>Choisir ce pack</Button>{/snippet}
		</Offer>
		<Offer
			title="Pack Boutique"
			price="2 200 €"
			unit="HT · 12 jours"
			features={['Catalogue et paiement', 'Gestion des stocks', 'Formation incluse']}
		>
			{#snippet action()}<Button variant="secondary" href="/design-system/" block
					>Voir le détail</Button
				>{/snippet}
		</Offer>
		<Card href="/design-system/">
			<span class="icon-tile"><Icon name="workflow" /></span>
			<h3 class="t-h3">Automatisation</h3>
			<p class="t-body-sm t-muted">Audit de vos processus, puis workflows qui tournent seuls.</p>
		</Card>
	</div>
	<div class="stack stack--sm" style="margin-top: var(--space-7)">
		<PriceRow label="Page supplémentaire" value="175 € HT" />
		<PriceRow label="Maintenance mensuelle" value="49 € HT / mois" />
	</div>
	<div class="grid" style="margin-top: var(--space-7)">
		<div class="col-7">
			<Terminal
				label="Build de production réussi, 3 pages prérendues, déployé sur devndone.com"
				lines={[
					{ kind: 'command', text: 'npm run release' },
					{ kind: 'muted', text: 'vite building for production…' },
					{ kind: 'ok', text: '3 pages prerendered' },
					{ kind: 'kv', key: 'status', value: 'ready', ok: true },
					{ kind: 'kv', key: 'deploy', value: 'production → devndone.com', ok: true }
				]}
			/>
		</div>
		<div class="col-4 start-9">
			<SpecList
				items={[
					{ key: 'stack', value: 'SvelteKit · TS' },
					{ key: 'hébergement', value: 'statique' },
					{ key: 'délai', value: '7 jours ouvrés' }
				]}
			/>
		</div>
	</div>
</Section>

<!-- ===================================================================== -->
<Section surface="ivory" labelledby="form-t">
	<SectionHead
		id="form-t"
		lead="05"
		eyebrow="Formulaires"
		title="Champs & messages"
		size="h2"
		lede="Validation en direct sur l'email ; le bouton simule un envoi."
	/>
	<div class="grid">
		<form class="form col-7" novalidate onsubmit={(e) => (e.preventDefault(), fakeSend())}>
			<div class="form__row form__row--2">
				<Field label="Nom" name="name" autocomplete="name" required />
				<Field label="Entreprise" name="company" autocomplete="organization" optional />
			</div>
			<Field
				label="Email"
				name="email"
				type="email"
				autocomplete="email"
				required
				bind:value={email}
				error={emailError}
			/>
			<Field
				label="Type de projet"
				name="type"
				as="select"
				bind:value={projectType}
				options={[
					{ value: 'site', label: 'Site vitrine' },
					{ value: 'shop', label: 'Boutique WooCommerce' },
					{ value: 'auto', label: 'Automatisation' },
					{ value: 'custom', label: 'Développement sur mesure' }
				]}
			/>
			<Field
				label="Votre besoin"
				name="message"
				as="textarea"
				required
				hint="Quelques lignes suffisent."
				bind:value={message}
			/>
			<fieldset class="field" style="border: 0; padding: 0; margin: 0">
				<legend class="field__label">Budget indicatif</legend>
				<div class="cluster">
					<Check type="radio" name="budget" value="small" bind:group={budget}>&lt; 2 000 €</Check>
					<Check type="radio" name="budget" value="mid" bind:group={budget}>2 – 5 k€</Check>
					<Check type="radio" name="budget" value="large" bind:group={budget}>&gt; 5 k€</Check>
				</div>
			</fieldset>
			<Check name="consent" required bind:checked={consent}>
				J'accepte que mes données soient utilisées pour répondre à ma demande.
			</Check>
			<Honeypot />
			<div class="form__submit">
				<Button type="submit" icon="arrow-right" busy={sending}>Envoyer ma demande</Button>
				<p class="form__legal">
					État : {projectType} · {budget} · consentement {consent ? 'oui' : 'non'}
				</p>
			</div>
		</form>
		<div class="col-4 start-9 stack">
			<Notice tone="info" title="Bon à savoir.">Tarifs hors taxes, TVA non applicable.</Notice>
			<Notice tone="success" title="Demande envoyée.">Réponse sous 48 h ouvrées.</Notice>
			<Notice tone="error" title="Envoi impossible.">Réessayez dans quelques minutes.</Notice>
			<Field label="Désactivé" name="disabled" value="Non modifiable" disabled />
		</div>
	</div>
</Section>

<!-- ===================================================================== -->
<Section surface="night" labelledby="motion-t">
	<SectionHead
		id="motion-t"
		lead="06"
		eyebrow="Mouvement"
		title="Apparition au défilement"
		size="h2"
		lede="use:reveal — les blocs hors écran au chargement apparaissent en montant de 12 px."
	/>
	<ol class="steps">
		{#each ['Hors écran', 'Observé', 'Révélé', 'Terminé'] as label, i (label)}
			<li class="step" use:reveal={{ delay: i * 60 }}>
				<h3 class="t-h3">{label}</h3>
				<p>Délai {i * 60} ms</p>
			</li>
		{/each}
	</ol>
</Section>
