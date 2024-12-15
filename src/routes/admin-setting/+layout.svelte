<script lang="ts">
	import { goto } from '$app/navigation';
	import Division from '$lib/components/Division/Division.svelte';
	import { onMount, type Snippet } from 'svelte';
	import { pageAnimation } from '$lib/stores/page-animation.svelte';

	let { children }: { children: Snippet } = $props();

    let dataLoadList = [
        { name: '(선택 없음)', value: 'null' },
        { name: '사용자', value: 'user' },
        { name: '훈련', value: 'training' }
    ]

    let currentDataLoad = $state();

    $effect(() => {
        if (currentDataLoad !== 'null') {
            goto(`/admin-setting/${currentDataLoad}`, { replaceState: true });
        } else {
            goto('/admin-setting', { replaceState: true });
        }
    })

    onMount(() => {
        setTimeout(() => {
            pageAnimation.stop();    
        }, 500);

        return () => {
            pageAnimation.start();
        }
    })

</script>

<Division name="관리자설정">

    <div class="flex flex-col md:w-80">
        <label class="text-sm text-secondary" for="list">데이터 목록</label>
        <select class="w-full text-center" id="list" bind:value={currentDataLoad}>
            {#each dataLoadList as item}
                <option value={item.value}>{item.name}</option>
            {/each}
        </select>
    </div>
	<div>
		{@render children()}
	</div>
</Division>
