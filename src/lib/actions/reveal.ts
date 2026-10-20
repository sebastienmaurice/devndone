import type { Action } from 'svelte/action';

/**
 * Apparition au défilement (+24 px, 480 ms, ease-out — tokens du design system).
 *
 * <div use:reveal> … </div>   ·   <li use:reveal={{ delay: 60 }}> … </li>
 *
 * - Le contenu est visible dans le HTML prérendu : sans JavaScript, rien n'est masqué.
 * - Un élément déjà à l'écran au montage n'est jamais masqué (pas de flash).
 * - Désactivé si l'utilisateur a demandé à réduire les animations.
 */
export const reveal: Action<HTMLElement, { delay?: number } | undefined> = (node, options) => {
	const observer = watch(node, options?.delay);
	return {
		destroy: () => observer?.disconnect()
	};
};

/** Masque un élément hors écran et le révèle à son entrée dans la fenêtre */
function watch(node: HTMLElement, delay = 0): IntersectionObserver | undefined {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (node.getBoundingClientRect().top < window.innerHeight) return;

	node.dataset.reveal = 'pending';
	if (delay) node.style.transitionDelay = `${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			if (!entries.some((e) => e.isIntersecting)) return;
			node.dataset.reveal = 'in';
			observer.disconnect();
			// Le délai ne sert qu'à l'apparition : le survol des cartes reste immédiat
			if (delay) setTimeout(() => (node.style.transitionDelay = ''), delay + 600);
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
	);
	observer.observe(node);
	return observer;
}

/**
 * Blocs révélés automatiquement dans les sections d'une page (hors première section, qui a sa
 * propre animation d'entrée) : titres, surtitres, textes, cartes de liste (en cascade), visuels,
 * formulaires, encarts. Un bloc contenu dans un autre bloc révélé n'est pas traité deux fois.
 */
const BLOCKS = [
	'.section-label',
	'h2',
	'header',
	'p',
	'ul[role="list"] > li',
	'ol > li',
	'figure',
	'form',
	'aside',
	'.contact',
	'[class*="__visual"]'
].join(', ');

/** Révèle les blocs de `root` ; renvoie une fonction d'arrêt (changement de page) */
export function revealPage(root: HTMLElement): () => void {
	const sections = [...root.querySelectorAll<HTMLElement>(':scope > section')].slice(1);
	const picked: HTMLElement[] = [];
	for (const section of sections) {
		for (const el of section.querySelectorAll<HTMLElement>(BLOCKS)) {
			if (picked.some((p) => p.contains(el))) continue;
			picked.push(el);
		}
	}
	const observers = picked.map((el) => {
		// Cartes d'une même liste : apparition en cascade (6 au plus, puis même délai)
		const index = el.matches('li') ? [...el.parentElement!.children].indexOf(el) : 0;
		return watch(el, Math.min(index, 5) * 90);
	});
	return () => observers.forEach((o) => o?.disconnect());
}
