/**
 * Composants du design system DEV'n DONE.
 * import { Section, SectionHead, Button } from '$lib/components';
 */

// Mise en page
export { default as Section } from './layout/Section.svelte';
export { default as SectionHead } from './layout/SectionHead.svelte';
export { default as SiteHeader } from './layout/SiteHeader.svelte';
export { default as SiteFooter } from './layout/SiteFooter.svelte';

// Marque
export { default as Logo } from './brand/Logo.svelte';
export { default as Icon, type IconName } from './brand/Icon.svelte';
export { default as Eyebrow } from './brand/Eyebrow.svelte';
export { default as Tagline } from './brand/Tagline.svelte';
export { default as Stroke } from './brand/Stroke.svelte';
export { default as Rule } from './brand/Rule.svelte';
export { default as SlashBand } from './brand/SlashBand.svelte';

// Interface
export { default as Button } from './ui/Button.svelte';
export { default as LinkArrow } from './ui/LinkArrow.svelte';
export { default as Badge } from './ui/Badge.svelte';
export { default as Status, type StatusState } from './ui/Status.svelte';
export { default as Notice } from './ui/Notice.svelte';
export { default as Card } from './ui/Card.svelte';
export { default as Offer } from './ui/Offer.svelte';
export { default as PriceRow } from './ui/PriceRow.svelte';
export { default as FeatureList, type FeatureItem } from './ui/FeatureList.svelte';
export { default as Steps, type StepItem } from './ui/Steps.svelte';
export { default as Metric } from './ui/Metric.svelte';
export { default as Terminal, type TerminalLine } from './ui/Terminal.svelte';
export { default as SpecList } from './ui/SpecList.svelte';
export { default as Accordion, type AccordionItem } from './ui/Accordion.svelte';
export { default as Breadcrumb } from './ui/Breadcrumb.svelte';

// Formulaires
export { default as Field } from './form/Field.svelte';
export { default as Check } from './form/Check.svelte';
export { default as Honeypot } from './form/Honeypot.svelte';

// SEO
export { default as Seo } from './seo/Seo.svelte';
