export class ViewportStore {
    headerHeight = $state(0);
    footerHeight = $state(0);
    contentHeightDiff = $derived((this.headerHeight + this.footerHeight + 33)); //33은 컨텐츠 영역 py-4의 1rem(16px * 2 + 여유분 1)
}

export const viewport = new ViewportStore();
