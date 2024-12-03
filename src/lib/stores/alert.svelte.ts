interface AlertOption {
    title?: string;
    content?: string;
}

export class AlertStore {
    options = $state({
        title: '알림',
        content: ''
    });
    isVisible = $state(false);

    show(options?: AlertOption) {
        this.options.content = options?.content || '';
        this.options.title = options?.title || '알림';

        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
    }
}

export const alert = new AlertStore();
