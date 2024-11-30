import axios from "axios";
import { binds, messages, states } from "./script.svelte";
import { genMessage } from "$lib/scripts/form-message-tool";

export async function checkEmailDuplicate() {
    if (messages.email) return;

    if (!binds.email) {
        return messages.email = genMessage('small', 'text-error', '이메일을 입력해야 합니다.');
    }

    try {
        const response = await axios.post('/api/user/signup/checkEmail', {
            email: binds.email,
        });

        messages.email = genMessage('small', 'text-success', response.data.message);
        states.emailConfirmed = true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || '서버와 통신 중 문제가 발생했습니다.';
        messages.email = genMessage('small', 'text-error', errorMessage);
        console.error('Error:', error);
    }
}

export async function sendVerifyCode() {
    if (!states.emailConfirmed) return;

    try {
        const response = await axios.post('/api/user/signup/sendVerifyCode', {
            email: binds.email,
        });

        messages.verifyCode = genMessage('small', 'text-success', response.data.message)
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || '서버와 통신 중 문제가 발생했습니다.';
        messages.verifyCode = genMessage('small', 'text-error', errorMessage);
        console.error('Error:', error);
    }
}

export async function checkVerifyCode() {
    if (!binds.verifyCode) return messages.verifyCode = genMessage('small', 'text-error', '인증코드를 입력해야합니다.');

    try {
        const response = await axios.post('/api/user/signup/checkVerifyCode', {
            email: binds.email, code: binds.verifyCode
        });

        messages.verifyCode = genMessage('small', 'text-success', response.data.message);
        states.verifyCompleted = true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || '서버와 통신 중 문제가 발생했습니다.';
        messages.verifyCode = genMessage('small', 'text-error', errorMessage);
        console.error('Error:', error);
    }
}
