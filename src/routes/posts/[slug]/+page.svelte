<script lang="ts">
	import type { PageData } from './$houdini';

	import Container from '$lib/components/Container.svelte';
	import Header from '$lib/components/Header.svelte';
	import PostHeader from '$lib/components/PostHeader.svelte';
	import MoreStories from '$lib/components/MoreStories.svelte';
	import SectionSeparator from '$lib/components/SectionSeparator.svelte';
	import PostBody from '$lib/components/PostBody.svelte';
	import Head from '$lib/components/Head.svelte';

	export let data: PageData;

	$: ({ PostContent } = data);
	$: ({ site, post, morePosts } = $PostContent.data);

	$: headTags = post.seo.concat(site.favicon);
</script>

<Head {headTags} />

<Container>
	<Header />

	<article>
		<PostHeader
			title={post.title}
			coverImage={post.coverImage}
			date={post.date}
			author={post.author}
		/>
		{#if post.content}
			<PostBody content={post.content} />
		{/if}
	</article>

	<SectionSeparator />

	{#if morePosts.length > 0}
		<MoreStories posts={morePosts} />
	{/if}
</Container>
