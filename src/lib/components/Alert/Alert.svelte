<script lang="ts">
	import Modal from "../Modal/Modal.svelte";
	import { alert } from "$lib/stores/alert.svelte";
	
	let modal:Modal | null = null;

	function closeAlert() {
		alert.isVisible = false;
		alert.options.onClose();
	}
</script>

<Modal bind:this={modal} title={alert.options.title} visible={alert.isVisible}>
	{#snippet content()}
		{@html alert.options.content}
	{/snippet}

	{#snippet footer()}
		<button class="btn btn-secondary w-full" onclick={() => closeAlert()}>닫기</button>
	{/snippet}
</Modal>



