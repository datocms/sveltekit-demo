<script lang="ts">
	import type { HomeContent$result, ResponsiveImageFragment } from '$houdini';

	import Avatar from './Avatar.svelte';
	import Date from './Date.svelte';
	import CoverImage from './CoverImage.svelte';

	export let title: string | null;
	export let coverImage: { responsiveImage: ResponsiveImageFragment | null } | null;
	export let date: string | null;
	export let excerpt: string | null;
	export let author: HomeContent$result['allPosts'][number]['author'] | null = null;
	export let slug: string | null;
</script>

<div>
	{#if coverImage && coverImage.responsiveImage}
		<div class="mb-5">
			<CoverImage {slug} {title} responsiveImage={coverImage.responsiveImage} />
		</div>
	{/if}
	<h3 class="text-3xl mb-3 leading-snug">
		<a href={`/posts/${slug}`} class="hover:underline">{title}</a>
	</h3>
	{#if date}
		<div class="text-lg mb-4">
			<Date dateString={date} />
		</div>
	{/if}
	<p class="text-lg leading-relaxed mb-4">{excerpt}</p>
	{#if author && author.name && author.picture}
		<Avatar name={author.name} picture={author.picture} />
	{/if}
</div>
