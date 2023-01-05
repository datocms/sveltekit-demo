<script lang="ts">
	import Image from './Image.svelte';

	export let name: string;
	export let picture;
</script>

<div class="flex items-center">
	<div class="w-12 h-12 mr-4">
		<Image alt={name} data={picture.responsiveImage} class="rounded-full" />
	</div>
	<div class="text-xl font-bold">{name}</div>
</div>
