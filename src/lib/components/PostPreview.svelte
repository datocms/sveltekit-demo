<script lang="ts">
	import type { AuthorFragment, ImageFragment } from '$houdini';

	import Avatar from './Avatar.svelte';
	import Date from './Date.svelte';
	import CoverImage from './CoverImage.svelte';

	export let title: string | null;
	export let coverImage: ImageFragment | null = null;
	export let date: string | null;
	export let excerpt: string | null;
	export let author: AuthorFragment | null = null;
	export let slug: string | null;
</script>

<div>
	{#if coverImage}
		<div class="mb-5">
			<CoverImage {slug} {title} {coverImage} />
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
	{#if author}
		<Avatar {author} />
	{/if}
</div>
