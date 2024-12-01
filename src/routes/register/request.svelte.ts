import axios, { AxiosError } from "axios";
import { genMessage } from "$lib/scripts/form-message-tool";
import { FormContext } from "$lib/scripts/form-context.svelte";
import type { RegisterValidation } from "./validation.svelte";
import { loading } from "$lib/stores/loading.svelte";
import { goto } from "$app/navigation";

export class RegisterRequest extends FormContext {

    async checkEmailDuplicate(): Promise<void> {
        if (this.messages.email) return;

        if (!this.binds.email) {
            this.messages.email = genMessage('small', 'text-error', '이메일을 입력해야 합니다.');
            return;
        }

        try {
            const response = await axios.post('/api/user/signup/checkEmail', {
                email: this.binds.email.trim(),
            });

            this.messages.email = genMessage('small', 'text-success', response.data.message);
            this.states.emailConfirmed = true;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || '서버와 통신 중 문제가 발생했습니다.';
            this.messages.email = genMessage('small', 'text-error', errorMessage);
            console.error('Error:', error);
        }
    }

    async sendVerifyCode(): Promise<void> {
        if (!this.states.emailConfirmed) return;

        try {
            loading.show();

            const response = await axios.post('/api/user/signup/sendVerifyCode', {
                email: this.binds.email.trim(),
            });

            this.messages.verifyCode = genMessage('small', 'text-success', response.data.message);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || '서버와 통신 중 문제가 발생했습니다.';
            this.messages.verifyCode = genMessage('small', 'text-error', errorMessage);
            console.error('Error:', error);
        } finally {
            loading.hide();
        }
    }

    async checkVerifyCode(): Promise<void> {
        if (!this.binds.verifyCode) {
            this.messages.verifyCode = genMessage('small', 'text-error', '인증코드를 입력해야합니다.');
            return;
        }

        try {
            loading.show();

            const response = await axios.post('/api/user/signup/checkVerifyCode', {
                email: this.binds.email.trim(),
                code: this.binds.verifyCode.trim(),
            });

            this.messages.verifyCode = genMessage('small', 'text-success', response.data.message);
            this.states.verifyCompleted = true;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || '서버와 통신 중 문제가 발생했습니다.';
            this.messages.verifyCode = genMessage('small', 'text-error', errorMessage);
            console.error('Error:', error);
        } finally {
            loading.hide();
        }
    }

    async submit(v: RegisterValidation) {
        v.runAllInstanceMethods();

        if (!this.states.emailConfirmed) return alert('이메일 중복확인이 필요합니다.');
        if (!this.states.verifyCompleted) return alert('이메일 인증코드 확인이 필요합니다.');

        if (v.isMessagesClear(['email', 'password', 'passwordCheck', 'name', 'phone', 'birthday'])) {

            try {
                loading.show();

                const response = await axios.post('/api/user/signup', {
                    email: this.binds.email.trim(),
                    password: this.binds.password.trim(),
                    name: this.binds.name.trim(),
                    phone: this.binds.phone.trim(),
                    birthday: this.binds.birthday.trim()
                })

                alert(response.data.message);
                goto('/login');
            } catch (error: any) {
                console.error(error);
                alert(error.resopnse.data.message);
            } finally {
                loading.hide();
            }

        } else {
            alert('모든 입력값에 오류가 없어야합니다.');
        }
    }
}