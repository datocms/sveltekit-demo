<script lang="ts">	
	import type { StructuredText as ST } from 'datocms-structured-text-utils';
	
	import StructuredText from './StructuredText.svelte';

	export let content: ST;
</script>

<div class="max-w-2xl mx-auto">
	<div class="prose prose-lg prose-blue" id="main-content">
		<StructuredText structuredText={content} />
	</div>
</div>
