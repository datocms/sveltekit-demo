<script lang="ts">
	import type { StructuredText } from 'datocms-structured-text-utils';

	import Node from './StructuredText/Node.svelte';

	export let structuredText: StructuredText;

	$: node = structuredText.value.document;
	$: blocks = structuredText.blocks;
</script>

<Node {node} {blocks} />
