<!--
	Appel au contact de fin de page (option A : Calendly et email, sans formulaire).
	`level={1}` sur la page Contact, où il sert de titre principal.
-->
<script lang="ts">
	import { contactIntro, links } from '$lib/content/studio';
	import Section from '../layout/Section.svelte';
	import SectionHead from '../layout/SectionHead.svelte';
	import SlashBand from '../brand/SlashBand.svelte';
	import Stroke from '../brand/Stroke.svelte';
	import Button from '../ui/Button.svelte';

	type Props = {
		level?: 1 | 2;
		surface?: 'night' | 'raised' | 'ivory' | 'orange';
		/** Liens LinkedIn et Malt en plus de Calendly et de l'email */
		full?: boolean;
		id?: string;
		/** Bande slash derrière le contenu (une par page au maximum) */
		band?: boolean;
	};

	let { level = 2, surface = 'raised', full = false, id, band = false }: Props = $props();
</script>

<Section {id} {surface} labelledby="contact-title">
	<!-- Bande affichée dès 1024 px seulement : en dessous, elle passerait derrière le texte -->
	{#if band}<div class="contact-band"><SlashBand right="8%" /></div>{/if}
	<SectionHead
		id="contact-title"
		{level}
		size={level === 1 ? 'display' : 'h1'}
		eyebrow={contactIntro.eyebrow}
		title="{contactIntro.title} Done."
		lede={contactIntro.lede}
	>
		{#snippet titleContent()}
			{contactIntro.title} <Stroke>Done<span class="t-dot">.</span></Stroke>
		{/snippet}
		<div class="cluster">
			<Button href={links.calendly} icon="arrow-up-right" size="lg">{contactIntro.cta}</Button>
			<Button href={links.email} variant="secondary" size="lg">{contactIntro.email}</Button>
			{#if full}
				<Button href={links.linkedin} variant="secondary" size="lg">LinkedIn</Button>
				<Button href={links.malt} variant="secondary" size="lg">Malt</Button>
			{/if}
		</div>
	</SectionHead>
</Section>

<style>
	@media (max-width: 1023px) {
		.contact-band {
			display: none;
		}
	}
</style>
