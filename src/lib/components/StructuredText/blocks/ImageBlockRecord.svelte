<script lang="ts">
	import type { StructuredTextFragment$data } from '$houdini';

	import { Image } from '@datocms/svelte';

	export let imageBlockRecord: StructuredTextFragment$data['blocks'][number];
</script>

{#if imageBlockRecord?.image?.responsiveImage}
	<Image data={imageBlockRecord.image.responsiveImage} />
{/if}
