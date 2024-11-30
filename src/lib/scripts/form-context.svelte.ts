/*
    폼 데이터를 일관적으로 다룰 수 있도록 해주는 클래스.
    binds, states, messages 3가지로 나누어 가이드를 제공함.

    작성자: 김주현
*/

type FieldDefinition<T> = {
    [K in keyof T]: T[K] extends object
    ? T[K] // 객체는 그대로 사용
    : T[K]; // 단순 값은 그대로 사용
};

type ResolvedFields<T> = {
    [K in keyof T]: T[K] extends Date | Boolean
    ? T[K]
    : T[K] extends string
    ? string
    : T[K]; // 단순 값은 기본 타입으로 추론
};

export class FormContext {
    /**
     * 공통 처리 메서드
     * - 단순 값은 기본 타입으로 추론
     * - `as unknown as` 사용 시 명시적으로 지정된 타입 사용
     *
     * @param fields - 초기화할 필드 정의
     * @returns 초기화된 필드 값
     * @example
     * ```typescript
     * const fields = $state(FormContext.initialize({
     *     name: '', // string으로 추론
     *     age: 0, // number로 추론
     *     birthday: '' as unknown as Date, // 명시적으로 Date로 지정
     * }));
     * console.log(fields.name); // string
     * console.log(fields.birthday); // Date
     * ```
     */
    private static initialize<T>(fields: FieldDefinition<T>): ResolvedFields<T> {
        const result: any = {};
        for (const key in fields) {
            const field = fields[key];
            result[key] = field; // 그대로 값을 사용
        }
        return result as ResolvedFields<T>;
    }

    /**
     * binds 선언 메서드
     * - 사용자가 입력한 데이터를 초기화
     *
     * @param fields - 초기화할 bind 필드 정의
     * @returns 초기화된 bind 필드 값
     * @example
     * ```typescript
     * const binds = $state(FormContext.binds({
     *     email: '', // string으로 추론
     *     birthday: '' as unknown as Date | Boolean, // 명시적으로 Date | Boolean 지정
     * }));
     * console.log(binds.email); // string
     * console.log(binds.birthday); // Date | Boolean
     * ```
     */
    static binds<T>(fields: FieldDefinition<T>): ResolvedFields<T> {
        return this.initialize(fields);
    }

    /**
     * states 선언 메서드
     * - 컴포넌트의 상태를 초기화
     *
     * @param fields - 초기화할 state 필드 정의
     * @returns 초기화된 state 필드 값
     * @example
     * ```typescript
     * const states = $state(FormContext.states({
     *     isLoggedIn: false, // boolean으로 추론
     *     lastLogin: '' as unknown as Date | null, // 명시적으로 Date | null 지정
     * }));
     * console.log(states.isLoggedIn); // boolean
     * console.log(states.lastLogin); // Date | null
     * ```
     */
    static states<T>(fields: FieldDefinition<T>): ResolvedFields<T> {
        return this.initialize(fields);
    }

    /**
     * messages 선언 메서드
     * - 항상 string 타입으로 처리
     *
     * @param fields - 초기화할 메시지 필드 정의
     * @returns 초기화된 메시지 필드 값
     * @example
     * ```typescript
     * const messages = $state(FormContext.messages({
     *     error: 'Something went wrong', // string
     *     success: 'Operation successful', // string
     * }));
     * console.log(messages.error); // string
     * console.log(messages.success); // string
     * ```
     */
    static messages<T extends Record<string, string>>(fields: T): T {
        return fields;
    }

    /**
     * messages가 모두 비어 있는지 확인하는 유틸리티 메서드
     *
     * @param messages - 확인할 메시지 객체
     * @returns 모든 메시지가 비어 있으면 true, 아니면 false
     */
    static isMessagesClear(messages: Record<string, string>): boolean {
        return Object.values(messages).every(value => value.trim() === '');
    }
}
