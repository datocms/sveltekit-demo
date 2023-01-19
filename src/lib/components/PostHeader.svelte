<script lang="ts">
	import type { AuthorFragment, ImageFragment } from '$houdini';

	import Avatar from './Avatar.svelte';
	import Date from './Date.svelte';
	import CoverImage from './CoverImage.svelte';
	import PostTitle from './PostTitle.svelte';

	export let title: string | null;
	export let coverImage: ImageFragment | null;
	export let date: string | null;
	export let author: AuthorFragment | null = null;
</script>

<PostTitle>{title}</PostTitle>

{#if author}
	<div class="hidden md:block md:mb-12">
		<Avatar {author} />
	</div>
{/if}

{#if coverImage}
	<div class="mb-8 md:mb-16 -mx-5 sm:mx-0">
		<CoverImage {title} {coverImage} />
	</div>
{/if}

<div class="max-w-2xl mx-auto">
	{#if author}
		<div class="block md:hidden mb-6">
			<Avatar {author} />
		</div>
	{/if}
	{#if date}
		<div class="mb-6 text-lg">
			<Date dateString={date} />
		</div>
	{/if}
</div>
