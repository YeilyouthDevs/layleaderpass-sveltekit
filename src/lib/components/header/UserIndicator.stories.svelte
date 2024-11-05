<script module lang="ts">
	import UserIndicatorSvelte from './UserIndicator.svelte';
	import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: 'Header/Components',
        component: UserIndicatorSvelte
    })

</script>

<Story name="UserBar"/>