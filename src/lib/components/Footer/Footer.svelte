<script lang="ts">
</script>

<div class="bg-zinc-500 p-2 text-zinc-100 dark:bg-zinc-600 dark:text-zinc-200 text-center text-xs">
	<div>중직자PASS © 2025 청년국 미래분과 중직자팀</div>
    <div class="flex justify-center gap-5 text-sm mt-1">
        {@render button('개인정보처리방침•이용약관')}
        {@render button('문의•오류제보')}
    </div>
</div>

{#snippet button(name: string, onClick?: CallableFunction)}
    <button class="text-zinc-300 dark:text-zinc-400" onclick={() => onClick?.()}>{name}</button>
{/snippet}

<style lang="postcss">
</style>
