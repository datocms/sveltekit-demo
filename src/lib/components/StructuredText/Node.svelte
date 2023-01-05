<script lang="ts">
	import {
		isBlock,
		isBlockquote,
		isHeading,
		isLink,
		isList,
		isListItem,
		isParagraph,
		isRoot,
		isSpan,
		type Node
	} from 'datocms-structured-text-utils';

	import Paragraph from './nodes/Paragraph.svelte';
	import Root from './nodes/Root.svelte';
	import Span from './nodes/Span.svelte';
	import Link from './nodes/Link.svelte';
	import List from './nodes/List.svelte';
	import Heading from './nodes/Heading.svelte';
	import Blockquote from './nodes/Blockquote.svelte';
	import Block from './nodes/Block.svelte';
	import ListItem from './nodes/ListItem.svelte';

	export let node: Node;
	export let blocks;

	$: block = isBlock(node) ? (blocks || []).find(({ id }) => id === node.item) : null;
</script>

<!-- Typescript doesn't infer the relationship between the component and `node` prop type.
     So,  -->
{#if isRoot(node)}
	<Root>
		{#each node.children as child}
			<svelte:self node={child} {blocks} />
		{/each}
	</Root>
{:else if isParagraph(node)}
	<Paragraph {node}>
		{#each node.children as child}
			<svelte:self node={child} {blocks} />
		{/each}
	</Paragraph>
{:else if isLink(node)}
	<Link {node}>
		{#each node.children as child}
			<svelte:self node={child} {blocks} />
		{/each}
	</Link>
{:else if isList(node)}
	<List {node}>
		{#each node.children as child}
			<svelte:self node={child} {blocks} />
		{/each}
	</List>
{:else if isListItem(node)}
	<ListItem {node}>
		{#each node.children as child}
			<svelte:self node={child} {blocks} />
		{/each}
	</ListItem>
{:else if isHeading(node)}
	<Heading {node}>
		{#each node.children as child}
			<svelte:self node={child} {blocks} />
		{/each}
	</Heading>
{:else if isBlockquote(node)}
	<Blockquote {node}>
		{#each node.children as child}
			<svelte:self node={child} {blocks} />
		{/each}
	</Blockquote>
{:else if isBlock(node)}
	<Block {block} />
{:else if isSpan(node)}
	<Span {node} />
{/if}
