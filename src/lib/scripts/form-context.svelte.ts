/*
    폼 데이터를 일관적으로 다룰 수 있도록 해주는 클래스.
    binds, states, messages 3가지로 나누어 가이드를 제공함.

    작성자: 김주현
*/

export class FormContext {
    binds: any;
    states: any;
    messages: any;

    constructor(binds: any, states: any, messages: any) {
        this.binds = binds;
        this.states = states;
        this.messages = messages;
    }

    /**
     * 모든 인스턴스 메서드를 병렬 실행
     *
     * @returns 메서드 이름과 결과를 포함한 객체
     */
    async runAllInstanceMethods(): Promise<Record<string, any>> {
        const methodResults: Record<string, any> = {};

        const prototype = Object.getPrototypeOf(this);
        const methodNames = Object.getOwnPropertyNames(prototype)
            .filter(
                name =>
                    name !== 'constructor' &&
                    typeof (this as any)[name] === 'function'
            );

        // 병렬 실행
        const results = await Promise.all(
            methodNames.map(async methodName => {
                try {
                    const method = (this as any)[methodName] as () => Promise<any>;
                    const result = await method.call(this); // 비동기로 실행
                    return { name: methodName, result };
                } catch (error: any) {
                    return { name: methodName, result: `Error: ${error.message}` };
                }
            })
        );

        // 결과 정리
        results.forEach(({ name, result }) => {
            methodResults[name] = result;
        });

        return methodResults;
    }
    
    /**
     * messages가 모두 비어 있는지 확인하는 유틸리티 메서드
     *
     * @param keys - 확인할 메시지 키 배열 (생략 시 전체 메시지 확인)
     * @returns 모든 메시지가 비어 있으면 true, 아니면 false
     */
    isMessagesClear(keys?: string[]): boolean {
        const targetMessages = keys
            ? keys.map(key => this.messages[key]).filter(value => value !== undefined) // 선택된 키만 확인
            : Object.values(this.messages); // 전체 메시지 확인

        return targetMessages.every(value => (value as string).trim() === '');
    }
}
