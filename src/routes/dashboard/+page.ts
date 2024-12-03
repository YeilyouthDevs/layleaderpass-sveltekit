import { pageRule } from "$lib/scripts/page-rule.svelte";

export async function load() {
    await pageRule.needSession();
}