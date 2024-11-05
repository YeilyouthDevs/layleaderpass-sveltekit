<script lang="ts">
	import { theme, themeSwitcher } from '$store/theme';

	let userIconSrc: string;

	$: if ($theme)
		themeSwitcher({
			light: () => {
				userIconSrc = 'images/user-icon.png';
			},
			dark: () => {
				userIconSrc = 'images/user-icon-dark.png';
			}
		});
</script>

<div class="icons {$theme}">
	<div class="wrap">
		<img class="icon" src={userIconSrc} alt="유저" />
		<div class="label">홍길동</div>
	</div>
	<div class="wrap">
		<img class="icon" src="/images/star-of-david.png" alt="달란트" />
		<div class="label">170</div>
	</div>
</div>

<style lang="scss">
	@use '$style/main' as *;

	.icons {
		display: flex;
		gap: 2rem;
		justify-content: left;
		padding: 0.25rem 0.5rem;

		@media (max-width: $width-md-down) {
			justify-content: space-between;
		}

		.wrap {
			text-wrap: nowrap;
			display: flex;
			align-items: center;
			gap: 0.5rem;

			.icon {
				width: auto;
				height: 1.3rem;

				@media (max-width: $width-md-down) {
					height: calc(1.4rem);
				}
			}

			.label {
				color: var(--color-default);
				font-size: 1rem;
				font-weight: bold;

				@media (max-width: $width-md-down) {
					font-size: calc(1rem);
				}
			}
		}
	}
</style>
