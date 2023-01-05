<script lang="ts">
	import type { PostContent$result } from '$houdini';
	
	import ImageBlockRecord from '../blocks/ImageBlockRecord.svelte';

	export let block: NonNullable<NonNullable<NonNullable<PostContent$result["post"]>["content"]>["blocks"]>[number];

	$: ({ __typename } = block);

	$: component = __typename === 'ImageBlockRecord' ? ImageBlockRecord : null;
</script>

<svelte:component this={component} {block} />
