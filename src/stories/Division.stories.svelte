<script module lang="ts">
	import DivisionSvelte from '$lib/components/Division/Division.svelte';
	import { defineMeta } from "@storybook/addon-svelte-csf";

    const { Story } = defineMeta({
        title: 'Components',
        component: DivisionSvelte
    })

</script>

<Story name="Division">
    <h3 class="font-bold text-center">What is Lorem Ipsum?</h3>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</p>
</Story>