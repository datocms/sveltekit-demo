<script lang="ts">
	import type { HomeContent$result, PostContent$result } from '$houdini';

	import PostPreview from './PostPreview.svelte';

	export let posts: HomeContent$result['allPosts'] | PostContent$result['morePosts'];
</script>

<section>
	<h2 class="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">More Stories</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
		{#each posts as post (post.slug)}
			<PostPreview
				title={post.title}
				coverImage={post.coverImage}
				date={post.date}
				author={post.author}
				slug={post.slug}
				excerpt={post.excerpt}
			/>
		{/each}
	</div>
</section>
