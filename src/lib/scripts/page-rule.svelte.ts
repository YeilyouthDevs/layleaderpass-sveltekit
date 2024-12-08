import { goto } from "$app/navigation";
import { alert } from "$lib/stores/alert.svelte";
import { session } from "$lib/stores/session.svelte";
import { LoginRequest } from "../../routes/login/request.svelte";
import { genMessage } from "./form-message-tool";

class PageRule {

    rule: Record<string, CallableFunction> = {
        '/': this.noSession,
        '/login': this.noSession,
        '/register': this.noSession,
    }

    async execute(path: string) {
        const handler = this.rule[path];

        if (handler) await handler();
        else await this.defaultHandler();
    }

    //-----

    async defaultHandler() {
        try {
            if (!session.store.accessToken) await LoginRequest.refresh();

            if (!session.isLogined()) {
                alert.show({
                    content: genMessage({ message: '로그인 후 이용가능한 서비스입니다.' }),
                    onClose: () => {
                        goto('/login', { replaceState: true })
                    }
                });
            }    
        } catch (error) {
            console.log('zzz');
            console.error(error);
        }
    }

    async noSession() {
        if (!session.store.accessToken) await LoginRequest.refresh();

        if (session.isLogined()) {
            return goto('/dashboard', { replaceState: true });
        }
    }
}

export const pageRule = new PageRule();