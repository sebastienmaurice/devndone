<!--
	Tarifs : page de comparaison (catalogue validé le 21/10/2026, content/tarifs.ts).
	Guide d'orientation en tête (situation, offre adaptée, renvoi vers la page Agences).
	Création et refonte au forfait, interventions et audits, maintenance facultative, conditions de
	commande, avis Malt réels (composant existant, textes inchangés), bloc contact.
	Prix sans « HT » : franchise en base de TVA (mention affichée en tête et dans les conditions).
	En-tête : la mascotte présentant trois formules, à droite en grand écran.
-->
<script lang="ts">
	import { LinkArrow, Seo } from '$lib/components';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import MaintenancePlans from '$lib/components/sections/MaintenancePlans.svelte';
	import PackageGrid from '$lib/components/sections/PackageGrid.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import { links, reviewsIntro } from '$lib/content/studio';
	import {
		maintenanceIntro,
		maintenancePage,
		offerPath,
		offers,
		offersConditions,
		offersGuide,
		offersIntro,
		vatNotice
	} from '$lib/content/tarifs';

	// Guide : chaque situation renvoie à la page de son offre
	const guide = offersGuide.rows.map((r) => {
		const o = offers.find((x) => x.slug === r.slug);
		if (!o) throw new Error(`Offre inconnue : ${r.slug}`);
		return {
			situation: r.situation,
			name: o.name,
			href: offerPath(o),
			visual: guideVisuals[o.slug]
		};
	});
	const guideItems = [
		...guide,
		{
			situation: offersGuide.maintenance,
			name: 'Maintenance WordPress',
			href: maintenancePage.path,
			visual: guideVisuals.maintenance
		}
	];
	import mascot from '$lib/assets/mascotte/mascotte-renard-tarifs-formules-abonnement.jpg?enhanced&w=1200;720;360';
	import { guideVisuals } from '$lib/assets/tarifs/orientation';
</script>

<Seo
	title="Tarifs : sites WordPress au forfait et maintenance"
	path="/tarifs/"
	description="Landing page 1 750 €, site vitrine WordPress 3 500 €, refonte et boutique WooCommerce sur cadrage, audits, sprints à 350 € par jour, maintenance dès 99 € par mois."
/>

<PageIntro
	label="Tarifs"
	heading={offersIntro.title}
	accent={offersIntro.accent}
	lede="{offersIntro.lede} {vatNotice}"
	crumbs={[{ label: 'Accueil', href: '/' }, { label: 'Tarifs' }]}
