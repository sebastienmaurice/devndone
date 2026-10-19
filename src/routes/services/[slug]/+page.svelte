<!--
	Page d'une expertise. Contenu réel uniquement : description et domaines (content/services.ts),
	forfaits liés et maintenance (content/tarifs.ts), process, réalisations liées.
	Rien n'est inventé : sans forfait, la page renvoie au premier échange (texte du site en ligne).
-->
<script lang="ts">
	import { Button, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import MaintenancePlans from '$lib/components/sections/MaintenancePlans.svelte';
	import PackageGrid from '$lib/components/sections/PackageGrid.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import { projects } from '$lib/content/realisations';
	import { universes } from '$lib/content/services';
	import { hero, links } from '$lib/content/studio';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import { maintenanceIntro, packagesIntro } from '$lib/content/tarifs';

	let { data } = $props();

	const u = $derived(data.universe);
	const num = $derived(String(data.index + 1).padStart(2, '0'));

	// Réalisations liées : d'après les technologies déclarées de chaque projet
	const related = $derived(
		u.id === 'web'
			? projects.filter((p) => p.stack.includes('WordPress')).map((p) => p.slug)
			: u.id === 'full-stack'
				? projects.filter((p) => p.stack.includes('Svelte')).map((p) => p.slug)
				: []
	);
	const others = $derived(universes.filter((x) => x.id !== u.id));
</script>

<Seo title="{u.title} · Services" path={u.path} description={u.text} />

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
		<Button href="/contact/" icon="arrow-right">Parlons de votre projet</Button>
		<Button href={links.calendly} variant="secondary"><Icon name="calendar" />{hero.ctaCall}</Button
		>
	{/snippet}
	{#snippet aside()}
		<div class="domains">
			<p class="domains__title">Prestations</p>
			<ul class="domains__list" role="list">
				{#each u.tags as tag (tag)}
					<li><span class="domains__check"><Icon name="check" size="sm" /></span>{tag}</li>
				{/each}
			</ul>
		</div>
	{/snippet}
</PageIntro>

{#if u.packages.length}
	<section class="section section--tight" aria-labelledby="forfaits-title">
		<div class="container stack stack--lg">
			<header class="stack stack--sm">
				<SectionLabel label="Forfaits" />
				<h2 class="t-h2" id="forfaits-title">
					<AccentTitle text={packagesIntro.title} accent={packagesIntro.accent} />
				</h2>
				<p class="muted">{packagesIntro.lede}</p>
			</header>
			<PackageGrid only={u.packages} />
		</div>
	</section>
{:else}
	<section class="section section--tight" aria-labelledby="devis-title">
		<div class="container">
			<div class="quote">
				<h2 class="t-h3" id="devis-title">Un projet sur mesure</h2>
				<p>{packagesIntro.note}</p>
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
			<MaintenancePlans />
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
	.muted {
		margin: 0;
		max-width: 40rem;
		color: var(--text-muted);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
	.domains {
		padding: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.domains__title {
		margin: 0 0 var(--space-4);
		font-size: var(--text-label);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
	}
	.domains__list {
		display: grid;
		gap: var(--space-3);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.domains__list li {
		display: flex;
		align-items: center;
		gap: var(--space-3);
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
