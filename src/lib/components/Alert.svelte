<script lang="ts">
	import Container from './Container.svelte';

	export let preview: boolean;
</script>

<div
	class={preview
		? 'border-b bg-accent-7 border-accent-7 text-white'
		: 'border-b bg-accent-1 border-accent-2'}
>
	<Container>
		<div class="py-2 text-center text-sm">
			{#if preview}
				This is page is showing draft content.
				<a
					href="/api/exit-preview"
					class="underline hover:text-cyan duration-200 transition-colors"
				>
					Click here
				</a>
				to exit preview mode.
			{:else}
				This is page is showing published content.{' '}
				<a href="/api/preview" class="underline hover:text-cyan duration-200 transition-colors">
					Click here
				</a>{' '}
				to enter preview mode!
			{/if}
		</div>
	</Container>
</div>
