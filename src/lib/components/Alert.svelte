<script lang="ts">
	import { onMount } from 'svelte';

	import { PREVIEW_MODE_COOKIE_NAME } from '$lib/preview';

	import Container from './Container.svelte';

	let isPreview = false;

	onMount(() => {
		// See: https://developer.mozilla.org/en-US/docs/web/api/document/cookie#example_2_get_a_sample_cookie_named_test2
		const cookie = document.cookie
			?.split('; ')
			.find((row) => row.startsWith(`${PREVIEW_MODE_COOKIE_NAME}=`))
			?.split('=')[1];

		isPreview = !!cookie;
	});

	const enablePreview = () => {
		const password = prompt(
			'Enter the password to enable preview mode, please:',
			'Only for the purpose of the demo, password is "42"'
		);

		if (password !== null) {
			window.location.href = `/enable-preview?secret=${password}`;
		}
	};

	const disablePreview = () => {
		window.location.href = '/disable-preview';
	};
</script>

<div
	class={isPreview
		? 'border-b bg-accent-7 border-accent-7 text-white'
		: 'border-b bg-accent-1 border-accent-2'}
>
	<Container>
		<div class="py-2 text-center text-sm">
			{#if isPreview}
				This is page is showing draft content.
				<button
					class="underline hover:text-cyan duration-200 transition-colors"
					on:click={disablePreview}>Click here</button
				>
				to exit preview mode.
			{:else}
				This is page is showing published content.
				<button
					class="underline hover:text-cyan duration-200 transition-colors"
					on:click={enablePreview}>Click here</button
				>
				to enter preview mode!
			{/if}
		</div>
	</Container>
</div>
