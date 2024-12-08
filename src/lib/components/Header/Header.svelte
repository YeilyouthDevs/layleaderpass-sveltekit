<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$lib/stores/session.svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { viewport } from '$lib/stores/viewport.svelte';
	import { slide } from 'svelte/transition';
	import { LoginRequest } from '../../../routes/login/request.svelte';

	let isMenuOpen = $state(false);

	type MenuItem = {
		name: string;
		onClick?: CallableFunction;
	};

	const menuItems: MenuItem[] = [
		{ name: '대시보드', onClick: () => goto('/dashboard') },
		{ name: '중직자PASS란?' },
		{ name: '참여방법' },
		{ name: '공지사항' },
		{ name: '훈련', onClick: () => goto('/training') }
	];
</script>

<div bind:clientHeight={viewport.headerHeight}>
	<div
		class="flex-column justify-items-center border-b border-zinc-300 p-2 md:flex md:justify-items-start md:gap-7"
	>
		<div class="relative flex w-full justify-center md:w-auto">
			{@render Brand('md:hidden absolute left-0', true)}
			{@render Brand('hidden md:block me-6')}
			{@render MenuButton()}
		</div>

		{@render Menu('md:hidden')}
		{@render QuickPanel('hidden md:flex md:flex-row-reverse gap-2 scrollbar-thin')}
	</div>

	{@render MenuMD('hidden')}
</div>

{#snippet BrandName(clazz?: string)}
	<button class="text-nowrap text-lg font-bold text-zinc-900 dark:text-zinc-100 {clazz}"
		>중직자PASS</button
	>
{/snippet}

{#snippet Brand(nameClazz: string, hideLogo?: boolean)}
	<button
		class="flex items-center gap-2"
		onclick={() => goto(session.isLogined() ? '/dashboard' : '/')}
	>
		{#if !hideLogo}
			<img class="block h-7 dark:hidden" src="/logo.png" alt="로고" />
			<img class="hidden h-7 dark:block" src="/logo-dark.png" alt="로고 (다크)" />
		{/if}
		{@render BrandName(nameClazz)}
	</button>
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
	{#each menuItems as item}
		<button
			class="min-w-24 text-nowrap transition-colors duration-150 ease-in-out hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400 {clazz}"
			onclick={() => item.onClick?.()}>{item.name}</button
		>
	{/each}
{/snippet}

{#snippet MenuButton()}
	<button class="absolute right-0 h-7 md:hidden" onclick={() => (isMenuOpen = !isMenuOpen)}>
		<img class="block h-full w-full dark:hidden" src="/images/icons/menu.png" alt="메뉴" />
		<img
			class="hidden h-full w-full dark:block"
			src="/images/icons/menu-dark.png"
			alt="메뉴 (다크)"
		/>
	</button>
{/snippet}

{#snippet QuickPanel(clazz?: string)}
	<div class="scrollbar w-full overflow-x-scroll md:overflow-auto md:px-1 {clazz}">
		<!-- 버튼이 역순으로 나타남 -->
		 
		{#if !session.isLogined()}
			{@render QuickPanelItem(
				'로그인',
				'/images/icons/login.png',
				'/images/icons/login-dark.png',
				() => goto('/login')
			)}

			{@render QuickPanelItem(
				'회원가입',
				'/images/icons/register.png',
				'/images/icons/register-dark.png',
				() => goto('/register')
			)}

			{@render QuickPanelItem(
				'계정찾기',
				'/images/icons/find-account.png',
				'/images/icons/find-account-dark.png',
				() => {
					console.log('계정찾기');
				}
			)}
		{:else}
			{@render QuickPanelItem(
				'로그아웃',
				'/images/icons/logout.png',
				'/images/icons/logout-dark.png',
				() => {
					LoginRequest.logout();
				}
			)}

			{@render QuickPanelItem(
				'마이페이지',
				'/images/icons/mypage.png',
				'/images/icons/mypage-dark.png',
				() => {
					console.log('마이페이지');
				}
			)}
		{/if}

		{@render QuickPanelItem(
			'테마변경',
			'/images/icons/toggle-theme.png',
			'/images/icons/toggle-theme-dark.png',
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
