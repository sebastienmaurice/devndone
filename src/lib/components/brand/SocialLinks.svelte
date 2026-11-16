<!--
	Réseaux sociaux de Dev'n Done (content/studio.ts, `socials`) : Facebook, Instagram, TikTok et le
	LinkedIn de Sébastien. Simples liens sortants : aucun widget ni script tiers chargé (le site ne
	dépose aucun cookie). Pictogrammes en SVG dans le code, trait de 2 px comme les icônes Lucide,
	couleur du texte ; au survol, pastille orange.
	`labels` : affiche le nom du réseau à côté du pictogramme.
-->
<script lang="ts">
	import { socials, type Social } from '$lib/content/studio';

	let { labels = false }: { labels?: boolean } = $props();

	const shown: readonly Social[] = socials;
</script>

<ul class="socials" class:socials--labels={labels} role="list">
	{#each shown as s (s.id)}
		<li>
			<a
				class="social"
				href={s.href}
				target="_blank"
				rel="noopener"
				aria-label="{s.label} : {s.account} (nouvel onglet)"
				title="{s.label} : {s.account}"
			>
				<svg
					class="social__icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					{#if s.id === 'facebook'}
						<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
					{:else if s.id === 'instagram'}
						<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
						<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
						<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
					{:else if s.id === 'tiktok'}
						<path d="M9 12a4 4 0 1 0 4 4V2a5 5 0 0 0 5 5" />
					{:else}
						<path
							d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						/>
						<rect x="2" y="9" width="4" height="12" />
						<circle cx="4" cy="4" r="2" />
					{/if}
				</svg>
				{#if labels}<span class="social__label">{s.label}</span>{/if}
			</a>
		</li>
	{/each}
</ul>

<style>
	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.social {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		min-width: 2.75rem;
		height: 2.75rem;
		padding-inline: var(--space-3);
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		color: var(--text);
		text-decoration: none;
		font-size: var(--text-body-sm);
		font-weight: var(--weight-semibold);
		transition:
			background-color var(--duration-base) var(--ease-out),
			border-color var(--duration-base) var(--ease-out),
			color var(--duration-base) var(--ease-out),
			transform var(--duration-base) var(--ease-out);
	}
	.socials:not(.socials--labels) .social {
		padding-inline: 0;
	}
	.social__icon {
		flex: none;
		width: 1.25rem;
		height: 1.25rem;
	}
	.social:hover,
	.social:focus-visible {
		background: var(--action);
		border-color: var(--action);
		color: var(--on-action);
		transform: translateY(-2px);
	}
	@media (prefers-reduced-motion: reduce) {
		.social:hover,
		.social:focus-visible {
			transform: none;
		}
	}
</style>
