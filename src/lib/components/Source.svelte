<script lang="ts">
	export let srcset: string | undefined;
	export let sizes: string | undefined;
	export let type: string | undefined = undefined;
</script>

<source {srcset} {sizes} {type} />
