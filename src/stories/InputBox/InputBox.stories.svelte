<script module lang="ts">
    import InputBox from "./InputBox.svelte";
	import { defineMeta } from "@storybook/addon-svelte-csf";


    const { Story } = defineMeta({
        title: 'InputBox',
        component: InputBox
    })
</script>

<Story name="InputBoxTest" args={{ textContent: "기본" }}></Story>