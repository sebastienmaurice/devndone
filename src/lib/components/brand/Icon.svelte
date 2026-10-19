<!--
	Icônes du site : bibliothèque Lucide (https://lucide.dev, licence ISC), charte v1.2 (11.D).
	Même grammaire que la charte : grille 24 px, trait 2 px, extrémités arrondies, sans remplissage,
	currentColor. Compilées dans le build : aucune requête réseau. Décoratives par défaut.
	Pour ajouter une icône : l'importer depuis '@lucide/svelte/icons/<nom>' et l'inscrire ci-dessous.
-->
<script lang="ts" module>
	import type { Component } from 'svelte';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Bug from '@lucide/svelte/icons/bug';
	import CalendarDays from '@lucide/svelte/icons/calendar-days';
	import Check from '@lucide/svelte/icons/check';
	import Clock from '@lucide/svelte/icons/clock';
	import CodeXml from '@lucide/svelte/icons/code-xml';
	import Globe from '@lucide/svelte/icons/globe';
	import Info from '@lucide/svelte/icons/info';
	import Layers from '@lucide/svelte/icons/layers';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import Mail from '@lucide/svelte/icons/mail';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Menu from '@lucide/svelte/icons/menu';
	import MessageCircleMore from '@lucide/svelte/icons/message-circle-more';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Palette from '@lucide/svelte/icons/palette';
	import PenTool from '@lucide/svelte/icons/pen-tool';
	import Plus from '@lucide/svelte/icons/plus';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Search from '@lucide/svelte/icons/search';
	import Settings from '@lucide/svelte/icons/settings';
	import ShoppingCart from '@lucide/svelte/icons/shopping-cart';
	import Sparkles from '@lucide/svelte/icons/sparkles';
	import Terminal from '@lucide/svelte/icons/terminal';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import Workflow from '@lucide/svelte/icons/workflow';
	import X from '@lucide/svelte/icons/x';

	/** Noms du design system → composants Lucide */
	export const icons = {
		'arrow-right': ArrowRight,
		'arrow-up-right': ArrowUpRight,
		check: Check,
		close: X,
		plus: Plus,
		menu: Menu,
		info: Info,
		alert: TriangleAlert,
		code: CodeXml,
		terminal: Terminal,
		workflow: Workflow,
		site: Monitor,
		pen: PenTool,
		palette: Palette,
		layers: Layers,
		mail: Mail,
		calendar: CalendarDays,
		clock: Clock,
		'map-pin': MapPin,
		rocket: Rocket,
		bug: Bug,
		search: Search,
		sparkles: Sparkles,
		cart: ShoppingCart,
		globe: Globe,
		settings: Settings,
		message: MessageCircleMore,
		lightbulb: Lightbulb
	} satisfies Record<string, Component<Record<string, unknown>>>;

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

	const Glyph = $derived(icons[name]);
</script>

<Glyph
	class="icon {size === 'sm' ? 'icon--sm' : ''} {className}"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
	focusable="false"
/>
