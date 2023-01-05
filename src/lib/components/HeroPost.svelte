<script lang="ts">
	import type { ResponsiveImageFragment } from '$houdini';

	import Avatar from './Avatar.svelte';
	import Date from './Date.svelte';
	import CoverImage from './CoverImage.svelte';

	export let title: string | null | undefined = undefined;
	export let coverImage: { responsiveImage: ResponsiveImageFragment } | null | undefined =
		undefined;
	export let date: string | null | undefined = undefined;
	export let excerpt: string | null | undefined = undefined;
	export let author: Author | null | undefined = undefined;
	export let slug: string | null | undefined = undefined;
</script>

<section>
	<div class="mb-8 md:mb-16">
		<CoverImage {title} responsiveImage={coverImage.responsiveImage} {slug} />
	</div>
	<div class="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
		<div>
			<h3 class="mb-4 text-4xl lg:text-6xl leading-tight">
				<a href={`/posts/${slug}`} class="hover:underline">{title}</a>
			</h3>
			<div class="mb-4 md:mb-0 text-lg">
				<Date dateString={date} />
			</div>
		</div>
		<div>
			<p class="text-lg leading-relaxed mb-4">{excerpt}</p>
			<Avatar name={author.name} picture={author.picture} />
		</div>
	</div>
</section>
