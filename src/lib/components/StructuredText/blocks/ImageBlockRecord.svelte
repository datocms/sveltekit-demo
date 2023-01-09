<script lang="ts">
	import { fragment, graphql, type ImageBlockRecordFragment } from '$houdini';

	import Image from '$lib/components/Image.svelte';

	export let imageBlockRecord: ImageBlockRecordFragment;

	$: imageBlockRecordFragment = fragment(
		imageBlockRecord,
		graphql(`
			fragment ImageBlockRecordFragment on ImageBlockRecord {
				... on ImageBlockRecord {
					__typename
					id
					image {
						responsiveImage(imgixParams: { fm: jpg, fit: crop, w: 2000, h: 1000 }) {
							base64
							src
							width
							height
							alt
							title
						}
					}
				}
			}
		`)
	);
</script>

{#if $imageBlockRecordFragment?.image?.responsiveImage}
	<Image data={$imageBlockRecordFragment.image.responsiveImage} />
{/if}
