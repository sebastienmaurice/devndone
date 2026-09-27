<!--
	Prérendue en build/404/index.html. Apache la sert pour toute URL inconnue
	(ErrorDocument dans static/.htaccess), avec un vrai code HTTP 404.
-->
<script lang="ts">
	import NotFound from '$lib/components/NotFound.svelte';
</script>

<NotFound />
