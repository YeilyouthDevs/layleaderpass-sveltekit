export class PageAnimation {
    state = $state(true);

    stop() {
        this.state = false;
    }

    start() {
        this.state = true;
    }
}

export const pageAnimation = new PageAnimation();
