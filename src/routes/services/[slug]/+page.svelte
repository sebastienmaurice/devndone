<!--
	Page d'une expertise. Contenu réel uniquement : description et domaines (content/services.ts),
	offres rattachées et maintenance (content/tarifs.ts), process, réalisations liées.
	Rien n'est inventé : sans forfait, la page renvoie au premier échange (texte du site en ligne).
	En-tête : la mascotte de l'expertise à droite (même illustration que sa carte sur l'accueil),
	prestations en pastilles cochées sous le texte, au-dessus des boutons.
-->
<script lang="ts">
	import { Button, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import ApplicationsProjects from '$lib/components/sections/ApplicationsProjects.svelte';
	import MaintenancePlans from '$lib/components/sections/MaintenancePlans.svelte';
	import PackageGrid from '$lib/components/sections/PackageGrid.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import { expertiseHeaderVisuals, expertiseMascots } from '$lib/assets/mascotte/expertises';
	import { projects } from '$lib/content/realisations';
	import { universes } from '$lib/content/services';
	import { hero, links } from '$lib/content/studio';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import {
		maintenanceIntro,
		maintenancePage,
		offers,
		offersIntro,
		offersIntroAutomatisation,
		vatNotice
	} from '$lib/content/tarifs';

	let { data } = $props();

	const u = $derived(data.universe);
	const num = $derived(String(data.index + 1).padStart(2, '0'));

	// Réalisations liées : d'après les technologies déclarées de chaque projet
	const related = $derived(
		u.id === 'web'
			? projects.filter((p) => p.stack.includes('WordPress')).map((p) => p.slug)
			: u.id === 'full-stack'
				? projects.filter((p) => p.stack.includes('Node.js')).map((p) => p.slug)
				: []
	);
	// Visuel d'en-tête dédié s'il existe (affiché en grand), sinon la mascotte de la carte
	const headerVisual = $derived(expertiseHeaderVisuals[u.id]);
	const mascot = $derived(headerVisual ?? expertiseMascots[u.id]);
	const others = $derived(universes.filter((x) => x.id !== u.id));
	// Offres rattachées à l'expertise (pages /services/<id>/<offre>/)
	const uOffers = $derived(offers.filter((o) => o.universe === u.id));
	// En-tête de la grille : celui du catalogue WordPress, sauf pour l'automatisation
	const offersHead = $derived(u.id === 'automatisation' ? offersIntroAutomatisation : offersIntro);
</script>

<Seo title={u.seoTitle} path={u.path} description={u.description ?? u.text} />

<PageIntro
	label="Expertise {num}"
	heading={u.title}
	lede={u.text}
	crumbs={[
		{ label: 'Accueil', href: '/' },
		{ label: 'Services', href: '/services/' },
		{ label: u.title }
	]}
>
	{#snippet actions()}
		<!-- Prestations en pastilles cochées : la colonne de droite reste à la mascotte -->
		<div class="domains">
			<p class="sr-only">Prestations</p>
			<ul class="domains__list" role="list">
				{#each u.tags as tag (tag)}
					<li><span class="domains__check"><Icon name="check" size="sm" /></span>{tag}</li>
				{/each}
			</ul>
		</div>
		<Button href="/contact/" icon="arrow-right">Parlons de votre projet</Button>
		<Button href={links.calendly} variant="secondary"><Icon name="calendar" />{hero.ctaCall}</Button
		>
	{/snippet}
	{#snippet aside()}
		{#if mascot}
			<div class="mascot" class:mascot--wide={headerVisual?.wide}>
				<enhanced:img
					src={mascot.src}
					alt={mascot.alt}
					sizes={headerVisual?.wide
						? '(min-width: 1100px) 700px, 96vw'
						: '(min-width: 1100px) 560px, 92vw'}
					fetchpriority="high"
				/>
			</div>
		{/if}
	{/snippet}
</PageIntro>

{#if u.id === 'applications'}
	<!-- Projets d'applications (cartes, comme « Mon process ») ; chaque projet a sa page -->
	<section class="section section--tight apps-projects" aria-labelledby="apps-projects-title">
		<div class="container">
			<ApplicationsProjects />
		</div>
	</section>
{/if}

{#if uOffers.length}
	<section class="section section--tight" aria-labelledby="forfaits-title">
		<div class="container stack stack--lg">
			<header class="stack stack--sm">
				<SectionLabel label="Offres" />
				<h2 class="t-h2" id="forfaits-title">
					<AccentTitle text={offersHead.title} accent={offersHead.accent} />
				</h2>
				<p class="muted">{offersHead.lede}</p>
			</header>
			<PackageGrid only={uOffers.map((o) => o.slug)} />
			<p class="muted vat">{vatNotice}</p>
		</div>
	</section>
{:else}
	<section class="section section--tight" aria-labelledby="devis-title">
		<div class="container">
			<div class="quote">
				<h2 class="t-h3" id="devis-title">Un projet sur mesure</h2>
				<p>{offersIntro.customNote}</p>
				<Button href={links.calendly} icon="arrow-up-right">{hero.ctaCall}</Button>
			</div>
		</div>
	</section>
{/if}

{#if u.maintenance}
	<section class="section section--tight band" aria-labelledby="maintenance-title">
		<div class="container stack stack--lg">
			<header class="stack stack--sm">
				<SectionLabel label="Maintenance" />
				<h2 class="t-h2" id="maintenance-title">
					<AccentTitle text={maintenanceIntro.title} accent={maintenanceIntro.accent} />
				</h2>
				<p class="muted">{maintenanceIntro.lede}</p>
			</header>
			<MaintenancePlans detailLink />
			<p>
				<a class="link-arrow" href={maintenancePage.path}
					>Tout savoir sur la maintenance <Icon name="arrow-right" /></a
				>
			</p>
		</div>
	</section>
{/if}

<section class="section section--tight" aria-labelledby="process-title">
	<div class="container">
		<ProcessRow />
	</div>
</section>

{#if related.length}
	<section class="section section--tight band" aria-labelledby="related-title">
		<div class="container stack stack--lg">
			<header class="stack stack--sm">
				<SectionLabel label="Réalisations" />
				<h2 class="t-h2" id="related-title">
					Projets <span class="accent-word">{u.title.toLowerCase()}</span> déjà livrés
				</h2>
			</header>
			<ProjectGrid only={related} />
		</div>
	</section>
{/if}

<section class="section section--tight" aria-labelledby="others-title">
	<div class="container">
		<h2 class="t-h3" id="others-title">Les autres expertises</h2>
		<ul class="others" role="list">
			{#each others as o (o.id)}
				<li>
					<a class="other" href={o.path}
						><Icon name={o.icon} />{o.title}<Icon name="arrow-right" /></a
					>
				</li>
			{/each}
		</ul>
	</div>
</section>

<ContactBlock />

<style>
	.vat {
		margin: 0;
		font-size: var(--text-body-sm);
	}
	.muted {
		margin: 0;
		max-width: 40rem;
		color: var(--text-muted);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
	/* Illustration 3:2 sur fond blanc : multiply la fond dans l'Ivoire de la page */
	.mascot {
		aspect-ratio: 3 / 2;
	}
	.mascot :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	/* Visuel d'en-tête dédié, en grand : il gagne sur l'espace entre les colonnes (vers la gauche),
	   sans dépasser le bord droit du contenu */
	.mascot--wide {
		aspect-ratio: 1388 / 830;
	}
	@media (min-width: 1100px) {
		.mascot--wide {
			width: calc(100% + 4rem);
			margin-left: -4rem;
		}
	}
	/* Prestations : pleine ligne au-dessus des boutons, pastilles blanches cochées */
	.domains {
		flex-basis: 100%;
		margin-bottom: var(--space-2);
	}
	.domains__list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.domains__list li {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1) var(--space-4) var(--space-1) var(--space-1);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 999px;
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
	}
	.domains__check {
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		flex: none;
		border-radius: 50%;
		background: var(--action);
		color: var(--on-action);
	}
	.quote {
		display: grid;
		gap: var(--space-4);
		justify-items: start;
		max-width: 44rem;
		padding: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.quote p {
		margin: 0;
		color: var(--text-muted);
	}
	.others {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin: var(--space-5) 0 0;
		padding: 0;
		list-style: none;
	}
	.other {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-5);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-btn);
		color: var(--text);
		font-weight: var(--weight-bold);
		text-decoration: none;
		transition: border-color var(--duration-base) var(--ease-out);
	}
	.other:hover {
		border-color: var(--line-strong);
	}
	.other :global(.icon:last-child) {
		width: 18px;
		height: 18px;
		color: var(--accent-deco);
	}
</style>
