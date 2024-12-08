import { goto } from "$app/navigation";
import { FormContext } from "$lib/scripts/form-context.svelte";
import { genMessage } from "$lib/scripts/form-message-tool";
import { alert } from "$lib/stores/alert.svelte";
import { session } from "$lib/stores/session.svelte";
import axios from "axios";

export class LoginRequest extends FormContext {

    async login() {
        const { email, password } = this.binds;
        if (!email || !password) return alert.show({ content: genMessage({ message: '이메일과 비밀번호를 모두 입력해주세요.' }) });

        try {
            const response = await axios.post('/api/session/login', {
                email, password
            })

            const { name } = response.data;

            session.store.email = email;
            session.store.name = name;

            goto('/dashboard')
        } catch (error: any) {
            alert.show({ content: genMessage({ message: error.response.data.message }) })
            console.error(error);
        }
    }

    static async logout() {
        const email = session.store.email;

        try {
            if (email) {
                await axios.delete('/api/session/logout?email=' + email);
                session.reset();
            }

            alert.show({ content: genMessage({ message: '로그아웃 되었습니다.' }) });
            goto('/');
        } catch (error: any) {
            alert.show({ content: genMessage({ message: error.response.data.message }) });
            console.error(error);
        }
    }

    static async refresh() {
        const response = await axios.put('/api/session/refresh', {
            email: session.store.email
        });

        const { name, email } = response.data;
        session.store.name = name;
        session.store.email = email;
    }

}