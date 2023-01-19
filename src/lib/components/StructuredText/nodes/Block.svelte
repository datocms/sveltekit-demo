<script lang="ts">
	import type { StructuredTextFragment$data } from '$houdini';

	import ImageBlockRecord from '../blocks/ImageBlockRecord.svelte';

	export let block: StructuredTextFragment$data['blocks'][number] | null;
</script>

{#if block?.__typename === 'ImageBlockRecord'}
	<ImageBlockRecord imageBlockRecord={block} />
{/if}
