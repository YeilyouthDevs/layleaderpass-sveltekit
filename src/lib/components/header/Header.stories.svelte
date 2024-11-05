<script module lang="ts">
    import HeaderSvelte from './Header.svelte';
	import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: 'Header/Components',
        component: HeaderSvelte
    })

</script>

<Story name="Header" />