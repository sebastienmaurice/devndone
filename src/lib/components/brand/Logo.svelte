<!--
	Logo officiel : toujours le fichier SVG de marque (static/brand), jamais du texte.
	Les dimensions intrinsèques évitent tout décalage de mise en page (CLS).
-->
<script lang="ts">
	type Props = {
		variant?: 'horizontal' | 'compact';
		tone?: 'ivory' | 'night';
		/** Hauteur affichée en px */
		height?: number;
		alt?: string;
		class?: string;
	};

	let {
		variant = 'horizontal',
		tone = 'ivory',
		height,
		alt = "Dev'n Done",
		class: className = ''
	}: Props = $props();

	const files = {
		horizontal: { w: 1200, h: 250 },
		compact: { w: 606, h: 423 }
	} as const;

	const size = $derived(files[variant]);
	const src = $derived(`/brand/dev-n-done-logo-${variant}-${tone}.svg`);
	const displayHeight = $derived(height ?? (variant === 'horizontal' ? 42 : 44));
</script>

<img
	class={className}
	{src}
	{alt}
	width={size.w}
	height={size.h}
	style:height="{displayHeight}px"
	style:width="auto"
	decoding="async"
/>
