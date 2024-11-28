<script module lang="ts">
	import FooterSvelte from '$lib/components/Footer/Footer.svelte';
	import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: 'Components',
        component: FooterSvelte
    })

</script>

<Story name="Footer"/>