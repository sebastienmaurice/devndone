<!--
	Contact, option A retenue pour le lancement : prise de rendez-vous Calendly, email,
	LinkedIn et Malt. Aucun formulaire, donc aucune donnée collectée par le site.
-->
<script lang="ts">
	import { Seo } from '$lib/components';
	import ContactCta from '$lib/components/sections/ContactCta.svelte';
</script>

<Seo
	title="Contact"
	path="/contact/"
	description="15 minutes pour faire le point sur votre projet et définir la bonne approche, sans engagement. Prise de rendez-vous en ligne ou par email."
/>

<ContactCta level={1} surface="night" full />
