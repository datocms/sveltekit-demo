<script lang="ts">
	import Image from '$lib/components/Image.svelte';

	export let block;
</script>

<Image data={block.image.responsiveImage} />
