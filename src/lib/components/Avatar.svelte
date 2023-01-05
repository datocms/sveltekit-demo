<script lang="ts">
	import type { ResponsiveImageFragment } from '$houdini';
	
	import Image from './Image.svelte';

	export let name: string | null;
	export let picture: { responsiveImage: ResponsiveImageFragment | null };
</script>

<div class="flex items-center">
	{#if picture.responsiveImage}
		<div class="w-12 h-12 mr-4">
			<Image alt={name} data={picture.responsiveImage} class="rounded-full" />
		</div>
	{/if}
	<div class="text-xl font-bold">{name}</div>
</div>
