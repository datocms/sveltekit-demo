<script lang="ts">
	import { fragment, graphql, type ResponsiveImageFragment } from '$houdini';

	import Image from './Image.svelte';

	export let responsiveImage: ResponsiveImageFragment;

	$: responsiveImageFragment = fragment(
		responsiveImage,
		graphql(`
			fragment ResponsiveImageFragment on ResponsiveImage {
				src
				width
				height
				alt
				title
			}
		`)
	);

	export let title: string;
	export let slug: string | null | undefined = undefined;
</script>

<div class="-mx-5 sm:mx-0">
	{#if slug}
		<a href={`/posts/${slug}`} aria-label={title}>
			<Image
				data={{
					...$responsiveImageFragment,
					alt: `Cover Image for ${title}`
				}}
				class="shadow-small hover:shadow-medium transition-shadow duration-200"
			/>
		</a>
	{:else}
		<Image
			data={{
				...$responsiveImageFragment,
				alt: `Cover Image for ${title}`
			}}
			class="shadow-small"
		/>
	{/if}
</div>
