<script lang="ts">
	import '../app.css';

	import Header from '$lib/components/Header/Header.svelte';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import LoadingScreen from '$lib/components/LoadingScreen/LoadingScreen.svelte';
	import { session } from '$lib/stores/session.svelte';
	import Alert from '$lib/components/Alert/Alert.svelte';
	

	let { children } = $props();

	// 페이지 로드 시 테마 복원
	onMount(() => {
		const savedTheme = localStorage.getItem('theme') || 'light'; // 기본값은 'light'
		theme.setTheme(savedTheme as 'light' | 'dark'); // 초기화 및 동기화
	});

	// 페이지가 띄워져있는지 감지
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'visible') session.startAutoRefresh();
		else session.stopAutoRefresh();
	});
</script>

<main>
	<div class="flex min-h-screen w-screen flex-col dark:bg-zinc-800">
		<Header />

		{#key $page.url.pathname}
			<div class="flex-grow px-2 py-4" in:fly={{ duration: 500, y: 15 }}>
				{@render children()}
			</div>
		{/key}

		<Footer />
	</div>

<Alert  />
<LoadingScreen />

</main>