>
	{#snippet aside()}
		<div class="mascot">
			<enhanced:img
				src={mascot}
				alt="Dev, la mascotte, présente trois cartes de formules, dont la formule populaire au centre, avec la note manuscrite « Des formules adaptées à vos besoins ! »"
				sizes="(min-width: 1100px) 560px, 92vw"
				fetchpriority="high"
			/>
		</div>
	{/snippet}
</PageIntro>

<section class="section section--tight band" aria-labelledby="guide-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Orientation" />
			<h2 class="t-h2" id="guide-title">
				<AccentTitle text={offersGuide.title} accent={offersGuide.accent} />
			</h2>
		</header>
		<ul class="guide" role="list">
			{#each guideItems as g (g.href)}
				<li>
					<a class="guide__item" href={g.href}>
						<!-- Médaillon blanc : l'icône (fond blanc) y reste lisible sur la tuile Bleu nuit -->
						<span class="guide__medal">
							{#if g.visual}
								<enhanced:img
									class="guide__icon"
									src={g.visual}
									alt=""
									sizes="80px"
									loading="lazy"
								/>
							{/if}
						</span>
						<span class="guide__text">
							<span class="guide__situation">{g.situation}</span>
							<span class="guide__offer">{g.name}<Icon name="arrow-right" /></span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
		<p class="guide__agencies">
			{offersGuide.agencies}
			<LinkArrow href="/agences/">Le renfort pour les agences</LinkArrow>
		</p>
	</div>
</section>

<section class="section section--tight" aria-labelledby="creation-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Création et refonte" />
			<h2 class="t-h2" id="creation-title">{offersIntro.creationTitle}</h2>
		</header>
		<PackageGrid group="creation" />
	</div>
</section>

<section class="section section--tight band" aria-labelledby="ponctuel-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Ponctuel" />
			<h2 class="t-h2" id="ponctuel-title">{offersIntro.ponctuelTitle}</h2>
		</header>
		<PackageGrid group="ponctuel" />
	</div>
</section>

<section class="section section--tight" aria-labelledby="maintenance-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Maintenance" />
			<h2 class="t-h2" id="maintenance-title">
				<AccentTitle text={maintenanceIntro.title} accent={maintenanceIntro.accent} />
			</h2>
			<p class="note">{maintenanceIntro.lede}</p>
		</header>
		<MaintenancePlans detailLink />
		<p><LinkArrow href={maintenancePage.path}>Tout savoir sur la maintenance</LinkArrow></p>
	</div>
</section>

<section class="section section--tight band" aria-labelledby="conditions-title">
	<div class="container conditions">
		<div class="stack">
			<SectionLabel label="Conditions" />
			<h2 class="t-h2" id="conditions-title">{offersConditions.title}</h2>
			<ol class="steps-list" role="list">
				{#each offersConditions.steps as step, i (step)}
					<li><span class="steps-list__num" aria-hidden="true">{i + 1}</span>{step}</li>
				{/each}
			</ol>
			<p class="note">{vatNotice}</p>
		</div>
		<div class="side">
			<div class="box">
				<h3 class="box__title">{offersConditions.excludedTitle}</h3>
				<ul class="tags" role="list">
					{#each offersConditions.excluded as item (item)}<li>{item}</li>{/each}
				</ul>
			</div>
			<div class="box">
				<h3 class="box__title">{offersConditions.customTitle}</h3>
				<ul class="tags" role="list">
					{#each offersConditions.custom as item (item)}<li>{item}</li>{/each}
				</ul>
				<p><LinkArrow href={links.calendly}>En parler</LinkArrow></p>
			</div>
		</div>
	</div>
</section>

<section class="section section--tight" aria-labelledby="avis-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label={reviewsIntro.eyebrow} />
			<h2 class="t-h2" id="avis-title">
				<AccentTitle text={reviewsIntro.title} accent={reviewsIntro.accent} />
			</h2>
			<p class="note">{reviewsIntro.lede}</p>
		</header>
		<ReviewList />
		<div class="cluster">
			<LinkArrow href={links.malt}>{reviewsIntro.more}</LinkArrow>
			<a class="link-arrow" href="/realisations/"
				>Voir les réalisations <Icon name="arrow-right" /></a
			>
		</div>
	</div>
</section>

<ContactBlock />

<style>
	/* Mascotte sur fond blanc : multiply la fond dans l'Ivoire de la page */
	.mascot {
		max-width: 36rem;
		margin-inline: auto;
		aspect-ratio: 1448 / 1019;
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
			max-width: 26rem;
		}
	}
	.note {
		margin: 0;
		max-width: 44rem;
		color: var(--text-muted);
	}
	.band {
		background: var(--surface);
		border-block: 1px solid var(--line);
	}
	/* Guide : tuiles Ivoire sur la bande blanche ; médaillon d'icône, situation, puis offre en lien
	   fléché calé en bas. 1 colonne, 2 dès 640 px, 4 dès 1100 px (8 tuiles : deux rangées pleines).
	   Survol et focus : la tuile passe en Bleu nuit (fond --text, variables sémantiques inversées),
	   filet orange ; le médaillon reste blanc, se soulève et pivote légèrement ; l'offre passe en
	   orange et sa flèche glisse. */
	.guide {
		display: grid;
		gap: var(--col-gap);
		grid-template-columns: minmax(0, 1fr);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 640px) {
		.guide {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (min-width: 1100px) {
		.guide {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
	.guide li {
		display: grid;
	}
	.guide__item {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr;
		gap: var(--space-5);
		padding: var(--space-5);
		overflow: hidden;
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		color: var(--text);
		text-decoration: none;
		transition:
			background-color var(--duration-base) var(--ease-out),
			border-color var(--duration-base) var(--ease-out),
			box-shadow var(--duration-base) var(--ease-out),
			transform var(--duration-base) var(--ease-out);
	}
	/* Halo orange discret derrière le médaillon, révélé au survol */
	.guide__item::before {
		content: '';
		position: absolute;
		top: -3rem;
		left: -3rem;
		width: 11rem;
		height: 11rem;
		border-radius: 50%;
		background: radial-gradient(circle, var(--action) 0%, transparent 70%);
		opacity: 0;
		transition: opacity var(--duration-reveal) var(--ease-out);
		pointer-events: none;
	}
	.guide__medal {
		position: relative;
		display: grid;
		place-items: center;
		width: 6.5rem;
		height: 6.5rem;
		border-radius: 50%;
		background: var(--surface);
		border: 1px solid var(--line);
		box-shadow: var(--shadow-card);
		transition:
			transform var(--duration-reveal) var(--ease-out),
			border-color var(--duration-base) var(--ease-out),
			box-shadow var(--duration-base) var(--ease-out);
	}
	/* Icône : fond blanc fondu dans le médaillon blanc */
	.guide__icon {
		display: block;
		width: 5rem;
		height: 5rem;
		object-fit: contain;
		mix-blend-mode: multiply;
	}
	.guide__text {
		position: relative;
		display: grid;
		gap: var(--space-3);
		align-content: space-between;
	}
	/* La situation se lit d'abord : texte courant foncé ; l'offre suit en lien bleu océan */
	.guide__situation {
		font-weight: var(--weight-medium);
		color: var(--text);
		transition: color var(--duration-base) var(--ease-out);
	}
	/* Flèche en ligne, collée au dernier mot, même quand le nom passe sur deux lignes */
	.guide__offer {
		font-weight: var(--weight-bold);
		color: var(--action-alt-text);
		transition: color var(--duration-base) var(--ease-out);
	}
	.guide__offer :global(.icon) {
		display: inline-block;
		width: 18px;
		height: 18px;
		margin-left: var(--space-2);
		vertical-align: -0.2em;
		transition: transform var(--duration-base) var(--ease-out);
	}
	.guide__item:is(:hover, :focus-visible) {
		background: var(--text);
		border-color: var(--action);
		box-shadow: var(--shadow-card-hover);
		transform: translateY(-4px);
	}
	.guide__item:is(:hover, :focus-visible)::before {
		opacity: 0.35;
	}
	.guide__item:is(:hover, :focus-visible) .guide__medal {
		transform: translateY(-2px) rotate(-6deg) scale(1.06);
		border-color: var(--action);
		box-shadow: var(--shadow-card-hover);
	}
	.guide__item:is(:hover, :focus-visible) .guide__situation {
		color: var(--bg);
	}
	.guide__item:is(:hover, :focus-visible) .guide__offer {
		color: var(--action);
	}
	.guide__item:is(:hover, :focus-visible) .guide__offer :global(.icon) {
		transform: translateX(4px);
	}
	@media (prefers-reduced-motion: reduce) {
		.guide__item,
		.guide__medal,
		.guide__offer :global(.icon) {
			transform: none !important;
		}
	}
	.guide__agencies {
		margin: 0;
		font-weight: var(--weight-semibold);
	}
	/* Conditions de commande : étapes numérotées à gauche, encarts à droite */
	.conditions {
		display: grid;
		gap: var(--space-7);
		align-items: start;
	}
	@media (min-width: 1000px) {
		.conditions {
			grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
		}
	}
	.steps-list {
		display: grid;
		gap: var(--space-4);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.steps-list li {
		display: flex;
		gap: var(--space-4);
		align-items: flex-start;
	}
	.steps-list__num {
		display: grid;
		place-items: center;
		flex: none;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		background: var(--action);
		color: var(--surface);
		font-family: var(--font-display);
		font-weight: var(--weight-display);
		font-size: 1.125rem;
		line-height: 1;
	}
	.side {
		display: grid;
		gap: var(--space-5);
	}
	.box {
		display: grid;
		gap: var(--space-4);
		padding: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
	}
	.box p {
		margin: 0;
	}
	.box__title {
		margin: 0;
		font-size: var(--text-h3);
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.tags li {
		padding: 0.2rem var(--space-3);
		border-radius: 999px;
		background: var(--tag-bg);
		color: var(--tag-text);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-bold);
	}
	.cluster {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-5);
	}
</style>
