import { sleep } from "$lib/scripts/tools";
import { LoginRequest } from "../../routes/login/request.svelte";

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

    async startAutoRefresh() {
        if (this.refreshInterval || !this.isLogined()) return;

        if (this.refreshStopDate) {
            const now = new Date();
            const elapsed = now.getTime() - this.refreshStopDate.getTime();

            if (elapsed < this.REFRESH_INTERVAL) {
                const waitTime = this.REFRESH_INTERVAL - elapsed;
                await sleep(waitTime);
            }

            await LoginRequest.refresh({ disableAutoRefresh: true });
            this.refreshStopDate = undefined;
        }

        this.refreshInterval = setInterval(async () => {
            await LoginRequest.refresh({ disableAutoRefresh: true });
        }, this.REFRESH_INTERVAL);

    }

    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = undefined;
            this.refreshStopDate = new Date();
        }
    }
   
}

export const session = new SessionStore();