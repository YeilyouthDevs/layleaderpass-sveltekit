import { goto } from "$app/navigation";
import { alert } from "$lib/stores/alert.svelte";
import { LoginRequest } from "../../routes/login/request.svelte";
import { session } from "../stores/session.svelte";
import { genMessage } from "./form-message-tool";

class PageRuleStore {

    async needSession() {
        try {
            if (!session.store.accessToken) await LoginRequest.refresh();

            if (!session.isLogined()) {
                alert.show({ content: genMessage({ message: '로그인 후 이용가능한 서비스입니다.' }) });
                goto('/login', { replaceState: true })
            }
        } catch(error) {
            console.error(error);
        }
    }

    async needNotSession() {
        try {
            if (!session.store.accessToken) await LoginRequest.refresh();

            if (session.isLogined()) {
                alert.show({ content: genMessage({ message: '올바르지 않은 접근입니다.' }) });
                return goto('/dashboard', { replaceState: true });
            }    
        } catch (error) {
            console.error(error);
        }
    }
}

export const pageRule = new PageRuleStore();

