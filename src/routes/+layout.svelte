<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap/dist/js/bootstrap.bundle';
	import '$style/global.css';

	import { onMount } from 'svelte';
	import { initThemes, theme } from '$store/theme';
	import Header from '$lib/components/header/Header.svelte';
	
	onMount(() => {
		initThemes()
	});
</script>

<main class={$theme}>
	<Header />
	<slot />
</main>

<style lang="scss">
	@use '$style/main' as *;

	main {
		background-color: var(--body-bg);
		height: 100vh;
	}

</style>
