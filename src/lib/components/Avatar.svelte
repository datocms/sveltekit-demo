<script lang="ts">
	import { AuthorFragment, fragment, graphql } from '$houdini';

	import { Image } from "@datocms/svelte";

	export let author: AuthorFragment | null = null;

	$: authorFragment = fragment(
		author,
		graphql(`
			fragment AuthorFragment on AuthorRecord {
				name
				picture {
					responsiveImage(imgixParams: { fm: jpg, fit: crop, w: 100, h: 100, sat: -100 }) {
						base64
						src
						width
						height
						alt
						title
					}
				}
			}
		`)
	);

	$: name = $authorFragment?.name;
	$: picture = $authorFragment?.picture;
</script>

<div class="flex items-center">
	{#if picture?.responsiveImage}
		<div class="w-12 h-12 mr-4">
			<Image alt={name} data={picture.responsiveImage} class="rounded-full" />
		</div>
	{/if}
	<div class="text-xl font-bold">{name}</div>
</div>
