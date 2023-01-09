<script lang="ts">
	import type { ImageBlockRecordFragment$data } from '$houdini';
	
	import ImageBlockRecord from '../blocks/ImageBlockRecord.svelte';

	export let block: ImageBlockRecordFragment$data;

	$: ({ __typename } = block);

	$: component = __typename === 'ImageBlockRecord' ? ImageBlockRecord : null;
</script>

<svelte:component this={component} imageBlockRecord={block} />
