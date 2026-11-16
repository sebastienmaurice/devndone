/**
 * Données structurées réutilisables (schema.org, sérialisées en JSON-LD par le composant Seo).
 * Audit SEO et GEO du 16/11/2026 : les questions fréquentes affichées sur la page sont décrites
 * telles quelles, sans texte ajouté. Google n'affiche plus ces extraits enrichis que pour certains
 * sites, mais le balisage aide les moteurs et les assistants à relier questions et réponses.
 */
export type FaqItem = { question: string; answer: string };

/** FAQPage à partir des questions et réponses affichées dans l'accordéon de la page */
export function faqPageLd(items: readonly FaqItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((f) => ({
			'@type': 'Question',
			name: f.question,
			acceptedAnswer: { '@type': 'Answer', text: f.answer }
		}))
	};
}
