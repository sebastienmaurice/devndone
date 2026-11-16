<!--
	Accueil, d'après la maquette « Landing page Dev'n Done et renard orange » (19/10/2026) :
	hero (slogan manuscrit, titre « DONE. », mascotte), expertises, process, réalisations, contact.
	Tarifs, avis et présentation détaillée vivent sur leurs pages (/tarifs/, /apropos/).
	Textes : $lib/content.
-->
<script lang="ts">
	import { Button, LinkArrow, Seo } from '$lib/components';
	import ReviewList from '$lib/components/sections/ReviewList.svelte';
	import { vatNotice } from '$lib/content/tarifs';
	import HandNote from '$lib/components/brand/HandNote.svelte';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import DoneWord from '$lib/components/brand/DoneWord.svelte';
	import Icon from '$lib/components/brand/Icon.svelte';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import ExpertiseCards from '$lib/components/sections/ExpertiseCards.svelte';
	import OfferShortcuts from '$lib/components/sections/OfferShortcuts.svelte';
	import ProcessRow from '$lib/components/sections/ProcessRow.svelte';
	import ProjectGrid from '$lib/components/sections/ProjectGrid.svelte';
	import PriceTag from '$lib/components/ui/PriceTag.svelte';
	import heroImage from '$lib/assets/mascotte/mascotte-renard-developpeur-wordpress-elementor.png?enhanced&w=1120;720;480&quality=40';
	import { realisationsIntro } from '$lib/content/realisations';
	import { heroSlogan, servicesIntro } from '$lib/content/services';
	import { hero, homePaths, links, maltRating, reviewsIntro } from '$lib/content/studio';
	import pathAgences from '$lib/assets/mascotte/mascotte-renard-agence-web-partenariat-poignee-de-main.jpg?enhanced&w=640;320';
	import pathEntreprises from '$lib/assets/mascotte/mascotte-renard-projet-site-web-presentation-client.jpg?enhanced&w=640;320';
	import { site, absoluteUrl, organizationId } from '$lib/config/site';
	import { legal } from '$lib/content/legal';

	const keywords = hero.keywords.split(' · ');

	// Offres de l'accueil (accès direct, maillage interne) : slugs du catalogue content/tarifs.ts
	const homeOffers = [
		'sprint-wordpress-woocommerce',
		'audit-technique-wordpress',
		'landing-page',
		'site-vitrine-wordpress',
		'refonte-site-wordpress',
		'boutique-woocommerce'
	];

	// Réalisations de l'accueil : projets WordPress et WooCommerce réalisés pour des clients
	const homeProjects = [
		'palimpseste-urbain',
		'gsti',
		'maxilou',
		'petit-chateau-vercourt',
		'pano-signservice',
		'harmony-valse'
	];

	// Mascotte de chaque parcours du bloc d'orientation (fond blanc, comme la carte)
	const pathVisuals = {
		agences: {
			src: pathAgences,
			alt: "Dev, la mascotte, serre la main d'une professionnelle devant une maquette de page web"
		},
		entreprises: {
			src: pathEntreprises,
			alt: 'Dev, la mascotte, présente un site web sur son ordinateur portable à une cliente'
		}
	};

	// Données structurées : l'entreprise (identifiant partagé avec les pages d'offre et À propos) et
	// le site. Slogan : celui du hero, validé le 22/10/2026. Email : celui des mentions légales.
	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'ProfessionalService',
			'@id': organizationId,
			name: site.wordmark,
			url: site.url,
			logo: absoluteUrl('/icon-512.png'),
			image: absoluteUrl(site.ogImage),
			description: site.description,
			slogan: heroSlogan.join(' '),
			knowsAbout: [
				'Développement full stack',
				'Création et refonte de sites web',
				'Automatisation des processus',
				'WordPress',
				'WooCommerce'
			],
			areaServed: 'FR',
			// Coordonnées : celles des mentions légales (publication validée par Sébastien)
			telephone: '+33 6 20 84 78 01',
			address: {
				'@type': 'PostalAddress',
				streetAddress: '1 rue Blaise Pascal',
				postalCode: '59540',
				addressLocality: 'Caudry',
				addressCountry: 'FR'
			},
			founder: {
				'@type': 'Person',
				'@id': `${absoluteUrl('/apropos/')}#sebastien-maurice`,
				name: 'Sébastien Maurice'
			},
			email: legal.publisher.email,
			sameAs: [links.malt, links.linkedin]
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			'@id': `${site.url}/#site`,
			name: site.wordmark,
			url: site.url,
			inLanguage: 'fr-FR',
			publisher: { '@id': organizationId }
		}
	];
