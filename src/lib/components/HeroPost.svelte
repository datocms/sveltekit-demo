<script lang="ts">
	import type { AuthorFragment, ImageFragment } from '$houdini';

	import Avatar from './Avatar.svelte';
	import Date from './Date.svelte';
	import CoverImage from './CoverImage.svelte';

	export let title: string | null = null;
	export let coverImage: ImageFragment | null = null;
	export let date: string | null = null;
	export let excerpt: string | null = null;
	export let author: AuthorFragment | null = null;
	export let slug: string | null = null;
</script>

<section>
	{#if coverImage}
		<div class="mb-8 md:mb-16">
			<CoverImage {title} {coverImage} {slug} />
		</div>
	{/if}
	<div class="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
		<div>
			<h3 class="mb-4 text-4xl lg:text-6xl leading-tight">
				<a href={`/posts/${slug}`} class="hover:underline">{title}</a>
			</h3>
			{#if date}
				<div class="mb-4 md:mb-0 text-lg">
					<Date dateString={date} />
				</div>
			{/if}
		</div>
		<div>
			<p class="text-lg leading-relaxed mb-4">{excerpt}</p>
			{#if author}
				<Avatar {author} />
			{/if}
		</div>
	</div>
</section>
