<script lang="ts">
	import { theme, themeSwitcher, toggleTheme } from '$store/theme';

	export let clazz: string = '';

	/* 테마 */
	let mypageIconSrc: string, loginIconSrc: string, logoutIconSrc: string, registerIconSrc: string, toggleThemeIconSrc:string;

	$: if ($theme)
		themeSwitcher({
			light: () => {
				mypageIconSrc = 'images/mypage-icon.png';
				loginIconSrc = 'images/login-icon.png';
				logoutIconSrc = 'images/logout-icon.png';
				registerIconSrc = 'images/register-icon.png';
                toggleThemeIconSrc = 'images/toggle-theme-icon.png';
			},
			dark: () => {
				mypageIconSrc = 'images/mypage-icon-dark.png';
				loginIconSrc = 'images/login-icon-dark.png';
				logoutIconSrc = 'images/logout-icon-dark.png';
				registerIconSrc = 'images/register-icon-dark.png';
                toggleThemeIconSrc = 'images/toggle-theme-icon-dark.png';
			}
		});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="buttons {clazz}">
    <div class="wrap" on:click={toggleTheme}>
		<img class="icon" src={toggleThemeIconSrc} alt="테마변경" />
		<div class="label">테마변경</div>
	</div>
	<div class="wrap">
		<img class="icon" src={mypageIconSrc} alt="마이페이지" />
		<div class="label">마이페이지</div>
	</div>
	<div class="wrap">
		<img class="icon" src={logoutIconSrc} alt="로그아웃" />
		<div class="label">로그아웃</div>
	</div>
</div>

<style lang="scss">
	@use '$style/main' as *;

	.buttons {
		display: flex;
		gap: 0.5rem;
		justify-content: center;

		.wrap {
			text-wrap: nowrap;
			display: flex;
			align-items: center;
			gap: 0.3rem;
			border: 1px solid var(--color-secondary);
			border-radius: 0.25rem;
			padding: 0.15rem 0.25rem;
			cursor: pointer;

			@media (max-width: $width-md-down) {
				flex-direction: column;
				padding: 0.25rem;
				min-width: 4rem;
				gap: 0.25rem;
			}

			.icon {
				height: 1.2rem;
				width: auto;

				@media (max-width: $width-md-down) {
					height: calc(1.2rem);
				}
			}

			.label {
				color: var(--color-default);
				font-size: 0.8rem;

				@media (max-width: $width-md-down) {
					font-size: calc(0.55rem);
					line-height: 0.5rem;
				}
			}
		}
	}
</style>
