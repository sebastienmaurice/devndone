<!--
	Bloc technique façon terminal. Chaque ligne est typée pour sa couleur :
	`command` (invite $ orange), `ok` (mint), `muted`, `kv` (clé: valeur) ou `plain`.
	Le bloc est décoratif pour les lecteurs d'écran : `label` le résume.
-->
<script lang="ts" module>
	export type TerminalLine =
		| { kind: 'command'; text: string }
		| { kind: 'ok' | 'muted' | 'plain'; text: string }
		| { kind: 'kv'; key: string; value: string; ok?: boolean };
</script>

<script lang="ts">
	type Props = { lines: readonly TerminalLine[]; label: string };

	let { lines, label }: Props = $props();

	const INDENT = '  ';
</script>

<!-- Dans un <pre>, chaque espace compte : ne pas laisser Prettier reformater. -->
<!-- prettier-ignore -->
<pre class="terminal" role="img" aria-label={label}>{#each lines as line, i (i)}<span class="line">{#if line.kind === 'command'}<span class="prompt">$</span>{' ' + line.text}{:else if line.kind === 'ok'}<span class="ok">{INDENT}✓</span>{' ' + line.text}{:else if line.kind === 'muted'}<span class="muted">{INDENT + line.text}</span>{:else if line.kind === 'kv'}{INDENT + line.key + ': '}<span class:ok={line.ok}>{line.value}</span>{:else}{INDENT + line.text}{/if}</span>{/each}</pre>

<style>
	.line {
		display: block;
	}
</style>
