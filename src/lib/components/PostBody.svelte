<script lang="ts">
	import type { StructuredTextFragment } from '$houdini';
	
	import StructuredText from './StructuredText.svelte';

	export let content: StructuredTextFragment;
</script>

<div class="max-w-2xl mx-auto">
	<div class="prose prose-lg prose-blue" id="main-content">
		<StructuredText structuredText={content} />
	</div>
</div>
