<script lang="ts">
    import { onMount } from 'svelte';

    interface Props {
        slides?: { src: string; alt: string }[];
        intervalTime?: number; // 이미지 간격 (ms)
        transitionTime?: number; // 전환 시간 (ms)
        overlayColor?: string; // 배경 색상 및 투명도
        children?: import('svelte').Snippet;
    }

    let {
        slides = [],
        intervalTime = 5000,
        transitionTime = 3000,
        overlayColor = 'bg-black bg-opacity-50',
        children
    }: Props = $props();

    let currentIndex = $state(0);
    let interval: any = $state();

    onMount(() => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
        }, intervalTime);

        return () => clearInterval(interval);
    });
</script>

<div class="relative w-full h-full overflow-hidden">
    <!-- 슬라이드 이미지 -->
    <div class="relative w-full h-full">
        {#each slides as slide, index}
            <img
                src={slide.src}
                alt={slide.alt}
                class="absolute inset-0 w-full h-full object-cover transition-opacity"
                style="opacity: {index === currentIndex ? 1 : 0}; transition-duration: {transitionTime}ms;"
            />
        {/each}
    </div>

    <!-- 내용 -->
    <div class={`absolute inset-0 ${overlayColor} flex flex-col justify-center items-center text-white`}>
        {@render children?.()}
    </div>

    <!-- 페이지네이션 -->
    <div class="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {#each slides as _, index}
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
                class="w-6 h-2 rounded-sm border border-gray-400 opacity-70 {index === currentIndex ? 'bg-white' : 'bg-gray-500'}"
                onclick={() => {
                    if (interval) clearInterval(interval);
                    currentIndex = index;
                }}
            ></button>
        {/each}
    </div>
</div>
