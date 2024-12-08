import { pageRule } from "$lib/scripts/page-rule.svelte";
import { pageInit } from "$lib/scripts/init.svelte.js";

export async function load({ url }) {
    await pageInit();
    await pageRule.execute(url.pathname);
}