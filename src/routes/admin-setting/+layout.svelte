<script lang="ts">
	import Division from '$lib/components/Division/Division.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<Division name="관리자설정">
    

    <div class="flex flex-col md:w-80">
        <label class="text-sm" for="list">목록</label>
        <select class="w-full text-center" id="list">
            <option>aasdf</option>
        </select>
    </div>
    
	<div>
		{@render children()}
	</div>
</Division>

<style>
</style>
