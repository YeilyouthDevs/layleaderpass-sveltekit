interface AlertOption {
    title?: string;
    content?: string;
    onClose?: () => void;
}

export class AlertStore {
    options = $state({
        title: '알림',
        content: '',
        onClose: () => { }
    });
    isVisible = $state(false);

    show(options?: AlertOption) {
        this.options.content = options?.content || '';
        this.options.title = options?.title || '알림';
        this.options.onClose = options?.onClose || (() => {});

        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
    }
}

export const alert = new AlertStore();
