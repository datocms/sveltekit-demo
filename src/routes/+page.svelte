<script lang="ts">
	import type { PageData } from './$houdini';

	import Container from '$lib/components/Container.svelte';
	import Intro from '$lib/components/Intro.svelte';
	import HeroPost from '$lib/components/HeroPost.svelte';
	import MoreStories from '$lib/components/MoreStories.svelte';
	import Head from '$lib/components/Head.svelte';

	export let data: PageData;

	$: ({ HomeContent } = data);
	$: ({ allPosts, site, blog } = $HomeContent.data || {
		allPosts: [],
		site: null,
		blog: null
	});

	$: heroPost = allPosts[0];
	$: morePosts = allPosts.slice(1);
	$: headTags = blog && site ? blog.seo.concat(site.favicon) : [];
</script>

<Head {headTags} />

<Container>
	<Intro />

	{#if heroPost}
		<HeroPost
			title={heroPost.title}
			coverImage={heroPost.coverImage}
			date={heroPost.date}
			author={heroPost.author}
			slug={heroPost.slug}
			excerpt={heroPost.excerpt}
		/>
	{/if}

	{#if morePosts.length > 0}
		<MoreStories posts={morePosts} />
	{/if}
</Container>
