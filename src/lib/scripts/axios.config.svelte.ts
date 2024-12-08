import { session } from '$lib/stores/session.svelte';
import axios from 'axios';

// export function configureAxios() {

    console.log('zzz')
    // 요청 인터셉터 설정
    axios.interceptors.request.use(
        (request) => {

            console.log('send request:', session.store.accessToken);

            request.headers['access-token'] = session.store.accessToken;

            // 예: 인증 토큰 추가
            // if (typeof window !== 'undefined') { 
            //     const token = localStorage.getItem('authToken');
            //     if (token) {
            //         request.headers.Authorization = `Bearer ${token}`;
            //     }
            // }

            // 로딩 상태 관리 등 다른 로직 추가 가능
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
            // 성공적인 응답 처리
            const headers = response.headers;
            const accessToken = headers['access-token'];

            if (accessToken) {
                session.store.accessToken = accessToken;
            }

            return response;
        },
        (error) => {
            // // 예: 인증 오류 처리
            // if (error.response?.status === 401) {
            //     // 로그아웃 처리 또는 로그인 페이지로 리다이렉트
            //     window.location.href = '/login';
            // }

            // 다른 오류 로직 추가 가능
            return Promise.reject(error);
        }
    );
// }
