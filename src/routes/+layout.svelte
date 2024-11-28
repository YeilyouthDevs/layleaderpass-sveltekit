<script lang="ts">
	import '../app.css';

	import Header from '$lib/components/Header/Header.svelte';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	let { children } = $props();

	// 페이지 로드 시 테마 복원
	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		if(savedTheme === 'dark') theme.setTheme('dark');
	});
</script>

<main>
	<div class="h-screen w-screen dark:bg-zinc-800 flex flex-col">
		<Header />
		<div class="flex-grow p-2">{@render children()}</div>
		<Footer />
	</div>
</main>
