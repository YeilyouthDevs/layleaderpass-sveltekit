import { UserRole } from "$lib/enums/user-role";

type SessionType = {
    email?: string;
    name?: string;
    role?: number;
    accessToken?: string;
}

export class SessionStore {
    store: SessionType = $state({});

    isLogined() {
        const logined = this.store.email && this.store.name && this.store.accessToken
        return logined;
    }

    reset() {
        this.store.email = undefined;
        this.store.name = undefined;
        this.store.accessToken = undefined;
        this.store.role = UserRole.GUEST;
    }
}

export const session = new SessionStore();