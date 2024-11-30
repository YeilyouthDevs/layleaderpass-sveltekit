import { binds, messages } from "./script.svelte";
import { genMessage } from "$lib/scripts/form-message-tool";

export function vEmail() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    messages.email = !regex.test(binds.email)
        ? genMessage('small', 'text-error', '이메일 형식이 올바르지 않습니다.')
        : '';
}

export function vPassword() {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    messages.password = !regex.test(binds.password)
        ? genMessage('small', 'text-error', '비밀번호 형식이 올바르지 않습니다.')
        : '';
}

export function vPasswordCheck() {
    messages.passwordCheck = binds.password !== binds.passwordCheck
        ? genMessage('small', 'text-error', '비밀번호가 서로 일치하지 않습니다.')
        : '';
}
