<script lang="ts">
	import Division from '$lib/components/Division/Division.svelte';
	import { session } from '$lib/stores/session.svelte';
	import axios from 'axios';

</script>

<Division name="대시보드" contentClass="w-[90%] p-4">
	<div class="flex flex-col justify-items-center gap-2">
		<div class="flex flex-col">
			<p>안녕하세요 {session.store.name} 님!</p>
			{#await (async () => {
				const response = await axios.get('/api/test');
				return response.data;
			})() then value}
				<p>값: {value}</p>
			{:catch error}
			  	<p>오류: {error}</p>
			{/await}
		</div>
	</div>
</Division>

<style>
</style>
