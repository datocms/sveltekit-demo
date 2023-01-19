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

	import type { StructuredTextFragment$data } from '$houdini';

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
	export let blocks: StructuredTextFragment$data['blocks'];

	$: block =
		(isBlock(node) && (blocks || []).find(({ id }) => isBlock(node) && id === node.item)) || null;
</script>

<!-- Typescript doesn't infer the relationship between the component and `node` prop type.
     So a list of `if`s seems to be a good option. -->
{#if isRoot(node)}
	<Root>
		{#each node.children as child}
			<svelte:self node={child} {blocks} />
		{/each}
	</Root>
{:else if isParagraph(node)}
	<Paragraph>
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
	<ListItem>
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
	<Blockquote>
		{#each node.children as child}
			<svelte:self node={child} {blocks} />
		{/each}
	</Blockquote>
{:else if isBlock(node) && block}
	<Block {block} />
{:else if isSpan(node)}
	<Span {node} />
{/if}
