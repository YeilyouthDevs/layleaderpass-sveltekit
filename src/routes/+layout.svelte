<script lang="ts">
	import '../app.css';

	import Header from '$lib/components/Header/Header.svelte';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import { page } from '$app/stores';
	import LoadingScreen from '$lib/components/LoadingScreen/LoadingScreen.svelte';
	import Alert from '$lib/components/Alert/Alert.svelte';

	let { children } = $props();

	// 페이지 로드 시 테마 복원
	onMount(() => {
		const savedTheme = localStorage.getItem('theme') || 'light';
		theme.setTheme(savedTheme as 'light' | 'dark');
	});

	let pageAnim = $state(false);

	// 페이지 변경 감지, 애니메이션 재생
	page.subscribe(() => {
		pageAnim = true;
		setTimeout(() => pageAnim = false, 500); //page-fly 재생시간과 동일하게
	});
</script>

<main>
	<div class="flex min-h-screen w-screen flex-col dark:bg-zinc-800">
		<Header />

		<div class={`flex-grow px-2 py-4`}
			class:page-fly={pageAnim}
		>
			{@render children()}
		</div>

		<Footer />
	</div>

	<Alert />
	<LoadingScreen />
</main>

<style>
	/* 페이지 변경 애니메이션 */
	.page-fly {
		animation: flyIn 500ms ease-out;
	}

	@keyframes flyIn {
		from {
			transform: translateY(15px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
