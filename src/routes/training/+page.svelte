<script lang="ts">
	import Division from '$lib/components/Division/Division.svelte';
	import { session } from '$lib/stores/session.svelte';

</script>

<Division name="훈련" clazz="max-w-96 p-4">
	<div class="flex flex-col justify-items-center gap-2">
		<div class="flex flex-col">
			<p>안녕하세요 {session.store.name} 님!</p>
		</div>
	</div>
</Division>

<style>
</style>
