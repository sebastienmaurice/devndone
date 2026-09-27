import type { Action } from 'svelte/action';

/**
 * Apparition au défilement (+12 px, 480 ms, ease-out — tokens du design system).
 *
 * <div use:reveal> … </div>   ·   <li use:reveal={{ delay: 60 }}> … </li>
 *
 * - Le contenu est visible dans le HTML prérendu : sans JavaScript, rien n'est masqué.
 * - Un élément déjà à l'écran au montage n'est jamais masqué (pas de flash).
 * - Désactivé si l'utilisateur a demandé à réduire les animations.
 */
export const reveal: Action<HTMLElement, { delay?: number } | undefined> = (node, options) => {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (node.getBoundingClientRect().top < window.innerHeight) return;

	node.dataset.reveal = 'pending';
	if (options?.delay) node.style.transitionDelay = `${options.delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			if (!entries.some((e) => e.isIntersecting)) return;
			node.dataset.reveal = 'in';
			observer.disconnect();
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
	);
	observer.observe(node);

	return {
		destroy: () => observer.disconnect()
	};
};
