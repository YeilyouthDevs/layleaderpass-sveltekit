<script lang="ts">
	import { theme, themeSwitcher } from '$store/theme';
	import { onMount } from 'svelte';
	import type { HeaderMenuListItem } from './types';
	import UserIndicator from './UserIndicator.svelte';
	import { loadBootstrap } from '../bootstrap/loadBootstrap';
	import type { Collapse } from 'bootstrap';
	import QuickPanel from './QuickPanel.svelte';

	/* 테마 스위칭 */
	let logoSrc: string, menuUpIconSrc: string, menuDownIconSrc: string;

	$: if ($theme)
		themeSwitcher({
			light: () => {
				logoSrc = 'logo.png';
				menuUpIconSrc = 'images/menu-up-icon.png';
				menuDownIconSrc = 'images/menu-down-icon.png';
			},
			dark: () => {
				logoSrc = 'logo-dark.png';
				menuUpIconSrc = 'images/menu-up-icon-dark.png';
				menuDownIconSrc = 'images/menu-down-icon-dark.png';
			}
		});

	/* 메뉴 아이템 */
	const tabs: HeaderMenuListItem[] = [
		{
			name: '대시보드'
		},
		{
			name: '중직자PASS란?'
		},
		{
			name: '참여방법'
		},
		{
			name: '공지사항'
		},
		{
			name: '훈련'
		},
		{
			name: '관리자메뉴'
		}
	];

	let selectedTab = tabs[0];

	async function selectOtherTab(tab: HeaderMenuListItem) {
		selectedTab = tab;
		await tab.onClick?.();
	}

	/* 메뉴바 열고 닫기 */
	let navbarMenu: HTMLElement | null = null;
	let collapseInstance: Collapse;
	let isNavbarOpen = false; // 열림/닫힘 상태 추적

	function toggleNavbar() {
		if (collapseInstance) {
			isNavbarOpen = !isNavbarOpen;
			collapseInstance.toggle();
		}
	}

	//---------------

	onMount(async () => {
		/* 메뉴바 Bootstrap Collapse 객체 생성 */
		if (navbarMenu) {
			const bootstrap = await loadBootstrap();
			collapseInstance = new bootstrap.Collapse(navbarMenu, { toggle: false });
		}
	});
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<nav class="navbar navbar-expand-md {$theme}">
	<div class="container-fluid">
		<!-- PC용 브랜드 -->
		<div class="navbar-brand-md">
			<img src={logoSrc} alt="로고" class="d-inline-block align-text-top logo-img" />
			<span class="fw-bold logo-text">중직자PASS</span>
		</div>

		<!-- data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" -->
		<!-- 모바일용 브랜드 -->
		<div class="navbar-brand" on:click={toggleNavbar}>
			<img src={logoSrc} alt="로고" class="d-inline-block align-text-top logo-img" />
			<span class="fw-bold logo-text">중직자PASS</span>
			<img class="menu-icon" src={isNavbarOpen ? menuUpIconSrc : menuDownIconSrc} alt="메뉴버튼" />
		</div>

		<!-- 메뉴 -->
		<div class="collapse navbar-collapse" bind:this={navbarMenu}>
			<div class="user-bar-mobile">
				<UserIndicator />
			</div>
			<ul class="navbar-nav">
				{#each tabs as tab}
					<li class="nav-item px-2">
						{#if !tab.hide?.()}
							<span
								class="nav-link"
								class:nav-item-selected={selectedTab === tab}
								on:click={() => selectOtherTab(tab)}
								>{tab.name}
							</span>
						{/if}
					</li>
				{/each}
			</ul>
			<div class="quick-panel-mobile">
				<QuickPanel />
			</div>
		</div>
	</div>
</nav>

<div class="user-bar">
	<UserIndicator />
	<div class="quick-panel">
		<QuickPanel />
	</div>
</div>

<style lang="scss">
	@use '$style/main' as *;

	.nav {
		&-item {
			text-wrap: nowrap;
			cursor: pointer;

			&-selected {
				color: var(--color-primary) !important;
				font-weight: bold;
			}
		}

		&-link {
			color: var(--color-secondary);
		}
	}

	.navbar {
		padding: 0.3rem;

		.container-fluid {
			border-bottom: 1px solid var(--color-split);
		}

		&-brand {
			cursor: pointer;
			display: none;

			@media (max-width: $width-md-down) {
				width: 100%;
				margin: 0;
				display: flex;
				justify-content: center;
			}

			.menu-icon {
				height: 1.4rem;
				width: auto;
				margin: 0 0.5rem;
				position: absolute;
				top: 0.75rem;
				right: 0;
			}

			&-md {
				display: flex;
				align-items: center;

				@media (max-width: $width-md-down) {
					display: none;
				}
			}
		}
	}

	.logo {
		&-img {
			height: 2rem;
		}

		&-text {
			color: var(--color-default);
			margin: 0 0.5rem;
			font-size: 1.2rem;
			text-wrap: nowrap;

			@media (max-width: $width-md-down) {
				position: absolute;
				left: 0;
				line-height: 2.5rem;
				top: 0.3rem;
			}
		}
	}

	.splitter {
		margin: 0 0.5rem;
		border: none;
		border-bottom: 1px solid var(--color-split);
	}

	.user-bar {
		display: flex;
		justify-content: space-between;

		@media (max-width: $width-md-down) {
			display: none;
		}

		.quick-panel {
			padding: 0.25rem 0.5rem;
		}

		&-mobile {
			@media (min-width: $width-md-up) {
				display: none;
			}
		}
	}

	.quick-panel-mobile {
		border-top: 1px solid var(--color-split);
		padding: 0.5rem;

		@media (min-width: $width-md-up) {
			display: none;
		}
	}
</style>
