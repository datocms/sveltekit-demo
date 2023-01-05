<script lang="ts">
	import type { Author, ResponsiveImage } from '$lib/server/types';

	import Avatar from './Avatar.svelte';
	import Date from './Date.svelte';
	import CoverImage from './CoverImage.svelte';
	import PostTitle from './PostTitle.svelte';

	export let title: string;
	export let coverImage: { responsiveImage: ResponsiveImage };
	export let date: string;
	export let author: Author;
</script>

<PostTitle>{title}</PostTitle>
<div class="hidden md:block md:mb-12">
	<Avatar name={author.name} picture={author.picture} />
</div>
<div class="mb-8 md:mb-16 -mx-5 sm:mx-0">
	<CoverImage {title} responsiveImage={coverImage.responsiveImage} />
</div>
<div class="max-w-2xl mx-auto">
	<div class="block md:hidden mb-6">
		<Avatar name={author.name} picture={author.picture} />
	</div>
	<div class="mb-6 text-lg">
		<Date dateString={date} />
	</div>
</div>
