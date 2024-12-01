import { debounce } from "lodash-es";

export class LoadingStore {
    isLoading = $state(false);
    private timeoutId: any;

    constructor() {
        this.show = debounce(this.show.bind(this), 200); // 200ms debounce
    }

    show() {
        this.isLoading = true;
    }

    hide() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId); // 타임아웃 초기화
        }
        this.timeoutId = setTimeout(() => {
            this.isLoading = false; // 200ms 후 로딩 숨김
        }, 200);
    }
}

export const loading = new LoadingStore();
