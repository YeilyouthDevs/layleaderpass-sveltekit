type ThemeType = {
    currentTheme: 'dark' | 'light'
};

export class ThemeStore {
    store: ThemeType = $state({
        currentTheme:
            localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light',
    });

    isDarkMode(): boolean {
        return this.store.currentTheme === 'dark';
    }

    toggleTheme(): void {
        this.store.currentTheme = this.store.currentTheme === 'dark' ? 'light' : 'dark';
        this.updateThemeClass();
        localStorage.setItem('theme', this.store.currentTheme);
    }

    setTheme(theme: ThemeType['currentTheme']): void {
        this.store.currentTheme = theme;
        this.updateThemeClass();
        localStorage.setItem('theme', theme);
    }

    private updateThemeClass(): void {
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.classList.toggle('dark', this.store.currentTheme === 'dark');
        }
    }
}

export const theme = new ThemeStore();
