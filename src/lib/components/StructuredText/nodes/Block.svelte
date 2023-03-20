<script lang="ts">
	import type { StructuredTextFragment$data } from '$houdini';
	import type { Block } from 'datocms-structured-text-utils';

	import ImageBlockRecord from '../blocks/ImageBlockRecord.svelte';

	export let block: StructuredTextFragment$data['blocks'][number] | null;

	export let node: Block;

	node;
</script>

{#if block?.__typename === 'ImageBlockRecord'}
	<ImageBlockRecord imageBlockRecord={block} />
{/if}
