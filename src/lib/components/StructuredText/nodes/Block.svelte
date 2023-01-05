<script lang="ts">
	import ImageBlockRecord from '../blocks/ImageBlockRecord.svelte';

	export let block;

	$: ({ __typename } = block);

	$: component = __typename === 'ImageBlockRecord' ? ImageBlockRecord : null;
</script>

<svelte:component this={component} {block} />
