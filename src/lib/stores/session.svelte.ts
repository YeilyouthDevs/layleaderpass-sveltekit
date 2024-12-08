type SessionType = {
    email?: string;
    name?: string;
    accessToken?: string;
}

export class SessionStore {
    store: SessionType = $state({});
    REFRESH_INTERVAL = 10 * 60 * 1000;
    refreshInterval?: number;
    refreshStopDate?: Date;

    isLogined() {
        const logined = this.store.email && this.store.name && this.store.accessToken
        return logined;
    }

    reset() {
        this.store.email = undefined;
        this.store.name = undefined;
        this.store.accessToken = undefined;
    }
}

export const session = new SessionStore();