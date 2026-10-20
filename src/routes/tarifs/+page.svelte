<!--
	Tarifs (tous HT), textes et montants du site en ligne. La grille de maintenance est une grille
	de test (voir content/tarifs.ts) : elle n'est pas présentée comme définitive.
	En-tête : la mascotte présentant trois formules, à droite en grand écran.
-->
<script lang="ts">
	import { Seo } from '$lib/components';
	import SectionLabel from '$lib/components/brand/SectionLabel.svelte';
	import ContactBlock from '$lib/components/sections/ContactBlock.svelte';
	import MaintenancePlans from '$lib/components/sections/MaintenancePlans.svelte';
	import PackageGrid from '$lib/components/sections/PackageGrid.svelte';
	import PageIntro from '$lib/components/sections/PageIntro.svelte';
	import AccentTitle from '$lib/components/brand/AccentTitle.svelte';
	import { maintenanceIntro, packagesIntro } from '$lib/content/tarifs';
	import mascot from '$lib/assets/mascotte/mascotte-renard-tarifs-formules-abonnement.jpg?enhanced&w=1200;720;360';
</script>

<Seo
	title="Tarifs : sites WordPress en abonnement mensuel, audits et maintenance"
	path="/tarifs/"
	description="Sites WordPress en abonnement mensuel, création, hébergement et maintenance inclus : landing page, vitrine, refonte PME, boutique WooCommerce. Audits en paiement unique."
/>

<PageIntro
	label="Tarifs"
	heading={packagesIntro.title}
	accent={packagesIntro.accent}
	lede={packagesIntro.lede}
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

<section class="section section--tight" aria-label="Forfaits">
	<div class="container stack stack--lg">
		<PackageGrid headingLevel={2} />
		<p class="note">{packagesIntro.note}</p>
	</div>
</section>

<section class="section section--tight band" aria-labelledby="maintenance-title">
	<div class="container stack stack--lg">
		<header class="stack stack--sm">
			<SectionLabel label="Maintenance" />
			<h2 class="t-h2" id="maintenance-title">
				<AccentTitle text={maintenanceIntro.title} accent={maintenanceIntro.accent} />
			</h2>
			<p class="note">{maintenanceIntro.lede}</p>
		</header>
		<MaintenancePlans />
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
</style>
