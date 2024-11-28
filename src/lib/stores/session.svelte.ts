type SessionType = {
    email?: string;
    name?: string;
    accessToken?: string;
}

export class SessionStore {
    store: SessionType = $state({})

    isLogined() {
        return this.store.email && this.store.name && this.store.accessToken;
    }
}

export const session = new SessionStore();
