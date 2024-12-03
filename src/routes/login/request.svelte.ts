import { goto } from "$app/navigation";
import { FormContext } from "$lib/scripts/form-context.svelte";
import { session } from "$lib/stores/session.svelte";
import axios from "axios";

export class LoginRequest extends FormContext {

    async login() {
        const { email, password } = this.binds;
        if (!email || !password) return alert('이메일과 비밀번호를 모두 입력해주세요.');

        try {
            const response = await axios.post('/api/session/login', {
                email, password
            })

            const { accessToken, name } = response.data;

            session.store.accessToken = accessToken;
            session.store.email = email;
            session.store.name = name;

            goto('/dashboard')
            session.startAutoRefresh();
        } catch (error: any) {
            alert(error.response.data.message)
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

            alert('로그아웃 되었습니다.');
            goto('/');
        } catch (error: any) {
            alert(error.response.data.message);
            console.error(error);
        }
    }

    static async refresh(args?: { disableAutoRefresh?: boolean }) {
        try {
    
            const response = await axios.put('/api/session/refresh', {
                email: session.store.email,
                accessToken: session.store.accessToken
            });

            const { accessToken, name, email } = response.data;
            session.store.accessToken = accessToken;
            session.store.name = name;
            session.store.email = email;

            if(!args?.disableAutoRefresh) session.startAutoRefresh();
        } catch (error: any) {
            console.error(error);

            const { message, needLogin } = error.response.data;
            alert(message);

            if (needLogin) {
                session.reset();
                goto('/login');
            }

            throw error;
        }
    }

}