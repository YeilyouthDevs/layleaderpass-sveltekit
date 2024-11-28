<script module lang="ts">
	import HeaderSvelte from '$lib/components/Header/Header.svelte';
	import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: 'Components',
        component: HeaderSvelte
    })

</script>

<Story name="Header"/>