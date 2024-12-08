import { debounce } from "lodash-es";

export class LoadingStore {
    isLoading = $state(false);

    // 200ms 디바운스된 show 메서드
    show = debounce(() => {
        this.isLoading = true;
    }, 200);

    // 즉시 로딩 상태를 표시하는 showNow 메서드
    showNow() {
        this.isLoading = true;
        this.show.cancel(); // 디바운스된 호출 취소
    }

    // 200ms 디바운스된 hide 메서드
    hide = debounce(() => {
        this.isLoading = false;
    }, 200);
}

export const loading = new LoadingStore();
