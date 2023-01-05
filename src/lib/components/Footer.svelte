<script lang="ts">
	import Container from './Container.svelte';
</script>

<footer class="bg-accent-1 border-t border-accent-2">
	<Container>
		<div class="py-28 flex flex-col lg:flex-row items-center">
			<h3
				class="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2"
			>
				Statically Generated with SvelteKit.
			</h3>
			<div class="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
				<a
					href="https://www.datocms.com/docs/svelte"
					class="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
				>
					Read Documentation
				</a>
				<a href="https://github.com/datocms/sveltekit-demo" class="mx-3 font-bold hover:underline">
					View on GitHub
				</a>
			</div>
		</div>
	</Container>
</footer>
