<script lang="ts">
	import '../app.css';

	import Footer from '$lib/components/Footer.svelte';
	import Alert from '$lib/components/Alert.svelte';
</script>

<div class="min-h-screen">
	<Alert />
	<main>
		<slot />
	</main>
</div>

<Footer />