</script>

<Seo path="/" ogTitle={site.ogTitle} ogDescription={site.ogDescription} {jsonLd} />

<!-- Hero -->
<section class="hero" aria-labelledby="hero-title">
	<div class="container hero__grid">
		<div class="hero__text">
			<HandNote lines={heroSlogan} />
			<h1 class="hero__title" id="hero-title">
				<!-- Métier en surtitre, dans le H1 (16/11/2026) : lu par les moteurs, discret à l'écran -->
				<span class="hero__kicker">{hero.kicker}</span>
				<span class="hero__line">Des projets</span>
				<span class="hero__line">pensés pour</span>
				<span class="hero__line">être <DoneWord sizes="(min-width: 1100px) 340px, 220px" /></span>
			</h1>
			<p class="hero__lede">{hero.lede}</p>
			<p class="hero__keywords">
				{#each keywords as word, i (word)}{#if i > 0}<span class="hero__slash" aria-hidden="true"
							>/</span
						>{/if}<span>{word}</span>{/each}
			</p>
			<div class="hero__ctas">
				<Button href="/services/" icon="arrow-right" size="lg">{hero.ctaServices}</Button>
				<Button href={links.calendly} variant="secondary" size="lg"
					><Icon name="calendar" />{hero.ctaCall}</Button
				>
			</div>
		</div>
		<div class="hero__visual">
			<enhanced:img
				src={heroImage}
				alt="Dev, la mascotte renard de Dev'n Done, assis avec son ordinateur portable entre un écran de code JavaScript et une interface WordPress avec Elementor, entouré des icônes WordPress, Elementor, WooCommerce, Automatisation, Identité et Full Stack"
				sizes="(min-width: 1100px) 640px, 92vw"
				fetchpriority="high"
			/>
		</div>
	</div>
</section>

<!-- Orientation : un parcours pour les agences, un pour les entreprises -->
<section class="section section--tight home-paths" aria-labelledby="paths-title">
	<div class="container">
		<header class="center-head center-head--tight">
			<SectionLabel label={homePaths.eyebrow} align="center" />
			<h2 class="t-h2" id="paths-title">
				<AccentTitle text={homePaths.title} accent={homePaths.accent} />
			</h2>
		</header>
		<ul class="paths" role="list">
			{#each homePaths.paths as p (p.id)}
				<!-- Le li porte l'apparition au défilement (revealPage), la carte porte le survol.
				     Repère de prix et liens toujours visibles (audit du 16/11/2026) -->
				<li class="paths__item">
					<div class="path">
						<div class="path__stage">
							<div class="path__media">
								<enhanced:img
									class="path__img"
									src={pathVisuals[p.id].src}
									alt={pathVisuals[p.id].alt}
									sizes="(min-width: 1100px) 220px, (min-width: 768px) 240px, 200px"
									loading="lazy"
								/>
							</div>
						</div>
						<div class="path__body">
							<h3 class="path__title">{p.title}</h3>
							<p>{p.text}</p>
							<!-- Repère de prix en « ticket » : montant à gauche, précision à droite après
							     la perforation ; passe en Bleu nuit au survol de la carte -->
							<div class="path__ticket">
								<PriceTag
									label={p.priceTag.label}
									value={p.priceTag.value}
									unit={'unit' in p.priceTag ? p.priceTag.unit : undefined}
								/>
								<p class="path__note">{p.priceTag.note}</p>
							</div>
							<p class="path__links">
								{#each p.links as l (l.href)}
									<a class="link-arrow" href={l.href}>{l.label} <Icon name="arrow-right" /></a>
								{/each}
							</p>
						</div>
					</div>
				</li>
			{/each}
		</ul>
		<p class="paths-vat">{vatNotice}</p>
	</div>
</section>

<!-- Expertises -->
<section class="section home-expertise" aria-labelledby="univers-title">
	<div class="container">
		<header class="center-head">
			<SectionLabel label={servicesIntro.eyebrow} align="center" />
			<h2 class="t-h2" id="univers-title">
				<AccentTitle text={servicesIntro.title} accent={servicesIntro.accent} />
			</h2>
			<p>{servicesIntro.lede}</p>
		</header>
		<ExpertiseCards />
	</div>
</section>

<!-- Forfaits : accès direct aux offres (maillage interne) -->
<section class="section section--tight home-offers" aria-labelledby="forfaits-title">
	<div class="container">
		<OfferShortcuts only={homeOffers} />
	</div>
</section>

<!-- Process -->
<section class="section section--tight home-process" aria-labelledby="process-title">
	<div class="container">
		<ProcessRow />
	</div>
</section>

<!-- Réalisations -->
<section class="section home-projects" aria-labelledby="projets-title">
	<div class="container">
		<header class="split-head">
			<div class="split-head__text">
				<SectionLabel label={realisationsIntro.eyebrow} />
				<h2 class="t-h2" id="projets-title">{realisationsIntro.titleStart} <DoneWord /></h2>
				<p>{realisationsIntro.lede}</p>
			</div>
			<Button href="/contact/" variant="secondary" icon="arrow-right"
				>Un autre projet en tête ?</Button
			>
		</header>
		<!-- Projets WordPress et WooCommerce menés pour des clients (Ciné Délices, projet de
		     formation, et Alternativ' Uniforme restent sur /realisations/) -->
		<ProjectGrid only={homeProjects} />
		<p class="home-projects__all">
			<a class="link-arrow" href="/realisations/"
				>Toutes les réalisations <Icon name="arrow-right" /></a
			>
		</p>
	</div>
</section>

<!-- Avis Malt réels, cités à l'identique -->
<section class="section section--tight home-reviews" aria-labelledby="avis-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label={reviewsIntro.eyebrow} />
			<h2 class="t-h2" id="avis-title">
				<AccentTitle text={reviewsIntro.title} accent={reviewsIntro.accent} />
			</h2>
			<p class="home-reviews__note">
				Note de {maltRating.score} sur {maltRating.count} avis publiés sur le profil Malt de Sébastien
				Maurice.
			</p>
		</header>
		<ReviewList />
		<!-- Lien vers À propos (maillage interne, validé le 24/10/2026) -->
		<p class="home-reviews__links">
			<LinkArrow href={links.malt}>{reviewsIntro.more}</LinkArrow>
			<LinkArrow href="/apropos/">Qui est derrière Dev'n Done</LinkArrow>
		</p>
	</div>
</section>

<!-- Contact -->
<ContactBlock id="contact" />

<style>
	/* ---------------------------------------------------------------- Hero */
	.hero {
		padding-block: clamp(var(--space-6), 4vw, var(--space-8))
			clamp(var(--space-7), 5vw, var(--space-9));
		overflow: clip;
	}
	.hero__grid {
		display: grid;
		gap: var(--space-6);
		align-items: center;
	}
	@media (min-width: 1100px) {
		.hero__grid {
			grid-template-columns: minmax(0, 46fr) minmax(0, 54fr);
			gap: var(--space-5);
		}
	}
	.hero__text {
		display: grid;
		gap: var(--space-5);
		justify-items: start;
	}
	.hero__title {
		margin: var(--space-4) 0 var(--space-2);
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(2.75rem, 2rem + 3.6vw, 5.25rem);
		line-height: 0.98;
		letter-spacing: -0.005em;
		color: var(--text);
		text-wrap: balance;
	}
	/* Surtitre du H1 : le métier, en Plus Jakarta capitales, précédé d'un trait orange */
	.hero__kicker {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
		font-family: var(--font-ui);
		font-size: clamp(0.8125rem, 0.75rem + 0.25vw, 0.9375rem);
		font-weight: var(--weight-extrabold);
		letter-spacing: var(--tracking-label);
		line-height: 1.3;
		text-transform: uppercase;
		text-wrap: balance;
	}
	.hero__kicker::before {
		content: '';
		flex: none;
		width: 2rem;
		height: 3px;
		border-radius: 2px;
		background: var(--accent-deco);
	}
	/* Trois lignes fixes : « être » et DONE restent ensemble sur la dernière */
	.hero__line {
		display: block;
		white-space: nowrap;
	}
	.hero__lede {
		max-width: 34rem;
		margin: 0;
		font-size: var(--text-body-lg);
		color: var(--text-muted);
	}
	.hero__keywords {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-1) 0;
		margin: 0;
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
	}
	.hero__slash {
		padding-inline: var(--space-3);
		color: var(--accent-deco);
		font-weight: var(--weight-bold);
	}
	.hero__ctas {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-top: var(--space-2);
	}
	.hero__ctas :global(.btn .icon:first-child) {
		width: 20px;
		height: 20px;
	}
	.hero__visual {
		position: relative;
		justify-self: center;
		width: min(100%, 680px);
	}
	@media (min-width: 1100px) {
		.hero__visual {
			margin-right: calc(-1 * var(--space-6));
		}
	}
	/* Image entière, sans fondu ni contour */
	.hero__visual :global(img) {
		display: block;
		width: 100%;
		height: auto;
	}

	/* Entrée du hero (au chargement, CSS seul) : note manuscrite, titre ligne par ligne, mot DONE
	   qui apparaît d'un coup, mots-clés et boutons, puis le visuel qui monte et flotte doucement */
	.hero__text > :global(.hand-note) {
		animation: hero-rise 640ms var(--ease-out) 80ms both;
	}
	.hero__kicker {
		animation: hero-rise 640ms var(--ease-out) 140ms both;
	}
	.hero__line {
		animation: hero-line 760ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
	}
	.hero__line:nth-child(2) {
		animation-delay: 200ms;
	}
	.hero__line:nth-child(3) {
		animation-delay: 330ms;
	}
	.hero__line:nth-child(4) {
		animation-delay: 460ms;
	}
	.hero__line :global(.done) {
		display: inline-block;
		animation: hero-pop 720ms cubic-bezier(0.34, 1.56, 0.64, 1) 900ms both;
	}
	.hero__lede,
	.hero__keywords {
		animation: hero-rise 640ms var(--ease-out) 760ms both;
	}
	.hero__ctas {
		animation: hero-rise 640ms var(--ease-out) 880ms both;
	}
	.hero__visual {
		animation: hero-visual 1000ms var(--ease-out) 300ms both;
	}
	.hero__visual :global(img) {
		animation: hero-float 6s ease-in-out 1.6s infinite;
	}
	@keyframes hero-rise {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
	}
	@keyframes hero-line {
		from {
			opacity: 0;
			transform: translateY(0.6em);
			filter: blur(6px);
		}
	}
	@keyframes hero-pop {
		0% {
			opacity: 0;
			transform: scale(0.5) rotate(-8deg);
		}
		100% {
			opacity: 1;
			transform: none;
		}
	}
	@keyframes hero-visual {
		from {
			opacity: 0;
			transform: translateY(48px) scale(0.94);
		}
	}
	@keyframes hero-float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-12px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero__text > :global(.hand-note),
		.hero__kicker,
		.hero__line,
		.hero__line :global(.done),
		.hero__lede,
		.hero__keywords,
		.hero__ctas,
		.hero__visual,
		.hero__visual :global(img) {
			animation: none;
		}
	}

	/* ------------------------------------------------------- En-têtes de section */
	.center-head {
		display: grid;
		justify-items: center;
		gap: var(--space-3);
		max-width: 64rem;
		margin: 0 auto clamp(var(--space-7), 5vw, var(--space-8));
		text-align: center;
	}
	.center-head p {
		max-width: 40rem;
		margin: 0;
		color: var(--text-muted);
	}
	.split-head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-5);
		margin-bottom: var(--space-7);
	}
	.split-head__text {
		display: grid;
		gap: var(--space-3);
		justify-items: start;
	}
	.split-head__text p {
		margin: 0;
		color: var(--text-muted);
	}

	.center-head--tight {
		margin-bottom: var(--space-7);
	}

	/* ----------------------------------------------------------- Orientation */
	.home-paths {
		border-top: 1px solid var(--line);
	}
	.paths {
		display: grid;
		gap: var(--col-gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	/* Deux cartes côte à côte en grand écran ; une par ligne en dessous, pour garder
	   la mascotte à gauche du texte dès la tablette */
	@media (min-width: 1100px) {
		.paths {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	/* Cartes de même hauteur sur une ligne */
	.paths__item {
		display: grid;
	}
	.path {
		position: relative;
		display: grid;
		gap: var(--space-4);
		align-items: center;
		padding: clamp(var(--space-5), 3vw, var(--space-6));
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		overflow: hidden;
		transition:
			transform var(--duration-reveal) var(--ease-out),
			box-shadow var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}
	/* Filet orange qui se dessine en haut de la carte au survol */
	.path::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 4px;
		background: var(--action);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--duration-scene) var(--ease-out);
	}
	/* Mascotte à gauche, contenu à droite ; empilés sur téléphone */
	@media (min-width: 600px) {
		.path {
			grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
			gap: var(--space-5);
		}
	}
	.path__stage {
		display: grid;
		width: 100%;
		max-width: 15rem;
		justify-self: center;
	}
	/* Cadre de l'image : arrondi léger (adoucit le décor coupé au bord) */
	.path__media {
		overflow: hidden;
		border-radius: var(--radius-md);
	}
	.path__media :global(img) {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1;
		transition: transform var(--duration-scene) var(--ease-out);
	}
	.path__body {
		display: grid;
		gap: var(--space-3);
		align-content: center;
	}
	.path__title {
		margin: 0;
		font-size: var(--text-h3);
	}
	.path p {
		margin: 0;
		color: var(--text-muted);
	}

	/* Repère de prix en « ticket » (audit du 16/11/2026) : fond bleu océan très clair, encoches
	   découpées sur les côtés, perforation en pointillés entre le montant et sa précision */
	.path__ticket {
		--notch: 0.6rem;
		justify-self: start;
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		gap: var(--space-4);
		max-width: 100%;
		margin-top: var(--space-1);
		padding: var(--space-3) var(--space-5);
		background: var(--tag-bg);
		border-radius: var(--radius-md);
		mask:
			radial-gradient(circle var(--notch) at 0 50%, transparent 98%, black) left / 51% 100%
				no-repeat,
			radial-gradient(circle var(--notch) at 100% 50%, transparent 98%, black) right / 51% 100%
				no-repeat;
		transform-origin: left center;
		transition:
			background-color var(--duration-reveal) var(--ease-out),
			transform var(--duration-reveal) var(--ease-out);
	}
	/* Libellé du prix sur une ligne : la précision prend la place restante */
	.path__ticket :global(.price__label) {
		white-space: nowrap;
	}
	.path .path__note {
		align-self: stretch;
		display: flex;
		align-items: center;
		max-width: 10rem;
		padding-left: var(--space-4);
		border-left: 2px dashed color-mix(in srgb, var(--tag-text) 40%, transparent);
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
		line-height: var(--leading-tight);
		color: var(--text);
		transition:
			color var(--duration-reveal) var(--ease-out),
			border-color var(--duration-reveal) var(--ease-out);
	}

	/* Téléphone : la précision passe sous le montant, perforation horizontale */
	@media (max-width: 479px) {
		.path__ticket {
			justify-self: stretch;
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-2);
		}
		.path .path__note {
			max-width: none;
			padding: var(--space-2) 0 0;
			border-left: 0;
			border-top: 2px dashed color-mix(in srgb, var(--tag-text) 40%, transparent);
		}
	}

	.path .path__links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-5);
		margin-top: var(--space-2);
	}
	.path .path__links :global(.icon) {
		transition: transform var(--duration-base) var(--ease-out);
	}

	/* Survol et focus clavier : la carte se soulève, le filet orange se dessine, la mascotte
	   s'approche et le ticket passe en Bleu nuit, montant en orange, légèrement détaché. Tout le
	   contenu reste visible au repos. */
	@media (hover: hover) {
		.path:is(:hover, :focus-within) {
			transform: translateY(-6px);
			border-color: var(--action);
			box-shadow: var(--shadow-card-hover);
		}
		.path:is(:hover, :focus-within)::before {
			transform: scaleX(1);
		}
		.path:is(:hover, :focus-within) .path__media :global(img) {
			transform: scale(1.06) rotate(-1.5deg);
		}
		.path:is(:hover, :focus-within) .path__ticket {
			--price-color: var(--action);
			--price-muted: color-mix(in srgb, var(--bg) 72%, var(--text));
			background: var(--text);
			transform: rotate(-2deg);
		}
		.path:is(:hover, :focus-within) .path__note {
			color: var(--bg);
			border-left-color: color-mix(in srgb, var(--bg) 40%, transparent);
		}
		.path:is(:hover, :focus-within) .path__links :global(.icon) {
			transform: translateX(4px);
		}
	}

	/* Apparition : la carte monte (revealPage, sur le li), puis la mascotte arrive par la gauche
	   et le texte par la droite, avec un léger décalage */
	.path__stage,
	.path__body {
		transition:
			opacity var(--duration-scene) var(--ease-out) 120ms,
			transform var(--duration-scene) var(--ease-out) 120ms;
	}
	/* Deuxième carte : même décalage que sa cascade d'apparition (+90 ms) */
	.paths__item:nth-child(2) :is(.path__stage, .path__body) {
		transition-delay: 210ms;
	}
	/* data-reveal est posé par JavaScript : sélecteur global pour que Svelte ne l'élimine pas */
	.paths__item:global([data-reveal='pending']) .path__stage {
		opacity: 0;
		transform: translateX(-32px) scale(0.92);
	}
	.paths__item:global([data-reveal='pending']) .path__body {
		opacity: 0;
		transform: translateX(32px);
	}
	/* Mouvement réduit : pas de déplacement, seules l'opacité et les couleurs changent */
	@media (prefers-reduced-motion: reduce) {
		.path,
		.path__stage,
		.path__body,
		.path__ticket,
		.path__media :global(img),
		.path .path__links :global(.icon) {
			transform: none !important;
		}
	}

	/* ------------------------------------------------------------- Sections */
	.home-expertise {
		padding-top: var(--space-6);
	}
	/* Fond Ivoire : les cartes blanches du process s'en détachent */
	.home-process {
		border-block: 1px solid var(--line);
	}
	.paths-vat {
		margin: var(--space-4) 0 0;
		font-size: var(--text-body-sm);
		color: var(--text-muted);
		text-align: center;
	}
	.home-reviews {
		border-top: 1px solid var(--line);
	}
	.home-reviews__links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-6);
		margin: 0;
	}
	.home-reviews__note {
		margin: 0;
		color: var(--text-muted);
	}
	.home-projects__all {
		margin: var(--space-6) 0 0;
		text-align: right;
	}
</style>
