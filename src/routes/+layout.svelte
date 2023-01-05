<script lang="ts">
	import '../app.css';

	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="min-h-screen">
	<main>
		<slot />
	</main>
</div>

<Footer />
