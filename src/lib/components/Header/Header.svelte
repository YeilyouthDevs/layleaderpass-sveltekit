<script lang="ts">
	import { session } from '$lib/stores/session.svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { slide } from 'svelte/transition';

	let isMenuOpen = $state(false);

	type MenuItem = {
		name: string;
		onClick?: CallableFunction;
	};

	const menuItems: MenuItem[] = [
		{
			name: '대시보드',
			onClick: () => {
				console.log('dashboard');
			}
		},
		{ name: '중직자PASS란?' },
		{ name: '참여방법' },
		{ name: '공지사항' },
		{ name: '훈련' }
	];

	// onMount(() => {
	// 	setTimeout(() => {
	// 		session.store.email = 'abc1234@example.com';
	// 		session.store.name = '홍길동';
	// 		session.store.accessToken = 'aj39fdjf2jfdk';

	// 		console.log(session);
	// 	}, 3000);
	// });
</script>

<div>
	<div
		class="flex-column justify-items-center border-b border-zinc-300 p-2 md:flex md:justify-items-start md:gap-7"
	>
		<div class="relative flex w-full justify-center md:w-auto">
			{@render BrandName('md:hidden absolute left-0')}
			{@render Brand()}
			{@render MenuButton()}
		</div>

		{@render Menu('md:hidden')}
		{@render QuickPanel('hidden md:flex md:flex-row-reverse gap-2 scrollbar-thin')}
	</div>

	{@render MenuMD('hidden')}
</div>

{#snippet BrandName(clazz?: string)}
	<p class="text-nowrap text-lg font-bold text-zinc-900 dark:text-zinc-100 {clazz}">중직자PASS</p>
{/snippet}

{#snippet Brand()}
	<div class="flex items-center gap-2">
		<img class="block h-7 dark:hidden" src="logo.png" alt="로고" />
		<img class="hidden h-7 dark:block" src="logo-dark.png" alt="로고 (다크)" />
		{@render BrandName('hidden md:block me-6')}
	</div>
{/snippet}

{#snippet Menu(clazz?: string)}
	{#if isMenuOpen}
		<div class="mt-3 w-full {clazz}" transition:slide={{ duration: 300 }}>
			{@render MenuItems('block w-full p-2 text-left')}
			<hr class="border-2 border-zinc-100 dark:border-zinc-700" />
			{@render QuickPanel('py-2 flex flex-row-reverse gap-2')}
		</div>
	{/if}
{/snippet}

{#snippet MenuMD(clazz: string)}
	<div class="justify-evenly gap-3 bg-zinc-100 dark:bg-zinc-700 md:flex {clazz}">
		{@render MenuItems('p-2 w-full')}
	</div>
{/snippet}

{#snippet MenuItems(clazz?: string)}
	{#if session.isLogined()}
		{#each menuItems as item}
			<button
				class="min-w-24 text-nowrap transition-colors duration-150 ease-in-out hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400 {clazz}"
				onclick={() => item.onClick?.()}>{item.name}</button
			>
		{/each}
	{/if}
{/snippet}

{#snippet MenuButton()}
	<button class="absolute right-0 h-7 md:hidden" onclick={() => (isMenuOpen = !isMenuOpen)}>
		<img class="block h-full w-full dark:hidden" src="images/menu.png" alt="메뉴" />
		<img class="hidden h-full w-full dark:block" src="images/menu-dark.png" alt="메뉴 (다크)" />
	</button>
{/snippet}

{#snippet QuickPanel(clazz?: string)}
	<div class="scrollbar w-full overflow-x-scroll md:overflow-auto md:px-1 {clazz}">
		<!-- 버튼이 역순으로 나타남 -->

		{#if !session.isLogined()}
			{@render QuickPanelItem('로그인', 'images/login.png', 'images/login-dark.png', () => {
				console.log('로그인');
			})}

			{@render QuickPanelItem('회원가입', 'images/register.png', 'images/register-dark.png', () => {
				console.log('회원가입');
			})}

			{@render QuickPanelItem(
				'계정찾기',
				'images/find-account.png',
				'images/find-account-dark.png',
				() => {
					console.log('계정찾기');
				}
			)}
		{/if}

		{@render QuickPanelItem(
			'테마변경',
			'images/toggle-theme.png',
			'images/toggle-theme-dark.png',
			() => theme.toggleTheme()
		)}
		
	</div>
{/snippet}

{#snippet QuickPanelItem(
	name: string,
	lightImgSrc: string,
	darkImgSrc: string,
	onClick: CallableFunction
)}
	<button
		class="flex justify-items-center gap-1 rounded-sm border border-zinc-300 p-1 align-middle dark:border-zinc-700"
		onclick={() => onClick()}
	>
		<div class="h-5 w-5 md:h-4 md:w-4">
			<img class="block dark:hidden" src={lightImgSrc} alt={name} />
			<img class="hidden dark:block" src={darkImgSrc} alt="{name} (다크)" />
		</div>

		<span class="text-nowrap text-xs leading-5 md:leading-4">{name}</span>
	</button>
{/snippet}

<style lang="postcss">
</style>
