<script lang="ts">
	export let headTags: { tag: string; content: string | null; attributes: object | null }[] = [];

	$: titleTag = headTags && headTags.find((t) => t.tag === 'title');
	$: metaTags = headTags ? headTags.filter((t) => t.tag === 'meta') : [];
	$: linkTags = headTags ? headTags.filter((t) => t.tag === 'link') : [];
</script>

<svelte:head>
	{#if titleTag}
		<title>{titleTag.content}</title>
	{/if}

	{#each metaTags as metaTag}
		<meta {...metaTag.attributes} />
	{/each}

	{#each linkTags as linkTag}
		<link {...linkTag.attributes} />
	{/each}
</svelte:head>
