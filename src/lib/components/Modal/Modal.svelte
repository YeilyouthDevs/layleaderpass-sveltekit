<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	interface Props {
		title?: string;
		header?: Snippet;
		content?: Snippet;
		footer?: Snippet;
		visible?: boolean;
		fixScroll?: boolean;
	}

	let { title, header, content, footer, visible = false, fixScroll = false }: Props = $props();

	export function show() {
		visible = true;
	}

	export function hide() {
		visible = false;
	}

	if (fixScroll) {
		function disablePageScroll() {
			document.body.style.overflow = 'hidden'; // 페이지 스크롤 비활성화
		}

		function enablePageScroll() {
			document.body.style.overflow = ''; // 페이지 스크롤 복원
		}

		$effect(() => {
			if (visible) disablePageScroll();
			else enablePageScroll();
		});
	}
</script>

{#if visible}
	<!-- 배경 -->
	<div
		class="fixed left-0 top-0 h-screen w-screen bg-black opacity-50"
		transition:fade={{ duration: 300 }}
	></div>

	<!-- 가운데 정렬된 콘텐츠 -->
	<div
		class="fixed left-0 top-0 flex h-screen w-screen items-center justify-center"
		transition:fly={{ duration: 300, y: -50 }}
	>
		<div
			class="flex max-h-[90%] w-[95%] max-w-96 flex-col rounded-sm bg-zinc-100 shadow-lg dark:bg-zinc-700 md:w-96"
		>
			<!-- 헤더 -->
			<div class="mx-3 flex-none border-b-4 border-zinc-400 py-3 dark:border-zinc-300">
				{#if header}
					{@render header?.()}
				{:else if title}
					<p class="text-lg font-bold">{title}</p>
				{/if}
			</div>

			<!-- 스크롤 가능한 콘텐츠 -->
			<div class="scrollbar scrollbar-thin flex-1 overflow-auto p-4">
				{@render content?.()}
			</div>

			<!-- 푸터 -->
			<div class="mx-3 flex justify-end py-3">
				{#if footer}
					{@render footer?.()}
				{:else}
					<button class="btn btn-secondary w-full" onclick={() => hide()}>닫기</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
