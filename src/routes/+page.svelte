<script>
	import { goto } from '$app/navigation';
	import SlideShow from '$lib/components/SlideShow/SlideShow.svelte';

	const slides = [
		{ src: 'images/main-slides/1.jpg', alt: 'Slide 1' },
		{ src: 'images/main-slides/2.jpg', alt: 'Slide 2' },
		{ src: 'images/main-slides/3.jpg', alt: 'Slide 3' },
		{ src: 'images/main-slides/4.jpg', alt: 'Slide 4' },
		{ src: 'images/main-slides/5.jpg', alt: 'Slide 5' }
	];
</script>

<SlideShow {slides} intervalTime={5000} transitionTime={3000} overlayColor="bg-black bg-opacity-60">
	<h1 class="mb-3 text-5xl text-gray-200 md:text-6xl">중직자PASS</h1>
	<p class="mb-6 text-sm text-gray-300 md:text-lg">예일교회 청년국 중직자 양성 프로그램</p>

	<div class="rounded-sm">
		
		<div class="flex h-10 w-full gap-2 my-2 dark">
            <button class="btn btn-success w-full text-nowrap">회원가입</button>
            <button class="btn btn-primary w-full text-nowrap" onclick={() => goto('/login')}>로그인</button>
		</div>
        <p class="text-xs text-gray-300">달란트를 모으며 중직자의 5가지 축복을 누려보세요!</p>
	</div>
</SlideShow>
