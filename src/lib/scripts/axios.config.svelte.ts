import { goto } from '$app/navigation';
import { alert } from '$lib/stores/alert.svelte';
import { session } from '$lib/stores/session.svelte';
import axios from 'axios';
import { genMessage } from './form-message-tool';

export function configureAxios() {
    // 요청 인터셉터 설정
    axios.interceptors.request.use(
        (request) => {
            request.headers['access-token'] = session.store.accessToken;
            return request;
        },
        (error) => {
            // 요청 오류 처리
            return Promise.reject(error);
        }
    );

    // 응답 인터셉터 설정
    axios.interceptors.response.use(
        (response) => {
            const headers = response.headers;
            const accessToken = headers['access-token'];

            if (accessToken) {
                session.store.accessToken = accessToken;
            }

            return response;
        },
        (error) => {
            const data = error.response.data;

            if (data?.needLogin) {
                session.reset();
                alert.show({ 
                    content: genMessage({ tagName: 'p', message: data?.message || '다시 로그인 해주세요.'}),
                })
                goto('/login')
            }

            return Promise.reject(error);
        }
    );
}
