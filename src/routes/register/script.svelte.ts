import { FormContext } from "$lib/scripts/form-context.svelte";

export const binds = $state(FormContext.binds({
    email: '',
    password: '',
    passwordCheck: '',
    verifyCode: '',
    name: '',
    phone: '',
    birthday: ''
}));

export const states = $state(FormContext.states({
    emailConfirmed: false,
    verifyCompleted: false,
}))

export const messages = $state(FormContext.messages({
    email: '',
    password: '',
    passwordCheck: '',
    verifyCode: '',
}));
