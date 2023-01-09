<script lang="ts">
	import { fragment, graphql, StructuredTextFragment } from '$houdini';

	import Node from './StructuredText/Node.svelte';

	export let structuredText: StructuredTextFragment;

	$: structuredTextFragment = fragment(
		structuredText,
		graphql(`
			fragment StructuredTextFragment on PostModelContentField {
				value
				blocks {
					__typename
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
			}
		`)
	);

	$: node = $structuredTextFragment.value.document;
	$: blocks = $structuredTextFragment.blocks;
</script>

<Node {node} {blocks} />
