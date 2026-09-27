<!--
	Icônes du design system (grille 24 px, trait 2 px, currentColor).
	Inline : aucune requête réseau, aucune bibliothèque. Décorative par défaut.
-->
<script lang="ts" module>
	export const icons = {
		'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
		'arrow-up-right': '<path d="M7 17L17 7M8 7h9v9"/>',
		check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
		close: '<path d="M6 6l12 12M18 6L6 18"/>',
		plus: '<path d="M12 5v14M5 12h14"/>',
		menu: '<path d="M4 8h16M4 16h11"/>',
		info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
		alert: '<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4M12 17h.01"/>',
		code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
		terminal: '<path d="M4 17l6-5-6-5M12 19h8"/>',
		workflow:
			'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8.5 6H12a3 3 0 013 3v.5M8.5 18H12a3 3 0 003-3v-.5"/>',
		site: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M3 8h18"/>',
		pen: '<path d="M4 20l4.5-1 10-10a2.1 2.1 0 00-3-3l-10 10z"/><path d="M13.5 7.5l3 3"/>',
		layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
		mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
		calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'
	} as const;

	export type IconName = keyof typeof icons;
</script>

<script lang="ts">
	type Props = {
		name: IconName;
		size?: 'sm' | 'lg';
		/** Renseigner uniquement si l'icône porte seule une information */
		label?: string;
		class?: string;
	};

	let { name, size = 'lg', label, class: className = '' }: Props = $props();
</script>

<svg
	class="icon {size === 'sm' ? 'icon--sm' : ''} {className}"
	viewBox="0 0 24 24"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
	focusable="false"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- tracés statiques définis ci-dessus -->
	{@html icons[name]}
</svg>
