<script lang="ts">
	import Avatar from './Avatar.svelte';
	import Date from './Date.svelte';
	import CoverImage from './CoverImage.svelte';

	export let title: string;
	export let coverImage;
	export let date: string;
	export let excerpt: string;
	export let author;
	export let slug: string;
</script>

<div>
	<div class="mb-5">
		<CoverImage {slug} {title} responsiveImage={coverImage.responsiveImage} />
	</div>
	<h3 class="text-3xl mb-3 leading-snug">
		<a href={`/posts/${slug}`} class="hover:underline">{title}</a>
	</h3>
	<div class="text-lg mb-4">
		<Date dateString={date} />
	</div>
	<p class="text-lg leading-relaxed mb-4">{excerpt}</p>
	<Avatar name={author.name} picture={author.picture} />
</div>
