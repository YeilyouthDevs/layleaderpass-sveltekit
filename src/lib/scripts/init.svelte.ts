import { configureAxios } from "$lib/scripts/axios.config.svelte";
import { session } from "$lib/stores/session.svelte";

let initialized = false;

export async function pageInit() {
    if (initialized) return;

    //session 초기화
    session;

    //axios 초기화
    configureAxios();

    initialized = true;
}