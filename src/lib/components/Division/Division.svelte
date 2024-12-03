<script lang="ts">
	interface Props {
		name?: string;
		contentClass?: string;
		nameClass?: string;
		children?: import('svelte').Snippet;
	}

	let { contentClass, nameClass, name, children }: Props = $props();
</script>

<div
	class="relative m-auto mt-1.5 rounded-sm border-4 border-zinc-300 p-1.5 pt-4 dark:border-zinc-700 {contentClass}"
>
	<p
		class="absolute -top-4 left-1 bg-white px-2 font-bold text-xl text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300 {nameClass}"
	>
		{name}
	</p>
	{@render children?.()}
</div>

<style lang="postcss">
</style>
