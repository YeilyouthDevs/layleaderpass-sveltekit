import { FormContext } from "$lib/scripts/form-context.svelte";
import { genMessage } from "$lib/scripts/form-message-tool";

export class RegisterValidation extends FormContext {

    email() {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.messages.email = !regex.test(this.binds.email)
            ? genMessage('small', 'text-error', '이메일 형식이 올바르지 않습니다.')
            : '';
    }
    
    password() {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        this.messages.password = !regex.test(this.binds.password)
            ? genMessage('small', 'text-error', '비밀번호 형식이 올바르지 않습니다.')
            : '';
    }
    
    passwordCheck() {
        this.messages.passwordCheck = this.binds.password !== this.binds.passwordCheck
            ? genMessage('small', 'text-error', '비밀번호가 서로 일치하지 않습니다.')
            : '';
    }

    name() {
        const regex = /^[^\s].{0,29}$/; // 최소 1글자 이상, 최대 30글자 이하
        const { name } = this.binds;
    
        if (!regex.test(name.trim())) {
            this.messages.name = genMessage('small', 'text-error', '이름은 최소 1자 이상, 최대 30자 이하여야 합니다.');
            return;
        }
    
        this.messages.name = ''; // 검증 통과 시 메시지 초기화
    }
    
    phone() {
        const regex = /^\d{1,15}$/;
        const { phone } = this.binds;
        this.messages.phone = (!regex.test(phone)) ? genMessage('small', 'text-error', '연락처는 최대 15자 숫자만 입력해야 합니다.') : '';
    }

    birthday() {
        const regex = /^\d{8}$/; // 정확히 8자리 숫자
        const { birthday } = this.binds;
    
        // 기본 유효성 검사
        if (!regex.test(birthday)) {
            this.messages.birthday = genMessage('small', 'text-error', '생년월일은 YYYYMMDD 형식의 8자리 숫자로 입력해야 합니다.');
            return;
        }
    
        // 연도, 월, 일 추출
        const year = parseInt(birthday.substring(0, 4), 10);
        const month = parseInt(birthday.substring(4, 6), 10);
        const day = parseInt(birthday.substring(6, 8), 10);
    
        const currentYear = new Date().getFullYear();
    
        // 연도, 월, 일 유효성 검사
        if (year < 1900 || year > currentYear) {
            this.messages.birthday = genMessage('small', 'text-error', '유효한 연도를 입력하세요 (1900 ~ 현재 연도).');
            return;
        }
    
        if (month < 1 || month > 12) {
            this.messages.birthday = genMessage('small', 'text-error', '유효한 월을 입력하세요 (1 ~ 12).');
            return;
        }
    
        // 월별 일 수 확인
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
            this.messages.birthday = genMessage('small', 'text-error', `유효한 일을 입력하세요 (1 ~ ${daysInMonth}).`);
            return;
        }
    
        // 모든 조건 통과
        this.messages.birthday = ''; // 에러 메시지 초기화
    }
}