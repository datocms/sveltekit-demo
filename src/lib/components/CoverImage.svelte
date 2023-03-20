<script lang="ts">
	import { fragment, graphql, ImageFragment } from '$houdini';

	import { Image } from '@datocms/svelte';

	export let coverImage: ImageFragment;
	export let title: string | null = null;
	export let slug: string | null = null;

	$: coverImageFragment = fragment(
		coverImage,
		graphql(`
			fragment ImageFragment on FileField {
				responsiveImage(imgixParams: { fm: jpg, fit: crop, w: 2000, h: 1000 }) {
					base64
					src
					width
					height
					alt
					title
				}
			}
		`)
	);
</script>

<div class="-mx-5 sm:mx-0">
	{#if slug}
		<a href={`/posts/${slug}`} aria-label={title}>
			<Image
				data={{
					...$coverImageFragment.responsiveImage,
					alt: `Cover Image for ${title}`
				}}
				class="shadow-small hover:shadow-medium transition-shadow duration-200"
			/>
		</a>
	{:else}
		<Image
			data={{
				...$coverImageFragment.responsiveImage,
				alt: `Cover Image for ${title}`
			}}
			class="shadow-small"
		/>
	{/if}
</div>
